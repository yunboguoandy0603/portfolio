/* ============================================================================
   onemorestep-page.js — bespoke long-form case study for ONE MORE STEP, built
   from the project deck (One More Step · Sokoban). Exposes
   window.renderOneMoreStep(item) which works-render.js calls instead of the
   generic buildCase for id==='onemorestep'. Bright pixel-platformer theme
   (sky-blue, Pixelify Sans headers, Mario-style yellow/black UI). Bilingual
   via .en/.zh spans. Six "days" = six broken rules.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/onemorestep/';
  var PLAY = 'https://gd.games/games/2dbfb067-c19f-4d82-a0d3-dc8213fa4907';
  var VKEY = 'oms-feature-yt';

  // accept a full YouTube URL or a bare 11-char ID; '' => not set yet
  function ytId(v) {
    if (!v) return '';
    var m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    m = String(v).match(/^[\w-]{11}$/);
    return m ? v : '';
  }
  function storedFeature() {
    try { var v = localStorage.getItem(VKEY); if (v) return ytId(v); } catch (e) {}
    return '';
  }
  function facadeHTML(id) {
    return '<button class="oms-yt oms-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" aria-label="Play video">' +
      '<span class="oms-play" aria-hidden="true"></span>' +
      '<button class="oms-edit" type="button" data-edit="1" title="Change link" aria-label="Change link">\u270e</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="oms-yt oms-empty" type="button" data-add="1">' +
      '<span class="oms-empty-k">\u25B6</span>' +
      '<span class="oms-empty-l"><span class="en">Add full-screen video link</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u5168\u5c4f\u89c6\u9891\u94fe\u63a5</span></span></button>';
  }
  function featureHTML() {
    var id = storedFeature();
    return id ? facadeHTML(id) : emptyHTML();
  }

  // The six days — each a level where one rule is deliberately broken.
  var DAYS = [
    { n: '01', day_en: 'Monday', day_zh: '周一', img: 'day1-cars.png',
      hint_en: 'Watch out for cars!', hint_zh: '小心车辆！',
      t_en: 'Basic push & road hazard', t_zh: '基础推动 · 马路危机',
      b_en: 'A delivery van tears across the road right-to-left; touch it and the level restarts. I built two routes into the map, so the puzzle becomes watch-the-rhythm and choose your moment to cross — push the student ID card all the way to the lab.',
      b_zh: '一辆货车在马路上从右向左飞驰，碰到就重开本关。我在地图里预留了两条路——于是解谜变成"看准节奏、择时过马路"，把学生证一路推到 Knowledge Lab。' },
    { n: '02', day_en: 'Tuesday', day_zh: '周二', img: 'day2-city.jpg',
      hint_en: 'A bit woozy today', hint_zh: '今天有点晕',
      t_en: 'Reversed controls', t_zh: '颠倒的操作',
      b_en: 'The student is so exhausted the world feels reversed, so I rewrote the controls: press Left and you go right. The mechanical frustration is the story of being too tired to think straight.',
      b_zh: '学生太累，连方向感都颠倒了——于是我重写了操作：按左反而向右。这种机制上的别扭，正是"累到无法正常思考"的叙事。' },
    { n: '03', day_en: 'Wednesday', day_zh: '周三', img: 'day3-pull.png',
      hint_en: "Don't push me", hint_zh: '别推我',
      t_en: 'From push to pull', t_zh: '从推到拉',
      b_en: 'Here the card pulls the player backwards instead of being pushed. I inverted the move-and-collision logic for all four directions, so the box moves into your previous position — you feel physically tethered to the thing you carry.',
      b_zh: '这一关里，卡片不再被推，而是把你向后拽。我把四个方向的移动与碰撞逻辑全部反转，让箱子移入你上一刻的位置——切实感到被所背负之物"拴住"。' },
    { n: '04', day_en: 'Thursday', day_zh: '周四', img: 'day4-rain.png',
      hint_en: 'Raining', hint_zh: '下雨了',
      t_en: 'Rainy London', t_zh: '雨天伦敦',
      b_en: 'Rain animation, a darker palette, a cat hiding under an awning — and slippery physics: I cut the snap-to-grid and added acceleration / deceleration so you skid and can\u2019t stop cleanly. The wet ground becomes something you feel in the controls.',
      b_zh: '雨的动画、压暗的色调、躲在雨棚下的小猫——还有湿滑的物理：我取消了对格指令，加入加减速，让人物打滑、难以干脆停下。湿漉的地面，成了可以从操作里感到的东西。' },
    { n: '05', day_en: 'Friday', day_zh: '周五', img: 'day5-grid.jpg',
      hint_en: 'Earthquake', hint_zh: '地震',
      t_en: 'Losing control', t_zh: '失控',
      b_en: 'A 2048-style slide: a key-press sends the card sliding until it slams into a wall. I gave the box a persistent force on input and an is_sliding variable that zeroes on wall-collision, so nothing redirects it mid-slide — once it moves, you can\u2019t stop it freely.',
      b_zh: '类 2048 的滑动：一次按键让卡片一直滑到撞墙才停。我给箱子一个持续的力，并用一个"撞墙归零"的 is_sliding 变量锁定方向，确保滑行途中不被打断——一旦动起来，你就无法随意停下。' },
    { n: '06', day_en: 'Saturday', day_zh: '周六', img: 'day6-cardfree.png',
      hint_en: 'No school today', hint_zh: '今天不上学',
      t_en: 'Card free', t_zh: '无卡日',
      b_en: "It's Saturday — no class, no card needed. Players trained for five levels to push the box will fail if they do it here; the trick is to leave it behind and walk over alone. A pun, and a deliberate subversion of the habit I'd built. I changed the win condition so the correct solution is to abandon the card.",
      b_zh: '周六——不上课，也不需要卡。被前五关训练成"推箱子"的玩家，在这关照做就会失败；正解是把卡留下，自己走过去。一个双关，也是对我亲手养成的习惯的故意颠覆——我修改了通关判定，正确解法是抛下卡片。' }
  ];

  function injectCSS() {
    if (document.getElementById('oms-css')) return;
    var s = document.createElement('style');
    s.id = 'oms-css';
    s.textContent = OMS_CSS;
    document.head.appendChild(s);
  }

  function daysHTML() {
    return DAYS.map(function (d) {
      return '' +
      '<article class="oms-day" data-day="' + d.n + '">' +
        '<div class="oms-day-top">' +
          '<span class="oms-pill"><span class="en">' + d.day_en + '</span><span class="zh">' + d.day_zh + '</span></span>' +
          '<span class="oms-day-num">' + d.n + ' / 06</span>' +
        '</div>' +
        '<div class="oms-day-grid">' +
          '<div class="oms-screen">' +
            '<img src="' + A + d.img + '" alt="One More Step — ' + d.t_en + '" loading="lazy" />' +
            '<span class="oms-hint"><span class="en">' + d.hint_en + '</span><span class="zh">' + d.hint_zh + '</span></span>' +
          '</div>' +
          '<div class="oms-day-body">' +
            '<h3 class="oms-day-t"><span class="en">' + d.t_en + '</span><span class="zh">' + d.t_zh + '</span></h3>' +
            '<p><span class="en">' + d.b_en + '</span><span class="zh">' + d.b_zh + '</span></p>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function html() {
    return '' +
    '<article class="oms-page" id="case-games-onemorestep" data-screen-label="One More Step">' +

      /* ---------------- HERO ---------------- */
      '<header class="oms-hero">' +
        '<div class="oms-sky" aria-hidden="true">' +
          '<span class="oms-cloud oms-cloud-a"></span>' +
          '<span class="oms-cloud oms-cloud-b"></span>' +
          '<span class="oms-cloud oms-cloud-c"></span>' +
          '<span class="oms-coin" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="oms-hero-inner">' +
          '<div class="oms-hero-text">' +
            '<div class="oms-eyebrow"><span class="en">2D Sokoban · UCL IOE · 2026</span><span class="zh">2D 推箱子 · UCL 教育学院 · 2026</span></div>' +
            '<h1 class="oms-title">ONE<br/>MORE<br/>STEP</h1>' +
            '<p class="oms-tagline"><span class="en">Six days, six broken rules. Push a tired student\u2019s ID card all the way to school \u2014 and feel the invisible labour of the daily commute through the controls in your hands.</span><span class="zh">六天，六次被打破的规则。把一名疲惫学生的学生证一路推去上学——让通勤里那些看不见的情绪劳动，从你手中的操作里被真切感到。</span></p>' +
            '<div class="oms-meta">' +
              '<span><b class="en">Yunbo Guo · Emily Ng</b><b class="zh">郭昀波 · Emily Ng</b><i class="en">Team</i><i class="zh">团队</i></span>' +
              '<span><b class="en">Design · all programming · levels</b><b class="zh">设计 · 全部编程 · 关卡</b><i class="en">My role</i><i class="zh">我的角色</i></span>' +
              '<span><b>GDevelop · Piskel</b><i class="en">Built with</i><i class="zh">工具</i></span>' +
            '</div>' +
            '<a class="oms-btn" href="' + PLAY + '" target="_blank" rel="noopener"><span class="en">PLAY THE BUILD</span><span class="zh">在线试玩</span> <i>&#9658;</i></a>' +
          '</div>' +
          '<div class="oms-hero-screen">' +
            '<div class="oms-screen oms-screen-cover">' +
              '<img src="' + A + 'cover-title.png" alt="One More Step — title screen, a sleeping student and a blaring alarm" />' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="oms-ground" aria-hidden="true"></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO (full-bleed, the user adds a link) ---------------- */
      '<section class="oms-feature">' +
        '<div class="oms-feature-media">' + featureHTML() + '</div>' +
      '</section>' +

      /* ---------------- 01 WORKING JOURNEY ---------------- */
      '<section class="oms-sec">' +
        '<div class="oms-mark"><span class="oms-num">01</span><span class="oms-kicker en">Working journey</span><span class="oms-kicker zh">创作历程</span></div>' +
        '<h2 class="oms-h2"><span class="en">From an escape room<br/>to a box you push</span><span class="zh">从密室逃脱<br/>到一只推动的箱子</span></h2>' +
        '<div class="oms-cards3">' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">Initial concept</span><span class="zh">最初构想</span></span><p><span class="en">A cartographic escape room \u2014 players draw a map, collect cards, hunt a ghost in the room.</span><span class="zh">一个制图式的密室逃脱——玩家绘制地图、收集卡片、在房间里捉鬼。</span></p></div>' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">Reality</span><span class="zh">现实</span></span><p><span class="en">It clashed hard with our technical constraints and the timeframe. The mechanics felt disjointed and clunky.</span><span class="zh">它与我们的技术条件和时间表激烈冲突，机制零散、笨拙。</span></p></div>' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">Decision</span><span class="zh">决定</span></span><p><span class="en">Back to a technically solid mechanic we knew well: 2D Sokoban (box-pushing). Simple to start, deep to bend.</span><span class="zh">回到我们熟悉、技术上扎实的机制：2D 推箱子。易于上手，又有可深挖的弹性。</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 02 CORE METAPHOR ---------------- */
      '<section class="oms-sec">' +
        '<div class="oms-mark"><span class="oms-num">02</span><span class="oms-kicker en">Core metaphor</span><span class="oms-kicker zh">核心隐喻</span></div>' +
        '<div class="oms-split">' +
          '<div>' +
            '<h2 class="oms-h2"><span class="en">Box-pushing is<br/>emotional labour</span><span class="zh">推箱子，<br/>就是情绪劳动</span></h2>' +
            '<p class="oms-lead"><span class="en">The player controls a stressed student who must push their student ID card through obstacles to the UCL Knowledge Lab. The controls are heavily restricted \u2014 Up, Down, Left, Right only \u2014 so even getting to class already feels stressful and difficult.</span><span class="zh">玩家操控一名压力满满的学生，必须把学生证推过重重障碍，送到 UCL Knowledge Lab。操作被严格限制——只有上下左右——于是连"去上课"本身，都已显得艰难而令人疲惫。</span></p>' +
          '</div>' +
          '<div class="oms-keys" aria-hidden="true">' +
            '<span class="oms-key oms-key-up">\u2191</span>' +
            '<span class="oms-key oms-key-left">\u2190</span>' +
            '<span class="oms-key oms-key-down">\u2193</span>' +
            '<span class="oms-key oms-key-right">\u2192</span>' +
          '</div>' +
        '</div>' +
        '<div class="oms-theory-grid">' +
          '<div class="oms-theory">' +
            '<span class="oms-badge"><span class="en">Theory</span><span class="zh">理论</span></span>' +
            '<h4><span class="en">Procedural rhetoric</span><span class="zh">程序修辞</span></h4>' +
            '<p><span class="en">Games make arguments with processes, not text or dialogue (Bogost, 2007). A pushing-only mechanic simulates the exhausting, inescapable burden of the commute.</span><span class="zh">游戏用"过程"而非文字或对白来论证（Bogost, 2007）。只能"推"的机制，模拟出通勤那份令人疲惫、无可逃脱的负担。</span></p>' +
          '</div>' +
          '<div class="oms-theory">' +
            '<span class="oms-badge"><span class="en">Theory</span><span class="zh">理论</span></span>' +
            '<h4><span class="en">Abusive game design</span><span class="zh">受虐型游戏设计</span></h4>' +
            '<p><span class="en">Intentionally challenging standard usability \u2014 blur, rotate, reverse (Wilson & Sicart, 2010). Frustration itself becomes an aesthetic tool, and a way to build empathy.</span><span class="zh">刻意挑战常规可用性——模糊、旋转、反转（Wilson & Sicart, 2010）。"挫败"本身成为一种美学工具，也成为生成共情的方式。</span></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 03 SIX DAYS ---------------- */
      '<section class="oms-sec oms-sec-days">' +
        '<div class="oms-mark"><span class="oms-num">03</span><span class="oms-kicker en">Six days · six broken rules</span><span class="oms-kicker zh">六天 · 六次被打破的规则</span></div>' +
        '<h2 class="oms-h2 oms-h2-wide"><span class="en">Each day, I break a different rule</span><span class="zh">每一天，我打破一条不同的规则</span></h2>' +
        '<p class="oms-lead oms-lead-wide"><span class="en">The walk to school is made deliberately hard. Through procedural rhetoric and abusive design, every level bends one mechanic so a different kind of frustration becomes a different kind of feeling.</span><span class="zh">"走去上学"被刻意做得艰难。借由程序修辞与受虐型设计，每一关都扭动一条机制，让不同的挫败，变成不同的感受。</span></p>' +
        '<div class="oms-days">' + daysHTML() + '</div>' +
      '</section>' +

      /* ---------------- 04 SOUND ---------------- */
      '<section class="oms-sec">' +
        '<div class="oms-mark"><span class="oms-num">04</span><span class="oms-kicker en">Sound</span><span class="oms-kicker zh">声音</span></div>' +
        '<div class="oms-split">' +
          '<div>' +
            '<h2 class="oms-h2"><span class="en">A loop that<br/>never ends</span><span class="zh">一段<br/>不会结束的循环</span></h2>' +
            '<p class="oms-lead"><span class="en">Track: <b>Kawaii Kitsune (8-bit)</b> by Kevin MacLeod. A simple loop rather than complex procedural audio \u2014 because the point is repetition.</span><span class="zh">配乐：<b>Kawaii Kitsune（8-bit）</b>，Kevin MacLeod。选择简单的循环而非复杂的程序化音频——因为重点，正是"重复"。</span></p>' +
          '</div>' +
          '<div class="oms-why">' +
            '<span class="oms-badge oms-badge-y"><span class="en">Why this BGM</span><span class="zh">为何选它</span></span>' +
            '<ul>' +
              '<li><span class="en">Simulates the repetitive, cyclical nature of a daily routine.</span><span class="zh">模拟日常生活重复、循环的本质。</span></li>' +
              '<li><span class="en">Musically composes the feeling of a never-ending commute.</span><span class="zh">用音乐谱写出"永不停止的通勤"那种感觉。</span></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 05 LOOK & FEEL ---------------- */
      '<section class="oms-sec">' +
        '<div class="oms-mark"><span class="oms-num">05</span><span class="oms-kicker en">Look &amp; feel</span><span class="oms-kicker zh">视觉风格</span></div>' +
        '<h2 class="oms-h2 oms-h2-wide"><span class="en">Soft pixels, real London</span><span class="zh">柔和的像素，真实的伦敦</span></h2>' +
        '<div class="oms-cards3">' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">Art style</span><span class="zh">美术</span></span><p><span class="en">2D pixel art on a 64\u00d764 canvas, with soft, low-saturation tones \u2014 tired, not cute.</span><span class="zh">64\u00d764 画布上的 2D 像素美术，色调柔和、低饱和——是"疲惫"，而非"可爱"。</span></p></div>' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">Character</span><span class="zh">角色</span></span><p><span class="en">A slightly slouched posture and a sleepy eye carry the exhaustion before a single word is read.</span><span class="zh">微微佝偻的姿态、半睁的睡眼——在读到任何文字之前，疲惫已经传达。</span></p></div>' +
          '<div class="oms-card"><span class="oms-step-k"><span class="en">The map</span><span class="zh">地图</span></span><p><span class="en">Real London streets, photographed and simplified into a unified top-down view \u2014 a caricature that exaggerates a few aspects (Flusser, 2011).</span><span class="zh">真实的伦敦街道，经拍摄后简化为统一的俯视视角——一种"夸张了若干侧面"的漫画式再现（Flusser, 2011）。</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 06 CONCLUSION ---------------- */
      '<section class="oms-sec oms-sec-conc">' +
        '<div class="oms-mark"><span class="oms-num">06</span><span class="oms-kicker en">Conclusion</span><span class="oms-kicker zh">结语</span></div>' +
        '<div class="oms-equation">' +
          '<span class="oms-eq-part"><span class="en">Simple actions</span><span class="zh">简单的操作</span></span>' +
          '<span class="oms-eq-op">+</span>' +
          '<span class="oms-eq-part"><span class="en">Abusive design</span><span class="zh">受虐型设计</span></span>' +
          '<span class="oms-eq-op">=</span>' +
          '<span class="oms-eq-part oms-eq-out"><span class="en">Emotional weight</span><span class="zh">情感的重量</span></span>' +
        '</div>' +
        '<div class="oms-reflect">' +
          '<span class="oms-reflect-label"><span class="en">Reflection</span><span class="zh">反思</span></span>' +
          '<p><span class="en">The hardest lessons were in the code \u2014 killing a fragile exact-coordinate win-check for distance detection, swapping heavy per-tile sprites for tiled sprites to stop the lag. But the real proof was that the simplest 2D mechanic can carry huge emotional weight. Bending a different rule each day, so frustration itself becomes empathy, is exactly the kind of computational media I want to keep making: work that tells the hidden stories of stressed, marginalized people.</span><span class="zh">最难的功课其实在代码里——把脆弱的"精确坐标"通关判定换成距离检测、把吃资源的逐块精灵换成平铺精灵来消除卡顿。但真正的收获是：最简单的 2D 机制也能承载巨大的情感重量。每天打破一条不同的规则，让"挫败"本身变成共情，正是我想继续做的计算媒介：讲述被压力与边缘困住者的隐秘故事。</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="oms-foot">' +
        '<div class="oms-foot-stars" aria-hidden="true"><span></span><span></span><span></span></div>' +
        '<div class="oms-foot-title"><span class="en">THANKS FOR PLAYING</span><span class="zh">感谢游玩</span></div>' +
        '<a class="oms-btn" href="' + PLAY + '" target="_blank" rel="noopener"><span class="en">PLAY THE BUILD</span><span class="zh">在线试玩</span> <i>&#9658;</i></a>' +
      '</footer>' +

    '</article>';
  }

  function renderOneMoreStep(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('oms-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.oms-sec, .oms-day, .oms-card').forEach(function (n) { n.classList.add('oms-rev'); io.observe(n); });
    });

    // ---- full-screen video: in-page link management + click-to-play ----
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { if (id) localStorage.setItem(VKEY, id); else localStorage.removeItem(VKEY); } catch (e) {}
      var media = art.querySelector('.oms-feature-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('.oms-feature-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem(VKEY) || ''; } catch (e) {}
      var box = document.createElement('div');
      box.className = 'oms-yt oms-editor';
      box.innerHTML =
        '<label class="oms-editor-l"><span class="en">Paste a YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="oms-editor-in" type="text" value="' + cur.replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="oms-editor-btns"><button type="button" class="oms-editor-save">Save</button>' +
        (cur ? '<button type="button" class="oms-editor-clear">Clear</button>' : '') +
        '<button type="button" class="oms-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.oms-editor-in');
      input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(input.value); } else if (e.key === 'Escape') { commit(cur); } });
      box.querySelector('.oms-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.oms-editor-cancel').addEventListener('click', function () { commit(cur); });
      var clr = box.querySelector('.oms-editor-clear'); if (clr) clr.addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.oms-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'oms-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'One More Step \u2014 video';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderOneMoreStep = renderOneMoreStep;

  /* ---------------------------- styles ---------------------------- */
  var OMS_CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');",

