/* ============================================================================
   lightofmylife-page.js — bespoke case study for LIGHT OF MY LIFE, a personal
   3D animated short (Maya) made for Yunbo's dog Xiaokui. Exposes
   window.renderLightOfMyLife(item), called by works-render.js instead of the
   generic buildCase for id==='lightofmylife'. Warm, simple, cartoon style:
   soft pastel paper, rounded cards, a grey -> colour story. The film (YouTube)
   is the centrepiece. No drag-drop slots — text + the video only.
   ========================================================================== */
(function () {
  'use strict';

  var DEFAULT_YT = 'pkTJHfpc-wk'; // the film

  function injectCSS() {
    if (document.getElementById('lol-css')) return;
    var s = document.createElement('style');
    s.id = 'lol-css';
    s.textContent = LOL_CSS;
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
    try { var v = localStorage.getItem('lol-yt-main'); if (v != null) return ytId(v); } catch (e) {}
    return DEFAULT_YT;
  }
  function facadeHTML(id) {
    return '<button class="lol-yt lol-facade" type="button" data-yt="' + id + '" ' +
      'style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)" ' +
      'aria-label="Play the film">' +
      '<span class="lol-play" aria-hidden="true"></span>' +
      '<button class="lol-edit" type="button" data-edit="main" title="Change link" aria-label="Change link">&#9998;</button>' +
      '</button>';
  }
  function emptyHTML() {
    return '<button class="lol-yt lol-empty" type="button" data-add="main">' +
      '<span class="lol-empty-k">&#9654;</span>' +
      '<span class="lol-empty-l"><span class="en">Add film link</span><span class="zh">\u70b9\u51fb\u6dfb\u52a0\u5f71\u7247\u94fe\u63a5</span></span></button>';
  }
  function videoBlock() {
    var id = storedYT();
    return '<div class="lol-film-media">' + (id ? facadeHTML(id) : emptyHTML()) + '</div>';
  }

  function dots() {
    // grey -> colour, the whole idea of the film, drawn with simple circles
    var cls = ['g', 'g', 'g', 'c1', 'c2', 'c3', 'c4', 'c5'];
    return '<div class="lol-dots" aria-hidden="true">' +
      cls.map(function (c, i) { return '<span class="lol-dot lol-dot-' + c + '" style="--i:' + i + '"></span>'; }).join('') +
      '</div>';
  }

  function html() {
    return '' +
    '<article class="lol-page" id="case-models-lightofmylife" data-screen-label="Light of My Life">' +

      /* ---------------- HERO ---------------- */
      '<header class="lol-hero">' +
        '<div class="lol-hero-inner">' +
          '<div class="lol-eyebrow"><span class="en">3D animated short \u00b7 Maya \u00b7 2026</span><span class="zh">\u4e09\u7ef4\u52a8\u753b\u77ed\u7247 \u00b7 Maya \u00b7 2026</span></div>' +
          '<h1 class="lol-title"><span class="lol-title-grey">Light of</span> <span class="lol-title-colour">My Life</span></h1>' +
          dots() +
          '<div class="lol-sub"><span class="en">the day colour came back</span><span class="zh">\u8272\u5f69\u56de\u6765\u7684\u90a3\u4e00\u5929</span></div>' +
          '<p class="lol-tagline"><span class="en">A man walks through a cold, grey, watched city. He comes home, touches his dog \u2014 and colour floods back into his body and his world.</span><span class="zh">\u4e00\u4e2a\u4eba\u8d70\u8fc7\u51b0\u51b7\u3001\u7070\u8272\u3001\u88ab\u76d1\u89c6\u7684\u57ce\u5e02\u3002\u4ed6\u56de\u5230\u5bb6\uff0c\u629a\u6478\u4ed6\u7684\u72d7\u2014\u2014\u8272\u5f69\u4fbf\u91cd\u65b0\u6d8c\u56de\u4ed6\u7684\u8eab\u4f53\u4e0e\u4e16\u754c\u3002</span></p>' +
          '<div class="lol-ded"><span class="lol-heart">\u2665</span><span class="en">For Xiaokui, my Chihuahua</span><span class="zh">\u81f4\u6211\u7684\u5409\u5a03\u5a03 \u00b7 \u5c0f\u5947</span></div>' +
          '<div class="lol-chips">' +
            '<span class="lol-chip">Maya</span><span class="lol-chip">Shader nodes</span>' +
            '<span class="lol-chip">Rigging</span><span class="lol-chip">Lighting</span><span class="lol-chip">Edit</span>' +
          '</div>' +
        '</div>' +
      '</header>' +

      /* ---------------- THE FILM ---------------- */
      '<section class="lol-sec lol-filmsec" data-scene="main">' +
        '<div class="lol-filmcard">' + videoBlock() + '</div>' +
        '<a class="lol-watch" href="https://youtu.be/' + DEFAULT_YT + '" target="_blank" rel="noopener"><span class="en">Watch on YouTube</span><span class="zh">\u5728 YouTube \u89c2\u770b</span> <i>&#8599;</i></a>' +
      '</section>' +

      /* ---------------- THE STORY (grey -> colour) ---------------- */
      '<section class="lol-sec">' +
        '<h2 class="lol-h2"><span class="en">A little story, in three breaths</span><span class="zh">\u4e09\u4e2a\u547c\u5438\u95f4\u7684\u5c0f\u6545\u4e8b</span></h2>' +
        '<div class="lol-beats">' +
          '<div class="lol-beat lol-beat-grey">' +
            '<span class="lol-beat-n">01</span>' +
            '<div class="lol-beat-art lol-art-grey"><span class="lol-eye"></span></div>' +
            '<h3><span class="en">A world without colour</span><span class="zh">\u6ca1\u6709\u8272\u5f69\u7684\u4e16\u754c</span></h3>' +
            '<p><span class="en">A cold, black-and-white city. Red cameras look down on him, always watching. Everything is grey \u2014 including him.</span><span class="zh">\u4e00\u5ea7\u51b0\u51b7\u7684\u9ed1\u767d\u57ce\u5e02\u3002\u7ea2\u8272\u7684\u6444\u50cf\u5934\u59cb\u7ec8\u4fef\u89c6\u7740\u4ed6\u3002\u4e00\u5207\u90fd\u662f\u7070\u7684\u2014\u2014\u5305\u62ec\u4ed6\u81ea\u5df1\u3002</span></p>' +
          '</div>' +
          '<div class="lol-beat lol-beat-warm">' +
            '<span class="lol-beat-n">02</span>' +
            '<div class="lol-beat-art lol-art-warm"><span class="lol-pawpad"></span><span class="lol-pawpad"></span><span class="lol-pawpad"></span><span class="lol-pawbig"></span></div>' +
            '<h3><span class="en">Coming home</span><span class="zh">\u56de\u5230\u5bb6</span></h3>' +
            '<p><span class="en">The door opens. A small dog is waiting \u2014 the one warm thing in the whole grey film.</span><span class="zh">\u95e8\u6253\u5f00\u4e86\u3002\u4e00\u53ea\u5c0f\u72d7\u6b63\u7b49\u7740\u4ed6\u2014\u2014\u6574\u90e8\u7070\u8272\u5f71\u7247\u91cc\u552f\u4e00\u6e29\u6696\u7684\u4e1c\u897f\u3002</span></p>' +
          '</div>' +
          '<div class="lol-beat lol-beat-colour">' +
            '<span class="lol-beat-n">03</span>' +
            '<div class="lol-beat-art lol-art-colour"></div>' +
            '<h3><span class="en">Colour floods back</span><span class="zh">\u8272\u5f69\u6d8c\u56de</span></h3>' +
            '<p><span class="en">He touches the dog \u2014 and colour spreads from his hand through his body and out into the world. The dog is the only source of colour and life.</span><span class="zh">\u4ed6\u629a\u6478\u5c0f\u72d7\u2014\u2014\u8272\u5f69\u4ece\u624b\u5fc3\u6e05\u5f00\uff0c\u6d41\u904d\u5168\u8eab\uff0c\u518d\u6d8c\u5411\u4e16\u754c\u3002\u72d7\uff0c\u662f\u552f\u4e00\u7684\u8272\u5f69\u4e0e\u751f\u547d\u4e4b\u6e90\u3002</span></p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- THE PIVOT (how, kept simple) ---------------- */
      '<section class="lol-sec lol-sec-soft">' +
        '<h2 class="lol-h2"><span class="en">One happy accident</span><span class="zh">\u4e00\u4e2a\u7f8e\u4e3d\u7684\u610f\u5916</span></h2>' +
        '<div class="lol-pivot">' +
          '<div class="lol-pivot-card lol-pivot-old">' +
            '<span class="lol-tag"><span class="en">The plan</span><span class="zh">\u539f\u8ba1\u5212</span></span>' +
            '<p><span class="en">I wanted his body to crack open like plaster \u2014 but my 3D skills weren\u2019t ready for that deformation yet.</span><span class="zh">\u6211\u672c\u60f3\u8ba9\u4ed6\u7684\u8eab\u4f53\u50cf\u77f3\u818f\u4e00\u6837\u88c2\u5f00\u2014\u2014\u4f46\u5f53\u65f6\u7684\u4e09\u7ef4\u80fd\u529b\u8fd8\u505a\u4e0d\u51fa\u90a3\u6837\u7684\u5f62\u53d8\u3002</span></p>' +
          '</div>' +
          '<span class="lol-arrow" aria-hidden="true">\u2192</span>' +
          '<div class="lol-pivot-card lol-pivot-new">' +
            '<span class="lol-tag"><span class="en">The result</span><span class="zh">\u6700\u7ec8</span></span>' +
            '<p><span class="en">So I rebuilt the whole idea around colour. The limit forced a better film \u2014 the change is carried entirely by colour, not shape.</span><span class="zh">\u4e8e\u662f\u6211\u628a\u6574\u4e2a\u6784\u60f3\u91cd\u5efa\u5728\u201c\u8272\u5f69\u201d\u4e4b\u4e0a\u3002\u9650\u5236\u53cd\u800c\u9020\u5c31\u4e86\u66f4\u597d\u7684\u7247\u5b50\u2014\u2014\u8eac\u53d8\u5b8c\u5168\u7531\u8272\u5f69\u3001\u800c\u975e\u5f62\u72b6\u627f\u8f7d\u3002</span></p>' +
          '</div>' +
        '</div>' +
        '<p class="lol-note"><span class="en">Made solo in Maya \u2014 story, modelling, rigging, animation, shader-node colour systems, lighting and the final edit.</span><span class="zh">\u5728 Maya \u4e2d\u72ec\u7acb\u5b8c\u6210\u2014\u2014\u6545\u4e8b\u3001\u5efa\u6a21\u3001\u7ed1\u5b9a\u3001\u52a8\u753b\u3001\u7740\u8272\u5668\u8282\u70b9\u7684\u8272\u5f69\u7cfb\u7edf\u3001\u706f\u5149\u4e0e\u6700\u7ec8\u526a\u8f91\u3002</span></p>' +
      '</section>' +

      /* ---------------- DEDICATION FOOTER ---------------- */
      '<footer class="lol-foot">' +
        '<div class="lol-foot-card">' +
          '<span class="lol-heart lol-heart-big">\u2665</span>' +
          '<p class="lol-foot-line"><span class="en">The most personal thing I\u2019ve made. It showed me animation can hold grief and love at the same time.</span><span class="zh">\u6211\u505a\u8fc7\u6700\u79c1\u4eba\u7684\u4e00\u4ef6\u4f5c\u54c1\u3002\u5b83\u8ba9\u6211\u770b\u89c1\uff0c\u52a8\u753b\u53ef\u4ee5\u540c\u65f6\u76db\u653e\u60b2\u4f24\u4e0e\u7231\u3002</span></p>' +
          '<div class="lol-foot-sign"><span class="en">For Xiaokui</span><span class="zh">\u81f4\u5c0f\u5947</span></div>' +
        '</div>' +
      '</footer>' +

    '</article>';
  }

  function renderLightOfMyLife(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;

    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('lol-in'); io.unobserve(e.target); } });
      }, { threshold: 0.16 });
      art.querySelectorAll('.lol-sec, .lol-beat, .lol-pivot-card, .lol-foot-card').forEach(function (n) { n.classList.add('lol-rev'); io.observe(n); });
    });

    // video play + change-link
    function commit(raw) {
      var id = ytId((raw || '').trim());
      try { localStorage.setItem('lol-yt-main', id || ''); } catch (e) {}
      var media = art.querySelector('[data-scene="main"] .lol-film-media');
      if (media) media.innerHTML = id ? facadeHTML(id) : emptyHTML();
    }
    function editLink() {
      var media = art.querySelector('[data-scene="main"] .lol-film-media');
      if (!media) return;
      var cur = ''; try { cur = localStorage.getItem('lol-yt-main'); if (cur == null) cur = DEFAULT_YT; } catch (e) { cur = DEFAULT_YT; }
      var box = document.createElement('div');
      box.className = 'lol-yt lol-editor';
      box.innerHTML =
        '<label class="lol-editor-l"><span class="en">Paste YouTube link</span><span class="zh">\u7c98\u8d34 YouTube \u94fe\u63a5</span></label>' +
        '<input class="lol-editor-in" type="text" value="' + String(cur).replace(/"/g, '&quot;') + '" placeholder="https://youtu.be/\u2026" />' +
        '<div class="lol-editor-btns"><button type="button" class="lol-editor-save">Save</button>' +
        '<button type="button" class="lol-editor-cancel">Cancel</button></div>';
      media.innerHTML = '';
      media.appendChild(box);
      var input = box.querySelector('.lol-editor-in'); input.focus();
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(input.value); else if (e.key === 'Escape') commit(cur); });
      box.querySelector('.lol-editor-save').addEventListener('click', function () { commit(input.value); });
      box.querySelector('.lol-editor-cancel').addEventListener('click', function () { commit(cur); });
    }
    art.addEventListener('click', function (e) {
      var ed = e.target.closest && e.target.closest('[data-edit]');
      if (ed) { e.preventDefault(); e.stopPropagation(); editLink(); return; }
      var add = e.target.closest && e.target.closest('[data-add]');
      if (add) { editLink(); return; }
      var b = e.target.closest && e.target.closest('.lol-facade');
      if (!b) return;
      var id = b.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'lol-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Light of My Life';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });

    return art;
  }

  window.renderLightOfMyLife = renderLightOfMyLife;

  /* ---------------------------- styles ---------------------------- */
  var LOL_CSS = [
'.lol-page{--lol-bg:#F4EEE6;--lol-ink:#2B2723;--lol-soft:#6E675F;--lol-grey:#B7B1A8;--lol-line:rgba(43,39,35,.12);',
'  --c1:#FF6F61;--c2:#36A9E0;--c3:#FFC24B;--c4:#5FB87E;--c5:#9B7BE0;',
'  background:radial-gradient(120% 80% at 80% -10%,#FBE7DD 0%,var(--lol-bg) 52%);color:var(--lol-ink);',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .lol-page{font-family:var(--cjk)}',

/* hero */
'.lol-hero{padding:clamp(40px,7vw,96px) clamp(24px,5vw,86px) clamp(20px,3vw,40px)}',
'.lol-hero-inner{max-width:1000px;margin:0 auto;text-align:center}',
'.lol-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.22em;text-transform:uppercase;color:var(--lol-soft);margin-bottom:clamp(16px,2.4vw,26px)}',
'.lang-zh .lol-eyebrow{font-family:var(--cjk);letter-spacing:.12em}',
'.lol-title{font-family:var(--display);font-weight:800;font-size:clamp(50px,10vw,140px);line-height:.92;letter-spacing:-.02em}',
'.lol-title-grey{color:var(--lol-grey)}',
'.lol-title-colour{background:linear-gradient(96deg,var(--c1) 0%,var(--c3) 34%,var(--c4) 64%,var(--c2) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.lol-dots{display:flex;justify-content:center;gap:clamp(9px,1.4vw,16px);margin:clamp(20px,3vw,32px) 0 clamp(16px,2.4vw,24px)}',
'.lol-dot{width:clamp(12px,1.6vw,18px);height:clamp(12px,1.6vw,18px);border-radius:50%;transform:scale(.62);opacity:.5;',
'  animation:lolPop .5s cubic-bezier(.18,1.5,.4,1) both;animation-delay:calc(var(--i)*.07s)}',
'.lol-dot-g{background:var(--lol-grey)}',
'.lol-dot-c1{background:var(--c1)}.lol-dot-c2{background:var(--c2)}.lol-dot-c3{background:var(--c3)}.lol-dot-c4{background:var(--c4)}.lol-dot-c5{background:var(--c5)}',
'@keyframes lolPop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}',
'@media (prefers-reduced-motion:reduce){.lol-dot{animation:none;transform:scale(1);opacity:1}}',
'.lol-sub{font-family:var(--serif);font-style:italic;font-size:clamp(20px,3vw,40px);color:var(--lol-ink)}',
'.lang-zh .lol-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.lol-tagline{max-width:50ch;margin:clamp(14px,2vw,22px) auto 0;font-size:clamp(15px,1.6vw,20px);color:var(--lol-soft);text-wrap:pretty}',
'.lol-ded{display:inline-flex;align-items:center;gap:9px;margin-top:clamp(18px,2.6vw,28px);padding:9px 18px;border-radius:999px;',
'  background:#fff;box-shadow:0 10px 26px -16px rgba(43,39,35,.5);font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.04em;color:var(--lol-ink)}',
'.lang-zh .lol-ded{font-family:var(--cjk)}',
'.lol-ded .en+.zh{margin-left:6px}',
'.lol-heart{color:var(--c1);font-size:1.15em;line-height:1}',
'.lol-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-top:clamp(20px,2.8vw,30px)}',
'.lol-chip{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--lol-soft);background:rgba(255,255,255,.7);',
'  border:1.5px solid var(--lol-line);padding:7px 14px;border-radius:999px}',

/* sections */
'.lol-sec{padding:clamp(40px,6vw,86px) clamp(24px,5vw,86px);max-width:1180px;margin:0 auto}',
'.lol-sec-soft{background:rgba(255,255,255,.45);border-radius:clamp(22px,3vw,40px);max-width:1080px;margin:clamp(10px,2vw,24px) auto}',
'.lol-h2{font-family:var(--display);font-weight:800;font-size:clamp(28px,4.2vw,56px);line-height:1.05;letter-spacing:-.015em;text-align:center;margin-bottom:clamp(28px,4vw,52px)}',
'.lang-zh .lol-h2{font-weight:900}',

/* film */
'.lol-filmsec{display:flex;flex-direction:column;align-items:center;gap:clamp(16px,2vw,24px);padding-top:clamp(20px,3vw,40px)}',
'.lol-filmcard{width:100%;max-width:1000px;border-radius:clamp(18px,2.4vw,28px);overflow:hidden;background:#15110e;',
'  box-shadow:0 30px 70px -34px rgba(43,39,35,.6),0 0 0 6px #fff}',
'.lol-film-media{position:relative}',
'.lol-yt{position:relative;width:100%;aspect-ratio:16/9;border:0;display:block}',
'.lol-facade{padding:0;cursor:pointer;background:#000 center/cover no-repeat;display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'.lol-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,16,12,.05),rgba(20,16,12,.34))}',
'.lol-facade:hover{filter:brightness(1.07)}',
'.lol-play{position:relative;z-index:1;width:clamp(60px,7vw,84px);height:clamp(60px,7vw,84px);border-radius:50%;',
'  background:#fff;box-shadow:0 12px 30px -10px rgba(0,0,0,.5);transition:transform .2s}',
'.lol-play::before{content:"";position:absolute;top:50%;left:55%;transform:translate(-50%,-50%);border-style:solid;border-width:13px 0 13px 21px;border-color:transparent transparent transparent var(--c1)}',
'.lol-facade:hover .lol-play{transform:scale(1.1)}',
'.lol-edit{position:absolute;z-index:2;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:0;',
'  background:rgba(255,255,255,.9);color:#2B2723;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}',
'.lol-facade:hover .lol-edit{opacity:1}',
'.lol-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#efe7dd;',
'  color:var(--lol-soft);font-family:var(--mono);font-size:13px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}',
'.lol-empty-k{font-size:clamp(30px,4vw,46px);color:var(--c1)}',
'.lol-editor{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:clamp(20px,3vw,40px);aspect-ratio:16/9;background:#efe7dd}',
'.lol-editor-l{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--lol-soft)}',
'.lol-editor-in{width:min(560px,100%);box-sizing:border-box;background:#fff;border:1.5px solid var(--lol-line);color:#2B2723;font-family:var(--mono);font-size:14px;padding:11px 12px;border-radius:10px;outline:none}',
'.lol-editor-in:focus{border-color:var(--c1)}',
'.lol-editor-btns{display:flex;gap:8px}',
'.lol-editor-btns button{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 16px;border-radius:10px;border:1.5px solid var(--lol-line);background:#fff;color:var(--lol-ink)}',
'.lol-editor-save{background:var(--c1)!important;color:#fff!important;border-color:var(--c1)!important}',
'.lol-watch{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:13px;letter-spacing:.06em;text-transform:uppercase;',
'  color:var(--lol-ink);text-decoration:none;padding:12px 24px;border-radius:999px;background:#fff;box-shadow:0 12px 28px -16px rgba(43,39,35,.5);transition:transform .2s}',
'.lang-zh .lol-watch{font-family:var(--cjk)}',
'.lol-watch:hover{transform:translateY(-2px)}.lol-watch i{font-style:normal}',

