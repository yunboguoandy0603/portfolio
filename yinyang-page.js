/* ============================================================================
   yinyang-page.js — bespoke case study for YIN-YANG THE MOON (阴阳月), rebuilt
   to follow the author's own PDF poster: warm parchment ground, gold display
   title, olive ■ section headers, traditional Chinese collage + 千里江山图 game
   art. Exposes window.renderYinYang(item) for works-render.js (id==='yinyang').
   Bilingual via .en/.zh spans. Keeps the project video. Motion kept minimal
   (gentle scroll fade-ins) per the author's request.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/yinyang/';
  var DEFAULT_YT = '8V6MtRUQgvc';   // the video from the project PDF

  function injectCSS() {
    if (document.getElementById('yy-css')) return;
    var s = document.createElement('style');
    s.id = 'yy-css';
    s.textContent = YY_CSS;
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
    try { var v = localStorage.getItem('yy-yt-main'); if (v != null) return ytId(v); } catch (e) {}
    return DEFAULT_YT;
  }
  function facadeHTML(id) {
    return '<button class="yy-yt yy-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play Yin-Yang The Moon gameplay">' +
      '<span class="yy-play" aria-hidden="true"></span>' +
      '<button class="yy-edit" type="button" data-edit="main" title="Change link" aria-label="Change link">&#9998;</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="yy-yt yy-empty" type="button" data-add="main">' +
      '<span class="yy-empty-k">&#9654;</span>' +
      '<span class="yy-empty-l"><span class="en">Add gameplay video</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u89c6\u9891</span></span></button>';
  }
  function videoBlock() {
    var id = storedYT();
    return '<div class="yy-scene-media">' + (id ? facadeHTML(id) : emptyHTML()) + '</div>';
  }

  function sec(num, en, zh) {
    return '<div class="yy-mark"><span class="yy-sq"></span><span class="yy-kicker en">' + en + '</span><span class="yy-kicker zh">' + zh + '</span><span class="yy-num">' + num + '</span></div>';
  }

  function html() {
    return '' +
    '<article class="yy-page" id="case-games-yinyang" data-screen-label="Yin-Yang The Moon">' +
      '<div class="yy-grain" aria-hidden="true"></div>' +

      /* ---------------- HERO / INTRODUCTION ---------------- */
      '<header class="yy-hero">' +
        '<div class="yy-hero-fig"><img src="' + A + 'hero-figure.png" alt="Traditional opera figure in gold and black robes" /></div>' +
        '<div class="yy-hero-main">' +
          '<div class="yy-titlewrap">' +
            '<h1 class="yy-title">\u9634\u9633\u00b7\u6708</h1>' +
            '<div class="yy-title-en">YIN-YANG<span>MOON</span></div>' +
            '<span class="yy-seal">\u90ed<br/>\u6602<br/>\u6ce2</span>' +
          '</div>' +
          '<div class="yy-intro">' +
            '<h2 class="yy-intro-h"><span class="en">Introduction</span><span class="zh">\u7b80\u4ecb</span></h2>' +
            '<p><span class="en">A platform jumping-puzzle game. Its menu is steeped in the idea of &ldquo;self-spiritual suicide&rdquo; of people under the power of the system. It draws on the Chinese ink painting &ldquo;A Thousand Miles of Rivers and Mountains&rdquo;, using Unity and Blender to build a 2D game with the visual effect of Chinese ink art.</span><span class="zh">\u4e00\u6b3e\u5e73\u53f0\u8df3\u8dc3\u89e3\u8c1c\u6e38\u620f\u3002\u5176\u6838\u5fc3\u6d78\u6ee1\u4e86\u201c\u7cbe\u795e\u81ea\u6740\u201d\u7684\u6982\u5ff5\u2014\u2014\u4f53\u5236\u4e4b\u4e0b\u4eba\u7684\u72b6\u6001\u3002\u5b83\u501f\u9274\u4e2d\u56fd\u6c34\u58a8\u753b\u300a\u5343\u91cc\u6c5f\u5c71\u56fe\u300b\uff0c\u7528 Unity \u4e0e Blender \u6253\u9020\u51fa\u5177\u6c34\u58a8\u89c6\u89c9\u7684 2D \u6e38\u620f\u3002</span></p>' +
            '<div class="yy-meta">' +
              '<span><b>Unity (2D) \u00b7 C# \u00b7 Blender</b><i class="en">Built with</i><i class="zh">\u5de5\u5177</i></span>' +
              '<span><b class="en">Aug \u2013 Nov 2023</b><b class="zh">2023.08 \u2013 11</b><i class="en">Timeline</i><i class="zh">\u65f6\u95f4</i></span>' +
              '<span><b class="en">Individual</b><b class="zh">\u4e2a\u4eba\u4f5c\u54c1</b><i class="en">Type</i><i class="zh">\u7c7b\u578b</i></span>' +
            '</div>' +
            '<a class="yy-pdf yy-pdf-hero" href="' + A + 'YinYang.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">\u67e5\u770b\u539f\u59cb PDF</span> <i>&#8599;</i></a>' +
          '</div>' +
        '</div>' +
        '<div class="yy-scroll"><span class="en">scroll</span><span class="zh">\u5411\u4e0b</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE VIDEO (kept) ---------------- */
      '<section class="yy-feature" data-scene="main">' + videoBlock() + '</section>' +

      /* ---------------- BACKGROUND ---------------- */
      '<section class="yy-sec">' +
        sec('01', 'Background', '\u80cc\u666f') +
        '<div class="yy-bg-grid">' +
          '<div class="yy-bg-text">' +
            '<h4 class="yy-h4"><span class="en">The &ldquo;996&rdquo; work system</span><span class="zh">\u201c996\u201d \u5de5\u4f5c\u5236</span></h4>' +
            '<p><span class="en">In recent years, the &ldquo;996&rdquo; work system has attracted much attention and discussion in China. &ldquo;996&rdquo; stands for working from 9 a.m. to 9 p.m., six days a week \u2014 a punishing rhythm common in many Chinese internet and technology companies.</span><span class="zh">\u8fd1\u5e74\u6765\uff0c\u201c996\u201d \u5de5\u4f5c\u5236\u5728\u4e2d\u56fd\u5f15\u53d1\u5e7f\u6cdb\u5173\u6ce8\u4e0e\u8ba8\u8bba\u3002\u201c996\u201d \u6307\u4ece\u65e9\u4e5d\u70b9\u5de5\u4f5c\u5230\u665a\u4e5d\u70b9\u3001\u6bcf\u5468\u516d\u5929\u2014\u2014\u8fd9\u662f\u8bb8\u591a\u4e2d\u56fd\u4e92\u8054\u7f51\u4e0e\u79d1\u6280\u516c\u53f8\u4e2d\u5e38\u89c1\u7684\u6b8b\u9177\u8282\u594f\u3002</span></p>' +
            '<h4 class="yy-h4"><span class="en">Social effect</span><span class="zh">\u793e\u4f1a\u5f71\u54cd</span></h4>' +
            '<p><span class="en">When people choose to comply, relentless long working hours gradually wear at the &ldquo;norm&rdquo; in the brain, and employees are forced into accepting a vicious cycle.</span><span class="zh">\u5f53\u4eba\u4eec\u9009\u62e9\u987a\u4ece\uff0c\u65e0\u4f11\u6b62\u7684\u957f\u65f6\u95f4\u5de5\u4f5c\u9010\u6e10\u78e8\u635f\u8111\u4e2d\u7684\u201c\u5e38\u6001\u201d\uff0c\u5458\u5de5\u88ab\u8feb\u63a5\u53d7\u4e00\u4e2a\u6076\u6027\u5faa\u73af\u3002</span></p>' +
          '</div>' +
          '<figure class="yy-fig"><img src="' + A + 'collage-996.png" alt="996 work-system collage" /><figcaption class="yy-cap">\u201c996\u201d work system</figcaption></figure>' +
        '</div>' +
        '<div class="yy-define">' +
          '<h4 class="yy-h4 yy-h4-red"><span class="en">What is self-spiritual suicide?</span><span class="zh">\u4f55\u4e3a\u201c\u7cbe\u795e\u81ea\u6740\u201d\uff1f</span></h4>' +
          '<p class="yy-define-p"><span class="en">To give up one&rsquo;s boundaries, to deny from the bottom of one&rsquo;s heart everything one used to believe in, to stop celebrating everything, to live only because one can&rsquo;t die.</span><span class="zh">\u653e\u5f03\u81ea\u5df1\u7684\u8fb9\u754c\uff0c\u4ece\u5fc3\u5e95\u5426\u5b9a\u66fe\u7ecf\u6240\u4fe1\u7684\u4e00\u5207\uff0c\u4e0d\u518d\u4e3a\u4efb\u4f55\u4e8b\u6b22\u6b23\uff0c\u4ec5\u4ec5\u56e0\u4e3a\u65e0\u6cd5\u6b7b\u53bb\u800c\u6d3b\u7740\u3002</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- PSYCHOLOGICAL THEORY ---------------- */
      '<section class="yy-sec">' +
        sec('02', 'Psychological underpinnings', '\u5fc3\u7406\u7406\u8bba') +
        '<h3 class="yy-h3"><span class="en">Theoretical underpinnings of the survey</span><span class="zh">\u8c03\u7814\u7684\u7406\u8bba\u57fa\u7840</span></h3>' +
        '<div class="yy-theory">' +
          '<div class="yy-theory-card"><span class="yy-tk">Maslow</span><h4 class="yy-h4"><span class="en">Hierarchy of Needs</span><span class="zh">\u9700\u6c42\u5c42\u6b21\u7406\u8bba</span></h4><p><span class="en">Extreme overwork drags individuals down the ranking of needs \u2014 self-actualisation collapses back toward bare physiological survival.</span><span class="zh">\u6781\u7aef\u52a0\u73ed\u62c9\u4f4e\u4e86\u4e2a\u4f53\u5728\u9700\u6c42\u5c42\u6b21\u4e2d\u7684\u4f4d\u7f6e\u2014\u2014\u81ea\u6211\u5b9e\u73b0\u5d29\u843d\u56de\u6700\u57fa\u672c\u7684\u751f\u7406\u751f\u5b58\u3002</span></p></div>' +
          '<div class="yy-theory-card"><span class="yy-tk">Goffman</span><h4 class="yy-h4"><span class="en">Social Role Theory</span><span class="zh">\u89d2\u8272\u7406\u8bba</span></h4><p><span class="en">Contexts shape roles, roles shape selves; under pressure the performed role hollows out the person behind it \u2014 a self quietly abandoned on stage.</span><span class="zh">\u60c5\u5883\u5851\u9020\u89d2\u8272\uff0c\u89d2\u8272\u5851\u9020\u81ea\u6211\uff1b\u538b\u529b\u4e4b\u4e0b\uff0c\u88ab\u626e\u6f14\u7684\u89d2\u8272\u6398\u7a7a\u4e86\u80cc\u540e\u7684\u4eba\u2014\u2014\u4e00\u4e2a\u5728\u821e\u53f0\u4e0a\u88ab\u9759\u9759\u820d\u5f03\u7684\u81ea\u6211\u3002</span></p></div>' +
          '<div class="yy-theory-card"><span class="yy-tk"><span class="en">Self-repression</span><span class="zh">\u81ea\u6211\u538b\u6291</span></span><h4 class="yy-h4"><span class="en">Resistance &amp; guilt</span><span class="zh">\u62b5\u6297\u4e0e\u5185\u759a</span></h4><p><span class="en">Many repress themselves to fit the system; a high share feel guilt that erodes mental health, and institutional resistance withers without support.</span><span class="zh">\u8bb8\u591a\u4eba\u538b\u6291\u81ea\u6211\u4ee5\u9002\u5e94\u4f53\u5236\uff1b\u9ad8\u6bd4\u4f8b\u7684\u4eba\u56e0\u5185\u759a\u800c\u635f\u5bb3\u5fc3\u7406\u5065\u5eb7\uff0c\u800c\u5236\u5ea6\u6027\u62b5\u6297\u5728\u7f3a\u4e4f\u652f\u6301\u65f6\u9010\u6e10\u51cb\u96f6\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- INSPIRATION ---------------- */
      '<section class="yy-sec yy-sec-insp">' +
        sec('03', 'Inspiration', '\u7075\u611f\u6765\u6e90') +
        '<div class="yy-insp">' +
          '<figure class="yy-fig yy-insp-img"><img src="' + A + 'final-scene.png" alt="A Thousand Miles of Rivers and Mountains — in-game ink landscape" /></figure>' +
          '<div class="yy-insp-text">' +
            '<h3 class="yy-h3"><span class="en">A Thousand Miles of<br/>Rivers and Mountains</span><span class="zh">\u5343\u91cc\u6c5f\u5c71\u56fe</span></h3>' +
            '<p><span class="en">A colourful ink-and-silk painting by Wang Ximeng of the Northern Song dynasty. The work is in the form of a scroll, based on tradition: villages, ancient roads, water pavilions and fishing boats, threaded into a wondrous landscape map of the Yangtze River.</span><span class="zh">\u5317\u5b8b\u738b\u5e0c\u5b5f\u7684\u4e00\u5e45\u9752\u7eff\u8bbe\u8272\u7ee2\u672c\u753b\u3002\u5168\u753b\u4ee5\u957f\u5377\u5f62\u5f0f\uff0c\u4f9d\u4f20\u7edf\u800c\u4f5c\uff1a\u6751\u843d\u3001\u53e4\u9053\u3001\u6c34\u4ead\u4e0e\u6e14\u8239\uff0c\u4e32\u8054\u6210\u4e00\u5e45\u5947\u5999\u7684\u957f\u6c5f\u5c71\u6c34\u56fe\u3002</span></p>' +
            '<p><span class="en">It became the visual key for the game: the painting&rsquo;s rhythm of mountains rising and rivers turning is rebuilt as platforms, and its jade-green and azure are carried straight into the game&rsquo;s palette.</span><span class="zh">\u5b83\u6210\u4e3a\u6e38\u620f\u7684\u89c6\u89c9\u949d\u5319\uff1a\u753b\u4e2d\u5c71\u5cf0\u8d77\u4f0f\u3001\u6c5f\u6c34\u8f6c\u6298\u7684\u8282\u594f\u88ab\u91cd\u5efa\u4e3a\u5e73\u53f0\uff0c\u5176\u9752\u7eff\u4e0e\u77f3\u9752\u76f4\u63a5\u8fdb\u5165\u6e38\u620f\u7684\u8272\u5f69\u3002</span></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- PROCESS ---------------- */
      '<section class="yy-sec">' +
        sec('04', 'Process', '\u8bbe\u8ba1\u8fc7\u7a0b') +
        '<div class="yy-process">' +
          '<figure class="yy-fig yy-bagua"><img src="' + A + 'bagua.png" alt="Bagua and yin-yang wheel" /><figcaption class="yy-cap"><span class="en">Bagua \u00b7 yin-yang</span><span class="zh">\u516b\u5366 \u00b7 \u9634\u9633</span></figcaption></figure>' +
          '<div class="yy-process-text">' +
            '<h4 class="yy-h4"><span class="en">Game workflow design</span><span class="zh">\u6e38\u620f\u673a\u5236\u8bbe\u8ba1</span></h4>' +
            '<p><span class="en">The core mechanic references the traditional Chinese Taoist culture of yin and yang and bagua. Through the cycle of switching the &ldquo;yin and yang&rdquo; ability, the main character gains the ability to cross fragmented platforms and reach the distant &ldquo;moon.&rdquo;</span><span class="zh">\u6838\u5fc3\u673a\u5236\u53d6\u6cd5\u4e8e\u4e2d\u56fd\u4f20\u7edf\u9053\u5bb6\u6587\u5316\u7684\u9634\u9633\u4e0e\u516b\u5366\u3002\u901a\u8fc7\u201c\u9634\u9633\u201d\u80fd\u529b\u7684\u5faa\u73af\u5207\u6362\uff0c\u4e3b\u89d2\u83b7\u5f97\u8de8\u8d8a\u7834\u788e\u5e73\u53f0\u3001\u62b5\u8fbe\u8fdc\u5904\u201c\u660e\u6708\u201d\u7684\u80fd\u529b\u3002</span></p>' +
            '<p class="yy-process-note"><span class="en">Moon phases, a sketched setting, and the bagua wheel set the visual grammar before a single level was built.</span><span class="zh">\u6708\u76f8\u53d8\u5316\u3001\u624b\u7ed8\u8bbe\u5b9a\u4e0e\u516b\u5366\u76d8\uff0c\u5728\u7b2c\u4e00\u4e2a\u5173\u5361\u642d\u5efa\u4e4b\u524d\u5c31\u5b9a\u4e0b\u4e86\u89c6\u89c9\u8bed\u6cd5\u3002</span></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- CHARACTER DESIGN ---------------- */
      '<section class="yy-sec">' +
        sec('05', 'Character Design', '\u89d2\u8272\u8bbe\u8ba1') +
        '<div class="yy-char">' +
          '<div class="yy-char-text">' +
            '<h3 class="yy-h3"><span class="en">A Qing official,<br/>cut from shadow</span><span class="zh">\u4e00\u4f4d\u6e05\u671d\u5b98\u5458\uff0c<br/>\u88ab\u5f71\u620f\u88c1\u51fa</span></h3>' +
            '<p><span class="en">The character archetypes refer to Chinese shadow theatre. The main character references the image of a Qing-dynasty official, redrawn in a flat, shadow-puppet style so the figure reads as both authority and a soul worn thin by it.</span><span class="zh">\u89d2\u8272\u539f\u578b\u53d6\u81ea\u4e2d\u56fd\u76ae\u5f71\u620f\u3002\u4e3b\u89d2\u501f\u9274\u6e05\u671d\u5b98\u5458\u7684\u5f62\u8c61\uff0c\u4ee5\u6241\u5e73\u7684\u76ae\u5f71\u98ce\u683c\u91cd\u7ed8\u2014\u2014\u4f7f\u4eba\u7269\u65e2\u662f\u6743\u529b\uff0c\u4e5f\u662f\u88ab\u6743\u529b\u78e8\u8584\u7684\u9b42\u9b04\u3002</span></p>' +
          '</div>' +
          '<figure class="yy-fig yy-char-img"><img src="' + A + 'characters.png" alt="Character design — Qing official, mounted figure and turnaround" /></figure>' +
        '</div>' +
      '</section>' +

      /* ---------------- LEVEL DESIGN + FINAL ---------------- */
      '<section class="yy-sec yy-sec-final">' +
        sec('06', 'Level Design \u00b7 Final', '\u5173\u5361\u4e0e\u6210\u54c1') +
        '<h3 class="yy-h3"><span class="en">Platforms carved from the painting</span><span class="zh">\u4ece\u753b\u4e2d\u51ff\u51fa\u7684\u5e73\u53f0</span></h3>' +
        '<p class="yy-lead"><span class="en">A black-and-white colour block becomes the level&rsquo;s skeleton: the character can switch between yin and yang while jumping to make platforms appear and disappear. Layered over the 千里江山图 palette, each level reads as a living section of the scroll.</span><span class="zh">\u9ed1\u767d\u8272\u5757\u6210\u4e3a\u5173\u5361\u7684\u9aa8\u67b6\uff1a\u89d2\u8272\u5728\u8df3\u8dc3\u4e2d\u5207\u6362\u9634\u9633\uff0c\u8ba9\u5e73\u53f0\u663e\u73b0\u4e0e\u6d88\u5931\u3002\u8986\u4e0a\u300a\u5343\u91cc\u6c5f\u5c71\u56fe\u300b\u7684\u8272\u5f69\uff0c\u6bcf\u4e00\u5173\u90fd\u50cf\u6d3b\u8d77\u6765\u7684\u4e00\u6bb5\u957f\u5377\u3002</span></p>' +
        '<figure class="yy-fig yy-final-hero"><img src="' + A + 'final-scene.png" alt="Final gameplay — ink-wash platformer scene" /></figure>' +
        '<div class="yy-levels">' +
          '<img src="' + A + 'level-1.png" alt="Level 1" /><img src="' + A + 'level-2.png" alt="Level 2" />' +
          '<img src="' + A + 'level-3.png" alt="Level 3" /><img src="' + A + 'level-4.png" alt="Level 4" />' +
          '<img src="' + A + 'level-5.png" alt="Level 5" /><img src="' + A + 'level-6.png" alt="Level 6" />' +
        '</div>' +
        '<div class="yy-reflect">' +
          '<span class="yy-reflect-label"><span class="en">Reflection</span><span class="zh">\u53cd\u601d</span></span>' +
          '<p><span class="en">Indie games showed me their real power here \u2014 Chinese aesthetics and sharp social critique in one object. It deepened my drive to research how cultural narratives in games can reflect and heal modern trauma.</span><span class="zh">\u72ec\u7acb\u6e38\u620f\u5728\u8fd9\u91cc\u5411\u6211\u5c55\u793a\u4e86\u771f\u6b63\u7684\u529b\u91cf\u2014\u2014\u628a\u4e2d\u56fd\u7f8e\u5b66\u4e0e\u5c16\u9510\u7684\u793e\u4f1a\u6279\u8bc4\u88c5\u8fdb\u540c\u4e00\u4ef6\u4f5c\u54c1\u3002\u5b83\u52a0\u6df1\u4e86\u6211\u7684\u7814\u7a76\u51b2\u52a8\uff1a\u6e38\u620f\u4e2d\u7684\u6587\u5316\u53d9\u4e8b\u5982\u4f55\u6620\u7167\u5e76\u7597\u6108\u73b0\u4ee3\u521b\u4f24\u3002</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="yy-foot">' +
        '<div class="yy-foot-line"><span class="en">\u9634\u9633\u00b7\u6708 · YIN-YANG THE MOON · ink-wash narrative platformer</span><span class="zh">\u9634\u9633\u00b7\u6708 · YIN-YANG THE MOON · \u6c34\u58a8\u53d9\u4e8b\u5e73\u53f0\u8df3\u8dc3</span></div>' +
        '<a class="yy-pdf" href="' + A + 'YinYang.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">\u67e5\u770b\u539f\u59cb PDF</span> <i>&#8599;</i></a>' +
      '</footer>' +

    '</article>';
  }

  function wireVideo(art) {
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem('yy-yt-main', id || ''); } catch (e) {}
      var media = art.querySelector('[data-scene="main"] .yy-scene-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('[data-scene="main"] .yy-scene-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('yy-yt-main'); if (cur == null) cur = DEFAULT_YT; } catch (e) { cur = DEFAULT_YT; }
      var wrap = document.createElement('div');
      wrap.className = 'yy-yt yy-editor';
      wrap.innerHTML =
        '<label class="yy-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="yy-editor-in" type="text" value="' + String(cur).replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="yy-editor-btns"><button type="button" class="yy-editor-save">Save</button>' +
        '<button type="button" class="yy-editor-clear">Clear</button>' +
        '<button type="button" class="yy-editor-cancel">Cancel</button></div>';
      media.innerHTML = ''; media.appendChild(wrap);
      var input = wrap.querySelector('.yy-editor-in'); input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(input.value); else if (e.key === 'Escape') commit(cur); });
      wrap.querySelector('.yy-editor-save').addEventListener('click', function () { commit(input.value); });
      wrap.querySelector('.yy-editor-cancel').addEventListener('click', function () { commit(cur); });
      wrap.querySelector('.yy-editor-clear').addEventListener('click', function () { commit(''); });
    }
    art.addEventListener('click', function (e) {
      var edit = e.target.closest && e.target.closest('[data-edit]');
      if (edit) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.yy-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'yy-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Yin-Yang The Moon gameplay';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });
  }

  function renderYinYang(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('yy-in'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      art.querySelectorAll('.yy-sec, .yy-fig').forEach(function (n) { n.classList.add('yy-rev'); io.observe(n); });
    });
    wireVideo(art);
    return art;
  }

  window.renderYinYang = renderYinYang;

  /* ----------------------------- styles ----------------------------- */
  var YY_CSS = [
'.yy-page{--yy-paper:#E6DCC4;--yy-paper2:#EEE6D2;--yy-panel:#DED2B6;--yy-ink:#2E2820;--yy-dim:#6F684F;',
'  --yy-olive:#73803E;--yy-olive-d:#5C672F;--yy-gold:#B0851F;--yy-red:#B5402E;--yy-line:rgba(46,40,32,.18);',
'  position:relative;background:var(--yy-paper);color:var(--yy-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.62;overflow:hidden}',
'.lang-zh .yy-page{font-family:var(--cjk)}',
'.yy-page img{display:block;width:100%;height:100%;object-fit:cover}',
'.yy-grain{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;mix-blend-mode:multiply;',
'  background:radial-gradient(120% 80% at 15% 5%,rgba(120,100,60,.12),transparent 55%),radial-gradient(120% 90% at 90% 100%,rgba(90,80,50,.14),transparent 55%),',
'  radial-gradient(rgba(90,70,40,.05) 1px,transparent 1px);background-size:auto,auto,4px 4px}',
'.yy-page>*{position:relative;z-index:1}',

/* hero */
'.yy-hero{display:grid;grid-template-columns:minmax(200px,300px) 1fr;gap:clamp(20px,3vw,48px);align-items:stretch;',
'  padding:clamp(26px,4vw,60px) clamp(24px,4vw,64px) clamp(34px,5vw,70px);position:relative;',
'  background:linear-gradient(180deg,var(--yy-paper2),var(--yy-paper))}',
'.yy-hero-fig{align-self:end}',
'.yy-hero-fig img{width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 18px 30px rgba(40,30,15,.22))}',
'.yy-hero-main{display:flex;flex-direction:column;justify-content:center}',
'.yy-titlewrap{position:relative;display:flex;flex-direction:column;gap:6px;margin-bottom:clamp(20px,2.6vw,30px)}',
'.yy-title{font-family:var(--cjk);font-weight:900;font-size:clamp(56px,11vw,150px);line-height:.92;letter-spacing:.06em;',
'  background:linear-gradient(160deg,#E7C46A 0%,var(--yy-gold) 45%,#7A5A12 100%);-webkit-background-clip:text;background-clip:text;color:transparent;',
'  filter:drop-shadow(0 2px 0 rgba(120,90,20,.25))}',
'.yy-title-en{font-family:var(--display);font-weight:800;font-size:clamp(20px,3vw,40px);letter-spacing:.04em;color:var(--yy-gold);line-height:1}',
'.yy-title-en span{margin-left:.5em}',
'.yy-seal{position:absolute;right:clamp(0px,2vw,30px);top:8px;writing-mode:vertical-rl;font-family:var(--cjk);font-weight:700;',
'  font-size:clamp(11px,1.3vw,15px);letter-spacing:.1em;color:#fff;background:var(--yy-red);padding:8px 5px;border-radius:3px;line-height:1.25;box-shadow:0 3px 10px rgba(120,30,20,.3)}',
'.yy-intro{max-width:62ch}',
'.yy-intro-h{font-family:var(--display);font-weight:800;font-size:clamp(20px,2.4vw,30px);color:var(--yy-red);margin:0 0 14px;',
'  display:inline-block;border-bottom:2px solid var(--yy-red);padding-bottom:6px}',
'.lang-zh .yy-intro-h{font-family:var(--cjk);font-weight:900}',
'.yy-intro p{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.7;color:var(--yy-ink);text-wrap:pretty}',
'.lang-zh .yy-intro p{font-family:var(--cjk);line-height:1.9}',
'.yy-meta{display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,42px);margin-top:clamp(20px,2.6vw,28px);padding-top:clamp(16px,2vw,22px);border-top:1px solid var(--yy-line)}',
'.yy-meta span{display:flex;flex-direction:column;gap:3px}',
'.yy-meta b{font-size:clamp(13px,1.35vw,16px);font-weight:600;color:var(--yy-ink)}',
'.yy-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--yy-dim)}',
'.lang-zh .yy-meta i{font-family:var(--cjk);letter-spacing:.06em}',
'.yy-scroll{position:absolute;right:clamp(20px,4vw,40px);bottom:clamp(14px,2vw,22px);display:flex;flex-direction:column;align-items:center;gap:7px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--yy-dim)}',
'.yy-scroll i{width:1px;height:34px;background:linear-gradient(var(--yy-red),transparent);animation:yyDrip 1.9s ease-in-out infinite}',
'@keyframes yyDrip{0%,100%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.yy-scroll i{animation:none}}',

/* feature video */
'.yy-feature{padding:0;border-top:2px solid var(--yy-olive);border-bottom:1px solid var(--yy-line);background:#1a1a18}',
'.yy-scene-media{position:relative}',
'.yy-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:82vh;border:0;display:block}',
'.yy-facade{padding:0;cursor:pointer;background-color:#000;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.yy-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,18,12,.12),rgba(20,18,12,.5))}',
'.yy-facade:hover{filter:brightness(1.07)}',
'.yy-play{position:relative;z-index:1;width:clamp(58px,7vw,78px);height:clamp(58px,7vw,78px);border-radius:50%;background:rgba(30,26,16,.5);border:2px solid rgba(238,230,210,.9);transition:transform .2s,background .2s,border-color .2s}',
'.yy-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent #EEE6D2}',
'.yy-facade:hover .yy-play{transform:scale(1.08);background:var(--yy-red);border-color:var(--yy-red)}',
'.yy-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(238,230,210,.45);background:rgba(30,26,16,.55);color:#EEE6D2;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s,background .2s}',
'.yy-facade:hover .yy-edit{opacity:1}.yy-edit:hover{background:var(--yy-red)}',
'.yy-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#23211b;border:1px dashed rgba(238,230,210,.25);color:#b9b09a;font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:border-color .2s,color .2s}',
'.yy-empty-k{font-size:clamp(30px,4vw,48px);color:rgba(238,230,210,.3)}',
'.yy-empty:hover{border-color:var(--yy-gold);color:var(--yy-gold)}',
'.yy-editor{display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:12px;padding:clamp(20px,3vw,40px);background:#1d1b15;border:1px solid rgba(176,133,31,.5);aspect-ratio:16/9;max-height:82vh}',
'.yy-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#b9b09a}',
'.lang-zh .yy-editor-l{font-family:var(--cjk)}',
'.yy-editor-in{width:min(560px,100%);box-sizing:border-box;background:#2a271f;border:1px solid rgba(238,230,210,.25);color:#EEE6D2;font-family:var(--mono);font-size:14px;padding:12px;border-radius:4px;outline:none}',
'.yy-editor-in:focus{border-color:var(--yy-gold)}',
'.yy-editor-btns{display:flex;flex-wrap:wrap;gap:8px}',
'.yy-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:4px;border:1px solid rgba(238,230,210,.3);background:transparent;color:#EEE6D2;transition:background .2s,color .2s,border-color .2s}',
'.yy-editor-save{background:var(--yy-gold)!important;color:#241c08!important;border-color:var(--yy-gold)!important}',
'.yy-editor-clear:hover,.yy-editor-cancel:hover{border-color:var(--yy-red);color:var(--yy-red)}',

/* sections */
'.yy-sec{padding:clamp(50px,7vw,104px) clamp(24px,5vw,80px);max-width:1240px;margin:0 auto;border-top:1px solid var(--yy-line)}',
'.yy-mark{display:flex;align-items:center;gap:12px;margin-bottom:clamp(24px,3.4vw,40px)}',
'.yy-sq{width:13px;height:13px;background:var(--yy-olive);flex:none;box-shadow:2px 2px 0 rgba(92,103,47,.35)}',
'.yy-kicker{font-family:var(--display);font-weight:800;font-size:clamp(18px,2.4vw,30px);letter-spacing:.01em;color:var(--yy-olive-d)}',
'.lang-zh .yy-kicker{font-family:var(--cjk);font-weight:900}',
'.yy-num{margin-left:auto;font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);color:var(--yy-dim);letter-spacing:.1em}',
'.yy-h3{font-family:var(--display);font-weight:800;font-size:clamp(28px,4.2vw,56px);line-height:1.06;letter-spacing:-.01em;color:var(--yy-ink);margin:0 0 clamp(18px,2.4vw,28px)}',
'.lang-zh .yy-h3{font-family:var(--cjk);font-weight:900}',
'.yy-h4{font-family:var(--display);font-weight:700;font-size:clamp(17px,1.8vw,23px);color:var(--yy-ink);margin:0 0 10px}',
'.lang-zh .yy-h4{font-family:var(--cjk);font-weight:900}',
'.yy-h4-red{color:var(--yy-red)}',
'.yy-lead{font-family:var(--serif);font-size:clamp(16px,1.7vw,22px);line-height:1.62;color:var(--yy-ink);max-width:62ch;margin-bottom:clamp(24px,3.4vw,40px);text-wrap:pretty}',
'.lang-zh .yy-lead{font-family:var(--cjk);line-height:1.85}',
'.yy-fig{margin:0;border:1px solid var(--yy-line);background:var(--yy-panel);overflow:hidden;box-shadow:0 14px 30px -20px rgba(50,38,18,.5)}',
'.yy-fig img{width:100%;height:100%}',
'.yy-cap{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--yy-dim);padding:8px 12px;background:var(--yy-paper2);border-top:1px solid var(--yy-line)}',
'.lang-zh .yy-cap{font-family:var(--cjk)}',

/* background */
'.yy-bg-grid{display:grid;grid-template-columns:1fr minmax(0,.78fr);gap:clamp(24px,4vw,56px);align-items:start}',
'.yy-bg-text p{font-family:var(--serif);font-size:clamp(15px,1.45vw,18px);line-height:1.68;color:var(--yy-ink);margin:0 0 1.3em;text-wrap:pretty}',
'.lang-zh .yy-bg-text p{font-family:var(--cjk);line-height:1.9}',
'.yy-bg-text .yy-h4{margin-top:4px}',
'.yy-fig img[src*="collage"]{aspect-ratio:1/1;object-position:center}',
'.yy-define{margin-top:clamp(34px,5vw,58px);border-left:4px solid var(--yy-red);padding:clamp(10px,1.6vw,18px) clamp(20px,2.6vw,32px);background:var(--yy-paper2)}',
'.yy-define-p{font-family:var(--serif);font-style:italic;font-size:clamp(17px,2vw,26px);line-height:1.5;color:var(--yy-ink);max-width:60ch;text-wrap:pretty}',
'.lang-zh .yy-define-p{font-family:var(--cjk);font-style:normal}',

/* theory */
'.yy-theory{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px)}',
'.yy-theory-card{background:var(--yy-paper2);border:1px solid var(--yy-line);border-top:3px solid var(--yy-olive);padding:clamp(18px,2.2vw,28px)}',
'.yy-tk{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--yy-olive-d)}',
'.yy-theory-card .yy-h4{margin:10px 0 10px}',
'.yy-theory-card p{font-family:var(--serif);font-size:clamp(14px,1.35vw,16.5px);line-height:1.6;color:var(--yy-ink);text-wrap:pretty}',
'.lang-zh .yy-theory-card p{font-family:var(--cjk);line-height:1.8}',

/* inspiration */
'.yy-sec-insp{background:linear-gradient(180deg,rgba(115,128,62,.08),transparent)}',
'.yy-insp{display:grid;grid-template-columns:1.15fr 1fr;gap:clamp(24px,4vw,56px);align-items:center}',
'.yy-insp-img img{aspect-ratio:16/10}',
'.yy-insp-text p{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.68;color:var(--yy-ink);margin:0 0 1.2em;text-wrap:pretty}',
'.lang-zh .yy-insp-text p{font-family:var(--cjk);line-height:1.9}',

/* process */
'.yy-process{display:grid;grid-template-columns:minmax(0,.7fr) 1fr;gap:clamp(24px,4vw,56px);align-items:center}',
'.yy-bagua{background:#F3ECDA;border-radius:50%;aspect-ratio:1/1;box-shadow:0 14px 34px -20px rgba(50,38,18,.6)}',
'.yy-bagua img{border-radius:50%;object-fit:contain;background:#F3ECDA}',
'.yy-bagua .yy-cap{position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);border:1px solid var(--yy-line);border-radius:999px;background:var(--yy-paper2)}',
'.yy-process-text p{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.68;color:var(--yy-ink);margin:0 0 1.1em;text-wrap:pretty}',
'.lang-zh .yy-process-text p{font-family:var(--cjk);line-height:1.9}',
'.yy-process-note{font-family:var(--mono)!important;font-size:13px!important;color:var(--yy-dim)!important;line-height:1.6!important}',
'.lang-zh .yy-process-note{font-family:var(--cjk)!important}',

/* character */
'.yy-char{display:grid;grid-template-columns:1fr minmax(0,.85fr);gap:clamp(24px,4vw,56px);align-items:center}',
'.yy-char-img{background:#F0E8D5}',
'.yy-char-img img{aspect-ratio:1/1;object-fit:contain;background:#F0E8D5}',
'.yy-char-text p{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.68;color:var(--yy-ink);text-wrap:pretty}',
'.lang-zh .yy-char-text p{font-family:var(--cjk);line-height:1.9}',

/* final / levels */
'.yy-sec-final{background:linear-gradient(180deg,rgba(115,128,62,.08),transparent)}',
'.yy-final-hero{margin-bottom:clamp(16px,2.4vw,26px)}',
'.yy-final-hero img{aspect-ratio:16/9}',
'.yy-levels{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,1.6vw,18px);margin-bottom:clamp(34px,5vw,56px)}',
'.yy-levels img{aspect-ratio:2/1;border:1px solid var(--yy-line);background:var(--yy-panel)}',
'.yy-reflect{border-left:4px solid var(--yy-olive);padding:clamp(8px,1.4vw,16px) clamp(20px,2.6vw,32px);background:var(--yy-paper2)}',
'.yy-reflect-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--yy-olive-d)}',
'.lang-zh .yy-reflect-label{font-family:var(--cjk)}',
'.yy-reflect p{font-family:var(--serif);font-size:clamp(16px,1.6vw,21px);line-height:1.6;color:var(--yy-ink);margin-top:10px;max-width:66ch;text-wrap:pretty}',
'.lang-zh .yy-reflect p{font-family:var(--cjk);line-height:1.85}',

/* footer + pdf */
'.yy-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;padding:clamp(36px,5vw,72px) clamp(24px,5vw,80px);border-top:2px solid var(--yy-olive);max-width:1240px;margin:0 auto}',
'.yy-foot-line{font-family:var(--mono);font-size:clamp(11px,1.15vw,13.5px);letter-spacing:.14em;text-transform:uppercase;color:var(--yy-dim)}',
'.lang-zh .yy-foot-line{font-family:var(--cjk);letter-spacing:.06em}',
'.yy-pdf{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--yy-ink);text-decoration:none;padding:12px 22px;border:1.5px solid var(--yy-olive-d);transition:background .2s,color .2s,transform .2s}',
'.lang-zh .yy-pdf{font-family:var(--cjk)}',
'.yy-pdf:hover{background:var(--yy-olive-d);color:#F2ECD9;transform:translateY(-2px)}',
'.yy-pdf i{font-style:normal;font-size:15px}',
'.yy-pdf-hero{margin-top:clamp(18px,2.4vw,26px)}',

/* reveal */
'.yy-rev{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.yy-rev.yy-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.yy-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:880px){',
'  .yy-hero{grid-template-columns:1fr}.yy-hero-fig{max-width:240px}',
'  .yy-bg-grid,.yy-insp,.yy-process,.yy-char{grid-template-columns:1fr}',
'  .yy-theory{grid-template-columns:1fr}',
'  .yy-levels{grid-template-columns:1fr 1fr}',
'  .yy-seal{position:static;writing-mode:horizontal-tb;display:inline-block;width:max-content;margin-top:8px}',
'}'
  ].join('\n');

})();
