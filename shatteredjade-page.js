/* ============================================================================
   shatteredjade-page.js — bespoke long-form case study for SHATTERED JADE 碎玉,
   the MA dissertation (CCME0136, UCL IOE, 2026) + UE5 rogue-lite. Exposes
   window.renderShatteredJade(item), called by works-render.js for
   id==='shatteredjade'. Night-arena theme: teal-black ground, talisman paper,
   seal red, jade. English excerpts are verbatim from the dissertation; Chinese
   is the site translation. Bilingual via .en/.zh spans.
   ========================================================================== */
(function () {
  'use strict';
  var A = 'assets/shatteredjade/';
  var VIDS = [
    { id: 'BlRSMyHMzg8', t_en: 'Dawn: the boss fight', t_zh: '黎明：Boss 战',
      s_en: 'The countdown ends and the night’s pressure takes a single body: Black Netherclaw.', s_zh: '倒计时归零，整夜累积的压力凝成一具身体：黑幽螯。' },
    { id: '_i23TkfVRrI', t_en: 'A night in the arena', t_zh: '夜中一局',
      s_en: 'Ring-spawn, talismans, jade shards, the level-up circle.', s_zh: '环形刷怪、符纸、碎玉、升级法阵。' }
  ];
  function b(en, zh) { return '<span class="en">' + en + '</span><span class="zh">' + zh + '</span>'; }
  function img(src, alt, cls) { return '<figure class="sj-fig ' + (cls || '') + '"><img src="' + A + src + '" alt="' + alt + '" loading="lazy" /></figure>'; }
  function cap(en, zh) { return '<figcaption class="sj-cap">' + b(en, zh) + '</figcaption>'; }
  function mark(n, en, zh) { return '<div class="sj-mark"><span class="sj-num">' + n + '</span><span class="sj-kicker">' + b(en, zh) + '</span></div>'; }
  function facade(v) {
    return '<div class="sj-vid"><button class="sj-yt" type="button" data-yt="' + v.id + '" style="background-image:url(https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg)" aria-label="Play: ' + v.t_en + '"><span class="sj-play" aria-hidden="true"></span></button>' +
      '<div class="sj-vid-t"><h4>' + b(v.t_en, v.t_zh) + '</h4><p>' + b(v.s_en, v.s_zh) + '</p></div></div>';
  }

  var ENEMIES = [
    { en: 'Spider', zh: '蜘蛛', k_en: 'The net of relations', k_zh: '关系网',
      d_en: 'Its two defining behaviours, weaving and waiting, map onto an ambient web of relations, obligations and watching eyes that surrounds a person and tightens quietly. Each spider is weak, like any single aunt’s question; the danger is only ever the accumulation, and killing spiders never empties the arena, because the net repairs itself.',
      d_zh: '织网与等待，正对应那张由关系、义务与注视织成的网：包围一个人，悄悄收紧。每只蜘蛛都很弱，像任何一位阿姨的一句追问；危险永远只在累积。杀掉蜘蛛也清不空场地，因为网会自己修复。' },
    { en: 'Bat', zh: '蝙蝠', k_en: 'Pressure disguised as blessing', k_zh: '伪装成祝福的压力',
      d_en: 'In Chinese decoration a lucky sign, because its name sounds like the word for blessing; as an enemy it is the pressure that arrives disguised as good wishes, the “we only want you to be happy” voice, and it is faster than the spider, because kindly pressure is the hardest to dodge.',
      d_zh: '“蝠”谐“福”，在中国装饰里是吉兆；作为敌人，它是披着好意的压力，那句“我们只是希望你幸福”。它比蜘蛛更快，因为善意的压力最难躲开。' },
    { en: 'Bird-man', zh: '鸟人', k_en: 'Pressure across distance', k_zh: '跨越距离的压力',
      d_en: 'Attacks from a distance, throwing feathers: the pressure that does not need to be near you to reach you, the phone call, the relayed remark; moving far away does not move the player out of its range.',
      d_zh: '远距离投掷羽毛：不必靠近就能触及你的压力，一通电话、一句转述。搬得再远，也走不出它的射程。' },
    { en: 'Charging elites', zh: '冲锋精英', k_en: 'The direct confrontation', k_zh: '正面的对峙',
      d_en: 'The rare direct confrontation, the relative who says it to your face: fewer, stronger, impossible to ignore.',
      d_zh: '罕见的正面对峙，当面说出来的那位亲戚：更少、更强、无法忽视。' },
    { en: 'Black Netherclaw', zh: '黑幽螯', k_en: 'The boss at dawn', k_zh: '黎明的 Boss',
      d_en: 'All of it gathered into one body. Like the exam in Chinese Parents, the night ends not by passing time but by facing the single test everything was building toward.',
      d_zh: '整夜的一切聚成一具身体。如同《中国式家长》里的高考，夜不因时间流逝而结束，而以一场所有积累都指向的考验收尾。' }
  ];
  var PAIRS = [
    { s_en: 'Endurance', s_zh: '忍受', a_en: 'Forbearance', a_zh: '忍耐', a_d: '+ max health', b_en: 'Respite', b_zh: '喘息', b_d: '+ regeneration',
      d_en: 'Forbearance blocks nothing; it only increases how much can be absorbed before collapse, which is what endurance is.', d_zh: '“忍耐”不抵挡任何东西，只是提高崩溃前能承受的总量——这正是忍受的本义。' },
    { s_en: 'Evasion', s_zh: '游移', a_en: 'Swift Step', a_zh: '神行', a_d: '+ speed', b_en: 'Spirit-Draw', b_zh: '灵引', b_d: '+ pickup radius',
      d_en: 'Ahmed’s idea of finding other paths (2006) turned into movement statistics.', d_zh: 'Ahmed 所说的“寻找另一条路”（2006），化为移动数值。' },
    { s_en: 'Self-making', s_zh: '自立', a_en: 'Insight', a_zh: '洞察', a_d: '+ experience', b_en: 'Self-Reliance', b_zh: '自持', b_d: '+ money',
      d_en: 'Economic independence as the most concrete defence against family pressure (Kong, 2011; Rofel, 2007).', d_zh: '经济独立是对抗家庭压力最具体的防线（Kong, 2011; Rofel, 2007）。' }
  ];
  var TABLE = [
    ['Continuous ring-spawn of enemies; the arena is never cleared', '敌人在环上持续生成；场地永不清空', 'Threat from all directions; each enemy weak, the accumulation dangerous', '威胁来自四面八方；单个很弱，累积致命', 'Guanxi wang, the self-renewing web of relations; pressure as recurring condition', '关系网：自我修复的关系之网；压力作为反复出现的状态', 'Kam (2013); Fei (1992)'],
    ['Fixed top-down camera', '固定俯视镜头', 'Watching the daoshi from above, small in the arena', '从上方看着场中渺小的道士', 'Surveillance and internalised visibility; the player as overseeing eye', '监视与内化的可见性；玩家即俯视之眼', 'Foucault (1977); Pozo (2018)'],
    ['Talismans and mantras that dispel rather than kill', '驱散而非杀戮的符与咒', 'Throwing writing; reciting protection; no killing of persons', '掷出文字；念诵护佑；不杀任何人', 'Discursive pressure answered with language; no violence against family', '以语言回应话语的压力；不对家人施暴', 'Bogost (2007); Chou (2000)'],
    ['Jade-shard upgrades in three pairs', '三对碎玉升级', 'Choosing capacities, none of them aggressive', '选择能力，无一是攻击性的', 'Endurance, evasion and self-making as survival strategies', '忍受、游移与自立三种生存策略', 'Sedgwick (1990); Ahmed (2006); Kong (2011); Rofel (2007)'],
    ['A default talisman plus five spell slots; six passive choices; nothing unlearned within a run', '一张默认符加五个法术栏；六次被动选择；局内不可撤销', 'Committing to a build under escalating waves; a mismatched build never reaches full power', '在不断升级的敌潮下押定一套构筑；错配的构筑永远到不了满力', 'Commitment to a survival strategy before knowing whether it will hold', '在不知能否撑住之前，就必须选定生存策略', 'Kam (2013); Kong (2011); Ahmed (2006)'],
    ['Full reset at death', '死亡即全部重置', 'Failure without profit; every run begins from nothing', '失败毫无收益；每一局从零开始', 'Pressure renewed from zero at every festival; queer failure', '每个节日压力从零重来；酷儿式失败', 'Halberstam (2011); Juul (2013); Kam (2013)'],
    ['No narrative', '没有叙事', 'Nothing announced or explained', '什么都不宣告、不解释', 'Silence as the form of the pressure; coming home rather than coming out', '沉默即压力的形式；“回家”而非“出柜”', 'Chou (2000); Ellis (2007); Sicart (2011)']
  ];
  var SPELLS = [
    ['Exorcism Talisman', '驱煞符', 'strikes one demon', '击中单个妖邪', '10 / 0.7s', 't'],
    ['Thunder Talisman', '雷符', 'a slow drifting orb damaging all it touches', '缓慢漂移的雷球，触者皆伤', '10 / 3s', 't'],
    ['Blossom Talisman', '散花符', 'four homing talismans', '四张追踪符', '10 / 4s', 't'],
    ['Spirit-Fire Talisman', '鬼火符', 'a field of spirit fire', '一片鬼火', '10 / 4.5s', 't'],
    ['Guardian Talisman', '护身符', 'charms orbiting the body', '环绕身体的符', '10 / 6s', 't'],
    ['Ghost-Expelling Mantra', '驱鬼咒', 'a body-centred aura', '以身为心的灵光', '5 / 0.6s', 'm'],
    ['Five Thunders Mantra', '五雷咒', 'thunder at the target point', '目标点落雷', '18 / 4.5s', 'm'],
    ['Golden Light Mantra', '金光咒', 'a shield that negates incoming attacks', '抵消攻击的护盾', '0 / 10s', 'm'],
    ['Da Wei Tian Long', '大威天龙', 'massive damage to the whole arena', '全场巨额伤害', '2000 / 90s', 'm']
  ];

  function enemiesHTML() {
    return ENEMIES.map(function (e, i) {
      return '<div class="sj-beast"><span class="sj-beast-n">0' + (i + 1) + '</span><h4>' + b(e.en, e.zh) + '</h4><span class="sj-beast-k">' + b(e.k_en, e.k_zh) + '</span><p>' + b(e.d_en, e.d_zh) + '</p></div>';
    }).join('');
  }
  function pairsHTML() {
    return PAIRS.map(function (p) {
      return '<div class="sj-pair"><span class="sj-pair-s">' + b(p.s_en, p.s_zh) + '</span>' +
        '<div class="sj-shards"><div class="sj-shard"><i></i><b>' + b(p.a_en, '碎玉·' + p.a_zh) + '</b><span>' + p.a_d + '</span></div><div class="sj-shard"><i></i><b>' + b(p.b_en, '碎玉·' + p.b_zh) + '</b><span>' + p.b_d + '</span></div></div>' +
        '<p>' + b(p.d_en, p.d_zh) + '</p></div>';
    }).join('');
  }
  function tableHTML() {
    return '<div class="sj-table" role="table"><div class="sj-tr sj-th" role="row"><span>' + b('Mechanic', '机制') + '</span><span>' + b('What the player experiences', '玩家体验到的') + '</span><span>' + b('Pressure or concept modelled', '所模拟的压力或概念') + '</span><span>' + b('Theoretical anchor', '理论锚点') + '</span></div>' +
      TABLE.map(function (r) { return '<div class="sj-tr" role="row"><span class="sj-td-m">' + b(r[0], r[1]) + '</span><span>' + b(r[2], r[3]) + '</span><span>' + b(r[4], r[5]) + '</span><span class="sj-td-a">' + r[6] + '</span></div>'; }).join('') + '</div>';
  }
  function spellsHTML() {
    return SPELLS.map(function (s) {
      return '<div class="sj-spell sj-spell-' + s[5] + '"><span class="sj-spell-k">' + (s[5] === 't' ? b('Talisman · thrown', '符 · 掷出') : b('Mantra · spoken', '咒 · 念诵')) + '</span><h4>' + b(s[0], s[1]) + '</h4><p>' + b(s[2], s[3]) + '</p><span class="sj-spell-n">' + s[4] + '</span></div>';
    }).join('');
  }
  function slotsHTML() {
    var h = '<div class="sj-slots" aria-hidden="true"><div class="sj-slot-row"><span class="sj-slot is-on">' + b('default', '默认') + '</span>';
    for (var i = 0; i < 5; i++) h += '<span class="sj-slot">' + b('spell', '法术') + '</span>';
    h += '</div><div class="sj-slot-row">';
    for (var j = 0; j < 6; j++) h += '<span class="sj-slot sj-slot-p">' + b('passive', '被动') + '</span>';
    return h + '</div><span class="sj-slots-l">' + b('1 default talisman + 5 spell slots · 6 passive choices · nothing unlearned within a run', '1 张默认符 + 5 个法术栏 · 6 次被动选择 · 局内不可撤销') + '</span></div>';
  }

  function html() {
    return '' +
    '<article class="sj-page" id="case-papers-shatteredjade" data-screen-label="Shattered Jade">' +

    /* HERO */
    '<header class="sj-hero" style="background-image:url(' + A + 'lv45.jpg)">' +
      '<div class="sj-hero-veil" aria-hidden="true"></div>' +
      '<div class="sj-hero-inner">' +
        '<div class="sj-eyebrow">' + b('MA Dissertation · CCME0136 · UCL Institute of Education · 2026', '硕士论文 · CCME0136 · UCL 教育学院 · 2026') + '</div>' +
        '<div class="sj-titles"><span class="sj-han" lang="zh">碎玉</span><div class="sj-title-r"><h1 class="sj-title">Shattered<br/>Jade</h1><span class="sj-seal" lang="zh">碎<br/>玉</span></div></div>' +
        '<p class="sj-sub">' + b('Proceduralising Filial Pressure and Queer Survival in a Sinophone Exorcism Rogue-lite', '在华语驱邪 Rogue-lite 中，将孝道压力与酷儿生存程序化') + '</p>' +
        '<p class="sj-lead">' + b('Every Spring Festival, the Chinese New Year and the year’s main family gathering, the same question arrives at the same table, asked by a different aunt; never shouted, folded into a compliment, a cousin’s wedding. For a gay son in a mainland Chinese family, the pressure to marry and continue the family line is not a single event to be survived once. It is a constant background condition.', '每逢春节，一年里最重要的家庭聚会，同一个问题总会在同一张桌上出现，只是换了一位阿姨来问；从不高声，而是折进一句夸奖、一场表亲的婚礼里。对一个中国大陆家庭里的同性恋儿子来说，结婚、传宗接代的压力不是一次性熬过去就完的事件。它是一种持续的背景状态。') + '</p>' +
        '<div class="sj-meta">' +
          '<span><i>' + b('Engine', '引擎') + '</i><b>Unreal Engine 5 · Blueprints</b></span>' +
          '<span><i>' + b('Form', '形态') + '</i><b>' + b('Rogue-lite survival game + 6,597-word dissertation', 'Rogue-lite 生存游戏 + 6,597 词论文') + '</b></span>' +
          '<span><i>' + b('Role', '角色') + '</i><b>' + b('Solo: design, Blueprints, art, writing', '独立完成：设计 · 蓝图 · 美术 · 写作') + '</b></span>' +
          '<span><i>' + b('Method', '方法') + '</i><b>' + b('Practice research · autoethnography', '实践研究 · 自我民族志') + '</b></span>' +
        '</div>' +
      '</div>' +
    '</header>' +

    /* VIDEOS */
    '<section class="sj-sec sj-sec-vids">' + mark('▶', 'Footage', '实机') +
      '<div class="sj-vids">' + VIDS.map(facade).join('') + '</div>' +
    '</section>' +

    /* 01 ABSTRACT */
    '<section class="sj-sec">' + mark('01', 'Abstract', '摘要') +
      '<div class="sj-split">' +
        '<p class="sj-abstract">' + b('This dissertation investigates how the pressures of filial expectation and queer survival in a mainland Chinese family can be turned into the systems of a rogue-lite game, and what the process of doing so reveals to the designer who has lived those pressures. The practical project is Shattered Jade, a survival game built in Unreal Engine 5 in which a Daoist priest survives waves of creatures that stand for social pressure, using paper talismans, and rebuilds himself from shards of jade. The findings show that the basic decisions a game forces on its designer, what an enemy is, what a weapon does, and what death costs, can turn a vague and unspoken pressure into a clear structure that can be seen, named and played. The project offers a worked example of queer game mechanics in a Chinese context, and argues that a game with no written plot is not a game without a story: it tells its story through what the player does and feels.', '本论文探讨：中国大陆家庭中的孝道期待与酷儿生存所带来的压力，如何被转化为一款 rogue-lite 游戏的系统；而这一转化过程，又向亲历过这些压力的设计者揭示了什么。实践项目《碎玉》是一款用 Unreal Engine 5 制作的生存游戏：一位道士以纸符抵御象征社会压力的一波波妖物，并从碎玉中重建自己。研究发现，游戏迫使设计者做出的基本决定——敌人是什么、武器做什么、死亡付出什么——足以把一种模糊、不可言说的压力，变成可见、可命名、可游玩的清晰结构。项目为中国语境下的酷儿游戏机制提供了一个可检验的范例，并主张：没有书面剧情的游戏并不是没有故事的游戏，它借玩家所做与所感来讲述。') + '</p>' +
        '<div class="sj-rqs">' +
          '<div class="sj-rq"><span class="sj-rq-k">' + b('Main question', '主问题') + '</span><p>' + b('How does the process of making a rogue-lite game, including the mechanics I build and discard, allow me to explore what it means to turn the pressures of filial expectation and queer survival that I have lived into game systems?', '制作一款 rogue-lite 游戏的过程——包括我建立与放弃的那些机制——如何让我探索：把亲历的孝道期待与酷儿生存的压力转化为游戏系统，究竟意味着什么？') + '</p></div>' +
          '<div class="sj-rq"><span class="sj-rq-k">' + b('Secondary question', '次问题') + '</span><p>' + b('How does designing from London, at a distance from my family, shape the forms the game takes?', '身在伦敦、远离家庭地进行设计，如何塑造了这款游戏的形态？') + '</p></div>' +
          '<div class="sj-keys">' + b('queer game studies · procedural rhetoric · filial piety · Sinophone · rogue-lite · autoethnography · practice research', '酷儿游戏研究 · 程序修辞 · 孝道 · 华语语系 · rogue-lite · 自我民族志 · 实践研究') + '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    /* 02 ONE NIGHT */
    '<section class="sj-sec">' + mark('02', 'The loop · one night, three moments', '循环 · 一夜三刻') +
      '<h2 class="sj-h2">' + b('Survive until dawn.<br/>Then face what the night became.', '撑到黎明。<br/>然后面对这一夜变成的东西。') + '</h2>' +
      '<p class="sj-lead2">' + b('The player survives by moving constantly to avoid being surrounded, by attacking with talismans (paper charms carrying written spells) and mantras (spoken protective chants), and by collecting the jade shards that defeated enemies drop. When enough shards are collected the character levels up: a ritual circle opens beneath him, holds the enemies off, and offers one of three upgrades. A timer counts down to dawn. When it reaches zero, the night’s accumulated pressure takes a single giant body: a boss appears, and the run is won only when the boss is defeated. Death, at any point, wipes out everything gained: spells, upgrades and levels are lost, and the next run starts from zero; only coins carry over, into a between-run shop.', '玩家靠不停移动避免被包围，以符（写有咒文的纸符）和咒（念诵的护身真言）攻击，并拾取被击退的敌人掉落的碎玉。碎玉攒够便升级：一座法阵在脚下展开，挡住敌潮，给出三选一的强化。计时器倒数到黎明。归零时，整夜累积的压力化为一具巨大的身体：Boss 出现，唯有击败它，这一局才算赢。任何时刻的死亡都会抹去一切所得：法术、强化与等级全部失去，下一局从零开始；只有金币留下，进入局间商店。') + '</p>' +
      '<div class="sj-trip">' +
        '<figure class="sj-fig"><img src="' + A + 'lv1.jpg" alt="Level 1, 14:31 until dawn" loading="lazy" /><figcaption class="sj-cap"><b>Lv 1 · 14:31</b>' + b('The daoshi stands alone in the dark with a single talisman.', '道士独自站在黑暗里，手中只有一张符。') + '</figcaption></figure>' +
        '<figure class="sj-fig"><img src="' + A + 'lv9.jpg" alt="Level 9, 11:34 until dawn" loading="lazy" /><figcaption class="sj-cap"><b>Lv 9 · 11:34</b>' + b('Thunder, fields of spirit fire and orbiting charms surround him.', '雷、成片的鬼火与环绕的符围在他身边。') + '</figcaption></figure>' +
        '<figure class="sj-fig"><img src="' + A + 'lv45.jpg" alt="Level 45, 01:23 until dawn" loading="lazy" /><figcaption class="sj-cap"><b>Lv 45 · 01:23</b>' + b('Minutes from dawn, the whole arena is filled with his own attacks.', '距黎明几分钟，整片场地被他自己的攻击填满。') + '</figcaption></figure>' +
      '</div>' +
      '<figure class="sj-fig sj-wide"><img src="' + A + 'boss.jpg" alt="Dawn: the boss Black Netherclaw" loading="lazy" />' + cap('Dawn. The boss, Black Netherclaw, appears when the countdown ends; the run is won only when it is defeated.', '黎明。倒计时结束时 Boss“黑幽螯”出现；唯有击败它，这一局才算赢。') + '</figure>' +
    '</section>' +

    /* 03 CONTEXT */
    '<section class="sj-sec sj-sec-alt">' + mark('03', 'Context · the gap', '语境 · 空白') +
      '<h2 class="sj-h2">' + b('Four questions, two games,<br/>one space between them', '四个问题，两款游戏，<br/>以及二者之间的一片空白') + '</h2>' +
      '<ol class="sj-qs">' +
        '<li>' + b('Is pressure an event or a lasting condition?', '压力是一次事件，还是一种持续的状态？') + '</li>' +
        '<li>' + b('Does queerness, or the norm, sit in the content or the structure?', '酷儿性——或常规——位于内容里，还是结构里？') + '</li>' +
        '<li>' + b('What does failure do?', '失败做了什么？') + '</li>' +
        '<li>' + b('Where is the player’s body placed, and what does it feel?', '玩家的身体被放在哪里，它感到什么？') + '</li>' +
      '</ol>' +
      '<div class="sj-games">' +
        '<div class="sj-game"><span class="sj-game-k">' + b('Practice review 01', '实践评述 01') + '</span><h4>Chinese Parents <span lang="zh">中国式家长</span> <em>(Moyuwan Games, 2018)</em></h4>' +
          '<p>' + b('Models the pressure as a condition, but from the parent’s chair, with no place for a queer son. The relatives who arrive to compare children became my enemies: I kept the relatives, removed their dialogue, and multiplied them into a surrounding crowd. The ‘face duel’ health bar became my protagonist’s health. And the countdown to the exam became my countdown to dawn.', '把压力建模为一种状态，却坐在父母的椅子上，且没有一个不愿结婚的儿子的位置。前来比较孩子的亲戚成了我的敌人：我留下亲戚，删去对白，把他们繁殖成一圈人群。“面子对决”的血条成了主角的生命；高考倒计时成了我的黎明倒计时。') + '</p></div>' +
        '<div class="sj-game"><span class="sj-game-k">' + b('Practice review 02', '实践评述 02') + '</span><h4>Coming Out Simulator 2014 <em>(Case, 2014)</em></h4>' +
          '<p>' + b('Plays the queer son from inside, but compresses queerness into a single event. The useless choice became my arena that can never be cleared: I stretched the discovery that no option wins into a whole night that can only be survived. Its queerness lives in one dinner, and the pressure I know is every dinner. My game had to model the condition, not the event.', '从内部扮演那个酷儿儿子，却把酷儿性压缩进一次事件。“无用的选择”成了我永远清不空的场地：我把“没有一个选项能赢”的发现拉长成只能熬过去的一整夜。它的酷儿性只活在一顿晚饭里，而我熟悉的压力是每一顿晚饭。我的游戏必须建模状态，而非事件。') + '</p></div>' +
      '</div>' +
      '<blockquote class="sj-gap">' + b('The gap between them is my project’s space: the pressure as a condition, the queer position built into the structure, played from inside the pressured body.', '二者之间的空白就是我的项目所在：压力作为状态，酷儿位置内建于结构，从被压迫的身体内部去游玩。') + '</blockquote>' +
    '</section>' +

    /* 04 METHOD */
    '<section class="sj-sec">' + mark('04', 'Methodology', '方法') +
      '<div class="sj-split sj-split-r">' +
        '<h2 class="sj-h2">' + b('The game is the instrument of investigation', '游戏即研究的仪器') + '</h2>' +
        '<p class="sj-lead2">' + b('Practice research: knowledge is produced by making the game and reflecting on the making. This project is practice-based: its claims depend on the specific systems of Shattered Jade and could not be made without them. What it can produce is situated knowledge, an exact, evidenced account of how one person turned one lived experience into one designed system, which others can examine, use or challenge.', '实践研究：知识在制作游戏、并反思制作的过程中产生。本项目属于“基于实践”的研究：它的论断依赖《碎玉》的具体系统，离开这些系统便无法成立。它能产出的是处境化的知识——一份精确、有据的记录，说明一个人如何把一段亲历转化为一个设计出来的系统，供他人检验、使用或质疑。') + '</p>' +
      '</div>' +
      '<div class="sj-methods">' +
        '<div class="sj-method"><span>I</span><h4>' + b('Desktop research', '桌面研究') + '</h4><p>' + b('Queer game studies, queer life in China, procedural rhetoric; two games read as arguments, through the four questions.', '酷儿游戏研究、中国酷儿生活、程序修辞；把两款游戏当作论证来读，以四个问题分析。') + '</p></div>' +
        '<div class="sj-method"><span>II</span><h4>' + b('Autoethnography', '自我民族志') + '</h4><p>' + b('A three-step translation: notice the feeling a system raised; name its social form; find the mechanic that makes a player do what the pressure makes a person do.', '三步转译：察觉某个系统唤起的感受；用理论词汇命名它的社会形式；再找到那个让玩家去做“压力让人去做的事”的机制。') + '</p></div>' +
        '<div class="sj-method"><span>III</span><h4>' + b('Documentation', '过程记录') + '</h4><p>' + b('Notes written at the moment of each decision (reflection-in-action); the analysis written from them afterwards (reflection-on-action).', '在每个决定当下写下的笔记（行动中反思）；事后由笔记写成的分析（行动后反思）。') + '</p></div>' +
        '<div class="sj-method"><span>IV</span><h4>' + b('Iteration under version control', '版本控制下的迭代') + '</h4><p>' + b('Each build tested against one question: does this mechanic still carry the pressure it is meant to carry? Dead ends are reported as findings.', '每个版本只问一个问题：这条机制是否仍承载它应承载的压力？走不通的路也作为发现报告。') + '</p></div>' +
      '</div>' +
    '</section>' +

    /* 05 DECISIONS */
    '<section class="sj-sec sj-sec-alt">' + mark('05', 'Design decisions, in order', '设计决定 · 依次') +
      '<h2 class="sj-h2">' + b('In each case the alternatives failed as I worked, and what remained was the only form that still carried the pressure', '每一次，替代方案都在工作中失效；剩下的，是唯一仍能承载压力的形式') + '</h2>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">1</span><h3>' + b('Storytelling through systems, not plot', '用系统讲故事，而非剧情') + '</h3></div>' +
        '<div class="sj-dec-grid"><div><p>' + b('My first design followed the habit of every game I had made before, where the story carried the meaning: a martial-arts sect leader’s son fighting through guards to rescue an imprisoned male lover. During development all of it had to go: the plot, the lover, the ending. This was not a decision to tell no story, but to tell it another way, through systems, space and the player’s body.', '我最初的设计延续了以往每款游戏的习惯——由故事承担意义：武林宗主之子杀出重围，救出被囚的男性恋人。开发中这一切都不得不去掉：剧情、恋人、结局。这不是决定不讲故事，而是换一种方式讲：通过系统、空间与玩家的身体。') + '</p></div>' +
        '<ol class="sj-reasons"><li>' + b('Systems can carry meaning, and I could not test that while a plot remained to take the credit.', '系统可以承载意义，而只要剧情还在抢功，就无法检验这一点。') + '</li><li>' + b('The experience has no beginning, climax or resolution; it is a condition that returns at every holiday, and a repeating loop matches that shape.', '这段经验没有开端、高潮或结局；它是每个节日都会回来的状态，重复的循环正合它的形状。') + '</li><li>' + b('Removing the plot removed the temptation to stage a single coming-out scene.', '删去剧情，也删去了上演一场出柜戏的诱惑。') + '</li><li>' + b('Ethics: a plot about this subject would have needed characters based on my family, and systems need none.', '伦理：关于这个题目的剧情需要以我的家人为原型的角色，而系统不需要任何角色。') + '</li></ol></div>' +
        '<p class="sj-dec-out">' + b('The result is a game in which nothing is announced or explained; the whole weight of the situation is carried by what surrounds the player and what he does.', '结果是一款什么都不宣告、不解释的游戏；处境的全部重量，由包围玩家的东西和他所做的事来承担。') + '</p></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">2</span><h3>' + b('The setting: Chinese strange tales', '背景：志怪') + '</h3></div>' +
        '<div class="sj-dec-grid"><p>' + b('I moved the game into the zhiguai tradition, the Chinese “records of the strange”: ghost stories, fox spirits, and the priests who deal with them. The classical strange tale is where the desires the Confucian family order excludes, including desire between men, return as ghosts and foxes, to be feared, pitied and driven out (Zeitlin, 1993). Its imagery communicates without explanation: ghost-fire, yellow talismans and ruined temples are familiar across the Chinese-speaking world, and the darkness itself is meaningful, because the pressure I model belongs to the unspoken, after-dinner part of family life.', '我把游戏搬进志怪传统——“记录奇异之事”的中国文类：鬼故事、狐仙，以及处理它们的道士。古典志怪正是儒家家庭秩序所排斥的欲望（包括男人之间的欲望）化作鬼与狐归来、被恐惧、被怜惜、被驱逐的地方（Zeitlin, 1993）。它的意象不需解释：鬼火、黄符、破庙在整个华语世界都熟悉；黑暗本身也有意义，因为我所建模的压力，属于家庭生活中饭后那段无人言说的时间。') + '</p>' +
        '<blockquote class="sj-pull">' + b('The strange tale was not one option among several; it was where my subject and my interests met.', '志怪不是几个选项之一；它是我的题目与我的兴趣相遇的地方。') + '</blockquote></div></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">3</span><h3>' + b('Enemies that stand for pressure', '敌人即压力') + '</h3></div>' +
        '<div class="sj-dec-grid"><p>' + b('In the survivor genre enemies are a crowd to be mown down, and my first design treated them that way, as sect guards, until I saw the problem: guards are people, and a game in which a gay son kills hundreds of his father’s followers presents the pressure as an army, which it is nothing like. So the enemies had to become embodiments of pressure.', '在幸存者类游戏里，敌人是待割的人群；我最初也如此处理，把他们设为门派守卫——直到看见问题：守卫是人，一个同性恋儿子杀死父亲的数百门徒，会把压力呈现为一支军队，而它完全不是那样。于是敌人必须成为压力的化身。') + '</p>' +
        img('spider.jpg', 'The spider in the editor, the first of the enemies that stand for pressure') + '</div>' +
        '<div class="sj-beasts">' + enemiesHTML() + '</div>' +
        '<div class="sj-dec-grid sj-dec-grid-3">' + img('birdman.jpg', 'The bird-man model') + img('boss-model.jpg', 'Black Netherclaw model') + img('camera.jpg', 'The spring-arm top-down camera in Blueprint') + '</div>' +
        '<p class="sj-dec-out">' + b('The camera adds to this: the player watches the daoshi from above, small at the centre, in the position of the observer rather than the observed, Foucault’s “visibility is a trap” (1977, p. 200) as a viewpoint.', '镜头加深了这一点：玩家从上方看着场中央渺小的道士，处在观察者而非被观察者的位置——福柯的“可见性是一个陷阱”（1977, p. 200）成了一个视角。') + '</p></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">4</span><h3>' + b('The weapon: dispelling instead of killing', '武器：驱散，而非杀戮') + '</h3></div>' +
        '<div class="sj-dec-grid sj-dec-grid-img"><figure class="sj-fig sj-fig-tall"><img src="' + A + 'talisman.jpg" alt="The Blossom Talisman in flight" loading="lazy" />' + cap('The Blossom Talisman in flight. What is thrown is, literally, writing.', '飞行中的散花符。掷出去的，就是字面意义上的文字。') + '</figure>' +
        '<div><p>' + b('My enemies stand for pressure that comes from the protagonist’s own family and community. If the player shoots them, the game says that the answer to family pressure is violence against one’s family, which I do not believe and do not want the game to say. The projectile became a thrown talisman, a strip of yellow paper carrying red script, and the core action became qusha, the driving out of a harmful influence. Killing destroys a being, while dispelling removes an influence and destroys no one.', '我的敌人代表来自主角自己家庭与社群的压力。若玩家射杀他们，游戏便在说：对家庭压力的回答是对家人施暴——我不相信，也不希望游戏这样说。子弹于是变成掷出的符，一条写着朱砂咒文的黄纸；核心动作变成“驱煞”，驱走有害的影响。杀戮毁灭一个存在，驱散只移除一种影响，不毁灭任何人。') + '</p>' +
        '<p>' + b('Family pressure arrives as words, questions, comparisons and gossip; a talisman is a written text; so the protagonist answers words with words. Five spells are written talismans thrown at targets, four are spoken mantras radiating from the body, and so every weapon in the game is a form of language.', '家庭压力以话语、追问、比较与闲言到来；符是写下的文字；于是主角以文字回应文字。五种法术是掷向目标的书写之符，四种是自身体散发的口诵真言——游戏里的每一件武器，都是一种语言。') + '</p></div></div></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">5</span><h3>' + b('The protagonist: a daoshi', '主角：道士') + '</h3></div>' +
        '<div class="sj-dec-grid sj-dec-grid-img sj-rev-cols"><div><p>' + b('He is not a monk. A Buddhist monk leaves his family and renounces desire; the Daoist priest of popular tradition may marry, raise children and live at home, and the families around him call him in when something has gone wrong, a death, a haunting, a run of bad luck (Schipper, 1993). His place is not outside the family order but at its threshold: inside it, needed by it, working on what it cannot handle itself. He does not escape the family and its questions, he stays and deals with what it drives out.', '他不是和尚。僧人离家、断欲；民间传统里的道士却可以娶妻生子、在家居住，周围的家庭在出了事时——死亡、闹鬼、一连串的霉运——请他上门（Schipper, 1993）。他的位置不在家庭秩序之外，而在它的门槛上：身在其中、被它需要、处理它自己处理不了的东西。他不逃离家庭与它的追问，他留下来，处理被它驱逐的东西。') + '</p>' +
        '<blockquote class="sj-pull">' + b('He has neither announced what he is nor abandoned his people, Chou’s “coming home” (2000) as a character design rather than a scene.', '他既没有宣告自己是什么，也没有抛弃自己的人——周华山的“回家”（2000）成了一个角色设计，而非一场戏。') + '</blockquote></div>' +
        img('daoshi.jpg', 'The daoshi character model', 'sj-fig-tall') + '</div></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">6</span><h3>' + b('The upgrades: shattered jade', '升级：碎玉') + '</h3></div>' +
        '<div class="sj-dec-grid"><p>' + b('Defeated pressures drop shards of jade, and each upgrade is presented on a bilingual card as a shard of “shattered jade”. The idea is direct: the pressures broke something, and what the player collects and rebuilds, run after run, is the broken thing. Jade has been worn for centuries as protection against harm (Rawson, 1995), and in the Confucian tradition it is the emblem of virtue and the heirloom passed down a family line (Legge, 1885). The protagonist who rebuilds himself out of jade rebuilds himself out of the material of the family system that presses on him.', '被驱散的压力掉落碎玉，每次强化都以一张双语卡片呈现为一片“碎玉”。想法很直接：压力打碎了某样东西，而玩家一局又一局拾取、重建的，正是那件碎掉的东西。玉被佩戴数百年以辟邪护身（Rawson, 1995），在儒家传统中又是德行的象征、家族世代相传的信物（Legge, 1885）。用玉重建自己的主角，是用那套压迫着他的家庭系统的材料，重建自己。') + '</p>' +
        '<p>' + b('The full reset at death is itself a statement. Games usually make failure bearable by making it productive (Juul, 2013); here nothing gained inside a run is kept, because surviving one family gathering gives no protection at the next. Failure is simply failure, and the player returns anyway.', '死亡时的全部重置本身就是一个声明。游戏通常靠让失败“有产出”来使它可忍受（Juul, 2013）；这里一局之内的所得全不保留，因为熬过一次家庭聚会，对下一次毫无保护。失败就只是失败，而玩家照样回来。') + '</p></div>' +
        '<div class="sj-dec-grid sj-dec-grid-cards"><figure class="sj-fig"><img src="' + A + 'cards.jpg" alt="The level-up: three bilingual upgrade cards" loading="lazy" />' + cap('The upgrade cards, Chinese and English on one surface.', '升级卡片：中英文在同一张纸面上。') + '</figure>' +
        '<figure class="sj-fig"><img src="' + A + 'circle.jpg" alt="The level-up ritual circle" loading="lazy" />' + cap('The level-up ritual circle. The choice happens inside a drawn circle that holds the waves off exactly long enough to choose.', '升级法阵。选择发生在一个画出的圆里，它挡住敌潮的时间，刚好够做出选择。') + '</figure></div>' +
        '<div class="sj-pairs">' + pairsHTML() + '</div></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">7</span><h3>' + b('The build: committing to a strategy', '构筑：押定一种策略') + '</h3></div>' +
        '<div class="sj-dec-grid"><p>' + b('A run begins with the basic talisman; the other eight spells compete for five slots; the passives allow six choices; nothing can be unlearned mid-run. The waves meanwhile grow in number, speed and damage, so the player commits before knowing what the night will demand: attack, and be exposed; protect, and be overrun; or compromise. I did not plan this as a metaphor. The trade-off appeared when every spell and passive existed and a run had to be given a size, and it could not then be designed away: a build that could be freely revised would say that a life under this pressure can be rearranged at will, and it cannot.', '一局从基础符开始；其余八种法术争夺五个栏位；被动只有六次选择；局中无法遗忘任何东西。敌潮却在数量、速度与伤害上不断增长，玩家必须在不知这一夜将索要什么之前就押定：进攻，则暴露；防护，则被淹没；或折中。我并未把它设计成隐喻。这种取舍是在所有法术与被动都做好、一局必须被给定一个尺寸时出现的，之后再也无法设计掉：一套可以随意修改的构筑，会在说“这种压力下的人生可以随意重排”——而它不能。') + '</p>' + slotsHTML() + '</div>' +
        '<p class="sj-dec-out">' + b('Under these pressures, people also commit, to endurance, evasion or confrontation, before knowing whether the choice will hold, and mostly cannot take it back.', '在这些压力之下，人也一样：在不知道选择能否撑住之前，就押定忍受、游移或对峙，而且多半收不回来。') + '</p></article>' +

      '<article class="sj-dec"><div class="sj-dec-head"><span class="sj-dec-n">8</span><h3>' + b('The body', '身体') + '</h3></div>' +
        '<div class="sj-dec-grid"><p>' + b('Coming Out Simulator put feeling in a hovering hand; Chinese Parents left the body at rest in the parent’s chair. In Shattered Jade the emotion is delivered through the hand and the eyes rather than words, following Anable’s point that a game’s feeling is made between hand, screen and system (2018). The movement keys are held down for ten minutes at a time; the ring of creatures visibly tightens; the one moment of rest is the three seconds inside the ritual circle when the player chooses an upgrade.', '《出柜模拟器》把感受放在一只悬停的手里；《中国式家长》让身体安坐在父母的椅子上。在《碎玉》里，情绪经由手与眼而非文字传递，正如 Anable 所说，游戏的感受产生于手、屏幕与系统之间（2018）。移动键一次要按住十分钟；妖物之环肉眼可见地收紧；唯一的休息，是法阵里选择强化的那三秒。') + '</p>' +
        '<blockquote class="sj-pull">' + b('The queer condition the game models is bodily before it is verbal: a body that is never permitted to stand still, because the cost of stillness is being reached.', '这款游戏所建模的酷儿处境，先是身体的，然后才是言语的：一个永远不被允许静止的身体，因为静止的代价，就是被触及。') + '</blockquote></div></article>' +
    '</section>' +

    /* 06 TABLE */
    '<section class="sj-sec">' + mark('06', 'Table 1 · mechanics and framework', '表 1 · 机制与理论框架') +
      '<h2 class="sj-h2">' + b('Every mechanic carries one pressure', '每一条机制，承载一种压力') + '</h2>' + tableHTML() +
    '</section>' +

    /* 07 SPELLS */
    '<section class="sj-sec sj-sec-alt">' + mark('07', 'Nine spells · every weapon is language', '九种法术 · 每件武器都是语言') +
      '<div class="sj-spells">' + spellsHTML() + '</div>' +
      '<p class="sj-note">' + b('Base damage / cooldown at level 1; each spell has an authored eight-level track. Spell components inherit from a shared base class (SC_SpellBase); each spell’s data-table row is merged with the hero’s statistics at cast time, so refinements applied to the hero affect every spell.', '一级时的基础伤害 / 冷却；每种法术都有手工编排的八级成长。法术组件继承自共同基类 SC_SpellBase；施放时把法术数据表与英雄属性合并，因此加在英雄身上的精炼会影响每一种法术。') + '</p>' +
    '</section>' +

    /* 08 REFLECTION */
    '<section class="sj-sec">' + mark('08', 'Reflection', '反思') +
      '<div class="sj-refl">' +
        '<div class="sj-ref"><h3>' + b('The aesthetic choices turned out to be the most personal', '美学选择反而最私人') + '</h3><p>' + b('The strange-tale world came from ghost films and childhood games rather than classical texts: I chose my generation’s media memory as the game’s ground. My use aims at reflective nostalgia (Boym, 2001): the tradition arrives in fragments and shards, and the game sits uneasily inside it. One irony remains: in the traditional tales, the disruptive presence the household wants driven out is the ghost, and in this family’s terms that presence is the protagonist himself. He plays the exorcist while being, from the household’s point of view, the thing to be exorcised.', '志怪世界来自鬼片与童年的游戏，而非古典文本：我选了我这一代人的媒介记忆作为游戏的地基。我的用法指向“反思型怀旧”（Boym, 2001）：传统以碎片与碎玉的形式到来，游戏在其中坐得并不安稳。有一层反讽留了下来：在传统故事里，家庭想驱走的扰乱者是鬼；而按这个家庭的说法，那个存在正是主角本人。他扮演驱邪的人，同时在家庭的眼中，是那个要被驱走的东西。') + '</p></div>' +
        '<div class="sj-ref"><h3>' + b('Distance changed what could be seen', '距离改变了能看见的东西') + '</h3><p>' + b('Inside the web a person feels the tightening but cannot see the shape; from London, out of range of the daily gaze, the pressure became something I could look at, name in a vocabulary Chinese public life had not given me, and build as an object. The top-down camera is that vantage point made literal. Distance also changed what the pressure was, and the game recorded that: the bird-man is the pressure that reaches across distance; moving to London did not move me out of range, it changed the pressure’s shape, from the table to the phone. The between-run shop names the parts of a life built elsewhere: Backbone, Roof, Solitude, Journeying.', '身在网中，人感到收紧却看不见形状；在伦敦，脱离了日常注视的范围，压力变成一件我可以注视、可以用中国公共生活未曾给我的词汇命名、可以造成一件物的东西。俯视镜头就是这个视点的字面化。距离也改变了压力本身，游戏记录了这一点：鸟人是跨越距离的压力；搬到伦敦没有让我走出射程，只是改变了压力的形状——从饭桌到电话。局间商店为一段在别处建立的生活命名：脊梁、屋顶、独处、远行。') + '</p></div>' +
        '<div class="sj-ref"><h3>' + b('What the systems cannot do', '系统做不到的事') + '</h3><p>' + b('Removing the plot made Sicart’s problem worse: a talisman that removes an enemy is, mechanically, a bullet, and the meanings claimed here live in names, images and cultural knowledge a player may not bring. Such a player may see only a survival game with unusual art. I accept this as the design’s price: its refusal to explain itself is faithful to a pressure that is never explained; but faithfulness and legibility pull apart, and without playtesting I cannot know where the balance falls. That absence of players is the method’s clearest limit.', '删去剧情让 Sicart 的问题更严重了：一张移除敌人的符，在机制上就是一颗子弹；这里宣称的意义都活在名字、图像与玩家未必带来的文化知识里。这样的玩家也许只看到一款美术奇特的生存游戏。我接受这是设计的代价：它拒绝自我解释，忠实于一种从不被解释的压力；但忠实与可读性彼此拉扯，没有测试，我无法知道天平落在哪里。玩家的缺席，是这个方法最清楚的边界。') + '</p></div>' +
      '</div>' +
      '<blockquote class="sj-end">' + b('The pressures shatter something, and what they shatter is also the material the protagonist rebuilds himself from. He picks the pieces up, run after run. Each death repeats the proverb’s choice: he breaks as what he is, rather than surviving as something he is not.', '压力打碎了某样东西，而被打碎的，也正是主角用来重建自己的材料。他一局又一局地把碎片拾起。每一次死亡都重复着那句谚语的选择：宁以本来的样子碎去，不以不是自己的样子苟全。') + '</blockquote>' +
    '</section>' +

    /* COLOPHON */
    '<footer class="sj-foot">' +
      '<div class="sj-colophon">' +
        '<span><i>' + b('Engine & tools', '引擎与工具') + '</i><b>Unreal Engine 5 · Blueprint · Gameplay Ability System · Niagara · Perforce (P4V) · PC, keyboard &amp; mouse</b></span>' +
        '<span><i>' + b('Content', '内容量') + '</i><b>' + b('9 spells · 6 passives · 6 refinements · 12-item between-run shop · 23 original icons · all text in Chinese and English', '9 种法术 · 6 种被动 · 6 种精炼 · 12 项局间商店 · 23 个原创图标 · 全部文本中英双语') + '</b></span>' +
        '<span><i>' + b('Between-run shop', '局间商店') + '</i><b>Backbone · Roof · Solitude · Composure · Horizons · Resolve · Steadiness · Fellowship · Journeying · Spirit · Insight · Fortune</b></span>' +
      '</div>' +
      '<div class="sj-proverb"><span class="sj-proverb-zh" lang="zh-Hant">寧為玉碎，不為瓦全</span><span class="sj-proverb-en">' + b('Better to shatter as jade than survive whole as common tile.', '——宁可作为玉碎去，也不作为瓦保全。') + '</span></div>' +
    '</footer>' +
    '</article>';
  }

  function injectCSS() {
    if (document.getElementById('sj-css')) return;
    var s = document.createElement('style'); s.id = 'sj-css'; s.textContent = SJ_CSS; document.head.appendChild(s);
  }

  function renderShatteredJade(item) {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.innerHTML = html();
    var art = wrap.firstChild;
    requestAnimationFrame(function () {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sj-in'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      art.querySelectorAll('.sj-sec, .sj-dec, .sj-beast, .sj-pair, .sj-spell, .sj-method, .sj-ref').forEach(function (n) { n.classList.add('sj-rev'); io.observe(n); });
    });
    art.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.sj-yt');
      if (!btn) return;
      var id = btn.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.className = 'sj-yt';
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = 'Shattered Jade — video';
      f.setAttribute('frameborder', '0');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.allowFullscreen = true;
      btn.parentNode.replaceChild(f, btn);
    });
    return art;
  }
  window.renderShatteredJade = renderShatteredJade;

  /* ---------------------------- styles ---------------------------- */
  var SJ_CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Noto+Serif+SC:wght@400;600;900&family=Noto+Serif+TC:wght@900&display=swap');",
