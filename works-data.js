/* ============================================================================
   WORKS_DATA — Yunbo portfolio
   11 projects (项目.docx) + 3 research entries (研究经历.docx).
   Research 1 (Babel — duplicate) and 2 (Ink Painting) dropped per request.
   Categories follow Yunbo's mapping: VR & games -> games, Dragon Gate -> models,
   Mistake/Deep Time/RAIN -> experiments, Hyper Glimpse + research -> papers.
   media: 'image' uses <image-slot> (drag-fillable); 'video' uses a video slot.
   ========================================================================== */
window.WORKS_DATA = {
  order: ['games', 'models', 'experiments', 'papers'],
  cats: {
    games: {
      num: '01', en: 'Interaction / Games', zh: '交互 / 游戏',
      sub_en: 'Playable & interactive', sub_zh: '可玩 · 交互',
      items: [
        {
          id: 'paranoid', title: "Paranoid's Dream",
          tag_en: 'A VR experiment on mental health & digital identity',
          tag_zh: '一场关于心理健康与数字身份的 VR 实验',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Feb – Jun 2023', v_zh: '2023.02 – 06' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Collaborative / Independent', v_zh: '合作 · 独立' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Environment Art · Level Design · UE5 Blueprints', v_zh: '环境美术 · 关卡 · 蓝图' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'My first VR project', v_zh: '第一个 VR 项目' }
          ],
          tech: ['Unreal Engine 5', 'Nanite · Level Streaming', 'Maya', 'Substance 3D Painter'],
          stack: [{ en: 'VR' }, { en: 'UE5' }, { en: 'Interaction', zh: '交互' }],
          overview_en: "A VR experience that stages a patient's mental breakdown as an endless loop — no jump scares, just the dawning feeling that your own mind has trapped you. I built the space and its logic to turn paranoia into something you physically inhabit.",
          overview_zh: '一段把患者精神崩溃演绎成无限循环的 VR 体验——没有 jump scare，只有"自己的大脑把你困住了"的逐渐逼近。我负责把偏执转化成可以亲身进入的空间。',
          impl: [
            { h_en: 'Gaze-based interaction', h_zh: '注视交互', media: 'video',
              b_en: 'Objects transform and textures shift only when you look away — a UE5 Blueprint system keyed to the viewport that leaves you feeling watched and never in control.',
              b_zh: '物体只在你移开视线时变形、材质只在背后改变——基于视口检测的蓝图系统，让人始终觉得被注视、被夺走控制权。' },
            { h_en: 'Colour psychology & shifting textures', h_zh: '色彩心理与材质渐变', media: 'image',
              b_en: 'PBR materials in Substance Painter start calm and blue, then bleed into violent reds and purples as the paranoia deepens — the texture itself becomes the narrator.',
              b_zh: '用 Substance Painter 制作的 PBR 材质从平静的蓝调开始，随偏执加深逐渐染成刺目的红与紫——材质本身成了叙事者。' },
            { h_en: 'Seamless looping architecture', h_zh: '无缝循环空间', media: 'image',
              b_en: 'UE5 Level Streaming teleports you back into an altered version of the same room each time you open a door to escape, dissolving your sense of place.',
              b_zh: '用 UE5 Level Streaming，每当你推门逃离，就被悄悄传送回同一房间的变体，瓦解你的空间感。' }
          ],
          reflect_en: "My first VR project taught me that Blueprint logic and texture work aren't decoration — they're how a space builds empathy. Watching testers genuinely lose their bearings set my course toward environments that let us feel mental-health struggles from the inside.",
          reflect_zh: '第一个 VR 项目让我明白：蓝图逻辑与材质从不是装饰，而是空间生成共情的方式。看着测试者真的失去方向，我确定了之后的方向——让人从内部体会心理困境。'
        },
        {
          id: 'space', title: 'Space of Another Reality: Time & Order',
          tag_en: 'A virtual exhibition game on space & scale — published on Steam',
          tag_zh: '关于空间与尺度的虚拟展览游戏 · 已上架 Steam',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Jun – Aug 2022', v_zh: '2022.06 – 08' },
            { k_en: 'Platform', k_zh: '平台', v_en: 'Published on Steam', v_zh: '已上架 Steam' },
            { k_en: 'My section', k_zh: '我的分区', v_en: '"Time & Order" 时间与秩序', v_zh: '"时间与秩序"' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'My first 3D project', v_zh: '第一个三维项目' }
          ],
          tech: ['Unreal Engine', 'Blueprints'],
          stack: [{ en: 'UE5' }, { en: 'Interaction', zh: '交互' }, { en: 'Steam' }],
          overview_en: 'A first-person museum you walk through on Steam. My sector, "Time & Order," uses dream-like scenes to question social rules — letting chaos and order collide in a space the visitor controls.',
          overview_zh: '一座可在 Steam 上第一人称漫游的美术馆。我负责的"时间与秩序"用一连串梦境场景质询社会规则，让混乱与秩序在观众自主掌控的空间里碰撞。',
          impl: [
            { h_en: 'First-person interactive viewing', h_zh: '第一人称交互观看', media: 'image',
              b_en: 'The viewer sets their own distance to each work, turning passive looking into active exploration.',
              b_zh: '观众自行决定与作品的距离，把被动观看变成主动探索。' },
            { h_en: 'Playing with space & scale', h_zh: '玩转空间与尺度', media: 'image',
              b_en: 'Giant statues beside tiny, fragile borders stage "chaos vs. order" and unsettle your sense of size in the virtual world.',
              b_zh: '把巨像与脆弱的小边界并置，演绎"混乱与秩序"，扰动你在虚拟世界里的尺度感。' },
            { h_en: 'Chinese cultural roots', h_zh: '文化根脉', media: 'image',
              b_en: 'Inspired by the scale of the Leshan Giant Buddha, I brought giant Buddhist statues into the dream — turning abstract "chaos/order" into cultural symbols.',
              b_zh: '受乐山大佛体量启发，把巨型佛像引入梦境，将抽象的"混乱/秩序"化为文化符号。' }
          ],
          reflect_en: "My first 3D build, and my first time bringing my Chinese cultural background into digital art. It made me curious about how an interactive space full of cultural symbols can challenge a player's sense of rules, scale and freedom — the critical power of games.",
          reflect_zh: '我的第一个三维作品，也是第一次把中国文化背景带进数字艺术。它让我开始着迷：一个布满文化符号的可交互空间，如何挑战玩家对规则、尺度与自由的认知——这正是游戏的批判力量。'
        },
        {
          id: 'primal', title: 'Primal Hunting',
          tag_en: 'A VR + EMG game on rehabilitation & industrial alienation',
          tag_zh: '结合 VR 与肌电（EMG）的康复 / 工业异化游戏',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Apr – Jun 2024', v_zh: '2024.04 – 06' },
            { k_en: 'Type', k_zh: '类型', v_en: 'VR + hardware integration', v_zh: 'VR + 硬件整合' },
            { k_en: 'Audience', k_zh: '面向', v_en: 'Gamers & users in rehab', v_zh: '玩家 · 康复使用者' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Game Design · VR & EMG integration', v_zh: '游戏设计 · VR/EMG 整合' }
          ],
          tech: ['Unreal Engine 5', 'VR · Physics', 'Electromyography (EMG)'],
          stack: [{ en: 'VR' }, { en: 'EMG', zh: '肌电 EMG' }, { en: 'UE5' }],
          overview_en: 'A VR archery game wired to EMG sensors that read real muscle signals. For players it\'s immersive; for users in rehab it\'s a therapeutic tool — wrapped in a narrative, after Chaplin\'s Modern Times, where nature curdles into a "steel jungle."',
          overview_zh: '一款接入 EMG 肌电传感器、读取真实肌肉信号的 VR 射箭游戏。对玩家是沉浸体验，对康复使用者是治疗工具；外层包裹着一个致敬卓别林《摩登时代》的叙事——自然逐渐变成"钢铁丛林"。',
          impl: [
            { h_en: 'EMG + VR integration', h_zh: '肌电与 VR 融合', media: 'video',
              b_en: 'Drawing the bow is driven by actual muscle strength read from EMG, translated into arrow power — precise motor feedback that doubles as rehab exercise.',
              b_zh: '拉弓动作由 EMG 读取的真实肌力驱动并转化为箭的力量，提供精准动作反馈，同时成为康复训练。' },
            { h_en: 'Real physics & haptics', h_zh: '真实物理与触觉', media: 'image',
              b_en: 'UE5 physics simulates arrow flight and collisions; controller vibration and sound let you feel the tension of every shot.',
              b_zh: 'UE5 物理模拟箭的飞行与碰撞，配合手柄震动与声音，让你感到每一箭的张力。' },
            { h_en: 'Environmental narrative of alienation', h_zh: '异化的环境叙事', media: 'image',
              b_en: 'The world shifts from nature into a giant machine — a metaphor for industry devouring the individual.',
              b_zh: '世界从自然滑向巨型机械——隐喻工业对个体的吞噬。' }
          ],
          reflect_en: 'My first time wiring biological hardware to a digital world. It opened my eyes to accessibility in HCI — proof that immersive tech can serve marginalized bodies, and a direct line into my PhD interest in bio-responsive, accessible design.',
          reflect_zh: '第一次把生物硬件接入数字世界。它让我看见 HCI 中的"可达性"——沉浸技术可以服务被忽视的身体，也直接连向我博士阶段对生物响应与无障碍设计的兴趣。'
        },
        {
          id: 'yinyang', title: 'Yin-Yang The Moon 阴阳月',
          tag_en: 'A Unity 2D narrative platformer on myth & modern burnout',
          tag_zh: '关于神话与现代倦怠的 Unity 2D 叙事平台跳跃',
          cover: 'image',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Aug – Nov 2023', v_zh: '2023.08 – 11' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Independent game', v_zh: '独立游戏' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Game Design · Narrative · Unity C# · Ink-wash art', v_zh: '设计 · 叙事 · Unity C# · 水墨美术' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'First Unity 2D & ink-wash style', v_zh: '第一个 Unity 2D / 水墨风' }
          ],
          tech: ['Unity (2D)', 'C#', 'Digital Painting'],
          stack: [{ en: 'Unity' }, { en: 'C#' }, { en: '2D Narrative', zh: '2D 叙事' }],
          overview_en: 'An ink-wash 2D game that wears an ancient tale of souls on the Yellow Spring Road — but reads as a metaphor for "996" work culture and "spiritual suicide." Built on Goffman\'s role theory: pressure turns the young into wandering ghosts.',
          overview_zh: '一款水墨风 2D 游戏，表面讲黄泉路上游魂与孟婆汤的古老故事，实则隐喻"996"与"精神自杀"。以戈夫曼的角色理论为基：极端压力把年轻人变成游荡的鬼魂。',
          impl: [
            { h_en: 'Traditional ink-wash aesthetics', h_zh: '中国传统水墨美术', media: 'image',
              b_en: 'Everything moves like a living ancient painting — a deliberate break from my 3D habits.',
              b_zh: '从角色到山河都像一幅活起来的古画——刻意离开我熟悉的三维。' },
            { h_en: 'Unity 2D platforming', h_zh: 'Unity 2D 平台机制', media: 'video',
              b_en: "C# scripts drive jumps across fragmented platforms — the broken footing mirrors the characters' fragile minds.",
              b_zh: '用 C# 实现在破碎平台间跳跃，难以落脚的关卡映照角色脆弱的精神。' },
            { h_en: 'Allegorical narrative', h_zh: '寓言式叙事', media: 'image',
              b_en: "Choices like shattering the bowl of Meng Po's soup become acts of refusing exploitation and memory loss.",
              b_zh: '"打碎孟婆汤"等选择，成为拒绝被剥削、拒绝遗忘的行动。' }
          ],
          reflect_en: 'Indie games showed me their real power here — Chinese aesthetics and sharp social critique in one object. It deepened my drive to research how cultural narratives in games can reflect and heal modern trauma.',
          reflect_zh: '独立游戏在这里向我展示了真正的力量——把中国美学与尖锐的社会批评装进同一件作品。它加深了我的研究冲动：游戏中的文化叙事如何映照并疗愈现代创伤。'
        },
        {
          id: 'babel', title: 'Babel Refractions',
          tag_en: 'A VR journey through modern alienation — my Final Year Project',
          tag_zh: '穿越现代异化的 VR 旅程 · 本科毕业设计',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Jan – May 2025', v_zh: '2025.01 – 05' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Final Year Project / Individual', v_zh: '毕业设计 · 个人' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Game Design · VR Dev · 3D & Technical Art', v_zh: '设计 · VR 开发 · 三维/技术美术' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'Culmination of my undergrad', v_zh: '本科生涯收官' }
          ],
          tech: ['Unreal Engine 5', 'VR', 'Maya', 'Blender'],
          stack: [{ en: 'VR' }, { en: 'UE5' }, { en: 'Interaction', zh: '交互' }],
          overview_en: 'My FYP: a VR experience that uses the Tower of Babel myth to stage modern "alienation." Four metaphorical worlds — rules, slogans, industry, goals — put the headset on as a mirror, forcing you to physically feel modern pressure.',
          overview_zh: '我的毕业设计：以"巴别塔"神话演绎现代"异化"的 VR 体验。规则、口号、工业、目标四个隐喻世界，让头显成为一面镜子，逼你亲身感受现代社会的压力。',
          impl: [
            { h_en: 'Metaphorical level design', h_zh: '隐喻关卡设计', media: 'video',
              b_en: "Four distinct worlds — a Chaplinesque machine where you're a trapped gear; a Sisyphus / Pink-Floyd \"wall\" of impossible goals.",
              b_zh: '四个迥异世界——卓别林式的机械里你是被困的齿轮；西西弗斯与平克·弗洛伊德《墙》构成无尽追逐的高墙。' },
            { h_en: 'Embodied VR experience', h_zh: '具身化的虚拟体验', media: 'image',
              b_en: 'Instead of reading about pressure, you navigate overwhelming architectures — turning abstract sociology into physical feeling.',
              b_zh: '你不是阅读压力，而是穿行于压迫性的巨构，把抽象社会学变成身体感受。' },
            { h_en: '32 in-engine captures + a catalogue', h_zh: '32 张引擎内捕捉 + 衍生画册', media: 'image',
              b_en: '18-person user testing on Quest 2 & Vive Pro; ~15 min average experience, plus a derived hardcover catalogue.',
              b_zh: '在 Quest 2 与 Vive Pro 上完成 18 人测试，平均体验约 15 分钟，并衍生出一本精装画册。' }
          ],
          reflect_en: 'The perfect close to my undergrad — and proof that VR is a serious medium for philosophical storytelling. We can use digital tools not to escape reality but to reflect on it; this shaped my focus on immersive media and the alienation we live inside.',
          reflect_zh: '为本科收尾的最佳方式，也证明了 VR 是哲学叙事的严肃媒介。数字工具不该只是逃离现实，而能让我们反思现实——这塑造了我对沉浸媒介与"异化"的研究焦点。'
        },
        {
          id: 'onemorestep', title: 'One More Step',
          tag_en: 'Six days, six broken rules — a Sokoban about the student commute',
          tag_zh: '六天 · 六次被打破的规则——一款关于上学路的推箱子',
          cover: 'image', cover_src: 'assets/onemorestep/cover-title.png',
          play: 'https://gd.games/games/2dbfb067-c19f-4d82-a0d3-dc8213fa4907',
          play_label_en: 'Play in browser', play_label_zh: '在线试玩',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Jan – Mar 2026', v_zh: '2026.01 – 03' },
            { k_en: 'Course', k_zh: '课程', v_en: 'CCME0130 Digital Game Design · UCL IOE', v_zh: 'CCME0130 数字游戏设计 · UCL IOE' },
            { k_en: 'Team', k_zh: '团队', v_en: 'Yunbo Guo · Emily Ng', v_zh: '郭昀波 · Emily Ng' },
            { k_en: 'My role', k_zh: '我的角色', v_en: 'Game design · all GDevelop programming · level design', v_zh: '游戏设计 · 全部 GDevelop 编程 · 关卡设计' }
          ],
          tech: ['GDevelop (2D)', 'Piskel (pixel art)', 'Custom grid movement', 'Procedural rhetoric · Abusive design'],
          stack: [{ en: 'GDevelop' }, { en: '2D' }, { en: 'Pixel', zh: '像素' }],
          overview_en: 'A two-player-thinking, six-level Sokoban where a tired student must push their ID card — the box — all the way to the UCL Knowledge Lab. Leave the card behind and you can\'t get in. The walk to school is made deliberately hard: a metaphor, through "procedural rhetoric" (Bogost) and "abusive game design" (Wilson & Sicart), for the invisible labour of the daily commute. I did the design and all of the GDevelop programming; Emily Ng led the pixel art.',
          overview_zh: '一款六关卡的推箱子游戏：一名疲惫的学生必须把学生证——也就是"箱子"——一路推到 UCL Knowledge Lab。把卡丢下，就进不去门。我们刻意让"走去上学"变得艰难——借 Bogost 的"程序修辞"与 Wilson & Sicart 的"受虐型游戏设计"，隐喻通勤里那些看不见的情绪劳动。我负责设计与全部 GDevelop 编程，Emily Ng 主导像素美术。',
          impl: [
            { h_en: 'Day 1 · Mind the Cars', h_zh: '第一天 · 小心车辆', media: 'image', src: 'assets/onemorestep/day1-cars.png',
              b_en: 'A delivery van tears across the road right-to-left; touch it and the level restarts. I built two routes into the map, so the puzzle becomes watch-the-rhythm and choose your moment to cross.',
              b_zh: '一辆货车在马路上从右向左飞驰，碰到就重开本关。我在地图里预留了两条路——于是解谜变成"看准节奏、择时过马路"。' },
            { h_en: 'Day 2 · Inverted', h_zh: '第二天 · 颠倒', media: 'image', src: 'assets/onemorestep/day2-city.jpg',
              b_en: 'The student is so exhausted the world feels reversed, so I rewrote the controls: press Left and you go right. The mechanical frustration is the story of being too tired to think straight.',
              b_zh: '学生太累，连方向感都颠倒了——于是我重写了操作：按左反而向右。这种机制上的别扭，正是"累到无法正常思考"的叙事。' },
            { h_en: 'Day 3 · The Burden', h_zh: '第三天 · 负担', media: 'image', src: 'assets/onemorestep/day3-pull.png',
              b_en: 'Here the card pulls the player backwards instead of being pushed. I inverted the move-and-collision logic for all four directions — you feel physically tethered to the thing you carry.',
              b_zh: '这一关里，卡片不再被推，而是把你向后拽。我把四个方向的移动与碰撞逻辑全部反转——让人切实感到被所背负之物"拴住"。' },
            { h_en: 'Day 4 · Rainy London', h_zh: '第四天 · 雨天伦敦', media: 'image', src: 'assets/onemorestep/day4-rain.png',
              b_en: 'Rain animation, a darker palette, a cat hiding under an awning — and slippery physics: I cut the snap-to-grid and added acceleration / deceleration so you skid and can\'t stop cleanly.',
              b_zh: '雨的动画、压暗的色调、躲在雨棚下的小猫——还有湿滑的物理：我取消了对格指令，加入加减速，让人物打滑、难以干脆停下。' },
            { h_en: 'Day 5 · Tremor', h_zh: '第五天 · 震感', media: 'image', src: 'assets/onemorestep/day5-grid.jpg',
              b_en: 'A 2048-style slide: a key-press sends the card sliding until it slams into a wall. I gave the box a persistent force on input and a variable that zeroes on wall-collision, so nothing redirects it mid-slide.',
              b_zh: '类 2048 的滑动：一次按键让卡片一直滑到撞墙才停。我给箱子一个持续的力，并用一个"撞墙归零"的变量锁定方向，确保滑行途中不被打断。' },
            { h_en: 'Day 6 · Card Free (Saturday)', h_zh: '第六天 · 无卡日（周六）', media: 'image', src: 'assets/onemorestep/day6-cardfree.png',
              b_en: "It's Saturday — no class, no card needed. Players trained for five levels to push the box will fail if they do it here; the trick is to leave it behind and walk over alone. A pun and a deliberate subversion of the habit I'd built.",
              b_zh: '周六——不上课，也不需要卡。被前五关训练成"推箱子"的玩家，在这关照做就会失败；正解是把卡留下，自己走过去。一个双关，也是对我亲手养成的习惯的故意颠覆。' }
          ],
          reflect_en: 'The hardest lessons were in the code — killing a fragile exact-coordinate win-check for distance detection, swapping heavy per-tile sprites for tiled sprites to stop the lag — but the real proof was that the simplest 2D mechanic can carry huge emotional weight. Bending a different rule each day, so frustration itself becomes empathy, is exactly the kind of computational media I want to keep making: work that tells the hidden stories of stressed, marginalized people.',
          reflect_zh: '最难的功课其实在代码里——把脆弱的"精确坐标"通关判定换成距离检测、把吃资源的逐块精灵换成平铺精灵来消除卡顿——但真正的收获是：最简单的 2D 机制也能承载巨大的情感重量。每天打破一条不同的规则，让"挫败"本身变成共情，正是我想继续做的计算媒介：讲述被压力与边缘困住者的隐秘故事。'
        }
      ]
    },

    models: {
      num: '02', en: '3D works', zh: '三维',
      sub_en: '3D & environment art', sub_zh: '三维 · 环境美术',
      items: [
        {
          id: 'lightofmylife', title: 'Light of My Life',
          tag_en: 'A 3D animated short — colour returning to a grey world, for my dog',
          tag_zh: '一部三维动画短片——让灰色世界重获色彩，献给我的小狗',
          cover: 'video',
          play: 'https://youtu.be/pkTJHfpc-wk',
          play_label_en: 'Watch on YouTube', play_label_zh: '在 YouTube 观看',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: '2026', v_zh: '2026' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Individual 3D animated short', v_zh: '个人 · 三维动画短片' },
            { k_en: 'Tools', k_zh: '工具', v_en: 'Autodesk Maya · shader nodes · editing', v_zh: 'Autodesk Maya · 着色器节点 · 剪辑' },
            { k_en: 'My role', k_zh: '我的角色', v_en: 'Story · Modeling · Rigging · Animation · Lighting · Edit', v_zh: '故事 · 建模 · 绑定 · 动画 · 灯光 · 剪辑' },
            { k_en: 'For', k_zh: '献给', v_en: 'Xiaokui, my Chihuahua', v_zh: '我的吉娃娃 · 小奎' }
          ],
          tech: ['Autodesk Maya', 'Shader-node colour systems', 'Rigging · skin weights', 'Lighting & rendering', 'Edit & sound mix'],
          stack: [{ en: 'Maya' }, { en: '3D Animation', zh: '三维动画' }, { en: 'Shaders', zh: '着色器' }],
          overview_en: "A deeply personal 3D animated short, and a memorial to my dog Xiaokui. A man walks through a cold, surveilled, black-and-white city where red cameras forever look down on him. He comes home and touches his dog — and colour floods back into his body and his world. I originally wanted his body to crack like plaster, but my 3D skills weren't ready for that deformation, so I rebuilt the whole idea around colour: the metamorphosis is entirely visual, the dog the only source of colour and life.",
          overview_zh: '一部极其私人的三维动画短片，也是献给我小狗小奎的纪念。一个男人走过黑白、冰冷、被监控的城市，红色摄像头始终俯视着他。他回到家、抚摸他的狗——于是色彩重新涌回他的身体与世界。我原本想让他的身体像石膏一样龟裂，但当时的三维能力还做不到那样的形变，于是我把整个构想重建在"色彩"之上：蜕变完全靠视觉完成，而小狗是唯一的色彩与生命之源。',
          impl: [],
          reflect_en: "Letting go of the plaster-crack idea was the turning point: the limit forced colour, not shape, to carry the whole transformation — and the film is stronger for it. Making this for Xiaokui taught me that technical choices (a single shader node, one warm light) are emotional choices. It's the most personal thing I've made, and it showed me animation can hold grief and love at once.",
          reflect_zh: '放下"石膏龟裂"的点子是转折：限制反而逼出了"以色彩而非形变承载整场蜕变"——影片也因此更好。为小奎做这部片让我明白，技术选择（一个着色器节点、一盏暖光）本身就是情感选择。这是我做过最私人的作品，也让我看见动画可以同时盛放悲伤与爱。'
        },
        {
          id: 'dragongate', title: 'The Dragon Gate Inn',
          tag_en: 'A 3D environmental-storytelling piece on Wuxia & Fengshui',
          tag_zh: '关于武侠文化与风水的三维环境叙事',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Feb – Jun 2023', v_zh: '2023.02 – 06' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Individual project', v_zh: '个人项目' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Modeling · Texturing · Lighting · Cinematics', v_zh: '建模 · 材质 · 布光 · 镜头' }
          ],
          tech: ['Maya', 'Substance Painter', 'Unreal Engine 5', 'Niagara'],
          stack: [{ en: 'Maya' }, { en: 'UE5' }, { en: 'Environment', zh: '环境美术' }],
          overview_en: 'A desert "black inn" built from scratch — a shelter that looks safe but hides deadly secrets, told through the eyes of a tired ordinary traveller rather than a hero. Inspired by my Northwest-China hometown and the Wuxia classic Dragon Gate Inn.',
          overview_zh: '一座从零搭建的沙漠"黑店"——看似安全、暗藏杀机的客栈，用一个疲惫的普通旅人而非英雄的视角讲述。灵感来自我西北的家乡与武侠经典《龙门客栈》。',
          impl: [
            { h_en: 'Storytelling through detail', h_zh: '用细节叙事', media: 'image',
              b_en: "Cage-like windows, faint bloodstains, a hidden torture room — worn Substance textures act as silent clues to the inn's true nature.",
              b_zh: '牢笼般的窗、隐约的血迹、后院的暗刑室——做旧的 Substance 材质成为无言的线索。' },
            { h_en: 'Fengshui in spatial design', h_zh: '把风水织入空间', media: 'image',
              b_en: "A lucky water-and-dune setup ruined by the greedy innkeeper — a metaphor: evil eventually destroys whatever luck it's built on.",
              b_zh: '临水靠沙丘的吉相，却被贪婪店主败坏——隐喻：恶行终将毁掉它所依附的好运。' },
            { h_en: 'Desert storms & cinematic lighting', h_zh: '沙暴与电影化布光', media: 'video',
              b_en: 'Night torchlight guides the eye and hides secrets; Niagara drives a sandstorm; UE5 camera keyframing directs a cinematic.',
              b_zh: '夜色与火把引导视线、藏匿秘密；Niagara 驱动沙暴；UE5 摄影机关键帧导出一段电影化短片。' }
          ],
          reflect_en: "Building this alone leveled up my full Maya-to-UE5 pipeline — but more, it taught me a 3D space is never just a backdrop; it's an active storyteller. It deepened how I think about representing cultural identity in digital media.",
          reflect_zh: '独立完成它，让我打通了从 Maya 到 UE5 的完整管线；更重要的是，我明白三维空间从来不是背景，而是主动的叙事者。它加深了我对"在数字媒介中再现文化身份"的思考。'
        }
      ]
    },

    experiments: {
      num: '03', en: 'experiments', zh: '实验',
      sub_en: 'AI, AR & generative', sub_zh: 'AI · AR · 生成',
      items: [
        {
          id: 'deeptime', title: 'Deep Time',
          tag_en: 'A mixed-media AR installation on memory & the Proust Effect',
          tag_zh: '关于记忆与"普鲁斯特效应"的混合媒介 AR 装置',
          cover: 'video',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Feb 2023', v_zh: '2023.02' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Individual interactive installation', v_zh: '个人交互装置' },
            { k_en: 'Scale', k_zh: '体量', v_en: '12.95 × 11.74 × 4 m · 3 projectors · 9 gauze screens', v_zh: '12.95×11.74×4 米 · 3 投影 · 9 纱幕' },
            { k_en: 'Role', k_zh: '角色', v_en: '3D & AR · Physical Installation', v_zh: '三维/AR · 实体装置' }
          ],
          tech: ['Unreal Engine 5 (Niagara)', 'Cinema 4D', 'ARTIVIVE'],
          stack: [{ en: 'AR' }, { en: 'Interaction', zh: '交互' }, { en: 'UE5' }],
          overview_en: 'A deeply personal installation pairing AR video with real scents — winter soil, pool chlorine, crisp wind — collected from formative moments (coming out to my mother; recovering from a severe illness). Smell triggers memory; memory becomes a space you can stand inside.',
          overview_zh: '一件极私人的装置，把 AR 影像与真实气味并置——冬天的泥土、泳池的氯、清冽的风——这些气味采自塑造我的时刻（向母亲出柜、从重病中康复）。气味唤起记忆，记忆成为你可以走进的空间。',
          impl: [
            { h_en: 'Emotions via UE5 Niagara', h_zh: '用 Niagara 可视化情绪', media: 'video',
              b_en: 'Swirling chaotic particles for the anxiety of coming out; burning flames for the heat of shingles under a red therapy light.',
              b_zh: '用旋转混乱的粒子表现出柜时的焦虑，用燃烧的火焰还原红光下带状疱疹的灼热。' },
            { h_en: 'AR via ARTIVIVE', h_zh: '用 ARTIVIVE 实现 AR', media: 'image',
              b_en: 'Scanning printed images with a phone brings my 3D memory videos to life over the physical exhibition.',
              b_zh: '用手机扫描打印图像，我的三维记忆影像便在实体展场上"活"过来。' },
            { h_en: 'The physical Proust experience', h_zh: '实体的普鲁斯特体验', media: 'image',
              b_en: '3 projectors and 9 gauze screens build a dream-haze; placed scents make the digital art feel physically, emotionally real.',
              b_zh: '3 台投影与 9 层纱幕织出梦境般的雾，布置其间的气味让数字艺术变得可触、动情。' }
          ],
          reflect_en: 'More healing than technical — it helped me make peace with my past and reconnect with my mother. It proved digital media can be a tool for social empathy, and set my PhD goal: how interactive, mixed media can help people express identity and connect.',
          reflect_zh: '与其说是技术，不如说是疗愈——它让我与过去和解，也重新连接了母亲。它证明数字媒介可以成为社会共情的工具，并定下我的博士目标：交互与混合媒介如何帮助人表达身份、彼此连接。'
        },
        {
          id: 'rain', title: 'RAIN',
          tag_en: 'A generative-art project on social gender & fluid identity',
          tag_zh: '关于社会性别与流动身份的生成艺术',
          cover: 'image', cover_src: 'assets/rain/cover.png',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Jan – Mar 2024', v_zh: '2024.01 – 03' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Individual creative coding', v_zh: '个人 · 创意编程' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'First generative art / Processing project', v_zh: '第一个生成艺术 / Processing' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Creative Coder & Concept Designer', v_zh: '创意编程 · 概念设计' }
          ],
          tech: ['Processing (Java)'],
          stack: [{ en: 'Processing' }, { en: 'Generative', zh: '生成艺术' }],
          overview_en: 'Code-made generative art that compares gender to falling rain: not a fixed definition but something fluid, ever-changing, impossible to catch. Every drop is unique in rhythm and intensity — like every identity.',
          overview_zh: '用代码生成的艺术，把性别比作落雨：不是固定的定义，而是流动、不断变化、无法被捕捉的东西。每一滴雨的节奏与强度都独一无二——正如每一个身份。',
          impl: [
            { h_en: 'Simulating nature through code', h_zh: '用代码模拟自然', media: 'video',
              b_en: 'A Processing / Java algorithm gives each drop its own speed, thickness and rhythm, so the output is never the same twice.',
              b_zh: 'Processing/Java 算法让每滴雨有自己的速度、粗细与节奏，画面从不重复。' },
            { h_en: 'Identity as visual metaphor', h_zh: '把身份化作视觉隐喻', media: 'image',
              b_en: "Drops aren't drops but coloured letters falling freely — gender needs no fixed shape; it simply exists, fluid and free.",
              b_zh: '雨滴不是雨滴，而是自由坠落、各有其色的字母——性别无需固定形状，它只是流动而自由地存在。' }
          ],
          reflect_en: 'My first deep dive into creative coding — proof that raw algorithms, not just 3D engines, can voice complex social issues. Visualizing gender fluidity tied directly to my PhD interest: computational media that breaks stereotypes and supports social justice.',
          reflect_zh: '我第一次深入创意编程——证明除了三维引擎，纯粹的算法也能表达复杂的社会议题。把性别流动可视化，直接连向我的博士兴趣：用计算媒介打破刻板印象、支持社会正义。'
        }
      ]
    },

    papers: {
      num: '04', en: 'papers', zh: '论文',
      sub_en: 'Research & cross-media', sub_zh: '研究 · 跨媒介',
      items: []
    }
  }
};
/* ===== papers items archived — restore when ready =====
        {
          id: 'hyperglimpse', title: 'Hyper Glimpse: Babel Refractions Catalogue',
          tag_en: 'A cross-media publishing project & official teaching case',
          tag_zh: '跨媒介出版项目 · 官方教学案例',
          cover: 'image',
          meta: [
            { k_en: 'Timeline', k_zh: '时间', v_en: 'Jan – May 2025', v_zh: '2025.01 – 05' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Commercial & educational', v_zh: '商业 · 教学实践' },
            { k_en: 'Milestone', k_zh: '里程碑', v_en: 'Official XJTLU teaching case (CAT209)', v_zh: 'XJTLU CAT209 官方教学案例' },
            { k_en: 'Role', k_zh: '角色', v_en: 'Teaching Assistant · Cross-media Designer · Photographer', v_zh: '助教 · 跨媒介设计 · 摄影' }
          ],
          tech: ['InDesign', 'Photoshop', 'Lightroom', 'Generative AI', 'UE5 / Blender / Maya (render)'],
          stack: [{ en: 'InDesign' }, { en: 'Cross-media', zh: '跨媒介' }, { en: 'Render' }],
          overview_en: 'The physical extension of my VR project Babel Refractions — a 24-page hardcover catalogue. Built with my professor into an official cross-media teaching case for XJTLU\'s CAT209, it explores commercializing digital art and bridging virtual and print.',
          overview_zh: '我的 VR 项目 Babel Refractions 的实体延伸——一本 24 页精装画册。与教授一起把它做成 XJTLU CAT209 的官方跨媒介教学案例，探讨数字艺术的商业化，以及虚拟与印刷之间的桥梁。',
          impl: [
            { h_en: 'Cross-media workflow', h_zh: '跨媒介制作管线', media: 'image',
              b_en: 'High-quality renders from UE5 / Maya / Blender, AI-enhanced assets, Lightroom / Photoshop colour, then a 24-page InDesign layout — virtual spaces made tangible.',
              b_zh: '从 UE5/Maya/Blender 出图、用 AI 强化素材、Lightroom/Photoshop 校色，再到 InDesign 排出 24 页——把虚拟空间变成可触之物。' },
            { h_en: 'Pedagogy as a TA', h_zh: '作为 TA 的教学转化', media: 'image',
              b_en: 'I turned my production process into a structured module, now a permanent XJTLU case study guiding students on documentation, print prep and responsible AI use.',
              b_zh: '我把自己的制作流程整理成结构化教学模块，如今成为 XJTLU 的永久教学案例，指导学生做记录、备印与负责任地用 AI。' }
          ],
          reflect_en: 'A milestone for my professional growth: an immersive experience is only half the journey — a physical touchpoint reaches broader audiences. Working as a TA sparked my passion for teaching and research, and supports my PhD ambition across immersive tech, cross-media and pedagogy.',
          reflect_zh: '我职业成长的里程碑：沉浸体验只是旅程的一半——实体触点才能触达更广的观众。担任 TA 点燃了我对教学与研究的热情，也支撑我跨越沉浸技术、跨媒介与教育学的博士愿景。'
        },
        {
          id: 'fiveelements', title: 'Five Elements Strategy', kind: 'research',
          tag_en: 'Visualising Wu Xing through game mechanics',
          tag_zh: '用游戏机制可视化"五行"',
          cover: 'image',
          q_en: "How does an interactive simulation of the Five Elements cycle turn a player's tacit sense of philosophical balance into explicit strategic knowledge?",
          q_zh: '五行循环的交互模拟，如何把玩家对"平衡"的默会理解，转化为可言说的策略知识？',
          meta: [
            { k_en: 'Course', k_zh: '课程', v_en: 'CCME0058 Digital Media Enquiry · UCL IOE', v_zh: 'CCME0058 · UCL 教育学院' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Practice-based · interactive prototype', v_zh: '实践型 · 交互原型' },
            { k_en: 'Methods', k_zh: '方法', v_en: 'Design-Based & practice-based research', v_zh: '基于设计 / 实践型研究' }
          ],
          tech: ['HTML', 'CSS', 'JavaScript'],
          stack: [{ en: 'Web · JS' }, { en: 'Interactive prototype', zh: '交互原型' }],
          overview_en: 'A browser-based game wireframe that turns the Chinese philosophy of Wu Xing (metal, wood, water, fire, earth) into a playable strategy system — limited inventory, a Qi bar, Craft / Refine / Create modes, and Chaos / Waste failure states.',
          overview_zh: '一个浏览器端的游戏 wireframe，把中国"五行"哲学（金木水火土）变成可玩的策略系统——有限库存、Qi 能量条、Craft/Refine/Create 三种模式，以及 Chaos/Waste 失败状态。',
          impl: [
            { h_en: 'Method · theory into mechanics', h_zh: '方法 · 理论转化为机制', media: 'image',
              b_en: "Grounded in Sullivan's practice-based research, Frasca's simulation theory, Bogost's procedural rhetoric, Gee's game-based learning and Jewitt's multimodality.",
              b_zh: '理论上结合 Sullivan 的实践型研究、Frasca 的模拟理论、Bogost 的程序修辞、Gee 的游戏化学习与 Jewitt 的多模态。' },
            { h_en: 'Finding · failure teaches better than reward', h_zh: '发现 · 失败比奖励更能教学', media: 'image',
              b_en: 'My infinite-resource version felt flat; adding limited inventory and a Waste mechanic made players bear the cost of bad choices — and finally want to understand the rules. Mechanics themselves became an argument.',
              b_zh: '无限资源版本很平淡；加入有限库存与 Waste 机制后，玩家必须为错误选择付出代价，才真正愿意理解五行规则。机制本身成了一种论证。' }
          ],
          reflect_en: "Theory and mechanics line up cleanly here, but it's still a wireframe with no formal user testing — I can argue design intent, not proven learning. Next: playtesting whether players learn the cycle without text, plus sound design for stronger multimodal feedback.",
          reflect_zh: '理论与机制结合清晰，但它仍是 wireframe、没有正式用户测试——我只能论证设计意图，不能声称玩家真的学会了。下一步：通过 playtesting 检验玩家能否在无文字解释下学会五行，并加入声音设计强化多模态反馈。'
        },
        {
          id: 'pressx', title: 'Press X to Gay', kind: 'research',
          tag_en: 'Procedural rhetoric & queer romance in games — a theory essay',
          tag_zh: '游戏中的程序修辞与酷儿浪漫 · 理论论文',
          cover: 'image',
          q_en: 'Is LGBTQ+ representation in games only character visibility — or can rules, systems and player choice produce genuine procedural agency?',
          q_zh: '游戏中的 LGBTQ+ representation 仅仅是角色可见性，还是能通过规则、系统与玩家选择，真正生成 procedural agency？',
          meta: [
            { k_en: 'Course', k_zh: '课程', v_en: 'CCME0058 Digital Media Theory · UCL IOE', v_zh: 'CCME0058 · UCL 教育学院' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Critical game studies · theory essay', v_zh: '批判性游戏研究 · 理论' },
            { k_en: 'Cases', k_zh: '案例', v_en: "Baldur's Gate 3 · Life is Strange 2", v_zh: '巴德之门 3 · 奇异人生 2' }
          ],
          tech: ['Comparative case study', 'Procedural rhetoric · Performativity'],
          stack: [{ en: 'Theory', zh: '理论' }, { en: 'Game studies', zh: '游戏研究' }],
          overview_en: 'A theory paper — "Press X to Gay: Procedural Rhetoric, Performativity, and the Horizons of Queer Romance in Baldur\'s Gate 3 and Life is Strange 2." It argues diversity must reach the underlying code, not just the surface.',
          overview_zh: '一篇理论论文——《Press X to Gay：巴德之门 3 与奇异人生 2 中的程序修辞、操演性与酷儿浪漫的边界》。它主张：多元必须进入底层代码，而不只是表层。',
          impl: [
            { h_en: 'Two models compared', h_zh: '比较两种模型', media: 'image',
              b_en: "Life is Strange 2's discovery-based queer romance (built through small choices) vs. Baldur's Gate 3's systemic normalization (removing the gender-check so queer and straight love are equally possible).",
              b_zh: '奇异人生 2 的"发现式"酷儿浪漫（由细微选择生成）对比巴德之门 3 的"系统性常态化"（移除性别判定，让酷儿与异性恋之爱在系统层面同等可能）。' },
            { h_en: 'Critical concepts I proposed', h_zh: '我提出的批判概念', media: 'image',
              b_en: 'the Algorithmic Closet, Pinkwashing, and Algorithmic Quantification — intimacy reduced to approval points and romance flags.',
              b_zh: '我提出的概念：Algorithmic Closet、Pinkwashing 与 Algorithmic Quantification——亲密被简化为好感点数与浪漫旗标。' }
          ],
          reflect_en: 'Deep theoretical analysis, but no prototype — it proves my conceptual range over technical making. It also taught me "everyone can love everyone" can flatten specific queer histories; my future work will centre culturally specific queer experience over Western-context representation alone.',
          reflect_zh: '理论分析很深，但没有 prototype——它更能证明我的概念能力，而非技术能力。它也让我意识到"人人可爱所有人"可能抹平具体的酷儿历史；我未来的研究会更关注文化语境下的酷儿经验，而非只停留在西方语境的 representation。'
        },
        {
          id: 'shatteredjade', title: 'Shattered Jade', kind: 'research', wip: true,
          tag_en: 'Proceduralizing the closet through rogue-lite mechanics — current dissertation',
          tag_zh: '用 rogue-lite 机制将"隐匿/出柜"程序化 · 进行中的硕士论文',
          cover: 'video',
          q_en: 'How can rogue-lite mechanics proceduralise filial expectation, concealment and queer survival in a Sinophone / Wuxia-inspired game prototype?',
          q_zh: 'rogue-lite 机制如何将孝道期待、隐匿与酷儿生存，在一个华语 / 武侠语境的游戏原型中程序化？',
          meta: [
            { k_en: 'Status', k_zh: '状态', v_en: 'In progress · framework + prototype', v_zh: '进行中 · 框架与原型' },
            { k_en: 'Type', k_zh: '类型', v_en: 'Practice-based dissertation', v_zh: '实践型硕士论文' },
            { k_en: 'Form', k_zh: '形态', v_en: 'Wuxia-inspired, Vampire-Survivors-like', v_zh: '武侠题材 · 类《吸血鬼幸存者》' }
          ],
          tech: ['Practice-based game prototype', 'Reflective practice · Autoethnography', 'Rule-based feedback'],
          stack: [{ en: 'Prototype', zh: '原型' }, { en: 'Rogue-lite' }],
          overview_en: 'My ongoing dissertation. A small playable prototype, Shattered Jade, where the son of a martial-arts sect master fights to free his imprisoned male lover. The sect is at once a martial institution and a symbol of patriarchy, lineage, reputation and heterosexual expectation.',
          overview_zh: '我正在推进的硕士论文。一个小型可玩原型 Shattered Jade：一位名门武林宗主之子，试图救出被囚于门派地牢的男性恋人。门派既是武学机构，也是父权、血脉、声誉与异性恋期待的象征。',
          impl: [
            { h_en: 'Practice + reflection + autoethnography', h_zh: '实践 + 反思 + 自我民族志', media: 'video',
              b_en: 'The prototype is the research; I log why each design choice (enemy density, defensive upgrades) encodes social pressure, endurance, silence or compliance, using my own situated cultural perspective.',
              b_zh: '原型即研究；我记录每个设计选择（敌群密度、防御升级）如何编码社会压力、忍耐、沉默或顺从，并以自身的处境化文化视角解读。' },
            { h_en: 'Rule-based, not generative AI', h_zh: '规则驱动，而非生成式 AI', media: 'image',
              b_en: "I tightened scope from AI to a rule-based feedback system simulating family judgement and institutional pressure — more controllable, and right for the dissertation's ethical and time limits.",
              b_zh: '我把范围从 AI 收紧为规则化反馈系统，模拟家庭审判与制度压力——更可控，也契合论文的伦理与时间边界。' },
            { h_en: 'Mechanics as queer survival', h_zh: '机制即酷儿生存', media: 'image',
              b_en: 'Enemy waves = relentless pressure; movement = evasion; attack upgrades = open resistance (higher risk); defensive upgrades = endurance / internalized compliance; the death loop = repeated failure and partial progress.',
              b_zh: '敌群＝持续压力；移动＝游移逃避；攻击升级＝公开抵抗（更高风险）；防御升级＝忍耐/内化顺从；死亡循环＝反复失败与局部进步。' }
          ],
          reflect_en: 'This ties my path together — the queer-mechanics theory of Press X to Gay, the procedural rhetoric of Five Elements, the pressure-as-space practice of Babel Refractions. The discipline is in defining boundaries: it\'s a situated experiment, not a claim to represent all Sinophone queer experience.',
          reflect_zh: '它把我的路径串起来——Press X to Gay 的酷儿机制理论、Five Elements 的程序修辞、Babel Refractions"把压力化为空间"的实践。难点在于界定边界：它是一个处境化的实验，而非声称代表所有华语酷儿经验。'
        }
      ]
===== end archived papers ===== */
