/* ============================================================================
   space-page.js — bespoke long-form case study for SPACE OF ANOTHER REALITY ·
   TIME & ORDER (id 'space'). Exposes window.renderSpace(item) which
   works-render.js calls instead of the generic buildCase. Dark cinematic
   exhibition-board theme: near-black + crimson + sunset ember, teal wayfinding
   arrows, vertical Ming-serif Chinese, a mirrored "order / chaos" composition.
   Bilingual via .en/.zh spans.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/space/';
  var YT_DEFAULT = '5SPmFUbNj-c';   // walkthrough provided by Yunbo
  var VKEY = 'space-feature-yt';

  /* ---- four small scenes (cropped from the exhibition board) ---- */
  var SCENES = [
    { img: 's1.jpg', t_en: 'Dusk on the lake', t_zh: '湖面的黄昏' },
    { img: 's2.jpg', t_en: 'Wayfinding in the dark', t_zh: '黑暗中的指引' },
    { img: 's3.jpg', t_en: 'The monolith & the arrow', t_zh: '尺度的方碑' },
    { img: 's4.jpg', t_en: 'A door in the mirror', t_zh: '镜中之门' }
  ];

  /* ---- three "interactive" mechanics (from the project record) ---- */
  var MECH = [
    { k_en: 'First-person interactive viewing', k_zh: '第一人称交互观看',
      b_en: 'The viewer sets their own distance to each work, turning passive looking into active exploration.',
      b_zh: '观众自行决定与作品的距离，把被动观看变成主动探索。' },
    { k_en: 'Playing with space & scale', k_zh: '玩转空间与尺度',
      b_en: 'Giant statues beside tiny, fragile borders stage "chaos vs. order" and unsettle your sense of size in the virtual world.',
      b_zh: '把巨像与脆弱的小边界并置，演绎"混乱与秩序"，扰动你在虚拟世界里的尺度感。' },
    { k_en: 'Chinese cultural roots', k_zh: '文化根脉',
      b_en: 'Inspired by the scale of the Leshan Giant Buddha, I brought giant Buddhist statues into the dream — turning abstract "chaos / order" into cultural symbols.',
      b_zh: '受乐山大佛体量启发，把巨型佛像引入梦境，将抽象的"混乱/秩序"化为文化符号。' }
  ];

  var TAGS = [
    { en: 'Education', zh: '教育' }, { en: 'Casual', zh: '休闲' },
    { en: 'Immersive Sim', zh: '沉浸式模拟' }, { en: '6DOF', zh: '六自由度' },
    { en: 'Single-player', zh: '单人' }, { en: 'Design & Illustration', zh: '设计与插画' }
  ];

  function injectCSS() {
    if (document.getElementById('space-css')) return;
    var s = document.createElement('style');
    s.id = 'space-css';
    s.textContent = SP_CSS;
    document.head.appendChild(s);
  }

  /* ---- YouTube facade (full-bleed feature video, editable + persisted) ---- */
  function ytId(v) {
    if (!v) return '';
    var m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    m = String(v).match(/^[\w-]{11}$/);
    return m ? v : '';
  }
  function storedFeature() {
    try { var v = localStorage.getItem(VKEY); if (v !== null) return ytId(v); } catch (e) {}
    return YT_DEFAULT;
  }
  function facadeHTML(id) {
    return '<button class="sp-yt sp-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" aria-label="Play walkthrough">' +
      '<span class="sp-play" aria-hidden="true"></span>' +
      '<button class="sp-edit" type="button" data-edit="1" title="Change link" aria-label="Change link">\u270e</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="sp-yt sp-empty" type="button" data-add="1">' +
      '<span class="sp-empty-k">\u25B6</span>' +
      '<span class="sp-empty-l"><span class="en">Add walkthrough video link</span><span class="zh">点击添加视频链接</span></span></button>';
  }
  function featureHTML() {
    var id = storedFeature();
    return id ? facadeHTML(id) : emptyHTML();
  }

  function scenesHTML() {
    return SCENES.map(function (s) {
      return '' +
      '<figure class="sp-scene">' +
        '<div class="sp-scene-img"><img src="' + A + s.img + '" alt="' + s.t_en + '" loading="lazy" /></div>' +
        '<figcaption><span class="en">' + s.t_en + '</span><span class="zh">' + s.t_zh + '</span></figcaption>' +
      '</figure>';
    }).join('');
  }
  function mechHTML() {
    return MECH.map(function (m, i) {
      return '' +
      '<div class="sp-mech">' +
        '<span class="sp-mech-n">0' + (i + 1) + '</span>' +
        '<div><h4><span class="en">' + m.k_en + '</span><span class="zh">' + m.k_zh + '</span></h4>' +
        '<p><span class="en">' + m.b_en + '</span><span class="zh">' + m.b_zh + '</span></p></div>' +
      '</div>';
    }).join('');
  }
  function tagsHTML() {
    return TAGS.map(function (t) {
      return '<span class="sp-tag"><span class="en">' + t.en + '</span><span class="zh">' + t.zh + '</span></span>';
    }).join('');
  }

  function html() {
    return '' +
    '<article class="sp-page" id="case-games-space" data-screen-label="Space of Another Reality">' +

      /* ---------------- HERO ---------------- */
      '<header class="sp-hero">' +
        '<div class="sp-hero-glow" aria-hidden="true"></div>' +
        '<div class="sp-hero-inner">' +
          '<div class="sp-hero-head">' +
            '<div class="sp-eyebrow"><span class="sp-arrow" aria-hidden="true"></span><span class="en">Published on Steam · Virtual exhibition game · 2022</span><span class="zh">已上架 Steam · 虚拟展览游戏 · 2022</span></div>' +
            '<div class="sp-titles">' +
              '<h1 class="sp-zh-title">秩序空间</h1>' +
              '<div class="sp-en-title"><span class="sp-en-main">Time &amp; Order</span><span class="sp-en-sub">Space of Another Reality</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="sp-hero-stage">' +
            '<div class="sp-poem" aria-label="幽龛合现庄严相，寰宇常随去住因。"><span>幽龛合现庄严相，</span><span>寰宇常随去住因。</span></div>' +
            '<figure class="sp-hero-fig"><img src="' + A + 'mirror.jpg" alt="A meditating Buddha and its mirror reflection — order above, chaos below" /></figure>' +
          '</div>' +
          '<div class="sp-hero-foot">' +
            '<p class="sp-tagline"><span class="en">A first-person museum you walk through on Steam. My sector — "Time &amp; Order" — uses dream-like scenes to question social rules, letting chaos and order collide in a space the visitor controls.</span><span class="zh">一座可在 Steam 上第一人称漫游的美术馆。我负责的"时间与秩序"用一连串梦境场景质询社会规则，让混乱与秩序在观众自主掌控的空间里碰撞。</span></p>' +
            '<div class="sp-meta">' +
              '<span><b class="en">Time &amp; Order 时间与秩序</b><b class="zh">时间与秩序</b><i class="en">My sector</i><i class="zh">我的分区</i></span>' +
              '<span><b>Jun – Aug 2022</b><i class="en">Timeline</i><i class="zh">时间</i></span>' +
              '<span><b>Unreal Engine · Blueprints</b><i class="en">Built with</i><i class="zh">工具</i></span>' +
              '<span><b class="en">My first 3D project</b><b class="zh">第一个三维项目</b><i class="en">Milestone</i><i class="zh">里程碑</i></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="sp-scroll" aria-hidden="true"><span class="en">scroll</span><span class="zh">向下</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO ---------------- */
      '<section class="sp-feature"><div class="sp-feature-media">' + featureHTML() + '</div>' +
        '<div class="sp-feature-cap"><span class="en">Walkthrough · the virtual exhibition in motion</span><span class="zh">漫游影像 · 流动中的虚拟展览</span></div>' +
      '</section>' +

      /* ---------------- 01 STATEMENT ---------------- */
      '<section class="sp-sec sp-sec-statement">' +
        '<div class="sp-mark"><span class="sp-num">01</span><span class="sp-kicker en">Statement</span><span class="sp-kicker zh">理念</span></div>' +
        '<blockquote class="sp-statement">' +
          '<p class="zh">秩序与荒诞都在自我反思的过程中呈现。项目最终以一系列小场景的形式，创造出一种秩序与混乱纠缠的虚拟性。通过大与小、秩序与混乱的并置，我们希望在观众短暂的参观时间里，引发其对"秩序"的思考。</p>' +
          '<p class="en">Order and absurdity are both presented in the process of self-reflection. The project ultimately creates a virtuality where order and chaos are intertwined, through a series of small scenes. Through the juxtaposition of large and small, order and chaos, we aim to provoke the audience to contemplate "order" within the brief time of their visit.</p>' +
        '</blockquote>' +
      '</section>' +

      /* ---------------- 02 THE PLACE ---------------- */
      '<section class="sp-sec">' +
        '<div class="sp-mark"><span class="sp-num">02</span><span class="sp-kicker en">The place</span><span class="sp-kicker zh">场景</span></div>' +
        '<h2 class="sp-h2"><span class="en">A mirror laid<br/>over the lake</span><span class="zh">铺在湖面上的<br/>一面镜子</span></h2>' +
        '<div class="sp-place">' +
          '<div class="sp-place-row"><span class="sp-place-k"><span class="en">Real world</span><span class="zh">真实世界</span></span><p><span class="en">The scene sits on the Taicang campus of Xi\u2019an Jiaotong-Liverpool University (XJTLU), in Suzhou.</span><span class="zh">场景坐落于苏州市西交利物浦大学太仓校区。</span></p></div>' +
          '<div class="sp-place-row"><span class="sp-place-k"><span class="en">The scene</span><span class="zh">场景介绍</span></span><p><span class="en">The virtual scene rests on the lake at the heart of the campus; its upper and lower halves mirror one another, creating an atmosphere where order and chaos are entangled.</span><span class="zh">虚拟场景位于校园中心的湖面，其上下方互为镜像，创造出一种秩序与混乱纠缠的氛围。</span></p></div>' +
          '<div class="sp-place-row"><span class="sp-place-k"><span class="en">The idea</span><span class="zh">场景理念</span></span><p><span class="en">A digital meditation zone within the virtualised campus. A digital avatar drifts through the mirror between the virtual and the real, contemplating the philosophical meaning of "order" in the juxtaposition of large and small, order and chaos.</span><span class="zh">本场景可作为虚拟化校园中的一片数字冥想区域。数字虚拟人在镜像的虚实之间穿梭，在大与小、秩序与混乱的并置中，思考"秩序"的哲学含义。</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 03 SMALL SCENES ---------------- */
      '<section class="sp-sec sp-sec-scenes">' +
        '<div class="sp-mark"><span class="sp-num">03</span><span class="sp-kicker en">Small scenes</span><span class="sp-kicker zh">小场景</span></div>' +
        '<h2 class="sp-h2 sp-h2-wide"><span class="en">Order and chaos, entangled</span><span class="zh">秩序与混乱，彼此纠缠</span></h2>' +
        '<div class="sp-scenes">' + scenesHTML() + '</div>' +
      '</section>' +

      /* ---------------- 04 INTERACTION ---------------- */
      '<section class="sp-sec">' +
        '<div class="sp-mark"><span class="sp-num">04</span><span class="sp-kicker en">Interaction</span><span class="sp-kicker zh">交互</span></div>' +
        '<h2 class="sp-h2 sp-h2-wide"><span class="en">A space the visitor controls</span><span class="zh">由观众掌控的空间</span></h2>' +
        '<div class="sp-mechs">' + mechHTML() + '</div>' +
      '</section>' +

      /* ---------------- 05 ON STEAM ---------------- */
      '<section class="sp-sec sp-sec-steam">' +
        '<div class="sp-mark"><span class="sp-num">05</span><span class="sp-kicker en">On Steam</span><span class="sp-kicker zh">上架 Steam</span></div>' +
        '<div class="sp-steam">' +
          '<div class="sp-steam-body">' +
            '<h2 class="sp-h2"><span class="en">Space of<br/>Another Reality</span><span class="zh">另一种<br/>现实的空间</span></h2>' +
            '<p><span class="en">A virtual exhibition game. Players navigate the space from a first-person perspective reminiscent of an FPS. The exhibition is divided into several small sectors, each displaying its own independent virtual installation \u2014 "Time &amp; Order" is one of them.</span><span class="zh">一款虚拟展览游戏。玩家以类似 FPS 的第一人称视角在空间中漫游。整个展览被划分为若干小型展区，每个展区呈现各自独立的虚拟装置——"时间与秩序"正是其中之一。</span></p>' +
            '<div class="sp-tags">' + tagsHTML() + '</div>' +
            '<div class="sp-credit"><span><b class="en">Developer</b><b class="zh">开发者</b> vrtimes</span><span><b class="en">Publisher</b><b class="zh">发行</b> xjlvp</span><span><b class="en">Studio</b><b class="zh">工作室</b> Zero Range Studio</span></div>' +
          '</div>' +
          '<div class="sp-reflect">' +
            '<span class="sp-reflect-label"><span class="en">Reflection</span><span class="zh">反思</span></span>' +
            '<p><span class="en">My first 3D build, and my first time bringing my Chinese cultural background into digital art. It made me curious about how an interactive space full of cultural symbols can challenge a player\u2019s sense of rules, scale and freedom \u2014 the critical power of games.</span><span class="zh">我的第一个三维作品，也是第一次把中国文化背景带进数字艺术。它让我开始着迷：一个布满文化符号的可交互空间，如何挑战玩家对规则、尺度与自由的认知——这正是游戏的批判力量。</span></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="sp-foot">' +
        '<div class="sp-foot-zh">秩序</div>' +
        '<div class="sp-foot-en"><span class="en">ORDER</span><span class="zh">ORDER · 秩序空间</span></div>' +
        '<div class="sp-foot-credit">Zero Range Studio @</div>' +
      '</footer>' +

    '</article>';
  }

  function renderSpace(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sp-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.sp-sec, .sp-scene, .sp-mech').forEach(function (n) { n.classList.add('sp-rev'); io.observe(n); });
    });

    // ---- feature video: link management + click-to-play ----
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem(VKEY, id); } catch (e) {}
      var media = art.querySelector('.sp-feature-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('.sp-feature-media');
      if (!media) return;
      var cur = ''; try { var s = localStorage.getItem(VKEY); cur = (s === null ? YT_DEFAULT : s); } catch (e) { cur = YT_DEFAULT; }
      var box = document.createElement('div');
      box.className = 'sp-yt sp-editor';
      box.innerHTML =
        '<label class="sp-editor-l"><span class="en">Paste a YouTube link</span><span class="zh">粘贴 YouTube 链接</span></label>' +
        '<input class="sp-editor-in" type="text" value="' + cur.replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="sp-editor-btns"><button type="button" class="sp-editor-save">Save</button>' +
        '<button type="button" class="sp-editor-clear">Clear</button>' +
        '<button type="button" class="sp-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.sp-editor-in');
      input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(input.value); } else if (e.key === 'Escape') { commit(cur); } });
      box.querySelector('.sp-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.sp-editor-cancel').addEventListener('click', function () { commit(cur); });
      box.querySelector('.sp-editor-clear').addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.sp-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'sp-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Space of Another Reality — walkthrough';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderSpace = renderSpace;

  /* ---------------------------- styles ---------------------------- */
  var SP_CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&display=swap');",

