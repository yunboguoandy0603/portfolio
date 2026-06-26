/* ============================================================================
   babel-page.js — bespoke long-form case study for BABEL REFRACTIONS (id
   'babel'), the VR Final Year Project. Exposes window.renderBabel(item) which
   works-render.js calls instead of the generic buildCase. Same dark CAT301TC
   portfolio aesthetic as the Hyper Glimpse catalogue page (pure black,
   translucent Helvetica heads with a violet highlight word, crosshair grid
   lines, star + node motifs). Includes the derived catalogue. Bilingual.
   Reuses the Babel imagery cropped for the catalogue page.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/babel/';             // Babel poster decorations + photos
  var YT_DEFAULT = 'ZOjZM1__4uw';      // Babel Refractions video (kept module)
  var VKEY = 'babel-feature-yt';

  var WORLDS = [
    { n: '01', en: 'Rules', zh: '规则', tone: 'Authority', img: 'world-rules.png',
      d_en: 'Rigid geometric constructs and procedural audio that respond to your proximity — order tightened into a cage.',
      d_zh: '刚硬的几何构造，与随你靠近而回应的程序化声音——秩序被收紧成一座牢笼。' },
    { n: '02', en: 'Slogans', zh: '口号', tone: 'Propaganda', img: 'world-slogans.png',
      d_en: 'A hall of floating text fragments that reassemble as you move, staging propaganda and the slow loss of meaning.',
      d_zh: '漂浮的文字碎片随你移动而重组，演绎宣传，以及意义的缓慢流失。' },
    { n: '03', en: 'Industry', zh: '工业', tone: 'Conformity', img: 'world-industry.png',
      d_en: "A Chaplinesque machine where you are a trapped gear — conveyor belts and automation as enforced conformity.",
      d_zh: '一台卓别林式的机械，你是被困其中的齿轮——传送带与自动化，化为被迫的同质与顺从。' },
    { n: '04', en: 'Goals', zh: '目标', tone: 'Collapse', img: 'world-goals.png',
      d_en: 'A Sisyphus / Pink-Floyd "wall" of impossible goals — a fractured spire you ascend toward Babel\u2019s mythic collapse.',
      d_zh: '西西弗斯与平克·弗洛伊德《墙》般无尽的目标——一座破碎的尖塔，你向着巴别神话式的崩塌攀升。' }
  ];

  var INFL = [
    { k_en: 'Geometric abstraction', k_zh: '几何抽象', src: 'Mondrian',
      b_en: 'Flat planes and primary grids reduce the worlds to a cold, rule-bound order.',
      b_zh: '平面与原色网格，把世界简化为冷峻、受规则约束的秩序。' },
    { k_en: 'Monumental architecture', k_zh: '纪念碑式建筑', src: 'Totalitarian form',
      b_en: 'Overbearing scale and symmetry stage authority as something the body has to physically submit to.',
      b_zh: '压迫性的体量与对称，把"权威"演绎成身体必须臣服之物。' },
    { k_en: 'Educational symbolism', k_zh: '教育符号', src: 'East Asian',
      b_en: 'Familiar academic motifs turn the pressure of schooling into spatial, inhabitable metaphor.',
      b_zh: '熟悉的学业符号，把升学的压力转化为可被穿行、栖居的空间隐喻。' }
  ];

  function injectCSS() {
    if (document.getElementById('bb-css')) return;
    var s = document.createElement('style');
    s.id = 'bb-css';
    s.textContent = BB_CSS;
    document.head.appendChild(s);
  }

  /* ---- YouTube facade (kept video module) ---- */
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
    return '<button class="bb-yt bb-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" aria-label="Play Babel Refractions video">' +
      '<span class="bb-play" aria-hidden="true"></span>' +
      '<button class="bb-edit" type="button" data-edit="1" title="Change link" aria-label="Change link">\u270e</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="bb-yt bb-empty" type="button" data-add="1">' +
      '<span class="bb-empty-k">\u25B6</span>' +
      '<span class="bb-empty-l"><span class="en">Add video link</span><span class="zh">点击添加视频链接</span></span></button>';
  }
  function featureHTML() { var id = storedFeature(); return id ? facadeHTML(id) : emptyHTML(); }

  function node(en, zh) {
    return '<span class="bb-node"><i aria-hidden="true"></i><span class="en">' + en + '</span><span class="zh">' + zh + '</span></span>';
  }
  function star() { return '<span class="bb-star" aria-hidden="true"></span>'; }
  function worldsHTML() {
    return WORLDS.map(function (w) {
      return '<article class="bb-world">' +
        '<div class="bb-world-img"><img src="' + A + w.img + '" alt="The World of ' + w.en + '" /></div>' +
        '<div class="bb-world-body">' +
          '<div class="bb-world-head"><span class="bb-world-n">' + w.n + '</span>' +
            '<h4><span class="en">The World of ' + w.en + '</span><span class="zh">「' + w.zh + '」之境</span></h4>' +
            '<span class="bb-world-tone">' + w.tone + '</span></div>' +
          '<p><span class="en">' + w.d_en + '</span><span class="zh">' + w.d_zh + '</span></p>' +
        '</div>' +
      '</article>';
    }).join('');
  }
  function inflHTML() {
    return INFL.map(function (t) {
      return '<div class="bb-card">' +
        '<span class="bb-src">' + t.src + '</span>' +
        '<h4><span class="en">' + t.k_en + '</span><span class="zh">' + t.k_zh + '</span></h4>' +
        '<p><span class="en">' + t.b_en + '</span><span class="zh">' + t.b_zh + '</span></p>' +
      '</div>';
    }).join('');
  }

  function html() {
    return '' +
    '<article class="bb-page" id="case-games-babel" data-screen-label="Babel Refractions">' +

      /* ---------------- HERO ---------------- */
      '<header class="bb-hero">' +
        '<img class="bb-hero-tower" src="' + A + 'tower.png" alt="The Tower of Babel — order dissolving into colour" />' +
        '<div class="bb-hero-veil" aria-hidden="true"></div>' +
        '<div class="bb-grid" aria-hidden="true"></div>' + star() +
        '<div class="bb-hero-inner">' +
          '<div class="bb-eyebrow">' + node('Final Year Project · VR · CAT302TC · 2025', '本科毕业设计 · VR · CAT302TC · 2025') + '</div>' +
          '<h1 class="bb-title">BABEL<br/><span class="bb-hl">REFRACTIONS</span></h1>' +
          '<div class="bb-subtitle"><span class="en">A VR Journey Through Modern Alienation</span><span class="zh">一场穿越现代异化的 VR 旅程</span></div>' +
          '<p class="bb-tagline"><span class="en">A VR experience that uses the Tower of Babel myth to stage modern alienation. Four metaphorical worlds turn the headset into a mirror, forcing you to physically feel the pressure of modern life.</span><span class="zh">以"巴别塔"神话演绎现代"异化"的 VR 体验。规则、口号、工业、目标四个隐喻世界，让头显成为一面镜子，逼你亲身感受现代社会的压力。</span></p>' +
          '<div class="bb-meta">' +
            '<span><b class="en">CAT302TC FYP · AFCT, XJTLU</b><b class="zh">CAT302TC 毕设 · 影视创意学院 · 西浦</b><i class="en">Module</i><i class="zh">课程</i></span>' +
            '<span><b class="en">Game Design · VR Dev · 3D / Tech Art</b><b class="zh">设计 · VR 开发 · 三维 / 技术美术</b><i class="en">Role</i><i class="zh">角色</i></span>' +
            '<span><b>Unreal Engine 5 · Maya · Blender</b><i class="en">Built with</i><i class="zh">工具</i></span>' +
            '<span><b>Jan – May 2025</b><i class="en">Timeline</i><i class="zh">时间</i></span>' +
          '</div>' +
        '</div>' +
        '<div class="bb-scroll" aria-hidden="true"><span class="en">scroll</span><span class="zh">向下</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO (kept module) ---------------- */
      '<section class="bb-feature"><div class="bb-feature-media">' + featureHTML() + '</div>' +
        '<div class="bb-feature-cap">' + node('Babel Refractions · the VR experience in motion', 'Babel Refractions · 流动中的 VR 体验') + '</div>' +
      '</section>' +

      /* ---------------- 01 THE PREMISE ---------------- */
      '<section class="bb-sec">' +
        '<div class="bb-grid" aria-hidden="true"></div>' +
        '<div class="bb-mark"><span class="bb-num">01</span><span class="bb-kicker en">The premise</span><span class="bb-kicker zh">缘起</span></div>' +
        '<h2 class="bb-h2"><span class="en">THE HEADSET<br/>AS A <span class="bb-hl">MIRROR</span></span><span class="zh">让头显<br/>成为一面<span class="bb-hl">镜子</span></span></h2>' +
          '<div class="bb-panel">' +
            '<p><span class="en">Babel Refractions reads the myth of the Tower of Babel through the seven deadly sins to stage modern alienation \u2014 the kind produced by authority, technology and education. Each world is a different form of that estrangement.</span><span class="zh">Babel Refractions 借"巴别塔"神话，透过七宗罪来演绎现代异化——那种由权威、技术与教育所生成的疏离。每个世界，都是异化的一种不同形态。</span></p>' +
            '<p><span class="en">Rather than read about pressure, you navigate overwhelming architectures, so abstract sociology becomes a physical, embodied feeling. The headset stops being an escape from reality and becomes a way to reflect on it.</span><span class="zh">你不是阅读压力，而是穿行于压迫性的巨构，让抽象的社会学变成身体的、具身的感受。头显不再是逃离现实的出口，而成为反思现实的方式。</span></p>' +
          '</div>' +
      '</section>' +

      /* ---------------- 02 THE MYTH ---------------- */
      '<section class="bb-sec">' +
        '<div class="bb-grid" aria-hidden="true"></div>' + star() +
        '<div class="bb-mark"><span class="bb-num">02</span><span class="bb-kicker en">The myth</span><span class="bb-kicker zh">神话</span></div>' +
        '<h2 class="bb-h2"><span class="en">THE TOWER OF <span class="bb-hl">BABEL</span></span><span class="zh">巴别塔的<span class="bb-hl">神话</span></span></h2>' +
        '<div class="bb-split">' +
          '<div class="bb-panel"><span class="bb-panel-k">' + node('Human pride & divine punishment', '人之傲慢 · 神之惩罚') + '</span>' +
            '<p><span class="en">The story of the Tower of Babel comes from Genesis \u2014 a symbol of mankind\u2019s arrogance and its divine punishment. King Nimrod led humanity to raise a magnificent tower to reach across the sky and prove human ingenuity and power. The very attempt to transcend the divine order is what, in the end, brought that order crashing down.</span><span class="zh">巴别塔的故事出自《圣经·创世记》，是人类傲慢与神之惩罚的象征。宁录王带领人类建造一座宏伟之塔，欲直抵苍穹、彰显人的智巧与力量。然而正是这试图僭越神序的举动，最终招致了崩塌。</span></p></div>' +
          '<div class="bb-panel"><span class="bb-panel-k">' + node('The modern metaphor', '现代的隐喻') + '</span>' +
            '<p><span class="en">In modern society the seven deadly sins have not vanished \u2014 they have taken on more concealed forms. Pride remains the original sin, embodied in our relentless pursuit of absolute control, with every other sin revolving around that desire. Modern alienation is, in essence, a new manifestation of these old sins.</span><span class="zh">在现代社会，七宗罪并未消失，只是换上了更隐蔽的形态。傲慢仍是原初之罪，体现在我们对绝对控制的不懈追逐，其余诸罪皆围绕这一欲望旋转。现代的异化，本质上正是这些古老罪愆的新形态。</span></p></div>' +
        '</div>' +
        '<figure class="bb-sins"><img src="' + A + 'sins.png" alt="The seven deadly sins — Sloth, Envy, Greed, Wrath, Lust, Pride, Gluttony" /><figcaption>' + node('The Seven Deadly Sins · pride at the centre', '七宗罪 · 傲慢居于中心') + '</figcaption></figure>' +
      '</section>' +

      /* ---------------- 03 FOUR AGES ---------------- */
      '<section class="bb-sec bb-sec-worlds">' +
        '<div class="bb-mark"><span class="bb-num">03</span><span class="bb-kicker en">Metaphorical level design</span><span class="bb-kicker zh">隐喻关卡</span></div>' +
        '<h2 class="bb-h2"><span class="en">FOUR <span class="bb-hl">AGES</span>,<br/>ONE COLLAPSE</span><span class="zh">四个<span class="bb-hl">纪元</span>，<br/>一场崩塌</span></h2>' +
        '<div class="bb-worlds">' + worldsHTML() + '</div>' +
      '</section>' +

      /* ---------------- 03 INFLUENCES ---------------- */
      '<section class="bb-sec">' +
        '<div class="bb-grid" aria-hidden="true"></div>' + star() +
        '<div class="bb-mark"><span class="bb-num">04</span><span class="bb-kicker en">Visual influences</span><span class="bb-kicker zh">视觉影响</span></div>' +
        '<h2 class="bb-h2 bb-h2-sm"><span class="en">FEEL IT, DON\u2019T <span class="bb-hl">READ</span> IT</span><span class="zh">去感受，而非<span class="bb-hl">阅读</span></span></h2>' +
        '<div class="bb-cards3">' + inflHTML() + '</div>' +
      '</section>' +

      /* ---------------- 04 TESTING & OUTCOMES ---------------- */
      '<section class="bb-sec bb-sec-test">' +
        '<div class="bb-grid" aria-hidden="true"></div>' + star() +
        '<div class="bb-mark"><span class="bb-num">05</span><span class="bb-kicker en">Testing & outcomes</span><span class="bb-kicker zh">测试与成果</span></div>' +
        '<h2 class="bb-h2"><span class="en">PUT ON THE <span class="bb-hl">HEADSET</span></span><span class="zh">戴上<span class="bb-hl">头显</span></span></h2>' +
        '<div class="bb-stats">' +
          '<div class="bb-stat"><b>18</b><span class="en">testers, on Quest 2 &amp; Vive Pro</span><span class="zh">人测试 · Quest 2 与 Vive Pro</span></div>' +
          '<div class="bb-stat"><b>~15<i>min</i></b><span class="en">average experience length</span><span class="zh">平均体验时长</span></div>' +
          '<div class="bb-stat"><b>32</b><span class="en">in-engine captures, themed by world</span><span class="zh">张引擎内捕捉 · 按世界归类</span></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 05 THE CATALOGUE (catalog content) ---------------- */
      '<section class="bb-sec bb-sec-cat">' +
        '<div class="bb-grid" aria-hidden="true"></div>' +
        '<div class="bb-mark"><span class="bb-num">06</span><span class="bb-kicker en">The derived catalogue</span><span class="bb-kicker zh">衍生画册</span></div>' +
        '<h2 class="bb-h2"><span class="en">A WORLD,<br/>MADE <span class="bb-hl">PRINTABLE</span></span><span class="zh">一个世界，<br/>被<span class="bb-hl">印刷</span>出来</span></h2>' +
        '<div class="bb-split">' +
          '<div class="bb-panel">' +
            '<p><span class="en">From the VR came a 24-page hardcover catalogue \u2014 "Hyper Glimpse" \u2014 that materializes the project\u2019s visual language in print: concept, pipeline, world overviews and reflection, with in-engine stills up-scaled to 8K through the school\u2019s AI models.</span><span class="zh">从这件 VR 作品，衍生出一本 24 页的精装画册——「Hyper Glimpse」——把项目的视觉语言落于纸面：概念、管线、世界总览与反思，引擎内截图经学校的 AI 模型超分至 8K。</span></p>' +
            '<p><span class="en">The catalogue is now an <b>official teaching case</b>: its physical copy and PDF are archived in the Academy of Film &amp; Creative Technology\u2019s repository \u2014 my undergraduate college \u2014 kept for continued course use, and used by Professor Kim Lau as a demonstration case in his CAT209 Cross-Media Design course.</span><span class="zh">这本画册如今是一份<b>官方教学案例</b>：实体与 PDF 被存入影视创意学院（AFCT，我的本科学院）的资料库，作为日后课程长期沿用的资料，并由 Kim Lau 教授用作其"跨媒介设计"课程（CAT209）的示范案例。</span></p>' +
            '<button class="bb-link" type="button" data-go-papers="1"><span class="en">See the full catalogue case \u2014 Hyper Glimpse</span><span class="zh">查看完整画册案例 —— Hyper Glimpse</span> <span class="bb-link-arr">\u2197</span></button>' +
          '</div>' +
          '<figure class="bb-fig"><img src="' + A + 'catalog.jpg" alt="The printed Babel Refractions catalogue spreads, fanned out" /><figcaption>' + node('The printed catalogue · fanned spreads', '印出的画册 · 跨页铺陈') + '</figcaption></figure>' +
        '</div>' +
      '</section>' +

      /* ---------------- 07 EXHIBITION ---------------- */
      '<section class="bb-sec bb-sec-exh">' +
        '<div class="bb-grid" aria-hidden="true"></div>' +
        '<div class="bb-mark"><span class="bb-num">07</span><span class="bb-kicker en">The exhibition</span><span class="bb-kicker zh">展览现场</span></div>' +
        '<h2 class="bb-h2"><span class="en">SHOWN IN<br/>THE <span class="bb-hl">DARK</span></span><span class="zh">在<span class="bb-hl">暗处</span><br/>展出</span></h2>' +
        '<figure class="bb-fig bb-fig-wide bb-exh-fig"><img src="' + A + 'exhibition.jpg" alt="Babel Refractions exhibited — headset and spectator screens in a darkened gallery" /><figcaption>' + node('Dual-screen installation · headset + spectator view', '双屏装置 · 头显与旁观视角') + '</figcaption></figure>' +
        '<div class="bb-panel bb-exh-panel">' +
          '<p><span class="en">Babel Refractions was shown as a playable installation in a darkened gallery. A spectator screen mirrors what the player sees as they move through the four ages in the headset, so an audience can watch the alienation unfold in real time \u2014 the private VR experience, made public.</span><span class="zh">Babel Refractions 以可体验的装置形式，在一处暗下来的展厅中展出。一块旁观屏实时镜像玩家在头显中穿行四个纪元时所见，观众得以在现场目睹异化如何展开——私密的 VR 体验，由此成为公共的凝视。</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- REFLECTION ---------------- */
      '<section class="bb-sec bb-sec-reflect">' +
        '<span class="bb-reflect-label">' + node('Reflection', '反思') + '</span>' +
        '<blockquote class="bb-reflect"><p class="en">The perfect close to my undergrad \u2014 and proof that VR is a serious medium for philosophical storytelling. We can use digital tools not to escape reality but to reflect on it; this shaped my focus on immersive media and the alienation we live inside.</p>' +
        '<p class="zh">为本科收尾的最佳方式，也证明了 VR 是哲学叙事的严肃媒介。数字工具不该只是逃离现实，而能让我们反思现实——这塑造了我对沉浸媒介与"异化"的研究焦点。</p></blockquote>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="bb-foot">' +
        '<div class="bb-grid" aria-hidden="true"></div>' + star() +
        '<div class="bb-foot-title">BABEL<br/><span class="bb-hl">REFRACTIONS</span></div>' +
        '<div class="bb-foot-sub">' + node('Final Year Project · VR · 2025', '本科毕业设计 · VR · 2025') + '</div>' +
        '<div class="bb-foot-credit">Academy of Film &amp; Creative Technology · XJTLU</div>' +
      '</footer>' +

    '</article>';
  }

  function renderBabel(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('bb-in'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      art.querySelectorAll('.bb-sec, .bb-world, .bb-card, .bb-fig, .bb-stat').forEach(function (n) { n.classList.add('bb-rev'); io.observe(n); });
    });

    // ---- feature video module ----
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem(VKEY, id); } catch (e) {}
      var media = art.querySelector('.bb-feature-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('.bb-feature-media');
      if (!media) return;
      var cur = ''; try { var s = localStorage.getItem(VKEY); cur = (s === null ? YT_DEFAULT : s); } catch (e) { cur = YT_DEFAULT; }
      var box = document.createElement('div');
      box.className = 'bb-yt bb-editor';
      box.innerHTML =
        '<label class="bb-editor-l"><span class="en">Paste a YouTube link</span><span class="zh">粘贴 YouTube 链接</span></label>' +
        '<input class="bb-editor-in" type="text" value="' + cur.replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="bb-editor-btns"><button type="button" class="bb-editor-save">Save</button>' +
        '<button type="button" class="bb-editor-clear">Clear</button>' +
        '<button type="button" class="bb-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.bb-editor-in');
      input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(input.value); } else if (e.key === 'Escape') { commit(cur); } });
      box.querySelector('.bb-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.bb-editor-cancel').addEventListener('click', function () { commit(cur); });
      box.querySelector('.bb-editor-clear').addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var go = e.target.closest && e.target.closest('[data-go-papers]');
      if (go) { e.preventDefault(); if (window.WORKS && window.WORKS.open) window.WORKS.open('papers'); return; }
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.bb-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'bb-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Babel Refractions';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderBabel = renderBabel;

  /* ---------------------------- styles ---------------------------- */
  var BB_CSS = [
'.bb-page{--bb-bg:#040405;--bb-ink:#E7E7EC;--bb-grey:rgba(231,231,236,.34);--bb-dim:#8C8C95;',
'  --bb-violet:#5C3C86;--bb-violet-2:#7B54AA;--bb-line:rgba(231,231,236,.13);--bb-panel:rgba(150,150,160,.10);',
'  --bb-sans:"Helvetica Neue",Helvetica,Arial,sans-serif;',
'  background:var(--bb-bg);color:var(--bb-ink);font-family:var(--bb-sans);line-height:1.6;',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));overflow:hidden}',
'.lang-zh .bb-page{font-family:var(--cjk)}',
'.bb-page img{display:block;width:100%;height:100%;object-fit:cover}',

