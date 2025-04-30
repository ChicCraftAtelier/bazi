// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 十二时辰对应的地支
const TIME_BRANCHES = {
  '23:00-00:59': '子',
  '01:00-02:59': '丑',
  '03:00-04:59': '寅',
  '05:00-06:59': '卯',
  '07:00-08:59': '辰',
  '09:00-10:59': '巳',
  '11:00-12:59': '午',
  '13:00-14:59': '未',
  '15:00-16:59': '申',
  '17:00-18:59': '酉',
  '19:00-20:59': '戌',
  '21:00-22:59': '亥'
};

// 天干地支对应的五行
const ELEMENT_MAP = {
  '甲': 'Wood',
  '乙': 'Wood',
  '丙': 'Fire',
  '丁': 'Fire',
  '戊': 'Earth',
  '己': 'Earth',
  '庚': 'Metal',
  '辛': 'Metal',
  '壬': 'Water',
  '癸': 'Water',
  '子': 'Water',
  '丑': 'Earth',
  '寅': 'Wood',
  '卯': 'Wood',
  '辰': 'Earth',
  '巳': 'Fire',
  '午': 'Fire',
  '未': 'Earth',
  '申': 'Metal',
  '酉': 'Metal',
  '戌': 'Earth',
  '亥': 'Water'
};

// 五行相生相克关系
const ELEMENT_RELATIONS = {
  'Wood': { generates: 'Fire', restricts: 'Earth', restricted_by: 'Metal', generated_by: 'Water' },
  'Fire': { generates: 'Earth', restricts: 'Metal', restricted_by: 'Water', generated_by: 'Wood' },
  'Earth': { generates: 'Metal', restricts: 'Water', restricted_by: 'Wood', generated_by: 'Fire' },
  'Metal': { generates: 'Water', restricts: 'Wood', restricted_by: 'Fire', generated_by: 'Earth' },
  'Water': { generates: 'Wood', restricts: 'Fire', restricted_by: 'Earth', generated_by: 'Metal' }
};

// 五行对应的颜色
const ELEMENT_COLORS = {
  'Wood': 'Green, Teal, Light Blue',
  'Fire': 'Red, Orange, Purple, Pink',
  'Earth': 'Yellow, Brown, Beige',
  'Metal': 'White, Gold, Silver, Gray',
  'Water': 'Black, Dark Blue, Navy'
};

/**
 * 计算年柱天干
 * @param {number} year - 公历年份
 * @returns {string} - 天干
 */
function getYearStem(year) {
  // 天干的循环是10年一个周期，1984年是甲子年
  return HEAVENLY_STEMS[(year - 4) % 10];
}

/**
 * 计算年柱地支
 * @param {number} year - 公历年份
 * @returns {string} - 地支
 */
function getYearBranch(year) {
  // 地支的循环是12年一个周期，1984年是甲子年
  return EARTHLY_BRANCHES[(year - 4) % 12];
}

/**
 * 计算月柱天干
 * @param {number} year - 公历年份
 * @param {number} month - 公历月份（1-12）
 * @returns {string} - 天干
 */
function getMonthStem(year, month) {
  const yearStem = getYearStem(year);
  const stemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  
  // 月干公式：（年干序号 * 2 + 月份数 - 1）% 10
  let monthStemIndex = (stemIndex * 2 + month) % 10;
  if (monthStemIndex === 0) monthStemIndex = 10;
  return HEAVENLY_STEMS[(monthStemIndex - 1) % 10];
}

/**
 * 计算月柱地支
 * @param {number} month - 公历月份（1-12）
 * @returns {string} - 地支
 */
function getMonthBranch(month) {
  // 地支月份对应：1月为寅月，2月为卯月，...，12月为丑月
  return EARTHLY_BRANCHES[(month + 1) % 12];
}

/**
 * 计算日柱天干
 * @param {Date} date - 日期对象
 * @returns {string} - 天干
 */
function getDayStem(date) {
  // 基准日期：1900年1月1日，天干地支：庚子日
  const baseDate = new Date(1900, 0, 1);
  const days = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));
  
  // 天干的循环是10天一个周期，从庚开始
  return HEAVENLY_STEMS[(days + 6) % 10];
}

/**
 * 计算日柱地支
 * @param {Date} date - 日期对象
 * @returns {string} - 地支
 */
function getDayBranch(date) {
  // 基准日期：1900年1月1日，天干地支：庚子日
  const baseDate = new Date(1900, 0, 1);
  const days = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));
  
  // 地支的循环是12天一个周期，从子开始
  return EARTHLY_BRANCHES[(days + 0) % 12];
}

/**
 * 计算时柱天干
 * @param {string} dayStem - 日柱天干
 * @param {number} hour - 小时（0-23）
 * @returns {string} - 天干
 */
function getHourStem(dayStem, hour) {
  const stemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  
  // 时干公式：(日干序号 * 2 + 时辰序号) % 10
  const hourStemIndex = (stemIndex * 2 + hourBranchIndex) % 10;
  return HEAVENLY_STEMS[hourStemIndex];
}

