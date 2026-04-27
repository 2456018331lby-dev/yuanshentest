// data.js - 原神角色人格测试数据

const questions = [
  // ========== EI: 外向(E) vs 内向(I) - 社交能量方向 ==========
  {
    id: 1,
    dimension: "EI",
    question: "你在蒙德酒馆「天使的馈赠」里会怎么做？",
    options: [
      { text: "主动和陌生人搭话，很快就和整桌人打成一片", score: 2 },
      { text: "和吧台边的熟人聊天，气氛轻松愉快", score: 1 },
      { text: "找个角落的位置，安静地品尝饮品", score: -1 },
      { text: "点完单就离开，人多的地方让你不自在", score: -2 }
    ]
  },
  {
    id: 2,
    dimension: "EI",
    question: "冒险家协会派你和一个陌生冒险者组队，你的第一反应是？",
    options: [
      { text: "太好了！新伙伴意味着新故事", score: 2 },
      { text: "没问题，合作完成任务就好", score: 1 },
      { text: "有点紧张，但会尽力配合", score: -1 },
      { text: "希望尽快结束，独自行动更自在", score: -2 }
    ]
  },
  {
    id: 3,
    dimension: "EI",
    question: "在璃月的宴会上，你被邀请上台发言，你会？",
    options: [
      { text: "欣然上台，妙语连珠引得满堂喝彩", score: 2 },
      { text: "简单致辞，然后自然地融入人群", score: 1 },
      { text: "勉强上台，说完就匆匆下来", score: -1 },
      { text: "找借口推脱，在台下默默旁观", score: -2 }
    ]
  },
  {
    id: 4,
    dimension: "EI",
    question: "经过一整天的社交活动后，你感觉如何？",
    options: [
      { text: "意犹未尽，还想继续参加下一场聚会", score: 2 },
      { text: "虽然有点累，但心情很愉快", score: 1 },
      { text: "精疲力竭，需要一些独处时间恢复", score: -1 },
      { text: "完全透支，只想立刻回到房间关上门", score: -2 }
    ]
  },
  {
    id: 5,
    dimension: "EI",
    question: "在须弥的学术研讨会上，你有一个大胆的想法，你会？",
    options: [
      { text: "立刻举手发言，与大家分享你的观点", score: 2 },
      { text: "等合适时机，向身边的人小声讨论", score: 1 },
      { text: "先写下来，会后再单独找学者交流", score: -1 },
      { text: "只在心里想想，不想引起注意", score: -2 }
    ]
  },
  {
    id: 6,
    dimension: "EI",
    question: "你更喜欢哪种度过周末的方式？",
    options: [
      { text: "召集朋友们一起探险或举办派对", score: 2 },
      { text: "和一两个好友去城里逛逛", score: 1 },
      { text: "在家看书或做手工，偶尔回复朋友消息", score: -1 },
      { text: "完全独处，沉浸在自己的世界里", score: -2 }
    ]
  },
  {
    id: 7,
    dimension: "EI",
    question: "一个陌生人主动向你搭话，你的反应是？",
    options: [
      { text: "热情回应，很快聊得热火朝天", score: 2 },
      { text: "礼貌回应，视情况决定是否深聊", score: 1 },
      { text: "简短回答，希望对话尽快结束", score: -1 },
      { text: "感到不自在，找借口离开", score: -2 }
    ]
  },
  {
    id: 8,
    dimension: "EI",
    question: "在稻妻的祭典上，你会选择？",
    options: [
      { text: "穿梭在人群中，体验所有摊位和活动", score: 2 },
      { text: "挑选几个感兴趣的项目参与", score: 1 },
      { text: "站在远处欣赏烟花和人群", score: -1 },
      { text: "找一个安静的地方看烟花，避开人群", score: -2 }
    ]
  },

  // ========== SN: 实感(S) vs 直觉(N) - 信息获取方式 ==========
  {
    id: 9,
    dimension: "SN",
    question: "看到一片从未踏足的森林，你首先注意到的是？",
    options: [
      { text: "树木的种类、地形和可采集的果实", score: 2 },
      { text: "路况是否安全、哪里适合扎营", score: 1 },
      { text: "这片森林隐藏着什么古老的秘密", score: -1 },
      { text: "仿佛看到了精灵在林间起舞的幻象", score: -2 }
    ]
  },
  {
    id: 10,
    dimension: "SN",
    question: "你更相信以下哪种判断方式？",
    options: [
      { text: "亲眼所见、亲手验证的事实", score: 2 },
      { text: "经验和常识告诉我的结论", score: 1 },
      { text: "内心隐约的预感或灵感", score: -1 },
      { text: "梦境或象征中传达的启示", score: -2 }
    ]
  },
  {
    id: 11,
    dimension: "SN",
    question: "描述你手中的武器时，你会说？",
    options: [
      { text: "它的重量、材质和锻造工艺", score: 2 },
      { text: "它的攻击力和实用性", score: 1 },
      { text: "它承载的历史和传说", score: -1 },
      { text: "它仿佛在呼唤着某个未知的命运", score: -2 }
    ]
  },
  {
    id: 12,
    dimension: "SN",
    question: "面对一个复杂的古代机关，你会如何破解？",
    options: [
      { text: "仔细观察机关结构，寻找物理规律", score: 2 },
      { text: "参考已有的解密经验和图纸", score: 1 },
      { text: "感受机关中流动的元素能量走向", score: -1 },
      { text: "相信直觉，尝试一些非常规的方法", score: -2 }
    ]
  },
  {
    id: 13,
    dimension: "SN",
    question: "你更喜欢哪种冒险故事？",
    options: [
      { text: "详细记录探险过程和真实见闻", score: 2 },
      { text: "充满实用技巧和生存智慧的故事", score: 1 },
      { text: "揭示世界隐藏真相的神秘传说", score: -1 },
      { text: "充满象征意义和哲学思考的诗篇", score: -2 }
    ]
  },
  {
    id: 14,
    dimension: "SN",
    question: "在须弥的图书馆里，你被什么吸引？",
    options: [
      { text: "精确的地图、详细的植物图鉴", score: 2 },
      { text: "实用的炼金配方和元素理论", score: 1 },
      { text: "关于世界树和古代文明的禁书", score: -1 },
      { text: "那些连学者都无法解读的神秘文字", score: -2 }
    ]
  },
  {
    id: 15,
    dimension: "SN",
    question: "朋友问你明天天气如何，你会？",
    options: [
      { text: "查看风向标和云层状况来判断", score: 2 },
      { text: "根据季节和往年经验推测", score: 1 },
      { text: "说感觉明天会是个特别的日子", score: -1 },
      { text: "开玩笑说星辰已经告诉我答案了", score: -2 }
    ]
  },
  {
    id: 16,
    dimension: "SN",
    question: "你如何看待「神之眼」的获得？",
    options: [
      { text: "是强烈愿望被神明认可的具体证明", score: 2 },
      { text: "是努力和资质达到标准的结果", score: 1 },
      { text: "是命运之网中某个节点的显现", score: -1 },
      { text: "是灵魂与世界深层共鸣的奇迹", score: -2 }
    ]
  },

  // ========== TF: 思考(T) vs 情感(F) - 决策方式 ==========
  {
    id: 17,
    dimension: "TF",
    question: "你的队友在战斗中犯了严重错误，导致任务失败，你会？",
    options: [
      { text: "直接指出问题所在，分析失败原因", score: 2 },
      { text: "复盘战术，讨论如何改进配合", score: 1 },
      { text: "先安慰队友，再委婉地提出建议", score: -1 },
      { text: "说没关系，重要的是大家都平安", score: -2 }
    ]
  },
  {
    id: 18,
    dimension: "TF",
    question: "两个朋友发生争执来找你评理，你会？",
    options: [
      { text: "客观分析谁更有道理，指出对错", score: 2 },
      { text: "梳理事情经过，找出问题的根源", score: 1 },
      { text: "先倾听双方感受，希望大家和解", score: -1 },
      { text: "不管谁对谁错，友谊最重要", score: -2 }
    ]
  },
  {
    id: 19,
    dimension: "TF",
    question: "在做重要决定时，你更依赖？",
    options: [
      { text: "逻辑分析和利弊权衡", score: 2 },
      { text: "客观数据和可靠证据", score: 1 },
      { text: "内心的价值观和感受", score: -1 },
      { text: "这个决定对他人情感的影响", score: -2 }
    ]
  },
  {
    id: 20,
    dimension: "TF",
    question: "有人评价你的方案「太冷酷」，你的反应是？",
    options: [
      { text: "效率优先，情感不能影响正确决策", score: 2 },
      { text: "询问具体哪里有问题，理性讨论", score: 1 },
      { text: "反思是否忽略了人的感受", score: -1 },
      { text: "感到受伤，重新考虑更温和的方案", score: -2 }
    ]
  },
  {
    id: 21,
    dimension: "TF",
    question: "面对一个需要牺牲少数人拯救多数人的抉择，你会？",
    options: [
      { text: "计算最大利益，做出最理性的选择", score: 2 },
      { text: "寻找是否有两全其美的方案", score: 1 },
      { text: "无法轻易决定，每个人的生命都珍贵", score: -1 },
      { text: "宁愿自己承担代价，也不想牺牲任何人", score: -2 }
    ]
  },
  {
    id: 22,
    dimension: "TF",
    question: "评价一个陌生人时，你首先注意到的是？",
    options: [
      { text: "他的能力和做事方式", score: 2 },
      { text: "他的言行是否合乎逻辑", score: 1 },
      { text: "他给人的感觉是否真诚友善", score: -1 },
      { text: "他的情感状态和内心世界", score: -2 }
    ]
  },
  {
    id: 23,
    dimension: "TF",
    question: "你的建议被朋友拒绝，你会？",
    options: [
      { text: "解释为什么我的建议更合理", score: 2 },
      { text: "分析他的方案有哪些潜在问题", score: 1 },
      { text: "尊重他的选择，支持他的决定", score: -1 },
      { text: "有点失落，但不想影响关系", score: -2 }
    ]
  },
  {
    id: 24,
    dimension: "TF",
    question: "在团队中，你更在意的是？",
    options: [
      { text: "任务是否高效、完美地完成", score: 2 },
      { text: "目标是否达成，结果是否理想", score: 1 },
      { text: "团队成员是否和谐、开心", score: -1 },
      { text: "每个人是否都被理解和接纳", score: -2 }
    ]
  },

  // ========== JP: 判断(J) vs 知觉(P) - 生活方式 ==========
  {
    id: 25,
    dimension: "JP",
    question: "计划一次长途探险，你会？",
    options: [
      { text: "提前规划好每一天的行程和补给点", score: 2 },
      { text: "制定大致路线，准备充足的物资", score: 1 },
      { text: "确定目的地，路上随机应变", score: -1 },
      { text: "说走就走，未知的旅途才有趣", score: -2 }
    ]
  },
  {
    id: 26,
    dimension: "JP",
    question: "你的房间通常是什么状态？",
    options: [
      { text: "井井有条，每件物品都有固定位置", score: 2 },
      { text: "大致整洁，能快速找到需要的东西", score: 1 },
      { text: "有点乱，但乱中有序，我知道东西在哪", score: -1 },
      { text: "随心所欲，整洁反而会让我找不到东西", score: -2 }
    ]
  },
  {
    id: 27,
    dimension: "JP",
    question: "面对截止日期，你通常？",
    options: [
      { text: "提前完成，留出时间检查和优化", score: 2 },
      { text: "按计划稳步推进，准时交付", score: 1 },
      { text: "最后关头冲刺，压力下效率更高", score: -1 },
      { text: "经常延期，但总能想出办法解决", score: -2 }
    ]
  },
  {
    id: 28,
    dimension: "JP",
    question: "你更喜欢哪种生活方式？",
    options: [
      { text: "有规律、可预期的稳定日常", score: 2 },
      { text: "有计划但允许小幅调整的弹性安排", score: 1 },
      { text: "充满变化和惊喜的每一天", score: -1 },
      { text: "完全自由，不受任何约束", score: -2 }
    ]
  },
  {
    id: 29,
    dimension: "JP",
    question: "接到一个新任务，你会？",
    options: [
      { text: "立刻拆解步骤，制定详细执行计划", score: 2 },
      { text: "先了解目标和要求，再开始行动", score: 1 },
      { text: "边做边看，在实践中找到最佳方法", score: -1 },
      { text: "先放一放，等有灵感了再一口气完成", score: -2 }
    ]
  },
  {
    id: 30,
    dimension: "JP",
    question: "旅行时你的背包里？",
    options: [
      { text: "分类整理好，为各种情况做好准备", score: 2 },
      { text: "必需品齐全，但不过度携带", score: 1 },
      { text: "只带最基础的，缺什么路上再买", score: -1 },
      { text: "随便塞几件，到了再说", score: -2 }
    ]
  },
  {
    id: 31,
    dimension: "JP",
    question: "面对突发状况改变原有计划，你会？",
    options: [
      { text: "有些焦虑，但会快速调整新计划", score: 2 },
      { text: "评估影响，重新安排优先级", score: 1 },
      { text: "顺其自然，变化也是旅程的一部分", score: -1 },
      { text: "太好了，正觉得原计划太无聊", score: -2 }
    ]
  },
  {
    id: 32,
    dimension: "JP",
    question: "你如何看待规则和制度？",
    options: [
      { text: "必要的秩序保障，应当严格遵守", score: 2 },
      { text: "大多数情况下应该遵循", score: 1 },
      { text: "视情况而定，灵活处理", score: -1 },
      { text: "束缚人的枷锁，该打破时就打破", score: -2 }
    ]
  },

  // ========== AC: 冒险(A) vs 谨慎(C) - 风险态度 ==========
  {
    id: 33,
    dimension: "AC",
    question: "发现一条标注「极度危险」的捷径，你会？",
    options: [
      { text: "毫不犹豫走捷径，刺激才有收获", score: 2 },
      { text: "评估风险后，大概率会选择尝试", score: 1 },
      { text: "除非万不得已，否则走安全路线", score: -1 },
      { text: "坚决走大路，安全永远是第一位", score: -2 }
    ]
  },
  {
    id: 34,
    dimension: "AC",
    question: "面对一个未知的古代遗迹，你会？",
    options: [
      { text: "立刻冲进去探索，先到先得", score: 2 },
      { text: "简单观察后就进入，犹豫会错失良机", score: 1 },
      { text: "仔细勘察后再决定是否进入", score: -1 },
      { text: "做好万全准备，甚至等专家来一起", score: -2 }
    ]
  },
  {
    id: 35,
    dimension: "AC",
    question: "在战斗中，你更倾向于？",
    options: [
      { text: "主动出击，以攻为守", score: 2 },
      { text: "寻找机会，打敌人一个措手不及", score: 1 },
      { text: "稳扎稳打，先确保自身安全", score: -1 },
      { text: "以守为攻，等敌人露出破绽", score: -2 }
    ]
  },
  {
    id: 36,
    dimension: "AC",
    question: "有人邀请你投资一个高回报但高风险的项目，你会？",
    options: [
      { text: "孤注一掷，高风险才有高回报", score: 2 },
      { text: "投入一部分，即使亏了也能承受", score: 1 },
      { text: "小额试水，确认可靠再追加", score: -1 },
      { text: "婉言谢绝，不做没把握的事", score: -2 }
    ]
  },
  {
    id: 37,
    dimension: "AC",
    question: "在悬崖边发现一朵传说中的稀有花朵，你会？",
    options: [
      { text: "直接攀爬下去采摘", score: 2 },
      { text: "找工具辅助，小心下去摘", score: 1 },
      { text: "观察地形，确认安全后再行动", score: -1 },
      { text: "拍照留念就好，不值得冒险", score: -2 }
    ]
  },
  {
    id: 38,
    dimension: "AC",
    question: "你的战斗风格更像？",
    options: [
      { text: "狂战士——越战越勇，不计代价", score: 2 },
      { text: "刺客——高风险高回报的精准打击", score: 1 },
      { text: "骑士——攻守兼备，进退有度", score: -1 },
      { text: "堡垒——稳如泰山，绝不冒进", score: -2 }
    ]
  },
  {
    id: 39,
    dimension: "AC",
    question: "听说某处有宝藏但守卫强大，你会？",
    options: [
      { text: "立刻出发，打不过就跑", score: 2 },
      { text: "召集伙伴，正面挑战", score: 1 },
      { text: "制定周密计划，智取为上", score: -1 },
      { text: "等实力更强了再来，不急这一时", score: -2 }
    ]
  },
  {
    id: 40,
    dimension: "AC",
    question: "生活中你更喜欢？",
    options: [
      { text: "不断尝试新事物，哪怕会失败", score: 2 },
      { text: "在熟悉领域偶尔挑战新可能", score: 1 },
      { text: "在稳定基础上逐步拓展", score: -1 },
      { text: "坚守熟悉的一切，改变带来不确定性", score: -2 }
    ]
  },

  // ========== LD: 光明(L) vs 黑暗(D) - 道德倾向 ==========
  {
    id: 41,
    dimension: "LD",
    question: "为了拯救更多人的生命，你是否愿意使用被禁止的力量？",
    options: [
      { text: "绝不触碰禁忌，那会带来更大灾难", score: 2 },
      { text: "尽量寻找正当途径，万不得已才考虑", score: 1 },
      { text: "如果目的正义，手段可以灵活", score: -1 },
      { text: "只要能达成目标，任何力量都可以利用", score: -2 }
    ]
  },
  {
    id: 42,
    dimension: "LD",
    question: "发现一个腐败官员的把柄，你会？",
    options: [
      { text: "通过正当渠道举报，相信正义", score: 2 },
      { text: "收集更多证据，走法律程序", score: 1 },
      { text: "私下威胁他改正，以恶制恶", score: -1 },
      { text: "利用把柄为自己谋取利益", score: -2 }
    ]
  },
  {
    id: 43,
    dimension: "LD",
    question: "你如何看待「愚人众」的行事方式？",
    options: [
      { text: "为了目的不择手段，必须阻止", score: 2 },
      { text: "理念不同，但理解他们也有苦衷", score: 1 },
      { text: "结果导向，他们的效率值得肯定", score: -1 },
      { text: "强者才有话语权，他们的做法很现实", score: -2 }
    ]
  },
  {
    id: 44,
    dimension: "LD",
    question: "一个敌人投降求饶，你会？",
    options: [
      { text: "接受投降，给他改过自新的机会", score: 2 },
      { text: "制服他，交给公正机构审判", score: 1 },
      { text: "视他之前的罪行决定如何处理", score: -1 },
      { text: "斩草除根，对敌人仁慈就是对自己残忍", score: -2 }
    ]
  },
  {
    id: 45,
    dimension: "LD",
    question: "为了保护重要的人，你能做到什么程度？",
    options: [
      { text: "在道德底线内竭尽全力", score: 2 },
      { text: "不惜违反一些规则", score: 1 },
      { text: "必要时可以伤害无辜", score: -1 },
      { text: "整个世界都可以牺牲", score: -2 }
    ]
  },
  {
    id: 46,
    dimension: "LD",
    question: "你更认同哪种信念？",
    options: [
      { text: "光明终将战胜黑暗，正义必胜", score: 2 },
      { text: "世界有灰色地带，但向善是对的", score: 1 },
      { text: "没有绝对善恶，只有立场不同", score: -1 },
      { text: "弱肉强食，强者定义正义", score: -2 }
    ]
  },
  {
    id: 47,
    dimension: "LD",
    question: "获得一件被诅咒但强大的武器，你会？",
    options: [
      { text: "封印或销毁它，不让他人受害", score: 2 },
      { text: "交给教会或权威机构处理", score: 1 },
      { text: "小心使用，用它的力量做好事", score: -1 },
      { text: "力量就是力量，为我所用即可", score: -2 }
    ]
  },
  {
    id: 48,
    dimension: "LD",
    question: "面对「为了多数人的利益牺牲少数人」的命题，你认为？",
    options: [
      { text: "每个生命都平等，不能简单量化", score: 2 },
      { text: "应尽力避免，寻找两全方案", score: 1 },
      { text: "必要时是无奈但合理的选择", score: -1 },
      { text: "弱者本就应为强者让路", score: -2 }
    ]
  },

  // ========== RC: 规则(R) vs 混沌(C) - 秩序观念 ==========
  {
    id: 49,
    dimension: "RC",
    question: "你如何看待七国的法律体系？",
    options: [
      { text: "秩序是社会运转的基础，必须维护", score: 2 },
      { text: "规则是必要的，但可以与时俱进", score: 1 },
      { text: "太多规则束缚了人的自由", score: -1 },
      { text: "规则只是强者控制弱者的工具", score: -2 }
    ]
  },
  {
    id: 50,
    dimension: "RC",
    question: "在团队中，你更希望？",
    options: [
      { text: "有明确的等级和分工，各司其职", score: 2 },
      { text: "有基本规则，大家按约定行事", score: 1 },
      { text: "扁平化管理，谁行谁上", score: -1 },
      { text: "没有固定结构，完全自由协作", score: -2 }
    ]
  },
  {
    id: 51,
    dimension: "RC",
    question: "发现一条不合理的规则，你会？",
    options: [
      { text: "通过正规渠道提议修改", score: 2 },
      { text: "遵守的同时寻找变通方法", score: 1 },
      { text: "在不影响他人的情况下打破它", score: -1 },
      { text: "公开违抗，让规则显得荒谬", score: -2 }
    ]
  },
  {
    id: 52,
    dimension: "RC",
    question: "你理想中的社会是什么样的？",
    options: [
      { text: "人人守序、和谐稳定的社会", score: 2 },
      { text: "有秩序但也包容差异的社会", score: 1 },
      { text: "自由奔放、充满活力的社会", score: -1 },
      { text: "不断变革、打破一切旧框架的社会", score: -2 }
    ]
  },
  {
    id: 53,
    dimension: "RC",
    question: "执行任务时，上级下达了明显错误的命令，你会？",
    options: [
      { text: "执行命令，同时向上级反馈问题", score: 2 },
      { text: "请示确认，得到答复后再行动", score: 1 },
      { text: "根据实际情况灵活处理", score: -1 },
      { text: "拒绝执行，按自己认为对的做", score: -2 }
    ]
  },
  {
    id: 54,
    dimension: "RC",
    question: "你更喜欢哪种音乐风格？",
    options: [
      { text: "古典乐——严谨和谐的结构之美", score: 2 },
      { text: "民谣——有传统根基的自由表达", score: 1 },
      { text: "爵士乐——即兴发挥的灵动", score: -1 },
      { text: "实验音乐——打破一切常规", score: -2 }
    ]
  },
  {
    id: 55,
    dimension: "RC",
    question: "如何看待「风带来故事的种子，时间使之发芽」这句话？",
    options: [
      { text: "万物有其规律和时序", score: 2 },
      { text: "顺其自然，但也要适时耕耘", score: 1 },
      { text: "风是自由的，不该被定义", score: -1 },
      { text: "种子可以随风去任何地方，打破界限", score: -2 }
    ]
  },
  {
    id: 56,
    dimension: "RC",
    question: "你的日常作息是？",
    options: [
      { text: "严格按时，雷打不动", score: 2 },
      { text: "大致规律，偶尔调整", score: 1 },
      { text: "随心所欲，看心情而定", score: -1 },
      { text: "昼夜颠倒，没有固定模式", score: -2 }
    ]
  },

  // ========== HM: 热情(H) vs 冷静(M) - 情感表达 ==========
  {
    id: 57,
    dimension: "HM",
    question: "遇到开心的事情，你会？",
    options: [
      { text: "立刻欢呼雀跃，让全世界知道", score: 2 },
      { text: "笑容满面，和身边的人分享喜悦", score: 1 },
      { text: "内心欢喜，淡淡地微笑", score: -1 },
      { text: "几乎不表露，但会默默记住这份美好", score: -2 }
    ]
  },
  {
    id: 58,
    dimension: "HM",
    question: "朋友遭遇挫折哭泣时，你会？",
    options: [
      { text: "紧紧拥抱他，陪他一起哭", score: 2 },
      { text: "坐在他身边，温柔地安慰", score: 1 },
      { text: "递上纸巾，安静地陪伴", score: -1 },
      { text: "分析情况，给出解决问题的建议", score: -2 }
    ]
  },
  {
    id: 59,
    dimension: "HM",
    question: "你的愤怒通常是？",
    options: [
      { text: "来得快去得也快，当场爆发", score: 2 },
      { text: "会表现出来，让对方知道你的不满", score: 1 },
      { text: "闷在心里，用冷淡表示不满", score: -1 },
      { text: "几乎不生气，即使生气也看不出来", score: -2 }
    ]
  },
  {
    id: 60,
    dimension: "HM",
    question: "在庆祝胜利的宴会上，你会？",
    options: [
      { text: "最嗨的那个，带头唱歌跳舞", score: 2 },
      { text: "积极参与，气氛组主力", score: 1 },
      { text: "坐在一旁微笑看着大家", score: -1 },
      { text: "提前离开，不喜欢喧闹场合", score: -2 }
    ]
  },
  {
    id: 61,
    dimension: "HM",
    question: "向别人表达感谢时，你会？",
    options: [
      { text: "热情地表达，可能还送礼物", score: 2 },
      { text: "真诚地说谢谢，眼神充满感激", score: 1 },
      { text: "简单一句谢谢，但记在心里", score: -1 },
      { text: "用行动回报，不善言辞", score: -2 }
    ]
  },
  {
    id: 62,
    dimension: "HM",
    question: "面对突如其来的危机，你的第一反应是？",
    options: [
      { text: "情绪激昂，大喊着冲上去", score: 2 },
      { text: "心跳加速，但迅速行动起来", score: 1 },
      { text: "深吸一口气，冷静分析局势", score: -1 },
      { text: "面不改色，仿佛什么都没发生", score: -2 }
    ]
  },
  {
    id: 63,
    dimension: "HM",
    question: "你更喜欢和哪种人相处？",
    options: [
      { text: "热情似火、情绪丰富的人", score: 2 },
      { text: "开朗健谈、容易亲近的人", score: 1 },
      { text: "沉稳内敛、深思熟虑的人", score: -1 },
      { text: "冷静理性、波澜不惊的人", score: -2 }
    ]
  },
  {
    id: 64,
    dimension: "HM",
    question: "描述自己的情感世界，你会说？",
    options: [
      { text: "像火山一样热烈奔放", score: 2 },
      { text: "像河流一样流动自然", score: 1 },
      { text: "像深湖一样平静深沉", score: -1 },
      { text: "像冰川一样冷静克制", score: -2 }
    ]
  }
];