'.sp-page{--sp-bg:#0A0708;--sp-bg2:#130C0C;--sp-panel:#170E0F;',
'  --sp-crimson:#5E1416;--sp-crimson-d:#380C0D;--sp-ember:#C2552E;',
'  --sp-teal:#5FE0CE;--sp-ink:#ECE3DB;--sp-dim:#9C8C84;--sp-line:rgba(236,227,219,.13);',
'  --sp-ming:"Noto Serif SC",serif;--sp-serif:var(--serif,Georgia,"Times New Roman",serif);',
'  background:var(--sp-bg);color:var(--sp-ink);font-family:var(--sans,system-ui,sans-serif);line-height:1.65;',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));overflow:hidden}',
'.lang-zh .sp-page{font-family:var(--cjk)}',
'.sp-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* ---------------- HERO ---------------- */
'.sp-hero{position:relative;padding:clamp(34px,5vw,72px) clamp(22px,4vw,64px) clamp(48px,6vw,86px);overflow:hidden;isolation:isolate;',
'  background:radial-gradient(120% 80% at 18% 0%,rgba(94,20,22,.55) 0%,rgba(10,7,8,0) 55%),linear-gradient(180deg,#160C0D 0%,var(--sp-bg) 70%)}',
'.sp-hero-glow{position:absolute;inset:0;z-index:-1;pointer-events:none;',
'  background:radial-gradient(60% 40% at 62% 36%,rgba(194,85,46,.16),transparent 70%)}',
'.sp-hero-inner{position:relative;max-width:1180px;margin:0 auto}',
'.sp-hero-head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap}',
'.sp-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:clamp(10px,1.05vw,12.5px);',
'  letter-spacing:.22em;text-transform:uppercase;color:var(--sp-teal)}',
'.lang-zh .sp-eyebrow{font-family:var(--cjk);letter-spacing:.1em}',
'.sp-arrow{width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent var(--sp-teal)}',
'.sp-titles{text-align:right;margin-left:auto}',
'.sp-zh-title{font-family:var(--sp-ming);font-weight:900;font-size:clamp(56px,9vw,124px);line-height:.9;letter-spacing:.04em;color:var(--sp-ink);margin:0;',
'  text-shadow:0 2px 30px rgba(0,0,0,.6)}',
'.sp-en-title{display:flex;flex-direction:column;align-items:flex-end;margin-top:8px}',
'.sp-en-main{font-family:var(--sp-serif);font-style:italic;font-size:clamp(20px,2.6vw,36px);color:var(--sp-ember);letter-spacing:.01em}',
'.sp-en-sub{font-family:var(--mono);font-size:clamp(10px,1vw,12px);letter-spacing:.28em;text-transform:uppercase;color:var(--sp-dim);margin-top:6px}',

