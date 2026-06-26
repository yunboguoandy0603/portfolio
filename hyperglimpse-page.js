/* ============================================================================
   hyperglimpse-page.js — bespoke long-form case study for HYPER GLIMPSE ·
   Babel Refractions Catalogue (id 'hyperglimpse'). Exposes
   window.renderHyperGlimpse(item) which works-render.js calls instead of the
   generic buildCase. Replicates the project's own CAT301TC portfolio aesthetic:
   pure black, translucent overlapping grey panels, thin crosshair grid lines,
   huge translucent Helvetica heads with one word in a violet highlight block,
   circle-node bullets, justified tracked caption text. Bilingual via .en/.zh.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/hyperglimpse/';
  var YT_DEFAULT = 'ZOjZM1__4uw';        // Babel Refractions video (kept from the module)
  var VKEY = 'hyperglimpse-feature-yt';

  var WORLDS = [
    { n: '01', en: 'Rules', zh: '规则',
      d_en: 'Rigid geometric constructs and procedural audio that respond to your proximity — order as a cage.',
      d_zh: '刚硬的几何构造，与随你靠近而回应的程序化声音——秩序成为牢笼。' },
    { n: '02', en: 'Slogans', zh: '口号',
      d_en: 'A hall of floating text fragments that reassemble as you move, staging propaganda and lost meaning.',
      d_zh: '漂浮的文字碎片随你移动而重组，演绎宣传与意义的流失。' },
    { n: '03', en: 'Industry', zh: '工业',
      d_en: 'A dystopian factoryscape where machinery and conveyor belts become automated conformity.',
      d_zh: '反乌托邦的工厂景观，机械与传送带化为自动化的同质与顺从。' },
    { n: '04', en: 'Goals', zh: '目标',
      d_en: "A fractured spire you ascend through layered holographic projections — Babel's mythic collapse.",
      d_zh: '一座破碎的尖塔，你穿过层层全息投影向上攀升——巴别神话式的崩塌。' }
  ];

  var PIPE = [
    { k_en: 'Procedural modeling', k_zh: '程序化建模', t: 'Blender',
      b_en: 'Architectural fragments and modular environment pieces, built for rapid iteration.',
      b_zh: '建筑碎片与模块化场景，为快速迭代而建。' },
    { k_en: 'Real-time interaction', k_zh: '实时交互', t: 'Unreal Engine',
      b_en: 'Blueprints script proximity triggers, dynamic lighting and audio synthesis that respond to movement.',
      b_zh: '蓝图编写靠近触发、动态光照与音频合成，回应玩家的移动。' },
    { k_en: 'AI texture up-scaling', k_zh: 'AI 纹理超分', t: "School's AI models",
      b_en: 'In-engine renders pushed through the school\u2019s AI up-scaler to meet 8K print, cutting manual retouching by ~40%.',
      b_zh: '把引擎渲染送入学校的 AI 超分模型以满足 8K 印刷，手工修图减少约 40%。' },
    { k_en: 'Colour & mock-ups', k_zh: '校色与样张', t: 'Lightroom · Photoshop',
      b_en: 'Batch colour normalization, then mock-up spreads to test legibility before layout.',
      b_zh: '批量校色，再做样张，在排版前先测试可读性。' },
    { k_en: 'Layout', k_zh: '排版', t: 'InDesign',
      b_en: 'Master pages, paragraph styles and GREP automation streamline 24 pages of recurring elements.',
      b_zh: '母版、段落样式与 GREP 自动化，统筹 24 页反复出现的元素。' },
    { k_en: 'Print production', k_zh: '印刷生产', t: 'ICC · paper · binding',
      b_en: 'ICC colour profiles, paper-stock selection, proofing cycles and a technical brief for the bindery.',
      b_zh: 'ICC 色彩特性、纸张选择、打样循环，以及交给装订厂的技术说明。' }
  ];

  var CHAL = [
    { k_en: 'Screen \u2192 print', k_zh: '屏幕到纸面',
      b_en: 'Monitor-optimized dark spreads dulled on paper. Fix: light-mode variants and early physical mock-ups of critical spreads.',
      b_zh: '为屏幕优化的暗色跨页在纸上发闷。解决：加入浅色版本，并尽早对关键跨页做实体打样。' },
    { k_en: 'Colour management', k_zh: '色彩管理',
      b_en: 'Proof hue-shifts from missing profiles. Fix: standardize sRGB \u2192 US Web Coated SWOP, embed ICC in every export, ship a pagination map.',
      b_zh: '缺失特性导致打样偏色。解决：统一 sRGB \u2192 US Web Coated SWOP，导出内嵌 ICC，并附页序图。' },
    { k_en: '8K export', k_zh: '8K 导出',
      b_en: 'UE\u2019s renderer struggled at 8K. Fix: AI up-scaling after render to enhance detail and smooth artifacts.',
      b_zh: 'UE 渲染难以稳定输出 8K。解决：渲染后用 AI 超分增强细节、消除伪影。' }
  ];

  var THEORY = [
    { k_en: 'New media as language', k_zh: '新媒体即语言', src: 'Manovich, 2001',
      b_en: 'VR and print are treated as one communicative system, sharing a grammar of colour, form and typography.',
      b_zh: '把 VR 与印刷视为同一套传播系统，共享色彩、形态与字体的"语法"。' },
    { k_en: 'Affect & intensities', k_zh: '情动与强度', src: 'Deleuze & Guattari, 1987',
      b_en: 'Each world\u2019s mood is designed through colour and form — warm "awakening" spreads against colder "reconciliation" sections.',
      b_zh: '用色彩与形态设计每个世界的情绪——温暖的"觉醒"跨页，对比清冷的"和解"章节。' },
    { k_en: 'Embodied engagement', k_zh: '具身参与', src: 'Chen & Li, 2023',
      b_en: 'Reflective prompts beside the imagery invite readers to mentally inhabit the VR spaces, even in print.',
      b_zh: '图像旁的反思式提示，邀请读者即使在纸面也能在心中"走进"那些 VR 空间。' }
  ];

  function injectCSS() {
    if (document.getElementById('hg-css')) return;
    var s = document.createElement('style');
    s.id = 'hg-css';
    s.textContent = HG_CSS;
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
    return '<button class="hg-yt hg-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" aria-label="Play Babel Refractions video">' +
      '<span class="hg-play" aria-hidden="true"></span>' +
      '<button class="hg-edit" type="button" data-edit="1" title="Change link" aria-label="Change link">\u270e</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="hg-yt hg-empty" type="button" data-add="1">' +
      '<span class="hg-empty-k">\u25B6</span>' +
      '<span class="hg-empty-l"><span class="en">Add video link</span><span class="zh">点击添加视频链接</span></span></button>';
  }
  function featureHTML() { var id = storedFeature(); return id ? facadeHTML(id) : emptyHTML(); }

  function node(en, zh) {
    return '<span class="hg-node"><i aria-hidden="true"></i><span class="en">' + en + '</span><span class="zh">' + zh + '</span></span>';
  }
  function worldsHTML() {
    return WORLDS.map(function (w) {
      return '<article class="hg-world">' +
        '<span class="hg-world-n">' + w.n + '</span>' +
        '<h4><span class="en">The World of ' + w.en + '</span><span class="zh">「' + w.zh + '」之境</span></h4>' +
        '<p><span class="en">' + w.d_en + '</span><span class="zh">' + w.d_zh + '</span></p>' +
      '</article>';
    }).join('');
  }
  function pipeHTML() {
    return PIPE.map(function (p, i) {
      return '<div class="hg-step">' +
        '<span class="hg-step-n">' + ('0' + (i + 1)) + '</span>' +
        '<div class="hg-step-b">' +
          '<span class="hg-step-tool">' + p.t + '</span>' +
          '<h4><span class="en">' + p.k_en + '</span><span class="zh">' + p.k_zh + '</span></h4>' +
          '<p><span class="en">' + p.b_en + '</span><span class="zh">' + p.b_zh + '</span></p>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  function chalHTML() {
    return CHAL.map(function (c) {
      return '<div class="hg-card">' +
        '<h4>' + node(c.k_en, c.k_zh) + '</h4>' +
        '<p><span class="en">' + c.b_en + '</span><span class="zh">' + c.b_zh + '</span></p>' +
      '</div>';
    }).join('');
  }
  function theoryHTML() {
    return THEORY.map(function (t) {
      return '<div class="hg-card">' +
        '<span class="hg-src">' + t.src + '</span>' +
        '<h4><span class="en">' + t.k_en + '</span><span class="zh">' + t.k_zh + '</span></h4>' +
        '<p><span class="en">' + t.b_en + '</span><span class="zh">' + t.b_zh + '</span></p>' +
      '</div>';
    }).join('');
  }
  function star() { return '<span class="hg-star" aria-hidden="true"></span>'; }

  function html() {
    return '' +
    '<article class="hg-page" id="case-papers-hyperglimpse" data-screen-label="Hyper Glimpse">' +

      /* ---------------- HERO ---------------- */
      '<header class="hg-hero">' +
        '<img class="hg-hero-bg" src="' + A + 'cover.jpg" alt="Babel Refractions catalogue cover montage" />' +
        '<div class="hg-hero-veil" aria-hidden="true"></div>' +
        '<div class="hg-grid" aria-hidden="true"></div>' + star() +
        '<div class="hg-hero-inner">' +
          '<div class="hg-eyebrow">' + node('Cross-media publishing · Official teaching case · 2025', '跨媒介出版 · 官方教学案例 · 2025') + '</div>' +
          '<h1 class="hg-title">BABEL<br/><span class="hg-hl">REFRACTIONS</span></h1>' +
          '<div class="hg-subtitle"><span class="en">The Catalogue \u2014 \u201cHyper Glimpse\u201d</span><span class="zh">画册 ——「Hyper Glimpse」</span></div>' +
          '<p class="hg-tagline"><span class="en">A 24-page hardcover that turns an immersive VR world into something you can hold \u2014 and that the college keeps teaching from.</span><span class="zh">一本 24 页的精装画册，把一个沉浸式 VR 世界变成可以握在手里之物——也成为学院持续沿用的教案。</span></p>' +
          '<div class="hg-meta">' +
            '<span><b class="en">CAT301TC · AFCT, XJTLU</b><b class="zh">CAT301TC · 影视创意学院 · 西浦</b><i class="en">Module</i><i class="zh">课程</i></span>' +
            '<span><b>Kim Lau</b><i class="en">Supervisor</i><i class="zh">导师</i></span>' +
            '<span><b class="en">TA · Cross-media designer · Photographer</b><b class="zh">助教 · 跨媒介设计 · 摄影</b><i class="en">Role</i><i class="zh">角色</i></span>' +
            '<span><b>Jan – May 2025</b><i class="en">Timeline</i><i class="zh">时间</i></span>' +
          '</div>' +
        '</div>' +
        '<div class="hg-scroll" aria-hidden="true"><span class="en">scroll</span><span class="zh">向下</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO (kept module) ---------------- */
      '<section class="hg-feature"><div class="hg-feature-media">' + featureHTML() + '</div>' +
        '<div class="hg-feature-cap">' + node('Babel Refractions · the VR world the catalogue documents', 'Babel Refractions · 画册所记录的 VR 世界') + '</div>' +
      '</section>' +

      /* ---------------- 01 THE DERIVATIVE ---------------- */
      '<section class="hg-sec">' +
        '<div class="hg-grid" aria-hidden="true"></div>' +
        '<div class="hg-mark"><span class="hg-num">01</span><span class="hg-kicker en">The derivative</span><span class="hg-kicker zh">衍生之物</span></div>' +
        '<h2 class="hg-h2"><span class="en">FROM A VR WORLD<br/>INTO <span class="hg-hl">PRINT</span></span><span class="zh">从 VR 世界<br/>走进<span class="hg-hl">印刷</span></span></h2>' +
        '<div class="hg-split">' +
          '<div class="hg-panel">' +
            '<p><span class="en">Babel Refractions began as my final-year VR project \u2014 a poetic exploration of cultural fragmentation through the myth of the Tower of Babel. The catalogue is its derivative: a beautifully crafted hardcover that materializes the visual language of the virtual world and carries it beyond the headset.</span><span class="zh">Babel Refractions 始于我的本科毕业 VR 项目——借"巴别塔"神话，诗性地探讨文化的撕裂与误读。画册是它的衍生：一本精心制作的精装书，把虚拟世界的视觉语言实体化，带出头显之外。</span></p>' +
            '<p><span class="en">Presented as a physical book, it is at once an art-dissemination medium, a commercial product, and a vessel for cultural exchange \u2014 opening a new channel to reach collectors, institutions and a far broader audience.</span><span class="zh">以实体书的形态，它同时是艺术传播的媒介、商业产品，以及文化交流的容器——为触达藏家、机构与更广泛的受众，打开一条新的通道。</span></p>' +
          '</div>' +
          '<figure class="hg-fig"><img src="' + A + 'book.jpg" alt="The Babel Refractions hardcover catalogue" /><figcaption>' + node('24-page hardcover · designed in InDesign', '24 页精装 · InDesign 设计') + '</figcaption></figure>' +
        '</div>' +
        '<figure class="hg-fig hg-fig-wide"><img src="' + A + 'tower.jpg" alt="In-engine render of the Babel tower-city" /><figcaption>' + node('In-engine render — the Tower of Babel, reconstructed', '引擎内渲染——被重构的巴别塔') + '</figcaption></figure>' +
      '</section>' +

      /* ---------------- 02 FOUR WORLDS ---------------- */
      '<section class="hg-sec hg-sec-worlds">' +
        '<div class="hg-mark"><span class="hg-num">02</span><span class="hg-kicker en">World overviews</span><span class="hg-kicker zh">世界总览</span></div>' +
        '<h2 class="hg-h2"><span class="en">FOUR <span class="hg-hl">WORLDS</span>,<br/>ONE COLLAPSE</span><span class="zh">四个<span class="hg-hl">世界</span>，<br/>一场崩塌</span></h2>' +
        '<div class="hg-worlds">' + worldsHTML() + '</div>' +
        '<figure class="hg-fig hg-fig-wide"><img src="' + A + 'worlds.jpg" alt="Catalogue spread documenting the four worlds" /><figcaption>' + node('Catalogue spread — Rules · Slogans · Industry · Goals', '画册跨页——规则 · 口号 · 工业 · 目标') + '</figcaption></figure>' +
      '</section>' +

      /* ---------------- 03 PIPELINE ---------------- */
      '<section class="hg-sec">' +
        '<div class="hg-grid" aria-hidden="true"></div>' + star() +
        '<div class="hg-mark"><span class="hg-num">03</span><span class="hg-kicker en">Cross-media pipeline</span><span class="hg-kicker zh">跨媒介管线</span></div>' +
        '<h2 class="hg-h2"><span class="en">CONCEPT TO <span class="hg-hl">PRINT</span></span><span class="zh">从概念到<span class="hg-hl">成书</span></span></h2>' +
        '<div class="hg-pipe-wrap">' +
          '<div class="hg-pipe">' + pipeHTML() + '</div>' +
          '<div class="hg-pipe-figs">' +
            '<figure class="hg-fig"><img src="' + A + 'prints1.jpg" alt="Fanned printed catalogue spreads" /></figure>' +
            '<figure class="hg-fig"><img src="' + A + 'spread2.jpg" alt="Open catalogue spread on a table" /></figure>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 04 TEACHING CASE (the point) ---------------- */
      '<section class="hg-sec hg-sec-teach">' +
        '<div class="hg-grid" aria-hidden="true"></div>' + star() +
        '<div class="hg-mark"><span class="hg-num">04</span><span class="hg-kicker en">Official teaching case</span><span class="hg-kicker zh">官方教学案例</span></div>' +
        '<h2 class="hg-h2"><span class="en">A CASE THAT<br/>KEEPS <span class="hg-hl">TEACHING</span></span><span class="zh">一份持续<span class="hg-hl">沿用</span>的教案</span></h2>' +
        '<div class="hg-teach">' +
          '<div class="hg-teach-main">' +
            '<div class="hg-teach-block">' +
              '<span class="hg-teach-k">' + node('Institutional archive', '学院典藏') + '</span>' +
              '<p><span class="en">The physical catalogue and its PDF are archived in the digital repository of the Academy of Film &amp; Creative Technology \u2014 my undergraduate college \u2014 kept for continued course use in the years ahead.</span><span class="zh">这本实体画册及其 PDF，被存入影视创意学院（AFCT，我的本科学院）的数字资料库，作为日后课程将长期、持续沿用的教学资料。</span></p>' +
            '</div>' +
            '<div class="hg-teach-block">' +
              '<span class="hg-teach-k">' + node('Support for CAT209', '支撑 CAT209 课程') + '</span>' +
              '<p><span class="en">Professor Kim Lau uses the catalogue as a demonstration case and assignment reference in his Cross-Media Design course (CAT209), letting students grasp the full development pipeline \u2014 from VR to print \u2014 in one tangible object.</span><span class="zh">Kim Lau 教授在其"跨媒介设计"课程（CAT209）中，把这本画册作为示范案例与作业参照，让学生通过一件可触的实物，理解从 VR 到印刷的完整制作流程。</span></p>' +
            '</div>' +
          '</div>' +
          '<aside class="hg-teach-stat">' +
            '<div class="hg-stat"><b>+30%</b><span class="en">student comprehension of immersive-design workflows</span><span class="zh">学生对沉浸式设计流程的理解提升</span></div>' +
            '<div class="hg-stat"><b>\u221E</b><span class="en">archived for future course use</span><span class="zh">入库典藏，长期沿用</span></div>' +
          '</aside>' +
        '</div>' +
      '</section>' +

      /* ---------------- 05 CHALLENGES ---------------- */
      '<section class="hg-sec">' +
        '<div class="hg-mark"><span class="hg-num">05</span><span class="hg-kicker en">Screen-to-print challenges</span><span class="hg-kicker zh">从屏到纸的难题</span></div>' +
        '<h2 class="hg-h2 hg-h2-sm"><span class="en">WHAT THE PAPER <span class="hg-hl">CHANGED</span></span><span class="zh">纸面<span class="hg-hl">改变</span>了什么</span></h2>' +
        '<div class="hg-cards3">' + chalHTML() + '</div>' +
      '</section>' +

      /* ---------------- 06 THEORY ---------------- */
      '<section class="hg-sec">' +
        '<div class="hg-grid" aria-hidden="true"></div>' +
        '<div class="hg-mark"><span class="hg-num">06</span><span class="hg-kicker en">Theory into practice</span><span class="hg-kicker zh">理论落地</span></div>' +
        '<h2 class="hg-h2 hg-h2-sm"><span class="en">A SHARED <span class="hg-hl">GRAMMAR</span></span><span class="zh">共享的<span class="hg-hl">语法</span></span></h2>' +
        '<div class="hg-cards3">' + theoryHTML() + '</div>' +
      '</section>' +

      /* ---------------- REFLECTION ---------------- */
      '<section class="hg-sec hg-sec-reflect">' +
        '<span class="hg-reflect-label">' + node('Reflection', '反思') + '</span>' +
        '<blockquote class="hg-reflect"><p class="en">A milestone for my professional growth: an immersive experience is only half the journey \u2014 a physical touchpoint reaches a broader audience. Working as a TA sparked my passion for teaching and research, and supports my PhD ambition across immersive tech, cross-media and pedagogy.</p>' +
        '<p class="zh">这是我职业成长的里程碑：沉浸体验只是旅程的一半——一个实体触点，才能触达更广的观众。担任助教点燃了我对教学与研究的热情，也支撑着我跨越沉浸技术、跨媒介与教育学的博士愿景。</p></blockquote>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="hg-foot">' +
        '<div class="hg-grid" aria-hidden="true"></div>' + star() +
        '<div class="hg-foot-title">BABEL<br/><span class="hg-hl">REFRACTIONS</span></div>' +
        '<div class="hg-foot-sub">' + node('Hyper Glimpse · 24-page hardcover · 2025', 'Hyper Glimpse · 24 页精装 · 2025') + '</div>' +
        '<div class="hg-foot-credit">Academy of Film &amp; Creative Technology · XJTLU</div>' +
      '</footer>' +

    '</article>';
  }

  function renderHyperGlimpse(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hg-in'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      art.querySelectorAll('.hg-sec, .hg-world, .hg-step, .hg-card, .hg-fig').forEach(function (n) { n.classList.add('hg-rev'); io.observe(n); });
    });

    // ---- feature video module ----
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem(VKEY, id); } catch (e) {}
      var media = art.querySelector('.hg-feature-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('.hg-feature-media');
      if (!media) return;
      var cur = ''; try { var s = localStorage.getItem(VKEY); cur = (s === null ? YT_DEFAULT : s); } catch (e) { cur = YT_DEFAULT; }
      var box = document.createElement('div');
      box.className = 'hg-yt hg-editor';
      box.innerHTML =
        '<label class="hg-editor-l"><span class="en">Paste a YouTube link</span><span class="zh">粘贴 YouTube 链接</span></label>' +
        '<input class="hg-editor-in" type="text" value="' + cur.replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="hg-editor-btns"><button type="button" class="hg-editor-save">Save</button>' +
        '<button type="button" class="hg-editor-clear">Clear</button>' +
        '<button type="button" class="hg-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.hg-editor-in');
      input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(input.value); } else if (e.key === 'Escape') { commit(cur); } });
      box.querySelector('.hg-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.hg-editor-cancel').addEventListener('click', function () { commit(cur); });
      box.querySelector('.hg-editor-clear').addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.hg-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'hg-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Babel Refractions';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderHyperGlimpse = renderHyperGlimpse;

  /* ---------------------------- styles ---------------------------- */
  var HG_CSS = [
'.hg-page{--hg-bg:#040405;--hg-ink:#E7E7EC;--hg-grey:rgba(231,231,236,.34);--hg-dim:#8C8C95;',
'  --hg-violet:#5C3C86;--hg-violet-2:#7B54AA;--hg-steel:#1E5468;--hg-maroon:#6E2A2C;',
'  --hg-line:rgba(231,231,236,.13);--hg-panel:rgba(150,150,160,.10);',
'  --hg-sans:"Helvetica Neue",Helvetica,Arial,sans-serif;',
'  background:var(--hg-bg);color:var(--hg-ink);font-family:var(--hg-sans);line-height:1.6;',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));overflow:hidden}',
'.lang-zh .hg-page{font-family:var(--cjk)}',
'.hg-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* shared bits: grid lines + star */
'.hg-grid{position:absolute;inset:0;z-index:0;pointer-events:none;',
'  background:linear-gradient(90deg,transparent calc(50% - .5px),var(--hg-line) 50%,transparent calc(50% + .5px)) 78% 0/1px 100% no-repeat,',
'  linear-gradient(0deg,transparent calc(50% - .5px),var(--hg-line) 50%,transparent calc(50% + .5px)) 0 22%/100% 1px no-repeat}',
'.hg-star{position:absolute;z-index:1;width:60px;height:60px;pointer-events:none;opacity:.7;right:8%;top:14%}',
'.hg-star::before,.hg-star::after{content:"";position:absolute;background:rgba(231,231,236,.5)}',
'.hg-star::before{left:50%;top:0;width:1px;height:100%;transform:translateX(-.5px);box-shadow:0 0 8px 1px rgba(123,84,170,.7)}',
'.hg-star::after{top:50%;left:0;height:1px;width:100%;transform:translateY(-.5px);box-shadow:0 0 8px 1px rgba(123,84,170,.7)}',

