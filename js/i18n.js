// ============================================
// i18n.js - 国际化支持 / Internationalization
// ============================================

const translations = {
  zh: {
    // Page title & meta
    pageTitle: "原神角色人格测试",
    pageSubtitle: "发现你最像哪位提瓦特大陆的伙伴",

    // Landing page
    startBtn: "开始测试",
    continueBtn: "继续测试",
    clearProgressBtn: "清除进度",
    questionCount: "共 64 道题目",
    dimensionCount: "8 大维度",
    characterCount: "54 位角色",
    estimatedTime: "约需 10-15 分钟",

    // Dimension preview labels
    dim_EI: "外向 · 内向",
    dim_SN: "实感 · 直觉",
    dim_TF: "思考 · 情感",
    dim_JP: "判断 · 知觉",
    dim_AC: "冒险 · 谨慎",
    dim_LD: "光明 · 黑暗",
    dim_RC: "规则 · 混沌",
    dim_HM: "热情 · 冷静",

    // Quiz page
    backBtn: "上一题",
    quizNavHint: "按数字键 1-4 选择 · ← 返回 · → 下一题",
    teyvatJourney: "提瓦特之旅",
    soundOn: "音效已开启",
    soundOff: "音效已关闭",
    musicNotFound: "请拖拽音频文件到🎵按钮上",
    swipeHint: "← 左滑下一题", 

    // Result page
    resultTitle: "✦ 你的测试结果 ✦",
    resultSubtitle: "命运的指引，揭示了真实的你",
    personalityRadar: "人格雷达图",
    dimensionAnalysis: "维度分析",
    socialRelations: "人际关系",
    playstyleTitle: "游戏风格",
    perfectMatch: "默契搭档",
    conflictMatch: "气场相冲",
    similarTitle: "性格相近",
    matchScore: "匹配度",
    elementSuffix: "元素",

    // Result actions
    restartBtn: "重新测试",
    shareBtn: "分享结果",
    shareImageBtn: "生成分享图",

    // Dimension bar labels
    bar_EI: ["外向", "内向"],
    bar_SN: ["实感", "直觉"],
    bar_TF: ["思考", "情感"],
    bar_JP: ["判断", "知觉"],
    bar_AC: ["冒险", "谨慎"],
    bar_LD: ["光明", "黑暗"],
    bar_RC: ["规则", "混沌"],
    bar_HM: ["热情", "冷静"],

    // Radar chart labels
    radarLabels: ["外向·内向", "实感·直觉", "思考·情感", "判断·知觉", "冒险·谨慎", "光明·黑暗", "规则·混沌", "热情·冷静"],

    // Modals
    exitTitle: "确定要离开吗？",
    exitSubtitle: "答题进度已自动保存",
    exitContinue: "继续答题",
    exitLeave: "离开",
    shareImagePreview: "分享图片预览",
    shareImageDownload: "下载图片",
    shareImageClose: "关闭",

    // Toast messages
    progressCleared: "进度已清除",
    resumeFailed: "无法恢复进度，将重新开始",
    resultCopied: "结果已复制到剪贴板！",
    copyFailed: "复制失败，请手动复制",
    imageSaved: "分享图已保存！",

    // Language toggle
    langToggle: "🌐",

    // Share
    shareTitle: "原神角色人格测试",
    shareText: "我在原神角色人格测试中匹配到了「{name}」！匹配度{score}%\n{title}\n人格类型：{type}\n\n来测测你最像哪位原神角色吧！",
    downloadFilename: "原神人格测试结果.png",
    shareFooter: "原神角色人格测试 · 8维度64题 · 54位角色"
  },
  en: {
    // Page title & meta
    pageTitle: "Genshin Impact Personality Quiz",
    pageSubtitle: "Discover which Teyvat character matches you best",

    // Landing page
    startBtn: "Start Quiz",
    continueBtn: "Continue Quiz",
    clearProgressBtn: "Clear Progress",
    questionCount: "64 Questions",
    dimensionCount: "8 Dimensions",
    characterCount: "54 Characters",
    estimatedTime: "~10-15 min",

    // Dimension preview labels
    dim_EI: "Extraverted-Introverted",
    dim_SN: "Sensing-Intuitive",
    dim_TF: "Thinking-Feeling",
    dim_JP: "Judging-Perceiving",
    dim_AC: "Adventurous-Cautious",
    dim_LD: "Light-Dark",
    dim_RC: "Rule-Chaos",
    dim_HM: "Warm-Cool",

    // Quiz page
    backBtn: "Previous",
    quizNavHint: "Press 1-4 to choose · ← back · → next",
    teyvatJourney: "Teyvat Journey",
    soundOn: "Sound ON",
    soundOff: "Sound OFF",

    // Result page
    resultTitle: "✦ Your Result ✦",
    resultSubtitle: "Fate reveals the true you",
    personalityRadar: "Personality Radar",
    dimensionAnalysis: "Dimension Analysis",
    socialRelations: "Relationships",
    playstyleTitle: "Playstyle",
    perfectMatch: "Best Matches",
    conflictMatch: "Clashing Personalities",
    similarTitle: "Similar Characters",
    matchScore: "Match",
    elementSuffix: "",

    // Result actions
    restartBtn: "Retake Quiz",
    shareBtn: "Share Result",
    shareImageBtn: "Generate Image",

    // Dimension bar labels
    bar_EI: ["Extraverted", "Introverted"],
    bar_SN: ["Sensing", "Intuitive"],
    bar_TF: ["Thinking", "Feeling"],
    bar_JP: ["Judging", "Perceiving"],
    bar_AC: ["Adventurous", "Cautious"],
    bar_LD: ["Light", "Dark"],
    bar_RC: ["Rule", "Chaos"],
    bar_HM: ["Warm", "Cool"],

    // Radar chart labels
    radarLabels: ["EXT·INT", "SEN·INT", "THK·FEL", "JDG·PRC", "ADV·CAU", "LGT·DRK", "RUL·CHS", "WRM·COL"],

    // Modals
    exitTitle: "Leave this page?",
    exitSubtitle: "Your progress has been saved",
    exitContinue: "Keep Going",
    exitLeave: "Leave",
    shareImagePreview: "Share Image Preview",
    shareImageDownload: "Download",
    shareImageClose: "Close",

    // Toast messages
    progressCleared: "Progress cleared",
    resumeFailed: "Could not restore progress, starting over",
    resultCopied: "Result copied to clipboard!",
    copyFailed: "Copy failed, please copy manually",
    imageSaved: "Image saved!",

    // Language toggle
    langToggle: "🌐",

    // Share
    shareTitle: "Genshin Impact Personality Quiz",
    shareText: "I matched 「{name}」in the Genshin Personality Quiz! Match: {score}%\n{title}\nType: {type}\n\nTry it and find your Genshin twin!",
    downloadFilename: "genshin_personality_result.png",
    shareFooter: "Genshin Personality Quiz · 8 Dimensions · 64 Questions · 54 Characters"
  }
};

