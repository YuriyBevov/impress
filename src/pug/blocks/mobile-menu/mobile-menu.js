import { gsap } from "gsap";
const menuOpener = document.querySelector(".burger");

if (menuOpener) {
	const menu = document.querySelector(".mobile-menu");
	const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
	const menuCloser = document.querySelector(".burger.mobile-menu-closer");

	const tl = gsap.timeline().pause();
	gsap.set(menu, {
		x: "-100vw",
	});
	gsap.set(mobileMenuOverlay, {
		alpha: 0,
	});

	tl.to(mobileMenuOverlay, {
		visibility: "visible",
		duration: 0,
	})
		.to(mobileMenuOverlay, {
			alpha: 1,
			duration: 0.2,
			ease: "linear",
		})
		.to(menu, {
			x: 0,
			duration: 0.3,
			ease: "linear",
		});

	const closeMobileMenuHandler = () => {
		menu.classList.remove("opened");
		menuCloser.removeEventListener("click", closeMobileMenuHandler);
		menuOpener.addEventListener("click", openMobileMenuHandler);
		mobileMenuOverlay.removeEventListener(
			"click",
			onOverlayClickCloseMobileMenu,
		);

		tl.reverse();

		menu.querySelectorAll(".expanded")?.forEach((item) => {
			item.classList.remove("expanded");
		});
	};

	const openMobileMenuHandler = () => {
		menu.classList.add("opened");
		menuOpener.removeEventListener("click", openMobileMenuHandler);
		menuCloser.addEventListener("click", closeMobileMenuHandler);
		mobileMenuOverlay.addEventListener("click", onOverlayClickCloseMobileMenu);

		tl.play();
	};

	const onOverlayClickCloseMobileMenu = (evt) => {
		if (evt.target === mobileMenuOverlay) {
			closeMobileMenuHandler();
		}
	};

	menuOpener.addEventListener("click", openMobileMenuHandler);
}
const openers = document.querySelectorAll(".mobile-menu__inner-opener-btn");

if (openers.length) {
	const onClickExpandItem = (evt) => {
		evt.preventDefault();
		const target = evt.currentTarget;

		target.parentNode.nextElementSibling.classList.toggle("expanded");
	};
	openers.forEach((opener) => {
		opener.addEventListener("click", onClickExpandItem);
	});
}