const characters = {
  "albedo": {
    name: "阿贝多",
    title: "白垩之子",
    element: "岩",
    emoji: "🎨",
    image: "images/characters/albedo.png",
    description: "西风骑士团首席炼金术士，「白垩之子」阿贝多。他以冷静理性的态度研究世界的奥秘，对生命的本质充满好奇却始终保持克制。",
    traits: ["理性", "冷静", "博学", "克制", "好奇", "孤独"],
    radar: [45, 35, 85, 75, 30, 60, 70, 15],
    quote: "我是阿贝多，西风骑士团首席炼金术士。我对你...很感兴趣。",
    playstyle: "以精密的元素反应和战术布置取胜，善于分析战场形势",
    teammates: ["可莉", "砂糖", "钟离"],
    avoid: ["荒泷一斗", "达达利亚"]
  },
  "jean": {
    name: "琴",
    title: "蒲公英骑士",
    element: "风",
    emoji: "⚔️",
    image: "images/characters/jean.png",
    description: "西风骑士团代理团长，琴以高度的责任感和无私的奉献精神守护着蒙德。她严于律己，总是将他人置于自己之上。",
    traits: ["责任感", "自律", "正义", "温柔", "疲惫", "领导"],
    radar: [55, 70, 55, 90, 40, 85, 90, 50],
    quote: "风啊，回应我吧！",
    playstyle: "攻守兼备的团队核心，兼顾输出与治疗",
    teammates: ["芭芭拉", "安柏", "迪卢克"],
    avoid: ["凯亚", "流浪者"]
  },
  "barbara": {
    name: "芭芭拉",
    title: "闪耀偶像",
    element: "水",
    emoji: "🎵",
    image: "images/characters/barbara.png",
    description: "蒙德城的全民偶像，西风教会的祈礼牧师。她用歌声和治愈之力为人们带来希望，永远以灿烂的笑容面对大家。",
    traits: ["活力", "善良", "乐观", "努力", "治愈", "偶像"],
    radar: [80, 60, 25, 70, 50, 90, 75, 90],
    quote: "芭芭拉，闪耀登场~治疗就交给我吧！",
    playstyle: "以持续治疗和元素辅助支援全队",
    teammates: ["琴", "可莉", "诺艾尔"],
    avoid: ["艾尔海森", "赛诺"]
  },
  "noelle": {
    name: "诺艾尔",
    title: "未授勋之花",
    element: "岩",
    emoji: "🛡️",
    image: "images/characters/noelle.png",
    description: "西风骑士团的女仆，诺艾尔以温柔和勤奋著称。她梦想成为正式的骑士，为此不断努力，默默守护着身边的每一个人。",
    traits: ["温柔", "勤奋", "忠诚", "害羞", "奉献", "坚韧"],
    radar: [35, 75, 40, 85, 30, 85, 80, 55],
    quote: "交给我吧，什么都可以交给我！",
    playstyle: "坚不可摧的防御者，以护盾和治愈守护队友",
    teammates: ["琴", "芭芭拉", "凝光"],
    avoid: ["流浪者", "达达利亚"]
  },
  "venti": {
    name: "温迪",
    title: "高天的歌者",
    element: "风",
    emoji: "🍃",
    image: "images/characters/venti.png",
    description: "蒙德城的吟游诗人，实则是风神巴巴托斯。他热爱自由与诗歌，以轻松洒脱的态度游历世间，用琴声传递自由的精神。",
    traits: ["自由", "洒脱", "诗意", "神秘", "顽皮", "随性"],
    radar: [85, 65, 45, 15, 75, 70, 20, 80],
    quote: "愿风神忽悠你~",
    playstyle: "以灵活的控制和元素扩散主导战场节奏",
    teammates: ["琴", "砂糖", "枫原万叶"],
    avoid: ["雷电将军", "九条裟罗"]
  },
  "kokomi": {
    name: "珊瑚宫心海",
    title: "真珠之智",
    element: "水",
    emoji: "📖",
    image: "images/characters/kokomi.png",
    description: "海祇岛现人神巫女，珊瑚宫心海是出色的军事谋略家。她外表柔弱，内心却精于算计，以智慧而非武力领导反抗军。",
    traits: ["智谋", "冷静", "温柔", "疲惫", "谋略", "责任"],
    radar: [40, 70, 80, 85, 25, 65, 75, 20],
    quote: "兵者，诡道也。谋定而后动，方能百战不殆。",
    playstyle: "以精准的策略和持续治疗掌控战局",
    teammates: ["五郎", "雷电将军", "枫原万叶"],
    avoid: ["荒泷一斗", "可莉"]
  },
  "alhaitham": {
    name: "艾尔海森",
    title: "诲韬诤言",
    element: "草",
    emoji: "📚",
    image: "images/characters/alhaitham.png",
    description: "须弥教令院书记官，艾尔海森以极致的理性著称。他追求效率，厌恶无谓的社交，对知识有着纯粹而冷静的追求。",
    traits: ["理性", "冷静", "高效", "独立", "博学", "疏离"],
    radar: [25, 60, 90, 80, 30, 60, 70, 10],
    quote: "知识的价值在于应用，而非炫耀。",
    playstyle: "以精准的元素反应和高效的输出取胜",
    teammates: ["妮露", "纳西妲", "夜兰"],
    avoid: ["卡维", "多莉"]
  },
  "yae_miko": {
    name: "八重神子",
    title: "浮世笑百姿",
    element: "雷",
    emoji: "🦊",
    image: "images/characters/yae_miko.png",
    description: "鸣神大社的宫司，八重神子是一只活了数百年的狐狸。她狡黠聪慧，喜欢捉弄他人，以玩世不恭的态度看待世间百态。",
    traits: ["狡黠", "聪慧", "慵懒", "神秘", "爱玩", "独立"],
    radar: [65, 55, 60, 20, 60, 45, 30, 50],
    quote: "呵呵，小家伙，让我好好捉弄你一下吧~",
    playstyle: "以灵活的脱手技能和控制戏耍敌人",
    teammates: ["雷电将军", "九条裟罗", "神里绫人"],
    avoid: ["赛诺", "五郎"]
  },
  "kazuha": {
    name: "枫原万叶",
    title: "红叶逐荒波",
    element: "风",
    emoji: "🍁",
    image: "images/characters/kazuha.png",
    description: "来自稻妻的漂泊浪人，枫原万叶以洒脱的态度游历提瓦特。他重情重义，却又看破红尘，在自由与羁绊间找到了平衡。",
    traits: ["洒脱", "诗意", "重义", "淡泊", "自由", "敏锐"],
    radar: [55, 70, 50, 25, 65, 70, 35, 45],
    quote: "深山踏红叶，耳畔闻鹿鸣。我很喜欢枫叶，可惜...枫叶红时，总多离别。",
    playstyle: "以元素扩散和聚变反应打出优雅连招",
    teammates: ["雷电将军", "班尼特", "行秋"],
    avoid: ["九条裟罗", "珊瑚宫心海"]
  },
  "cyno": {
    name: "赛诺",
    title: "缄秘的裁遣",
    element: "雷",
    emoji: "⚖️",
    image: "images/characters/cyno.png",
    description: "须弥教令院的大风纪官，赛诺以冷峻严肃的形象维护学术的公正。他沉默寡言，对违法者毫不留情，内心却有着独特的幽默感。",
    traits: ["冷峻", "公正", "沉默", "执着", "严厉", "幽默"],
    radar: [30, 65, 85, 90, 50, 80, 95, 15],
    quote: "以雷霆击碎黑暗。",
    playstyle: "以精准的时机把握打出爆发伤害",
    teammates: ["纳西妲", "菲谢尔", "行秋"],
    avoid: ["多莉", "八重神子"]
  },
  "ayaka": {
    name: "神里绫华",
    title: "白鹭霜华",
    element: "冰",
    emoji: "❄️",
    image: "images/characters/ayaka.png",
    description: "稻妻社奉行神里家的大小姐，神里绫华以优雅和端庄著称。她深居简出，内心却渴望普通人的生活，在责任与自我间寻找平衡。",
    traits: ["优雅", "端庄", "温柔", "责任", "渴望", "坚韧"],
    radar: [45, 60, 50, 80, 35, 80, 85, 45],
    quote: "请，好好地看着我。",
    playstyle: "以优雅的冰元素连击和精准操作取胜",
    teammates: ["神里绫人", "枫原万叶", "申鹤"],
    avoid: ["宵宫", "荒泷一斗"]
  },
  "collei": {
    name: "柯莱",
    title: "萃念初蘖",
    element: "草",
    emoji: "🌿",
    image: "images/characters/collei.png",
    description: "须弥的见习巡林员，柯莱曾经历过痛苦的过去，在安柏的帮助下逐渐走出阴影。她内向害羞，却拥有坚强的内心。",
    traits: ["内向", "害羞", "坚强", "感恩", "努力", "温柔"],
    radar: [25, 55, 40, 70, 30, 75, 70, 40],
    quote: "我...我会努力的！",
    playstyle: "以持续的草元素附着和团队辅助作战",
    teammates: ["安柏", "提纳里", "妮露"],
    avoid: ["博士", "流浪者"]
  },
  "wanderer": {
    name: "流浪者",
    title: "久世浮倾",
    element: "风",
    emoji: "☂️",
    image: "images/characters/wanderer.png",
    description: "原愚人众第六席「散兵」，如今以流浪者的身份寻找自我。他叛逆孤傲，内心充满矛盾，在黑暗中寻找属于自己的光明。",
    traits: ["叛逆", "孤傲", "矛盾", "脆弱", "渴望", "毒舌"],
    radar: [35, 60, 60, 15, 70, 25, 15, 35],
    quote: "哈？别用那种眼神看我，恶心。",
    playstyle: "以高机动性和空战优势进行灵活输出",
    teammates: ["纳西妲", "珐露珊", "班尼特"],
    avoid: ["雷电将军", "八重神子"]
  },
  "fischl": {
    name: "菲谢尔",
    title: "断罪之皇女",
    element: "雷",
    emoji: "👁️",
    image: "images/characters/fischl.png",
    description: "冒险家协会的调查员，菲谢尔沉浸在自己幻想的「幽夜净土」世界中。她中二病晚期，内心却渴望被理解和接纳。",
    traits: ["中二", "幻想", "孤独", "渴望", "戏剧", "敏感"],
    radar: [50, 25, 45, 20, 65, 60, 30, 75],
    quote: "吾乃断罪之皇女，菲谢尔。应命运的召唤降临此间...",
    playstyle: "以奥兹的脱手雷伤和幻想之力作战",
    teammates: ["莫娜", "砂糖", "班尼特"],
    avoid: ["赛诺", "艾尔海森"]
  },
  "sucrose": {
    name: "砂糖",
    title: "无害甜度",
    element: "风",
    emoji: "🔬",
    image: "images/characters/sucrose.png",
    description: "西风骑士团的炼金术士，砂糖对生物炼金充满热情。她害羞内向，不善社交，但在研究领域却有着惊人的执着和勇气。",
    traits: ["害羞", "专注", "好奇", "内向", "执着", "温柔"],
    radar: [20, 80, 55, 75, 40, 75, 80, 35],
    quote: "那个...关于生物炼金，我有一些新的想法...",
    playstyle: "以元素精通加成和聚变反应辅助全队",
    teammates: ["阿贝多", "可莉", "琴"],
    avoid: ["安柏", "荒泷一斗"]
  },
  "mona": {
    name: "莫娜",
    title: "星天水镜",
    element: "水",
    emoji: "🔮",
    image: "images/characters/mona.png",
    description: "神秘的占星术士，莫娜穷得叮当响却坚守占星师的尊严。她痴迷于星象的奥秘，以独特的视角解读命运的轨迹。",
    traits: ["神秘", "执着", "贫穷", "骄傲", "直觉", "孤独"],
    radar: [40, 30, 60, 30, 45, 65, 40, 50],
    quote: "命运，在此显现！",
    playstyle: "以星异增伤和大招爆发提供强力辅助",
    teammates: ["菲谢尔", "班尼特", "达达利亚"],
    avoid: ["多莉", "凝光"]
  },
  "tartaglia": {
    name: "达达利亚",
    title: "公子",
    element: "水",
    emoji: "🐳",
    image: "images/characters/tartaglia.png",
    description: "愚人众第十一席「公子」，达达利亚是纯粹的战斗狂。他渴望变强，享受战斗的快感，对家人却有着温柔的一面。",
    traits: ["好战", "热血", "直率", "矛盾", "渴望", "家人"],
    radar: [75, 60, 55, 20, 90, 40, 30, 85],
    quote: "争斗才是提瓦特的法则！来吧，让我享受战斗的乐趣！",
    playstyle: "以形态切换和高频水元素攻击压制敌人",
    teammates: ["钟离", "香菱", "班尼特"],
    avoid: ["珊瑚宫心海", "神里绫华"]
  },
  "itto": {
    name: "荒泷一斗",
    title: "花坂豪快",
    element: "岩",
    emoji: "👹",
    image: "images/characters/itto.png",
    description: "荒泷派的老大，鬼族后裔荒泷一斗以热血和豪爽著称。他头脑简单却重情重义，是稻妻街头一道独特的风景线。",
    traits: ["热血", "豪爽", "单纯", "重义", "冲动", "乐观"],
    radar: [85, 50, 30, 10, 95, 60, 20, 95],
    quote: "哈哈哈哈！本大爷就是荒泷天下第一斗！",
    playstyle: "以狂暴的岩元素重击和热血连打碾压敌人",
    teammates: ["五郎", "钟离", "久岐忍"],
    avoid: ["珊瑚宫心海", "艾尔海森"]
  },
  "yoimiya": {
    name: "宵宫",
    title: "琉焰华舞",
    element: "火",
    emoji: "🎆",
    image: "images/characters/yoimiya.png",
    description: "长野原烟花店的店长，宵宫是稻妻夏祭的女王。她热情开朗，用烟花为人们带来欢乐，相信每一朵烟花都承载着一个愿望。",
    traits: ["热情", "开朗", "善良", "创意", "乐观", "自由"],
    radar: [85, 65, 35, 25, 70, 80, 35, 95],
    quote: "烟花易逝，人情长存！",
    playstyle: "以快速火元素普攻和追踪箭输出",
    teammates: ["班尼特", "钟离", "夜兰"],
    avoid: ["神里绫华", "九条裟罗"]
  },
  "dori": {
    name: "多莉",
    title: "梦园藏金",
    element: "雷",
    emoji: "💰",
    image: "images/characters/dori.png",
    description: "须弥的精明商人，多莉对摩拉有着近乎痴迷的热爱。她狡黠精明，善于钻营，却也有着自己的商业道德底线。",
    traits: ["精明", "贪婪", "狡黠", "务实", "独立", "幽默"],
    radar: [70, 75, 65, 40, 55, 50, 45, 60],
    quote: "摩拉爱我，我爱摩拉！只要有摩拉，什么都好说~",
    playstyle: "以治疗与能量回复的商人之道支援全队",
    teammates: ["赛诺", "纳西妲", "久岐忍"],
    avoid: ["柯莱", "提纳里"]
  },
  "klee": {
    name: "可莉",
    title: "逃跑的太阳",
    element: "火",
    emoji: "💣",
    image: "images/characters/klee.png",
    description: "西风骑士团的火花骑士，可莉是个天真烂漫的炸弹爱好者。她用孩童的纯真看待世界，所到之处总是伴随着爆炸和欢笑。",
    traits: ["天真", "活泼", "好奇", "调皮", "纯真", "破坏"],
    radar: [80, 70, 20, 10, 85, 75, 15, 90],
    quote: "全都可以炸完！",
    playstyle: "以蹦蹦炸弹和大范围的火元素爆炸制造混乱",
    teammates: ["琴", "砂糖", "莫娜"],
    avoid: ["艾尔海森", "赛诺"]
  },
  "amber": {
    name: "安柏",
    title: "飞行冠军",
    element: "火",
    emoji: "🏹",
    image: "images/characters/amber.png",
    description: "蒙德城的侦察骑士，安柏以开朗和热情感染着身边的每一个人。她是柯莱的挚友，用行动诠释着骑士的精神。",
    traits: ["开朗", "热情", "正义", "活力", "友善", "勇敢"],
    radar: [90, 65, 45, 60, 70, 85, 70, 90],
    quote: "侦察骑士安柏，准备就绪！",
    playstyle: "以兔兔伯爵嘲讽和火元素箭矢灵活作战",
    teammates: ["琴", "柯莱", "优菈"],
    avoid: ["凯亚", "迪卢克"]
  },
  "kaeya": {
    name: "凯亚",
    title: "寒风剑士",
    element: "冰",
    emoji: "🍷",
    image: "images/characters/kaeya.png",
    description: "西风骑士团的骑兵队长，凯亚表面轻浮幽默，内心却隐藏着深沉的秘密。他善于伪装，用笑容掩盖真实的情感。",
    traits: ["神秘", "轻浮", "深沉", "狡黠", "孤独", "矛盾"],
    radar: [75, 55, 70, 45, 60, 40, 35, 50],
    quote: "真是的，就不能让我多享受一下吗？",
    playstyle: "以冰元素脱手技能和灵活的剑术周旋",
    teammates: ["迪卢克", "琴", "行秋"],
    avoid: ["安柏", "罗莎莉亚"]
  },
  "heizou": {
    name: "鹿野院平藏",
    title: "心朝乂安",
    element: "风",
    emoji: "🔍",
    image: "images/characters/heizou.png",
    description: "天领奉行的侦探，鹿野院平藏以随性的态度破解疑难案件。他聪明敏锐，却不拘泥于规则，用自己的方式追寻真相。",
    traits: ["随性", "聪慧", "敏锐", "自由", "正义", "不羁"],
    radar: [70, 60, 65, 25, 65, 70, 30, 65],
    quote: "真相只有一个，但找到它的方法可以有很多种~",
    playstyle: "以近战格斗和元素反应打出爆发伤害",
    teammates: ["雷电将军", "行秋", "班尼特"],
    avoid: ["九条裟罗", "珊瑚宫心海"]
  },
  "diluc": {
    name: "迪卢克",
    title: "暗夜英雄",
    element: "火",
    emoji: "🦇",
    image: "images/characters/diluc.png",
    description: "晨曦酒庄的庄主，迪卢克以「暗夜英雄」的身份默默守护蒙德。他冷峻沉默，内心燃烧着对正义的执着。",
    traits: ["冷峻", "正义", "孤独", "执着", "责任", "沉默"],
    radar: [40, 60, 70, 80, 50, 75, 85, 20],
    quote: "在黎明到来之前，必须有人稍微照亮黑暗。",
    playstyle: "以强力火元素大剑攻击和爆发输出碾压敌人",
    teammates: ["行秋", "班尼特", "砂糖"],
    avoid: ["凯亚", "优菈"]
  },
  "sara": {
    name: "九条裟罗",
    title: "黑羽鸣镝",
    element: "雷",
    emoji: "🏹",
    image: "images/characters/sara.png",
    description: "天领奉行的将领，九条裟罗对雷电将军有着绝对的忠诚。她严肃认真，恪守军规，是稻妻秩序的坚定维护者。",
    traits: ["忠诚", "严肃", "纪律", "正直", "坚定", "内敛"],
    radar: [45, 70, 60, 95, 40, 75, 95, 30],
    quote: "常道恢弘，鸣神永恒！",
    playstyle: "以雷元素增益和精准射击支援全队",
    teammates: ["雷电将军", "八重神子", "枫原万叶"],
    avoid: ["宵宫", "荒泷一斗"]
  },
  "thoma": {
    name: "托马",
    title: "渡来介者",
    element: "火",
    emoji: "🔥",
    image: "images/characters/thoma.png",
    description: "神里家的家政官，托马以热心和可靠著称。他擅长处理各种事务，用温暖的态度照顾着身边的每一个人。",
    traits: ["热心", "可靠", "温柔", "社交", "勤劳", "忠诚"],
    radar: [80, 65, 45, 70, 45, 80, 75, 75],
    quote: "有事尽管找我，我什么都能搞定！",
    playstyle: "以护盾保护和火元素辅助提供稳定支援",
    teammates: ["神里绫华", "神里绫人", "宵宫"],
    avoid: ["雷电将军", "流浪者"]
  },
  "yunjin": {
    name: "云堇",
    title: "红毹婵娟",
    element: "岩",
    emoji: "🎭",
    image: "images/characters/yunjin.png",
    description: "璃月戏曲名角，云堇以精湛的演技传承着中华戏曲文化。她优雅从容，在舞台上绽放着独特的光芒。",
    traits: ["优雅", "传统", "艺术", "从容", "传承", "独立"],
    radar: [60, 70, 50, 75, 35, 80, 85, 55],
    quote: "一曲终了，余音绕梁。",
    playstyle: "以元素爆发增益和普通攻击加成辅助全队",
    teammates: ["申鹤", "重云", "宵宫"],
    avoid: ["荒泷一斗", "达达利亚"]
  },
  "traveler": {
    name: "旅行者",
    title: "异界旅人",
    element: "多元素",
    emoji: "⭐",
    image: "images/characters/traveler.png",
    description: "来自异世界的旅行者，为了寻找失散的血亲而踏上提瓦特的旅程。你适应力强、善良，在旅途中结识了无数伙伴。",
    traits: ["善良", "适应力强", "好奇", "坚韧", "正义", "孤独"],
    radar: [60, 55, 55, 50, 60, 75, 55, 60],
    quote: "我们终将重逢。",
    playstyle: "以多元素切换适应各种战斗环境",
    teammates: ["派蒙", "各国伙伴"],
    avoid: ["天理"]
  },
  "nilou": {
    name: "妮露",
    title: "莲光落舞筵",
    element: "水",
    emoji: "💃",
    image: "images/characters/nilou.png",
    description: "须弥大巴扎的舞者，妮露以优雅的舞姿传递着艺术的魅力。她温柔善良，用舞蹈为人们带来心灵的慰藉。",
    traits: ["优雅", "温柔", "艺术", "善良", "专注", "内敛"],
    radar: [55, 60, 40, 45, 35, 80, 65, 70],
    quote: "让我用舞蹈，为你讲述一个故事吧。",
    playstyle: "以绽放反应和优雅的剑舞绽放艺术之美",
    teammates: ["纳西妲", "心海", "草主"],
    avoid: ["赛诺", "艾尔海森"]
  },
  "raiden": {
    name: "雷电将军",
    title: "一心净土",
    element: "雷",
    emoji: "⚡",
    image: "images/characters/raiden.png",
    description: "稻妻的统治者，雷神巴尔泽布以「永恒」为信念治理国度。她威严而孤独，在漫长的岁月中守护着子民。",
    traits: ["威严", "孤独", "执着", "强大", "责任", "矛盾"],
    radar: [35, 50, 75, 95, 50, 60, 95, 10],
    quote: "我要把你，砌进神像里。",
    playstyle: "以强力雷元素爆发和充能辅助主导战局",
    teammates: ["九条裟罗", "班尼特", "香菱"],
    avoid: ["温迪", "流浪者"]
  },
  "ningguang": {
    name: "凝光",
    title: "天权星",
    element: "岩",
    emoji: "💎",
    image: "images/characters/ningguang.png",
    description: "璃月七星之天权星，凝光以精明的商业头脑和政治手腕统治着璃月的经济命脉。她冷静务实，为达目的不择手段。",
    traits: ["精明", "冷静", "野心", "务实", "独立", "权谋"],
    radar: [60, 80, 75, 70, 55, 50, 60, 30],
    quote: "就算古玩价值连城，给人的快乐也只有刚拥有的一瞬。",
    playstyle: "以岩元素创造物和重击进行远程输出",
    teammates: ["钟离", "香菱", "行秋"],
    avoid: ["北斗", "公子"]
  }
};

