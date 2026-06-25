export const STORAGE_KEYS = {
  allocation: 'woman-up:allocation',
  training: 'woman-up:training',
  invite: 'woman-up:invite',
  wisdom: 'woman-up:wisdom',
  playerName: 'woman-up:player-name',
  leaderboard: 'woman-up:leaderboard',
};

export const ELEVATOR_TEST_MAX_SCORE = 500;
export const DUO_CLEAR_BONUS = 520;
export const WISDOM_TEST_VERSION = 'elevator-random-options-v1';
export const CHALLENGE_SECONDS = 10;
export const TARGET_PUNCHES = 5;
export const COMBO_STEPS = ['前手直拳', '后手直拳', '前手直拳', '闪身回位', '前手直拳'];

export const SYSTEM_TEAMMATE = {
  name: 'NOIR-77',
  code: 'SYS-NOIR-77',
  title: '系统队友',
  note: '已自动匹配 · 异步待命',
};

export const sliders = [
  { key: 'combat', label: '格斗训练', icon: '🥊', type: 'positive' },
  { key: 'survival', label: '学习生存知识', icon: '📖', type: 'positive' },
  { key: 'work', label: '工作/学习', icon: '💼', type: 'base' },
  { key: 'scroll', label: '刷短视频', icon: '📱', type: 'negative' },
  { key: 'sleep', label: '夜间睡眠', icon: '😴', type: 'base' },
  { key: 'love', label: '谈恋爱', icon: '💕', type: 'negative' },
  { key: 'strength', label: '力量训练', icon: '🏋️', type: 'positive' },
  { key: 'food', label: '饮食+休息', icon: '🍎', type: 'base' },
  { key: 'social', label: '无效社交', icon: '🗣️', type: 'negative' },
  { key: 'notes', label: '记录「训练笔记」或自我照料笔记', icon: '📝', type: 'positive' },
];

export const initialAllocation = {
  combat: 0,
  survival: 0,
  strength: 0,
  notes: 0,
  food: 0,
  sleep: 0,
  work: 0,
  love: 0,
  scroll: 0,
  social: 0,
};

export const rankProfiles = {
  S: {
    title: '战神觉醒',
    art: 'MMA',
    reason: '全能碾压，没有短板',
    quote: '我不需要被喜欢，我需要被害怕',
    punchline: '你把一天练成武器，世界开始重新估算你的危险等级。',
    advice: '保持强度，别伤着自己',
    radar: [96, 92, 90, 97, 94],
    timeline: [
      '你打烂第一个沙袋，手上有茧，眼里有光',
      '半夜听到脚步声，你转的是身，不是头',
      '有人想拉你进黑暗巷子，他选错了这辈子最后一件事',
      '你教女儿的第一课不是“小心”，是“打这里”',
    ],
  },
  A: {
    title: '铁血王者',
    art: '巴西柔术',
    reason: '以小博大，地面降维打击',
    quote: '地面就是我的主场',
    punchline: '你已经不是猎物，你是会等待时机的反击者。',
    advice: '再往前一步，就是战神',
    radar: [84, 86, 78, 88, 82],
    timeline: [
      '你开始享受被碾压再反杀的过程',
      '朋友说你眼神变了',
      '危险开始绕着你走',
      '你成为圈子里最不好惹的那个',
    ],
  },
  B: {
    title: '街刃行者',
    art: '泰拳',
    reason: '铁肘钢膝，正面摧毁',
    quote: '铁肘开路，废话少说',
    punchline: '你有锋芒，也有缺口。继续练，别把命交给运气。',
    advice: '周末加练一次，三个月后升档',
    radar: [72, 66, 74, 70, 62],
    timeline: ['你学会了肘膝连击', '你知道要害在哪', '够用，但别松懈', '你庆幸自己当年开始了'],
  },
  C: {
    title: '蓄力觉醒',
    art: '拳击',
    reason: '直拳开路，打出空间',
    quote: '你比自己想象的更强',
    punchline: '你还在门口，但门已经被你踹开一条缝。',
    advice: '每天只练10分钟，一年后你认不出自己',
    radar: [52, 45, 50, 58, 44],
    timeline: [
      '收藏夹里都是防身视频',
      '你告诉自己“没那么巧”',
      '运气是你唯一的武器',
      '你希望自己当年多练了一小时',
    ],
  },
  D: {
    title: '待宰羔羊',
    art: '入门体能',
    reason: '先活下来，再变强',
    quote: '觉醒从今天开始',
    punchline: '你不是弱，你只是还没开始把自己放回第一位。',
    advice: '从今天开始，每天5分钟。先把一小段时间留给训练、恢复和自我保护。',
    radar: [30, 28, 34, 42, 32],
    timeline: ['你觉得没必要', '你躲过了第一次', '那个“万一”来了', '你成为“幸存者”，而不是“战士”'],
  },
};