/* node bullet */
'.hg-node{display:inline-flex;align-items:center;gap:9px;font-family:var(--hg-sans);font-size:clamp(10px,1.05vw,12px);',
'  letter-spacing:.18em;text-transform:uppercase;color:var(--hg-dim)}',
'.lang-zh .hg-node{font-family:var(--cjk);letter-spacing:.08em}',
'.hg-node i{width:7px;height:7px;border:1px solid var(--hg-violet-2);border-radius:50%;flex:none;position:relative}',
'.hg-node i::after{content:"";position:absolute;left:9px;top:50%;width:22px;height:1px;background:var(--hg-line)}',

/* highlight block */
'.hg-hl{display:inline-block;background:var(--hg-violet);color:rgba(255,255,255,.62);padding:0 .14em;line-height:1}',
'.lang-zh .hg-hl{padding:0 .08em}',

/* ---------------- HERO ---------------- */
'.hg-hero{position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden;isolation:isolate;',
'  padding:clamp(40px,6vw,90px) clamp(24px,5vw,80px)}',
'.hg-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3;filter:brightness(.6) saturate(.85)}',
'.hg-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(4,4,5,.95) 0%,rgba(4,4,5,.7) 42%,rgba(4,4,5,.4) 100%),linear-gradient(0deg,rgba(4,4,5,.9),transparent 60%)}',
'.hg-hero-inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;width:100%}',
'.hg-eyebrow{margin-bottom:clamp(18px,2.6vw,28px)}',
'.hg-title{font-family:var(--hg-sans);font-weight:800;font-size:clamp(58px,11vw,150px);line-height:.92;letter-spacing:-.01em;',
'  color:var(--hg-grey);margin:0;text-transform:uppercase}',
'.lang-zh .hg-title{font-family:var(--cjk);font-weight:900;letter-spacing:.02em}',
'.hg-subtitle{font-family:var(--hg-sans);font-weight:700;font-size:clamp(15px,2vw,26px);letter-spacing:.04em;text-transform:uppercase;color:var(--hg-ink);margin-top:clamp(16px,2vw,24px)}',
'.lang-zh .hg-subtitle{font-family:var(--cjk)}',
'.hg-tagline{max-width:52ch;font-size:clamp(14px,1.5vw,18px);line-height:1.62;color:var(--hg-dim);margin-top:clamp(16px,2vw,22px);text-wrap:pretty}',
'.hg-meta{display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,46px);margin-top:clamp(26px,3.4vw,40px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--hg-line)}',
'.hg-meta span{display:flex;flex-direction:column;gap:4px}',
'.hg-meta b{font-size:clamp(12.5px,1.3vw,15px);font-weight:700;color:var(--hg-ink);letter-spacing:.01em}',
'.hg-meta i{font-style:normal;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--hg-dim)}',
'.lang-zh .hg-meta i{letter-spacing:.08em}',
'.hg-scroll{position:absolute;right:clamp(18px,4vw,50px);bottom:clamp(22px,3vw,40px);z-index:2;display:flex;flex-direction:column;align-items:center;gap:7px;',
'  font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--hg-dim)}',
'.hg-scroll i{width:1px;height:38px;background:linear-gradient(var(--hg-violet-2),transparent);animation:hgDrip 1.9s ease-in-out infinite}',
'@keyframes hgDrip{0%,100%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.hg-scroll i{animation:none}}',