'.oms-page{--oms-pixel:"Pixelify Sans",monospace;--oms-round:"Quicksand",var(--sans,system-ui,sans-serif);',
'  --oms-sky1:#2E9BD8;--oms-sky2:#52BEEF;--oms-sky3:#8FE2FB;',
'  --oms-ink:#0F3145;--oms-ink-dim:#2C5B73;--oms-yellow:#FFC516;--oms-yellow-d:#D9920A;',
'  --oms-black:#10151D;--oms-white:#FFFFFF;--oms-line:rgba(15,49,69,.16);',
'  background:linear-gradient(180deg,var(--oms-sky1) 0%,var(--oms-sky2) 48%,var(--oms-sky3) 100%);',
'  color:var(--oms-ink);font-family:var(--oms-round);font-weight:500;line-height:1.6;',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));overflow:hidden}',
'.lang-zh .oms-page{font-family:var(--cjk)}',
'.oms-page img{display:block;width:100%;height:100%;object-fit:cover;image-rendering:pixelated}',
'.oms-page .oms-screen-cover img{image-rendering:auto}',

/* pixel headline helper */
'.oms-page h1,.oms-page h2,.oms-page h3,.oms-page h4{font-family:var(--oms-pixel);font-weight:700;color:var(--oms-white);',
'  text-shadow:3px 3px 0 rgba(13,40,57,.55);letter-spacing:.01em}',
'.lang-zh .oms-page h1,.lang-zh .oms-page h2,.lang-zh .oms-page h3,.lang-zh .oms-page h4{font-family:var(--cjk);font-weight:900;letter-spacing:0}',