'.bb-grid{position:absolute;inset:0;z-index:0;pointer-events:none;',
'  background:linear-gradient(90deg,transparent calc(50% - .5px),var(--bb-line) 50%,transparent calc(50% + .5px)) 78% 0/1px 100% no-repeat,',
'  linear-gradient(0deg,transparent calc(50% - .5px),var(--bb-line) 50%,transparent calc(50% + .5px)) 0 22%/100% 1px no-repeat}',
'.bb-star{position:absolute;z-index:1;width:60px;height:60px;pointer-events:none;opacity:.7;right:8%;top:14%}',
'.bb-star::before,.bb-star::after{content:"";position:absolute;background:rgba(231,231,236,.5)}',
'.bb-star::before{left:50%;top:0;width:1px;height:100%;transform:translateX(-.5px);box-shadow:0 0 8px 1px rgba(123,84,170,.7)}',
'.bb-star::after{top:50%;left:0;height:1px;width:100%;transform:translateY(-.5px);box-shadow:0 0 8px 1px rgba(123,84,170,.7)}',

'.bb-node{display:inline-flex;align-items:center;gap:9px;font-family:var(--bb-sans);font-size:clamp(10px,1.05vw,12px);letter-spacing:.18em;text-transform:uppercase;color:var(--bb-dim)}',
'.lang-zh .bb-node{font-family:var(--cjk);letter-spacing:.08em}',
'.bb-node i{width:7px;height:7px;border:1px solid var(--bb-violet-2);border-radius:50%;flex:none;position:relative}',
'.bb-node i::after{content:"";position:absolute;left:9px;top:50%;width:22px;height:1px;background:var(--bb-line)}',