export const trajectoryDetails = {
  S: [
    {
      year: '1年后',
      headline: '沙袋开始记住你的名字',
      body: '你不再只是在收藏夹里看别人训练。你的肩背变厚，拳面有茧，睡前会复盘今天的步伐和防守漏洞。别人看到的是身材变化，你自己知道变的是反应速度和底气。',
    },
    {
      year: '2年后',
      headline: '你听见脚步声，会先判断距离',
      body: '夜里有人靠近时，你不会僵住。你会看反光、看出口、看对方手在哪里。恐惧还在，但它变成了仪表盘上的一个信号，而不是方向盘。',
    },
    {
      year: '5年后',
      headline: '危险开始重新计算成本',
      body: '你已经练出稳定的站姿、爆发和逃离路线。有人试图把你拖进黑暗角落时，他面对的不是一声尖叫，而是一套让他失去继续作恶能力的反制流程。',
    },
    {
      year: '10年后',
      headline: '你把安全感传给下一代',
      body: '你教年轻女孩的第一课不是“别惹事”，而是“身体属于你，边界由你守”。你不崇拜暴力，但你知道温柔必须有牙齿。',
    },
  ],
  A: [
    {
      year: '1年后',
      headline: '你学会在压力下呼吸',
      body: '训练让你习惯被压制、挣脱、再站起来。你开始理解真正的强不是一直赢，而是被推倒时还知道下一步怎么做。',
    },
    {
      year: '2年后',
      headline: '朋友说你眼神变了',
      body: '你说话更短，拒绝更快，走路会自然留意出口。你没有变冷漠，只是不再把每一次不舒服都替别人解释掉。',
    },
    {
      year: '5年后',
      headline: '危险开始绕着你走',
      body: '你能读懂靠近、试探、隔离和控制。很多麻烦在变成事件之前，就被你用距离、声音和动作打断。',
    },
    {
      year: '10年后',
      headline: '你成为圈子里最不好惹的那个',
      body: '不是因为你总在攻击，而是因为你清楚什么时候退、什么时候喊、什么时候必须打。你的存在会让身边人也站直一点。',
    },
  ],
  B: [
    {
      year: '1年后',
      headline: '你有了第一套可用动作',
      body: '肘、膝、前手直拳、转身撤离开始连成反应。你还会紧张，但身体已经不再完全空白。',
    },
    {
      year: '2年后',
      headline: '你知道要害在哪，也知道出口在哪',
      body: '你开始把“打赢”换成“活着出去”。这让你更冷静，也更难被情绪牵着走。',
    },
    {
      year: '5年后',
      headline: '够用，但别松懈',
      body: '你有锋芒，也有缺口。只要训练断得太久，身体会把速度还给沙发和手机。',
    },
    {
      year: '10年后',
      headline: '你庆幸自己当年开始了',
      body: '那几小时训练看起来微小，却在很多瞬间替你换来选择权。你不是无敌，但你不再赤手空白。',
    },
  ],
  C: [
    {
      year: '1年后',
      headline: '你还停在“知道应该练”',
      body: '你收藏了很多防身视频，也转发过很多安全提醒，但真正进入身体的动作不多。知识还在屏幕里，危险却从来不等加载。',
    },
    {
      year: '2年后',
      headline: '你开始用运气安慰自己',
      body: '你告诉自己没那么巧，自己不会遇到。可是每一次侥幸都会让身体更相信“不准备也可以”。',
    },
    {
      year: '5年后',
      headline: '运气成了你唯一的武器',
      body: '遇到压力时，你可能会冻结、讨好、解释，直到错过离开的窗口。你不是不勇敢，你只是缺少练过的反应。',
    },
    {
      year: '10年后',
      headline: '你希望当年多练了一小时',
      body: '你会发现，真正贵的不是训练时间，而是没有训练时失去的主动权。好消息是，今天还没结束。',
    },
  ],
  D: [
    {
      year: '1年后',
      headline: '你觉得没必要',
      body: '你把训练排到很远以后，把身体感受和自我保护放到今天之后。身体没有错，它只是按你的日程长成了现在的样子。',
    },
    {
      year: '2年后',
      headline: '第一次风险擦肩而过',
      body: '你侥幸躲过一次不舒服的靠近，于是更相信“应该不会有事”。但侥幸不是技能，它不能被你主动调用。',
    },
    {
      year: '5年后',
      headline: '那个“万一”来了',
      body: '当空间、力量和信息都不站在你这边时，你才发现自己没有准备声音、动作、路线和求援流程。',
    },
    {
      year: '10年后',
      headline: '幸存不是终点',
      body: '你可以继续把故事讲成“我运气不好”，也可以从今天开始把身体拿回来。觉醒不需要仪式，只需要五分钟。',
    },
  ],
};

