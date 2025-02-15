function calculateCD() {
    var basestr = parseFloat(document.getElementById('basestr').value) || 0;
    var strp = parseFloat(document.getElementById('strp').value) || 0;
    var addstr = parseFloat(document.getElementById('addstr').value) || 0;
    var baseagi = parseFloat(document.getElementById('baseagi').value) || 0;
    var agip = parseFloat(document.getElementById('agip').value) || 0;
    var addagi = parseFloat(document.getElementById('addagi').value) || 0;
    var cdp = parseFloat(document.getElementById('cdp').value) || 0;
    var addcd = parseFloat(document.getElementById('addcd').value) || 0;
    var cupslv = parseFloat(document.getElementById('cupslv').value) || 0;
    var kisekislv = parseFloat(document.getElementById('kisekislv').value) || 0;

    cdp += calculatecdupEffect(cupslv);
    var totalagi = baseagi * (1 + agip / 100) + addagi + calculateSwiftTrajectoryEffect(kisekislv);
    var totalstr = basestr * (1 + strp / 100) + addstr;
    var maxResult = Math.max(totalstr / 5, (totalagi + totalstr) / 10);
    var result = Math.floor((150 + maxResult) * (1 + cdp / 100)) + addcd;

    if (result > 300) {
        result = Math.floor((result - 300) / 2 + 300);
    }
    document.getElementById('cdResult').innerText = '結果: ' + result;
}

function calculatecdupEffect(level) {
    return Math.min((level - 1), 5);
}

function calculateSwiftTrajectoryEffect(level) {
    if (level <= 5) {
        return level;
    } else {
        return 5 + (level - 5) * 2;
    }
}