'.bb-hl{display:inline-block;background:var(--bb-violet);color:rgba(255,255,255,.62);padding:0 .14em;line-height:1}',
'.lang-zh .bb-hl{padding:0 .08em}',

/* HERO */
'.bb-hero{position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden;isolation:isolate;padding:clamp(40px,6vw,90px) clamp(24px,5vw,80px)}',
'.bb-hero-tower{position:absolute;right:-1%;top:0;height:100%;width:auto;max-width:50%;object-fit:contain;object-position:right center;z-index:-3}',
'.bb-hero .bb-title{font-size:clamp(38px,4.6vw,60px)}',
'.bb-hero .bb-eyebrow,.bb-hero .bb-subtitle,.bb-hero .bb-tagline,.bb-hero .bb-meta{max-width:min(580px,52%)}',
'.bb-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,#040405 0%,#040405 30%,rgba(4,4,5,.5) 62%,rgba(4,4,5,.12) 100%),linear-gradient(0deg,rgba(4,4,5,.85),transparent 55%)}',
'.bb-hero-inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;width:100%}',
'.bb-eyebrow{margin-bottom:clamp(18px,2.6vw,28px)}',
'.bb-title{font-family:var(--bb-sans);font-weight:800;font-size:clamp(58px,11vw,150px);line-height:.92;letter-spacing:-.01em;color:var(--bb-grey);margin:0;text-transform:uppercase}',
'.lang-zh .bb-title{font-family:var(--cjk);font-weight:900;letter-spacing:.02em}',
'.bb-subtitle{font-family:var(--bb-sans);font-weight:700;font-size:clamp(15px,2vw,26px);letter-spacing:.04em;text-transform:uppercase;color:var(--bb-ink);margin-top:clamp(16px,2vw,24px)}',
'.lang-zh .bb-subtitle{font-family:var(--cjk)}',
'.bb-tagline{max-width:54ch;font-size:clamp(14px,1.5vw,18px);line-height:1.62;color:var(--bb-dim);margin-top:clamp(16px,2vw,22px);text-wrap:pretty}',
'.bb-meta{display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,46px);margin-top:clamp(26px,3.4vw,40px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--bb-line)}',
'.bb-meta span{display:flex;flex-direction:column;gap:4px}',
'.bb-meta b{font-size:clamp(12.5px,1.3vw,15px);font-weight:700;color:var(--bb-ink);letter-spacing:.01em}',
'.bb-meta i{font-style:normal;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--bb-dim)}',
'.lang-zh .bb-meta i{letter-spacing:.08em}',
'.bb-scroll{position:absolute;right:clamp(18px,4vw,50px);bottom:clamp(22px,3vw,40px);z-index:2;display:flex;flex-direction:column;align-items:center;gap:7px;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--bb-dim)}',
'.bb-scroll i{width:1px;height:38px;background:linear-gradient(var(--bb-violet-2),transparent);animation:bbDrip 1.9s ease-in-out infinite}',
'@keyframes bbDrip{0%,100%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.bb-scroll i{animation:none}}',

