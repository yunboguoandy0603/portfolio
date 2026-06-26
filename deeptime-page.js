/* ============================================================================
   deeptime-page.js — bespoke long-form case study for DEEP TIME, built from
   the project PDF (Yunbo Guo · Deep Time). Exposes window.renderDeepTime(item)
   which works-render.js calls instead of the generic buildCase for
   id==='deeptime'. Warm, hazy "Proustian memory" theme; bilingual via
   .en/.zh spans. Five memory scenes, each an AR video + a scent.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/deeptime/';

  // Five memory scenes — each an AR video (YouTube) paired with a scent.
  // Video order follows the links provided, mapped to the PDF's scene order.
  var SCENES = [
    /* Paste each YouTube link (full URL or just the 11-char video ID) into yt: '' below. */
    { id: 'YT1', yt: 'sp4zfaMjdqE',
      n: '01',
      t_en: 'The passageway of an old building', t_zh: '老楼的过道',
      scent_en: 'Damp concrete · aged wood', scent_zh: '潮湿的混凝土 · 旧木',
      b_en: 'The dim stairwell I walked through every day as a child — paint flaking, light falling in slats. The smell of damp concrete still pulls the whole corridor back into being.',
      b_zh: '童年里每天穿行的昏暗楼道——墙皮剥落，光从缝隙里斜切进来。潮湿混凝土的气味，至今仍能把整条走廊重新唤回。' },
    { id: 'YT2', yt: '6sAC3RXkTbM',
      n: '02',
      t_en: 'Learning to swim as a child', t_zh: '儿时学游泳',
      scent_en: 'Pool chlorine', scent_zh: '泳池的氯',
      b_en: 'Summer mornings at an outdoor pool, the water never quite warm, wrapped in a towel between lessons. The sharp note of chlorine is the fastest door back to that cold, bright water.',
      b_zh: '夏天清晨的露天泳池，水总也不暖，课间裹着毛巾发抖。氯水那股刺鼻的味道，是回到那片冰凉明亮水面最快的一道门。' },
    { id: 'YT3', yt: 'UGTNjjVl5-Q',
      n: '03',
      t_en: 'Kindergarten', t_zh: '幼儿园',
      scent_en: 'Warm milk · crayons', scent_zh: '温牛奶 · 蜡笔',
      b_en: 'A cosy nursery, a teacher\'s gentle voice, afternoon light through the window. Warm milk and crayon wax hold the whole soft, half-remembered room together.',
      b_zh: '温暖的托班、老师轻柔的声音、午后透过窗的光。温牛奶与蜡笔的气味，把那间柔软而半被记起的房间整个托住。' },
    { id: 'YT4', yt: 'KSHn8HVJXy0',
      n: '04',
      t_en: 'Coming out in high school', t_zh: '高中时的出柜',
      scent_en: 'Crisp autumn wind', scent_zh: '清冽的秋风',
      b_en: 'The day I told my mother. For this scene I used UE5\u2019s Niagara system to visualise the chaotic environment and inner turmoil — swirling particles for the anxiety of the moment.',
      b_zh: '向母亲坦白的那天。这一幕我用 UE5 的 Niagara 系统可视化混乱的环境与内心的翻涌——以旋转的粒子表现那一刻的焦虑。' }
  ];

  // full-bleed feature video (placed under section 02)
  var FEATURE = { n: 'main', yt: 'PnIC2s8quGA', t_en: 'Deep Time — film' };

  function injectCSS() {
    if (document.getElementById('dt-css')) return;
    var s = document.createElement('style');
    s.id = 'dt-css';
    s.textContent = DT_CSS;
    document.head.appendChild(s);
  }

  // accept a full YouTube URL or a bare 11-char ID; '' => not set yet
  function ytId(v) {
    if (!v) return '';
    var m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    m = String(v).match(/^[\w-]{11}$/);
    return m ? v : '';
  }
  // links the user adds in-page are remembered in their browser
  function storedId(sc) {
    try { var v = localStorage.getItem('dt-yt-' + sc.n); if (v) return ytId(v); } catch (e) {}
    return ytId(sc.yt);
  }

  function facadeHTML(id, sc) {
    return '<button class="dt-yt dt-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play AR memory — ' + sc.t_en + '">' +
      '<span class="dt-play" aria-hidden="true"></span>' +
      '<button class="dt-edit" type="button" data-edit="' + sc.n + '" title="Change link" aria-label="Change link">✎</button>' +
      '</button>';
  }

  function featureHTML() {
    var id = storedId(FEATURE);
    if (id) return facadeHTML(id, FEATURE);
    return '<button class="dt-yt dt-empty dt-empty-feature" type="button" data-add="main">' +
      '<span class="dt-empty-k">▶</span>' +
      '<span class="dt-empty-l"><span class="en">Add full-screen video link</span><span class="zh">点击添加全屏视频链接</span></span></button>';
  }

  function scenesHTML() {
    return SCENES.map(function (sc) {
      var id = storedId(sc);
      var media = id
        ? facadeHTML(id, sc)
        : '<button class="dt-yt dt-empty" type="button" data-add="' + sc.n + '">' +
            '<span class="dt-empty-k">' + sc.n + '</span>' +
            '<span class="dt-empty-l"><span class="en">Add video link</span><span class="zh">点击添加视频链接</span></span>' +
          '</button>';
      return '' +
        '<article class="dt-scene" data-scene="' + sc.n + '">' +
          '<div class="dt-scene-media">' + media + '</div>' +
          '<div class="dt-scene-body">' +
            '<span class="dt-scene-num">' + sc.n + '</span>' +
            '<span class="dt-scent"><i aria-hidden="true"></i><span class="en">' + sc.scent_en + '</span><span class="zh">' + sc.scent_zh + '</span></span>' +
            '<h3 class="dt-scene-t"><span class="en">' + sc.t_en + '</span><span class="zh">' + sc.t_zh + '</span></h3>' +
            '<p class="dt-scene-p"><span class="en">' + sc.b_en + '</span><span class="zh">' + sc.b_zh + '</span></p>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function html() {
    return '' +
    '<article class="dt-page" id="case-experiments-deeptime" data-screen-label="Deep Time">' +

      /* ---------- HERO ---------- */
      '<header class="dt-hero">' +
        '<img class="dt-hero-bg" src="' + A + 'exhibition.jpg" alt="Deep Time exhibition — scanning a printed memory with a tablet" />' +
        '<div class="dt-hero-veil"></div>' +
        '<div class="dt-grain" aria-hidden="true"></div>' +
        '<div class="dt-hero-inner">' +
          '<div class="dt-eyebrow"><span class="en">Mixed-media AR installation · 2023</span><span class="zh">混合媒介 AR 装置 · 2023</span></div>' +
          '<h1 class="dt-title">Deep Time</h1>' +
          '<div class="dt-sub"><span class="en">memory has a smell</span><span class="zh">记忆是有气味的</span></div>' +
          '<p class="dt-tagline"><span class="en">Smell reaches memory before thought does. Scan a printed poem and a buried moment rises off the wall — winter soil, pool chlorine, crisp wind.</span><span class="zh">在思考抵达之前，气味先一步触到记忆。扫描一首打印的诗，被埋藏的瞬间便从墙上浮起——冬天的泥土、泳池的氯、清冽的风。</span></p>' +
          '<div class="dt-meta">' +
            '<span><b class="en">Individual</b><b class="zh">个人</b><i class="en">Interactive installation</i><i class="zh">交互装置</i></span>' +
            '<span><b>UE5 · Cinema 4D · ARTIVIVE</b><i class="en">Tools</i><i class="zh">工具</i></span>' +
            '<span><b class="en">3 projectors · 9 gauze screens</b><b class="zh">3 投影 · 9 纱幕</b><i class="en">Scale</i><i class="zh">体量</i></span>' +
          '</div>' +
          '<a class="dt-pdf dt-pdf-hero" href="' + A + 'DeepTime.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">查看原始 PDF</span> <i>&#8599;</i></a>' +
        '</div>' +
        '<div class="dt-scroll"><span class="en">scroll</span><span class="zh">向下</span><i></i></div>' +
      '</header>' +

      /* ---------- 01 THE PROUSTIAN EFFECT ---------- */
      '<section class="dt-sec">' +
        '<div class="dt-mark"><span class="dt-num">01</span><span class="dt-kicker en">The Proustian effect</span><span class="dt-kicker zh">普鲁斯特效应</span></div>' +
        '<div class="dt-split">' +
          '<h2 class="dt-h2"><span class="en">Why a smell<br/>opens a door</span><span class="zh">为何一缕气味<br/>能推开一扇门</span></h2>' +
          '<div class="dt-body">' +
            '<p><span class="en">Olfactory receptors connect almost directly to the brain\u2019s memory and emotion centres, so a scent can summon a whole moment more vividly and more suddenly than a photograph. Marcel Proust called it involuntary memory: a taste, a smell, and an entire vanished world returns intact.</span><span class="zh">嗅觉受体几乎直通大脑的记忆与情感中枢，因此一缕气味唤起的整个瞬间，往往比一张照片更鲜活、也更突然。马塞尔·普鲁斯特称之为"非自主记忆"：一种味道、一缕气味，便能让整个消逝的世界完好如初地归来。</span></p>' +
            '<p><span class="en">Deep Time treats memory not as something you look at but as something you can stand inside. Drawing on a post-millennial nostalgia for old, dreamlike textures, it pairs amplified scents with AR video so each moment is felt through the body, not just recalled.</span><span class="zh">《Deep Time》把记忆视为可以走进的空间，而非供人观看之物。它借助千禧世代对旧日、梦境般质感的怀恋，把被放大的气味与 AR 影像并置，让每个瞬间都被身体感受，而不只是被想起。</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="dt-quoteblock">' +
          '<div class="dt-bigquote"><span class="en">&ldquo;amplify the feelings of the moment&rdquo;</span><span class="zh">「放大那一刻的感受」</span></div>' +
          '<p class="dt-quotebody"><span class="en">Five formative memories were reconstructed as 3D scenes, then bound to a real scent and a printed poem. The result sits between an existential self-portrait and a dreamcore archive — memory rendered as weather you can walk through.</span><span class="zh">五段塑造自我的记忆被重建为三维场景，再与真实的气味和打印的诗句相互绑定。最终的作品介于一幅存在主义的自画像与一座 dreamcore 档案之间——记忆被渲染成可以穿行而过的天气。</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------- 02 DESIGN PROCESS ---------- */
      '<section class="dt-sec">' +
        '<div class="dt-mark"><span class="dt-num">02</span><span class="dt-kicker en">Design process</span><span class="dt-kicker zh">设计过程</span></div>' +
        '<h2 class="dt-h2 dt-h2-wide"><span class="en">From a mind map to a memory you can enter</span><span class="zh">从思维导图到一段可进入的记忆</span></h2>' +
        '<div class="dt-steps">' +
          '<div class="dt-step"><span class="dt-step-k">Mind map</span><h4><span class="en">Mapping the self</span><span class="zh">绘制自我</span></h4><p><span class="en">I began by mapping the moments that shaped me, sorting them by the emotion and the smell each one carried.</span><span class="zh">我先把塑造了我的那些瞬间画成图谱，按照各自承载的情绪与气味加以归类。</span></p></div>' +
          '<div class="dt-step"><span class="dt-step-k">ZPD &amp; scaffolding</span><h4><span class="en">A guided way in</span><span class="zh">被引导的进入</span></h4><p><span class="en">Scent, poem and AR scaffold each other: the familiar smell lowers the threshold, the poem frames the feeling, the video completes the scene.</span><span class="zh">气味、诗与 AR 互为脚手架：熟悉的气味降低门槛，诗句框定情绪，影像补全场景。</span></p></div>' +
          '<div class="dt-step"><span class="dt-step-k">Production</span><h4><span class="en">Modelling &amp; making</span><span class="zh">建模与制作</span></h4><p><span class="en">Each memory was modelled in Cinema 4D and animated in UE5, then printed, mounted, and linked to its AR trigger through ARTIVIVE.</span><span class="zh">每段记忆在 Cinema 4D 中建模、在 UE5 中动画，随后打印、装裱，并通过 ARTIVIVE 绑定各自的 AR 触发点。</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------- FEATURE VIDEO (full-bleed, under 02) ---------- */
      '<section class="dt-feature" data-scene="main">' +
        '<div class="dt-scene-media dt-feature-media">' + featureHTML() + '</div>' +
      '</section>' +

      /* ---------- 03 FIVE MEMORIES (AR videos) ---------- */
      '<section class="dt-sec dt-sec-scenes">' +
        '<div class="dt-mark"><span class="dt-num">03</span><span class="dt-kicker en">Four memories</span><span class="dt-kicker zh">四段记忆</span></div>' +
        '<h2 class="dt-h2 dt-h2-wide"><span class="en">Scan a poem, and the moment rises</span><span class="zh">扫描一首诗，那一刻便浮起</span></h2>' +
        '<p class="dt-lead"><span class="en">Each printed poem is an AR trigger. Held up to a phone or tablet, it plays back the memory it describes — a 3D scene scored to a scent placed beside it. Five moments, five smells.</span><span class="zh">每一首打印的诗都是一个 AR 触发点。举到手机或平板前，它便播放出它所描述的记忆——一段三维场景，与置于一旁的气味彼此应和。五个瞬间，五种气味。</span></p>' +
        '<div class="dt-scenes">' + scenesHTML() + '</div>' +
      '</section>' +

      /* ---------- 04 EXHIBITION ---------- */
      '<section class="dt-sec">' +
        '<div class="dt-mark"><span class="dt-num">04</span><span class="dt-kicker en">The exhibition</span><span class="dt-kicker zh">展览现场</span></div>' +
        '<h2 class="dt-h2 dt-h2-wide"><span class="en">A room of haze, scent and light</span><span class="zh">一间由雾、气味与光构成的房间</span></h2>' +
        '<figure class="dt-wide">' +
          '<img src="' + A + 'exhibition.jpg" alt="Visitor scanning a printed memory poem with a tablet" />' +
          '<figcaption><span class="en">Three projectors and nine gauze screens build a dream-haze; placed scents make the digital art feel physically, emotionally real. ARTIVIVE turns each printed poem into a window onto its 3D memory.</span><span class="zh">三台投影与九层纱幕织出梦境般的雾；布置其间的气味让数字艺术变得可触、动情。ARTIVIVE 把每一首打印的诗变成通往其三维记忆的一扇窗。</span></figcaption>' +
        '</figure>' +
        '<div class="dt-reflect">' +
          '<span class="dt-reflect-label"><span class="en">Reflection</span><span class="zh">反思</span></span>' +
          '<p><span class="en">More healing than technical \u2014 it helped me make peace with my past and reconnect with my mother. It proved digital media can be a tool for social empathy, and set my PhD direction: how interactive, mixed media can help people express identity and connect.</span><span class="zh">与其说是技术，不如说是疗愈——它让我与过去和解，也重新连接了母亲。它证明数字媒介可以成为社会共情的工具，并定下我的博士方向：交互与混合媒介如何帮助人表达身份、彼此连接。</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------- FOOTER ---------- */
      '<footer class="dt-foot">' +
        '<div class="dt-foot-line"><span class="en">DEEP TIME · memory has a smell</span><span class="zh">DEEP TIME · 记忆是有气味的</span></div>' +
        '<a class="dt-pdf" href="' + A + 'DeepTime.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">查看原始 PDF</span> <i>&#8599;</i></a>' +
      '</footer>' +

    '</article>';
  }

  function renderDeepTime(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dt-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.dt-sec, .dt-scene, .dt-step').forEach(function (n) { n.classList.add('dt-rev'); io.observe(n); });
    });
    // in-page link management + click-to-play
    function findScene(n) { if (n === FEATURE.n) return FEATURE; for (var i = 0; i < SCENES.length; i++) if (SCENES[i].n === n) return SCENES[i]; return null; }
    function emptyHTML(n) {
      return '<button class="dt-yt dt-empty" type="button" data-add="' + n + '"><span class="dt-empty-k">' + n + '</span><span class="dt-empty-l"><span class="en">Add video link</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u89c6\u9891\u94fe\u63a5</span></span></button>';
    }
    function commit(n, raw) {
      var sc = findScene(n); if (!sc) return;
      var id = ytId((raw || '').trim());
      try { if (id) localStorage.setItem('dt-yt-' + n, id); else localStorage.removeItem('dt-yt-' + n); } catch (e) {}
      var media = art.querySelector('[data-scene="' + n + '"] .dt-scene-media');
      if (media) media.innerHTML = id ? facadeHTML(id, sc) : emptyHTML(n);
    }
    // inline editor (window.prompt is blocked in sandboxed previews)
    function editLink(n) {
      var media = art.querySelector('[data-scene="' + n + '"] .dt-scene-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('dt-yt-' + n) || ''; } catch (e) {}
      var wrap = document.createElement('div');
      wrap.className = 'dt-yt dt-editor';
      wrap.innerHTML =
        '<span class="dt-editor-k">' + n + '</span>' +
        '<label class="dt-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="dt-editor-in" type="text" value="' + cur.replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="dt-editor-btns"><button type="button" class="dt-editor-save">Save</button>' +
        (cur ? '<button type="button" class="dt-editor-clear">Clear</button>' : '') +
        '<button type="button" class="dt-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(wrap);
      var input = wrap.querySelector('.dt-editor-in');
      input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(n, input.value); } else if (e.key === 'Escape') { commit(n, cur); } });
      wrap.querySelector('.dt-editor-save').addEventListener('click', function () { commit(n, input.value); });
      wrap.querySelector('.dt-editor-cancel').addEventListener('click', function () { commit(n, cur); });
      var clr = wrap.querySelector('.dt-editor-clear'); if (clr) clr.addEventListener('click', function () { commit(n, ''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(edit.getAttribute('data-edit')); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(add.getAttribute('data-add')); return; }
      var b = e.target.closest && e.target.closest('.dt-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'dt-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Deep Time AR memory';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });
    return art;
  }

  window.renderDeepTime = renderDeepTime;

  /* ---------------------------- styles ---------------------------- */
  var DT_CSS = [
'.dt-page{--dt-ink:#F0E8DD;--dt-dim:#B5A892;--dt-bg:#14110D;--dt-panel:#1E1A14;--dt-line:rgba(240,232,221,.14);',
'  --dt-amber:#E0A24B;--dt-rust:#C8643C;--dt-sage:#8FA37A;',
'  background:var(--dt-bg);color:var(--dt-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .dt-page{font-family:var(--cjk)}',
'.dt-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* hero */
'.dt-hero{position:relative;min-height:80vh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}',
'.dt-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:sepia(.35) brightness(.5) contrast(1.05);z-index:-3}',
'.dt-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(20,17,13,.5) 0%,rgba(20,17,13,.35) 40%,rgba(20,17,13,.95) 100%)}',
'.dt-grain{position:absolute;inset:0;z-index:-1;opacity:.5;mix-blend-mode:overlay;pointer-events:none;',
'  background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:3px 3px}',
'.dt-hero-inner{position:relative;padding:clamp(24px,4vw,60px);padding-bottom:clamp(40px,6vw,78px);max-width:1100px}',
'.dt-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--dt-amber);margin-bottom:clamp(14px,2vw,22px)}',
'.lang-zh .dt-eyebrow{font-family:var(--cjk);letter-spacing:.14em}',
'.dt-title{font-family:var(--display);font-weight:800;font-size:clamp(64px,14vw,210px);line-height:.86;letter-spacing:-.02em;',
'  background:linear-gradient(96deg,#fff 0%,var(--dt-amber) 52%,var(--dt-rust) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.dt-sub{font-family:var(--serif);font-style:italic;font-size:clamp(22px,3.4vw,44px);color:#fff;margin-top:clamp(6px,1vw,12px)}',
'.lang-zh .dt-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.dt-tagline{max-width:44ch;font-size:clamp(15px,1.6vw,20px);color:var(--dt-ink);margin-top:clamp(16px,2.2vw,26px);text-wrap:pretty}',
'.dt-meta{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,54px);margin-top:clamp(22px,3vw,34px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--dt-line)}',
'.dt-meta span{display:flex;flex-direction:column;gap:3px}',
'.dt-meta b{font-size:clamp(14px,1.4vw,17px);font-weight:600;color:#fff}',
'.dt-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--dt-dim)}',
'.lang-zh .dt-meta i{font-family:var(--cjk);letter-spacing:.08em}',
'.dt-scroll{position:absolute;right:clamp(20px,4vw,54px);bottom:clamp(26px,4vw,46px);display:flex;flex-direction:column;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--dt-dim)}',
'.dt-scroll i{width:1px;height:40px;background:linear-gradient(var(--dt-amber),transparent);animation:dtDrip 1.8s ease-in-out infinite}',
'@keyframes dtDrip{0%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(.3);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.dt-scroll i{animation:none}}',

/* section frame */
'.dt-sec{padding:clamp(54px,8vw,118px) clamp(24px,5vw,86px);max-width:1280px;margin:0 auto;border-top:1px solid var(--dt-line)}',
'.dt-mark{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,4vw,48px)}',
'.dt-num{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--dt-rust);letter-spacing:.1em}',
'.dt-kicker{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--dt-dim)}',
'.lang-zh .dt-kicker{font-family:var(--cjk);letter-spacing:.12em}',
'.dt-h2{font-family:var(--display);font-weight:800;font-size:clamp(34px,5.2vw,72px);line-height:1.04;letter-spacing:-.015em;color:#fff}',
'.lang-zh .dt-h2{font-weight:900}',
'.dt-h2-wide{max-width:20ch;margin-bottom:clamp(30px,4vw,52px)}',

/* split */
'.dt-split{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:clamp(28px,5vw,70px);align-items:start}',
'.dt-body p{font-family:var(--serif);font-size:clamp(16px,1.5vw,20px);line-height:1.72;color:var(--dt-ink);margin-bottom:1.1em;text-wrap:pretty}',
'.lang-zh .dt-body p{font-family:var(--cjk);line-height:1.95}',
'.dt-quoteblock{margin-top:clamp(48px,7vw,96px);text-align:center;padding:clamp(30px,5vw,60px) 0}',
'.dt-bigquote{font-family:var(--serif);font-style:italic;font-size:clamp(30px,5.6vw,84px);line-height:1.05;',
'  background:linear-gradient(96deg,var(--dt-amber),var(--dt-rust));-webkit-background-clip:text;background-clip:text;color:transparent}',
'.lang-zh .dt-bigquote{font-family:var(--cjk);font-style:normal;font-weight:900}',
'.dt-quotebody{max-width:62ch;margin:clamp(22px,3vw,34px) auto 0;font-size:clamp(15px,1.5vw,19px);color:var(--dt-dim);text-wrap:pretty}',

/* steps */
'.dt-feature{padding:0;max-width:none;margin:0;border-top:1px solid var(--dt-line)}',
'.dt-feature-media{position:relative}',
'.dt-feature .dt-yt{width:100%;aspect-ratio:16/9;max-height:88vh;min-height:0}',
'.dt-empty-feature{font-size:14px}',
'.dt-empty-feature .dt-empty-k{font-size:clamp(34px,5vw,56px)}',
'.dt-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.2vw,28px)}',
'.dt-step{background:var(--dt-panel);border:1px solid var(--dt-line);border-top:3px solid var(--dt-amber);padding:clamp(20px,2.4vw,30px)}',
'.dt-step-k{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--dt-amber)}',
'.dt-step h4{font-family:var(--display);font-weight:700;font-size:clamp(18px,2vw,24px);color:#fff;margin:10px 0 12px}',
'.lang-zh .dt-step h4{font-weight:900}',
'.dt-step p{font-size:clamp(14px,1.3vw,16px);color:var(--dt-ink);line-height:1.62;text-wrap:pretty}',

/* scenes */
'.dt-lead{font-family:var(--serif);font-size:clamp(17px,1.9vw,24px);line-height:1.6;color:#fff;max-width:54ch;margin-bottom:clamp(34px,5vw,60px);text-wrap:pretty}',
'.lang-zh .dt-lead{font-family:var(--cjk);line-height:1.85}',
'.dt-scenes{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(20px,3vw,40px)}',
'.dt-scene{display:flex;flex-direction:column;background:var(--dt-panel);border:1px solid var(--dt-line);overflow:hidden}',
'.dt-scene-media{position:relative;background:#000;border-bottom:1px solid var(--dt-line)}',
'.dt-yt{position:relative;width:100%;aspect-ratio:9/16;max-height:560px;border:0;display:block}',
'.dt-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;',
'  display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.dt-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,17,13,.1),rgba(20,17,13,.45))}',
'.dt-facade:hover{filter:brightness(1.08)}',
'.dt-play{position:relative;z-index:1;width:clamp(54px,7vw,72px);height:clamp(54px,7vw,72px);border-radius:50%;',
'  background:rgba(20,17,13,.55);border:2px solid rgba(240,232,221,.85);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.dt-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);',
'  border-style:solid;border-width:11px 0 11px 18px;border-color:transparent transparent transparent #F0E8DD}',
'.dt-facade:hover .dt-play{transform:scale(1.08);background:var(--dt-rust)}',
'.dt-edit{position:absolute;z-index:2;right:12px;top:12px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(240,232,221,.4);',
'  background:rgba(20,17,13,.6);color:#F0E8DD;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;',
'  opacity:0;transition:opacity .2s,background .2s}',
'.dt-facade:hover .dt-edit{opacity:1}',
'.dt-edit:hover{background:var(--dt-rust)}',
'.dt-empty:hover{border-color:rgba(224,162,75,.6);color:var(--dt-amber)}',
'.dt-empty-l{margin-top:2px}',
'.dt-editor{display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:12px;padding:clamp(18px,2.4vw,30px);background:#0d0b08;border:1px solid rgba(224,162,75,.4)}',
'.dt-editor-k{font-family:var(--mono);font-size:clamp(22px,3vw,34px);color:rgba(240,232,221,.2);letter-spacing:.04em}',
'.dt-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--dt-dim)}',
'.lang-zh .dt-editor-l{font-family:var(--cjk);letter-spacing:.06em}',
'.dt-editor-in{width:100%;box-sizing:border-box;background:#16130e;border:1px solid var(--dt-line);color:#F0E8DD;',
'  font-family:var(--mono);font-size:14px;padding:11px 12px;border-radius:4px;outline:none}',
'.dt-editor-in:focus{border-color:var(--dt-amber)}',
'.dt-editor-btns{display:flex;flex-wrap:wrap;gap:8px}',
'.dt-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;',
'  padding:9px 16px;border-radius:4px;border:1px solid var(--dt-line);background:transparent;color:var(--dt-ink);transition:background .2s,color .2s,border-color .2s}',
'.dt-editor-save{background:var(--dt-amber)!important;color:#1c1408!important;border-color:var(--dt-amber)!important}',
'.dt-editor-save:hover{filter:brightness(1.08)}',
'.dt-editor-clear:hover,.dt-editor-cancel:hover{border-color:var(--dt-rust);color:var(--dt-rust)}',
'.dt-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#0d0b08;',
'  border:1px dashed rgba(240,232,221,.22);color:var(--dt-dim);font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:border-color .2s,color .2s}',
'.lang-zh .dt-empty{font-family:var(--cjk);letter-spacing:.06em}',
'.dt-empty-k{font-family:var(--mono);font-size:clamp(28px,4vw,46px);color:rgba(240,232,221,.18);letter-spacing:.04em}',
'.dt-scene-body{padding:clamp(20px,2.4vw,30px);position:relative}',
'.dt-scene-num{position:absolute;right:clamp(18px,2.2vw,28px);top:clamp(16px,2vw,24px);font-family:var(--mono);font-size:clamp(20px,2.4vw,32px);color:var(--dt-line);letter-spacing:.04em}',
'.dt-scent{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--dt-sage)}',
'.lang-zh .dt-scent{font-family:var(--cjk);letter-spacing:.06em}',
'.dt-scent i{width:7px;height:7px;border-radius:50%;background:var(--dt-sage);box-shadow:0 0 0 4px rgba(143,163,122,.18);flex:none}',
'.dt-scene-t{font-family:var(--display);font-weight:800;font-size:clamp(21px,2.4vw,30px);color:#fff;margin:12px 0 12px;line-height:1.1;max-width:16ch}',
'.lang-zh .dt-scene-t{font-weight:900}',
'.dt-scene-p{font-family:var(--serif);font-size:clamp(15px,1.4vw,18px);line-height:1.65;color:var(--dt-ink);text-wrap:pretty}',
'.lang-zh .dt-scene-p{font-family:var(--cjk);line-height:1.85}',

/* exhibition */
'.dt-wide{margin:0 0 clamp(40px,6vw,72px)}',
'.dt-wide img{aspect-ratio:3/2;border:1px solid var(--dt-line)}',
'.dt-wide figcaption{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--dt-dim);margin-top:14px;line-height:1.6;max-width:80ch}',
'.lang-zh .dt-wide figcaption{font-family:var(--cjk)}',
'.dt-reflect{border-left:3px solid var(--dt-rust);padding:clamp(8px,1.4vw,16px) clamp(20px,2.6vw,34px)}',
'.dt-reflect-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--dt-rust)}',
'.lang-zh .dt-reflect-label{font-family:var(--cjk)}',
'.dt-reflect p{font-family:var(--serif);font-size:clamp(16px,1.6vw,22px);line-height:1.6;color:#fff;margin-top:12px;max-width:64ch;text-wrap:pretty}',
'.lang-zh .dt-reflect p{font-family:var(--cjk);line-height:1.85}',

/* footer + pdf */
'.dt-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;',
'  padding:clamp(40px,6vw,80px) clamp(24px,5vw,86px);border-top:1px solid var(--dt-line);max-width:1280px;margin:0 auto}',
'.dt-foot-line{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;color:var(--dt-dim)}',
'.lang-zh .dt-foot-line{font-family:var(--cjk);letter-spacing:.08em}',
'.dt-pdf{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;',
'  color:#fff;text-decoration:none;padding:13px 24px;border:1.5px solid var(--dt-amber);transition:background .2s,color .2s,transform .2s}',
'.lang-zh .dt-pdf{font-family:var(--cjk)}',
'.dt-pdf:hover{background:var(--dt-amber);color:#1c1408;transform:translateY(-2px)}',
'.dt-pdf i{font-style:normal;font-size:15px}',
'.dt-pdf-hero{margin-top:clamp(22px,3vw,30px)}',

/* reveal */
'.dt-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.dt-rev.dt-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.dt-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:860px){',
'  .dt-split{grid-template-columns:1fr}',
'  .dt-steps{grid-template-columns:1fr}',
'  .dt-scenes{grid-template-columns:1fr}',
'  .dt-yt{max-height:none}',
'}'
  ].join('\n');

})();
