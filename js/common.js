// ページ切り替え機能
function showPage(pageId) {
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    document.getElementById(pageId).classList.add('active');
}

// 数値フォーマット機能
function formatNumber(num) {
    const billions = Math.floor(num / 100000000);
    const millions = Math.floor((num % 100000000) / 10000);
    const remainder = num % 10000;
    let formattedNumber = '';
    if (billions > 0) {
        formattedNumber += billions + '億';
    }
    if (millions > 0) {
        formattedNumber += millions + '万';
    }
    if (remainder > 0) {
        formattedNumber += remainder;
    }
    return formattedNumber || '0';
}

// ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', (event) => {
    showPage('cdPage');
    initializeDiaryEntry();
});