/* ---------------- HERO ---------------- */
'.oms-hero{position:relative;min-height:88vh;display:flex;align-items:center;overflow:hidden;isolation:isolate}',
'.oms-sky{position:absolute;inset:0;z-index:0;pointer-events:none}',
'.oms-cloud{position:absolute;width:120px;height:38px;background:rgba(255,255,255,.92);border-radius:40px;',
'  box-shadow:0 8px 0 rgba(255,255,255,.18)}',
'.oms-cloud::before,.oms-cloud::after{content:"";position:absolute;background:rgba(255,255,255,.92);border-radius:50%}',
'.oms-cloud::before{width:54px;height:54px;top:-26px;left:22px}',
'.oms-cloud::after{width:38px;height:38px;top:-16px;left:66px}',
'.oms-cloud-a{top:11%;left:6%;transform:scale(1.1);animation:omsDrift 26s linear infinite}',
'.oms-cloud-b{top:22%;right:9%;transform:scale(.8);opacity:.85;animation:omsDrift 34s linear infinite reverse}',
'.oms-cloud-c{top:54%;left:14%;transform:scale(.66);opacity:.7;animation:omsDrift 30s linear infinite}',
'@keyframes omsDrift{0%{margin-left:0}50%{margin-left:34px}100%{margin-left:0}}',
'.oms-coin{position:absolute;top:16%;right:24%;width:30px;height:30px;border-radius:50%;background:var(--oms-yellow);',
'  border:4px solid var(--oms-yellow-d);box-shadow:0 0 0 3px rgba(255,255,255,.35);animation:omsBob 2.4s ease-in-out infinite}',
'@keyframes omsBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}',
'@media (prefers-reduced-motion:reduce){.oms-cloud,.oms-coin{animation:none}}',
'.oms-hero-inner{position:relative;z-index:1;width:100%;max-width:1240px;margin:0 auto;padding:clamp(40px,6vw,80px) clamp(24px,5vw,72px) clamp(90px,12vw,150px);',
'  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.02fr);gap:clamp(28px,5vw,64px);align-items:center}',
'.oms-eyebrow{font-family:var(--oms-pixel);font-size:clamp(11px,1.15vw,14px);letter-spacing:.12em;color:var(--oms-ink);',
'  background:rgba(255,255,255,.55);display:inline-block;padding:6px 12px;border-radius:6px;margin-bottom:clamp(16px,2.4vw,26px)}',
'.lang-zh .oms-eyebrow{font-family:var(--cjk);font-weight:700}',
'.oms-title{font-size:clamp(58px,9.5vw,128px);line-height:.92;text-shadow:5px 5px 0 rgba(13,40,57,.6);margin:0}',
'.oms-tagline{max-width:42ch;font-size:clamp(15px,1.6vw,19px);font-weight:600;color:var(--oms-ink);',
'  margin-top:clamp(18px,2.6vw,28px);text-wrap:pretty}',
'.oms-meta{display:flex;flex-wrap:wrap;gap:clamp(16px,2.6vw,32px);margin-top:clamp(20px,3vw,30px);',
'  padding-top:clamp(16px,2.2vw,22px);border-top:2px dashed rgba(15,49,69,.28)}',
'.oms-meta span{display:flex;flex-direction:column;gap:3px}',
'.oms-meta b{font-size:clamp(13px,1.35vw,16px);font-weight:700;color:var(--oms-ink)}',
'.oms-meta i{font-family:var(--oms-pixel);font-style:normal;font-size:10.5px;letter-spacing:.08em;color:var(--oms-ink-dim)}',
'.lang-zh .oms-meta i{font-family:var(--cjk);font-weight:700}',
'.oms-btn{display:inline-flex;align-items:center;gap:10px;margin-top:clamp(22px,3vw,32px);',
'  font-family:var(--oms-pixel);font-size:clamp(13px,1.4vw,17px);font-weight:700;letter-spacing:.04em;color:var(--oms-black);text-decoration:none;',
'  background:var(--oms-yellow);padding:14px 26px;border-radius:999px;border:3px solid var(--oms-black);',
'  box-shadow:0 5px 0 var(--oms-yellow-d),0 8px 10px rgba(13,40,57,.25);transition:transform .12s,box-shadow .12s}',
'.lang-zh .oms-btn{font-family:var(--cjk);font-weight:900}',
'.oms-btn:hover{transform:translateY(-2px);box-shadow:0 7px 0 var(--oms-yellow-d),0 12px 14px rgba(13,40,57,.28)}',
'.oms-btn:active{transform:translateY(3px);box-shadow:0 2px 0 var(--oms-yellow-d)}',
'.oms-btn i{font-style:normal;font-size:.9em}',
'.oms-hero-screen{position:relative}',
'.oms-screen{position:relative;border:5px solid var(--oms-black);border-radius:10px;overflow:hidden;background:#000;',
'  box-shadow:0 10px 0 rgba(13,40,57,.28),0 18px 30px rgba(13,40,57,.3)}',
'.oms-screen-cover{aspect-ratio:690/390}',

