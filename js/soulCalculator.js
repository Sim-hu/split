// 霊魂計算機関連の処理
function calculateSoul() {
    // 入力値を取得
    const currentLevel = parseInt(document.getElementById('soulCurrentLevel').value);
    const currentExpPercentage = parseFloat(document.getElementById('soulCurrentExp').value);
    const targetLevel = parseInt(document.getElementById('soulTargetLevel').value);
    const targetExpPercentage = parseFloat(document.getElementById('soulTargetExp').value);
    
    // 現在のレベルの必要経験値
    const currentLevelExp = Math.floor(Math.pow(currentLevel, 4) / 40) + 2 * currentLevel;
    
    // 目標レベルの必要経験値
    const targetLevelExp = Math.floor(Math.pow(targetLevel, 4) / 40) + 2 * targetLevel;
    
    // 現在のレベルでの残り経験値 (現在の進行度を考慮)
    const currentRemainingExp = currentLevelExp * (1 - currentExpPercentage / 100);
    
    // 目標レベルまでの途中の全レベル分の経験値を計算
    let totalExp = 0;
    for (let i = currentLevel + 1; i < targetLevel; i++) {
        totalExp += Math.floor(Math.pow(i, 4) / 40) + 2 * i;
    }
    
    // 目標レベルですでに獲得している経験値
    const targetAcquiredExp = targetLevelExp * (targetExpPercentage / 100);
    
    // 必要な合計経験値 = 現在の残り + 途中のレベル + 目標レベルの獲得分
    // ただし、現在と目標が同じレベルの場合は特別処理
    let totalRequiredExp;
    if (currentLevel === targetLevel) {
        // 同じレベル内での経験値差分を計算
        totalRequiredExp = currentLevelExp * (targetExpPercentage - currentExpPercentage) / 100;
        // 経験値減少の場合は0とする（不正な入力）
        if (totalRequiredExp < 0) {
            totalRequiredExp = 0;
        }
    } else {
        totalRequiredExp = currentRemainingExp + totalExp + targetAcquiredExp;
    }
    
    // 1回の霊魂使用で獲得できる経験値
    const expPerSoul = 34056000;
    
    // 霊魂何個分かを計算 (1s = 99個)
    const soulsNeeded = totalRequiredExp / expPerSoul;
    const fullSets = Math.floor(soulsNeeded);
    const remainder = soulsNeeded - fullSets;
    const individualSouls = Math.ceil(remainder * 99);
    
    // 結果を表示
    document.getElementById('soulResultRaw').textContent = `${currentLevel}レベル(${currentExpPercentage}%)から${targetLevel}レベル(${targetExpPercentage}%)までに必要な経験値は${Math.round(totalRequiredExp)}です。`;
    document.getElementById('soulResultFormatted').textContent = `${currentLevel}レベル(${currentExpPercentage}%)から${targetLevel}レベル(${targetExpPercentage}%)までに必要な経験値は${formatNumber(Math.round(totalRequiredExp))}です。`;
    
    // 霊魂必要数の表示
    if (fullSets === 0 && individualSouls === 0) {
        document.getElementById('soulNeeded').textContent = `必要な霊魂はありません。`;
    } else if (fullSets === 0) {
        document.getElementById('soulNeeded').textContent = `必要な霊魂は${individualSouls}個です。`;
    } else if (individualSouls === 0) {
        document.getElementById('soulNeeded').textContent = `必要な霊魂は${fullSets}sです。`;
    } else {
        document.getElementById('soulNeeded').textContent = `必要な霊魂は${fullSets}sと${individualSouls}個です。`;
    }
}

// 入力値のバリデーションとエラーチェックを追加することも検討