'.sp-hero-stage{position:relative;margin:clamp(26px,4vw,46px) 0 0}',
'.sp-hero-fig{margin:0 auto;max-width:860px;border:1px solid var(--sp-line);',
'  box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(0,0,0,.4);overflow:hidden}',
'.sp-hero-fig img{aspect-ratio:3322/2838}',
'.sp-poem{position:absolute;z-index:2;left:clamp(8px,3vw,46px);top:clamp(10px,2vw,26px);',
'  writing-mode:vertical-rl;text-orientation:upright;display:flex;gap:clamp(2px,.6vw,8px);',
'  font-family:var(--sp-ming);font-weight:700;font-size:clamp(15px,2vw,26px);letter-spacing:.18em;line-height:1.05;',
'  color:#F4ECE4;background:linear-gradient(180deg,rgba(94,20,22,.86),rgba(56,12,13,.7));',
'  padding:clamp(12px,1.8vw,22px) clamp(8px,1.2vw,14px);border:1px solid rgba(236,227,219,.18);',
'  text-shadow:0 1px 8px rgba(0,0,0,.5)}',

'.sp-hero-foot{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,56px);',
'  align-items:start;margin-top:clamp(26px,4vw,46px);padding-top:clamp(20px,2.6vw,30px);border-top:1px solid var(--sp-line)}',
'.sp-tagline{font-family:var(--sp-serif);font-size:clamp(16px,1.7vw,21px);line-height:1.62;color:var(--sp-ink);margin:0;text-wrap:pretty}',
'.lang-zh .sp-tagline{font-family:var(--cjk);line-height:1.9}',
'.sp-meta{display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,22px)}',
'.sp-meta span{display:flex;flex-direction:column;gap:3px}',
'.sp-meta b{font-size:clamp(13px,1.35vw,16px);font-weight:600;color:var(--sp-ink)}',
'.sp-meta i{font-family:var(--mono);font-style:normal;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--sp-dim)}',
'.lang-zh .sp-meta i{font-family:var(--cjk);letter-spacing:.06em}',
'.sp-scroll{position:absolute;right:clamp(18px,4vw,46px);bottom:clamp(20px,3vw,34px);display:flex;flex-direction:column;align-items:center;gap:7px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--sp-dim)}',
'.sp-scroll i{width:1px;height:36px;background:linear-gradient(var(--sp-teal),transparent);animation:spDrip 1.9s ease-in-out infinite}',
'@keyframes spDrip{0%,100%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.sp-scroll i{animation:none}}',