/* pixel ground strip */
'.oms-ground{position:absolute;left:0;right:0;bottom:0;height:clamp(54px,8vw,86px);z-index:1;',
'  background:linear-gradient(180deg,#6FB13A 0 26%,#5A8E2E 26% 34%,#9C6B3E 34% 100%);',
'  border-top:5px solid #3E6B20;',
'  background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 14px,transparent 14px 28px),',
'  linear-gradient(180deg,#6FB13A 0 26%,#5A8E2E 26% 34%,#9C6B3E 34% 100%)}',

/* ---------------- SECTIONS ---------------- */
'.oms-sec{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:clamp(54px,8vw,104px) clamp(24px,5vw,72px)}',
'.oms-mark{display:flex;align-items:center;gap:14px;margin-bottom:clamp(20px,3vw,34px)}',
'.oms-num{font-family:var(--oms-pixel);font-weight:700;font-size:clamp(14px,1.5vw,18px);color:var(--oms-white);',
'  background:var(--oms-black);padding:4px 10px;border-radius:6px}',
'.oms-kicker{font-family:var(--oms-pixel);font-size:clamp(11px,1.1vw,13px);letter-spacing:.1em;color:var(--oms-ink);font-weight:600}',
'.lang-zh .oms-kicker{font-family:var(--cjk);font-weight:700}',
'.oms-h2{font-size:clamp(30px,5vw,62px);line-height:1.02;margin:0 0 clamp(18px,2.4vw,26px)}',
'.oms-h2-wide{max-width:22ch}',
'.oms-lead{max-width:52ch;font-size:clamp(15px,1.6vw,20px);font-weight:600;color:var(--oms-ink);text-wrap:pretty}',
'.oms-lead b{color:var(--oms-ink);font-weight:800}',
'.oms-lead-wide{max-width:62ch;margin-bottom:clamp(30px,4vw,48px)}',