// Current language
let _currentLang = null;

function getCurrentLang() {
  if (_currentLang) return _currentLang;
  try {
    const saved = localStorage.getItem('genshin_quiz_lang');
    if (saved && translations[saved]) {
      _currentLang = saved;
      return _currentLang;
    }
  } catch (e) {}
  _currentLang = 'zh';
  return _currentLang;
}

function setLang(lang) {
  if (!translations[lang]) return;
  _currentLang = lang;
  try {
    localStorage.setItem('genshin_quiz_lang', lang);
  } catch (e) {}
}

function t(key) {
  const lang = getCurrentLang();
  const val = translations[lang] && translations[lang][key];
  if (val !== undefined) return val;
  // Fallback to Chinese
  return translations.zh[key] || key;
}

// Get a translated array (for dimension bars etc.)
function tArr(key) {
  const lang = getCurrentLang();
  const val = translations[lang] && translations[lang][key];
  if (Array.isArray(val)) return val;
  return translations.zh[key] || [];
}

function toggleLang() {
  const current = getCurrentLang();
  const next = current === 'zh' ? 'en' : 'zh';
  setLang(next);
  applyUITranslations();
}

function applyUITranslations() {
  const lang = getCurrentLang();

  // Update page title
  document.title = t('pageTitle');

  // Landing page
  const titleEl = document.querySelector('.title');
  if (titleEl) titleEl.textContent = t('pageTitle');

  const subtitleEl = document.querySelector('.subtitle');
  if (subtitleEl) subtitleEl.textContent = t('pageSubtitle');

  // Buttons
  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.textContent = t('startBtn');

  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) continueBtn.textContent = t('continueBtn');

  const clearBtn = document.getElementById('clear-progress-btn');
  if (clearBtn) clearBtn.textContent = t('clearProgressBtn');

  // Dimension preview
  const dimItems = document.querySelectorAll('.dim-preview-item');
  const dimKeys = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
  dimItems.forEach((item, i) => {
    if (dimKeys[i]) {
      const dot = item.querySelector('.dim-dot');
      if (dot) {
        item.textContent = '';
        item.appendChild(dot);
        item.appendChild(document.createTextNode(t('dim_' + dimKeys[i])));
      }
    }
  });

  // Footer stats
  const footer = document.querySelector('.landing-footer');
  if (footer) {
    const dots = footer.querySelectorAll('.dot');
    const spans = footer.querySelectorAll('span:not(.dot)');
    if (spans.length >= 4) {
      spans[0].textContent = t('questionCount');
      spans[1].textContent = t('dimensionCount');
      spans[2].textContent = t('characterCount');
      spans[3].textContent = t('estimatedTime');
    }
  }

  // Quiz page
  const backBtn = document.getElementById('back-btn');
  if (backBtn) backBtn.innerHTML = `<span class="back-arrow">&#9664;</span> ${t('backBtn')}`;

  const navHint = document.querySelector('.quiz-nav-hint');
  if (navHint) navHint.textContent = t('quizNavHint');

  const journeyLabel = document.querySelector('.progress-text > span:first-child');
  if (journeyLabel) journeyLabel.textContent = t('teyvatJourney');

  // Update dimension pills labels on language change
  const pills = document.querySelectorAll('.dim-pill');
  const pillLabels = {
    EI: t('dim_EI'), SN: t('dim_SN'), TF: t('dim_TF'), JP: t('dim_JP'),
    AC: t('dim_AC'), LD: t('dim_LD'), RC: t('dim_RC'), HM: t('dim_HM')
  };
  pills.forEach(pill => {
    const dim = pill.dataset.dim;
    if (dim && pillLabels[dim]) {
      // Only update if not showing completed checkmark
      if (!pill.classList.contains('completed')) {
        pill.textContent = pillLabels[dim];
      } else {
        pill.innerHTML = '<span style="margin-right:2px;">✓</span>' + pillLabels[dim];
      }
    }
  });

  // Result page
  const resultTitle = document.querySelector('.result-title');
  if (resultTitle) resultTitle.textContent = t('resultTitle');

  const resultSubtitle = document.querySelector('.result-subtitle');
  if (resultSubtitle) resultSubtitle.textContent = t('resultSubtitle');

  // Section titles in result page
  const sectionTitles = document.querySelectorAll('.section-title');
  const sectionTitleMap = [
    { zh: '性格相近', en: t('similarTitle') },
    { zh: '人格雷达图', en: t('personalityRadar') },
    { zh: '维度分析', en: t('dimensionAnalysis') },
    { zh: '人际关系', en: t('socialRelations') }
  ];
  sectionTitles.forEach(st => {
    const match = sectionTitleMap.find(m => st.textContent.trim() === m.zh);
    if (match) st.textContent = match[lang] || match.zh;
  });

  // Result page buttons
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) restartBtn.textContent = t('restartBtn');

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) shareBtn.textContent = t('shareBtn');

  const shareImageBtn = document.getElementById('share-image-btn');
  if (shareImageBtn) shareImageBtn.textContent = t('shareImageBtn');

  // Modal buttons
  const exitContinue = document.getElementById('exit-continue');
  if (exitContinue) exitContinue.textContent = t('exitContinue');

  const exitLeave = document.getElementById('exit-leave');
  if (exitLeave) exitLeave.textContent = t('exitLeave');

  const exitText = document.querySelector('.modal-text');
  if (exitText && exitText.closest('#exit-modal')) {
    exitText.innerHTML = `${t('exitTitle')}<br>${t('exitSubtitle')}`;
  }

  const shareText = document.querySelector('#share-image-modal .modal-text');
  if (shareText) shareText.textContent = t('shareImagePreview');

  const shareDownload = document.getElementById('share-image-download');
  if (shareDownload) shareDownload.textContent = t('shareImageDownload');

  const shareClose = document.getElementById('share-image-close');
  if (shareClose) shareClose.textContent = t('shareImageClose');
}