/* ---------------- FEATURE VIDEO ---------------- */
'.sp-feature{position:relative}',
'.sp-feature-media{position:relative}',
'.sp-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:90vh;border:0;display:block}',
'.sp-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;',
'  display:flex;align-items:center;justify-content:center;border-top:1px solid var(--sp-line);border-bottom:1px solid var(--sp-line);transition:filter .2s}',
'.sp-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,7,8,.12),rgba(10,7,8,.5))}',
'.sp-facade:hover{filter:brightness(1.07)}',
'.sp-play{position:relative;z-index:1;width:clamp(62px,7vw,86px);height:clamp(62px,7vw,86px);border-radius:50%;',
'  background:rgba(10,7,8,.5);border:2px solid var(--sp-teal);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.sp-play::before{content:"";position:absolute;top:50%;left:55%;transform:translate(-50%,-50%);',
'  border-style:solid;border-width:12px 0 12px 19px;border-color:transparent transparent transparent var(--sp-teal)}',
'.sp-facade:hover .sp-play{transform:scale(1.08);background:rgba(95,224,206,.18)}',
'.sp-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(236,227,219,.4);',
'  background:rgba(10,7,8,.6);color:var(--sp-ink);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}',
'.sp-facade:hover .sp-edit{opacity:1}',
'.sp-edit:hover{border-color:var(--sp-teal);color:var(--sp-teal)}',
'.sp-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:pointer;background:#0c0809;',
'  border-top:1px solid var(--sp-line);border-bottom:1px solid var(--sp-line);color:var(--sp-dim);',
'  font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}',
'.lang-zh .sp-empty{font-family:var(--cjk);letter-spacing:.06em}',
'.sp-empty:hover{color:var(--sp-teal)}',
'.sp-empty-k{font-size:clamp(34px,4.5vw,52px);color:var(--sp-teal)}',
'.sp-editor{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:clamp(22px,3vw,40px);background:#0c0809;border-top:1px solid var(--sp-line);border-bottom:1px solid var(--sp-line)}',
'.sp-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--sp-dim)}',
'.lang-zh .sp-editor-l{font-family:var(--cjk)}',
'.sp-editor-in{width:min(560px,82%);box-sizing:border-box;background:#160d0e;border:1px solid var(--sp-line);color:var(--sp-ink);',
'  font-family:var(--mono);font-size:14px;padding:11px 13px;border-radius:4px;outline:none}',
'.sp-editor-in:focus{border-color:var(--sp-teal)}',
'.sp-editor-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}',
'.sp-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:4px;border:1px solid var(--sp-line);background:transparent;color:var(--sp-ink);transition:border-color .2s,color .2s}',
'.sp-editor-save{background:var(--sp-teal)!important;color:#082b27!important;border-color:var(--sp-teal)!important}',
'.sp-editor-clear:hover,.sp-editor-cancel:hover{border-color:var(--sp-ember);color:var(--sp-ember)}',
'.sp-feature-cap{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--sp-dim);text-align:center;padding:16px}',
'.lang-zh .sp-feature-cap{font-family:var(--cjk);letter-spacing:.08em}',

