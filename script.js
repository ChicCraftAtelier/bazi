// script.js — Complete BaZi & Material List Implementation

// —— 干支与五行映射 ——
const HEAVENLY_STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const EARTHLY_BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ELEMENT_MAP = {
  '甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth',
  '庚':'Metal','辛':'Metal','壬':'Water','癸':'Water',
  '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth',
  '巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'
};
const CH_ELEMENT = {
  Wood: '木 (Wood)',
  Fire: '火 (Fire)',
  Earth: '土 (Earth)',
  Metal: '金 (Metal)',
  Water: '水 (Water)'
};

// —— 材质示例数据（完整列表） ——
const materials = [
  { name: 'Green Phantom Quartz', meaning: 'Enhances career and wealth', element: 'Wood', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\绿幽灵水晶.png'},
  { name: 'Xinjiang Old Yellow Jade', meaning: 'Brings stability and protection', element: 'Earth', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\新疆老黄玉.png' },
  { name: 'Peach Wood', meaning: 'Wards off evil spirits', element: 'Wood', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\桃木.png' },
  { name: 'Hainan Agarwood', meaning: 'Calms the mind and body', element: 'Wood', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\海南沉香.png' },
  { name: 'South African Blue Lace Agate', meaning: 'Promotes communication and clarity', element: 'Water', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\南非蓝纹玉.png' },
  { name: 'Alashan Agate', meaning: 'Enhances vitality and courage', element: 'Fire', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\阿拉善玛瑙.png' },
  { name: 'Xinjiang Hetian Jade', meaning: 'Symbolizes purity and moral integrity', element: 'Earth', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\新疆和田玉.png' },
  { name: 'Green Sandalwood', meaning: 'Brings tranquility and spiritual growth', element: 'Wood', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\绿檀木.png' },
  { name: 'Obsidian', meaning: 'Protects against negativity', element: 'Water', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\黑曜石.png' },
  { name: 'Shoushan Imperial Stone', meaning: 'Attracts wealth and prosperity', element: 'Earth', image: 'C:\\Users\\wanhu\\OneDrive\\desktop\\bracelet-customizer\\material_pics\\寿山石帝王石.png' },
  { name: 'White Cat\'s Eye Stone', meaning: 'Enhances intuition and insight', element: 'Metal', image: '' },
  { name: 'Amber', meaning: 'Promotes healing and energy', element: 'Earth', image: '' },
  { name: 'Red Agate', meaning: 'Boosts confidence and courage', element: 'Fire', image: '' },
  { name: 'Ice Blue Jadeite', meaning: 'Brings peace and serenity', element: 'Water', image: '' },
  { name: 'Wealth-Attracting Yellow Agate', meaning: 'Attracts wealth and success', element: 'Earth', image: '' },
  { name: 'Purple Sandalwood', meaning: 'Enhances spiritual awareness', element: 'Wood', image: '' },
  { name: 'Yellow Tiger Eye Stone', meaning: 'Provides protection and grounding', element: 'Earth', image: '' },
  { name: 'Green Jadeite', meaning: 'Symbolizes harmony and balance', element: 'Wood', image: '' },
  { name: 'Rose Quartz', meaning: 'Encourages love and compassion', element: 'Fire', image: '' },
  { name: 'Ice Garnet', meaning: 'Stimulates passion and energy', element: 'Fire', image: '' },
  { name: 'Brazilian Yellow Citrine', meaning: 'Attracts abundance and personal power', element: 'Earth', image: '' },
  { name: 'Cinnabar', meaning: 'Protects against evil and enhances vitality', element: 'Fire', image: '' },
  { name: 'Turquoise', meaning: 'Promotes healing and protection', element: 'Water', image: '' },
  { name: 'White Bodhi Seed', meaning: 'Encourages spiritual growth', element: 'Wood', image: '' },
  { name: 'Amethyst', meaning: 'Enhances intuition and spiritual awareness', element: 'Fire', image: '' },
  { name: 'Lepidolite', meaning: 'Reduces stress and promotes emotional balance', element: 'Water', image: '' },
  { name: 'Lapis Lazuli', meaning: 'Encourages wisdom and truth', element: 'Water', image: '' },
  { name: 'Goldstone', meaning: 'Boosts ambition and confidence', element: 'Fire', image: '' },
  { name: 'Peach Persian Jade', meaning: 'Promotes love and harmony', element: 'Earth', image: '' },
  { name: 'Hetian Purple Jade', meaning: 'Enhances spiritual insight', element: 'Water', image: '' },
  { name: 'Strawberry Quartz', meaning: 'Encourages love and emotional healing', element: 'Fire', image: '' },
  { name: 'Pigeon Blood Red', meaning: 'Symbolizes passion and vitality', element: 'Fire', image: '' },
  { name: 'Green Jade Stone', meaning: 'Promotes balance and harmony', element: 'Wood', image: '' },
  { name: 'Burmese Jadeite', meaning: 'Brings prosperity and longevity', element: 'Earth', image: '' },
  { name: 'Sheep Fat White Jade', meaning: 'Symbolizes purity and nobility', element: 'Metal', image: '' }
];

// —— 累计天数计算 ——
// 基准日期：1900-01-01
function calculateTotalDays(date) {
  const baseDate = new Date(1900, 0, 1); // 基准日期
  const diffTime = date - baseDate; // 时间差（毫秒）
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 转换为天数
}

// —— 干支与二十八宿计算 ——
function calculateGanZhiAndStars(totalDays) {
  const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const GANZHI_CYCLE = [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
  ];
  const TWENTY_EIGHT_STARS = [
    '角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁',
    '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸'
  ];
  const ganZhiIndex = (totalDays + 9) % 60; // 偏移量9
  const starIndex = (totalDays + 23) % 28; // 偏移量23
  return {
    ganZhi: GANZHI_CYCLE[ganZhiIndex],
    star: TWENTY_EIGHT_STARS[starIndex]
  };
}

// —— 四柱计算函数 ——
function getYearStem(y) { return HEAVENLY_STEMS[(y - 4 + 1000) % 10]; }
function getYearBranch(y) { return EARTHLY_BRANCHES[(y - 4 + 1200) % 12]; }
function getMonthStem(y, m) { const i = HEAVENLY_STEMS.indexOf(getYearStem(y)); return HEAVENLY_STEMS[(i * 2 + m - 2 + 1000) % 10]; }
function getMonthBranch(m) { return EARTHLY_BRANCHES[(m + 1) % 12]; }
function getDayStem(d) { const base = new Date(1900, 0, 1); const days = Math.floor((d - base) / 86400000); return HEAVENLY_STEMS[(days + 6) % 10]; }
function getDayBranch(d) { const base = new Date(1900, 0, 1); const days = Math.floor((d - base) / 86400000); return EARTHLY_BRANCHES[days % 12]; }
function getHourBranch(h) { h = (h + 24) % 24; if (h < 1 || h >= 23) return '子'; if (h < 3) return '丑'; if (h < 5) return '寅'; if (h < 7) return '卯'; if (h < 9) return '辰'; if (h < 11) return '巳'; if (h < 13) return '午'; if (h < 15) return '未'; if (h < 17) return '申'; if (h < 19) return '酉'; if (h < 21) return '戌'; return '亥'; }
function getHourStem(ds, h) { const si = HEAVENLY_STEMS.indexOf(ds); const bi = Math.floor((h + 1) / 2) % 12; return HEAVENLY_STEMS[(si * 2 + bi) % 10]; }

function calculateBaZi(dt) {
  const y = dt.getFullYear(), m = dt.getMonth() + 1, h = dt.getHours();
  const yS = getYearStem(y), yB = getYearBranch(y);
  const mS = getMonthStem(y, m), mB = getMonthBranch(m);
  const dS = getDayStem(dt), dB = getDayBranch(dt);
  const hB = getHourBranch(h), hS = getHourStem(dS, h);
  return { year: yS + yB, month: mS + mB, day: dS + dB, hour: hS + hB };
}

// —— 五行生克关系 ——
const ELEMENT_RELATIONS = {
  Wood: { generated_by: 'Water', generates: 'Fire', restricted_by: 'Metal' },
  Fire: { generated_by: 'Wood', generates: 'Earth', restricted_by: 'Water' },
  Earth: { generated_by: 'Fire', generates: 'Metal', restricted_by: 'Wood' },
  Metal: { generated_by: 'Earth', generates: 'Water', restricted_by: 'Fire' },
  Water: { generated_by: 'Metal', generates: 'Wood', restricted_by: 'Earth' }
};

function analyzeElements(pillars, dayP) {
  const arr = pillars.flatMap(p => [p[0], p[1]]).map(c => ELEMENT_MAP[c]);
  const cnt = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  arr.forEach(e => cnt[e]++);
  const entries = Object.entries(cnt);
  const max = Math.max(...entries.map(([, c]) => c));
  const min = Math.min(...entries.map(([, c]) => c));
  const strong = entries.find(([, c]) => c === max)[0];
  const weak = entries.find(([, c]) => c === min)[0];
  const fav = [weak]; const gen = ELEMENT_RELATIONS[weak].generated_by; if (gen !== weak) fav.push(gen);
  const unf = [strong]; const rst = ELEMENT_RELATIONS[strong].restricted_by; if (rst !== strong) unf.push(rst);
  return { favorable: fav, unfavorable: unf };
}

// —— 渲染与交互逻辑 ——
window.addEventListener('DOMContentLoaded', () => {
  const mCont = document.getElementById('materials-container');
  materials.forEach(mat => {
    const card = document.createElement('div'); card.className = 'material-card';
    const src = mat.image || `https://via.placeholder.com/250x150?text=${encodeURIComponent(mat.name)}`;
    card.innerHTML = `<img src="${src}" alt="${mat.name}"><div class="material-card-content">` +
      `<h3>${mat.name}</h3><p><strong>Meaning:</strong> ${mat.meaning}</p>` +
      `<p><strong>Element:</strong> ${mat.element}</p></div>`;
    mCont.appendChild(card);
  });

  document.getElementById('analyze-button').addEventListener('click', () => {
    const bd = document.getElementById('birthdate').value;
    const bt = document.getElementById('birthtime').value;
    const res = document.getElementById('analysis-result'); res.innerHTML = '';

    if (!bd || !bt) { res.textContent = 'Please enter birth date and time.'; return; }
    const dt = new Date(`${bd}T${bt}`); if (isNaN(dt)) { res.textContent = 'Invalid date/time.'; return; }

    const totalDays = calculateTotalDays(dt);
    const { ganZhi, star } = calculateGanZhiAndStars(totalDays);
    const bz = calculateBaZi(dt);
    const { favorable, unfavorable } = analyzeElements([bz.year, bz.month, bz.day, bz.hour], bz.day);

    const formatE = arr => arr.map(e => `<span class="element-${e.toLowerCase()}">${CH_ELEMENT[e]}</span>`).join(', ');
    const dm = `Day Master: ${bz.day} (` + `<span class="element-${ELEMENT_MAP[bz.day[0]].toLowerCase()}">${CH_ELEMENT[ELEMENT_MAP[bz.day[0]]]}</span>)`;
    const colorize = gh => gh.split('').map(ch => {
      const el = ELEMENT_MAP[ch];
      return el ? `<span class="element-${el.toLowerCase()}">${ch}</span>` : ch;
    }).join('');
    const table = `<h3>BaZi Chart</h3><table>` +
      `<tr><th>Pillar</th><th>GanZhi</th><th>Element</th></tr>` +
      `<tr><td>Year</td><td>${colorize(bz.year)}</td><td>${formatE([ELEMENT_MAP[bz.year[0]], ELEMENT_MAP[bz.year[1]]])}</td></tr>` +
      `<tr><td>Month</td><td>${colorize(bz.month)}</td><td>${formatE([ELEMENT_MAP[bz.month[0]], ELEMENT_MAP[bz.month[1]]])}</td></tr>` +
      `<tr><td>Day</td><td>${colorize(bz.day)}</td><td>${formatE([ELEMENT_MAP[bz.day[0]], ELEMENT_MAP[bz.day[1]]])}</td></tr>` +
      `<tr><td>Hour</td><td>${colorize(bz.hour)}</td><td>${formatE([ELEMENT_MAP[bz.hour[0]], ELEMENT_MAP[bz.hour[1]]])}</td></tr>` +
      `</table>`;

    res.innerHTML = `
      <p><strong>GanZhi:</strong> ${ganZhi}</p>
      <p><strong>Star:</strong> ${star}</p>
      <p><strong>Lucky Elements:</strong> ${formatE(favorable)}</p>
      <p><strong>Unlucky Elements:</strong> ${formatE(unfavorable)}</p>
      <p><strong>${dm}</strong></p>
      ${table}`;
  });
});