const dimensionNames = {
  EI: "外向-内向",
  SN: "实感-直觉",
  TF: "思考-情感",
  JP: "判断-知觉",
  AC: "冒险-谨慎",
  LD: "光明-黑暗",
  RC: "规则-混沌",
  HM: "热情-冷静"
};

const dimensionDescriptions = {
  EI: {
    positive: "外向",
    negative: "内向",
    description: "外向者从社交互动中获得能量，喜欢与人交流；内向者从独处中获得能量，享受内心世界。"
  },
  SN: {
    positive: "实感",
    negative: "直觉",
    description: "实感者关注具体细节和实际经验；直觉者关注整体模式和未来可能性。"
  },
  TF: {
    positive: "思考",
    negative: "情感",
    description: "思考者以逻辑和客观分析做决策；情感者以价值观和他人感受做决策。"
  },
  JP: {
    positive: "判断",
    negative: "知觉",
    description: "判断者喜欢有计划、有条理的生活方式；知觉者喜欢灵活、随性的生活方式。"
  },
  AC: {
    positive: "冒险",
    negative: "谨慎",
    description: "冒险者乐于接受挑战和风险；谨慎者偏好稳妥和安全的方案。"
  },
  LD: {
    positive: "光明",
    negative: "黑暗",
    description: "光明者坚守道德和正义；黑暗者更注重结果和实际利益。"
  },
  RC: {
    positive: "规则",
    negative: "混沌",
    description: "规则者重视秩序和制度；混沌者追求自由和打破常规。"
  },
  HM: {
    positive: "热情",
    negative: "冷静",
    description: "热情者情感外露、富有感染力；冷静者情感内敛、理性克制。"
  }
};

const elementColors = {
  "火": "#ff7043",
  "水": "#4fc3f7",
  "风": "#7fb069",
  "雷": "#ba68c8",
  "草": "#a5d6a7",
  "冰": "#90caf9",
  "岩": "#d4a843",
  "多元素": "#e0e0e0"
};

const elementIcons = {
  "火": "🔥",
  "水": "💧",
  "风": "🌪️",
  "雷": "⚡",
  "草": "🌱",
  "冰": "❄️",
  "岩": "⛰️",
  "多元素": "✨"
};

// 导出数据（支持 CommonJS 和 ES Module）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    questions,
    characters,
    dimensionNames,
    dimensionDescriptions,
    elementColors,
    elementIcons
  };
}
