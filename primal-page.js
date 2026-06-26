/* ============================================================================
   primal-page.js — bespoke long-form case study for PRIMAL HUNTING (VR + EMG),
   built from the project PDF (Yunbo Guo · Primal Hunting). Exposes
   window.renderPrimal(item), called by works-render.js instead of the generic
   buildCase for id==='primal'. Dark forest / mint-EMG theme; bilingual via
   .en/.zh spans. Keeps the user's existing project video (YouTube facade).
   Rich scroll reveals + 3 interactive modules: a live EMG draw-strength demo,
   scenario tabs, and an AI behaviour switcher.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/primal/';
  // the project's existing video (kept from the original module)
  var DEFAULT_YT = 'pP1NrBxjgpU';

  function injectCSS() {
    if (document.getElementById('pr-css')) return;
    var s = document.createElement('style');
    s.id = 'pr-css';
    s.textContent = PR_CSS;
    document.head.appendChild(s);
  }

  function ytId(v) {
    if (!v) return '';
    var m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    m = String(v).match(/^[\w-]{11}$/);
    return m ? v : '';
  }
  function storedYT() {
    try { var v = localStorage.getItem('pr-yt-main'); if (v != null) return ytId(v); } catch (e) {}
    return DEFAULT_YT;
  }
  function facadeHTML(id) {
    return '<button class="pr-yt pr-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play Primal Hunting gameplay">' +
      '<span class="pr-play" aria-hidden="true"></span>' +
      '<button class="pr-edit" type="button" data-edit="main" title="Change link" aria-label="Change link">&#9998;</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="pr-yt pr-empty" type="button" data-add="main">' +
      '<span class="pr-empty-k">&#9654;</span>' +
      '<span class="pr-empty-l"><span class="en">Add gameplay video</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u89c6\u9891</span></span></button>';
  }
  function videoBlock() {
    var id = storedYT();
    return '<div class="pr-scene-media">' + (id ? facadeHTML(id) : emptyHTML()) + '</div>';
  }

  /* tiny helper for an <image-slot> placeholder */
  function slot(id, ph_en, ph_zh, ratio) {
    return '<div class="pr-slot" style="aspect-ratio:' + (ratio || '16 / 9') + '">' +
      '<image-slot id="pr-' + id + '" shape="rect" placeholder="' + ph_en + ' / ' + ph_zh + '"></image-slot></div>';
  }

  function html() {
    return '' +
    '<article class="pr-page" id="case-games-primal" data-screen-label="Primal Hunting">' +

      /* ---------------- HERO ---------------- */
      '<header class="pr-hero">' +
        '<img class="pr-hero-bg" src="' + A + 'hero-archers.png" alt="Primal Hunting — archers drawing bows over a misty forest" />' +
        '<div class="pr-hero-veil"></div>' +
        '<div class="pr-scan" aria-hidden="true"></div>' +
        '<div class="pr-grain" aria-hidden="true"></div>' +
        '<div class="pr-hero-inner">' +
          '<div class="pr-eyebrow"><span class="en">VR + EMG game design · 2024</span><span class="zh">VR + \u808c\u7535\u6e38\u620f\u8bbe\u8ba1 · 2024</span></div>' +
          '<h1 class="pr-title">Primal Hunting</h1>' +
          '<div class="pr-sub"><span class="en">myoelectric linkage hunting</span><span class="zh">\u808c\u7535\u8054\u52a8\u72e9\u730e</span></div>' +
          '<p class="pr-tagline"><span class="en">A VR archery game wired to EMG sensors that read real muscle signals \u2014 immersive play for some, rehabilitation for others, wrapped in a narrative where nature curdles into a &ldquo;steel jungle.&rdquo;</span><span class="zh">\u4e00\u6b3e\u63a5\u5165 EMG \u808c\u7535\u4f20\u611f\u5668\u3001\u8bfb\u53d6\u771f\u5b9e\u808c\u8089\u4fe1\u53f7\u7684 VR \u5c04\u7bad\u6e38\u620f\u2014\u2014\u5bf9\u73a9\u5bb6\u662f\u6c89\u6d78\u4f53\u9a8c\uff0c\u5bf9\u5eb7\u590d\u4f7f\u7528\u8005\u662f\u6cbb\u7597\u5de5\u5177\uff1b\u5916\u5c42\u5305\u88f9\u7740\u4e00\u4e2a\u81ea\u7136\u9010\u6e10\u53d8\u6210\u201c\u94a2\u94c1\u4e1b\u6797\u201d\u7684\u53d9\u4e8b\u3002</span></p>' +
          '<div class="pr-tools">' +
            '<span class="pr-tool">Unreal Engine 5</span><span class="pr-tool">Blender</span>' +
            '<span class="pr-tool">Meta Quest</span><span class="pr-tool">Arduino</span><span class="pr-tool">EMG / sEMG</span>' +
          '</div>' +
          '<div class="pr-meta">' +
            '<span><b class="en">Individual</b><b class="zh">\u4e2a\u4eba</b><i class="en">VR + hardware</i><i class="zh">VR + \u786c\u4ef6\u6574\u5408</i></span>' +
            '<span><b class="en">Apr \u2013 Jun 2024</b><b class="zh">2024.04 \u2013 06</b><i class="en">Timeline</i><i class="zh">\u65f6\u95f4</i></span>' +
            '<span><b class="en">Gamers \u00b7 rehab users</b><b class="zh">\u73a9\u5bb6 \u00b7 \u5eb7\u590d\u4f7f\u7528\u8005</b><i class="en">Audience</i><i class="zh">\u9762\u5411</i></span>' +
          '</div>' +
          '<a class="pr-pdf pr-pdf-hero" href="' + A + 'PrimalHunting.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">\u67e5\u770b\u539f\u59cb PDF</span> <i>&#8599;</i></a>' +
        '</div>' +
        '<div class="pr-scroll"><span class="en">scroll</span><span class="zh">\u5411\u4e0b</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO (kept) ---------------- */
      '<section class="pr-feature" data-scene="main">' + videoBlock() + '</section>' +

      /* ---------------- 01 CONCEPT ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">01</span><span class="pr-kicker en">The concept</span><span class="pr-kicker zh">\u6982\u5ff5</span></div>' +
        '<div class="pr-split">' +
          '<h2 class="pr-h2"><span class="en">One game,<br/>two bodies</span><span class="zh">\u4e00\u6b3e\u6e38\u620f\uff0c<br/>\u4e24\u79cd\u8eab\u4f53</span></h2>' +
          '<div class="pr-body">' +
            '<p><span class="en">Primal Hunting combines VR with an EMG myoelectric sensing system. Drawing the bow is driven by your actual muscle strength, read from sensors and translated into arrow power \u2014 precise motor feedback that, for a player, is pure immersion, and for a user in rehab, is therapeutic exercise.</span><span class="zh">Primal Hunting \u5c06 VR \u4e0e EMG \u808c\u7535\u4f20\u611f\u7cfb\u7edf\u7ed3\u5408\u3002\u62c9\u5f13\u7531\u4f60\u771f\u5b9e\u7684\u808c\u8089\u529b\u91cf\u9a71\u52a8\uff0c\u7531\u4f20\u611f\u5668\u8bfb\u53d6\u5e76\u8f6c\u5316\u4e3a\u7bad\u7684\u529b\u91cf\u2014\u2014\u8fd9\u79cd\u7cbe\u51c6\u7684\u52a8\u4f5c\u53cd\u9988\uff0c\u5bf9\u73a9\u5bb6\u662f\u7eaf\u7cb9\u7684\u6c89\u6d78\uff0c\u5bf9\u5eb7\u590d\u4f7f\u7528\u8005\u5219\u662f\u6cbb\u7597\u6027\u7684\u8bad\u7ec3\u3002</span></p>' +
            '<p><span class="en">The world is staged after Chaplin&rsquo;s Modern Times: perpetually rotating gears, relentless clock hands, a steel jungle. Players feel the pressure of time and machinery \u2014 the alienation of the individual under modern industry \u2014 even as they hunt.</span><span class="zh">\u4e16\u754c\u81f4\u656c\u5353\u522b\u6797\u300a\u6469\u767b\u65f6\u4ee3\u300b\uff1a\u4e0d\u505c\u65cb\u8f6c\u7684\u9f7f\u8f6e\u3001\u65e0\u60c5\u8d70\u52a8\u7684\u949f\u9488\u3001\u4e00\u5ea7\u94a2\u94c1\u4e1b\u6797\u3002\u73a9\u5bb6\u5728\u72e9\u730e\u7684\u540c\u65f6\uff0c\u4e5f\u611f\u53d7\u5230\u65f6\u95f4\u4e0e\u673a\u68b0\u7684\u538b\u8feb\u2014\u2014\u73b0\u4ee3\u5de5\u4e1a\u4e0b\u4e2a\u4f53\u7684\u5f02\u5316\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="pr-twin">' +
          '<div class="pr-twin-card"><span class="pr-twin-k">A</span><h4><span class="en">For players</span><span class="zh">\u5bf9\u73a9\u5bb6</span></h4><p><span class="en">Physical awakening, a nature experience, and motor interactivity \u2014 a challenging, embodied hunt.</span><span class="zh">\u8eab\u4f53\u7684\u5524\u9192\u3001\u81ea\u7136\u7684\u4f53\u9a8c\u4e0e\u52a8\u4f5c\u4ea4\u4e92\u2014\u2014\u4e00\u573a\u5177\u8eab\u800c\u5145\u6ee1\u6311\u6218\u7684\u72e9\u730e\u3002</span></p></div>' +
          '<div class="pr-twin-card pr-twin-care"><span class="pr-twin-k">B</span><h4><span class="en">For users in rehab</span><span class="zh">\u5bf9\u5eb7\u590d\u4f7f\u7528\u8005</span></h4><p><span class="en">Muscle rehabilitation, physical coordination, and prevention of sequelae \u2014 therapy disguised as play.</span><span class="zh">\u808c\u8089\u5eb7\u590d\u3001\u8eab\u4f53\u534f\u8c03\u4e0e\u540e\u9057\u75c7\u9884\u9632\u2014\u2014\u4f2a\u88c5\u6210\u6e38\u620f\u7684\u6cbb\u7597\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 02 USER NEEDS ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">02</span><span class="pr-kicker en">User needs analysis</span><span class="pr-kicker zh">\u7528\u6237\u9700\u6c42\u5206\u6790</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">Where archery meets the body&rsquo;s wiring</span><span class="zh">\u5f53\u5c04\u7bad\u9047\u4e0a\u8eab\u4f53\u7684\u201c\u5e03\u7ebf\u201d</span></h2>' +
        '<p class="pr-lead"><span class="en">The core audience is young, but the deepest need comes from users with disabilities \u2014 people who report phantom-limb pain, struggle with conventional rehab, and want a reason to move. Three couplings turn EMG archery into a single answer.</span><span class="zh">\u6838\u5fc3\u53d7\u4f17\u5e74\u8f7b\uff0c\u4f46\u6700\u6df1\u7684\u9700\u6c42\u6765\u81ea\u6b8b\u969c\u4f7f\u7528\u8005\u2014\u2014\u4ed6\u4eec\u7ecf\u5386\u5e7b\u80a2\u75db\u3001\u5728\u4f20\u7edf\u5eb7\u590d\u4e2d\u632b\u8d25\uff0c\u5e76\u6e34\u671b\u4e00\u4e2a\u201c\u52a8\u8d77\u6765\u201d\u7684\u7406\u7531\u3002\u4e09\u91cd\u8026\u5408\u8ba9 EMG \u5c04\u7bad\u6210\u4e3a\u552f\u4e00\u7684\u7b54\u6848\u3002</span></p>' +

        '<div class="pr-couple">' +
          '<div class="pr-couple-card"><span class="pr-couple-k">A</span><h4><span class="en">Functional coupling</span><span class="zh">\u529f\u80fd\u8026\u5408</span></h4><p><span class="en">The EMG signal serves both game control and rehab monitoring \u2014 recreation and medicine in one loop.</span><span class="zh">EMG \u4fe1\u53f7\u540c\u65f6\u670d\u52a1\u4e8e\u6e38\u620f\u63a7\u5236\u4e0e\u5eb7\u590d\u76d1\u6d4b\u2014\u2014\u5a31\u4e50\u4e0e\u533b\u7597\u540c\u4e00\u56de\u8def\u3002</span></p></div>' +
          '<div class="pr-couple-arrow" aria-hidden="true"></div>' +
          '<div class="pr-couple-card"><span class="pr-couple-k">B</span><h4><span class="en">Experiential coupling</span><span class="zh">\u4f53\u9a8c\u8026\u5408</span></h4><p><span class="en">The VR environment is immersive and an ideal rehabilitation training scenario at the same time.</span><span class="zh">VR \u73af\u5883\u65e2\u662f\u6c89\u6d78\u7684\u6e38\u620f\u573a\u666f\uff0c\u4e5f\u662f\u7406\u60f3\u7684\u5eb7\u590d\u8bad\u7ec3\u573a\u666f\u3002</span></p></div>' +
          '<div class="pr-couple-arrow" aria-hidden="true"></div>' +
          '<div class="pr-couple-card"><span class="pr-couple-k">C</span><h4><span class="en">Goal coupling</span><span class="zh">\u76ee\u6807\u8026\u5408</span></h4><p><span class="en">Gamified design folds rehab goals naturally into play, so the training process disappears into the experience.</span><span class="zh">\u6e38\u620f\u5316\u8bbe\u8ba1\u5c06\u5eb7\u590d\u76ee\u6807\u81ea\u7136\u878d\u5165\u73a9\u6cd5\uff0c\u8bad\u7ec3\u8fc7\u7a0b\u6d88\u878d\u4e8e\u4f53\u9a8c\u4e4b\u4e2d\u3002</span></p></div>' +
          '<div class="pr-couple-eq" aria-hidden="true">=</div>' +
          '<div class="pr-couple-out"><span class="en">VR Archery<br/>Meets EMG</span><span class="zh">VR \u5c04\u7bad<br/>\u9047\u89c1 EMG</span></div>' +
        '</div>' +

        '<div class="pr-needs">' +
          '<div class="pr-need"><h5><span class="en">Insufficient interaction</span><span class="zh">\u4ea4\u4e92\u4e0d\u8db3</span></h5><ul><li><span class="en">Traditional rehab is no fun</span><span class="zh">\u4f20\u7edf\u5eb7\u590d\u7f3a\u4e4f\u4e50\u8da3</span></li><li><span class="en">Single feedback mechanism</span><span class="zh">\u53cd\u9988\u673a\u5236\u5355\u4e00</span></li><li><span class="en">Little sense of achievement</span><span class="zh">\u7f3a\u4e4f\u6210\u5c31\u611f\u4e0e\u5956\u52b1</span></li></ul></div>' +
          '<div class="pr-need"><h5><span class="en">Psychological impact</span><span class="zh">\u5fc3\u7406\u5f71\u54cd</span></h5><ul><li><span class="en">Isolation from nature</span><span class="zh">\u4e0e\u81ea\u7136\u7684\u9694\u79bb\u611f</span></li><li><span class="en">No relaxation experience</span><span class="zh">\u7f3a\u4e4f\u653e\u677e\u4f53\u9a8c</span></li><li><span class="en">Lack of environmental diversity</span><span class="zh">\u73af\u5883\u591a\u6837\u6027\u4e0d\u8db3</span></li></ul></div>' +
          '<div class="pr-need"><h5><span class="en">Degradation of abilities</span><span class="zh">\u80fd\u529b\u9000\u5316</span></h5><ul><li><span class="en">Muscle strength atrophy</span><span class="zh">\u808c\u8089\u529b\u91cf\u840e\u7f29</span></li><li><span class="en">Limited range of motion</span><span class="zh">\u6d3b\u52a8\u8303\u56f4\u53d7\u9650</span></li><li><span class="en">Slowed reaction time</span><span class="zh">\u53cd\u5e94\u65f6\u95f4\u53d8\u6162</span></li></ul></div>' +
        '</div>' +

        '<div class="pr-personas">' +
          '<figure class="pr-persona">' + slot('persona-zhang', 'Persona portrait', '\u4eba\u7269\u8096\u50cf', '4 / 5') +
            '<figcaption><b>ZHANG Chao \u00b7 34</b><p><span class="en">&ldquo;I&rsquo;ve always wanted to try archery, but traditional equipment is hard to maneuver.&rdquo;</span><span class="zh">\u201c\u6211\u4e00\u76f4\u60f3\u8bd5\u8bd5\u5c04\u7bad\uff0c\u4f46\u4f20\u7edf\u88c5\u5907\u5f88\u96be\u64cd\u4f5c\u3002\u201d</span></p></figcaption></figure>' +
          '<figure class="pr-persona">' + slot('persona-xiao', 'Persona portrait', '\u4eba\u7269\u8096\u50cf', '4 / 5') +
            '<figcaption><b>XIAO Li \u00b7 37</b><p><span class="en">&ldquo;After my injury I lost targeted exercise. I fear moving wrong and getting hurt again.&rdquo;</span><span class="zh">\u201c\u53d7\u4f24\u540e\u6211\u5931\u53bb\u4e86\u6709\u9488\u5bf9\u6027\u7684\u953b\u70bc\uff0c\u603b\u62c5\u5fc3\u52a8\u9519\u53c8\u53d7\u4f24\u3002\u201d</span></p></figcaption></figure>' +
          '<div class="pr-persona-stats">' +
            '<div class="pr-pstat"><b>76%</b><p><span class="en">of upper-limb amputees report phantom-limb pain</span><span class="zh">\u4e0a\u80a2\u622a\u80a2\u8005\u62a5\u544a\u5e7b\u80a2\u75db</span></p></div>' +
            '<div class="pr-pstat"><b>2&ndash;3<i>d</i></b><p><span class="en">adaptation period for EMG control</span><span class="zh">EMG \u63a7\u5236\u7684\u9002\u5e94\u671f</span></p></div>' +
            '<div class="pr-pstat"><b>&#10003;</b><p><span class="en">EMG archery measurably improves muscle control</span><span class="zh">EMG \u5c04\u7bad\u53ef\u89c1\u5730\u6539\u5584\u808c\u8089\u63a7\u5236</span></p></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 03 WHY HUNTING ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">03</span><span class="pr-kicker en">Why a hunting theme</span><span class="pr-kicker zh">\u4e3a\u4f55\u9009\u72e9\u730e</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">Rare theme, perfect fit for the sensor</span><span class="zh">\u7a00\u6709\u7684\u9898\u6750\uff0c\u4e0e\u4f20\u611f\u5668\u5b8c\u7f8e\u5951\u5408</span></h2>' +
        '<div class="pr-why">' +
          '<div class="pr-why-card"><span class="pr-dot"></span><h4><span class="en">Theme uniqueness</span><span class="zh">\u9898\u6750\u72ec\u7279</span></h4><p><span class="en">Hunting is relatively rare in the game market \u2014 fresh, challenging, and clearly differentiated.</span><span class="zh">\u72e9\u730e\u9898\u6750\u5728\u6e38\u620f\u5e02\u573a\u76f8\u5bf9\u7a00\u6709\u2014\u2014\u65b0\u9c9c\u3001\u5145\u6ee1\u6311\u6218\u4e14\u5dee\u5f02\u5316\u660e\u663e\u3002</span></p></div>' +
          '<div class="pr-why-card"><span class="pr-dot"></span><h4><span class="en">High user stickiness</span><span class="zh">\u9ad8\u7528\u6237\u9ecf\u6027</span></h4><p><span class="en">Skill grows over a long cycle \u2014 players keep honing and unlocking, which drives long-term retention.</span><span class="zh">\u6280\u80fd\u5728\u957f\u5468\u671f\u4e2d\u6210\u957f\u2014\u2014\u73a9\u5bb6\u4e0d\u65ad\u78e8\u7ec3\u4e0e\u89e3\u9501\uff0c\u5e26\u6765\u957f\u671f\u7559\u5b58\u3002</span></p></div>' +
          '<div class="pr-why-card"><span class="pr-dot"></span><h4><span class="en">Technological fit</span><span class="zh">\u6280\u672f\u5951\u5408</span></h4><p><span class="en">Hunting needs precise movement and power control \u2014 exactly what EMG + VR can make feel real.</span><span class="zh">\u72e9\u730e\u9700\u8981\u7cbe\u51c6\u7684\u52a8\u4f5c\u4e0e\u529b\u91cf\u63a7\u5236\u2014\u2014\u6070\u662f EMG + VR \u80fd\u8ba9\u5176\u53d8\u5f97\u771f\u5b9e\u4e4b\u5904\u3002</span></p></div>' +
          '<div class="pr-why-card"><span class="pr-dot"></span><h4><span class="en">Sport + entertainment</span><span class="zh">\u8fd0\u52a8 + \u5a31\u4e50</span></h4><p><span class="en">It integrates physical strength and strategy, meeting sports needs while staying intense and fun.</span><span class="zh">\u5c06\u4f53\u80fd\u4e0e\u7b56\u7565\u878d\u4e3a\u4e00\u4f53\uff0c\u5728\u6ee1\u8db3\u8fd0\u52a8\u9700\u6c42\u7684\u540c\u65f6\u4fdd\u6301\u6fc0\u70c8\u4e0e\u4e50\u8da3\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 04 SCENARIO DESIGN ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">04</span><span class="pr-kicker en">Perceptual creativity</span><span class="pr-kicker zh">\u611f\u77e5\u521b\u610f</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">A futuristic-yet-ancient wilderness</span><span class="zh">\u672a\u6765\u800c\u53e4\u8001\u7684\u8352\u91ce</span></h2>' +
        '<p class="pr-lead"><span class="en">The player becomes a hunter recreating primal instincts through high-tech means. In the treacherous wilderness you keep practising, mastering skills and surviving the laws of nature. Each scene is polished for an immersive, interactive realism.</span><span class="zh">\u73a9\u5bb6\u6210\u4e3a\u4e00\u540d\u730e\u4eba\uff0c\u4ee5\u9ad8\u79d1\u6280\u624b\u6bb5\u91cd\u73b0\u539f\u59cb\u672c\u80fd\u3002\u5728\u5371\u9669\u7684\u8352\u91ce\u4e2d\u4e0d\u65ad\u7ec3\u4e60\uff0c\u638c\u63e1\u6280\u80fd\u5e76\u5728\u81ea\u7136\u6cd5\u5219\u4e0b\u751f\u5b58\u3002\u6bcf\u4e00\u4e2a\u573a\u666f\u90fd\u4e3a\u6c89\u6d78\u3001\u4ea4\u4e92\u7684\u771f\u5b9e\u611f\u800c\u6253\u78e8\u3002</span></p>' +
        '<div class="pr-scenario">' +
          '<div class="pr-scn-tabs" role="tablist">' +
            '<button class="pr-scn-tab is-on" data-scn="0" role="tab"><span class="en">Primitive Forest</span><span class="zh">\u539f\u59cb\u68ee\u6797</span></button>' +
            '<button class="pr-scn-tab" data-scn="1" role="tab"><span class="en">Tundra Steppe</span><span class="zh">\u51bb\u539f\u8352\u539f</span></button>' +
          '</div>' +
          '<div class="pr-scn-body">' +
            '<div class="pr-scn-media">' +
              slot('scene-forest', 'Forest scene render', '\u68ee\u6797\u573a\u666f\u6e32\u67d3', '16 / 9') +
              slot('scene-tundra', 'Tundra scene render', '\u51bb\u539f\u573a\u666f\u6e32\u67d3', '16 / 9') +
            '</div>' +
            '<div class="pr-scn-text">' +
              '<div class="pr-scn-pane is-on" data-pane="0"><p><span class="en">Towering trees, gurgling streams and hidden caves build a vibrant rainforest. Players face complex terrain and changing weather \u2014 the pursuit of prey becomes a test of exploration, endurance and strategy.</span><span class="zh">\u53c2\u5929\u7684\u6811\u6728\u3001\u6f7a\u6f7a\u6e2a\u6d41\u4e0e\u9690\u85cf\u7684\u6d1e\u7a74\uff0c\u6784\u6210\u4e00\u7247\u751f\u673a\u52c3\u52c3\u7684\u96e8\u6797\u3002\u73a9\u5bb6\u9700\u9762\u5bf9\u590d\u6742\u5730\u5f62\u4e0e\u591a\u53d8\u5929\u6c14\u2014\u2014\u5bf9\u730e\u7269\u7684\u8ffd\u9010\uff0c\u6210\u4e3a\u63a2\u7d22\u3001\u8010\u529b\u4e0e\u7b56\u7565\u7684\u8003\u9a8c\u3002</span></p></div>' +
              '<div class="pr-scn-pane" data-pane="1"><p><span class="en">Vast plains and low shrubs are a beautiful contrast; the breeze stirs waves of grass. But the open terrain makes the contest between hunter and prey more tense \u2014 every step may be the key to success or failure.</span><span class="zh">\u8fbd\u9614\u7684\u5e73\u539f\u4e0e\u4f4e\u77ee\u7684\u704c\u6728\u5f62\u6210\u7f8e\u4e3d\u7684\u53cd\u5dee\uff0c\u5fae\u98ce\u63c0\u8d77\u8349\u6d6a\u3002\u4f46\u5f00\u9614\u7684\u5730\u5f62\u4e5f\u8ba9\u730e\u4eba\u4e0e\u730e\u7269\u7684\u8f83\u91cf\u66f4\u52a0\u7d27\u5f20\u2014\u2014\u6bcf\u4e00\u6b65\u90fd\u53ef\u80fd\u662f\u6210\u8d25\u7684\u5173\u952e\u3002</span></p></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 05 EMG INTERACTION (interactive) ---------------- */
      '<section class="pr-sec pr-sec-emg">' +
        '<div class="pr-mark"><span class="pr-num">05</span><span class="pr-kicker en">EMG interaction design</span><span class="pr-kicker zh">\u808c\u7535\u4ea4\u4e92\u8bbe\u8ba1</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">Your muscle is the controller</span><span class="zh">\u4f60\u7684\u808c\u8089\u5c31\u662f\u624b\u67c4</span></h2>' +
        '<p class="pr-lead"><span class="en">Dual EMG sensors on the thenar muscle and forearm flexors read muscle activation. An Arduino streams the signal over Bluetooth to UE5, which maps it to keys: pass the threshold and the bow draws (E); release and the arrow fires (Space). Drag the slider to feel it.</span><span class="zh">\u62c7\u6307\u6839\u90e8\u4e0e\u524d\u81c2\u5c48\u808c\u4e0a\u7684\u53cc EMG \u4f20\u611f\u5668\u8bfb\u53d6\u808c\u8089\u6fc0\u6d3b\uff1bArduino \u901a\u8fc7\u84dd\u7259\u5c06\u4fe1\u53f7\u4f20\u7ed9 UE5\uff0c\u5e76\u6620\u5c04\u4e3a\u6309\u952e\uff1a\u8d85\u8fc7\u9608\u503c\u5219\u62c9\u5f13\uff08E\uff09\uff0c\u91ca\u653e\u5219\u51fa\u7bad\uff08\u7a7a\u683c\uff09\u3002\u62d6\u52a8\u6ed1\u5757\u4eb2\u8eab\u611f\u53d7\u3002</span></p>' +

        '<div class="pr-emg" id="pr-emg">' +
          '<div class="pr-emg-scope">' +
            '<canvas class="pr-emg-canvas" width="900" height="320"></canvas>' +
            '<div class="pr-emg-state"><span class="pr-emg-badge" data-state="rest"><span class="en">REST</span><span class="zh">\u9759\u606f</span></span></div>' +
            '<div class="pr-emg-readout"><span class="pr-emg-val">0</span><i>\u03bcV</i></div>' +
          '</div>' +
          '<div class="pr-emg-ctrl">' +
            '<label class="pr-emg-label"><span class="en">Muscle strength</span><span class="zh">\u808c\u8089\u529b\u91cf</span></label>' +
            '<input class="pr-emg-slider" type="range" min="0" max="100" value="0" />' +
            '<div class="pr-emg-keys"><span class="pr-key" data-key="E">E<i><span class="en">draw</span><span class="zh">\u62c9\u5f13</span></i></span><span class="pr-key" data-key="space">SPACE<i><span class="en">release</span><span class="zh">\u51fa\u7bad</span></i></span></div>' +
            '<div class="pr-emg-power"><span class="pr-emg-power-label"><span class="en">Draw power</span><span class="zh">\u62c9\u5f13\u529b\u9053</span></span><div class="pr-emg-bar"><i></i></div></div>' +
            '<p class="pr-emg-hint"><span class="en">Threshold mapping is tunable per user (see below). Cross it to draw; relax past it to loose the arrow.</span><span class="zh">\u9608\u503c\u6620\u5c04\u53ef\u6309\u7528\u6237\u8c03\u6574\uff08\u89c1\u4e0b\u65b9\uff09\u3002\u8d8a\u8fc7\u5b83\u5373\u62c9\u5f13\uff0c\u653e\u677e\u8dcc\u56de\u5219\u51fa\u7bad\u3002</span></p>' +
          '</div>' +
        '</div>' +

        '<div class="pr-chain">' +
          '<span class="pr-chain-step">HC-05</span><span class="pr-chain-arr">\u2192</span>' +
          '<span class="pr-chain-step">sEMG \u00d7 2</span><span class="pr-chain-arr">\u2192</span>' +
          '<span class="pr-chain-step">Arduino Uno</span><span class="pr-chain-arr">\u2192</span>' +
          '<span class="pr-chain-step">Bluetooth</span><span class="pr-chain-arr">\u2192</span>' +
          '<span class="pr-chain-step pr-chain-end">UE5</span>' +
        '</div>' +

        '<div class="pr-adapt">' +
          '<div class="pr-adapt-card"><h5><span class="en">Standard users</span><span class="zh">\u6807\u51c6\u7528\u6237</span></h5><p><b>300\u2013400</b> <span class="en">base threshold \u00b7 linear mapping</span><span class="zh">\u57fa\u51c6\u9608\u503c \u00b7 \u7ebf\u6027\u6620\u5c04</span></p></div>' +
          '<div class="pr-adapt-card"><h5><span class="en">Strength users</span><span class="zh">\u529b\u91cf\u578b\u7528\u6237</span></h5><p><b>400\u2013500</b> <span class="en">raised threshold \u00b7 wider range</span><span class="zh">\u63d0\u9ad8\u9608\u503c \u00b7 \u62d3\u5bbd\u8303\u56f4</span></p></div>' +
          '<div class="pr-adapt-card"><h5><span class="en">Precision users</span><span class="zh">\u7cbe\u7ec6\u578b\u7528\u6237</span></h5><p><b>250\u2013350</b> <span class="en">lower threshold \u00b7 more smoothing</span><span class="zh">\u964d\u4f4e\u9608\u503c \u00b7 \u589e\u5f3a\u5e73\u6ed1</span></p></div>' +
          '<div class="pr-adapt-card pr-adapt-access"><h5><span class="en">Arm-amputation user</span><span class="zh">\u622a\u80a2\u7528\u6237</span></h5><p><span class="en">Primary: biceps / triceps on the stump; control via strength of contraction.</span><span class="zh">\u4e3b\u4f4d\u70b9\uff1a\u6b8b\u80a2\u7684\u80b1\u4e8c\u5934 / \u4e09\u5934\u808c\uff1b\u4ee5\u6536\u7f29\u5f3a\u5ea6\u63a7\u5236\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 06 FUNCTIONAL REALIZATION (interactive AI) ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">06</span><span class="pr-kicker en">Functional realization</span><span class="pr-kicker zh">\u529f\u80fd\u5b9e\u73b0</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">Prey that thinks for itself</span><span class="zh">\u4f1a\u601d\u8003\u7684\u730e\u7269</span></h2>' +
        '<div class="pr-split">' +
          '<h3 class="pr-h3"><span class="en">Random AI generation</span><span class="zh">\u968f\u673a AI \u751f\u6210</span></h3>' +
          '<div class="pr-body">' +
            '<p><span class="en">Inspired by Mondrian&rsquo;s geometric abstraction, rules and data are visualised as a growing geometric system. UE&rsquo;s procedural nodes build a dynamically evolving data landscape \u2014 a vast &ldquo;data mountain range&rdquo; where each stage is a dimension of data-driven judgement.</span><span class="zh">\u53d7\u8499\u5fb7\u91cc\u5b89\u51e0\u4f55\u62bd\u8c61\u542f\u53d1\uff0c\u89c4\u5219\u4e0e\u6570\u636e\u88ab\u53ef\u89c6\u5316\u4e3a\u4e00\u4e2a\u4e0d\u65ad\u751f\u957f\u7684\u51e0\u4f55\u7cfb\u7edf\u3002UE \u7684\u7a0b\u5e8f\u5316\u8282\u70b9\u6784\u5efa\u51fa\u52a8\u6001\u6f14\u5316\u7684\u6570\u636e\u5730\u8c8c\u2014\u2014\u4e00\u5ea7\u5e9e\u5927\u7684\u201c\u6570\u636e\u5c71\u8109\u201d\uff0c\u6bcf\u4e00\u9636\u6bb5\u90fd\u662f\u6570\u636e\u9a71\u52a8\u5224\u65ad\u7684\u4e00\u4e2a\u7ef4\u5ea6\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="pr-ai">' +
          '<div class="pr-ai-stage"><div class="pr-ai-field"><span class="pr-ai-prey"></span><span class="pr-ai-player"></span></div></div>' +
          '<div class="pr-ai-panel">' +
            '<span class="pr-ai-kicker"><span class="en">Dynamic behaviour tree \u2014 tap a state</span><span class="zh">\u52a8\u6001\u884c\u4e3a\u6811 \u2014 \u70b9\u4e00\u4e2a\u72b6\u6001</span></span>' +
            '<div class="pr-ai-chips">' +
              '<button class="pr-ai-chip is-on" data-ai="0"><span class="en">Wander</span><span class="zh">\u6e38\u8d70</span></button>' +
              '<button class="pr-ai-chip" data-ai="1"><span class="en">Flee</span><span class="zh">\u9003\u8dd1</span></button>' +
              '<button class="pr-ai-chip" data-ai="2"><span class="en">Hide</span><span class="zh">\u85cf\u533f</span></button>' +
              '<button class="pr-ai-chip" data-ai="3"><span class="en">Fight back</span><span class="zh">\u53cd\u51fb</span></button>' +
            '</div>' +
            '<p class="pr-ai-desc"></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 07 VR ARCHERY FEATURES ---------------- */
      '<section class="pr-sec">' +
        '<div class="pr-mark"><span class="pr-num">07</span><span class="pr-kicker en">VR archery features</span><span class="pr-kicker zh">VR \u5c04\u7bad\u529f\u80fd</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">Blueprint-built, body-driven archery</span><span class="zh">\u7531\u84dd\u56fe\u6784\u5efa\u3001\u7531\u8eab\u4f53\u9a71\u52a8\u7684\u5c04\u7bad</span></h2>' +
        '<div class="pr-feat">' +
          '<div class="pr-feat-card"><span class="pr-feat-n">01</span><h4><span class="en">Bow control</span><span class="zh">\u62c9\u5f13\u63a7\u5236</span></h4><p><span class="en">Simulate the bow-drawing action through VR controllers to heighten interactivity.</span><span class="zh">\u901a\u8fc7 VR \u624b\u67c4\u6a21\u62df\u62c9\u5f13\u52a8\u4f5c\uff0c\u589e\u5f3a\u4ea4\u4e92\u6027\u3002</span></p></div>' +
          '<div class="pr-feat-card"><span class="pr-feat-n">02</span><h4><span class="en">Aiming mechanism</span><span class="zh">\u77c4\u51c6\u673a\u5236</span></h4><p><span class="en">Aim at the target naturally using the VR headset view.</span><span class="zh">\u501f\u52a9 VR \u5934\u663e\u89c6\u89d2\u81ea\u7136\u5730\u77c4\u51c6\u76ee\u6807\u3002</span></p></div>' +
          '<div class="pr-feat-card"><span class="pr-feat-n">03</span><h4><span class="en">Arrow launch</span><span class="zh">\u51fa\u7bad</span></h4><p><span class="en">Release the controller to launch; the flight trajectory is set by how hard you drew.</span><span class="zh">\u91ca\u653e\u624b\u67c4\u5373\u51fa\u7bad\uff0c\u98de\u884c\u8f68\u8ff9\u7531\u62c9\u5f13\u529b\u9053\u51b3\u5b9a\u3002</span></p></div>' +
          '<div class="pr-feat-card"><span class="pr-feat-n">04</span><h4><span class="en">Immersive feedback</span><span class="zh">\u6c89\u6d78\u53cd\u9988</span></h4><p><span class="en">Vibration and sound feedback let players feel the power and accuracy of every shot. Targets can be static or dynamic.</span><span class="zh">\u9707\u52a8\u4e0e\u58f0\u97f3\u53cd\u9988\u8ba9\u73a9\u5bb6\u611f\u53d7\u6bcf\u4e00\u7bad\u7684\u529b\u91cf\u4e0e\u7cbe\u51c6\uff1b\u76ee\u6807\u53ef\u9759\u53ef\u52a8\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 08 RENDERING SHOW ---------------- */
      '<section class="pr-sec pr-sec-render">' +
        '<div class="pr-mark"><span class="pr-num">08</span><span class="pr-kicker en">Rendering show</span><span class="pr-kicker zh">\u6e32\u67d3\u5c55\u793a</span></div>' +
        '<h2 class="pr-h2 pr-h2-wide"><span class="en">From wilderness to steel jungle</span><span class="zh">\u4ece\u8352\u91ce\u5230\u94a2\u94c1\u4e1b\u6797</span></h2>' +
        '<figure class="pr-wide">' +
          '<img src="' + A + 'render-bear.png" alt="Primal Hunting render — a bear in a misty mountain meadow" />' +
          '<figcaption><span class="en">High-quality rendering and physics: arrow flight, target reaction and object collision are all simulated, and light, shadow and environment interactions make the scene vivid and immersive.</span><span class="zh">\u9ad8\u8d28\u91cf\u6e32\u67d3\u4e0e\u7269\u7406\uff1a\u7bad\u7684\u98de\u884c\u3001\u76ee\u6807\u53cd\u5e94\u4e0e\u7269\u4f53\u78b0\u649e\u5747\u88ab\u771f\u5b9e\u6a21\u62df\uff0c\u5149\u5f71\u4e0e\u73af\u5883\u4ea4\u4e92\u8ba9\u573a\u666f\u751f\u52a8\u800c\u6c89\u6d78\u3002</span></figcaption>' +
        '</figure>' +
        '<div class="pr-gallery">' +
          slot('render-1', 'Archery test', '\u5c04\u7bad\u6d4b\u8bd5', '16 / 10') +
          slot('render-2', 'AI random move', 'AI \u968f\u673a\u79fb\u52a8', '16 / 10') +
          slot('render-3', 'Physical effects', '\u7269\u7406\u6548\u679c', '16 / 10') +
          slot('render-4', 'High-quality render', '\u9ad8\u8d28\u6e32\u67d3', '16 / 10') +
        '</div>' +
        '<div class="pr-reflect">' +
          '<span class="pr-reflect-label"><span class="en">Reflection</span><span class="zh">\u53cd\u601d</span></span>' +
          '<p><span class="en">My first time wiring biological hardware to a digital world. It opened my eyes to accessibility in HCI \u2014 proof that immersive tech can serve marginalized bodies \u2014 and led directly into my interest in bio-responsive, accessible design.</span><span class="zh">\u7b2c\u4e00\u6b21\u628a\u751f\u7269\u786c\u4ef6\u63a5\u5165\u6570\u5b57\u4e16\u754c\u3002\u5b83\u8ba9\u6211\u770b\u89c1 HCI \u4e2d\u7684\u201c\u53ef\u8fbe\u6027\u201d\u2014\u2014\u6c89\u6d78\u6280\u672f\u53ef\u4ee5\u670d\u52a1\u88ab\u5ffd\u89c6\u7684\u8eab\u4f53\u2014\u2014\u4e5f\u76f4\u63a5\u901a\u5411\u6211\u5bf9\u751f\u7269\u54cd\u5e94\u4e0e\u65e0\u969c\u788d\u8bbe\u8ba1\u7684\u5174\u8da3\u3002</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="pr-foot">' +
        '<div class="pr-foot-line"><span class="en">PRIMAL HUNTING · VR + EMG · myoelectric linkage</span><span class="zh">PRIMAL HUNTING · VR + EMG · \u808c\u7535\u8054\u52a8</span></div>' +
        '<a class="pr-pdf" href="' + A + 'PrimalHunting.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">\u67e5\u770b\u539f\u59cb PDF</span> <i>&#8599;</i></a>' +
      '</footer>' +

    '</article>';
  }

  /* ----------------------- interactions ----------------------- */
  var AI_STATES = [
    { en: 'The animal walks freely, changing direction at random intervals \u2014 natural, irregular movement as it explores the environment.', zh: '\u52a8\u7269\u81ea\u7531\u6e38\u8d70\uff0c\u6bcf\u9694\u4e00\u6bb5\u65f6\u95f4\u968f\u673a\u6539\u53d8\u65b9\u5411\u2014\u2014\u5728\u63a2\u7d22\u73af\u5883\u65f6\u5448\u73b0\u81ea\u7136\u3001\u4e0d\u89c4\u5219\u7684\u8fd0\u52a8\u3002', cls: 'wander' },
    { en: 'Sensing the player approach, the behaviour tree switches to flight \u2014 the prey bolts away along the clearest escape vector.', zh: '\u611f\u77e5\u5230\u73a9\u5bb6\u9760\u8fd1\uff0c\u884c\u4e3a\u6811\u5207\u6362\u5230\u9003\u8dd1\u2014\u2014\u730e\u7269\u6cbf\u6700\u6e05\u6670\u7684\u9003\u751f\u8def\u5f84\u5954\u9038\u3002', cls: 'flee' },
    { en: 'When cover is near, the animal chooses to hide, breaking line of sight and waiting for the threat to pass.', zh: '\u5f53\u9644\u8fd1\u6709\u63a9\u4f53\uff0c\u52a8\u7269\u9009\u62e9\u85cf\u533f\uff0c\u6253\u65ad\u89c6\u7ebf\u5e76\u7b49\u5f85\u5a01\u80c1\u8fc7\u53bb\u3002', cls: 'hide' },
    { en: 'Cornered, the prey turns and fights back. Multi-threaded AI keeps many such characters responsive at once for large-scale hunts.', zh: '\u88ab\u903c\u5165\u7edd\u5883\u65f6\uff0c\u730e\u7269\u8f6c\u8eab\u53cd\u51fb\u3002\u591a\u7ebf\u7a0b AI \u8ba9\u4f17\u591a\u6b64\u7c7b\u89d2\u8272\u540c\u65f6\u4fdd\u6301\u54cd\u5e94\uff0c\u652f\u6491\u5927\u89c4\u6a21\u72e9\u730e\u3002', cls: 'fight' }
  ];

  function wireEMG(art) {
    var root = art.querySelector('#pr-emg'); if (!root) return;
    var canvas = root.querySelector('.pr-emg-canvas');
    var ctx = canvas.getContext('2d');
    var slider = root.querySelector('.pr-emg-slider');
    var badge = root.querySelector('.pr-emg-badge');
    var valEl = root.querySelector('.pr-emg-val');
    var barEl = root.querySelector('.pr-emg-bar i');
    var keyE = root.querySelector('.pr-key[data-key="E"]');
    var keySpace = root.querySelector('.pr-key[data-key="space"]');
    var DRAW_TH = 55, REL_TH = 35;     // hysteresis thresholds (0..100)
    var W = canvas.width, H = canvas.height, mid = H * 0.5;
    var buf = new Array(W).fill(0), t = 0, drawing = false, power = 0, peak = 0;

    function setBadge(state) {
      badge.setAttribute('data-state', state);
      var labels = {
        rest: ['REST', '\u9759\u606f'], draw: ['DRAW \u00b7 E', '\u62c9\u5f13 \u00b7 E'], fire: ['FIRE \u00b7 SPACE', '\u51fa\u7bad \u00b7 \u7a7a\u683c']
      };
      badge.innerHTML = '<span class="en">' + labels[state][0] + '</span><span class="zh">' + labels[state][1] + '</span>';
    }
    setBadge('rest');

    function loop() {
      if (!document.body.contains(canvas)) return;   // self-stop when removed
      t += 1;
      var s = +slider.value;                          // 0..100 muscle strength
      // crossing logic w/ hysteresis
      if (!drawing && s >= DRAW_TH) { drawing = true; peak = s; keyE.classList.add('is-down'); setBadge('draw'); }
      else if (drawing && s <= REL_TH) {
        drawing = false; keyE.classList.remove('is-down');
        keySpace.classList.add('is-down'); setBadge('fire');
        power = peak;                                  // arrow power = peak draw
        setTimeout(function () { keySpace.classList.remove('is-down'); if (+slider.value < DRAW_TH) setBadge('rest'); }, 360);
      }
      if (drawing && s > peak) peak = s;

      // synth EMG sample: baseline noise + burst scaled by strength
      var activation = s / 100;
      var noise = (Math.random() - 0.5) * 6;
      var burst = activation * (18 + Math.random() * 26) * (0.6 + 0.4 * Math.sin(t * 0.6));
      var sample = noise + (activation > 0.04 ? burst : 0);
      buf.push(sample); if (buf.length > W) buf.shift();

      // draw scope
      ctx.clearRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = 'rgba(232,241,236,0.06)'; ctx.lineWidth = 1;
      for (var gx = 0; gx < W; gx += 60) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (var gy = 0; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      // threshold lines
      var thY = mid - (DRAW_TH / 100) * (H * 0.42);
      ctx.strokeStyle = 'rgba(255,107,90,0.55)'; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(0, thY); ctx.lineTo(W, thY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, mid + (mid - thY)); ctx.lineTo(W, mid + (mid - thY)); ctx.stroke();
      ctx.setLineDash([]);
      // waveform
      ctx.strokeStyle = drawing ? '#16E4A8' : '#7FB7A4';
      ctx.lineWidth = 2; ctx.beginPath();
      for (var x = 0; x < buf.length; x++) {
        var y = mid - buf[x] * (H * 0.42 / 50);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (drawing) { ctx.shadowBlur = 0; }

      // readout (approx microvolts) + power decay
      var uv = Math.round(activation * 480 + Math.abs(noise) * 3);
      valEl.textContent = uv;
      if (!drawing) power *= 0.9;
      var shown = drawing ? peak : power;
      barEl.style.width = shown + '%';
      root.classList.toggle('is-drawing', drawing);

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function wireScenario(art) {
    var tabs = [].slice.call(art.querySelectorAll('.pr-scn-tab'));
    var panes = [].slice.call(art.querySelectorAll('.pr-scn-pane'));
    var medias = [].slice.call(art.querySelectorAll('.pr-scn-media .pr-slot'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var n = +tab.getAttribute('data-scn');
        tabs.forEach(function (x) { x.classList.toggle('is-on', x === tab); });
        panes.forEach(function (p) { p.classList.toggle('is-on', +p.getAttribute('data-pane') === n); });
        medias.forEach(function (m, i) { m.classList.toggle('is-on', i === n); });
      });
    });
    if (medias[0]) medias[0].classList.add('is-on');
  }

  function wireAI(art) {
    var chips = [].slice.call(art.querySelectorAll('.pr-ai-chip'));
    var desc = art.querySelector('.pr-ai-desc');
    var field = art.querySelector('.pr-ai-field');
    function set(n) {
      var st = AI_STATES[n];
      chips.forEach(function (c) { c.classList.toggle('is-on', +c.getAttribute('data-ai') === n); });
      desc.innerHTML = '<span class="en">' + st.en + '</span><span class="zh">' + st.zh + '</span>';
      if (field) field.setAttribute('data-ai', st.cls);
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { set(+c.getAttribute('data-ai')); }); });
    set(0);
  }

  function wireVideo(art) {
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { if (id) localStorage.setItem('pr-yt-main', id); else localStorage.setItem('pr-yt-main', ''); } catch (e) {}
      var media = art.querySelector('[data-scene="main"] .pr-scene-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('[data-scene="main"] .pr-scene-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('pr-yt-main'); if (cur == null) cur = DEFAULT_YT; } catch (e) { cur = DEFAULT_YT; }
      var wrap = document.createElement('div');
      wrap.className = 'pr-yt pr-editor';
      wrap.innerHTML =
        '<label class="pr-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="pr-editor-in" type="text" value="' + String(cur).replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="pr-editor-btns"><button type="button" class="pr-editor-save">Save</button>' +
        '<button type="button" class="pr-editor-clear">Clear</button>' +
        '<button type="button" class="pr-editor-cancel">Cancel</button></div>';
      media.innerHTML = ''; media.appendChild(wrap);
      var input = wrap.querySelector('.pr-editor-in'); input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(input.value); else if (e.key === 'Escape') commit(cur); });
      wrap.querySelector('.pr-editor-save').addEventListener('click', function () { commit(input.value); });
      wrap.querySelector('.pr-editor-cancel').addEventListener('click', function () { commit(cur); });
      wrap.querySelector('.pr-editor-clear').addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.pr-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'pr-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Primal Hunting gameplay';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });
  }

  function renderPrimal(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;

    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pr-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.pr-sec, .pr-twin-card, .pr-couple-card, .pr-couple-out, .pr-need, .pr-why-card, .pr-feat-card, .pr-adapt-card, .pr-persona, .pr-pstat').forEach(function (n) { n.classList.add('pr-rev'); io.observe(n); });

      // hero parallax on scroll within the works scroller
      var scroller = art.closest('.works-case') ? art.closest('.works-case').parentNode : null;
      var bg = art.querySelector('.pr-hero-bg');
      var sc = art.closest('[class*="works"]');
      var scontainer = document.getElementById('works');
      if (bg && scontainer) {
        scontainer.addEventListener('scroll', function () {
          var y = scontainer.scrollTop;
          if (y < 700) bg.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.05)';
        }, { passive: true });
      }
    });

    wireVideo(art);
    wireScenario(art);
    wireAI(art);
    wireEMG(art);
    return art;
  }

  window.renderPrimal = renderPrimal;

  /* ----------------------------- styles ----------------------------- */
  var PR_CSS = [
'.pr-page{--pr-ink:#E8F1EC;--pr-dim:#8FAA9C;--pr-bg:#0A1310;--pr-panel:#11201A;--pr-panel2:#0E1A15;',
'  --pr-line:rgba(232,241,236,.12);--pr-mint:#16E4A8;--pr-mint-d:#0FB686;--pr-rust:#FF6B5A;--pr-pink:#E89BB0;',
'  background:var(--pr-bg);color:var(--pr-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .pr-page{font-family:var(--cjk)}',
'.pr-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* hero */
'.pr-hero{position:relative;min-height:84vh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}',
'.pr-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:brightness(.62) contrast(1.04);z-index:-3;transform:scale(1.05);will-change:transform}',
'.pr-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(10,19,16,.35) 0%,rgba(10,19,16,.2) 38%,rgba(10,19,16,.96) 100%)}',
'.pr-scan{position:absolute;inset:0;z-index:-1;pointer-events:none;mix-blend-mode:screen;opacity:.5;',
'  background:linear-gradient(180deg,transparent 0%,rgba(22,228,168,.10) 48%,rgba(22,228,168,.18) 50%,transparent 52%);background-size:100% 220px;animation:prScan 5.5s linear infinite}',
'@keyframes prScan{0%{background-position:0 -240px}100%{background-position:0 120vh}}',
'.pr-grain{position:absolute;inset:0;z-index:-1;opacity:.4;mix-blend-mode:overlay;pointer-events:none;',
'  background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:3px 3px}',
'@media (prefers-reduced-motion:reduce){.pr-scan{animation:none}}',
'.pr-hero-inner{position:relative;padding:clamp(24px,4vw,62px);padding-bottom:clamp(40px,6vw,80px);max-width:1120px}',
'.pr-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--pr-mint);margin-bottom:clamp(14px,2vw,22px)}',
'.lang-zh .pr-eyebrow{font-family:var(--cjk);letter-spacing:.14em}',
'.pr-title{font-family:var(--display);font-weight:800;font-size:clamp(54px,11vw,168px);line-height:.9;letter-spacing:-.02em;',
'  background:linear-gradient(96deg,#fff 0%,var(--pr-mint) 70%,var(--pr-mint-d) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.pr-sub{font-family:var(--serif);font-style:italic;font-size:clamp(20px,3vw,40px);color:#fff;margin-top:clamp(6px,1vw,12px)}',
'.lang-zh .pr-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.pr-tagline{max-width:58ch;font-size:clamp(15px,1.55vw,20px);color:var(--pr-ink);margin-top:clamp(16px,2.2vw,26px);text-wrap:pretty}',
'.pr-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:clamp(18px,2.4vw,26px)}',
'.pr-tool{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--pr-ink);',
'  border:1px solid var(--pr-line);padding:7px 12px;border-radius:999px;transition:border-color .2s,color .2s,background .2s}',
'.lang-zh .pr-tool{font-family:var(--mono)}',
'.pr-tool:hover{border-color:var(--pr-mint);color:var(--pr-mint)}',
'.pr-meta{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,54px);margin-top:clamp(22px,3vw,30px);padding-top:clamp(18px,2.4vw,24px);border-top:1px solid var(--pr-line)}',
'.pr-meta span{display:flex;flex-direction:column;gap:3px}',
'.pr-meta b{font-size:clamp(14px,1.4vw,17px);font-weight:600;color:#fff}',
'.pr-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-meta i{font-family:var(--cjk);letter-spacing:.08em}',
'.pr-scroll{position:absolute;right:clamp(20px,4vw,54px);bottom:clamp(26px,4vw,46px);display:flex;flex-direction:column;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--pr-dim)}',
'.pr-scroll i{width:1px;height:40px;background:linear-gradient(var(--pr-mint),transparent);animation:prDrip 1.8s ease-in-out infinite}',
'@keyframes prDrip{0%,100%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.pr-scroll i{animation:none}}',

/* feature video */
'.pr-feature{padding:0;border-top:1px solid var(--pr-line);background:#000}',
'.pr-scene-media{position:relative}',
'.pr-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:84vh;border:0;display:block}',
'.pr-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;',
'  display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.pr-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,19,16,.12),rgba(10,19,16,.5))}',
'.pr-facade:hover{filter:brightness(1.07)}',
'.pr-play{position:relative;z-index:1;width:clamp(60px,7vw,80px);height:clamp(60px,7vw,80px);border-radius:50%;',
'  background:rgba(10,19,16,.5);border:2px solid rgba(232,241,236,.85);backdrop-filter:blur(2px);transition:transform .2s,background .2s,border-color .2s}',
'.pr-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);',
'  border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent #E8F1EC}',
'.pr-facade:hover .pr-play{transform:scale(1.08);background:var(--pr-mint-d);border-color:var(--pr-mint)}',
'.pr-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(232,241,236,.4);',
'  background:rgba(10,19,16,.6);color:#E8F1EC;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s,background .2s}',
'.pr-facade:hover .pr-edit{opacity:1}.pr-edit:hover{background:var(--pr-mint-d)}',
'.pr-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#0d1713;',
'  border:1px dashed rgba(232,241,236,.22);color:var(--pr-dim);font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:border-color .2s,color .2s}',
'.pr-empty-k{font-size:clamp(30px,4vw,48px);color:rgba(232,241,236,.2)}',
'.pr-empty:hover{border-color:rgba(22,228,168,.55);color:var(--pr-mint)}',
'.pr-editor{display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:12px;padding:clamp(20px,3vw,40px);background:#0b1410;border:1px solid rgba(22,228,168,.4);aspect-ratio:16/9;max-height:84vh}',
'.pr-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-editor-l{font-family:var(--cjk)}',
'.pr-editor-in{width:min(560px,100%);box-sizing:border-box;background:#14211b;border:1px solid var(--pr-line);color:#E8F1EC;font-family:var(--mono);font-size:14px;padding:12px;border-radius:4px;outline:none}',
'.pr-editor-in:focus{border-color:var(--pr-mint)}',
'.pr-editor-btns{display:flex;flex-wrap:wrap;gap:8px}',
'.pr-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:4px;border:1px solid var(--pr-line);background:transparent;color:var(--pr-ink);transition:background .2s,color .2s,border-color .2s}',
'.pr-editor-save{background:var(--pr-mint)!important;color:#062018!important;border-color:var(--pr-mint)!important}',
'.pr-editor-clear:hover,.pr-editor-cancel:hover{border-color:var(--pr-rust);color:var(--pr-rust)}',

/* section frame */
'.pr-sec{padding:clamp(54px,8vw,120px) clamp(24px,5vw,88px);max-width:1300px;margin:0 auto;border-top:1px solid var(--pr-line)}',
'.pr-mark{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,4vw,46px)}',
'.pr-num{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--pr-mint);letter-spacing:.1em}',
'.pr-kicker{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-kicker{font-family:var(--cjk);letter-spacing:.12em}',
'.pr-h2{font-family:var(--display);font-weight:800;font-size:clamp(32px,5vw,68px);line-height:1.04;letter-spacing:-.015em;color:#fff}',
'.lang-zh .pr-h2{font-weight:900}',
'.pr-h2-wide{max-width:22ch;margin-bottom:clamp(28px,4vw,46px)}',
'.pr-h3{font-family:var(--display);font-weight:700;font-size:clamp(24px,3vw,40px);color:#fff;line-height:1.1}',
'.lang-zh .pr-h3{font-weight:900}',
'.pr-lead{font-family:var(--serif);font-size:clamp(17px,1.8vw,23px);line-height:1.6;color:#fff;max-width:60ch;margin-bottom:clamp(30px,4.5vw,52px);text-wrap:pretty}',
'.lang-zh .pr-lead{font-family:var(--cjk);line-height:1.85}',

/* split */
'.pr-split{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);gap:clamp(28px,5vw,70px);align-items:start}',
'.pr-body p{font-family:var(--serif);font-size:clamp(16px,1.5vw,20px);line-height:1.72;color:var(--pr-ink);margin-bottom:1.1em;text-wrap:pretty}',
'.lang-zh .pr-body p{font-family:var(--cjk);line-height:1.95}',

/* twin cards */
'.pr-twin{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.4vw,30px);margin-top:clamp(40px,6vw,72px)}',
'.pr-twin-card{background:var(--pr-panel);border:1px solid var(--pr-line);border-top:3px solid var(--pr-mint);padding:clamp(22px,2.6vw,34px);position:relative}',
'.pr-twin-card.pr-twin-care{border-top-color:var(--pr-pink)}',
'.pr-twin-k{position:absolute;right:clamp(18px,2.4vw,28px);top:clamp(14px,2vw,22px);font-family:var(--mono);font-size:clamp(20px,2.6vw,34px);color:var(--pr-line)}',
'.pr-twin-card h4{font-family:var(--display);font-weight:700;font-size:clamp(18px,2vw,25px);color:#fff;margin:0 0 12px}',
'.lang-zh .pr-twin-card h4{font-weight:900}',
'.pr-twin-card p{font-size:clamp(14px,1.35vw,17px);color:var(--pr-ink);line-height:1.62;text-wrap:pretty}',

/* coupling */
'.pr-couple{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto auto;align-items:stretch;gap:clamp(10px,1.4vw,18px);margin-bottom:clamp(40px,6vw,68px)}',
'.pr-couple-card{background:var(--pr-panel2);border:1px solid var(--pr-line);padding:clamp(16px,1.9vw,24px);position:relative}',
'.pr-couple-k{font-family:var(--mono);font-size:13px;color:var(--pr-mint);letter-spacing:.1em}',
'.pr-couple-card h4{font-family:var(--display);font-weight:700;font-size:clamp(15px,1.5vw,20px);color:#fff;margin:8px 0 10px}',
'.lang-zh .pr-couple-card h4{font-weight:900}',
'.pr-couple-card p{font-size:clamp(12.5px,1.15vw,15px);color:var(--pr-dim);line-height:1.55;text-wrap:pretty}',
'.pr-couple-arrow{align-self:center;width:clamp(16px,2vw,30px);height:2px;background:var(--pr-line);position:relative}',
'.pr-couple-arrow::after{content:"";position:absolute;right:-2px;top:50%;transform:translateY(-50%);border:5px solid transparent;border-left-color:var(--pr-mint)}',
'.pr-couple-eq{align-self:center;font-family:var(--display);font-weight:800;font-size:clamp(22px,3vw,40px);color:var(--pr-mint);padding:0 4px}',
'.pr-couple-out{align-self:stretch;display:flex;align-items:center;justify-content:center;text-align:center;padding:clamp(16px,2vw,24px);',
'  background:linear-gradient(135deg,var(--pr-mint-d),var(--pr-mint));color:#06201A;font-family:var(--display);font-weight:800;font-size:clamp(16px,1.7vw,23px);line-height:1.1;border-radius:3px}',
'.lang-zh .pr-couple-out{font-weight:900}',

/* needs */
'.pr-needs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);margin-bottom:clamp(40px,6vw,68px)}',
'.pr-need{background:var(--pr-panel);border:1px solid var(--pr-line);padding:clamp(18px,2.2vw,28px)}',
'.pr-need h5{font-family:var(--display);font-weight:700;font-size:clamp(16px,1.6vw,20px);color:var(--pr-mint);margin:0 0 14px}',
'.lang-zh .pr-need h5{font-weight:900}',
'.pr-need ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}',
'.pr-need li{position:relative;padding-left:18px;font-size:clamp(13.5px,1.3vw,16px);color:var(--pr-ink);line-height:1.5}',
'.pr-need li::before{content:"";position:absolute;left:0;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--pr-mint)}',

/* personas */
'.pr-personas{display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:clamp(16px,2.4vw,30px);align-items:start}',
'.pr-persona{margin:0;background:var(--pr-panel);border:1px solid var(--pr-line);overflow:hidden}',
'.pr-persona figcaption{padding:clamp(16px,1.9vw,22px)}',
'.pr-persona figcaption b{display:block;font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);letter-spacing:.08em;color:#fff;margin-bottom:8px}',
'.pr-persona figcaption p{font-family:var(--serif);font-style:italic;font-size:clamp(14px,1.4vw,18px);color:var(--pr-ink);line-height:1.5;text-wrap:pretty}',
'.lang-zh .pr-persona figcaption p{font-family:var(--cjk);font-style:normal}',
'.pr-persona-stats{display:flex;flex-direction:column;gap:clamp(12px,1.6vw,18px)}',
'.pr-pstat{background:var(--pr-panel2);border:1px solid var(--pr-line);border-left:3px solid var(--pr-mint);padding:clamp(14px,1.8vw,22px);display:flex;align-items:baseline;gap:16px}',
'.pr-pstat b{font-family:var(--display);font-weight:800;font-size:clamp(28px,3.4vw,46px);color:var(--pr-mint);line-height:1;flex:none}',
'.pr-pstat b i{font-style:normal;font-size:.5em}',
'.pr-pstat p{font-size:clamp(13px,1.25vw,15.5px);color:var(--pr-ink);line-height:1.5;text-wrap:pretty}',

/* slot */
'.pr-slot{position:relative;width:100%;overflow:hidden;background:repeating-linear-gradient(135deg,#10201a 0 11px,#0d1a15 11px 22px);border:1px solid var(--pr-line)}',
'.pr-slot image-slot{display:block;width:100%;height:100%}',

/* why */
'.pr-why{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,2vw,24px)}',
'.pr-why-card{background:var(--pr-panel);border:1px solid var(--pr-line);padding:clamp(20px,2.4vw,30px);transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s}',
'.pr-why-card:hover{transform:translateY(-4px);border-color:rgba(22,228,168,.5)}',
'.pr-dot{display:block;width:12px;height:12px;border-radius:50%;background:var(--pr-mint);box-shadow:0 0 0 5px rgba(22,228,168,.15);margin-bottom:18px}',
'.pr-why-card h4{font-family:var(--display);font-weight:700;font-size:clamp(17px,1.7vw,22px);color:#fff;margin:0 0 12px}',
'.lang-zh .pr-why-card h4{font-weight:900}',
'.pr-why-card p{font-size:clamp(13.5px,1.3vw,16px);color:var(--pr-ink);line-height:1.6;text-wrap:pretty}',

/* scenario tabs */
'.pr-scenario{border:1px solid var(--pr-line);background:var(--pr-panel2)}',
'.pr-scn-tabs{display:flex;gap:0;border-bottom:1px solid var(--pr-line)}',
'.pr-scn-tab{flex:1;background:transparent;border:0;border-right:1px solid var(--pr-line);padding:clamp(15px,1.8vw,22px);cursor:pointer;',
'  font-family:var(--mono);font-size:clamp(12px,1.2vw,15px);letter-spacing:.14em;text-transform:uppercase;color:var(--pr-dim);transition:color .2s,background .2s}',
'.lang-zh .pr-scn-tab{font-family:var(--cjk);letter-spacing:.06em}',
'.pr-scn-tab:last-child{border-right:0}',
'.pr-scn-tab.is-on{color:#06201A;background:var(--pr-mint)}',
'.pr-scn-tab:not(.is-on):hover{color:var(--pr-mint)}',
'.pr-scn-body{display:grid;grid-template-columns:1.5fr 1fr;gap:0}',
'.pr-scn-media{position:relative;min-height:0}',
'.pr-scn-media .pr-slot{position:absolute;inset:0;border:0;opacity:0;transition:opacity .5s;pointer-events:none}',
'.pr-scn-media .pr-slot.is-on{opacity:1;position:relative;pointer-events:auto}',
'.pr-scn-text{padding:clamp(22px,3vw,40px);display:flex;align-items:center;border-left:1px solid var(--pr-line)}',
'.pr-scn-pane{display:none}.pr-scn-pane.is-on{display:block}',
'.pr-scn-pane p{font-family:var(--serif);font-size:clamp(15px,1.5vw,20px);line-height:1.65;color:var(--pr-ink);text-wrap:pretty}',
'.lang-zh .pr-scn-pane p{font-family:var(--cjk);line-height:1.9}',

/* EMG interactive */
'.pr-sec-emg{background:radial-gradient(120% 90% at 80% 0%,rgba(22,228,168,.06),transparent 60%)}',
'.pr-emg{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(18px,2.4vw,30px);margin-bottom:clamp(28px,4vw,44px)}',
'.pr-emg-scope{position:relative;background:#06100C;border:1px solid var(--pr-line);border-radius:4px;overflow:hidden;min-height:240px}',
'.pr-emg-canvas{display:block;width:100%;height:100%}',
'.pr-emg-state{position:absolute;left:16px;top:16px}',
'.pr-emg-badge{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;padding:7px 13px;border-radius:999px;border:1px solid var(--pr-line);color:var(--pr-dim);background:rgba(6,16,12,.7)}',
'.lang-zh .pr-emg-badge{font-family:var(--cjk);letter-spacing:.06em}',
'.pr-emg-badge[data-state="draw"]{color:#06201A;background:var(--pr-mint);border-color:var(--pr-mint)}',
'.pr-emg-badge[data-state="fire"]{color:#fff;background:var(--pr-rust);border-color:var(--pr-rust)}',
'.pr-emg-readout{position:absolute;right:16px;bottom:14px;display:flex;align-items:baseline;gap:4px;font-family:var(--mono);color:var(--pr-mint)}',
'.pr-emg-val{font-size:clamp(26px,3.2vw,40px);font-weight:700;line-height:1}',
'.pr-emg-readout i{font-style:normal;font-size:13px;color:var(--pr-dim)}',
'.pr-emg-ctrl{background:var(--pr-panel);border:1px solid var(--pr-line);border-radius:4px;padding:clamp(20px,2.6vw,32px);display:flex;flex-direction:column;gap:16px}',
'.pr-emg-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-emg-label{font-family:var(--cjk)}',
'.pr-emg-slider{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,var(--pr-mint),var(--pr-rust));outline:none;cursor:pointer}',
'.pr-emg-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:26px;height:26px;border-radius:50%;background:#fff;border:3px solid var(--pr-mint);cursor:grab;box-shadow:0 4px 14px rgba(0,0,0,.4)}',
'.pr-emg-slider::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#fff;border:3px solid var(--pr-mint);cursor:grab}',
'.pr-emg-keys{display:flex;gap:10px}',
'.pr-key{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:var(--mono);font-size:clamp(13px,1.4vw,16px);font-weight:700;color:var(--pr-dim);',
'  border:1.5px solid var(--pr-line);border-radius:6px;padding:12px 8px;transition:all .12s}',
'.pr-key i{font-style:normal;font-size:10px;font-weight:400;letter-spacing:.1em;text-transform:uppercase}',
'.lang-zh .pr-key i{font-family:var(--cjk)}',
'.pr-key.is-down{color:#06201A;background:var(--pr-mint);border-color:var(--pr-mint);transform:translateY(2px)}',
'.pr-key[data-key="space"].is-down{background:var(--pr-rust);border-color:var(--pr-rust);color:#fff}',
'.pr-emg-power{display:flex;flex-direction:column;gap:8px}',
'.pr-emg-power-label{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-emg-power-label{font-family:var(--cjk)}',
'.pr-emg-bar{height:10px;border-radius:999px;background:#0d1a15;border:1px solid var(--pr-line);overflow:hidden}',
'.pr-emg-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--pr-mint-d),var(--pr-mint));transition:width .1s linear}',
'.pr-emg-hint{font-size:clamp(12.5px,1.2vw,14px);color:var(--pr-dim);line-height:1.5;text-wrap:pretty}',

/* hardware chain */
'.pr-chain{display:flex;flex-wrap:wrap;align-items:center;gap:clamp(8px,1.2vw,14px);margin-bottom:clamp(28px,4vw,44px);',
'  padding:clamp(16px,2vw,24px);background:var(--pr-panel2);border:1px solid var(--pr-line);border-radius:4px}',
'.pr-chain-step{font-family:var(--mono);font-size:clamp(12px,1.3vw,15px);letter-spacing:.08em;color:var(--pr-ink);border:1px solid var(--pr-line);padding:9px 15px;border-radius:6px}',
'.pr-chain-end{color:#06201A;background:var(--pr-mint);border-color:var(--pr-mint);font-weight:700}',
'.pr-chain-arr{color:var(--pr-mint);font-size:16px}',

/* adaptation */
'.pr-adapt{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.8vw,22px)}',
'.pr-adapt-card{background:var(--pr-panel);border:1px solid var(--pr-line);padding:clamp(16px,2vw,24px)}',
'.pr-adapt-card h5{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--pr-mint);margin:0 0 12px}',
'.lang-zh .pr-adapt-card h5{font-family:var(--cjk)}',
'.pr-adapt-card p{font-size:clamp(13px,1.25vw,15px);color:var(--pr-ink);line-height:1.55;text-wrap:pretty}',
'.pr-adapt-card b{font-family:var(--display);font-weight:800;font-size:clamp(18px,2vw,26px);color:#fff;display:inline-block;margin-bottom:2px}',
'.pr-adapt-access{border-left:3px solid var(--pr-pink)}',

/* AI interactive */
'.pr-ai{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(16px,2.4vw,30px);margin-top:clamp(30px,4vw,48px)}',
'.pr-ai-stage{background:#06100C;border:1px solid var(--pr-line);border-radius:4px;overflow:hidden;min-height:280px;position:relative}',
'.pr-ai-field{position:absolute;inset:0;background-image:linear-gradient(rgba(22,228,168,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(22,228,168,.08) 1px,transparent 1px);background-size:34px 34px}',
'.pr-ai-player{position:absolute;left:18%;top:62%;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.12)}',
'.pr-ai-player::after{content:"";position:absolute;left:50%;top:50%;width:42px;height:42px;border:1.5px solid rgba(255,255,255,.3);border-radius:50%;transform:translate(-50%,-50%)}',
'.pr-ai-prey{position:absolute;width:22px;height:22px;border-radius:50%;background:var(--pr-mint);box-shadow:0 0 18px var(--pr-mint);transition:all 1.1s cubic-bezier(.5,0,.3,1)}',
'.pr-ai-field[data-ai="wander"] .pr-ai-prey{left:62%;top:38%;animation:prWander 6s ease-in-out infinite}',
'.pr-ai-field[data-ai="flee"] .pr-ai-prey{left:84%;top:14%;background:var(--pr-rust);box-shadow:0 0 18px var(--pr-rust)}',
'.pr-ai-field[data-ai="hide"] .pr-ai-prey{left:74%;top:78%;opacity:.28;background:var(--pr-dim);box-shadow:none}',
'.pr-ai-field[data-ai="fight"] .pr-ai-prey{left:30%;top:54%;background:var(--pr-rust);box-shadow:0 0 24px var(--pr-rust);animation:prPulse 1.1s ease-in-out infinite}',
'@keyframes prWander{0%,100%{transform:translate(0,0)}25%{transform:translate(40px,18px)}50%{transform:translate(10px,40px)}75%{transform:translate(-26px,12px)}}',
'@keyframes prPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}',
'@media (prefers-reduced-motion:reduce){.pr-ai-prey{animation:none!important}}',
'.pr-ai-panel{background:var(--pr-panel);border:1px solid var(--pr-line);border-radius:4px;padding:clamp(20px,2.6vw,32px);display:flex;flex-direction:column;gap:16px}',
'.pr-ai-kicker{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-ai-kicker{font-family:var(--cjk);letter-spacing:.06em}',
'.pr-ai-chips{display:flex;flex-wrap:wrap;gap:8px}',
'.pr-ai-chip{font-family:var(--mono);font-size:clamp(12px,1.3vw,15px);letter-spacing:.06em;cursor:pointer;padding:9px 16px;border-radius:999px;border:1.5px solid var(--pr-line);background:transparent;color:var(--pr-ink);transition:all .18s}',
'.lang-zh .pr-ai-chip{font-family:var(--cjk)}',
'.pr-ai-chip:hover{border-color:var(--pr-mint);color:var(--pr-mint)}',
'.pr-ai-chip.is-on{color:#06201A;background:var(--pr-mint);border-color:var(--pr-mint)}',
'.pr-ai-desc{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.6;color:#fff;text-wrap:pretty;min-height:4.5em}',
'.lang-zh .pr-ai-desc{font-family:var(--cjk);line-height:1.85}',

/* features */
'.pr-feat{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,2vw,24px)}',
'.pr-feat-card{background:var(--pr-panel);border:1px solid var(--pr-line);padding:clamp(20px,2.4vw,30px);position:relative;transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s}',
'.pr-feat-card:hover{transform:translateY(-4px);border-color:rgba(22,228,168,.5)}',
'.pr-feat-n{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--pr-mint);letter-spacing:.1em}',
'.pr-feat-card h4{font-family:var(--display);font-weight:700;font-size:clamp(17px,1.7vw,22px);color:#fff;margin:12px 0 12px}',
'.lang-zh .pr-feat-card h4{font-weight:900}',
'.pr-feat-card p{font-size:clamp(13.5px,1.3vw,16px);color:var(--pr-ink);line-height:1.6;text-wrap:pretty}',

/* render show */
'.pr-wide{margin:0 0 clamp(24px,3.4vw,40px)}',
'.pr-wide img{aspect-ratio:16/9;border:1px solid var(--pr-line)}',
'.pr-wide figcaption{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--pr-dim);margin-top:14px;line-height:1.6;max-width:84ch}',
'.lang-zh .pr-wide figcaption{font-family:var(--cjk)}',
'.pr-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.8vw,22px);margin-bottom:clamp(40px,6vw,68px)}',
'.pr-reflect{border-left:3px solid var(--pr-mint);padding:clamp(8px,1.4vw,16px) clamp(20px,2.6vw,34px)}',
'.pr-reflect-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--pr-mint)}',
'.lang-zh .pr-reflect-label{font-family:var(--cjk)}',
'.pr-reflect p{font-family:var(--serif);font-size:clamp(16px,1.6vw,22px);line-height:1.6;color:#fff;margin-top:12px;max-width:66ch;text-wrap:pretty}',
'.lang-zh .pr-reflect p{font-family:var(--cjk);line-height:1.85}',

/* footer */
'.pr-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;',
'  padding:clamp(40px,6vw,80px) clamp(24px,5vw,88px);border-top:1px solid var(--pr-line);max-width:1300px;margin:0 auto}',
'.pr-foot-line{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;color:var(--pr-dim)}',
'.lang-zh .pr-foot-line{font-family:var(--cjk);letter-spacing:.08em}',
'.pr-pdf{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;',
'  color:#fff;text-decoration:none;padding:13px 24px;border:1.5px solid var(--pr-mint);transition:background .2s,color .2s,transform .2s}',
'.lang-zh .pr-pdf{font-family:var(--cjk)}',
'.pr-pdf:hover{background:var(--pr-mint);color:#06201A;transform:translateY(-2px)}',
'.pr-pdf i{font-style:normal;font-size:15px}',
'.pr-pdf-hero{margin-top:clamp(22px,3vw,30px)}',

/* reveal */
'.pr-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.pr-rev.pr-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.pr-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:900px){',
'  .pr-split{grid-template-columns:1fr}',
'  .pr-twin{grid-template-columns:1fr}',
'  .pr-couple{grid-template-columns:1fr;gap:12px}',
'  .pr-couple-arrow{display:none}.pr-couple-eq{display:none}',
'  .pr-needs{grid-template-columns:1fr}',
'  .pr-personas{grid-template-columns:1fr}',
'  .pr-why{grid-template-columns:1fr 1fr}',
'  .pr-scn-body{grid-template-columns:1fr}.pr-scn-text{border-left:0;border-top:1px solid var(--pr-line)}',
'  .pr-emg{grid-template-columns:1fr}',
'  .pr-adapt{grid-template-columns:1fr 1fr}',
'  .pr-ai{grid-template-columns:1fr}',
'  .pr-feat{grid-template-columns:1fr 1fr}',
'  .pr-gallery{grid-template-columns:1fr 1fr}',
'}'
  ].join('\n');

})();