/* FEATURE VIDEO */
'.bb-feature{position:relative}',
'.bb-feature-media{position:relative}',
'.bb-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:90vh;border:0;display:block}',
'.bb-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;border-top:1px solid var(--bb-line);border-bottom:1px solid var(--bb-line);transition:filter .2s}',
'.bb-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,4,5,.12),rgba(4,4,5,.5))}',
'.bb-facade:hover{filter:brightness(1.08)}',
'.bb-play{position:relative;z-index:1;width:clamp(62px,7vw,86px);height:clamp(62px,7vw,86px);border-radius:50%;background:rgba(4,4,5,.5);border:2px solid var(--bb-violet-2);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.bb-play::before{content:"";position:absolute;top:50%;left:55%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 19px;border-color:transparent transparent transparent #fff}',
'.bb-facade:hover .bb-play{transform:scale(1.08);background:rgba(123,84,170,.3)}',
'.bb-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(231,231,236,.4);background:rgba(4,4,5,.6);color:var(--bb-ink);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}',
'.bb-facade:hover .bb-edit{opacity:1}',
'.bb-edit:hover{border-color:var(--bb-violet-2);color:#fff}',
'.bb-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:pointer;background:#08080a;border-top:1px solid var(--bb-line);border-bottom:1px solid var(--bb-line);color:var(--bb-dim);font-size:13px;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}',
'.lang-zh .bb-empty{font-family:var(--cjk);letter-spacing:.06em}',
'.bb-empty:hover{color:var(--bb-violet-2)}',
'.bb-empty-k{font-size:clamp(34px,4.5vw,52px);color:var(--bb-violet-2)}',
'.bb-editor{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:clamp(22px,3vw,40px);background:#08080a;border-top:1px solid var(--bb-line);border-bottom:1px solid var(--bb-line)}',
'.bb-editor-l{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--bb-dim)}',
'.lang-zh .bb-editor-l{font-family:var(--cjk)}',
'.bb-editor-in{width:min(560px,82%);box-sizing:border-box;background:#121214;border:1px solid var(--bb-line);color:var(--bb-ink);font-size:14px;padding:11px 13px;border-radius:3px;outline:none}',
'.bb-editor-in:focus{border-color:var(--bb-violet-2)}',
'.bb-editor-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}',
'.bb-editor-btns button{font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:3px;border:1px solid var(--bb-line);background:transparent;color:var(--bb-ink)}',
'.bb-editor-save{background:var(--bb-violet)!important;color:#fff!important;border-color:var(--bb-violet)!important}',
'.bb-editor-clear:hover,.bb-editor-cancel:hover{border-color:var(--bb-violet-2);color:#fff}',
'.bb-feature-cap{display:flex;justify-content:center;padding:16px}',