/* ---------------- SECTIONS ---------------- */
'.sp-sec{position:relative;max-width:1120px;margin:0 auto;padding:clamp(56px,8vw,108px) clamp(22px,5vw,72px);border-top:1px solid var(--sp-line)}',
'.sp-mark{display:flex;align-items:center;gap:14px;margin-bottom:clamp(22px,3vw,38px)}',
'.sp-num{font-family:var(--mono);font-size:clamp(12px,1.3vw,15px);color:var(--sp-ember);letter-spacing:.08em}',
'.sp-kicker{font-family:var(--mono);font-size:clamp(10px,1.05vw,12.5px);letter-spacing:.24em;text-transform:uppercase;color:var(--sp-dim)}',
'.lang-zh .sp-kicker{font-family:var(--cjk);letter-spacing:.1em}',
'.sp-h2{font-family:var(--sp-ming);font-weight:700;font-size:clamp(30px,5vw,62px);line-height:1.06;color:var(--sp-ink);margin:0 0 clamp(20px,2.6vw,30px);letter-spacing:.02em}',
'.lang-zh .sp-h2{font-weight:900}',
'.sp-h2-wide{max-width:24ch}',

/* statement (only the active language shows, via the global .en/.zh toggle) */
'.sp-sec-statement{text-align:center}',
'.sp-statement{margin:0 auto;max-width:62ch;border:0;padding:0}',
'.sp-statement p{margin:0}',
'.sp-statement .zh{font-family:var(--sp-ming);font-weight:700;font-size:clamp(21px,3vw,38px);line-height:1.55;color:var(--sp-ink);letter-spacing:.03em;text-wrap:pretty}',
'.sp-statement .en{font-family:var(--sp-serif);font-style:italic;font-size:clamp(18px,2vw,27px);line-height:1.55;color:var(--sp-ink);text-wrap:pretty}',