export const martialArtsCards = [
  { name: 'MMA', line: '站立、摔投、地面全开，不给短板留活口', scene: '综合冲突、体能充足、需要全局压制' },
  { name: '巴西柔术', line: '被压住不是结局，是反击开始', scene: '体型差距、地面纠缠、近距离控制' },
  { name: '泰拳', line: '拳腿肘膝都是句号', scene: '正面威胁、近中距离、快速打断' },
  { name: '拳击', line: '前手直拳开门，脚步带你离场', scene: '制造空间、保护头部、快速撤离' },
  { name: '马伽术', line: '不漂亮，只求活着出去', scene: '真实威胁、弱点攻击、逃生优先' },
  { name: '菲律宾短棍', line: '手里有物，世界就多一层距离', scene: '随身物品防护、距离管理、手部保护' },
  { name: '跆拳道', line: '腿法拉开距离，反击从空间开始', scene: '距离控制、下肢爆发、快速阻隔' },
  { name: '摔跤', line: '重心一丢，局面就换主人', scene: '贴身拉扯、破坏平衡、防摔反摔' },
];

export const historicalWomenQuotes = [
  {
    name: '秋瑾',
    role: '革命者 / 诗人',
    quote: '身不得，男儿列；心却比，男儿烈。',
    source: '《满江红·小住京华》',
  },
  {
    name: '花木兰',
    role: '民间叙事中的代父从军者',
    quote: '愿为市鞍马，从此替爷征。',
    source: '《木兰辞》',
  },
  {
    name: '波伏瓦',
    role: '思想家',
    quote: '女人不是天生的，而是后天形成的。',
    source: '《第二性》核心命题译写',
  },
  {
    name: '玛格丽特·希尔达',
    role: '英国前首相',
    quote: '想让事情被说出来，找男人；想让事情被做成，找女人。',
    source: '常见公开引语',
  },
  {
    name: '贞德',
    role: '法国民族英雄',
    quote: '我并不害怕，我生来就是为了做这件事。',
    source: '常见精神化引语',
  },
  {
    name: '武曌',
    role: '中国历史上唯一女皇帝',
    quote: '无字碑前，功过由后人评。',
    source: '历史意象化表达',
  },
  {
    name: '叶卡捷琳娜大帝',
    role: '俄国女皇',
    quote: '权力不是装饰，而是承担和决断。',
    source: '精神化表达',
  },
];