/* ---------------- FEATURE VIDEO ---------------- */
'.hg-feature{position:relative}',
'.hg-feature-media{position:relative}',
'.hg-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:90vh;border:0;display:block}',
'.hg-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;',
'  display:flex;align-items:center;justify-content:center;border-top:1px solid var(--hg-line);border-bottom:1px solid var(--hg-line);transition:filter .2s}',
'.hg-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,4,5,.12),rgba(4,4,5,.5))}',
'.hg-facade:hover{filter:brightness(1.08)}',
'.hg-play{position:relative;z-index:1;width:clamp(62px,7vw,86px);height:clamp(62px,7vw,86px);border-radius:50%;',
'  background:rgba(4,4,5,.5);border:2px solid var(--hg-violet-2);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.hg-play::before{content:"";position:absolute;top:50%;left:55%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 19px;border-color:transparent transparent transparent #fff}',
'.hg-facade:hover .hg-play{transform:scale(1.08);background:rgba(123,84,170,.3)}',
'.hg-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(231,231,236,.4);background:rgba(4,4,5,.6);color:var(--hg-ink);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}',
'.hg-facade:hover .hg-edit{opacity:1}',
'.hg-edit:hover{border-color:var(--hg-violet-2);color:#fff}',
'.hg-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:pointer;background:#08080a;border-top:1px solid var(--hg-line);border-bottom:1px solid var(--hg-line);color:var(--hg-dim);font-size:13px;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}',
'.lang-zh .hg-empty{font-family:var(--cjk);letter-spacing:.06em}',
'.hg-empty:hover{color:var(--hg-violet-2)}',
'.hg-empty-k{font-size:clamp(34px,4.5vw,52px);color:var(--hg-violet-2)}',
'.hg-editor{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:clamp(22px,3vw,40px);background:#08080a;border-top:1px solid var(--hg-line);border-bottom:1px solid var(--hg-line)}',
'.hg-editor-l{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--hg-dim)}',
'.lang-zh .hg-editor-l{font-family:var(--cjk)}',
'.hg-editor-in{width:min(560px,82%);box-sizing:border-box;background:#121214;border:1px solid var(--hg-line);color:var(--hg-ink);font-size:14px;padding:11px 13px;border-radius:3px;outline:none}',
'.hg-editor-in:focus{border-color:var(--hg-violet-2)}',
'.hg-editor-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}',
'.hg-editor-btns button{font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:3px;border:1px solid var(--hg-line);background:transparent;color:var(--hg-ink)}',
'.hg-editor-save{background:var(--hg-violet)!important;color:#fff!important;border-color:var(--hg-violet)!important}',
'.hg-editor-clear:hover,.hg-editor-cancel:hover{border-color:var(--hg-violet-2);color:#fff}',
'.hg-feature-cap{display:flex;justify-content:center;padding:16px}',

