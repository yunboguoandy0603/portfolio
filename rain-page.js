/* ============================================================================
   rain-page.js — bespoke long-form case study for RAIN, built from the
   project PDF (Yunbo Guo · RAIN). Exposes window.renderRain(item) which
   works-render.js calls instead of the generic buildCase for id==='rain'.
   Dark, immersive "rain" theme; bilingual via .en/.zh spans.
   ========================================================================== */
(function () {
  'use strict';

  var A = 'assets/rain/';

  // inject scoped styles once
  function injectCSS() {
    if (document.getElementById('rain-css')) return;
    var s = document.createElement('style');
    s.id = 'rain-css';
    s.textContent = RAIN_CSS;
    document.head.appendChild(s);
  }

  /* ---- HTML template (bilingual). Real text drawn from the RAIN PDF. ---- */
  function html() {
    return '' +
    '<article class="rain-page" id="case-experiments-rain" data-screen-label="RAIN">' +

      /* ---------- HERO ---------- */
      '<header class="rn-hero">' +
        '<img class="rn-hero-bg" src="' + A + 'p1-1.png" alt="RAIN installation render" />' +
        '<div class="rn-hero-veil"></div>' +
        '<div class="rn-rainfall" aria-hidden="true"></div>' +
        '<div class="rn-hero-inner">' +
          '<div class="rn-eyebrow"><span class="en">Generative art · Processing · 2024</span><span class="zh">生成艺术 · Processing · 2024</span></div>' +
          '<h1 class="rn-title">RAIN</h1>' +
          '<div class="rn-sub"><span class="en">&ldquo;the gender of rain&rdquo;</span><span class="zh">「雨的性别」</span></div>' +
          '<p class="rn-tagline"><span class="en">Gender is not a fixed definition. It is fluid, ever-changing, impossible to catch — like rain.</span><span class="zh">性别不是固定的定义。它流动、不断变化、无法被捕捉——正如雨。</span></p>' +
          '<div class="rn-meta">' +
            '<span><b class="en">Individual</b><b class="zh">个人</b><i class="en">Creative coding</i><i class="zh">创意编程</i></span>' +
            '<span><b>Processing · TouchDesigner</b><i class="en">Tools</i><i class="zh">工具</i></span>' +
            '<span><b class="en">Interactive installation</b><b class="zh">交互装置</b><i class="en">Concept</i><i class="zh">形态</i></span>' +
          '</div>' +
          '<a class="rn-pdf rn-pdf-hero" href="' + A + 'RAIN.pdf" target="_blank" rel="noopener"><span class="en">Open the original PDF</span><span class="zh">查看原始 PDF</span> <i>&#8599;</i></a>' +
        '</div>' +
        '<div class="rn-scroll"><span class="en">scroll</span><span class="zh">向下</span><i></i></div>' +
      '</header>' +

      /* ---------- 01 BACKGROUND ---------- */
      '<section class="rn-sec rn-bg">' +
        '<div class="rn-mark"><span class="rn-num">01</span><span class="rn-kicker en">Background</span><span class="rn-kicker zh">背景</span></div>' +
        '<div class="rn-split">' +
          '<h2 class="rn-h2"><span class="en">What is<br/>social gender?</span><span class="zh">何为<br/>社会性别?</span></h2>' +
          '<div class="rn-body">' +
            '<p><span class="en">Social gender refers to the expectations and norms around the roles, behaviours and characteristics of men and women, shaped by social and cultural factors. It is not solely determined by biological sex, but constructed through the interplay of social, cultural, historical and political influences.</span><span class="zh">社会性别,指围绕男性与女性的角色、行为与特质所形成的期待与规范,由社会与文化因素塑造。它并非仅由生理性别决定,而是在社会、文化、历史与政治的相互作用中被建构出来。</span></p>' +
            '<p><span class="en">Traditional norms assign fixed roles by gender, breeding prejudice against those who do not conform — a man who shows tenderness is ridiculed; a woman who pursues a career is blamed for neglecting her family. This stifles the potential of countless individuals. To focus on social gender is to question that irrationality, to free each person to develop their own talents, and to make the distribution of social resources more just.</span><span class="zh">传统规范按性别分派固定角色,催生对不顺从者的偏见——温柔的男性被嘲笑,追求事业的女性被指责忽视家庭。这压抑了无数人的潜能。关注"社会性别",正是为了反思这种不合理,让每个人自由发展天赋,也让社会资源的分配更趋公正。</span></p>' +
          '</div>' +
        '</div>' +

        '<div class="rn-quoteblock">' +
          '<div class="rn-bigquote"><span class="en">&ldquo;the gender of rain&rdquo;</span><span class="zh">「雨的性别」</span></div>' +
          '<p class="rn-quotebody"><span class="en">The concept comes from the Ihanzu people of Tanzania. In their cosmology, gender is not confined to human society — it permeates all of nature. Rain, land, rivers, even the wind carry gender. Light rain is &ldquo;female&rdquo;, nurturing; storms are &ldquo;male&rdquo;, powerful. The idea challenges our narrow definitions: gender is diverse and fluid, and everything in nature may possess a gender of its own.</span><span class="zh">这一概念源自坦桑尼亚的 Ihanzu 人。在他们的宇宙观里,性别并不局限于人类社会,而是渗透进整个自然——雨、土地、河流,甚至风,都带有各自的性别。细雨是"阴性"的、滋养的;暴雨是"阳性"的、强力的。这挑战了我们狭隘的定义:性别是多元而流动的,自然万物或许都拥有自己的性别。</span></p>' +
        '</div>' +

        '<div class="rn-duo">' +
          '<figure><img src="' + A + 'p1-4.png" alt="gender collage" /><figcaption><span class="en">Gender is taught from childhood — long before we choose it.</span><span class="zh">性别从童年起就被教导——远在我们自己选择之前。</span></figcaption></figure>' +
          '<figure><img src="' + A + 'p2-3.png" alt="gender collage" /><figcaption><span class="en">Bodies pressed into shape by expectation.</span><span class="zh">被期待压塑成形的身体。</span></figcaption></figure>' +
        '</div>' +
      '</section>' +

      /* ---------- 02 RESEARCH / INTERVIEW ---------- */
      '<section class="rn-sec rn-research">' +
        '<div class="rn-mark"><span class="rn-num">02</span><span class="rn-kicker en">Research &amp; interview</span><span class="rn-kicker zh">研究 · 访谈</span></div>' +
        '<h2 class="rn-h2 rn-h2-wide"><span class="en">Who carries the water, and who is left out</span><span class="zh">谁在取水,谁被排除在外</span></h2>' +
        '<div class="rn-stats">' +
          '<div class="rn-stat"><b>70%</b><p><span class="en">of the world&rsquo;s water management &amp; collection is carried out by women</span><span class="zh">全球的水资源管理与取水工作由女性承担</span></p></div>' +
          '<div class="rn-stat"><b>43%</b><p><span class="en">women&rsquo;s average share of the agricultural labour force in developing countries</span><span class="zh">发展中国家农业劳动力中女性的平均占比</span></p></div>' +
          '<div class="rn-stat"><b>25%</b><p><span class="en">women in the global technology workforce</span><span class="zh">全球科技从业者中的女性比例</span></p></div>' +
          '<div class="rn-stat"><b>18%</b><p><span class="en">women among artificial-intelligence researchers</span><span class="zh">人工智能研究者中的女性比例</span></p></div>' +
          '<div class="rn-stat"><b>11%</b><p><span class="en">women at the executive level of the tech industry</span><span class="zh">科技行业高管层中的女性比例</span></p></div>' +
        '</div>' +
        '<figure class="rn-wide">' +
          '<img src="' + A + 'p2-5.png" alt="women working with technology" />' +
          '<figcaption><span class="en">In the fields shaping the future — STEM, the green economy, AI — women remain severely underrepresented, and progress in closing the gap is slow.</span><span class="zh">在塑造未来的领域——STEM、绿色经济、人工智能——女性的代表性严重不足,而弥合这一差距的进展十分缓慢。</span></figcaption>' +
        '</figure>' +

        '<div class="rn-voices">' +
          '<div class="rn-voice"><span class="rn-vtag">Matt</span><h4><span class="en">Rain &amp; gender</span><span class="zh">雨与性别</span></h4><p><span class="en">In Ihanzu culture rain is gendered — light rain &ldquo;female&rdquo; and nurturing, storms &ldquo;male&rdquo; and powerful. The idea grows from agricultural life and shows up in ritual and social roles.</span><span class="zh">在 Ihanzu 文化中,雨是有性别的——细雨"阴性"而滋养,暴雨"阳性"而强力。这源自农耕生活,并体现在仪式与社会角色中。</span></p></div>' +
          '<div class="rn-voice"><span class="rn-vtag">Linda</span><h4><span class="en">Gender &amp; culture</span><span class="zh">性别与文化</span></h4><p><span class="en">Gendering rain expands our view of gender — not only a social construct, but a cultural lens for understanding nature itself.</span><span class="zh">为雨赋予性别,拓宽了我们对性别的理解——它不只是社会建构,更是理解自然本身的一种文化视角。</span></p></div>' +
          '<div class="rn-voice"><span class="rn-vtag">Amina</span><h4><span class="en">Modern lessons</span><span class="zh">当代启示</span></h4><p><span class="en">The belief reveals a balance between humans and nature — a reminder to respect nature as we confront climate issues.</span><span class="zh">这一信仰揭示了人与自然之间的平衡——提醒我们在面对气候问题时心怀敬畏。</span></p></div>' +
          '<div class="rn-voice rn-voice-sum"><span class="rn-vtag"><span class="en">Summary</span><span class="zh">总结</span></span><h4><span class="en">Global value</span><span class="zh">普世价值</span></h4><p><span class="en">Though rooted in one specific culture, its symbolism of balance, strength and nurture carries universal relevance, offering lessons for today&rsquo;s world.</span><span class="zh">尽管根植于某一具体文化,其关于平衡、力量与滋养的象征却具有普世意义,为当今世界提供启示。</span></p></div>' +
        '</div>' +
      '</section>' +

      /* ---------- 03 DESIGN CONCEPT ---------- */
      '<section class="rn-sec rn-design">' +
        '<div class="rn-mark"><span class="rn-num">03</span><span class="rn-kicker en">Design concept</span><span class="rn-kicker zh">设计概念</span></div>' +
        '<h2 class="rn-h2 rn-h2-wide"><span class="en">Visitors become the rain</span><span class="zh">观众即雨</span></h2>' +
        '<p class="rn-lead"><span class="en">If rain were given a gender, each kind of rain would nourish the land in its own way — a brief, violent downpour as power and new beginnings; gentle, persistent rain as nourishment and the continuity of life. In the space, visitors themselves become &ldquo;rain&rdquo;: screens on either side cast their rain-like silhouettes, and as they walk, coloured traces of rainfall are left behind — each colour a different gender of rain, each the essence of a human being.</span><span class="zh">倘若雨也有性别,不同的雨便会以各自的方式滋养土地——短促而猛烈的暴雨是力量与新生;温柔而绵长的细雨是滋养与生命的延续。在展场中,观众自己成为"雨":两侧的屏幕投出他们如雨般的剪影,行走时留下彩色的雨痕——每一种颜色都是一种不同性别的雨,也是一个人的本质。</span></p>' +

        /* TouchDesigner */
        '<div class="rn-tool">' +
          '<div class="rn-tool-head"><span class="rn-tool-name">TouchDesigner</span><span class="rn-kicker en">Traces of the self</span><span class="rn-kicker zh">自我的痕迹</span></div>' +
          '<p class="rn-tool-body"><span class="en">I used TouchDesigner to simulate a person&rsquo;s contact with the ground as rain splashing onto a surface. Starting from a single raindrop, I added noise and expanded the drop to capture rain&rsquo;s irregularity, building a richer, more varied rainfall. The traces left on the ground stand for the pure essence of &ldquo;self&rdquo;, dissolving into the surface with no boundary and no distinction — the natural flow of each visitor&rsquo;s presence within the space.</span><span class="zh">我用 TouchDesigner 把人与地面的接触,模拟成雨滴溅落于表面的效果。从单一雨滴出发,加入噪声并扩展雨滴本身,以还原雨的不规则,生成更丰富多变的降雨。落在地面的"痕迹"代表"自我"最纯粹的本质——它与地表融为一体,没有边界、没有区分,是每位观众在空间中自然流动、消融的存在。</span></p>' +
          '<div class="rn-tool-imgs">' +
            '<img src="' + A + 'p3-6.png" alt="TouchDesigner liquid displacement" />' +
            '<img src="' + A + 'p3-11.png" alt="rain trace output" />' +
            '<img src="' + A + 'p3-10.png" alt="rain texture" />' +
          '</div>' +
        '</div>' +

        /* Processing */
        '<div class="rn-tool">' +
          '<div class="rn-tool-head"><span class="rn-tool-name">Processing</span><span class="rn-kicker en">H · U · M · A · N</span><span class="rn-kicker zh">人之五景</span></div>' +
          '<p class="rn-tool-body"><span class="en">In Processing I built raindrop scenes for the letters H&nbsp;U&nbsp;M&nbsp;A&nbsp;N, each in its own palette. Every drop follows a more random process — varying in intensity and rhythm — to express the differently &ldquo;gendered&rdquo; sensations of rain. Yet this gender has no fixed definition; it may simply be a letter, a fluid and intangible existence. Each drop is a unique feeling that needs no definition. It simply exists, and connects, quietly, with both the environment and the individual.</span><span class="zh">在 Processing 中,我为字母 H&nbsp;U&nbsp;M&nbsp;A&nbsp;N 各自构建了一组雨景,赋予不同的色彩。每一滴雨都遵循更随机的过程——强度与节奏各异——以表达雨那"被性别化"的不同感受。然而这种性别没有固定定义,它或许只是一个字母,一种流动而无形的存在。每一滴雨都是独一无二的感受,无需被定义;它只是存在着,并悄然与环境、与个体相连。</span></p>' +
          '<div class="rn-letters">' +
            '<figure><img src="' + A + 'p4-3.png" alt="rain scene H" /><figcaption>H</figcaption></figure>' +
            '<figure><img src="' + A + 'p4-4.png" alt="rain scene U" /><figcaption>U</figcaption></figure>' +
            '<figure><img src="' + A + 'p4-5.png" alt="rain scene M" /><figcaption>M</figcaption></figure>' +
            '<figure><img src="' + A + 'p4-2.png" alt="rain scene A" /><figcaption>A</figcaption></figure>' +
            '<figure><img src="' + A + 'p4-6.png" alt="rain scene N" /><figcaption>N</figcaption></figure>' +
          '</div>' +
          '<figure class="rn-code"><img src="' + A + 'p4-7.png" alt="Processing source — sceneColors" /><figcaption><span class="en">sceneColors[][] — every letter carries its own spectrum of rain. Processing (Java).</span><span class="zh">sceneColors[][] —— 每个字母都拥有自己的雨色光谱。Processing(Java)。</span></figcaption></figure>' +
        '</div>' +
      '</section>' +

      /* ---------- 04 MODEL RENDERING ---------- */
      '<section class="rn-sec rn-render">' +
        '<div class="rn-mark"><span class="rn-num">04</span><span class="rn-kicker en">Model rendering</span><span class="rn-kicker zh">模型渲染</span></div>' +
        '<h2 class="rn-h2 rn-h2-wide"><span class="en">A hall of rain, where everyone becomes weather</span><span class="zh">一座雨的厅堂,人人都成为天气</span></h2>' +
        '<div class="rn-gallery">' +
          '<img class="rn-g-tall" src="' + A + 'p5-2.png" alt="exhibition render" />' +
          '<img src="' + A + 'p5-3.png" alt="exhibition render" />' +
          '<img src="' + A + 'p5-4.png" alt="exhibition render" />' +
          '<img class="rn-g-wide" src="' + A + 'p5-5.png" alt="exhibition render" />' +
        '</div>' +
      '</section>' +

      /* ---------- FOOTER ---------- */
      '<footer class="rn-foot">' +
        '<div class="rn-foot-line"><span class="en">RAIN · the gender of rain</span><span class="zh">RAIN · 雨的性别</span></div>' +
      '</footer>' +

    '</article>';
  }

  function renderRain(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    // subtle scroll-reveal
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rn-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      art.querySelectorAll('.rn-sec, .rn-duo figure, .rn-stat, .rn-voice, .rn-letters figure, .rn-gallery img').forEach(function (n) { n.classList.add('rn-rev'); io.observe(n); });
    });
    return art;
  }

  window.renderRain = renderRain;

  /* ---------------------------- styles ---------------------------- */
  var RAIN_CSS = [
'.rain-page{--rn-ink:#EAECF4;--rn-dim:#9AA0B4;--rn-bg:#0E1016;--rn-panel:#161922;--rn-line:rgba(255,255,255,.12);',
'  --rn-mag:#E8389A;--rn-cyan:#54CEF9;--rn-yel:#F6D43A;--rn-grn:#36B26B;--rn-vio:#9B7BE0;',
'  background:var(--rn-bg);color:var(--rn-ink);margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));',
'  font-family:var(--sans);line-height:1.6;overflow:hidden}',
'.lang-zh .rain-page{font-family:var(--cjk)}',
'.rain-page img{display:block;width:100%;height:100%;object-fit:cover}',

/* hero */
'.rn-hero{position:relative;min-height:78vh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}',
'.rn-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(.2) brightness(.62) contrast(1.05);z-index:-3}',
'.rn-hero-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(14,16,22,.55) 0%,rgba(14,16,22,.2) 38%,rgba(14,16,22,.92) 100%)}',
'.rn-rainfall{position:absolute;inset:0;z-index:-1;opacity:.5;mix-blend-mode:screen;',
'  background-image:repeating-linear-gradient(101deg,transparent 0 7px,rgba(255,255,255,.22) 7px 8px);',
'  background-size:auto 140px;animation:rnFall 1.05s linear infinite}',
'@keyframes rnFall{from{background-position:0 0}to{background-position:-26px 140px}}',
'@media (prefers-reduced-motion:reduce){.rn-rainfall{animation:none}}',
'.rn-hero-inner{position:relative;padding:clamp(24px,4vw,60px);padding-bottom:clamp(40px,6vw,78px);max-width:1100px}',
'.rn-eyebrow{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--rn-cyan);margin-bottom:clamp(14px,2vw,22px)}',
'.lang-zh .rn-eyebrow{font-family:var(--cjk);letter-spacing:.14em}',
'.rn-title{font-family:var(--display);font-weight:800;font-size:clamp(78px,18vw,260px);line-height:.84;letter-spacing:-.02em;',
'  background:linear-gradient(96deg,#fff 0%,var(--rn-cyan) 46%,var(--rn-mag) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.rn-sub{font-family:var(--serif);font-style:italic;font-size:clamp(22px,3.6vw,46px);color:#fff;margin-top:clamp(6px,1vw,12px)}',
'.lang-zh .rn-sub{font-family:var(--cjk);font-style:normal;font-weight:700}',
'.rn-tagline{max-width:40ch;font-size:clamp(15px,1.6vw,20px);color:var(--rn-ink);margin-top:clamp(16px,2.2vw,26px);text-wrap:pretty}',
'.rn-meta{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,54px);margin-top:clamp(22px,3vw,34px);padding-top:clamp(18px,2.4vw,26px);border-top:1px solid var(--rn-line)}',
'.rn-meta span{display:flex;flex-direction:column;gap:3px}',
'.rn-meta b{font-size:clamp(14px,1.4vw,17px);font-weight:600;color:#fff}',
'.rn-meta i{font-family:var(--mono);font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--rn-dim)}',
'.lang-zh .rn-meta i{font-family:var(--cjk);letter-spacing:.08em}',
'.rn-scroll{position:absolute;right:clamp(20px,4vw,54px);bottom:clamp(26px,4vw,46px);display:flex;flex-direction:column;align-items:center;gap:8px;',
'  font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--rn-dim)}',
'.rn-scroll i{width:1px;height:40px;background:linear-gradient(var(--rn-cyan),transparent);animation:rnDrip 1.6s ease-in-out infinite}',
'@keyframes rnDrip{0%{transform:scaleY(.3);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(.3);transform-origin:top}}',

/* section frame */
'.rn-sec{padding:clamp(54px,8vw,118px) clamp(24px,5vw,86px);max-width:1280px;margin:0 auto;border-top:1px solid var(--rn-line)}',
'.rn-mark{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,4vw,48px)}',
'.rn-num{font-family:var(--mono);font-size:clamp(13px,1.3vw,15px);color:var(--rn-mag);letter-spacing:.1em}',
'.rn-kicker{font-family:var(--mono);font-size:clamp(11px,1.1vw,13px);letter-spacing:.26em;text-transform:uppercase;color:var(--rn-dim)}',
'.lang-zh .rn-kicker{font-family:var(--cjk);letter-spacing:.12em}',
'.rn-h2{font-family:var(--display);font-weight:800;font-size:clamp(34px,5.4vw,76px);line-height:1.02;letter-spacing:-.015em;color:#fff}',
'.lang-zh .rn-h2{font-weight:900}',
'.rn-h2-wide{max-width:18ch;margin-bottom:clamp(30px,4vw,52px)}',

/* background split */
'.rn-split{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:clamp(28px,5vw,70px);align-items:start}',
'.rn-body p{font-family:var(--serif);font-size:clamp(16px,1.5vw,20px);line-height:1.72;color:var(--rn-ink);margin-bottom:1.1em;text-wrap:pretty}',
'.lang-zh .rn-body p{font-family:var(--cjk);line-height:1.95}',
'.rn-quoteblock{margin-top:clamp(48px,7vw,96px);text-align:center;padding:clamp(30px,5vw,60px) 0}',
'.rn-bigquote{font-family:var(--serif);font-style:italic;font-size:clamp(38px,7vw,104px);line-height:1;',
'  background:linear-gradient(96deg,var(--rn-cyan),var(--rn-mag));-webkit-background-clip:text;background-clip:text;color:transparent}',
'.lang-zh .rn-bigquote{font-family:var(--cjk);font-style:normal;font-weight:900}',
'.rn-quotebody{max-width:62ch;margin:clamp(22px,3vw,34px) auto 0;font-size:clamp(15px,1.5vw,19px);color:var(--rn-dim);text-wrap:pretty}',
'.rn-duo{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.4vw,30px);margin-top:clamp(36px,5vw,64px)}',
'.rn-duo figure{margin:0}',
'.rn-duo img{aspect-ratio:4/3;border:1px solid var(--rn-line)}',
'.rn-duo figcaption,.rn-wide figcaption,.rn-code figcaption{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--rn-dim);margin-top:12px;line-height:1.5}',
'.lang-zh .rn-duo figcaption,.lang-zh .rn-wide figcaption,.lang-zh .rn-code figcaption{font-family:var(--cjk)}',

/* research */
'.rn-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(14px,2vw,26px);margin-bottom:clamp(40px,6vw,72px)}',
'.rn-stat{border-top:2px solid var(--rn-mag);padding-top:14px}',
'.rn-stat b{display:block;font-family:var(--display);font-weight:800;font-size:clamp(30px,4.4vw,60px);line-height:1;color:#fff}',
'.rn-stat p{font-size:clamp(12px,1.1vw,14px);color:var(--rn-dim);margin-top:10px;line-height:1.45}',
'.rn-wide{margin:0 0 clamp(40px,6vw,72px)}',
'.rn-wide img{aspect-ratio:21/9;border:1px solid var(--rn-line)}',
'.rn-voices{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,2vw,24px)}',
'.rn-voice{background:var(--rn-panel);border:1px solid var(--rn-line);border-left:3px solid var(--rn-cyan);padding:clamp(20px,2.4vw,30px)}',
'.rn-voice-sum{border-left-color:var(--rn-mag)}',
'.rn-vtag{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--rn-cyan)}',
'.rn-voice-sum .rn-vtag{color:var(--rn-mag)}',
'.rn-voice h4{font-family:var(--display);font-weight:700;font-size:clamp(18px,2vw,24px);color:#fff;margin:8px 0 12px}',
'.lang-zh .rn-voice h4{font-weight:900}',
'.rn-voice p{font-size:clamp(14px,1.3vw,16px);color:var(--rn-ink);line-height:1.62;text-wrap:pretty}',

/* design / tools */
'.rn-lead{font-family:var(--serif);font-size:clamp(18px,2.1vw,28px);line-height:1.55;color:#fff;max-width:30ch;text-wrap:pretty}',
'.lang-zh .rn-lead{font-family:var(--cjk);line-height:1.8}',
'.rn-tool{margin-top:clamp(48px,7vw,92px)}',
'.rn-tool-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--rn-line);margin-bottom:clamp(22px,3vw,34px)}',
'.rn-tool-name{font-family:var(--display);font-weight:800;font-size:clamp(22px,3vw,40px);color:#fff}',
'.rn-tool-body{max-width:72ch;font-size:clamp(15px,1.4vw,18px);color:var(--rn-ink);line-height:1.72;margin-bottom:clamp(24px,3vw,38px);text-wrap:pretty}',
'.lang-zh .rn-tool-body{line-height:1.95}',
'.rn-tool-imgs{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:clamp(12px,1.6vw,20px)}',
'.rn-tool-imgs img{aspect-ratio:16/10;border:1px solid var(--rn-line);background:#000}',
'.rn-tool-imgs img:nth-child(2),.rn-tool-imgs img:nth-child(3){aspect-ratio:4/5}',
'.rn-letters{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(10px,1.4vw,18px)}',
'.rn-letters figure{margin:0;position:relative;border:1px solid var(--rn-line);background:#000;overflow:hidden}',
'.rn-letters img{aspect-ratio:4/3;filter:saturate(1.15)}',
'.rn-letters figcaption{position:absolute;left:10px;top:8px;font-family:var(--display);font-weight:800;font-size:clamp(18px,2vw,28px);color:#fff;text-shadow:0 1px 6px #000;letter-spacing:.05em}',
'.rn-code{margin:clamp(20px,3vw,32px) 0 0}',
'.rn-code img{aspect-ratio:16/9;object-fit:cover;object-position:top left;border:1px solid var(--rn-line);background:#1e1e1e}',

/* render gallery */
'.rn-gallery{display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,24px)}',
'.rn-gallery img{aspect-ratio:16/11;border:1px solid var(--rn-line);background:#000}',
'.rn-g-tall{grid-row:span 2;aspect-ratio:auto!important;height:100%}',
'.rn-g-wide{grid-column:1/-1;aspect-ratio:21/9!important}',

/* footer */
'.rn-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;',
'  padding:clamp(40px,6vw,80px) clamp(24px,5vw,86px);border-top:1px solid var(--rn-line);max-width:1280px;margin:0 auto}',
'.rn-foot-line{font-family:var(--mono);font-size:clamp(12px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;color:var(--rn-dim)}',
'.lang-zh .rn-foot-line{font-family:var(--cjk);letter-spacing:.08em}',
'.rn-pdf{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;',
'  color:#fff;text-decoration:none;padding:13px 24px;border:1.5px solid var(--rn-cyan);transition:background .2s,color .2s,transform .2s}',
'.lang-zh .rn-pdf{font-family:var(--cjk)}',
'.rn-pdf:hover{background:var(--rn-cyan);color:#06222e;transform:translateY(-2px)}',
'.rn-pdf i{font-style:normal;font-size:15px}',
'.rn-pdf-hero{margin-top:clamp(22px,3vw,30px)}',

/* reveal */
'.rn-rev{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
'.rn-rev.rn-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.rn-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:860px){',
'  .rn-split{grid-template-columns:1fr}',
'  .rn-stats{grid-template-columns:repeat(2,1fr)}',
'  .rn-voices,.rn-duo,.rn-gallery{grid-template-columns:1fr}',
'  .rn-tool-imgs{grid-template-columns:1fr 1fr}',
'  .rn-tool-imgs img:first-child{grid-column:1/-1;aspect-ratio:16/10}',
'  .rn-letters{grid-template-columns:repeat(2,1fr)}',
'  .rn-g-tall{grid-row:auto;height:auto;aspect-ratio:16/11!important}',
'}'
  ].join('\n');

})();