'.sj-page{--sj-night:#0A1418;--sj-night2:#0F1F26;--sj-paper:#E9D9A7;--sj-gold:#D9B04A;--sj-seal:#C2352B;--sj-jade:#5FB89F;--sj-ink:#EDE6D3;--sj-soft:#B4AC97;--sj-line:rgba(233,217,167,.16);',
'  --sj-serif:"Cormorant Garamond",Georgia,serif;--sj-cjk:"Noto Serif SC","Noto Sans SC",serif;',
'  background:var(--sj-night);color:var(--sj-ink);font-family:var(--sans,system-ui,sans-serif);font-size:clamp(15px,1.3vw,17px);line-height:1.62;',
'  margin:calc(-1*clamp(28px,4vw,58px)) calc(-1*clamp(22px,3.4vw,54px));overflow:hidden}',
'.lang-zh .sj-page{font-family:var(--sj-cjk);line-height:1.85}',
'.sj-page p{margin:0;text-wrap:pretty}.sj-page .sj-sub{margin-top:clamp(16px,2.4vw,28px)}.sj-page .sj-lead{margin-top:clamp(18px,2.4vw,28px)}.sj-page .sj-lead2{margin-bottom:clamp(28px,4vw,52px)}.sj-page .sj-note{margin-top:clamp(20px,2.6vw,30px)}.sj-page h1,.sj-page h2,.sj-page h3,.sj-page h4{margin:0;font-weight:600;color:var(--sj-ink)}',
'.sj-page a{color:var(--sj-paper)}.sj-page a:hover{color:var(--sj-gold)}',
'.sj-page h1,.sj-page h2,.sj-page h3,.sj-page h4{font-family:var(--sj-serif);letter-spacing:.005em}',
'.lang-zh .sj-page h1,.lang-zh .sj-page h2,.lang-zh .sj-page h3,.lang-zh .sj-page h4{font-family:var(--sj-cjk);font-weight:600;letter-spacing:0}',
'.sj-page img{display:block;width:100%;height:100%;object-fit:cover}',
'.sj-page [lang="zh"]{font-family:var(--sj-cjk)}',