/* story beats */
'.lol-beats{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4vw,28px)}',
'.lol-beat{border-radius:clamp(18px,2.2vw,26px);padding:clamp(20px,2.6vw,30px);position:relative;border:2px solid var(--lol-line);background:#fff}',
'.lol-beat-grey{background:#ECEAE6;border-color:rgba(43,39,35,.1)}',
'.lol-beat-warm{background:#FFF4E8;border-color:#F6D9B6}',
'.lol-beat-colour{background:linear-gradient(150deg,#FFE9E5,#E7F3FF 60%,#EAF8EE);border-color:#FAD2CC}',
'.lol-beat-n{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.1em;color:var(--lol-soft)}',
'.lol-beat-art{height:clamp(96px,12vw,132px);border-radius:16px;margin:14px 0 18px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}',
'.lol-art-grey{background:repeating-linear-gradient(135deg,#dcd9d4 0 12px,#d3d0ca 12px 24px)}',
'.lol-eye{width:26px;height:26px;border-radius:50%;background:var(--c1);box-shadow:0 0 0 7px rgba(255,111,97,.22),0 0 24px 4px rgba(255,111,97,.4)}',
'.lol-art-warm{background:#FFE7CC;gap:7px}',
'.lol-pawpad{width:14px;height:18px;border-radius:50%;background:#C98A5A}',
'.lol-pawbig{width:30px;height:26px;border-radius:48% 48% 46% 46%;background:#C98A5A;position:absolute;bottom:20px}',
'.lol-art-colour{background:conic-gradient(from 210deg,var(--c1),var(--c3),var(--c4),var(--c2),var(--c5),var(--c1))}',
'.lol-beat h3{font-family:var(--display);font-weight:700;font-size:clamp(18px,2vw,24px);margin:0 0 10px}',
'.lang-zh .lol-beat h3{font-weight:900}',
'.lol-beat p{font-size:clamp(14px,1.35vw,16.5px);color:var(--lol-soft);line-height:1.62;text-wrap:pretty}',
'.lol-beat-colour p,.lol-beat-warm p{color:#5a5048}',