export const historicalWomenStories = [
  {
    name: '武曌',
    era: '唐代',
    title: '从宫廷缝隙里夺回叙事权',
    story: '她在极其复杂的权力系统里向上攀登，最终成为中国历史上唯一被普遍承认的女皇帝。她的故事不是温顺神话，而是关于判断、手腕、耐心和掌控局面的长期训练。',
    lesson: '战斗力不只在拳头里，也在看清规则、利用规则、重写规则的能力里。',
  },
  {
    name: '秋瑾',
    era: '清末',
    title: '把诗写成刀，把身体交给革命',
    story: '秋瑾拒绝把女性命运锁在闺阁里。她学习新思想，提倡女权与教育，投身革命，并用诗文留下极强烈的自我宣言。',
    lesson: '真正的觉醒不是情绪上头，而是把愤怒变成学习、组织和行动。',
  },
  {
    name: '花木兰',
    era: '北朝民歌叙事',
    title: '穿上战甲，不是为了证明温柔无用',
    story: '木兰代父从军的故事，把家庭责任、身体勇气和长期伪装下的坚韧放在一起。她不是为了成为男人，而是为了在时代缺口里完成自己的选择。',
    lesson: '身体训练让人拥有选择权：能照顾别人，也能保护自己。',
  },
  {
    name: '贞德',
    era: '15世纪法国',
    title: '少女走进战场，改变一支军队的士气',
    story: '贞德以极年轻的年纪进入战争叙事，她最重要的力量不只是武器，而是信念、号召力和在恐惧面前继续向前的能力。',
    lesson: '人在压力场里最先崩掉的是意志；训练，就是让意志有支点。',
  },
  {
    name: '叶卡捷琳娜大帝',
    era: '18世纪俄国',
    title: '把外来身份变成统治能力',
    story: '她从异国公主成为俄国女皇，靠的不是被动等待，而是学习语言、经营联盟、掌握政治节奏，并在权力斗争中取得主动。',
    lesson: '处在陌生环境里，最重要的是快速学习、建立资源、保持判断。',
  },
  {
    name: '玛格丽特·希尔达',
    era: '20世纪英国',
    title: '在男性政治场里保持硬度',
    story: '她被称为“铁娘子”，这既是标签，也是她在冲突、谈判和长期压力下展现出的政治硬度。',
    lesson: '边界感不是大声说话，而是在关键时刻不退让。',
  },
  {
    name: '波伏瓦',
    era: '20世纪法国',
    title: '把“女性是什么”变成一道思想战场',
    story: '她用《第二性》拆解女性处境，让“女性不是天生被规定，而是在社会中被塑造”成为现代女性主义的重要命题。',
    lesson: '认知也是战斗力。先识别结构，才知道自己要挣脱什么。',
  },
];

