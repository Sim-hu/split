const weaponStats = {
    '片手剣': { str: 0.025, dex: 0.075, agi: 0 },
    '両手剣': { str: 0, dex: 0.1, agi: 0 },
    '双剣': { str: 0.025, dex: 0.075, agi: 0 },
    '弓': { str: 0.05, dex: 0.05, agi: 0 },
    '銃': { str: 0.05, dex: 0, agi: 0 },
    '杖': { str: 0.05, dex: 0, agi: 0 },
    'メインマグ': { str: 0, dex: 0.1, agi: 0 },
    '手甲': { str: 0, dex: 0.025, agi: 0 },
    '槍': { str: 0.05, dex: 0.05, agi: 0 },
    '刀': { str: 0.75, dex: 0.025, agi: 0 },
    '素手': { str: 0, dex: 1/3, agi: 0 }
};

// 武器タイプの変更を監視
document.getElementById('weaponType')?.addEventListener('change', function() {
    const weaponType = this.value;
    const subWeaponDiv = document.getElementById('subWeaponDiv');
    const arrowStabilityDiv = document.getElementById('arrowStabilityDiv');
    const destroyerDiv = document.getElementById('destroyerDiv');
    
    if (subWeaponDiv) {
        subWeaponDiv.style.display = weaponType === '双剣' ? 'block' : 'none';
    }
    if (arrowStabilityDiv) {
        arrowStabilityDiv.style.display = (weaponType === '弓' || weaponType === '銃') ? 'block' : 'none';
    }
    if (destroyerDiv) {
        destroyerDiv.style.display = weaponType === '手甲' ? 'block' : 'none';
    }
});

// ステータスによる安定率計算
function calculateStatStability(weaponType, str, dex, agi) {
    const stats = weaponStats[weaponType];
    const stability = (str * stats.str + dex * stats.dex + agi * stats.agi) || 0;
    return Math.floor(stability);
}

// 物理安定率計算
function calculatePhysicalStability(weaponStability, statStability, stabilityPercentage, arrowStability, berserk, destroyer, weaponType) {
    let stability = weaponStability + statStability;
    
    // 安定率%の計算（バーサークと破壊者の効果を含む）
    let totalStabilityPercentage = stabilityPercentage;
    if (berserk) {
        totalStabilityPercentage += -25;
    }
    if (destroyer && weaponType === '手甲') {
        totalStabilityPercentage += -10;
    }
    
    stability += totalStabilityPercentage;
    
    // 矢の安定率を加算
    if (arrowStability) {
        stability += arrowStability;
    }
    
    return Math.max(0, Math.min(100, stability));
}

// 魔法安定率計算
function calculateMagicStability(physicalStability) {
    const lowerLimit = Math.max(0, Math.min(90, Math.floor((physicalStability + 100) / 2)));
    const upperLimit = Math.max(100, Math.min(110, 100 + Math.floor((physicalStability - 80) / 2)));
    return { min: lowerLimit, max: upperLimit };
}

// サブ武器安定率計算
function calculateSubWeaponStability(subWeaponStability, stabilityPercentage) {
    return Math.floor(subWeaponStability / 2) + stabilityPercentage;
}

// メイン計算関数
function calculateStability() {
    const weaponType = document.getElementById('weaponType').value;
    const weaponStability = parseFloat(document.getElementById('weaponStability').value) || 0;
    const subWeaponStability = parseFloat(document.getElementById('subWeaponStability').value) || 0;
    const arrowStability = parseFloat(document.getElementById('arrowStability').value) || 0;
    const str = parseInt(document.getElementById('str').value) || 0;
    const dex = parseInt(document.getElementById('dex').value) || 0;
    const agi = parseInt(document.getElementById('agi').value) || 0;
    const stabilityPercentage = parseFloat(document.getElementById('stabilityPercentage').value) || 0;
    const berserk = document.getElementById('berserk').checked;
    const destroyer = document.getElementById('destroyer').checked;

    const statStability = calculateStatStability(weaponType, str, dex, agi);
    const physicalStability = calculatePhysicalStability(
        weaponStability, 
        statStability, 
        stabilityPercentage, 
        arrowStability, 
        berserk,
        destroyer,
        weaponType
    );
    const magicStability = calculateMagicStability(physicalStability);

    let resultHTML = `
        <p>物理安定率: ${physicalStability.toFixed(1)}%</p>
        <p>魔法安定率: ${magicStability.min.toFixed(1)}% ～ ${magicStability.max.toFixed(1)}%</p>
    `;

    if (weaponType === '双剣') {
        const subStability = calculateSubWeaponStability(subWeaponStability, stabilityPercentage);
        resultHTML += `<p>サブ安定率: ${subStability.toFixed(1)}%</p>`;
    }

    const resultDiv = document.getElementById('stabilityResult');
    if (resultDiv) {
        resultDiv.innerHTML = resultHTML;
    }
}