/* ---------------- SECTIONS ---------------- */
'.hg-sec{position:relative;max-width:1180px;margin:0 auto;padding:clamp(60px,9vw,120px) clamp(24px,5vw,72px);border-top:1px solid var(--hg-line)}',
'.hg-mark{position:relative;z-index:2;display:flex;align-items:center;gap:14px;margin-bottom:clamp(22px,3vw,36px)}',
'.hg-num{font-size:clamp(12px,1.3vw,15px);color:var(--hg-violet-2);letter-spacing:.1em}',
'.hg-kicker{font-size:clamp(10px,1.05vw,12.5px);letter-spacing:.24em;text-transform:uppercase;color:var(--hg-dim)}',
'.lang-zh .hg-kicker{font-family:var(--cjk);letter-spacing:.1em}',
'.hg-h2{position:relative;z-index:2;font-family:var(--hg-sans);font-weight:800;font-size:clamp(34px,6.4vw,90px);line-height:.98;letter-spacing:-.01em;text-transform:uppercase;color:var(--hg-grey);margin:0 0 clamp(28px,4vw,52px)}',
'.lang-zh .hg-h2{font-family:var(--cjk);font-weight:900;letter-spacing:.02em}',
'.hg-h2-sm{font-size:clamp(30px,5vw,64px)}',