/* hero */
'.sj-hero{position:relative;min-height:92vh;display:flex;align-items:flex-end;background-size:cover;background-position:center 40%;isolation:isolate}',
'.sj-hero-veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,20,24,.55) 0%,rgba(10,20,24,.25) 35%,rgba(10,20,24,.92) 78%,var(--sj-night) 100%),linear-gradient(90deg,rgba(10,20,24,.7),rgba(10,20,24,.1) 60%)}',
'.sj-hero-inner{position:relative;z-index:1;width:100%;max-width:1240px;margin:0 auto;padding:clamp(60px,10vw,140px) clamp(24px,5vw,72px) clamp(44px,6vw,80px)}',
'.sj-eyebrow{font-family:var(--mono,monospace);font-size:clamp(10.5px,1vw,12.5px);letter-spacing:.18em;text-transform:uppercase;color:var(--sj-paper);opacity:.9}',
'.lang-zh .sj-eyebrow{font-family:var(--sj-cjk);letter-spacing:.1em}',
'.sj-titles{display:flex;align-items:flex-end;gap:clamp(18px,3vw,40px);margin-top:clamp(18px,2.6vw,30px);flex-wrap:wrap}',
'.sj-han{font-family:var(--sj-cjk);font-weight:900;font-size:clamp(110px,18vw,240px);line-height:.9;color:var(--sj-paper);letter-spacing:-.02em;text-shadow:0 2px 40px rgba(0,0,0,.5)}',
'.sj-title-r{display:flex;align-items:flex-end;gap:clamp(14px,2vw,26px);padding-bottom:clamp(8px,1.4vw,18px)}',
'.sj-title{font-family:var(--sj-serif);font-weight:600;font-size:clamp(40px,6.4vw,86px);line-height:.92;text-transform:uppercase;letter-spacing:.06em;color:var(--sj-ink)}',
'.lang-zh .sj-title{font-family:var(--sj-serif)}',
'.sj-seal{display:inline-flex;align-items:center;justify-content:center;width:clamp(44px,5vw,66px);aspect-ratio:1/1.5;border:2.5px solid var(--sj-seal);color:var(--sj-seal);font-family:var(--sj-cjk);font-weight:900;font-size:clamp(15px,1.7vw,22px);line-height:1.05;text-align:center;padding:4px;box-shadow:inset 0 0 0 1px rgba(194,53,43,.35);opacity:.92}',
'.sj-sub{font-family:var(--sj-serif);font-style:italic;font-size:clamp(19px,2.3vw,30px);line-height:1.25;color:var(--sj-paper);max-width:32ch;margin-top:clamp(16px,2.4vw,28px)}',
'.lang-zh .sj-sub{font-family:var(--sj-cjk);font-style:normal;font-weight:600}',
'.sj-lead{max-width:58ch;font-family:var(--sj-serif);font-weight:500;font-size:clamp(18px,1.9vw,24px);line-height:1.42;margin-top:clamp(18px,2.4vw,28px);color:var(--sj-ink)}',
'.lang-zh .sj-lead{font-family:var(--sj-cjk);font-weight:400;font-size:clamp(16px,1.6vw,20px);line-height:1.8}',
'.sj-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:clamp(14px,2vw,28px);margin-top:clamp(28px,3.6vw,44px);padding-top:clamp(16px,2vw,22px);border-top:1px solid var(--sj-line)}',
'.sj-meta>span{display:flex;flex-direction:column;gap:5px}',
'.sj-meta i{font-style:normal;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-soft)}',
'.lang-zh .sj-meta i{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-meta b{font-weight:500;font-size:clamp(13px,1.25vw,15.5px);color:var(--sj-ink);line-height:1.4}',

