$('.slider1, .slider2').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: '.slider1, .slider2',
	draggable: true, // マウスドラッグ禁止
	swipe: false,     // スワイプ禁止
	touchMove: true,  // タッチ操作禁止
	responsive: [
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 375,
			settings: {
				slidesToShow: 1,
			}
		},
	]
});

// Next/Prevボタンの動作
$('#btn-next').click(function(){
	$('.slider1, slider2').slick('slickNext');
});

$('#btn-prev').click(function(){
	$('.slider1, slider2').slick('slickPrev');
});