/* panels + figures */
'.hg-split{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(24px,4vw,52px);align-items:start}',
'.hg-panel{background:var(--hg-panel);border:1px solid var(--hg-line);padding:clamp(22px,2.8vw,34px)}',
'.hg-panel p{font-size:clamp(13px,1.4vw,16px);line-height:1.7;color:var(--hg-ink);text-align:justify;margin:0 0 1em;text-wrap:pretty}',
'.hg-panel p:last-child{margin-bottom:0}',
'.lang-zh .hg-panel p{text-align:left;line-height:1.9}',
'.hg-fig{margin:0;border:1px solid var(--hg-line);background:#000;overflow:hidden;position:relative}',
'.hg-fig img{aspect-ratio:4/3;transition:transform .7s cubic-bezier(.16,1,.3,1)}',
'.hg-fig:hover img{transform:scale(1.04)}',
'.hg-fig figcaption{position:absolute;left:0;bottom:0;width:100%;box-sizing:border-box;padding:12px 14px;background:linear-gradient(0deg,rgba(4,4,5,.86),transparent)}',
'.hg-fig-wide{margin-top:clamp(24px,3.4vw,44px)}',
'.hg-fig-wide img{aspect-ratio:21/9}',

/* worlds */
'.hg-worlds{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,1.8vw,22px)}',
'.hg-world{background:var(--hg-panel);border:1px solid var(--hg-line);border-top:2px solid var(--hg-violet);padding:clamp(18px,2.2vw,26px)}',
'.hg-world-n{font-size:11px;letter-spacing:.16em;color:var(--hg-violet-2)}',
'.hg-world h4{font-family:var(--hg-sans);font-weight:700;font-size:clamp(16px,1.8vw,22px);text-transform:uppercase;color:var(--hg-ink);margin:10px 0 12px;letter-spacing:.02em}',
'.lang-zh .hg-world h4{font-family:var(--cjk);font-weight:900}',
'.hg-world p{font-size:clamp(13px,1.3vw,15px);line-height:1.6;color:var(--hg-dim);margin:0;text-wrap:pretty}',

