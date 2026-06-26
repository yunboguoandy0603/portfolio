/* ============================================================================
   <video-slot> — user-fillable video placeholder (link / embed based).
   Sibling to image-slot.js. Because a video file is far too large for the
   JSON sidecar that image-slot uses (and that only accepts data:image/),
   this slot stores a *link* instead: a YouTube / Vimeo / Bilibili URL, a
   direct .mp4/.webm URL, or a project-relative path (e.g. uploads/clip.mp4).
   The link string persists across reloads / share links / export via a
   .video-slots.state.json sidecar — same fetch-read / omelette.writeFile
   pattern as image-slot.js. Outside the omelette runtime the slot is
   read-only (it just plays whatever link is already stored).

   Attributes:
     id           Persistence key. REQUIRED to survive reload.
     placeholder  Empty-state caption.  (default 'Add a video')
   Size comes from ordinary CSS (width/height on the element or its parent).
   ========================================================================== */
(() => {
  const STATE_FILE = '.video-slots.state.json';

  // ── shared sidecar store (string values) ─────────────────────────────────
  const subs = new Set();
  let slots = {};
  const tombstones = new Set();
  let loaded = false, loadP = null;

  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && typeof j === 'object') {
          const merged = Object.assign({}, j, slots);
          for (const id of tombstones) delete merged[id];
          slots = merged;
        }
        tombstones.clear();
      })
      .catch(() => {})
      .then(() => { loaded = true; subs.forEach((fn) => fn()); });
    return loadP;
  }

  let saving = false, saveDirty = false;
  function save() {
    if (saving) { saveDirty = true; return; }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots)))
      .catch(() => {})
      .then(() => { saving = false; if (saveDirty) { saveDirty = false; save(); } });
  }

  // Only trust safe link shapes from the sidecar (it's also agent-writable).
  function safeLink(v) {
    if (typeof v !== 'string') return null;
    const s = v.trim();
    if (!s) return null;
    if (/^\s*(javascript|data|vbscript|file):/i.test(s)) return null;
    return s;
  }
  function getSlot(id) { return id ? safeLink(slots[id]) : null; }
  function setSlot(id, val) {
    if (!id) return;
    if (val) { slots[id] = val; tombstones.delete(id); }
    else { delete slots[id]; if (!loaded) tombstones.add(id); }
    subs.forEach((fn) => fn());
    if (loaded) save(); else load().then(save);
  }

  // ── link → embed ──────────────────────────────────────────────────────────
  function toEmbed(raw) {
    const u = (raw || '').trim();
    let m;
    if ((m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/)))
      return { type: 'iframe', src: 'https://www.youtube.com/embed/' + m[1] };
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
      return { type: 'iframe', src: 'https://player.vimeo.com/video/' + m[1] };
    if ((m = u.match(/bilibili\.com\/video\/(BV[\w]+)/i)))
      return { type: 'iframe', src: 'https://player.bilibili.com/player.html?bvid=' + m[1] + '&page=1&high_quality=1&danmaku=0' };
    if ((m = u.match(/bilibili\.com\/video\/av(\d+)/i)))
      return { type: 'iframe', src: 'https://player.bilibili.com/player.html?aid=' + m[1] + '&danmaku=0' };
    return { type: 'video', src: u };
  }

  const ACCEPT_FILE = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];

  const css =
    ':host{display:block;position:relative;width:100%;height:100%;' +
    '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55)}' +
    '.wrap{position:absolute;inset:0;overflow:hidden;background:#000}' +
    '.wrap iframe,.wrap video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000;display:block}' +
    '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' +
    '  justify-content:center;gap:7px;text-align:center;padding:14px;box-sizing:border-box;cursor:pointer;' +
    '  user-select:none;background:repeating-linear-gradient(135deg,rgba(0,0,0,.05) 0 11px,rgba(0,0,0,0) 11px 22px)}' +
    '.empty .play{font-size:26px;line-height:1;opacity:.6}' +
    '.empty .cap{font-weight:600;letter-spacing:.01em;text-transform:uppercase;font-size:12px}' +
    '.empty .sub{font-size:11px;opacity:.75}.empty .sub u{cursor:pointer}' +
    '.empty:hover .sub u{color:rgba(0,0,0,.8)}' +
    '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.28)}' +
    ':host([data-over]) .ring{border-color:#c96442}' +
    ':host([data-over]) .empty{outline:2px solid #c96442;outline-offset:-2px}' +
    ':host([data-filled]) .empty,:host([data-filled]) .ring{display:none}' +
    // editor: add-link form
    '.form{position:absolute;inset:0;display:none;flex-direction:column;gap:8px;align-items:center;' +
    '  justify-content:center;padding:16px;box-sizing:border-box;background:rgba(255,255,255,.96);z-index:3}' +
    ':host([data-editing]) .form{display:flex}' +
    '.form .lbl{font-size:11px;text-transform:uppercase;letter-spacing:.12em;opacity:.6}' +
    '.form input{width:min(90%,420px);padding:9px 11px;border:1.5px solid rgba(0,0,0,.35);border-radius:7px;' +
    '  font:13px/1.3 system-ui,sans-serif;outline:none}.form input:focus{border-color:#c96442}' +
    '.form .row{display:flex;gap:8px}' +
    '.form button{appearance:none;border:0;border-radius:7px;padding:8px 16px;cursor:pointer;' +
    '  font:12px/1 system-ui,sans-serif;font-weight:600}' +
    '.form .ok{background:#c96442;color:#fff}.form .no{background:rgba(0,0,0,.08);color:rgba(0,0,0,.7)}' +
    '.form .ex{font-size:11px;opacity:.55;max-width:90%}' +
    // hover controls when filled
    '.ctl{position:absolute;top:8px;right:8px;display:flex;gap:6px;opacity:0;pointer-events:none;' +
    '  transition:opacity .12s;z-index:2}' +
    ':host([data-filled][data-editable]:hover) .ctl{opacity:1;pointer-events:auto}' +
    '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' +
    '  background:rgba(0,0,0,.7);color:#fff;font:11px/1 system-ui,sans-serif;backdrop-filter:blur(6px)}' +
    '.ctl button:hover{background:rgba(0,0,0,.88)}' +
    '.note{position:absolute;left:8px;bottom:8px;right:8px;font-size:10px;color:#fff;' +
    '  background:rgba(0,0,0,.5);padding:4px 7px;border-radius:5px;pointer-events:none;text-align:center}';

  class VideoSlot extends HTMLElement {
    static get observedAttributes() { return ['placeholder', 'id']; }
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + css + '</style>' +
        '<div class="wrap"></div>' +
        '<div class="empty"><div class="play">\u25B6</div><div class="cap"></div>' +
        '  <div class="sub"><u>paste a link</u> &middot; or drop a file</div></div>' +
        '<div class="ring"></div>' +
        '<div class="form"><div class="lbl">Video link</div>' +
        '  <input type="text" placeholder="https://youtu.be/\u2026  /  uploads/clip.mp4" />' +
        '  <div class="row"><button class="ok">Add</button><button class="no">Cancel</button></div>' +
        '  <div class="ex">YouTube &middot; Vimeo &middot; Bilibili &middot; direct .mp4/.webm &middot; or a project path</div></div>' +
        '<div class="ctl"><button data-act="replace">Replace</button><button data-act="clear">Remove</button></div>' +
        '<input type="file" accept="' + ACCEPT_FILE.join(',') + '" hidden />';
      this._wrap = root.querySelector('.wrap');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._form = root.querySelector('.form');
      this._input = root.querySelector('.form input');
      this._file = root.querySelector('input[type=file]');
      this._depth = 0; this._local = null;
      this._subFn = () => this._render();

      this._empty.addEventListener('click', () => { if (this._editable()) this._openForm(); });
      root.querySelector('.ok').addEventListener('click', () => this._commitForm());
      root.querySelector('.no').addEventListener('click', () => this._closeForm());
      this._input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this._commitForm();
        if (e.key === 'Escape') this._closeForm();
      });
      root.addEventListener('click', (e) => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') this._openForm();
        if (act === 'clear') {
          this._local = null;
          if (this.id) setSlot(this.id, null); else this._render();
        }
      });
      this._file.addEventListener('change', () => {
        const f = this._file.files && this._file.files[0];
        if (f) this._ingestFile(f);
        this._file.value = '';
      });
    }

    connectedCallback() {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) => this.addEventListener(t, this));
      subs.add(this._subFn);
      load();
      this._render();
    }
    disconnectedCallback() {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) => this.removeEventListener(t, this));
      subs.delete(this._subFn);
    }
    attributeChangedCallback() { if (this.shadowRoot) this._render(); }

    _editable() { return !!(window.omelette && window.omelette.writeFile); }

    _openForm() {
      this.setAttribute('data-editing', '');
      const cur = this.id ? getSlot(this.id) : this._local;
      this._input.value = (cur && cur.indexOf('blob:') !== 0) ? cur : '';
      setTimeout(() => this._input.focus(), 0);
    }
    _closeForm() { this.removeAttribute('data-editing'); }
    _commitForm() {
      const v = (this._input.value || '').trim();
      if (!v) { this._closeForm(); return; }
      if (!safeLink(v)) { this._closeForm(); return; }
      this._local = null;
      if (this.id) setSlot(this.id, v); else { this._local = v; this._render(); }
      this._closeForm();
    }

    _ingestFile(file) {
      if (!file || ACCEPT_FILE.indexOf(file.type) < 0) return;
      // A local file can't be persisted in the JSON sidecar (too large), so
      // it plays for this session only. Persisting needs a link.
      const url = URL.createObjectURL(file);
      this._local = url; this._sessionOnly = true;
      this._render();
    }

    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        e.preventDefault(); e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        if (this._editable()) this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        if (--this._depth <= 0) { this._depth = 0; this.removeAttribute('data-over'); }
      } else if (e.type === 'drop') {
        e.preventDefault(); e.stopPropagation();
        this._depth = 0; this.removeAttribute('data-over');
        if (!this._editable()) return;
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingestFile(f);
      }
    }

    _render() {
      this.toggleAttribute('data-editable', this._editable());
      this._cap.textContent = this.getAttribute('placeholder') || 'Add a video';
      const link = this.id ? getSlot(this.id) : this._local;
      const src = link || (this._local && this._sessionOnly ? this._local : null);
      this._wrap.innerHTML = '';
      if (src) {
        const sessionFile = src.indexOf('blob:') === 0;
        const emb = sessionFile ? { type: 'video', src } : toEmbed(src);
        let node;
        if (emb.type === 'iframe') {
          node = document.createElement('iframe');
          node.src = emb.src;
          node.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write');
          node.setAttribute('allowfullscreen', '');
          node.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
          node.setAttribute('loading', 'lazy');
        } else {
          node = document.createElement('video');
          node.src = emb.src;
          node.controls = true; node.playsInline = true; node.preload = 'metadata';
        }
        this._wrap.appendChild(node);
        if (sessionFile) {
          const n = document.createElement('div'); n.className = 'note';
          n.textContent = 'Local preview — paste a link to keep it after reload';
          this._wrap.appendChild(n);
        }
        this.setAttribute('data-filled', '');
      } else {
        this.removeAttribute('data-filled');
      }
    }
  }

  if (!customElements.get('video-slot')) customElements.define('video-slot', VideoSlot);
})();