export const survivalSkillCards = [
  {
    name: '情境感知',
    line: '先看见危险，才有资格选择战斗或离开',
    scene: '夜路、电梯、停车场、陌生邀约',
    focus: '看手、看距离、看出口、看人群和摄像头。',
    actions: ['进空间前先扫一眼出口和人流', '发现尾随或贴近时先停下，不把自己送进封闭空间', '把耳机音量降下来，给身体留反应时间'],
    avoid: '不要用“应该没事”覆盖身体发出的不舒服信号。',
  },
  {
    name: '边界表达',
    line: '声音先出拳，身体才有时间撤离',
    scene: '被纠缠、被逼近、关系中的越界',
    focus: '短句、命令式、可被旁人听见。',
    actions: ['直接说“别靠近我”“退后”“我不认识你”', '把位置和情况说出来，让风险被周围人听见', '说完立刻移动到光、人、门、保安附近'],
    avoid: '不要解释太多，也不要把拒绝包装成道歉。',
  },
  {
    name: '距离管理',
    line: '身体不进死角，手里要有阻隔物',
    scene: '排队、过道、电梯口、室内争执',
    focus: '把包、外套、雨伞、桌椅变成缓冲层。',
    actions: ['侧身站位，保证能转身离开', '用随身物品挡在中线，争取半步距离', '如果对方逼近，先向出口方向移动'],
    avoid: '不要退到墙角、车门内侧或电梯角落。',
  },
  {
    name: '封闭空间撤离',
    line: '不要把自己锁进没有旁观者的地方',
    scene: '电梯、楼梯间、出租屋门口、地下车库',
    focus: '宁愿多等一班，也不和风险对象同处一格。',
    actions: ['电梯门口觉得不对就不进，去大堂或有人的区域', '已在电梯里就靠近按钮和门，按最近楼层离开', '到安全区域后再处理消息、电话和情绪'],
    avoid: '不要为了“显得不尴尬”继续留在高风险空间。',
  },
  {
    name: '拖拽脱离',
    line: '目标不是赢，是制造空隙后离开',
    scene: '被拉手腕、被堵路、同伴被纠缠',
    focus: '顺势、转向、制造空隙、立刻去人多处。',
    actions: ['不要只向后拔河，先降低重心保护头颈', '利用对方拉力转向侧前方，争取让身体离开控制线', '一有空隙就去人群、店铺、保安或亮处'],
    avoid: '不要背对威胁乱跑，也不要在原地消耗体力。',
  },
  {
    name: '围困应对',
    line: '少对多时优先找边界，不站在开阔中央',
    scene: '多人起哄、街头冲突、夜间被堵',
    focus: '背后有墙、面前有出口，声音持续外放。',
    actions: ['往墙边、柱子、柜台或店门口移动，减少被围方向', '大声说位置和需求：“帮我报警”“我被围住了”', '能进店就进店，能上车就锁门报警'],
    avoid: '不要冲进更暗、更窄、更没人看的地方。',
  },
  {
    name: '证据链',
    line: '手机不是用来沉默的，是用来把风险外部化',
    scene: '骚扰、威胁、家暴、纠纷、报警前后',
    focus: '时间、地点、人物、威胁语言、伤情记录。',
    actions: ['打开录音/录像或外放通话，说清楚“我在什么地方”', '截图、保存聊天记录、记录车牌和时间线', '受伤后尽快验伤，保留票据和诊断材料'],
    avoid: '不要只在朋友圈宣泄，却没有留下可用证据。',
  },
  {
    name: '求助与复盘',
    line: '离开现场不是结束，要把求援链补上',
    scene: '报警、找物业/店员/朋友、事后恢复',
    focus: '可信联系人、明确话术、身体检查、复盘训练。',
    actions: ['把紧急联系人、定位共享、报警入口提前设好', '和可信的人同步“我在哪、发生了什么、下一步去哪”', '复盘自己哪里犹豫了，下次把动作练短一点'],
    avoid: '不要把“我是不是太敏感”放在安全之前。',
  },
];

export const survivalProtocols = [
  {
    title: '3秒扫描',
    subtitle: '进入任何空间前先做一次微型侦察',
    steps: ['出口在哪里', '谁离我太近', '有没有光/人/摄像头', '手里有没有可阻隔的东西'],
  },
  {
    title: '边界三句',
    subtitle: '用短句给身体争取移动时间',
    steps: ['别靠近我', '我不认识你', '帮我报警，我在这里被威胁'],
  },
  {
    title: '离场路线',
    subtitle: '危险时先选能活着出去的路径',
    steps: ['先去人多处', '再联系可信的人', '最后补证据和报警材料'],
  },
  {
    title: '事后证据包',
    subtitle: '把事件从“感觉”变成“记录”',
    steps: ['时间地点', '对方特征', '录音/截图/监控线索', '伤情和证人'],
  },
];

