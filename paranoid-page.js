/* ============================================================================
   paranoid-page.js — bespoke case study for PARANOID'S DREAM, a VR experience
   on mental health & digital identity (Yunbo's first VR project, UE5).
   Exposes window.renderParanoid(item), called by works-render.js instead of
   the generic buildCase for id==='paranoid'. Dark psychological theme; the
   real in-engine screenshots carry it; colour shifts blue (calm) -> red
   (paranoia). Bilingual via .en/.zh spans.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/paranoid/';
  var DEFAULT_YT = 'V4AQTauLcyg'; // the playthrough

  function injectCSS() {
    if (document.getElementById('pd-css')) return;
    var s = document.createElement('style');
    s.id = 'pd-css';
    s.textContent = PD_CSS;
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
    try { var v = localStorage.getItem('pd-yt-main'); if (v != null) return ytId(v); } catch (e) {}
    return DEFAULT_YT;
  }
  function facadeHTML(id) {
    return '<button class="pd-yt pd-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play the Paranoid\u2019s Dream walkthrough">' +
      '<span class="pd-play" aria-hidden="true"></span>' +
      '<button class="pd-edit" type="button" data-edit="main" title="Change link" aria-label="Change link">&#9998;</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="pd-yt pd-empty" type="button" data-add="main">' +
      '<span class="pd-empty-k">&#9654;</span>' +
      '<span class="pd-empty-l"><span class="en">Add walkthrough link</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u89c6\u9891\u94fe\u63a5</span></span></button>';
  }
  function videoBlock() {
    var id = storedYT();
    return '<div class="pd-film-media">' + (id ? facadeHTML(id) : emptyHTML()) + '</div>';
  }

  function html() {
    return '' +
    '<article class="pd-page" id="case-games-paranoid" data-screen-label="Paranoid\u2019s Dream">' +

      /* ---------------- HERO ---------------- */
      '<header class="pd-hero">' +
        '<img class="pd-hero-bg" src="' + A + 'pink-room.jpg" alt="Paranoid\u2019s Dream — a saturated pink dream-room" />' +
        '<div class="pd-hero-veil"></div>' +
        '<div class="pd-scan" aria-hidden="true"></div>' +
        '<div class="pd-hero-inner">' +
          '<div class="pd-eyebrow"><span class="en">VR \u00b7 mental health &amp; digital identity \u00b7 2023</span><span class="zh">VR \u00b7 \u5fc3\u7406\u5065\u5eb7\u4e0e\u6570\u5b57\u8eab\u4efd \u00b7 2023</span></div>' +
          '<h1 class="pd-title">Paranoid\u2019s<br/>Dream</h1>' +
          '<div class="pd-sub"><span class="en">a room you can\u2019t wake from</span><span class="zh">\u9192\u4e0d\u8fc7\u6765\u7684\u623f\u95f4</span></div>' +
          '<p class="pd-tagline"><span class="en">A VR experience that stages a mental breakdown as an endless loop \u2014 no jump scares, just the dawning feeling that your own mind has trapped you.</span><span class="zh">\u4e00\u6b3e\u628a\u7cbe\u795e\u5d29\u6e83\u6f14\u7ece\u6210\u65e0\u9650\u5faa\u73af\u7684 VR \u4f53\u9a8c\u2014\u2014\u6ca1\u6709 jump scare\uff0c\u53ea\u6709\u201c\u81ea\u5df1\u7684\u5927\u8111\u628a\u4f60\u56f0\u4f4f\u4e86\u201d\u7684\u9010\u6e10\u9038\u8fd1\u3002</span></p>' +
          '<div class="pd-tools">' +
            '<span class="pd-tool">Unreal Engine 5</span><span class="pd-tool">Nanite \u00b7 Level Streaming</span>' +
            '<span class="pd-tool">Maya</span><span class="pd-tool">Substance 3D Painter</span>' +
          '</div>' +
          '<div class="pd-meta">' +
            '<span><b class="en">My first VR project</b><b class="zh">\u7b2c\u4e00\u4e2a VR \u9879\u76ee</b><i class="en">Milestone</i><i class="zh">\u91cc\u7a0b\u7891</i></span>' +
            '<span><b class="en">Feb \u2013 Jun 2023</b><b class="zh">2023.02 \u2013 06</b><i class="en">Timeline</i><i class="zh">\u65f6\u95f4</i></span>' +
            '<span><b class="en">Environment \u00b7 Level \u00b7 Blueprints</b><b class="zh">\u73af\u5883 \u00b7 \u5173\u5361 \u00b7 \u84dd\u56fe</b><i class="en">Role</i><i class="zh">\u89d2\u8272</i></span>' +
          '</div>' +
        '</div>' +
        '<div class="pd-scroll"><span class="en">scroll</span><span class="zh">\u5411\u4e0b</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO ---------------- */
      '<section class="pd-feature" data-scene="main">' + videoBlock() + '</section>' +

      /* ---------------- 01 THE DREAM ---------------- */
      '<section class="pd-sec">' +
        '<div class="pd-mark"><span class="pd-num">01</span><span class="pd-kicker en">The premise</span><span class="pd-kicker zh">\u524d\u63d0</span></div>' +
        '<div class="pd-split">' +
          '<h2 class="pd-h2"><span class="en">The dream<br/>that loops</span><span class="zh">\u5faa\u73af\u7684<br/>\u68a6</span></h2>' +
          '<div class="pd-body">' +
            '<p><span class="en">You wake inside a soft, candy-coloured room \u2014 a child\u2019s bedroom, almost comforting. Then you notice the small wrongnesses. A door promises a way out; you walk through it and arrive back in the same room, subtly altered. There is no monster chasing you. The horror is structural: the space itself is the breakdown.</span><span class="zh">\u4f60\u5728\u4e00\u95f4\u67d4\u8f6f\u3001\u7cd6\u679c\u8272\u7684\u623f\u95f4\u91cc\u9192\u6765\u2014\u2014\u4e00\u95f4\u51e0\u4e4e\u4ee4\u4eba\u5b89\u5fc3\u7684\u513f\u7ae5\u5367\u5ba4\u3002\u968f\u540e\u4f60\u6ce8\u610f\u5230\u90a3\u4e9b\u7ec6\u5fae\u7684\u4e0d\u5bf9\u52b2\u3002\u4e00\u6247\u95e8\u5141\u8bfa\u7740\u51fa\u53e3\uff1b\u4f60\u7a7f\u8fc7\u53bb\uff0c\u5374\u53c8\u56de\u5230\u540c\u4e00\u95f4\u623f\u95f4\u2014\u2014\u53ea\u662f\u88ab\u6094\u6539\u4e86\u3002\u6ca1\u6709\u602a\u7269\u8ffd\u9010\u4f60\u3002\u6050\u60e7\u662f\u7ed3\u6784\u6027\u7684\uff1a\u7a7a\u95f4\u672c\u8eab\u5c31\u662f\u90a3\u573a\u5d29\u6e83\u3002</span></p>' +
            '<p><span class="en">As my first VR project, I built the space and its logic to turn paranoia into something you physically inhabit \u2014 a patient\u2019s mind, rendered as architecture.</span><span class="zh">\u4f5c\u4e3a\u6211\u7684\u7b2c\u4e00\u4e2a VR \u9879\u76ee\uff0c\u6211\u8d1f\u8d23\u642d\u5efa\u8fd9\u4e2a\u7a7a\u95f4\u53ca\u5176\u903b\u8f91\uff0c\u628a\u504f\u6267\u8f6c\u5316\u4e3a\u53ef\u4ee5\u4eb2\u8eab\u8fdb\u5165\u7684\u4e1c\u897f\u2014\u2014\u4e00\u4e2a\u60a3\u8005\u7684\u5fc3\u667a\uff0c\u88ab\u6e32\u67d3\u6210\u5efa\u7b51\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<figure class="pd-wide">' +
          '<img src="' + A + 'blue-room.jpg" alt="A calm blue bedroom at night — the dream before it turns" />' +
          '<figcaption><span class="en">The room at its calmest \u2014 cool blue, ordered, almost safe.</span><span class="zh">\u623f\u95f4\u6700\u5e73\u9759\u7684\u6837\u5b50\u2014\u2014\u51b7\u84dd\u3001\u6709\u5e8f\u3001\u51e0\u4e4e\u5b89\u5168\u3002</span></figcaption>' +
        '</figure>' +
      '</section>' +

      /* ---------------- 02 GAZE / IT CHANGES WHEN YOU LOOK AWAY ---------------- */
      '<section class="pd-sec pd-sec-dark">' +
        '<div class="pd-mark"><span class="pd-num">02</span><span class="pd-kicker en">Gaze-based interaction</span><span class="pd-kicker zh">\u6ce8\u89c6\u4ea4\u4e92</span></div>' +
        '<h2 class="pd-h2 pd-h2-wide"><span class="en">It only changes when you look away</span><span class="zh">\u53ea\u5728\u4f60\u79fb\u5f00\u89c6\u7ebf\u65f6\uff0c\u5b83\u624d\u6539\u53d8</span></h2>' +
        '<div class="pd-gazewrap">' +
          '<figure class="pd-gaze" tabindex="0" aria-label="Hover to look — the room stays stable; look away and it transforms">' +
            '<img class="pd-gaze-off" src="' + A + 'red-creature.jpg" alt="When unwatched, the room transforms into something monstrous" />' +
            '<img class="pd-gaze-on" src="' + A + 'pink-room.jpg" alt="While watched, the room looks ordinary" />' +
            '<span class="pd-gaze-badge pd-badge-off"><i></i><span class="en">Looked away \u00b7 transformed</span><span class="zh">\u79fb\u5f00\u89c6\u7ebf \u00b7 \u5df2\u53d8\u5f02</span></span>' +
            '<span class="pd-gaze-badge pd-badge-on"><i></i><span class="en">Watching \u00b7 stable</span><span class="zh">\u6ce8\u89c6\u4e2d \u00b7 \u7a33\u5b9a</span></span>' +
            '<span class="pd-gaze-hint"><span class="en">Hover to look \u2014 move away to lose it</span><span class="zh">\u60ac\u505c\u5373\u201c\u6ce8\u89c6\u201d\uff0c\u79fb\u5f00\u5373\u5931\u63a7</span></span>' +
          '</figure>' +
          '<div class="pd-gaze-text">' +
            '<p><span class="en">Objects transform and textures shift only when you look away. A UE5 Blueprint system keyed to the viewport checks what is inside your gaze \u2014 and quietly rewrites everything that isn\u2019t. You are left feeling watched, and never quite in control.</span><span class="zh">\u7269\u4f53\u53ea\u5728\u4f60\u79fb\u5f00\u89c6\u7ebf\u65f6\u53d8\u5f62\u3001\u6750\u8d28\u53ea\u5728\u80cc\u540e\u6539\u53d8\u3002\u4e00\u5957\u57fa\u4e8e\u89c6\u53e3\u68c0\u6d4b\u7684 UE5 \u84dd\u56fe\u7cfb\u7edf\u4f1a\u5224\u65ad\u4ec0\u4e48\u843d\u5728\u4f60\u7684\u6ce8\u89c6\u8303\u56f4\u5185\uff0c\u518d\u609a\u609a\u91cd\u5199\u90a3\u4e9b\u4e0d\u5728\u8303\u56f4\u5185\u7684\u4e1c\u897f\u3002\u4f60\u59cb\u7ec8\u89c9\u5f97\u88ab\u6ce8\u89c6\u3001\u88ab\u593a\u8d70\u63a7\u5236\u3002</span></p>' +
            '<div class="pd-gaze-row"><span class="pd-mono">viewport \u2192 line trace \u2192 in-frustum?</span></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 03 COLOUR AS NARRATOR ---------------- */
      '<section class="pd-sec">' +
        '<div class="pd-mark"><span class="pd-num">03</span><span class="pd-kicker en">Colour psychology</span><span class="pd-kicker zh">\u8272\u5f69\u5fc3\u7406</span></div>' +
        '<h2 class="pd-h2 pd-h2-wide"><span class="en">The texture is the narrator</span><span class="zh">\u6750\u8d28\uff0c\u5c31\u662f\u53d9\u4e8b\u8005</span></h2>' +
        '<p class="pd-lead"><span class="en">I authored the PBR materials in Substance Painter to start calm and blue, then bleed into violent reds and purples as the paranoia deepens. Nothing is narrated in words \u2014 the surfaces themselves carry the descent.</span><span class="zh">\u6211\u5728 Substance Painter \u4e2d\u7ed8\u5236 PBR \u6750\u8d28\uff1a\u4ece\u5e73\u9759\u7684\u84dd\u8c03\u5f00\u59cb\uff0c\u968f\u504f\u6267\u52a0\u6df1\uff0c\u9010\u6e10\u6e17\u5165\u523a\u76ee\u7684\u7ea2\u4e0e\u7d2b\u3002\u4e00\u53e5\u65c1\u767d\u4e5f\u6ca1\u6709\u2014\u2014\u8868\u9762\u672c\u8eab\u627f\u8f7d\u4e86\u8fd9\u573a\u5760\u843d\u3002</span></p>' +
        '<div class="pd-shift">' +
          '<figure class="pd-shift-card pd-shift-blue">' +
            '<img src="' + A + 'blue-room.jpg" alt="Calm blue state" />' +
            '<figcaption><span class="pd-state">Calm</span><span class="en">Cool blue \u00b7 order \u00b7 safety</span><span class="zh">\u51b7\u84dd \u00b7 \u79e9\u5e8f \u00b7 \u5b89\u5168</span></figcaption>' +
          '</figure>' +
          '<div class="pd-shift-bar" aria-hidden="true"></div>' +
          '<figure class="pd-shift-card pd-shift-red">' +
            '<img src="' + A + 'red-creature.jpg" alt="Violent red paranoid state" />' +
            '<figcaption><span class="pd-state pd-state-red">Paranoia</span><span class="en">Violent red \u00b7 threat \u00b7 collapse</span><span class="zh">\u523a\u76ee\u7ea2 \u00b7 \u5a01\u80c1 \u00b7 \u5d29\u89e3</span></figcaption>' +
          '</figure>' +
        '</div>' +
      '</section>' +

      /* ---------------- 04 THE LOOP ---------------- */
      '<section class="pd-sec pd-sec-dark">' +
        '<div class="pd-mark"><span class="pd-num">04</span><span class="pd-kicker en">Seamless looping architecture</span><span class="pd-kicker zh">\u65e0\u7f1d\u5faa\u73af\u7a7a\u95f4</span></div>' +
        '<div class="pd-split">' +
          '<h2 class="pd-h2"><span class="en">Every door<br/>leads back</span><span class="zh">\u6bcf\u4e00\u6247\u95e8<br/>\u90fd\u901a\u5411\u539f\u5730</span></h2>' +
          '<div class="pd-body">' +
            '<p><span class="en">UE5 Level Streaming teleports you back into an altered version of the same room each time you open a door to escape. The seams are hidden; the geography quietly dissolves. The more you try to leave, the more lost you become \u2014 exactly how a spiralling mind feels from the inside.</span><span class="zh">\u6bcf\u5f53\u4f60\u63a8\u95e8\u9003\u79bb\uff0cUE5 \u7684 Level Streaming \u5c31\u628a\u4f60\u4f20\u9001\u56de\u540c\u4e00\u95f4\u623f\u95f4\u7684\u53d8\u4f53\u3002\u63a5\u7f1d\u88ab\u9690\u85cf\uff0c\u5730\u7406\u609a\u7136\u6d88\u89e3\u3002\u4f60\u8d8a\u60f3\u79bb\u5f00\uff0c\u5c31\u8d8a\u8ff7\u5931\u2014\u2014\u8fd9\u6b63\u662f\u4e00\u9897\u4e0b\u65cb\u7684\u5fc3\u667a\u4ece\u5185\u90e8\u611f\u53d7\u5230\u7684\u6837\u5b50\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="pd-loop" aria-hidden="true">' +
          '<div class="pd-loop-node"><span>01</span><b><span class="en">Open a door</span><span class="zh">\u63a8\u95e8</span></b></div>' +
          '<span class="pd-loop-arr">\u27f6</span>' +
          '<div class="pd-loop-node"><span>02</span><b><span class="en">Stream the room</span><span class="zh">\u52a0\u8f7d\u623f\u95f4</span></b></div>' +
          '<span class="pd-loop-arr">\u27f6</span>' +
          '<div class="pd-loop-node"><span>03</span><b><span class="en">Altered \u00b7 again</span><span class="zh">\u518d\u4e00\u6b21\u53d8\u5f02</span></b></div>' +
          '<span class="pd-loop-arr pd-loop-back">\u21ba</span>' +
        '</div>' +
        '<figure class="pd-wide pd-wide-tv">' +
          '<img src="' + A + 'tv-watch.jpg" alt="An old TV plays ghostly silhouettes — a system error glitches across the top" />' +
          '<figcaption><span class="en">A relic TV plays back watching figures; a glitched &ldquo;lighting system error&rdquo; bleeds in \u2014 the simulation showing its seams on purpose.</span><span class="zh">\u4e00\u53f0\u8001\u5f0f\u7535\u89c6\u64ad\u653e\u7740\u51dd\u89c6\u7684\u4eba\u5f71\uff1b\u4e00\u6bb5\u201c\u5149\u7167\u7cfb\u7edf\u9519\u8bef\u201d\u7684\u6545\u969c\u6e17\u5165\u753b\u9762\u2014\u2014\u6a21\u62df\u6709\u610f\u9732\u51fa\u4e86\u5b83\u7684\u63a5\u7f1d\u3002</span></figcaption>' +
        '</figure>' +
      '</section>' +

      /* ---------------- 05 PIPELINE + REFLECTION ---------------- */
      '<section class="pd-sec">' +
        '<div class="pd-mark"><span class="pd-num">05</span><span class="pd-kicker en">Build &amp; reflection</span><span class="pd-kicker zh">\u6784\u5efa\u4e0e\u53cd\u601d</span></div>' +
        '<h2 class="pd-h2 pd-h2-wide"><span class="en">Where I learned space can hold empathy</span><span class="zh">\u6211\u5728\u8fd9\u91cc\u5b66\u4f1a\uff1a\u7a7a\u95f4\u53ef\u4ee5\u627f\u8f7d\u5171\u60c5</span></h2>' +
        '<div class="pd-chain">' +
          '<span class="pd-chain-step">Maya<i><span class="en">model</span><span class="zh">\u5efa\u6a21</span></i></span><span class="pd-chain-arr">\u2192</span>' +
          '<span class="pd-chain-step">Substance<i><span class="en">PBR \u00b7 colour</span><span class="zh">\u6750\u8d28\u00b7\u8272\u5f69</span></i></span><span class="pd-chain-arr">\u2192</span>' +
          '<span class="pd-chain-step">Nanite<i><span class="en">dense detail</span><span class="zh">\u9ad8\u5bc6\u7ec6\u8282</span></i></span><span class="pd-chain-arr">\u2192</span>' +
          '<span class="pd-chain-step">Blueprints<i><span class="en">gaze logic</span><span class="zh">\u6ce8\u89c6\u903b\u8f91</span></i></span><span class="pd-chain-arr">\u2192</span>' +
          '<span class="pd-chain-step pd-chain-end">Level Streaming<i><span class="en">the loop</span><span class="zh">\u5faa\u73af</span></i></span>' +
        '</div>' +
        '<div class="pd-reflect">' +
          '<span class="pd-reflect-label"><span class="en">Reflection</span><span class="zh">\u53cd\u601d</span></span>' +
          '<p><span class="en">My first VR project taught me that Blueprint logic and texture work aren\u2019t decoration \u2014 they\u2019re how a space builds empathy. Watching testers genuinely lose their bearings set my course toward environments that let us feel mental-health struggles from the inside.</span><span class="zh">\u7b2c\u4e00\u4e2a VR \u9879\u76ee\u8ba9\u6211\u660e\u767d\uff1a\u84dd\u56fe\u903b\u8f91\u4e0e\u6750\u8d28\u4ece\u4e0d\u662f\u88c5\u9970\uff0c\u800c\u662f\u7a7a\u95f4\u751f\u6210\u5171\u60c5\u7684\u65b9\u5f0f\u3002\u770b\u7740\u6d4b\u8bd5\u8005\u771f\u7684\u5931\u53bb\u65b9\u5411\uff0c\u6211\u786e\u5b9a\u4e86\u4e4b\u540e\u7684\u65b9\u5411\u2014\u2014\u8ba9\u4eba\u4ece\u5185\u90e8\u4f53\u4f1a\u5fc3\u7406\u56f0\u5883\u3002</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="pd-foot">' +
        '<div class="pd-foot-line"><span class="en">PARANOID\u2019S DREAM \u00b7 the mind, rendered as a room</span><span class="zh">PARANOID\u2019S DREAM \u00b7 \u88ab\u6e32\u67d3\u6210\u623f\u95f4\u7684\u5fc3\u667a</span></div>' +
      '</footer>' +

    '</article>';
  }

  function renderParanoid(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;

    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pd-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.pd-sec, .pd-wide, .pd-shift-card, .pd-loop-node, .pd-gaze').forEach(function (n) { n.classList.add('pd-rev'); io.observe(n); });
    });

    // video play + change-link
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem('pd-yt-main', id || ''); } catch (e) {}
      var media = art.querySelector('[data-scene="main"] .pd-film-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('[data-scene="main"] .pd-film-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('pd-yt-main'); if (cur == null) cur = DEFAULT_YT; } catch (e) { cur = DEFAULT_YT; }
      var box = document.createElement('div');
      box.className = 'pd-yt pd-editor';
      box.innerHTML =
        '<label class="pd-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="pd-editor-in" type="text" value="' + String(cur).replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="pd-editor-btns"><button type="button" class="pd-editor-save">Save</button>' +
        '<button type="button" class="pd-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.pd-editor-in'); input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(input.value); else if (e.key === 'Escape') commit(cur); });
      box.querySelector('.pd-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.pd-editor-cancel').addEventListener('click', function () { commit(cur); });
    }
    art.addEventListener('click', function (e) {
      var ed = e.target.closest && e.target.closest('[data-edit]');
      if (ed) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.pd-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'pd-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Paranoid\u2019s Dream walkthrough';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderParanoid = renderParanoid;

  /* ---------------------------- styles ---------------------------- */
  var PD_CSS = [
'.pd-page{--pd-ink:#ECEAF2;--pd-dim:#928D9E;--pd-bg:#0A090D;--pd-panel:#15131C;--pd-line:rgba(236,234,242,.12);',
'  --pd-blue:#5B73FF;--pd-red:#E83B43;--pd-pink:#FF73B3;',
'  background:var(--pd-bg);color:var(--pd-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .pd-page{font-family:var(--cjk)}',
'.pd-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* hero */
'.pd-hero{position:relative;min-height:84vh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}',
'.pd-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.72) saturate(1.05);z-index:-3}',
'.pd-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(10,9,13,.45) 0%,rgba(10,9,13,.2) 36%,rgba(10,9,13,.96) 100%)}',
'.pd-scan{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;mix-blend-mode:overlay;',
'  background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 3px)}',
'.pd-hero-inner{position:relative;padding:clamp(24px,4vw,60px);padding-bottom:clamp(40px,6vw,78px);max-width:1120px}',
'.pd-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.24em;text-transform:uppercase;color:var(--pd-pink);margin-bottom:clamp(14px,2vw,22px)}',
'.lang-zh .pd-eyebrow{font-family:var(--cjk);letter-spacing:.14em}',
'.pd-title{font-family:var(--display);font-weight:800;font-size:clamp(54px,12vw,180px);line-height:.9;letter-spacing:-.02em;',
'  background:linear-gradient(96deg,var(--pd-blue) 0%,#fff 42%,var(--pd-pink) 72%,var(--pd-red) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.pd-sub{font-family:var(--serif);font-style:italic;font-size:clamp(20px,3vw,42px);color:#fff;margin-top:clamp(8px,1.2vw,14px)}',
'.lang-zh .pd-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.pd-tagline{max-width:46ch;font-size:clamp(15px,1.6vw,20px);color:var(--pd-ink);margin-top:clamp(16px,2.2vw,26px);text-wrap:pretty}',
'.pd-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:clamp(18px,2.4vw,26px)}',
'.pd-tool{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--pd-ink);',
'  border:1px solid var(--pd-line);padding:6px 11px;border-radius:2px;background:rgba(236,234,242,.04)}',
'.pd-meta{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,54px);margin-top:clamp(22px,3vw,32px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--pd-line)}',
'.pd-meta span{display:flex;flex-direction:column;gap:3px}',
'.pd-meta b{font-size:clamp(14px,1.4vw,17px);font-weight:600;color:#fff}',
'.pd-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--pd-dim)}',
'.lang-zh .pd-meta i{font-family:var(--cjk);letter-spacing:.08em}',
'.pd-scroll{position:absolute;right:clamp(20px,4vw,54px);bottom:clamp(26px,4vw,46px);display:flex;flex-direction:column;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--pd-dim)}',
'.pd-scroll i{width:1px;height:40px;background:linear-gradient(var(--pd-pink),transparent);animation:pdDrip 1.8s ease-in-out infinite}',
'@keyframes pdDrip{0%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(.3);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.pd-scroll i{animation:none}}',

/* feature video */
'.pd-feature{padding:0;border-top:1px solid var(--pd-line)}',
'.pd-film-media{position:relative}',
'.pd-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:88vh;border:0;display:block}',
'.pd-facade{padding:0;cursor:pointer;background:#000 center/cover no-repeat;display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.pd-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,9,13,.12),rgba(10,9,13,.5))}',
'.pd-facade:hover{filter:brightness(1.08)}',
'.pd-play{position:relative;z-index:1;width:clamp(58px,7vw,82px);height:clamp(58px,7vw,82px);border-radius:50%;',
'  background:rgba(10,9,13,.5);border:2px solid rgba(236,234,242,.85);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.pd-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 19px;border-color:transparent transparent transparent #ECEAF2}',
'.pd-facade:hover .pd-play{transform:scale(1.08);background:var(--pd-red)}',
'.pd-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(236,234,242,.4);',
'  background:rgba(10,9,13,.6);color:#ECEAF2;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s,background .2s}',
'.pd-facade:hover .pd-edit{opacity:1}.pd-edit:hover{background:var(--pd-red)}',
'.pd-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#0a0810;',
'  border:1px dashed rgba(236,234,242,.22);color:var(--pd-dim);font-family:var(--mono);font-size:13px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}',
'.pd-empty-k{font-size:clamp(30px,4vw,46px);color:var(--pd-pink)}',
'.pd-editor{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:clamp(20px,3vw,40px);aspect-ratio:16/9;background:#0a0810;border:1px solid rgba(255,115,179,.4)}',
'.pd-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--pd-dim)}',
'.pd-editor-in{width:min(560px,100%);box-sizing:border-box;background:#15131c;border:1px solid var(--pd-line);color:#ECEAF2;font-family:var(--mono);font-size:14px;padding:11px 12px;border-radius:4px;outline:none}',
'.pd-editor-in:focus{border-color:var(--pd-pink)}',
'.pd-editor-btns{display:flex;gap:8px}',
'.pd-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:4px;border:1px solid var(--pd-line);background:transparent;color:var(--pd-ink)}',
'.pd-editor-save{background:var(--pd-pink)!important;color:#180a12!important;border-color:var(--pd-pink)!important}',

/* section frame */
'.pd-sec{padding:clamp(54px,8vw,118px) clamp(24px,5vw,86px);max-width:1280px;margin:0 auto;border-top:1px solid var(--pd-line)}',
'.pd-sec-dark{background:linear-gradient(180deg,#08070b,#0a090d)}',
'.pd-mark{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,4vw,48px)}',
'.pd-num{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--pd-red);letter-spacing:.1em}',
'.pd-kicker{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--pd-dim)}',
'.lang-zh .pd-kicker{font-family:var(--cjk);letter-spacing:.12em}',
'.pd-h2{font-family:var(--display);font-weight:800;font-size:clamp(34px,5.2vw,72px);line-height:1.04;letter-spacing:-.015em;color:#fff}',
'.lang-zh .pd-h2{font-weight:900}',
'.pd-h2-wide{max-width:22ch;margin-bottom:clamp(28px,4vw,46px)}',
'.pd-split{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);gap:clamp(28px,5vw,70px);align-items:start;margin-bottom:clamp(32px,4.5vw,56px)}',
'.pd-body p{font-family:var(--serif);font-size:clamp(16px,1.5vw,20px);line-height:1.72;color:var(--pd-ink);margin-bottom:1.1em;text-wrap:pretty}',
'.lang-zh .pd-body p{font-family:var(--cjk);line-height:1.95}',
'.pd-lead{font-family:var(--serif);font-size:clamp(17px,1.9vw,24px);line-height:1.6;color:#fff;max-width:58ch;margin-bottom:clamp(30px,4vw,52px);text-wrap:pretty}',
'.lang-zh .pd-lead{font-family:var(--cjk);line-height:1.85}',

/* wide image */
'.pd-wide{margin:0}',
'.pd-wide img{aspect-ratio:21/9;border:1px solid var(--pd-line)}',
'.pd-wide-tv{margin-top:clamp(28px,4vw,48px)}',
'.pd-wide-tv img{aspect-ratio:2/1}',
'.pd-wide figcaption{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--pd-dim);margin-top:14px;line-height:1.6;max-width:84ch}',
'.lang-zh .pd-wide figcaption{font-family:var(--cjk)}',

/* gaze interactive */
'.pd-gazewrap{display:grid;grid-template-columns:1.35fr 1fr;gap:clamp(20px,3vw,44px);align-items:center}',
'.pd-gaze{position:relative;margin:0;aspect-ratio:2/1;overflow:hidden;border:1px solid var(--pd-line);cursor:crosshair;outline:none}',
'.pd-gaze img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
'.pd-gaze-on{opacity:0;transition:opacity .55s ease}',
'.pd-gaze:hover .pd-gaze-on,.pd-gaze:focus-visible .pd-gaze-on{opacity:1}',
'.pd-gaze-off{filter:saturate(1.1) contrast(1.05)}',
'.pd-gaze-badge{position:absolute;left:14px;top:14px;z-index:2;display:inline-flex;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:7px 12px;border-radius:999px;',
'  background:rgba(10,9,13,.7);backdrop-filter:blur(6px);transition:opacity .35s}',
'.lang-zh .pd-gaze-badge{font-family:var(--cjk);letter-spacing:.04em}',
'.pd-gaze-badge i{width:8px;height:8px;border-radius:50%}',
'.pd-badge-off{color:#ffd2d4;border:1px solid rgba(232,59,67,.5)}.pd-badge-off i{background:var(--pd-red);box-shadow:0 0 10px 2px rgba(232,59,67,.6)}',
'.pd-badge-on{color:#d4dcff;border:1px solid rgba(91,115,255,.5);opacity:0}.pd-badge-on i{background:var(--pd-blue);box-shadow:0 0 10px 2px rgba(91,115,255,.6)}',
'.pd-gaze:hover .pd-badge-off,.pd-gaze:focus-visible .pd-badge-off{opacity:0}',
'.pd-gaze:hover .pd-badge-on,.pd-gaze:focus-visible .pd-badge-on{opacity:1}',
'.pd-gaze-hint{position:absolute;right:14px;bottom:12px;z-index:2;font-family:var(--mono);font-size:11px;letter-spacing:.06em;',
'  color:#fff;background:rgba(10,9,13,.6);padding:6px 11px;border-radius:999px;backdrop-filter:blur(6px)}',
'.lang-zh .pd-gaze-hint{font-family:var(--cjk)}',
'.pd-gaze-text p{font-size:clamp(15px,1.45vw,18px);color:var(--pd-ink);line-height:1.7;text-wrap:pretty}',
'.lang-zh .pd-gaze-text p{font-family:var(--cjk);line-height:1.9}',
'.pd-gaze-row{margin-top:18px}',
'.pd-mono{font-family:var(--mono);font-size:12px;letter-spacing:.06em;color:var(--pd-pink);border:1px solid var(--pd-line);padding:8px 12px;border-radius:4px;display:inline-block}',

/* colour shift */
'.pd-shift{display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(14px,2.4vw,30px);align-items:center}',
'.pd-shift-card{margin:0;border:1px solid var(--pd-line);overflow:hidden}',
'.pd-shift-card img{aspect-ratio:16/10}',
'.pd-shift-blue{box-shadow:inset 0 0 0 2px rgba(91,115,255,.35)}',
'.pd-shift-red{box-shadow:inset 0 0 0 2px rgba(232,59,67,.4)}',
'.pd-shift-card figcaption{display:flex;flex-direction:column;gap:3px;padding:14px 16px;background:var(--pd-panel);font-size:clamp(13px,1.3vw,15px);color:var(--pd-dim)}',
'.lang-zh .pd-shift-card figcaption{font-family:var(--cjk)}',
'.pd-state{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--pd-blue);margin-bottom:4px}',
'.pd-state-red{color:var(--pd-red)}',
'.pd-shift-bar{height:6px;width:clamp(30px,6vw,90px);border-radius:3px;background:linear-gradient(90deg,var(--pd-blue),var(--pd-pink),var(--pd-red))}',

/* loop diagram */
'.pd-loop{display:flex;flex-wrap:wrap;align-items:stretch;gap:12px;margin-bottom:clamp(8px,1.5vw,16px)}',
'.pd-loop-node{position:relative;display:flex;flex-direction:column;gap:6px;background:var(--pd-panel);border:1px solid var(--pd-line);padding:clamp(14px,1.8vw,22px) clamp(16px,2vw,26px);min-width:130px}',
'.pd-loop-node span{font-family:var(--mono);font-size:12px;color:var(--pd-red);letter-spacing:.1em}',
'.pd-loop-node b{font-family:var(--display);font-weight:700;font-size:clamp(15px,1.6vw,20px);color:#fff}',
'.lang-zh .pd-loop-node b{font-weight:900}',
'.pd-loop-arr{align-self:center;color:var(--pd-dim);font-size:20px}',
'.pd-loop-back{color:var(--pd-red);font-size:26px}',

/* pipeline chain */
'.pd-chain{display:flex;flex-wrap:wrap;align-items:stretch;gap:10px;margin-bottom:clamp(34px,5vw,56px)}',
'.pd-chain-step{display:flex;flex-direction:column;gap:6px;font-family:var(--display);font-weight:700;font-size:clamp(15px,1.6vw,20px);color:#fff;',
'  background:var(--pd-panel);border:1px solid var(--pd-line);padding:clamp(12px,1.5vw,18px) clamp(14px,1.8vw,22px)}',
'.pd-chain-step i{font-family:var(--mono);font-style:normal;font-weight:400;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--pd-dim)}',
'.lang-zh .pd-chain-step i{font-family:var(--cjk);letter-spacing:.04em}',
'.pd-chain-end{border-color:var(--pd-pink);box-shadow:inset 0 0 0 1px rgba(255,115,179,.3)}',
'.pd-chain-arr{align-self:center;color:var(--pd-dim);font-size:18px}',
'.pd-reflect{border-left:3px solid var(--pd-red);padding:clamp(8px,1.4vw,16px) clamp(20px,2.6vw,34px)}',
'.pd-reflect-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--pd-red)}',
'.lang-zh .pd-reflect-label{font-family:var(--cjk)}',
'.pd-reflect p{font-family:var(--serif);font-size:clamp(16px,1.6vw,22px);line-height:1.6;color:#fff;margin-top:12px;max-width:64ch;text-wrap:pretty}',
'.lang-zh .pd-reflect p{font-family:var(--cjk);line-height:1.85}',

/* footer */
'.pd-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;',
'  padding:clamp(40px,6vw,80px) clamp(24px,5vw,86px);border-top:1px solid var(--pd-line);max-width:1280px;margin:0 auto}',
'.pd-foot-line{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;color:var(--pd-dim)}',
'.lang-zh .pd-foot-line{font-family:var(--cjk);letter-spacing:.08em}',

/* reveal */
'.pd-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.pd-rev.pd-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.pd-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:860px){',
'  .pd-split,.pd-gazewrap{grid-template-columns:1fr}',
'  .pd-shift{grid-template-columns:1fr;gap:16px}',
'  .pd-shift-bar{width:60px;justify-self:center;transform:rotate(90deg)}',
'  .pd-loop-arr{display:none}',
'}'
  ].join('\n');

})();