/* sections */
'.sj-sec{position:relative;max-width:1240px;margin:0 auto;padding:clamp(56px,7.5vw,104px) clamp(24px,5vw,72px)}',
'.sj-sec-alt{max-width:none;background:var(--sj-night2);border-top:1px solid var(--sj-line);border-bottom:1px solid var(--sj-line)}',
'.sj-sec-alt>*{max-width:1240px;margin-left:auto;margin-right:auto}',
'.sj-mark{display:flex;align-items:center;gap:14px;margin-bottom:clamp(22px,3vw,36px)}',
'.sj-num{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 8px;border:1.5px solid var(--sj-seal);color:var(--sj-seal);font-family:var(--sj-serif);font-weight:700;font-size:16px}',
'.sj-kicker{font-family:var(--mono,monospace);font-size:clamp(10.5px,1vw,12.5px);letter-spacing:.18em;text-transform:uppercase;color:var(--sj-paper)}',
'.lang-zh .sj-kicker{font-family:var(--sj-cjk);letter-spacing:.1em}',
'.sj-h2{font-size:clamp(30px,4.2vw,56px);line-height:1.04;max-width:24ch;margin-bottom:clamp(18px,2.6vw,30px);text-wrap:balance}',
'.lang-zh .sj-h2{line-height:1.25}',
'.sj-lead2{max-width:70ch;font-size:clamp(15.5px,1.45vw,18.5px);color:var(--sj-ink);margin-bottom:clamp(28px,4vw,52px)}',
'.sj-note{max-width:70ch;font-size:clamp(13px,1.15vw,14.5px);color:var(--sj-soft);margin-top:clamp(20px,2.6vw,30px)}',
'.sj-fig{margin:0;position:relative;border:1px solid var(--sj-line);background:#000;overflow:hidden}',
'.sj-fig>img{height:auto;aspect-ratio:16/9}.sj-fig-tall>img{aspect-ratio:auto}',
'.sj-cap{display:block;padding:12px 14px;font-size:clamp(12.5px,1.1vw,14px);line-height:1.5;color:var(--sj-soft);background:var(--sj-night2);border-top:1px solid var(--sj-line)}',
'.sj-cap b{display:block;font-family:var(--mono,monospace);font-size:11px;letter-spacing:.14em;color:var(--sj-paper);margin-bottom:4px}',