/**
 * 计算时柱地支
 * @param {number} hour - 小时（0-23）
 * @returns {string} - 地支
 */
function getHourBranch(hour) {
  // 调整小时，使其在0-23范围内
  hour = (hour + 24) % 24;
  
  // 时辰地支对应关系
  if (hour >= 23 || hour < 1) return '子';
  if (hour >= 1 && hour < 3) return '丑';
  if (hour >= 3 && hour < 5) return '寅';
  if (hour >= 5 && hour < 7) return '卯';
  if (hour >= 7 && hour < 9) return '辰';
  if (hour >= 9 && hour < 11) return '巳';
  if (hour >= 11 && hour < 13) return '午';
  if (hour >= 13 && hour < 15) return '未';
  if (hour >= 15 && hour < 17) return '申';
  if (hour >= 17 && hour < 19) return '酉';
  if (hour >= 19 && hour < 21) return '戌';
  if (hour >= 21 && hour < 23) return '亥';
}

/**
 * 获取生辰八字完整信息
 * @param {Date} birthdate - 出生日期时间对象
 * @returns {Object} - 包含八字信息的对象
 */
function calculateBaZi(birthdate) {
  const year = birthdate.getFullYear();
  const month = birthdate.getMonth() + 1; // JS月份从0开始
  const date = new Date(birthdate);
  const hour = birthdate.getHours();
  
  // 计算四柱天干地支
  const yearStem = getYearStem(year);
  const yearBranch = getYearBranch(year);
  const monthStem = getMonthStem(year, month);
  const monthBranch = getMonthBranch(month);
  const dayStem = getDayStem(date);
  const dayBranch = getDayBranch(date);
  const hourStem = getHourStem(dayStem, hour);
  const hourBranch = getHourBranch(hour);
  
  // 构建八字
  const baZi = {
    year: yearStem + yearBranch,
    month: monthStem + monthBranch,
    day: dayStem + dayBranch,
    hour: hourStem + hourBranch,
    elements: {
      yearStem: ELEMENT_MAP[yearStem],
      yearBranch: ELEMENT_MAP[yearBranch],
      monthStem: ELEMENT_MAP[monthStem],
      monthBranch: ELEMENT_MAP[monthBranch],
      dayStem: ELEMENT_MAP[dayStem],
      dayBranch: ELEMENT_MAP[dayBranch],
      hourStem: ELEMENT_MAP[hourStem],
      hourBranch: ELEMENT_MAP[hourBranch]
    }
  };
  
  return baZi;
}

/**
 * 分析八字中的五行强弱
 * @param {Object} baZi - 八字对象
 * @returns {Object} - 五行分析结果
 */
function analyzeElements(baZi) {
  // 统计五行出现次数
  const elementCounts = {
    'Wood': 0,
    'Fire': 0,
    'Earth': 0,
    'Metal': 0,
    'Water': 0
  };
  
  // 遍历八字中的所有五行并计数
  for (const key in baZi.elements) {
    const element = baZi.elements[key];
    elementCounts[element]++;
  }
  
  // 找出最强和最弱的五行
  let strongest = '';
  let weakest = '';
  let maxCount = -1;
  let minCount = 9;
  
  for (const element in elementCounts) {
    if (elementCounts[element] > maxCount) {
      maxCount = elementCounts[element];
      strongest = element;
    }
    if (elementCounts[element] < minCount) {
      minCount = elementCounts[element];
      weakest = element;
    }
  }
  
  // 确定喜用神（通常是最弱的五行或者能生最弱五行的五行）
  // 这里采用简化逻辑：补弱扶强
  const favorable = ELEMENT_RELATIONS[weakest].generated_by;
  const unfavorable = ELEMENT_RELATIONS[strongest].generates;
  
  return {
    counts: elementCounts,
    strongest,
    weakest,
    favorable,
    unfavorable
  };
}

/**
 * 获取五行对应的颜色
 * @param {string} element - 五行名称
 * @returns {string} - 对应的颜色描述
 */
function getElementColors(element) {
  return ELEMENT_COLORS[element] || '';
}

/**
 * 获取喜用和忌用的五行和颜色
 * @param {Date} birthdate - 出生日期时间对象
 * @returns {Object} - 包含喜用忌用信息的对象
 */
function getFavorableElements(birthdate) {
  const baZi = calculateBaZi(birthdate);
  const analysis = analyzeElements(baZi);
  
  return {
    baZi,
    analysis,
    favorable: {
      elements: [analysis.favorable, analysis.weakest],
      colors: getElementColors(analysis.favorable) + ', ' + getElementColors(analysis.weakest)
    },
    unfavorable: {
      elements: [analysis.unfavorable, analysis.strongest],
      colors: getElementColors(analysis.unfavorable) + ', ' + getElementColors(analysis.strongest)
    }
  };
}