/* SECTIONS */
'.bb-sec{position:relative;max-width:1180px;margin:0 auto;padding:clamp(60px,9vw,120px) clamp(24px,5vw,72px);border-top:1px solid var(--bb-line)}',
'.bb-mark{position:relative;z-index:2;display:flex;align-items:center;gap:14px;margin-bottom:clamp(22px,3vw,36px)}',
'.bb-num{font-size:clamp(12px,1.3vw,15px);color:var(--bb-violet-2);letter-spacing:.1em}',
'.bb-kicker{font-size:clamp(10px,1.05vw,12.5px);letter-spacing:.24em;text-transform:uppercase;color:var(--bb-dim)}',
'.lang-zh .bb-kicker{font-family:var(--cjk);letter-spacing:.1em}',
'.bb-h2{position:relative;z-index:2;font-family:var(--bb-sans);font-weight:800;font-size:clamp(34px,6.4vw,90px);line-height:.98;letter-spacing:-.01em;text-transform:uppercase;color:var(--bb-grey);margin:0 0 clamp(28px,4vw,52px)}',
'.lang-zh .bb-h2{font-family:var(--cjk);font-weight:900;letter-spacing:.02em}',
'.bb-h2-sm{font-size:clamp(30px,5vw,64px)}',

'.bb-split{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(24px,4vw,52px);align-items:start}',
'.bb-panel{background:var(--bb-panel);border:1px solid var(--bb-line);padding:clamp(22px,2.8vw,34px)}',
'.bb-panel p{font-size:clamp(13px,1.4vw,16px);line-height:1.7;color:var(--bb-ink);text-align:justify;margin:0 0 1em;text-wrap:pretty}',
'.bb-panel p:last-child{margin-bottom:0}',
'.bb-panel b{color:#fff;font-weight:700}',
'.lang-zh .bb-panel p{text-align:left;line-height:1.9}',
'.bb-link{display:inline-flex;align-items:center;gap:9px;margin-top:clamp(18px,2.4vw,26px);font-family:var(--bb-sans);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--bb-ink);background:transparent;border:1px solid var(--bb-violet-2);padding:11px 18px;cursor:pointer;transition:background .2s,color .2s}',
'.lang-zh .bb-link{font-family:var(--cjk);letter-spacing:.06em}',
'.bb-link:hover{background:var(--bb-violet);color:#fff}',
'.bb-link-arr{font-size:13px}',
'.bb-fig{margin:0;border:1px solid var(--bb-line);background:#000;overflow:hidden;position:relative}',
'.bb-fig img{aspect-ratio:4/3;transition:transform .7s cubic-bezier(.16,1,.3,1)}',
'.bb-fig:hover img{transform:scale(1.04)}',
'.bb-fig figcaption{position:absolute;left:0;bottom:0;width:100%;box-sizing:border-box;padding:12px 14px;background:linear-gradient(0deg,rgba(4,4,5,.86),transparent)}',
'.bb-fig-wide{margin-top:clamp(24px,3.4vw,44px)}',
'.bb-fig-wide img{aspect-ratio:21/9}',
'.bb-cat-figs{display:flex;flex-direction:column;gap:clamp(14px,2vw,20px)}',
'.bb-cat-figs .bb-fig img{aspect-ratio:16/10}',

