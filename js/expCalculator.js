function calculateExp() {
    const x = parseInt(document.getElementById('currentLevel').value);
    const currentExp = parseFloat(document.getElementById('currentExp').value);
    let n;

    if (document.getElementById('levelIncreaseRadio').checked) {
        n = parseInt(document.getElementById('levelIncrease').value);
    } else {
        const targetLevel = parseInt(document.getElementById('targetLevel').value);
        n = targetLevel - x;
    }

    const currentLevelExp = Math.floor(Math.pow(x, 4) / 40) + 2 * x;
    const currentExpValue = currentLevelExp * (1 - currentExp / 100);

    let total = currentExpValue;
    for (let i = x + 1; i < x + n; i++) {
        total += Math.floor(Math.pow(i, 4) / 40) + 2 * i;
    }

    document.getElementById('resultRaw').textContent = `${x}レベル(${currentExp}%)から${x + n}レベルまでに必要な累計経験値は${Math.round(total)}です。`;
    document.getElementById('resultFormatted').textContent = `${x}レベル(${currentExp}%)から${x + n}レベルまでに必要な累計経験値は${formatNumber(Math.round(total))}です。`;
}

// イベントリスナーの設定
document.getElementById('levelIncreaseRadio').addEventListener('change', function() {
    document.getElementById('levelIncrease').disabled = false;
    document.getElementById('targetLevel').disabled = true;
});

document.getElementById('targetLevelRadio').addEventListener('change', function() {
    document.getElementById('levelIncrease').disabled = true;
    document.getElementById('targetLevel').disabled = false;
});