export const survivalScenarios = [
  {
    scene: '公共场合骚扰/纠缠',
    cue: '对方反复靠近、挑衅、要求你回应。',
    move: '不要私下解释，直接拉高音量并移动到店员、保安、摄像头附近。',
    line: '“我不认识你，别靠近我。麻烦帮我报警。”',
  },
  {
    scene: '电梯/楼道/地下车库',
    cue: '空间封闭、旁观者少、出口被挡。',
    move: '不进、提前出、靠近按钮和门；觉得不对就去大堂或亮处等下一步。',
    line: '“我先出去，你不要挡门。”',
  },
  {
    scene: '被拉扯或拖拽',
    cue: '只向后挣脱越来越费力，身体被带离人群。',
    move: '别和力量硬拔河，保护头颈，顺势转向侧前方制造空隙，立刻去人多处。',
    line: '“放手！我不认识你！”',
  },
  {
    scene: '同伴遇险/见义勇为',
    cue: '你也可能被拉入冲突，现场信息不完整。',
    move: '先报警说清位置，找遮挡物和旁观者，不贸然进入封闭或多人冲突中心。',
    line: '“我已经报警了，所有人后退。”',
  },
  {
    scene: '亲密关系暴力',
    cue: '手机被拿走、威胁升级、对方控制出行和社交。',
    move: '优先拉开物理距离，保留录音截图，受伤验伤，联系可信的人或当地援助机构。',
    line: '“我现在需要离开并联系第三方。”',
  },
  {
    scene: '独居/回家路上',
    cue: '门口停留陌生人、尾随、楼道异常安静。',
    move: '不要急着开门，转去便利店/物业/人多处，确认安全后再回家。',
    line: '“我到楼下了，先和你保持通话。”',
  },
];

export const survivalDrills = [
  { day: 'DAY 1', task: '设置紧急联系人、定位共享和一键报警入口。' },
  { day: 'DAY 2', task: '走一遍常去路线，标出三个可求助地点。' },
  { day: 'DAY 3', task: '练十遍边界三句，声音要短、稳、能被旁人听见。' },
  { day: 'DAY 4', task: '整理证据包模板：时间、地点、人物、截图、录音、伤情。' },
  { day: 'DAY 5', task: '做一次基础力量训练：深蹲、俯卧撑、平板支撑，各按自己能力完成。' },
  { day: 'DAY 6', task: '模拟电梯选择：不舒服就不进，已进入就按最近楼层离开。' },
  { day: 'DAY 7', task: '复盘一件曾经让你不舒服的小事，写下下次更短的回应。' },
];

export const wisdomQuestions = [
  {
    id: 'elevator',
    title: '深夜进电梯前，你发现陌生男人跟得很近',
    options: ['停在门口不进，转去大堂/保安/有人的区域', '先进电梯，假装没看见', '低头刷手机，避免显得紧张'],
    answer: 0,
    analysis: '文档反复强调：不要把自己锁进封闭空间。先选择有人、有光、有摄像头的地方，保留撤离余地。',
  },
  {
    id: 'distance',
    title: '电梯里对方不断贴近，还挡在按钮附近',
    options: ['后退到角落忍一忍', '明确出声制止，侧身靠近按钮和门，准备最近楼层出去', '背对他盯着电梯门，等到自己楼层'],
    answer: 1,
    analysis: '要用明确指令、距离管理和出口意识。不要把后背交出去，也不要退到完全被动的位置。',
  },
  {
    id: 'evidence',
    title: '对方开始言语挑衅，你判断还没有肢体冲突',
    options: ['继续单独争吵，把他骂到服软', '沉默低头，尽量不要刺激他', '打开录音/录像，外放通话，说清位置并准备求助'],
    answer: 2,
    analysis: '文档里强调证据和求助：先留证、说清位置、把风险暴露给外部，不要独自封闭在对峙里。',
  },
  {
    id: 'drag',
    title: '如果对方突然伸手拉你，你的第一反应应该是',
    options: ['利用身体惯性向侧前方冲开，制造空隙后立刻去有人的地方', '只向后死命挣脱', '转身就跑，把背后完全暴露出来'],
    answer: 0,
    analysis: '文档提到无效反抗包括只向后挣脱、转身乱跑。更好的目标是制造空隙、护住要害、迅速靠近人群或出口。',
  },
  {
    id: 'after',
    title: '安全离开后，你最应该补上的一步是',
    options: ['算了，别把事情闹大', '记录时间地点、保留证据，必要时报警/联系可信的人', '立刻发朋友圈宣泄，其他不用管'],
    answer: 1,
    analysis: '安全之后要把证据、时间线和求助链补上。不要只靠情绪释放，也不要让事件完全消失。',
  },
];