/* worlds */
'.bb-worlds{position:relative;z-index:2;display:flex;flex-direction:column;gap:clamp(30px,4.5vw,64px)}',
'.bb-world{background:var(--bb-panel);border:1px solid var(--bb-line);border-top:2px solid var(--bb-violet);padding:0;overflow:hidden}',
'.bb-world-img{aspect-ratio:21/8;overflow:hidden;background:#000;border-bottom:1px solid var(--bb-line)}',
'.bb-world-img img{transition:transform .7s cubic-bezier(.16,1,.3,1)}',
'.bb-world:hover .bb-world-img img{transform:scale(1.05)}',
'.bb-world-body{padding:clamp(18px,2.4vw,30px)}',
'.bb-world-head{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:12px}',
'.bb-world-head h4{margin:0}',
'.bb-world-head .bb-world-tone{margin-left:auto}',
'.bb-panel-k{display:block;margin-bottom:12px}',
'.bb-sins{margin:clamp(24px,3.4vw,44px) auto 0;max-width:760px;border:1px solid var(--bb-line);background:#08080a;padding:clamp(16px,2vw,24px) clamp(18px,2.4vw,30px)}',
'.bb-sins img{width:100%;height:auto;object-fit:contain}',
'.bb-sins figcaption{display:flex;justify-content:center;margin-top:14px}',
'.bb-exh-fig img{aspect-ratio:16/9}',
'.bb-exh-panel{margin-top:clamp(20px,2.6vw,30px);max-width:none}',
'.bb-world-top{display:flex;align-items:center;justify-content:space-between;gap:8px}',
'.bb-world-n{font-size:11px;letter-spacing:.16em;color:var(--bb-violet-2)}',
'.bb-world-tone{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--bb-dim)}',
'.bb-world h4{font-family:var(--bb-sans);font-weight:700;font-size:clamp(20px,2.6vw,34px);text-transform:uppercase;color:var(--bb-ink);margin:12px 0 12px;letter-spacing:.02em}',
'.lang-zh .bb-world h4{font-family:var(--cjk);font-weight:900}',
'.bb-world p{font-size:clamp(14px,1.45vw,17px);line-height:1.62;color:var(--bb-dim);margin:0;max-width:74ch;text-wrap:pretty}',