/* place */
'.sp-place{display:flex;flex-direction:column;gap:clamp(20px,2.6vw,32px)}',
'.sp-place-row{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:clamp(16px,3vw,40px);align-items:baseline;',
'  padding-bottom:clamp(18px,2.4vw,28px);border-bottom:1px solid var(--sp-line)}',
'.sp-place-row:last-child{border-bottom:0;padding-bottom:0}',
'.sp-place-k{font-family:var(--mono);font-size:clamp(11px,1.2vw,13px);letter-spacing:.16em;text-transform:uppercase;color:var(--sp-teal)}',
'.lang-zh .sp-place-k{font-family:var(--cjk);letter-spacing:.08em;font-weight:700}',
'.sp-place-row p{font-family:var(--sp-serif);font-size:clamp(16px,1.7vw,22px);line-height:1.6;color:var(--sp-ink);margin:0;text-wrap:pretty}',
'.lang-zh .sp-place-row p{font-family:var(--cjk);line-height:1.85}',

/* scenes */
'.sp-scenes{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.6vw,20px)}',
'.sp-scene{margin:0}',
'.sp-scene-img{aspect-ratio:4/3;overflow:hidden;border:1px solid var(--sp-line);background:#000}',
'.sp-scene img{transition:transform .6s cubic-bezier(.16,1,.3,1),filter .4s;filter:brightness(.92)}',
'.sp-scene:hover img{transform:scale(1.05);filter:brightness(1.08)}',
'.sp-scene figcaption{font-family:var(--mono);font-size:clamp(10px,1.05vw,12px);letter-spacing:.04em;color:var(--sp-dim);margin-top:11px;line-height:1.4}',
'.lang-zh .sp-scene figcaption{font-family:var(--cjk)}',