/* 3-up cards (working journey / look & feel) */
'.oms-cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4vw,26px)}',
'.oms-card{background:rgba(255,255,255,.72);border:4px solid var(--oms-black);border-radius:12px;',
'  padding:clamp(18px,2.4vw,28px);box-shadow:0 6px 0 rgba(13,40,57,.22)}',
'.oms-step-k{display:inline-block;font-family:var(--oms-pixel);font-size:12px;font-weight:700;letter-spacing:.04em;',
'  color:var(--oms-white);background:var(--oms-ink);padding:4px 10px;border-radius:5px;margin-bottom:12px}',
'.lang-zh .oms-step-k{font-family:var(--cjk);font-weight:800}',
'.oms-card p{font-size:clamp(14px,1.4vw,16px);font-weight:600;color:var(--oms-ink);line-height:1.62;text-wrap:pretty}',

/* split + arrow keys */
'.oms-split{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(28px,5vw,64px);align-items:center}',
'.oms-keys{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:12px;',
'  width:min(280px,80%);margin:0 auto;justify-items:center}',
'.oms-key{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1;max-width:80px;',
'  font-size:30px;color:var(--oms-black);background:var(--oms-white);border:4px solid var(--oms-black);border-radius:10px;',
'  box-shadow:0 5px 0 rgba(13,40,57,.3)}',
'.oms-key-up{grid-column:2;grid-row:1}.oms-key-left{grid-column:1;grid-row:2}.oms-key-down{grid-column:2;grid-row:2}.oms-key-right{grid-column:3;grid-row:2}',