/* 3-up cards */
'.bb-cards3{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.2vw,26px)}',
'.bb-card{background:var(--bb-panel);border:1px solid var(--bb-line);padding:clamp(20px,2.6vw,30px)}',
'.bb-src{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--bb-violet-2);margin-bottom:12px}',
'.bb-card h4{font-family:var(--bb-sans);font-weight:700;font-size:clamp(15px,1.7vw,21px);text-transform:uppercase;color:var(--bb-ink);margin:0 0 12px;letter-spacing:.02em}',
'.lang-zh .bb-card h4{font-family:var(--cjk);font-weight:800;text-transform:none}',
'.bb-card p{font-size:clamp(13px,1.35vw,15.5px);line-height:1.62;color:var(--bb-dim);margin:0;text-wrap:pretty}',

/* stats */
'.bb-sec-test{background:linear-gradient(180deg,rgba(92,60,134,.12),transparent 60%)}',
'.bb-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4vw,26px)}',
'.bb-stat{background:var(--bb-panel);border:1px solid var(--bb-line);padding:clamp(20px,2.8vw,32px)}',
'.bb-stat b{display:block;font-family:var(--bb-sans);font-weight:800;font-size:clamp(40px,6vw,76px);color:#fff;line-height:1;letter-spacing:-.02em}',
'.bb-stat b i{font-style:normal;font-size:.32em;font-weight:700;color:var(--bb-dim);margin-left:4px;letter-spacing:0}',
'.bb-stat span{display:block;font-size:clamp(12px,1.25vw,14px);line-height:1.45;color:var(--bb-dim);margin-top:12px;text-wrap:pretty}',

