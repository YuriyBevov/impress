import { gsap } from "gsap";
// refactoring !!!
const topMenu = document.querySelector(
	".header__section--top .top-multilevel-menu",
);
const topMenuWrapper = topMenu.querySelector(".top-multilevel-menu__wrapper");
const middleMenu = document.querySelector(
	".header__section--middle .top-multilevel-menu",
);
const middleMenuWrapper = middleMenu.querySelector(
	".top-multilevel-menu__wrapper",
);

if (topMenu) {
	const tl = gsap.timeline().pause();

	tl.fromTo(
		topMenuWrapper,
		{
			visibility: "hidden",
			y: -5,
			opacity: 0,
		},
		{
			visibility: "visible",
			y: 0,
			duration: 0.3,
			opacity: 1,
		},
	);

	topMenu.addEventListener("mouseenter", (evt) => {
		console.log("over");
		tl.play();
	});

	topMenu.addEventListener("mouseleave", (evt) => {
		console.log("leave");
		tl.reverse();
	});
}

if (middleMenu) {
	const tl = gsap.timeline().pause();

	tl.fromTo(
		middleMenuWrapper,
		{
			visibility: "hidden",
			y: -5,
			opacity: 0,
		},
		{
			visibility: "visible",
			y: 0,
			duration: 0.3,
			opacity: 1,
		},
	);

	middleMenu.addEventListener("mouseenter", (evt) => {
		console.log("over");
		tl.play();
	});

	middleMenu.addEventListener("mouseleave", (evt) => {
		console.log("leave");
		tl.reverse();
	});
}

// refactoring !!!
const inners = document.querySelectorAll(".has-inner");
if (inners) {
	const onClickToggleNavItemHandler = (evt) => {
		evt.stopPropagation();
		const target = evt.target;
		console.log(evt.target, evt.currentTarget);
		if (target.classList.contains("top-multilevel-menu__expander")) {
			evt.preventDefault();

			evt.currentTarget.classList.toggle("expanded");
		}
	};

	inners.forEach((inner) => {
		inner.addEventListener("click", onClickToggleNavItemHandler);
	});
}