/* videos */
'.sj-sec-vids{padding-top:clamp(28px,4vw,52px)}',
'.sj-vids{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,2.6vw,32px)}',
'.sj-vid{display:flex;flex-direction:column;gap:14px}',
'.sj-yt{position:relative;width:100%;aspect-ratio:16/9;border:1px solid var(--sj-line);display:block;background:#000}',
'button.sj-yt{padding:0;cursor:pointer;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;transition:filter .25s}',
'button.sj-yt::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,20,24,.05),rgba(10,20,24,.5))}',
'button.sj-yt:hover{filter:brightness(1.08)}',
'.sj-play{position:relative;z-index:1;width:clamp(58px,6vw,78px);height:clamp(58px,6vw,78px);border-radius:50%;background:var(--sj-seal);box-shadow:0 10px 30px rgba(0,0,0,.45);transition:transform .2s}',
'.sj-play::before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent var(--sj-paper)}',
'button.sj-yt:hover .sj-play{transform:scale(1.07)}',
'.sj-vid-t h4{font-size:clamp(20px,2.1vw,27px);line-height:1.1}',
'.sj-vid-t p{font-size:clamp(13.5px,1.2vw,15px);color:var(--sj-soft);margin-top:6px}',

/* abstract */
'.sj-split{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(28px,5vw,72px);align-items:start}',
'.sj-split-r{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:end;margin-bottom:clamp(28px,4vw,48px)}',
'.sj-split-r .sj-h2,.sj-split-r .sj-lead2{margin-bottom:0}',
'.sj-abstract{font-family:var(--sj-serif);font-weight:500;font-size:clamp(18px,1.85vw,23px);line-height:1.45;color:var(--sj-ink)}',
'.lang-zh .sj-abstract{font-family:var(--sj-cjk);font-weight:400;font-size:clamp(15.5px,1.5vw,18.5px);line-height:1.85}',
'.sj-rqs{display:flex;flex-direction:column;gap:clamp(14px,1.8vw,20px)}',
'.sj-rq{border:1px solid var(--sj-line);padding:clamp(18px,2.2vw,26px);background:var(--sj-night2)}',
'.sj-rq-k{display:block;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-jade);margin-bottom:10px}',
'.lang-zh .sj-rq-k{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-rq p{font-family:var(--sj-serif);font-style:italic;font-size:clamp(16.5px,1.6vw,20px);line-height:1.38;color:var(--sj-ink)}',
'.lang-zh .sj-rq p{font-family:var(--sj-cjk);font-style:normal;font-size:clamp(15px,1.4vw,17.5px);line-height:1.8}',
'.sj-keys{font-family:var(--mono,monospace);font-size:clamp(11px,1vw,12.5px);letter-spacing:.06em;color:var(--sj-soft);line-height:1.7}',
'.lang-zh .sj-keys{font-family:var(--sj-cjk)}',