/* theory cards */
'.oms-theory-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(16px,2.4vw,26px);margin-top:clamp(30px,4vw,50px)}',
'.oms-theory{background:rgba(255,255,255,.72);border:4px solid var(--oms-black);border-radius:12px;padding:clamp(20px,2.6vw,30px);box-shadow:0 6px 0 rgba(13,40,57,.22)}',
'.oms-badge{display:inline-block;font-family:var(--oms-pixel);font-size:12px;font-weight:700;letter-spacing:.06em;',
'  color:var(--oms-white);background:var(--oms-black);padding:5px 12px;border-radius:6px}',
'.lang-zh .oms-badge{font-family:var(--cjk);font-weight:800}',
'.oms-badge-y{color:var(--oms-black);background:var(--oms-yellow);border:2px solid var(--oms-black)}',
'.oms-theory h4{font-size:clamp(18px,2.1vw,26px);margin:14px 0 10px;color:var(--oms-ink);text-shadow:2px 2px 0 rgba(255,255,255,.5)}',
'.oms-theory p{font-size:clamp(14px,1.4vw,16px);font-weight:600;color:var(--oms-ink);line-height:1.62;text-wrap:pretty}',

/* ---------------- DAYS ---------------- */
'.oms-days{display:flex;flex-direction:column;gap:clamp(20px,3vw,34px)}',
'.oms-day{background:rgba(255,255,255,.78);border:4px solid var(--oms-black);border-radius:16px;',
'  padding:clamp(18px,2.6vw,30px);box-shadow:0 8px 0 rgba(13,40,57,.22)}',
'.oms-day-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:clamp(16px,2.2vw,22px)}',
'.oms-pill{font-family:var(--oms-pixel);font-size:clamp(14px,1.6vw,20px);font-weight:700;letter-spacing:.03em;color:var(--oms-black);',
'  background:var(--oms-yellow);border:3px solid var(--oms-black);border-radius:999px;padding:8px 22px;box-shadow:0 4px 0 var(--oms-yellow-d)}',
'.lang-zh .oms-pill{font-family:var(--cjk);font-weight:900}',
'.oms-day-num{font-family:var(--oms-pixel);font-size:clamp(12px,1.3vw,15px);color:var(--oms-ink-dim);font-weight:600}',
'.oms-day-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(20px,3vw,38px);align-items:center}',
'.oms-day .oms-screen{aspect-ratio:16/10}',
'.oms-hint{position:absolute;left:12px;bottom:12px;z-index:2;font-family:var(--oms-pixel);font-size:clamp(11px,1.2vw,14px);font-weight:600;',
'  color:var(--oms-white);background:rgba(16,21,29,.86);border:2px solid var(--oms-white);border-radius:6px;padding:5px 11px}',
'.lang-zh .oms-hint{font-family:var(--cjk);font-weight:700}',
'.oms-day-t{font-size:clamp(20px,2.5vw,32px);color:var(--oms-ink);text-shadow:2px 2px 0 rgba(255,255,255,.55);margin:0 0 12px}',
'.oms-day-body p{font-size:clamp(14px,1.45vw,17px);font-weight:600;color:var(--oms-ink);line-height:1.66;text-wrap:pretty}',
'.oms-day:nth-child(even) .oms-day-grid{grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)}',
'.oms-day:nth-child(even) .oms-screen{order:2}',

