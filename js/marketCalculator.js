function calculateDisplay() {
    let s = parseFloat(document.getElementById('s').value);
    let m = parseFloat(document.getElementById('m').value);
    if (isNaN(s) || isNaN(m)) {
        alert('有効な数値を入力してください。');
        return;
    }
    let result = s * (1 + m/100);
    document.getElementById('displayResult').textContent = `マケ表記値段: ${result.toFixed(2)}`;
}

function calculateSetting() {
    let hyouki = parseFloat(document.getElementById('hyouki').value);
    let tesuu = parseFloat(document.getElementById('tesuu').value);
    if (isNaN(hyouki) || isNaN(tesuu)) {
        alert('有効な数値を入力してください。');
        return;
    }
    let result = hyouki / (1 + tesuu/100);
    document.getElementById('settingResult').textContent = `設定値段: ${result.toFixed(2)}`;
}
