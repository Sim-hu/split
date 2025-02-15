// ダークモード切り替え機能
const darkModeSwitch = document.getElementById('darkModeSwitch');
darkModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
