document.addEventListener('DOMContentLoaded', (event) => {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('#menu a');

    // ハンバーガーメニューの開閉
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    // メニューリンクのクリックでメニューを閉じてスムーズスクロール
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.remove('open');
            const targetId = link.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });

    // スムーズスクロール関数
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // ウィンドウのリサイズ時にセクションの高さを調整
    function adjustSectionHeight() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const footerHeight = document.querySelector('footer').offsetHeight;
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            section.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
        });
    }

    // 初期化時とリサイズ時にセクションの高さを調整
    window.addEventListener('load', adjustSectionHeight);
    window.addEventListener('resize', adjustSectionHeight);

    // ページ読み込み時にURLのハッシュに対応するセクションにスクロール
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => smoothScroll(targetId), 100);
    }
});