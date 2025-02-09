$(function () {
	/**
	 * フェードアニメーション設定
	 */
	function fadeAnimation() {
		$('.fadeInTrg').each(function () { //fadeInUpTriggerというクラス名が
			var elemPos = $(this).offset().top + 100; //要素より、50px上の
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight) {
				$(this).addClass('fadeIn'); // 画面内に入ったらfadeInというクラス名を追記
			}
		});
	}

	/**
	 * スクロール時のアニメーション表示
	 */
	$(window).on('scroll', function () {
		fadeAnimation();
	});

	/**
	 * 初期ロード(ready)のアニメーション
	 */
	$(document).ready(function(){
		fadeAnimation();
	});
});