/* pipeline */
'.hg-pipe-wrap{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(28px,4vw,56px);align-items:start}',
'.hg-pipe{display:flex;flex-direction:column}',
'.hg-step{display:flex;gap:18px;padding:clamp(14px,1.8vw,20px) 0;border-bottom:1px solid var(--hg-line)}',
'.hg-step:first-child{border-top:1px solid var(--hg-line)}',
'.hg-step-n{font-size:clamp(13px,1.4vw,16px);color:var(--hg-violet-2);flex:none;padding-top:3px;letter-spacing:.06em}',
'.hg-step-tool{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--hg-dim)}',
'.hg-step-b h4{font-family:var(--hg-sans);font-weight:700;font-size:clamp(15px,1.6vw,19px);text-transform:uppercase;color:var(--hg-ink);margin:6px 0 8px;letter-spacing:.02em}',
'.lang-zh .hg-step-b h4{font-family:var(--cjk);font-weight:800}',
'.hg-step-b p{font-size:clamp(13px,1.3vw,15px);line-height:1.6;color:var(--hg-dim);margin:0;text-wrap:pretty}',
'.hg-pipe-figs{display:flex;flex-direction:column;gap:clamp(14px,2vw,20px);position:sticky;top:20px}',
'.hg-pipe-figs .hg-fig img{aspect-ratio:16/10}',

