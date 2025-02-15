function calculateCrits() {
    var crt = parseFloat(document.getElementById('crt').value) || 0;
    var crp = parseFloat(document.getElementById('crp').value) || 0;
    var addcr = parseFloat(document.getElementById('addcr').value) || 0;
    var addcra = parseFloat(document.getElementById('addcra').value) || 0;
    var addcrb = parseFloat(document.getElementById('addcrb').value) || 0;
    var addcrc = parseFloat(document.getElementById('addcrc').value) || 0;
    var addcrd = parseFloat(document.getElementById('addcrd').value) || 0;

    var result = Math.floor((25 + crt / 3.4) * (1 + crp / 100)) + addcr + addcra + addcrb + addcrc + addcrd;
    document.getElementById('critsResult').innerText = '結果: ' + result.toFixed(2);
}
