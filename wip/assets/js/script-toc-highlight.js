$(document).ready(function () {
	let tocLinks = $("header .container nav ul li a");
	let sections = [];

  // 各セクションの位置を取得してキャッシュ
	tocLinks.each(function (i, element) {
		let headingName = $(element).attr("href").replace(/^#/, "");
		let offset = 350;
		let headingPosition = $("#" + headingName)[0]?.offsetTop - offset;

		if (headingPosition !== undefined) {
			sections.push({ element: element, position: headingPosition });
		}
	});

	let ticking = false;

	$(window).on("scroll", function () {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(checkScroll);
		}
	});

	function checkScroll() {
		let scrollY = window.scrollY;
		let targetElement = false;

		sections.forEach(function (section) {
			if (scrollY >= section.position) {
				targetElement = section.element;
			}
		});

		// すべてのリンクのハイライトをリセット
		tocLinks.removeClass("toc-highlight");

		// 該当するリンクにハイライトを追加
		if (targetElement) {
			$(targetElement).addClass("toc-highlight");
		}

		ticking = false;
	}
});