/* teaching case (emphasis) */
'.hg-sec-teach{background:linear-gradient(180deg,rgba(92,60,134,.14),transparent 60%)}',
'.hg-teach{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:clamp(26px,4vw,56px);align-items:start}',
'.hg-teach-main{display:flex;flex-direction:column;gap:clamp(20px,2.8vw,32px)}',
'.hg-teach-block{border-left:2px solid var(--hg-violet);padding-left:clamp(18px,2.4vw,28px)}',
'.hg-teach-k{display:inline-block;margin-bottom:12px}',
'.hg-teach-block p{font-size:clamp(15px,1.6vw,20px);line-height:1.62;color:var(--hg-ink);margin:0;text-wrap:pretty}',
'.lang-zh .hg-teach-block p{line-height:1.9}',
'.hg-teach-stat{display:flex;flex-direction:column;gap:clamp(16px,2vw,22px)}',
'.hg-stat{background:var(--hg-panel);border:1px solid var(--hg-line);padding:clamp(18px,2.4vw,26px)}',
'.hg-stat b{display:block;font-family:var(--hg-sans);font-weight:800;font-size:clamp(36px,5vw,60px);color:#fff;line-height:1;letter-spacing:-.01em}',
'.hg-stat span{display:block;font-size:clamp(12px,1.25vw,14px);line-height:1.45;color:var(--hg-dim);margin-top:10px;text-wrap:pretty}',

