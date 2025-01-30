$(function () {
	const stalker = $("#js-stalker");
	$(document).on("mousemove", function (e) {
		// マウスの座標を取得
		const x = e.clientX;
		const y = e.clientY;
		// ストーカーの位置を更新
		stalker.css({
			opacity: 1, // カーソルが画面内に入ったら不透明にする
			transform: "translate(" + x + "px, " + y + "px)", // マウスの座標に移動
		});
	});
	$("a").on({
		mouseenter: function () {
			stalker.addClass("js-hover"); // リンクにカーソルが乗ったときに拡大するクラスを追加
		},
		mouseleave: function () {
			stalker.removeClass("js-hover"); // リンクからカーソルが離れたときに拡大するクラスを削除
		},
	});
});