/* sound */
'.oms-why{background:rgba(255,255,255,.72);border:4px solid var(--oms-black);border-radius:14px;padding:clamp(22px,3vw,34px);box-shadow:0 6px 0 rgba(13,40,57,.22)}',
'.oms-why ul{list-style:none;margin:18px 0 0;padding:0;display:flex;flex-direction:column;gap:14px}',
'.oms-why li{position:relative;padding-left:30px;font-size:clamp(14px,1.5vw,18px);font-weight:600;color:var(--oms-ink);line-height:1.55;text-wrap:pretty}',
'.oms-why li::before{content:"";position:absolute;left:0;top:.35em;width:14px;height:14px;background:var(--oms-yellow);border:3px solid var(--oms-black)}',

/* conclusion */
'.oms-sec-conc{text-align:center}',
'.oms-equation{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(12px,2vw,24px);margin:clamp(8px,2vw,20px) 0 clamp(34px,5vw,54px)}',
'.oms-eq-part{font-family:var(--oms-pixel);font-weight:700;font-size:clamp(16px,2.3vw,30px);color:var(--oms-ink);',
'  background:rgba(255,255,255,.72);border:4px solid var(--oms-black);border-radius:12px;padding:14px 22px;box-shadow:0 5px 0 rgba(13,40,57,.22)}',
'.lang-zh .oms-eq-part{font-family:var(--cjk);font-weight:900}',
'.oms-eq-out{color:var(--oms-black);background:var(--oms-yellow);box-shadow:0 5px 0 var(--oms-yellow-d)}',
'.oms-eq-op{font-family:var(--oms-pixel);font-weight:700;font-size:clamp(20px,3vw,40px);color:var(--oms-white);text-shadow:3px 3px 0 rgba(13,40,57,.5)}',
'.oms-reflect{max-width:72ch;margin:0 auto;text-align:left;background:rgba(16,21,29,.9);border:4px solid var(--oms-black);',
'  border-radius:14px;padding:clamp(24px,3.4vw,40px);box-shadow:0 8px 0 rgba(13,40,57,.3)}',
'.oms-reflect-label{display:inline-block;font-family:var(--oms-pixel);font-size:12px;font-weight:700;letter-spacing:.08em;',
'  color:var(--oms-black);background:var(--oms-yellow);padding:5px 12px;border-radius:6px;margin-bottom:16px}',
'.lang-zh .oms-reflect-label{font-family:var(--cjk);font-weight:800}',
'.oms-reflect p{font-size:clamp(15px,1.55vw,19px);font-weight:500;color:#EAF4FA;line-height:1.72;margin:0;text-wrap:pretty}',
'.lang-zh .oms-reflect p{line-height:1.9}',

