function calculateStock1() {
    const n = parseFloat(document.getElementById('n1').value);
    const m = parseInt(document.getElementById('m1').value);
    const t = parseInt(document.getElementById('t1').value);

    if (isNaN(n) || isNaN(m) || isNaN(t) || n <= 0 || m <= 0 || t < 0 || t >= m) {
        document.getElementById('stockResult1').textContent = '正しい値を入力してください。';
        return;
    }

    const totalCost = n * m;
    const j = totalCost / (m - t);

    document.getElementById('stockResult1').textContent = `${j.toFixed(1)}万円で売れば、${t}個がタダになります。`;
}

function calculateStock2() {
    const n = parseFloat(document.getElementById('n2').value);
    const m = parseInt(document.getElementById('m2').value);
    const k = parseInt(document.getElementById('k2').value);

    if (isNaN(n) || isNaN(m) || isNaN(k) || n <= 0 || m <= 0 || k <= 0 || k > m) {
        document.getElementById('stockResult2').textContent = '正しい値を入力してください。';
        return;
    }

    const totalCost = n * m;
    const freeItems = m - k;
    const r = totalCost / k;

    document.getElementById('stockResult2').textContent = `${r.toFixed(1)}万円で売れば、残りの${freeItems}個がタダになります。`;
}