/* pivot */
'.lol-pivot{display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(14px,2vw,22px);align-items:center}',
'.lol-pivot-card{border-radius:clamp(16px,2vw,22px);padding:clamp(20px,2.4vw,28px);background:#fff;border:2px solid var(--lol-line)}',
'.lol-pivot-old{background:#ECEAE6}',
'.lol-pivot-new{border-color:#FAD2CC;background:linear-gradient(150deg,#FFF1EE,#fff)}',
'.lol-tag{display:inline-block;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--lol-soft);margin-bottom:10px}',
'.lol-pivot-new .lol-tag{color:var(--c1)}',
'.lol-pivot-card p{font-family:var(--serif);font-size:clamp(15px,1.5vw,19px);line-height:1.6;color:var(--lol-ink);text-wrap:pretty}',
'.lang-zh .lol-pivot-card p{font-family:var(--cjk)}',
'.lol-arrow{font-size:clamp(20px,2.4vw,30px);color:var(--c1)}',
'.lol-note{text-align:center;max-width:64ch;margin:clamp(24px,3.4vw,40px) auto 0;font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.02em;color:var(--lol-soft);line-height:1.7}',
'.lang-zh .lol-note{font-family:var(--cjk)}',

/* dedication footer */
'.lol-foot{padding:clamp(20px,3vw,40px) clamp(24px,5vw,86px) clamp(54px,7vw,96px);max-width:1180px;margin:0 auto}',
'.lol-foot-card{text-align:center;max-width:680px;margin:0 auto;background:#fff;border-radius:clamp(22px,3vw,36px);',
'  padding:clamp(30px,4.5vw,56px);box-shadow:0 30px 60px -34px rgba(43,39,35,.45)}',
'.lol-heart-big{font-size:clamp(30px,4vw,46px);display:block;margin-bottom:14px;animation:lolBeat 1.8s ease-in-out infinite}',
'@keyframes lolBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}',
'@media (prefers-reduced-motion:reduce){.lol-heart-big{animation:none}}',
'.lol-foot-line{font-family:var(--serif);font-size:clamp(18px,2.2vw,28px);line-height:1.45;color:var(--lol-ink);text-wrap:pretty}',
'.lang-zh .lol-foot-line{font-family:var(--cjk);line-height:1.7}',
'.lol-foot-sign{margin-top:clamp(16px,2.2vw,24px);font-family:var(--script,cursive);font-size:clamp(22px,3vw,38px);color:var(--c1)}',
'.lang-zh .lol-foot-sign{font-family:var(--cjk);font-weight:700}',

/* reveal */
'.lol-rev{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}',
'.lol-rev.lol-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.lol-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:820px){',
'  .lol-beats{grid-template-columns:1fr}',
'  .lol-pivot{grid-template-columns:1fr}',
'  .lol-arrow{transform:rotate(90deg);justify-self:center}',
'}'
  ].join('\n');

})();
