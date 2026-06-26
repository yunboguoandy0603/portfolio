/* ============================================================================
   dragongate-page.js — bespoke long-form case study for THE DRAGON GATE INN
   (3D environmental storytelling · Maya → UE5). Exposes
   window.renderDragonGate(item), called by works-render.js instead of the
   generic buildCase for id==='dragongate'. Cinematic desert-night / wuxia
   theme; bilingual via .en/.zh spans. Drop your own renders into the
   <image-slot>s — they persist + export via the (non-dotfile) image sidecar.
   ========================================================================== */
(function () {
  'use strict';

  var DEFAULT_YT = 'dumtA7jiH6E'; // the project's cinematic (kept)

  function injectCSS() {
    if (document.getElementById('dg-css')) return;
    var s = document.createElement('style');
    s.id = 'dg-css';
    s.textContent = DG_CSS;
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
    try { var v = localStorage.getItem('dg-yt-main'); if (v != null) return ytId(v); } catch (e) {}
    return DEFAULT_YT;
  }
  function facadeHTML(id) {
    return '<button class="dg-yt dg-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play the Dragon Gate Inn cinematic">' +
      '<span class="dg-play" aria-hidden="true"></span>' +
      '<button class="dg-edit" type="button" data-edit="main" title="Change link" aria-label="Change link">&#9998;</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="dg-yt dg-empty" type="button" data-add="main">' +
      '<span class="dg-empty-k">&#9654;</span>' +
      '<span class="dg-empty-l"><span class="en">Add cinematic link</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u5f71\u7247\u94fe\u63a5</span></span></button>';
  }
  function videoBlock() {
    var id = storedYT();
    return '<div class="dg-scene-media">' + (id ? facadeHTML(id) : emptyHTML()) + '</div>';
  }

  /* an <image-slot> the user fills with their own render */
  function slot(id, ph_en, ph_zh, ratio) {
    return '<div class="dg-slot" style="aspect-ratio:' + (ratio || '16 / 9') + '">' +
      '<image-slot id="dg-' + id + '" shape="rect" placeholder="' + ph_en + ' / ' + ph_zh + '"></image-slot></div>';
  }

  function html() {
    return '' +
    '<article class="dg-page" id="case-models-dragongate" data-screen-label="The Dragon Gate Inn">' +

      /* ---------------- HERO ---------------- */
      '<header class="dg-hero">' +
        '<div class="dg-hero-bg"></div>' +
        '<div class="dg-hero-veil"></div>' +
        '<div class="dg-grain" aria-hidden="true"></div>' +
        '<div class="dg-hero-inner">' +
          '<div class="dg-eyebrow"><span class="en">3D environment art \u00b7 Maya \u00d7 UE5 \u00b7 2023</span><span class="zh">\u4e09\u7ef4\u73af\u5883\u827a\u672f \u00b7 Maya \u00d7 UE5 \u00b7 2023</span></div>' +
          '<h1 class="dg-title">The Dragon<br/>Gate Inn</h1>' +
          '<div class="dg-sub"><span class="en">\u9f99\u95e8\u5ba2\u6808 \u00b7 the black inn</span><span class="zh">\u9f99\u95e8\u5ba2\u6808 \u00b7 \u9ed1\u5e97\u63a8\u7406</span></div>' +
          '<p class="dg-tagline"><span class="en">A desert &ldquo;black inn&rdquo; built from scratch \u2014 a shelter that looks safe but hides deadly secrets, told through the eyes of a tired ordinary traveller rather than a hero.</span><span class="zh">\u4e00\u5ea7\u4ece\u96f6\u642d\u5efa\u7684\u6c99\u6f20&ldquo;\u9ed1\u5e97&rdquo;\u2014\u2014\u770b\u4f3c\u5b89\u5168\u3001\u6697\u85cf\u6740\u673a\u7684\u5ba2\u6808\uff0c\u7528\u4e00\u4e2a\u75b2\u60eb\u7684\u666e\u901a\u65c5\u4eba\u800c\u975e\u82f1\u96c4\u7684\u89c6\u89d2\u8bb2\u8ff0\u3002</span></p>' +
          '<div class="dg-tools">' +
            '<span class="dg-tool">Maya</span><span class="dg-tool">Substance Painter</span>' +
            '<span class="dg-tool">Unreal Engine 5</span><span class="dg-tool">Niagara</span>' +
          '</div>' +
          '<div class="dg-meta">' +
            '<span><b class="en">Individual</b><b class="zh">\u4e2a\u4eba\u9879\u76ee</b><i class="en">Solo build</i><i class="zh">\u72ec\u7acb\u5b8c\u6210</i></span>' +
            '<span><b class="en">Feb \u2013 Jun 2023</b><b class="zh">2023.02 \u2013 06</b><i class="en">Timeline</i><i class="zh">\u65f6\u95f4</i></span>' +
            '<span><b class="en">Model \u00b7 Texture \u00b7 Light \u00b7 Cine</b><b class="zh">\u5efa\u6a21 \u00b7 \u6750\u8d28 \u00b7 \u5e03\u5149 \u00b7 \u955c\u5934</b><i class="en">Role</i><i class="zh">\u89d2\u8272</i></span>' +
          '</div>' +
        '</div>' +
        '<div class="dg-scroll"><span class="en">scroll</span><span class="zh">\u5411\u4e0b</span><i></i></div>' +
      '</header>' +

      /* ---------------- FEATURE CINEMATIC ---------------- */
      '<section class="dg-feature" data-scene="main">' + videoBlock() + '</section>' +

      /* ---------------- 01 CONCEPT ---------------- */
      '<section class="dg-sec">' +
        '<div class="dg-mark"><span class="dg-num">01</span><span class="dg-kicker en">The concept</span><span class="dg-kicker zh">\u6982\u5ff5</span></div>' +
        '<div class="dg-split">' +
          '<h2 class="dg-h2"><span class="en">A shelter<br/>that hides<br/>a blade</span><span class="zh">\u85cf\u5200\u7684<br/>\u5ba2\u6808</span></h2>' +
          '<div class="dg-body">' +
            '<p><span class="en">The Dragon Gate Inn is a lone way-station in the desert \u2014 the kind of place a traveller is grateful to find at nightfall, and the last place they should trust. Drawing on my Northwest-China hometown and the Wuxia classic <i>Dragon Gate Inn</i>, I rebuilt that uneasy refuge entirely in 3D.</span><span class="zh">\u9f99\u95e8\u5ba2\u6808\u662f\u6c99\u6f20\u4e2d\u5b64\u96f6\u96f6\u7684\u9a7f\u7ad9\u2014\u2014\u65c5\u4eba\u5728\u5165\u591c\u65f6\u5e86\u5e78\u5bfb\u5230\u7684\u5730\u65b9\uff0c\u4e5f\u662f\u6700\u4e0d\u8be5\u4fe1\u4efb\u7684\u5730\u65b9\u3002\u6211\u4ee5\u897f\u5317\u7684\u5bb6\u4e61\u4e0e\u6b66\u4fa0\u7ecf\u5178\u300a\u9f99\u95e8\u5ba2\u6808\u300b\u4e3a\u7075\u611f\uff0c\u628a\u90a3\u79cd\u4e0d\u5b89\u7684\u5e87\u62a4\u6240\u5b8c\u5168\u7528\u4e09\u7ef4\u91cd\u5efa\u3002</span></p>' +
            '<p><span class="en">I deliberately tell it from the point of view of a tired, ordinary traveller \u2014 not a swordsman. There is no fight to win, only a room to read. The space itself has to carry the threat.</span><span class="zh">\u6211\u523b\u610f\u4ece\u4e00\u4e2a\u75b2\u60eb\u7684\u666e\u901a\u65c5\u4eba\u2014\u2014\u800c\u975e\u5251\u5ba2\u2014\u2014\u7684\u89c6\u89d2\u53d9\u8ff0\u3002\u8fd9\u91cc\u6ca1\u6709\u8981\u8d62\u7684\u6253\u6597\uff0c\u53ea\u6709\u4e00\u95f4\u9700\u8981\u88ab&ldquo;\u8bfb&rdquo;\u7684\u623f\u95f4\u3002\u5a01\u80c1\u5fc5\u987b\u7531\u7a7a\u95f4\u672c\u8eab\u627f\u8f7d\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="dg-pillars">' +
          '<div class="dg-pillar"><span class="dg-pk">\u4e00</span><h4><span class="en">From scratch</span><span class="zh">\u4ece\u96f6\u642d\u5efa</span></h4><p><span class="en">Every prop, wall and dune modelled and textured by hand \u2014 a full solo Maya-to-UE5 build.</span><span class="zh">\u6bcf\u4e00\u4ef6\u9053\u5177\u3001\u5899\u4e0e\u6c99\u4e18\u90fd\u624b\u5de5\u5efa\u6a21\u4e0e\u6750\u8d28\u2014\u2014\u4ece Maya \u5230 UE5 \u7684\u5b8c\u6574\u72ec\u7acb\u5236\u4f5c\u3002</span></p></div>' +
          '<div class="dg-pillar"><span class="dg-pk">\u4e8c</span><h4><span class="en">Ordinary eyes</span><span class="zh">\u666e\u901a\u4eba\u7684\u773c</span></h4><p><span class="en">A traveller\u2019s perspective, not a hero\u2019s \u2014 dread comes from noticing, not fighting.</span><span class="zh">\u65c5\u4eba\u800c\u975e\u82f1\u96c4\u7684\u89c6\u89d2\u2014\u2014\u6050\u60e7\u6765\u81ea&ldquo;\u5bdf\u89c9&rdquo;\uff0c\u800c\u975e\u6218\u6597\u3002</span></p></div>' +
          '<div class="dg-pillar"><span class="dg-pk">\u4e09</span><h4><span class="en">Space as narrator</span><span class="zh">\u7a7a\u95f4\u5373\u53d9\u8005</span></h4><p><span class="en">No cutscene explains the inn. The architecture, wear and light do all the telling.</span><span class="zh">\u6ca1\u6709\u8fc7\u573a\u52a8\u753b\u89e3\u91ca\u8fd9\u5ea7\u5ba2\u6808\u3002\u5efa\u7b51\u3001\u78e8\u635f\u4e0e\u5149\u5b8c\u6210\u4e86\u5168\u90e8\u53d9\u8ff0\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 02 STORY THROUGH DETAIL ---------------- */
      '<section class="dg-sec">' +
        '<div class="dg-mark"><span class="dg-num">02</span><span class="dg-kicker en">Storytelling through detail</span><span class="dg-kicker zh">\u7528\u7ec6\u8282\u53d9\u4e8b</span></div>' +
        '<h2 class="dg-h2 dg-h2-wide"><span class="en">Clues hidden in the grain</span><span class="zh">\u85cf\u5728\u7eb9\u7406\u91cc\u7684\u7ebf\u7d22</span></h2>' +
        '<p class="dg-lead"><span class="en">Cage-like windows, faint bloodstains, a torture room behind the back court \u2014 worn Substance textures act as silent clues to the inn\u2019s true nature. Nothing is labelled; everything can be read.</span><span class="zh">\u7262\u7b3c\u822c\u7684\u7a97\u3001\u9690\u7ea6\u7684\u8840\u8ff9\u3001\u540e\u9662\u80cc\u540e\u7684\u6697\u5211\u5ba4\u2014\u2014\u505a\u65e7\u7684 Substance \u6750\u8d28\u6210\u4e3a\u63ed\u793a\u5ba2\u6808\u672c\u6027\u7684\u65e0\u8a00\u7ebf\u7d22\u3002\u6ca1\u6709\u4e00\u5904\u88ab\u6807\u6ce8\uff0c\u5374\u5904\u5904\u53ef\u8bfb\u3002</span></p>' +
        '<div class="dg-readlist">' +
          '<div class="dg-read"><span class="dg-read-i">&#9633;</span><p><span class="en"><b>Cage windows</b> \u2014 bars dressed as lattice; the guest is already a prisoner.</span><span class="zh"><b>\u7262\u7b3c\u7a97</b>\u2014\u2014\u88c5\u4f5c\u96d5\u82b1\u7684\u94c1\u6761\uff1b\u5ba2\u4eba\u65e9\u5df2\u662f\u56da\u5f92\u3002</span></p></div>' +
          '<div class="dg-read"><span class="dg-read-i">&#9633;</span><p><span class="en"><b>Bloodstains</b> \u2014 scrubbed but never gone, soaked into wood and clay.</span><span class="zh"><b>\u8840\u8ff9</b>\u2014\u2014\u64e6\u8fc7\u5374\u4ece\u672a\u6d88\u5931\uff0c\u6e17\u8fdb\u6728\u4e0e\u571f\u3002</span></p></div>' +
          '<div class="dg-read"><span class="dg-read-i">&#9633;</span><p><span class="en"><b>The back room</b> \u2014 a torture chamber the architecture politely hides.</span><span class="zh"><b>\u540e\u9662\u6697\u5ba4</b>\u2014\u2014\u88ab\u5efa\u7b51&ldquo;\u793c\u8c8c\u5730&rdquo;\u85cf\u8d77\u7684\u5211\u5ba4\u3002</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 03 FENGSHUI ---------------- */
      '<section class="dg-sec">' +
        '<div class="dg-mark"><span class="dg-num">03</span><span class="dg-kicker en">Fengshui in spatial design</span><span class="dg-kicker zh">\u628a\u98ce\u6c34\u7ec7\u5165\u7a7a\u95f4</span></div>' +
        '<div class="dg-split">' +
          '<h2 class="dg-h2"><span class="en">Good luck,<br/>spoiled by<br/>greed</span><span class="zh">\u88ab\u8d2a\u5a6a<br/>\u8d25\u6389\u7684<br/>\u5409\u76f8</span></h2>' +
          '<div class="dg-body">' +
            '<p><span class="en">The inn sits on a classically lucky site \u2014 water at its front, a sheltering dune at its back. By Fengshui it should prosper. But the greedy innkeeper has ruined it from within: a metaphor that evil eventually destroys whatever luck it is built on.</span><span class="zh">\u5ba2\u6808\u574c\u5728\u4e00\u5904\u7ecf\u5178\u7684\u5409\u5730\u2014\u2014\u4e34\u6c34\u3001\u80cc\u9760\u6c99\u4e18\u3002\u6309\u98ce\u6c34\u672c\u5e94\u5174\u65fa\u3002\u4f46\u8d2a\u5a6a\u7684\u5e97\u4e3b\u4ece\u5185\u90e8\u8d25\u574f\u4e86\u5b83\uff1a\u8fd9\u662f\u4e00\u4e2a\u9690\u55bb\u2014\u2014\u6076\u884c\u7ec8\u5c06\u6bc1\u6389\u5b83\u6240\u4f9d\u9644\u7684\u597d\u8fd0\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="dg-fengshui">' +
          '<div class="dg-fsmap">' +
            '<div class="dg-fsrow"><span class="dg-fsk dg-fsk-water">\u6c34 Water</span><span class="dg-fsbar dg-fsbar-water"></span><span class="dg-fsv"><span class="en">Wealth flows in</span><span class="zh">\u8d22\u6c14\u6c47\u805a</span></span></div>' +
            '<div class="dg-fsrow"><span class="dg-fsk dg-fsk-inn">\u5e97 Inn</span><span class="dg-fsbar dg-fsbar-inn"></span><span class="dg-fsv"><span class="en">Greed corrupts the centre</span><span class="zh">\u8d2a\u5a6a\u8680\u5784\u5176\u4e2d</span></span></div>' +
            '<div class="dg-fsrow"><span class="dg-fsk dg-fsk-dune">\u6c99 Dune</span><span class="dg-fsbar dg-fsbar-dune"></span><span class="dg-fsv"><span class="en">Shelter turns to trap</span><span class="zh">\u5e87\u62a4\u5316\u4e3a\u56da\u7b3c</span></span></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 04 STORMS & CINEMATIC LIGHT ---------------- */
      '<section class="dg-sec dg-sec-dark">' +
        '<div class="dg-mark"><span class="dg-num">04</span><span class="dg-kicker en">Desert storms &amp; cinematic light</span><span class="dg-kicker zh">\u6c99\u66b4\u4e0e\u7535\u5f71\u5316\u5e03\u5149</span></div>' +
        '<h2 class="dg-h2 dg-h2-wide"><span class="en">Torchlight that guides \u2014 and conceals</span><span class="zh">\u5f15\u5bfc\u89c6\u7ebf\u3001\u4e5f\u85cf\u533f\u79d8\u5bc6\u7684\u706b\u5149</span></h2>' +
        '<div class="dg-cine">' +
          '<div class="dg-cine-side">' +
            '<div class="dg-litcard"><span class="dg-lk">Light</span><h4><span class="en">Night torchlight</span><span class="zh">\u591c\u8272\u706b\u5149</span></h4><p><span class="en">Pools of warm light guide the eye exactly where I want it \u2014 and leave the rest in a dark that hides the inn\u2019s secrets.</span><span class="zh">\u4e00\u6c60\u6c60\u6696\u5149\u628a\u89c6\u7ebf\u5f15\u5230\u6211\u60f3\u8981\u7684\u5904\u2014\u2014\u5176\u4f59\u5219\u7559\u5728\u9ed1\u6697\u91cc\uff0c\u85cf\u8d77\u5ba2\u6808\u7684\u79d8\u5bc6\u3002</span></p></div>' +
            '<div class="dg-litcard"><span class="dg-lk">FX</span><h4><span class="en">Niagara sandstorm</span><span class="zh">Niagara \u6c99\u66b4</span></h4><p><span class="en">Particle systems build a living storm that presses the inn into isolation \u2014 nowhere left to run.</span><span class="zh">\u7c92\u5b50\u7cfb\u7edf\u6784\u5efa\u51fa\u4e00\u573a&ldquo;\u6d3b&rdquo;\u7684\u98ce\u66b4\uff0c\u628a\u5ba2\u6808\u538b\u8fdb\u5b64\u7acb\u2014\u2014\u65e0\u5904\u53ef\u9003\u3002</span></p></div>' +
            '<div class="dg-litcard"><span class="dg-lk">Camera</span><h4><span class="en">UE5 cinematics</span><span class="zh">UE5 \u955c\u5934</span></h4><p><span class="en">Keyframed camera moves in Sequencer turn the static set into a short, tense walk-through film.</span><span class="zh">\u5728 Sequencer \u91cc\u5173\u952e\u5e27\u7684\u8fd0\u955c\uff0c\u628a\u9759\u6001\u573a\u666f\u53d8\u6210\u4e00\u6bb5\u77ed\u800c\u7d27\u5f20\u7684\u6f2b\u6e38\u77ed\u7247\u3002</span></p></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 05 PIPELINE + REFLECTION ---------------- */
      '<section class="dg-sec">' +
        '<div class="dg-mark"><span class="dg-num">05</span><span class="dg-kicker en">Pipeline &amp; reflection</span><span class="dg-kicker zh">\u7ba1\u7ebf\u4e0e\u53cd\u601d</span></div>' +
        '<h2 class="dg-h2 dg-h2-wide"><span class="en">One artist, the whole chain</span><span class="zh">\u4e00\u4e2a\u4eba\uff0c\u6253\u901a\u6574\u6761\u7ba1\u7ebf</span></h2>' +
        '<div class="dg-chain">' +
          '<span class="dg-chain-step">Maya<i><span class="en">model</span><span class="zh">\u5efa\u6a21</span></i></span><span class="dg-chain-arr">\u2192</span>' +
          '<span class="dg-chain-step">Substance<i><span class="en">texture</span><span class="zh">\u6750\u8d28</span></i></span><span class="dg-chain-arr">\u2192</span>' +
          '<span class="dg-chain-step">UE5<i><span class="en">light + assemble</span><span class="zh">\u5e03\u5149\u00b7\u88c5\u914d</span></i></span><span class="dg-chain-arr">\u2192</span>' +
          '<span class="dg-chain-step">Niagara<i><span class="en">storm FX</span><span class="zh">\u6c99\u66b4\u7279\u6548</span></i></span><span class="dg-chain-arr">\u2192</span>' +
          '<span class="dg-chain-step dg-chain-end">Sequencer<i><span class="en">cinematic</span><span class="zh">\u955c\u5934</span></i></span>' +
        '</div>' +
        '<div class="dg-reflect">' +
          '<span class="dg-reflect-label"><span class="en">Reflection</span><span class="zh">\u53cd\u601d</span></span>' +
          '<p><span class="en">Building this alone levelled up my full Maya-to-UE5 pipeline \u2014 but more, it taught me a 3D space is never just a backdrop; it is an active storyteller. It deepened how I think about representing cultural identity in digital media.</span><span class="zh">\u72ec\u7acb\u5b8c\u6210\u5b83\uff0c\u8ba9\u6211\u6253\u901a\u4e86\u4ece Maya \u5230 UE5 \u7684\u5b8c\u6574\u7ba1\u7ebf\uff1b\u66f4\u91cd\u8981\u7684\u662f\uff0c\u6211\u660e\u767d\u4e09\u7ef4\u7a7a\u95f4\u4ece\u6765\u4e0d\u662f\u80cc\u666f\uff0c\u800c\u662f\u4e3b\u52a8\u7684\u53d9\u4e8b\u8005\u3002\u5b83\u52a0\u6df1\u4e86\u6211\u5bf9&ldquo;\u5728\u6570\u5b57\u5a92\u4ecb\u4e2d\u518d\u73b0\u6587\u5316\u8eab\u4efd&rdquo;\u7684\u601d\u8003\u3002</span></p>' +
        '</div>' +
      '</section>' +

      /* ---------------- FOOTER ---------------- */
      '<footer class="dg-foot">' +
        '<div class="dg-foot-line"><span class="en">THE DRAGON GATE INN \u00b7 a space that tells the truth</span><span class="zh">\u9f99\u95e8\u5ba2\u6808 \u00b7 \u4f1a\u8bf4\u771f\u8bdd\u7684\u7a7a\u95f4</span></div>' +
      '</footer>' +

    '</article>';
  }

  function renderDragonGate(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;

    // scroll reveal
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dg-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.dg-sec, .dg-pillar, .dg-fig, .dg-read, .dg-litcard, .dg-fsrow').forEach(function (n) { n.classList.add('dg-rev'); io.observe(n); });
    });

    // video: play + change-link (mirrors the other case pages)
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem('dg-yt-main', id || ''); } catch (e) {}
      var media = art.querySelector('[data-scene="main"] .dg-scene-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('[data-scene="main"] .dg-scene-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('dg-yt-main'); if (cur == null) cur = DEFAULT_YT; } catch (e) { cur = DEFAULT_YT; }
      var box = document.createElement('div');
      box.className = 'dg-yt dg-editor';
      box.innerHTML =
        '<label class="dg-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="dg-editor-in" type="text" value="' + String(cur).replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="dg-editor-btns"><button type="button" class="dg-editor-save">Save</button>' +
        '<button type="button" class="dg-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.dg-editor-in'); input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(input.value); else if (e.key === 'Escape') commit(cur); });
      box.querySelector('.dg-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.dg-editor-cancel').addEventListener('click', function () { commit(cur); });
    }
    art.addEventListener('click', function (e) {
      var ed = e.target.closest && e.target.closest('[data-edit]');
      if (ed) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.dg-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'dg-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'The Dragon Gate Inn cinematic';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderDragonGate = renderDragonGate;

  /* ---------------------------- styles ---------------------------- */
  var DG_CSS = [
'.dg-page{--dg-ink:#ECE3D2;--dg-dim:#A89A80;--dg-bg:#0C0A08;--dg-panel:#16110B;--dg-panel2:#1E160E;--dg-line:rgba(236,227,210,.13);',
'  --dg-sand:#CFA24C;--dg-blood:#B23A2E;--dg-jade:#5FA88B;',
'  background:var(--dg-bg);color:var(--dg-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .dg-page{font-family:var(--cjk)}',
'.dg-page image-slot{display:block;width:100%;height:100%}',

/* hero */
'.dg-hero{position:relative;min-height:82vh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}',
'.dg-hero-bg{position:absolute;inset:0;z-index:-3;background:radial-gradient(120% 90% at 70% 10%,#241a10 0%,#0c0a08 70%)}',
'.dg-hero-bg image-slot{width:100%;height:100%;filter:brightness(.82) contrast(1.04) saturate(.95)}',
'.dg-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(12,10,8,.55) 0%,rgba(12,10,8,.28) 36%,rgba(12,10,8,.95) 100%)}',
'.dg-grain{position:absolute;inset:0;z-index:-1;opacity:.5;mix-blend-mode:overlay;pointer-events:none;',
'  background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:3px 3px}',
'.dg-hero-inner{position:relative;padding:clamp(24px,4vw,60px);padding-bottom:clamp(40px,6vw,78px);max-width:1120px}',
'.dg-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--dg-sand);margin-bottom:clamp(14px,2vw,22px)}',
'.lang-zh .dg-eyebrow{font-family:var(--cjk);letter-spacing:.14em}',
'.dg-title{font-family:var(--display);font-weight:800;font-size:clamp(54px,11vw,168px);line-height:.9;letter-spacing:-.02em;',
'  background:linear-gradient(98deg,#fff 0%,var(--dg-sand) 56%,var(--dg-blood) 118%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.dg-sub{font-family:var(--serif);font-style:italic;font-size:clamp(20px,3vw,40px);color:#fff;margin-top:clamp(8px,1.2vw,14px)}',
'.lang-zh .dg-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.dg-tagline{max-width:46ch;font-size:clamp(15px,1.6vw,20px);color:var(--dg-ink);margin-top:clamp(16px,2.2vw,26px);text-wrap:pretty}',
'.dg-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:clamp(18px,2.4vw,26px)}',
'.dg-tool{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dg-ink);',
'  border:1px solid var(--dg-line);padding:6px 11px;border-radius:2px;background:rgba(236,227,210,.04)}',
'.dg-meta{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,54px);margin-top:clamp(22px,3vw,32px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--dg-line)}',
'.dg-meta span{display:flex;flex-direction:column;gap:3px}',
'.dg-meta b{font-size:clamp(14px,1.4vw,17px);font-weight:600;color:#fff}',
'.dg-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--dg-dim)}',
'.lang-zh .dg-meta i{font-family:var(--cjk);letter-spacing:.08em}',
'.dg-scroll{position:absolute;right:clamp(20px,4vw,54px);bottom:clamp(26px,4vw,46px);display:flex;flex-direction:column;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--dg-dim)}',
'.dg-scroll i{width:1px;height:40px;background:linear-gradient(var(--dg-sand),transparent);animation:dgDrip 1.8s ease-in-out infinite}',
'@keyframes dgDrip{0%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(.3);transform-origin:top}}',
'@media (prefers-reduced-motion:reduce){.dg-scroll i{animation:none}}',

/* feature video */
'.dg-feature{padding:0;border-top:1px solid var(--dg-line)}',
'.dg-scene-media{position:relative}',
'.dg-yt{position:relative;width:100%;aspect-ratio:16/9;max-height:88vh;border:0;display:block}',
'.dg-facade{padding:0;cursor:pointer;background:#000 center/cover no-repeat;display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.dg-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,10,8,.12),rgba(12,10,8,.5))}',
'.dg-facade:hover{filter:brightness(1.08)}',
'.dg-play{position:relative;z-index:1;width:clamp(58px,7vw,80px);height:clamp(58px,7vw,80px);border-radius:50%;',
'  background:rgba(12,10,8,.5);border:2px solid rgba(236,227,210,.85);backdrop-filter:blur(2px);transition:transform .2s,background .2s}',
'.dg-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 19px;border-color:transparent transparent transparent #ECE3D2}',
'.dg-facade:hover .dg-play{transform:scale(1.08);background:var(--dg-blood)}',
'.dg-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(236,227,210,.4);',
'  background:rgba(12,10,8,.6);color:#ECE3D2;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s,background .2s}',
'.dg-facade:hover .dg-edit{opacity:1}.dg-edit:hover{background:var(--dg-blood)}',
'.dg-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#0a0806;',
'  border:1px dashed rgba(236,227,210,.22);color:var(--dg-dim);font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:border-color .2s,color .2s}',
'.dg-empty:hover{border-color:rgba(207,162,76,.6);color:var(--dg-sand)}',
'.dg-empty-k{font-size:clamp(30px,4vw,48px);color:rgba(236,227,210,.2)}',
'.lang-zh .dg-empty{font-family:var(--cjk);letter-spacing:.06em}',
'.dg-editor{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:clamp(20px,3vw,40px);aspect-ratio:16/9;background:#0a0806;border:1px solid rgba(207,162,76,.4)}',
'.dg-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--dg-dim)}',
'.dg-editor-in{width:min(560px,100%);box-sizing:border-box;background:#16110b;border:1px solid var(--dg-line);color:#ECE3D2;font-family:var(--mono);font-size:14px;padding:11px 12px;border-radius:4px;outline:none}',
'.dg-editor-in:focus{border-color:var(--dg-sand)}',
'.dg-editor-btns{display:flex;gap:8px}',
'.dg-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:4px;border:1px solid var(--dg-line);background:transparent;color:var(--dg-ink)}',
'.dg-editor-save{background:var(--dg-sand)!important;color:#1c1408!important;border-color:var(--dg-sand)!important}',

/* section frame */
'.dg-sec{padding:clamp(54px,8vw,118px) clamp(24px,5vw,86px);max-width:1280px;margin:0 auto;border-top:1px solid var(--dg-line)}',
'.dg-sec-dark{background:linear-gradient(180deg,#0a0806,#0c0a08)}',
'.dg-mark{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,4vw,48px)}',
'.dg-num{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--dg-blood);letter-spacing:.1em}',
'.dg-kicker{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--dg-dim)}',
'.lang-zh .dg-kicker{font-family:var(--cjk);letter-spacing:.12em}',
'.dg-h2{font-family:var(--display);font-weight:800;font-size:clamp(34px,5.2vw,72px);line-height:1.04;letter-spacing:-.015em;color:#fff}',
'.lang-zh .dg-h2{font-weight:900}',
'.dg-h2-wide{max-width:20ch;margin-bottom:clamp(28px,4vw,46px)}',
'.dg-split{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);gap:clamp(28px,5vw,70px);align-items:start}',
'.dg-body p{font-family:var(--serif);font-size:clamp(16px,1.5vw,20px);line-height:1.72;color:var(--dg-ink);margin-bottom:1.1em;text-wrap:pretty}',
'.lang-zh .dg-body p{font-family:var(--cjk);line-height:1.95}',
'.dg-lead{font-family:var(--serif);font-size:clamp(17px,1.9vw,24px);line-height:1.6;color:#fff;max-width:56ch;margin-bottom:clamp(30px,4vw,52px);text-wrap:pretty}',
'.lang-zh .dg-lead{font-family:var(--cjk);line-height:1.85}',

/* pillars */
'.dg-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.2vw,28px);margin-top:clamp(40px,5vw,64px)}',
'.dg-pillar{background:var(--dg-panel);border:1px solid var(--dg-line);border-top:3px solid var(--dg-sand);padding:clamp(20px,2.4vw,30px)}',
'.dg-pk{font-family:var(--display);font-size:clamp(22px,2.6vw,34px);color:var(--dg-sand);line-height:1}',
'.lang-zh .dg-pk{font-family:var(--cjk)}',
'.dg-pillar h4{font-family:var(--display);font-weight:700;font-size:clamp(18px,2vw,24px);color:#fff;margin:12px 0 10px}',
'.lang-zh .dg-pillar h4{font-weight:900}',
'.dg-pillar p{font-size:clamp(14px,1.3vw,16px);color:var(--dg-ink);line-height:1.62;text-wrap:pretty}',

/* image slot frame */
'.dg-slot{position:relative;width:100%;overflow:hidden;background:repeating-linear-gradient(135deg,#1a130c 0 11px,#140e08 11px 22px);border:1px solid var(--dg-line)}',
'.dg-fig{margin:0}',
'.dg-fig figcaption{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--dg-dim);margin-top:12px;line-height:1.5}',
'.lang-zh .dg-fig figcaption{font-family:var(--cjk)}',

/* detail grid */
'.dg-detail-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:clamp(14px,2vw,24px)}',
'.dg-fig-lg{grid-row:span 1}',
'.dg-detail-grid .dg-fig-lg{grid-row:span 2}',
'.dg-readlist{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);margin-top:clamp(22px,3vw,34px)}',
'.dg-read{display:flex;gap:12px;background:var(--dg-panel);border:1px solid var(--dg-line);border-left:3px solid var(--dg-blood);padding:clamp(16px,1.9vw,22px)}',
'.dg-read-i{color:var(--dg-blood);font-size:14px;line-height:1.5;flex:none}',
'.dg-read p{font-size:clamp(13px,1.25vw,15.5px);color:var(--dg-ink);line-height:1.6;text-wrap:pretty}',
'.dg-read b{color:#fff}',

/* fengshui */
'.dg-fengshui{margin-top:clamp(30px,4vw,52px);max-width:840px}',
'.dg-fig-wide image-slot,.dg-fig-lg image-slot{height:100%}',
'.dg-fsmap{display:flex;flex-direction:column;gap:clamp(14px,2vw,22px)}',
'.dg-fsrow{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:14px;align-items:center}',
'.dg-fsk{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;grid-row:1;grid-column:1}',
'.dg-fsk-water{color:var(--dg-jade)}.dg-fsk-inn{color:var(--dg-blood)}.dg-fsk-dune{color:var(--dg-sand)}',
'.dg-fsbar{height:6px;border-radius:3px;grid-row:1;grid-column:2;align-self:center}',
'.dg-fsbar-water{background:linear-gradient(90deg,var(--dg-jade),transparent)}',
'.dg-fsbar-inn{background:linear-gradient(90deg,var(--dg-blood),transparent)}',
'.dg-fsbar-dune{background:linear-gradient(90deg,var(--dg-sand),transparent)}',
'.dg-fsv{grid-row:2;grid-column:1/-1;font-size:clamp(13px,1.3vw,16px);color:var(--dg-dim);margin-top:4px}',

/* cinematic */
'.dg-cine{margin-top:clamp(4px,1vw,10px)}',
'.dg-cine-side{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.6vw,18px)}',
'.dg-litcard{background:var(--dg-panel2);border:1px solid var(--dg-line);padding:clamp(16px,1.9vw,24px)}',
'.dg-lk{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--dg-sand)}',
'.dg-litcard h4{font-family:var(--display);font-weight:700;font-size:clamp(17px,1.8vw,22px);color:#fff;margin:8px 0 8px}',
'.lang-zh .dg-litcard h4{font-weight:900}',
'.dg-litcard p{font-size:clamp(13px,1.25vw,15.5px);color:var(--dg-ink);line-height:1.6;text-wrap:pretty}',

/* pipeline chain */
'.dg-chain{display:flex;flex-wrap:wrap;align-items:stretch;gap:10px;margin-bottom:clamp(34px,5vw,56px)}',
'.dg-chain-step{position:relative;display:flex;flex-direction:column;gap:6px;font-family:var(--display);font-weight:700;font-size:clamp(15px,1.6vw,20px);color:#fff;',
'  background:var(--dg-panel);border:1px solid var(--dg-line);padding:clamp(12px,1.5vw,18px) clamp(14px,1.8vw,22px)}',
'.dg-chain-step i{font-family:var(--mono);font-style:normal;font-weight:400;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dg-dim)}',
'.lang-zh .dg-chain-step i{font-family:var(--cjk);letter-spacing:.04em}',
'.dg-chain-end{border-color:var(--dg-sand);box-shadow:inset 0 0 0 1px rgba(207,162,76,.3)}',
'.dg-chain-arr{align-self:center;color:var(--dg-dim);font-size:18px}',
'.dg-reflect{border-left:3px solid var(--dg-blood);padding:clamp(8px,1.4vw,16px) clamp(20px,2.6vw,34px)}',
'.dg-reflect-label{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--dg-blood)}',
'.lang-zh .dg-reflect-label{font-family:var(--cjk)}',
'.dg-reflect p{font-family:var(--serif);font-size:clamp(16px,1.6vw,22px);line-height:1.6;color:#fff;margin-top:12px;max-width:64ch;text-wrap:pretty}',
'.lang-zh .dg-reflect p{font-family:var(--cjk);line-height:1.85}',

/* footer */
'.dg-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;',
'  padding:clamp(40px,6vw,80px) clamp(24px,5vw,86px);border-top:1px solid var(--dg-line);max-width:1280px;margin:0 auto}',
'.dg-foot-line{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;color:var(--dg-dim)}',
'.lang-zh .dg-foot-line{font-family:var(--cjk);letter-spacing:.08em}',

/* reveal */
'.dg-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.dg-rev.dg-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.dg-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:860px){',
'  .dg-split,.dg-cine-side{grid-template-columns:1fr}',
'  .dg-pillars,.dg-readlist{grid-template-columns:1fr}',
'  .dg-detail-grid{grid-template-columns:1fr 1fr}',
'  .dg-detail-grid .dg-fig-lg{grid-column:1/-1;grid-row:auto}',
'  .dg-chain-arr{display:none}',
'}'
  ].join('\n');

})();
