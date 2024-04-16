"use strict";

(function () {
	/* 
	**
	***
	start */

	/* fetch image json, and render page */

	async function fetchImgData() {
		try {
			$(".images-wrapper").html("<p class='loading'>Loading images...</p>");
			const res = await fetch("https://sushistar-a3357-default-rtdb.firebaseio.com/gallery.json");
			console.log(res);
			if (!res.ok) {
				throw new Error("fetch failed");
			}

			const resData = await res.json();
			console.log(resData);
			/* clear the loading... */
			$(".images-wrapper").html("");
			$(".images-wrapper").append(
				resData.map(
					item => `
				<picture>
							<source srcset="./assets/images/${item.img}" media="(min-width: 800px) alt="${item.des}" />
							<img src="./assets/images/${item.img_s}" alt="${item.des}" />
						</picture>
				`
				)
			);
		} catch {
			console.error("error fetching data:", error);
		}
	}

	fetchImgData();

	async function fetchAboutData() {
		try {
			$(".article-wrapper").html("<p class='loading'>loading...</p>");
			const res = await fetch("https://sushistar-a3357-default-rtdb.firebaseio.com/about.json");
			console.log(res);
			if (!res.ok) {
				throw new Error("fetch failed");
			}
			const aboutData = await res.json();
			console.log(aboutData);

			$(".article-wrapper").html(
				aboutData.map(
					item => `
			<article>${item}</article>
			`
				)
			);
		} catch {
			console.error("error fetching data:", error);
		}
	}

	fetchAboutData();

	$(".nav-button").on("click", function () {
		$(".nav-link-list").toggleClass("active");
		$(".nav-button").toggleClass("active");
	});

	function scrollDownToAbout() {
		$("html, body").animate(
			{
				scrollTop: $(".about").offset().top - 90,
			},
			1000
		);
	}

	function scrollDownToGallery() {
		$("html, body").animate(
			{
				scrollTop: $(".gallery").offset().top - 90,
			},
			1000
		);
	}

	function scrollDownToContact() {
		$("html, body").animate(
			{
				scrollTop: $(".footer-hours").offset().top - 90,
			},
			1000
		);
	}

	function closeNavMenu() {
		setTimeout(() => {
			$(".nav-link-list").removeClass("active");
			$(".nav-button").removeClass("active");
		}, 500);
	}

	$(".aboutBtn").on("click", function () {
		scrollDownToAbout();
		closeNavMenu();
	});

	$(".galleryBtn").on("click", function () {
		scrollDownToGallery();
		closeNavMenu();
	});
	$(".contactBtn").on("click", function () {
		scrollDownToContact();
		closeNavMenu();
	});

	/* 
	**
	***
	end */
})();