/* triptych */
'.sj-trip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}',
'.sj-wide{margin-top:clamp(12px,1.6vw,20px)}.sj-wide img{aspect-ratio:1905/1080}',

/* context */
'.sj-qs{list-style:none;counter-reset:q;margin:0 0 clamp(30px,4vw,48px);padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--sj-line);border:1px solid var(--sj-line)}',
'.sj-qs li{counter-increment:q;background:var(--sj-night2);padding:clamp(18px,2.4vw,28px);font-family:var(--sj-serif);font-size:clamp(19px,2vw,26px);line-height:1.28;color:var(--sj-ink);position:relative;padding-left:clamp(54px,6vw,76px)}',
'.lang-zh .sj-qs li{font-family:var(--sj-cjk);font-size:clamp(16px,1.6vw,21px);line-height:1.6}',
'.sj-qs li::before{content:counter(q,upper-roman);position:absolute;left:clamp(18px,2.4vw,28px);top:clamp(20px,2.6vw,30px);font-family:var(--sj-serif);font-weight:700;font-size:15px;color:var(--sj-seal);letter-spacing:.06em}',
'.sj-games{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,2.6vw,32px)}',
'.sj-game{border-top:1px solid var(--sj-paper);padding-top:clamp(14px,1.8vw,20px)}',
'.sj-game-k{display:block;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-soft);margin-bottom:10px}',
'.lang-zh .sj-game-k{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-game h4{font-size:clamp(22px,2.3vw,30px);line-height:1.12;margin-bottom:12px}',
'.sj-game h4 em{font-style:italic;font-weight:500;font-size:.62em;color:var(--sj-soft);margin-left:.3em}',
'.sj-game p{font-size:clamp(14.5px,1.3vw,16.5px);color:var(--sj-ink)}',
'.sj-gap{margin:clamp(34px,4.5vw,56px) auto 0;max-width:1240px;font-family:var(--sj-serif);font-style:italic;font-weight:500;font-size:clamp(22px,2.7vw,36px);line-height:1.28;color:var(--sj-paper);text-wrap:balance;padding-left:clamp(16px,2vw,26px);border-left:2px solid var(--sj-seal)}',
'.lang-zh .sj-gap{font-family:var(--sj-cjk);font-style:normal;font-weight:600;font-size:clamp(19px,2.2vw,29px);line-height:1.55}',