export const defaultTraining = {
  punches: 0,
  partnerPunches: 3,
  completed: false,
  comboComplete: false,
  partnerComplete: false,
  passedBy: '',
  camera: false,
  challengeSeconds: CHALLENGE_SECONDS,
  targetPunches: TARGET_PUNCHES,
};

export function getAllocation() {
  const saved = localStorage.getItem(STORAGE_KEYS.allocation);
  if (!saved) return initialAllocation;

  try {
    return { ...initialAllocation, ...JSON.parse(saved) };
  } catch {
    return initialAllocation;
  }
}

export function saveAllocation(allocation) {
  localStorage.setItem(STORAGE_KEYS.allocation, JSON.stringify(allocation));
}

export function hasSavedAllocation() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.allocation));
}

export function getPlayerName() {
  return localStorage.getItem(STORAGE_KEYS.playerName) || '你';
}

export function savePlayerName(name) {
  const cleanName = name.trim().slice(0, 18) || '匿名战士';
  localStorage.setItem(STORAGE_KEYS.playerName, cleanName);
  return cleanName;
}

export function getTraining() {
  const saved = localStorage.getItem(STORAGE_KEYS.training);
  if (!saved) return defaultTraining;

  try {
    return { ...defaultTraining, ...JSON.parse(saved) };
  } catch {
    return defaultTraining;
  }
}

export function saveTraining(training) {
  localStorage.setItem(STORAGE_KEYS.training, JSON.stringify(training));
}

export function getLeaderboardRecords() {
  const saved = localStorage.getItem(STORAGE_KEYS.leaderboard);
  if (!saved) return [];

  try {
    return normalizeLeaderboardRecords(JSON.parse(saved));
  } catch {
    return [];
  }
}

export function normalizeLeaderboardRecords(records) {
  if (!Array.isArray(records)) return [];
  return records
    .filter((record) => record?.name && Number.isFinite(Number(record.score)))
    .map((record) => ({
      ...record,
      name: String(record.name).trim().slice(0, 18),
      score: Number(record.score),
      duoScore: Number(record.duoScore || 0),
      updatedAt: Number(record.updatedAt || 0),
    }))
    .filter((record) => record.name)
    .sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt)
    .slice(0, 100);
}

export function cacheLeaderboardRecords(records) {
  const normalized = normalizeLeaderboardRecords(records);
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(normalized));
  return normalized;
}

export function saveLeaderboardRecord(record) {
  const current = getLeaderboardRecords();
  const existingIndex = current.findIndex((item) => item.name === record.name);
  const nextRecord = {
    ...record,
    updatedAt: Date.now(),
  };

  const next = [...current];
  if (existingIndex >= 0) {
    const existing = current[existingIndex];
    next[existingIndex] = nextRecord.score >= existing.score ? nextRecord : { ...existing, updatedAt: nextRecord.updatedAt };
  } else {
    next.push(nextRecord);
  }

  const sorted = next.sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt).slice(0, 60);
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(sorted));
  return sorted;
}