/* mechanics */
'.sp-mechs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.6vw,32px)}',
'.sp-mech{display:flex;gap:16px;padding-top:clamp(16px,2vw,22px);border-top:2px solid var(--sp-crimson)}',
'.sp-mech-n{font-family:var(--mono);font-size:clamp(13px,1.4vw,16px);color:var(--sp-ember);flex:none}',
'.sp-mech h4{font-family:var(--sp-ming);font-weight:700;font-size:clamp(17px,1.9vw,23px);color:var(--sp-ink);margin:0 0 10px;line-height:1.25}',
'.lang-zh .sp-mech h4{font-weight:900}',
'.sp-mech p{font-size:clamp(14px,1.4vw,16px);line-height:1.62;color:var(--sp-dim);margin:0;text-wrap:pretty}',
'.lang-zh .sp-mech p{color:#B7A89F}',

/* steam */
'.sp-steam{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(28px,5vw,64px);align-items:start}',
'.sp-steam-body p{font-size:clamp(15px,1.5vw,18px);line-height:1.7;color:var(--sp-ink);margin:0 0 clamp(20px,2.6vw,28px);max-width:52ch;text-wrap:pretty}',
'.lang-zh .sp-steam-body p{line-height:1.9}',
'.sp-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:clamp(22px,3vw,30px)}',
'.sp-tag{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--sp-teal);padding:5px 12px;border:1px solid rgba(95,224,206,.35);border-radius:999px}',
'.lang-zh .sp-tag{font-family:var(--cjk)}',
'.sp-credit{display:flex;flex-direction:column;gap:8px}',
'.sp-credit span{font-family:var(--mono);font-size:12.5px;color:var(--sp-ink);letter-spacing:.02em}',
'.sp-credit b{font-weight:400;color:var(--sp-dim);text-transform:uppercase;font-size:10px;letter-spacing:.14em;margin-right:8px}',
'.lang-zh .sp-credit b{font-family:var(--cjk);letter-spacing:.06em}',
'.sp-reflect{background:var(--sp-panel);border:1px solid var(--sp-line);border-left:3px solid var(--sp-ember);padding:clamp(22px,3vw,34px)}',
'.sp-reflect-label{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--sp-ember)}',
'.lang-zh .sp-reflect-label{font-family:var(--cjk)}',
'.sp-reflect p{font-family:var(--sp-serif);font-size:clamp(15px,1.55vw,19px);line-height:1.68;color:var(--sp-ink);margin:12px 0 0;text-wrap:pretty}',
'.lang-zh .sp-reflect p{font-family:var(--cjk);line-height:1.9}',