/* 3-up cards (challenges / theory) */
'.hg-cards3{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.2vw,26px)}',
'.hg-card{background:var(--hg-panel);border:1px solid var(--hg-line);padding:clamp(20px,2.6vw,30px)}',
'.hg-src{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--hg-violet-2);margin-bottom:12px}',
'.hg-card h4{font-family:var(--hg-sans);font-weight:700;font-size:clamp(15px,1.7vw,21px);text-transform:uppercase;color:var(--hg-ink);margin:0 0 12px;letter-spacing:.02em}',
'.lang-zh .hg-card h4{font-family:var(--cjk);font-weight:800;text-transform:none}',
'.hg-card h4 .hg-node{text-transform:uppercase}',
'.hg-card p{font-size:clamp(13px,1.35vw,15.5px);line-height:1.62;color:var(--hg-dim);margin:0;text-wrap:pretty}',

/* reflection */
'.hg-sec-reflect{text-align:center}',
'.hg-reflect-label{display:inline-flex;margin-bottom:clamp(20px,3vw,30px)}',
'.hg-reflect{margin:0 auto;max-width:64ch}',
'.hg-reflect p{font-size:clamp(18px,2.2vw,30px);line-height:1.5;color:var(--hg-ink);font-weight:300;margin:0;text-wrap:pretty}',
'.lang-zh .hg-reflect p{line-height:1.75;font-weight:400}',

/* footer */
'.hg-foot{position:relative;text-align:center;padding:clamp(60px,9vw,120px) 24px clamp(70px,10vw,120px);border-top:1px solid var(--hg-line);overflow:hidden}',
'.hg-foot-title{position:relative;z-index:2;font-family:var(--hg-sans);font-weight:800;font-size:clamp(50px,10vw,140px);line-height:.9;text-transform:uppercase;color:var(--hg-grey);letter-spacing:-.01em}',
'.lang-zh .hg-foot-title{font-family:var(--cjk);font-weight:900}',
'.hg-foot-sub{position:relative;z-index:2;display:flex;justify-content:center;margin-top:20px}',
'.hg-foot-credit{position:relative;z-index:2;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--hg-dim);margin-top:clamp(22px,3vw,36px)}',

/* reveal */
'.hg-rev{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.hg-rev.hg-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.hg-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:880px){',
'  .hg-split,.hg-pipe-wrap,.hg-teach{grid-template-columns:1fr}',
'  .hg-worlds{grid-template-columns:1fr 1fr}',
'  .hg-cards3{grid-template-columns:1fr}',
'  .hg-pipe-figs{position:static;flex-direction:row}',
'  .hg-fig-wide img{aspect-ratio:16/9}',
'  .hg-grid,.hg-star{display:none}',
'}'
  ].join('\n');

})();