/* method */
'.sj-methods{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--sj-line);border:1px solid var(--sj-line)}',
'.sj-method{background:var(--sj-night);padding:clamp(18px,2.4vw,28px)}',
'.sj-method>span{display:block;font-family:var(--sj-serif);font-weight:700;font-size:clamp(22px,2.4vw,32px);color:var(--sj-seal);margin-bottom:14px;letter-spacing:.04em}',
'.sj-method h4{font-size:clamp(18px,1.8vw,22px);line-height:1.15;margin-bottom:10px}',
'.sj-method p{font-size:clamp(13.5px,1.2vw,15px);color:var(--sj-soft)}',

/* decisions */
'.sj-dec{padding:clamp(34px,4.6vw,60px) 0;border-top:1px solid var(--sj-line)}',
'.sj-dec:first-of-type{margin-top:clamp(20px,3vw,40px)}',
'.sj-dec-head{display:flex;align-items:baseline;gap:clamp(14px,2vw,24px);margin-bottom:clamp(18px,2.4vw,28px)}',
'.sj-dec-n{font-family:var(--sj-serif);font-weight:700;font-size:clamp(34px,4vw,56px);line-height:1;color:var(--sj-seal);min-width:1.1em}',
'.sj-dec h3{font-size:clamp(24px,3vw,40px);line-height:1.08;text-wrap:balance}',
'.sj-dec-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(20px,3.2vw,48px);align-items:start}',
'.sj-dec-grid+.sj-dec-grid{margin-top:clamp(20px,3vw,40px)}',
'.sj-dec-grid p,.sj-dec p{font-size:clamp(15px,1.35vw,17px);color:var(--sj-ink)}',
'.sj-dec-grid p+p{margin-top:14px}',
'.sj-dec-grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}',
'.sj-dec-grid-img{grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);align-items:center}',
'.sj-rev-cols{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr)}',
'.sj-dec-grid-cards{grid-template-columns:minmax(0,1.5fr) minmax(0,.7fr);align-items:stretch}',
'.sj-dec-grid-cards .sj-fig{display:flex;flex-direction:column}.sj-dec-grid-cards .sj-fig img{flex:1;min-height:0;aspect-ratio:auto}.sj-dec-grid-cards .sj-fig:last-child img{object-position:center 30%}',
'.sj-reasons{margin:0;padding:0;list-style:none;counter-reset:r;display:flex;flex-direction:column;gap:12px}',
'.sj-reasons li{counter-increment:r;position:relative;padding-left:36px;font-size:clamp(14px,1.25vw,16px);color:var(--sj-ink)}',
'.sj-reasons li::before{content:counter(r);position:absolute;left:0;top:.1em;width:24px;height:24px;border:1.5px solid var(--sj-jade);color:var(--sj-jade);font-family:var(--sj-serif);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center}',
'.sj-dec-out{margin-top:clamp(20px,2.6vw,32px)!important;padding-top:clamp(14px,1.8vw,20px);border-top:1px dashed var(--sj-line);font-family:var(--sj-serif);font-weight:500;font-size:clamp(17px,1.75vw,22px)!important;line-height:1.4;max-width:66ch;color:var(--sj-paper)!important}',
'.lang-zh .sj-dec-out{font-family:var(--sj-cjk);font-weight:400;font-size:clamp(15.5px,1.5vw,19px)!important;line-height:1.75}',
'.sj-pull{margin:0;font-family:var(--sj-serif);font-style:italic;font-weight:500;font-size:clamp(21px,2.4vw,32px);line-height:1.3;color:var(--sj-paper);text-wrap:balance;align-self:center}',
'.sj-dec-grid p+.sj-pull,.sj-dec-grid .sj-pull{padding-left:clamp(14px,1.8vw,22px);border-left:2px solid var(--sj-seal)}',
'.lang-zh .sj-pull{font-family:var(--sj-cjk);font-style:normal;font-weight:600;font-size:clamp(18px,2vw,26px);line-height:1.6}',
'.sj-dec-grid p+.sj-pull{margin-top:18px}',