/* footer */
'.sp-foot{position:relative;text-align:center;padding:clamp(56px,9vw,110px) 24px clamp(70px,10vw,120px);border-top:1px solid var(--sp-line);',
'  background:radial-gradient(80% 120% at 50% 120%,rgba(94,20,22,.4),transparent 70%)}',
'.sp-foot-zh{font-family:var(--sp-ming);font-weight:900;font-size:clamp(60px,12vw,150px);line-height:.9;color:var(--sp-ink);letter-spacing:.1em}',
'.sp-foot-en{font-family:var(--mono);font-size:clamp(11px,1.2vw,13px);letter-spacing:.4em;text-transform:uppercase;color:var(--sp-ember);margin-top:16px}',
'.sp-foot-credit{font-family:var(--mono);font-size:11px;letter-spacing:.2em;color:var(--sp-dim);margin-top:clamp(26px,4vw,40px)}',

/* reveal */
'.sp-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.sp-rev.sp-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.sp-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:880px){',
'  .sp-hero-head{flex-direction:column}',
'  .sp-titles{text-align:left;margin-left:0}',
'  .sp-en-title{align-items:flex-start}',
'  .sp-hero-foot{grid-template-columns:1fr;gap:22px}',
'  .sp-place-row{grid-template-columns:1fr;gap:8px}',
'  .sp-scenes{grid-template-columns:repeat(2,1fr)}',
'  .sp-mechs{grid-template-columns:1fr}',
'  .sp-steam{grid-template-columns:1fr}',
'  .sp-poem{font-size:clamp(13px,3.6vw,20px)}',
'}'
  ].join('\n');

})();