/* reflection */
'.bb-sec-reflect{text-align:center}',
'.bb-reflect-label{display:inline-flex;margin-bottom:clamp(20px,3vw,30px)}',
'.bb-reflect{margin:0 auto;max-width:64ch}',
'.bb-reflect p{font-size:clamp(18px,2.2vw,30px);line-height:1.5;color:var(--bb-ink);font-weight:300;margin:0;text-wrap:pretty}',
'.lang-zh .bb-reflect p{line-height:1.75;font-weight:400}',

/* footer */
'.bb-foot{position:relative;text-align:center;padding:clamp(60px,9vw,120px) 24px clamp(70px,10vw,120px);border-top:1px solid var(--bb-line);overflow:hidden}',
'.bb-foot-title{position:relative;z-index:2;font-family:var(--bb-sans);font-weight:800;font-size:clamp(50px,10vw,140px);line-height:.9;text-transform:uppercase;color:var(--bb-grey);letter-spacing:-.01em}',
'.lang-zh .bb-foot-title{font-family:var(--cjk);font-weight:900}',
'.bb-foot-sub{position:relative;z-index:2;display:flex;justify-content:center;margin-top:20px}',
'.bb-foot-credit{position:relative;z-index:2;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--bb-dim);margin-top:clamp(22px,3vw,36px)}',

'.bb-rev{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.bb-rev.bb-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.bb-rev{opacity:1;transform:none;transition:none}}',

'@media (max-width:880px){',
'  .bb-split,.bb-worlds,.bb-cards3,.bb-stats{grid-template-columns:1fr}',
'  .bb-worlds{grid-template-columns:1fr 1fr}',
'  .bb-fig-wide img{aspect-ratio:16/9}',
'  .bb-hero-tower{max-width:100%;width:100%;height:56%;top:auto;bottom:0;right:0;object-fit:cover;object-position:center;opacity:.32}',
'  .bb-grid,.bb-star{display:none}',
'}'
  ].join('\n');

})();