/* bestiary */
'.sj-beasts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1px;background:var(--sj-line);border:1px solid var(--sj-line);margin-top:clamp(24px,3.2vw,44px)}',
'.sj-beast{background:var(--sj-night);padding:clamp(16px,2vw,24px)}',
'.sj-beast-n{display:block;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;color:var(--sj-soft);margin-bottom:12px}',
'.sj-beast h4{font-size:clamp(19px,1.9vw,24px);line-height:1.1}',
'.sj-beast-k{display:block;font-size:12.5px;color:var(--sj-jade);margin:6px 0 12px;letter-spacing:.02em}',
'.sj-beast p{font-size:clamp(13px,1.15vw,14.5px)!important;color:var(--sj-soft)!important;line-height:1.55}',

/* pairs */
'.sj-pairs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,1.8vw,22px);margin-top:clamp(24px,3.2vw,44px)}',
'.sj-pair{border:1px solid var(--sj-line);padding:clamp(18px,2.2vw,26px);background:var(--sj-night)}',
'.sj-pair-s{display:block;font-family:var(--sj-serif);font-weight:700;font-size:clamp(20px,2vw,26px);color:var(--sj-paper);margin-bottom:14px;letter-spacing:.02em}',
'.lang-zh .sj-pair-s{font-family:var(--sj-cjk);font-weight:600}',
'.sj-shards{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}',
'.sj-shard{display:grid;grid-template-columns:14px 1fr auto;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--sj-line);background:var(--sj-night2)}',
'.sj-shard i{display:block;width:10px;height:10px;background:var(--sj-jade);transform:rotate(45deg);box-shadow:0 0 12px rgba(95,184,159,.6)}',
'.sj-shard b{font-weight:600;font-size:clamp(14px,1.25vw,16px);color:var(--sj-ink)}',
'.sj-shard>span{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.06em;color:var(--sj-soft)}',
'.sj-pair p{font-size:clamp(13.5px,1.2vw,15px)!important;color:var(--sj-soft)!important}',

/* slots */
'.sj-slots{display:flex;flex-direction:column;gap:10px;align-self:center}',
'.sj-slot-row{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}',
'.sj-slot{aspect-ratio:1;border:1.5px dashed rgba(233,217,167,.35);display:flex;align-items:center;justify-content:center;font-family:var(--mono,monospace);font-size:clamp(9px,.8vw,11px);letter-spacing:.08em;text-transform:uppercase;color:var(--sj-soft);text-align:center}',
'.lang-zh .sj-slot{font-family:var(--sj-cjk);letter-spacing:0}',
'.sj-slot.is-on{border:1.5px solid var(--sj-gold);background:rgba(217,176,74,.12);color:var(--sj-paper)}',
'.sj-slot-p{border-radius:50%}',
'.sj-slots-l{font-size:12.5px;color:var(--sj-soft);line-height:1.5;margin-top:4px}',

/* table */
'.sj-table{border:1px solid var(--sj-line);border-bottom:0}',
'.sj-tr{display:grid;grid-template-columns:1.2fr 1.1fr 1.2fr .8fr;gap:clamp(14px,2vw,28px);padding:clamp(14px,1.8vw,20px) clamp(14px,1.8vw,22px);border-bottom:1px solid var(--sj-line);font-size:clamp(13.5px,1.2vw,15px);color:var(--sj-ink);align-items:start}',
'.sj-th{font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-soft);background:var(--sj-night2)}',
'.lang-zh .sj-th{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-td-m{font-weight:600;color:var(--sj-paper)}',
'.sj-td-a{font-family:var(--sj-serif);font-style:italic;font-size:clamp(14.5px,1.3vw,17px);color:var(--sj-soft)}',

/* spells */
'.sj-spells{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--sj-line);border:1px solid var(--sj-line)}',
'.sj-spell{background:var(--sj-night2);padding:clamp(18px,2.2vw,26px);position:relative;display:flex;flex-direction:column;gap:6px}',
'.sj-spell-k{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-gold)}',
'.sj-spell-m .sj-spell-k{color:var(--sj-jade)}',
'.lang-zh .sj-spell-k{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-spell h4{font-size:clamp(19px,1.9vw,24px);line-height:1.1;margin-top:6px}',
'.sj-spell p{font-size:clamp(13.5px,1.2vw,15px);color:var(--sj-soft)}',
'.sj-spell-n{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.08em;color:var(--sj-soft);margin-top:auto;padding-top:10px;opacity:.85}',

/* reflection */
'.sj-refl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,44px)}',
'.sj-ref{border-top:1px solid var(--sj-paper);padding-top:clamp(14px,1.8vw,20px)}',
'.sj-ref h3{font-size:clamp(21px,2.1vw,28px);line-height:1.15;margin-bottom:12px;text-wrap:balance}',
'.sj-ref p{font-size:clamp(14px,1.25vw,16px);color:var(--sj-ink)}',
'.sj-end{margin:clamp(44px,6vw,84px) auto 0;max-width:34ch;text-align:center;font-family:var(--sj-serif);font-style:italic;font-weight:500;font-size:clamp(24px,3vw,42px);line-height:1.25;color:var(--sj-paper);text-wrap:balance}',
'.lang-zh .sj-end{font-family:var(--sj-cjk);font-style:normal;font-weight:600;font-size:clamp(20px,2.4vw,32px);line-height:1.55}',

/* footer */
'.sj-foot{border-top:1px solid var(--sj-line);background:var(--sj-night2)}',
'.sj-colophon{max-width:1240px;margin:0 auto;padding:clamp(28px,3.6vw,48px) clamp(24px,5vw,72px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,2.6vw,36px)}',
'.sj-colophon>span{display:flex;flex-direction:column;gap:6px}',
'.sj-colophon i{font-style:normal;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--sj-soft)}',
'.lang-zh .sj-colophon i{font-family:var(--sj-cjk);letter-spacing:.08em}',
'.sj-colophon b{font-weight:500;font-size:clamp(12.5px,1.1vw,14px);line-height:1.55;color:var(--sj-ink)}',
'.sj-proverb{border-top:1px solid var(--sj-line);padding:clamp(48px,7vw,100px) clamp(24px,5vw,72px);text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px}',
'.sj-proverb-zh{font-family:"Noto Serif TC",var(--sj-cjk);font-weight:900;font-size:clamp(30px,5vw,68px);color:var(--sj-paper);letter-spacing:.12em;line-height:1.1}',
'.sj-proverb-en{font-family:var(--sj-serif);font-style:italic;font-size:clamp(15px,1.6vw,21px);color:var(--sj-soft)}',
'.lang-zh .sj-proverb-en{font-family:var(--sj-cjk);font-style:normal}',

/* reveal */
'.sj-rev{opacity:0;transform:translateY(22px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}',
'.sj-rev.sj-in{opacity:1;transform:none}',
'@media (prefers-reduced-motion:reduce){.sj-rev{opacity:1;transform:none;transition:none}}',

/* responsive */
'@media (max-width:980px){.sj-beasts{grid-template-columns:repeat(2,minmax(0,1fr))}.sj-beast:last-child{grid-column:1/-1}.sj-methods{grid-template-columns:repeat(2,minmax(0,1fr))}.sj-refl{grid-template-columns:1fr}.sj-colophon{grid-template-columns:1fr}.sj-tr{grid-template-columns:1fr 1fr}.sj-th{display:none}.sj-td-a{grid-column:1/-1}}',
'@media (max-width:760px){.sj-hero{min-height:auto}.sj-hero-inner{padding-top:clamp(120px,40vw,220px)}.sj-han{font-size:clamp(90px,26vw,140px)}.sj-split,.sj-split-r,.sj-vids,.sj-games,.sj-qs,.sj-dec-grid,.sj-dec-grid-3,.sj-dec-grid-img,.sj-rev-cols,.sj-dec-grid-cards,.sj-pairs,.sj-spells{grid-template-columns:1fr}.sj-trip{grid-template-columns:1fr}.sj-tr{grid-template-columns:1fr}.sj-dec-grid-img .sj-fig-tall{max-width:360px}.sj-rev-cols .sj-fig{order:-1}.sj-methods{grid-template-columns:1fr}}'
  ].join('\n');
})();