/* footer */
'.oms-foot{position:relative;z-index:1;text-align:center;padding:clamp(50px,8vw,96px) clamp(24px,5vw,72px) clamp(70px,10vw,120px)}',
'.oms-foot-stars{display:flex;justify-content:center;gap:18px;margin-bottom:22px}',
'.oms-foot-stars span{width:18px;height:18px;background:var(--oms-yellow);border:3px solid var(--oms-black);',
'  clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);animation:omsBob 2.4s ease-in-out infinite}',
'.oms-foot-stars span:nth-child(2){animation-delay:.3s}.oms-foot-stars span:nth-child(3){animation-delay:.6s}',
'.oms-foot-title{font-family:var(--oms-pixel);font-weight:700;font-size:clamp(28px,5vw,60px);color:var(--oms-white);',
'  text-shadow:4px 4px 0 rgba(13,40,57,.6);margin-bottom:clamp(20px,3vw,30px)}',
'.lang-zh .oms-foot-title{font-family:var(--cjk);font-weight:900}',

/* reveal */
'.oms-rev{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.oms-rev.oms-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.oms-rev{opacity:1;transform:none;transition:none}}',

/* ---------------- FEATURE VIDEO ---------------- */
'.oms-feature{position:relative;z-index:1}',
'.oms-feature-media{position:relative}',
'.oms-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:90vh;border:0;display:block}',
'.oms-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;',
'  display:flex;align-items:center;justify-content:center;border-top:5px solid var(--oms-black);border-bottom:5px solid var(--oms-black);transition:filter .2s}',
'.oms-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(16,21,29,.06),rgba(16,21,29,.42))}',
'.oms-facade:hover{filter:brightness(1.06)}',
'.oms-play{position:relative;z-index:1;width:clamp(66px,8vw,92px);height:clamp(66px,8vw,92px);border-radius:50%;',
'  background:var(--oms-yellow);border:5px solid var(--oms-black);box-shadow:0 6px 0 var(--oms-yellow-d);transition:transform .18s}',
'.oms-play::before{content:"";position:absolute;top:50%;left:55%;transform:translate(-50%,-50%);',
'  border-style:solid;border-width:14px 0 14px 22px;border-color:transparent transparent transparent var(--oms-black)}',
'.oms-facade:hover .oms-play{transform:scale(1.08)}',
'.oms-edit{position:absolute;z-index:2;right:16px;top:16px;width:40px;height:40px;border-radius:8px;border:3px solid var(--oms-black);',
'  background:var(--oms-white);color:var(--oms-black);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;',
'  opacity:0;transition:opacity .2s}',
'.oms-facade:hover .oms-edit{opacity:1}',
'.oms-edit:hover{background:var(--oms-yellow)}',
'.oms-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;cursor:pointer;',
'  background:rgba(16,21,29,.92);border-top:5px solid var(--oms-black);border-bottom:5px solid var(--oms-black);',
'  color:#EAF4FA;font-family:var(--oms-pixel);font-size:clamp(13px,1.5vw,17px);font-weight:600;letter-spacing:.04em;transition:background .2s}',
'.lang-zh .oms-empty{font-family:var(--cjk);font-weight:700}',
'.oms-empty:hover{background:rgba(16,21,29,.82)}',
'.oms-empty-k{font-family:var(--oms-pixel);font-size:clamp(40px,5vw,62px);color:var(--oms-yellow)}',
'.oms-editor{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:clamp(22px,3vw,40px);',
'  background:rgba(16,21,29,.95);border-top:5px solid var(--oms-black);border-bottom:5px solid var(--oms-black)}',
'.oms-editor-l{font-family:var(--oms-pixel);font-size:12px;letter-spacing:.08em;color:#EAF4FA;font-weight:600}',
'.lang-zh .oms-editor-l{font-family:var(--cjk);font-weight:700}',
'.oms-editor-in{width:min(560px,82%);box-sizing:border-box;background:#0c1118;border:3px solid var(--oms-black);color:#EAF4FA;',
'  font-family:var(--oms-round);font-size:15px;font-weight:600;padding:12px 14px;border-radius:8px;outline:none}',
'.oms-editor-in:focus{border-color:var(--oms-yellow)}',
'.oms-editor-btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}',
'.oms-editor-btns button{font-family:var(--oms-pixel);font-size:12px;font-weight:700;letter-spacing:.04em;cursor:pointer;',
'  padding:10px 18px;border-radius:8px;border:3px solid var(--oms-black);background:var(--oms-white);color:var(--oms-black);transition:filter .15s,background .15s}',
'.oms-editor-save{background:var(--oms-yellow)!important;box-shadow:0 4px 0 var(--oms-yellow-d)}',
'.oms-editor-save:hover{filter:brightness(1.06)}',
'.oms-editor-clear:hover,.oms-editor-cancel:hover{background:#E6EEF3}',

/* responsive */
'@media (max-width:880px){',
'  .oms-hero-inner{grid-template-columns:1fr;gap:32px}',
'  .oms-split{grid-template-columns:1fr;gap:28px}',
'  .oms-cards3{grid-template-columns:1fr}',
'  .oms-theory-grid{grid-template-columns:1fr}',
'  .oms-day-grid,.oms-day:nth-child(even) .oms-day-grid{grid-template-columns:1fr}',
'  .oms-day:nth-child(even) .oms-screen{order:0}',
'  .oms-keys{width:240px}',
'}'
  ].join('\n');

})();