export async function fetchSharedLeaderboardRecords() {
  try {
    const response = await fetch('/api/leaderboard', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Leaderboard unavailable');
    const data = await response.json();
    return cacheLeaderboardRecords(data.records);
  } catch {
    return getLeaderboardRecords();
  }
}

export async function syncSharedLeaderboardRecord(record) {
  const localRecords = saveLeaderboardRecord(record);

  try {
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error('Leaderboard sync failed');
    const data = await response.json();
    return cacheLeaderboardRecords(data.records);
  } catch {
    return localRecords;
  }
}

export function getInvite() {
  const saved = localStorage.getItem(STORAGE_KEYS.invite);
  if (saved) return saved;
  const code = `WU-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  localStorage.setItem(STORAGE_KEYS.invite, code);
  return code;
}

export function getWisdomProgress() {
  const saved = localStorage.getItem(STORAGE_KEYS.wisdom);
  if (!saved) return {};

  try {
    const progress = JSON.parse(saved);
    if (progress._version !== WISDOM_TEST_VERSION) return {};
    const { _version, ...answers } = progress;
    return answers;
  } catch {
    return {};
  }
}

export function saveWisdomProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.wisdom, JSON.stringify({ ...progress, _version: WISDOM_TEST_VERSION }));
}

export function resetWisdomProgress() {
  localStorage.removeItem(STORAGE_KEYS.wisdom);
}

export function getWisdomScore(progress = getWisdomProgress()) {
  const answered = wisdomQuestions.filter((question) => progress[question.id]?.selected !== undefined).length;
  const correct = wisdomQuestions.filter((question) => progress[question.id]?.correct).length;
  const score = Math.round((correct / wisdomQuestions.length) * ELEVATOR_TEST_MAX_SCORE);

  return {
    answered,
    correct,
    total: wisdomQuestions.length,
    score,
    maxScore: ELEVATOR_TEST_MAX_SCORE,
    complete: answered === wisdomQuestions.length,
  };
}

export function getTotal(allocation) {
  return Object.values(allocation).reduce((sum, value) => sum + Number(value), 0);
}

export function getProfile(allocation) {
  const powerHours = Number(allocation.combat) + Number(allocation.survival);
  if (powerHours >= 10) return { key: 'S', ...rankProfiles.S, powerHours };
  if (powerHours >= 8) return { key: 'A', ...rankProfiles.A, powerHours };
  if (powerHours >= 6) return { key: 'B', ...rankProfiles.B, powerHours };
  if (powerHours >= 4) return { key: 'C', ...rankProfiles.C, powerHours };
  return { key: 'D', ...rankProfiles.D, powerHours };
}

export function getCombatScore(allocation, training = getTraining()) {
  const trainingHours = Number(allocation.combat);
  const survivalHours = Number(allocation.survival);
  const strengthHours = Number(allocation.strength || 0);
  const notesHours = Number(allocation.notes || 0);
  const waste = Number(allocation.love) + Number(allocation.scroll) + Number(allocation.social);
  const trainingScore = Math.min(trainingHours / 12, 1) * 400;
  const survivalScore = Math.min(survivalHours / 12, 1) * 300;
  const strengthScore = Math.min(strengthHours / 6, 1) * 80;
  const notesScore = Math.min(notesHours / 3, 1) * 60;
  const stageScore = Math.min((training.punches || 0) / TARGET_PUNCHES, 1) * 300;
  const wisdomInfo = getWisdomScore();
  const wisdomScore = wisdomInfo.complete ? wisdomInfo.score : 0;
  const penalty = waste * 22;
  return Math.max(80, Math.round(trainingScore + survivalScore + strengthScore + notesScore + stageScore + wisdomScore - penalty + 220));
}

export function isTeamPassed(training = getTraining()) {
  return Boolean(training.comboComplete || training.partnerComplete);
}

export function getDuoScore(score, training = getTraining()) {
  return isTeamPassed(training) ? score + DUO_CLEAR_BONUS : 0;
}

export function getRankInfo(allocation, training = getTraining(), records = getLeaderboardRecords()) {
  const score = getCombatScore(allocation, training);
  const playerName = getPlayerName();
  const leaderboard = [{ name: playerName, score }, ...records.filter((player) => player.name !== playerName)]
    .sort((a, b) => b.score - a.score || Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
  const rank = Math.max(leaderboard.findIndex((player) => player.name === playerName) + 1, 1);
  const nextPlayer = rank > 1 ? leaderboard[rank - 2] : null;
  const gap = nextPlayer ? Math.max(1, nextPlayer.score - score) : 0;
  const trainingLift = gap ? Math.max(1, Math.ceil(gap / 34)) : 0;
  const passCount = leaderboard.filter((player) => player.score < score).length;

  return {
    score,
    rank,
    gap,
    trainingLift,
    passCount,
    line: rank === 1 ? `第1位 · 当前榜首` : `第${rank}位 · 距离上一名${gap}分`,
  };
}
