import { gsap } from "gsap";

const menus = document.querySelectorAll(".top-multilevel-menu");

let tl = null;
function timeline(node) {
	return tl.fromTo(
		node,
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
}

if (menus.length) {
	let node = null;
	menus.forEach((menu) => {
		menu.addEventListener("mouseenter", (evt) => {
			node = menu.querySelector(".top-multilevel-menu__wrapper");
			tl = gsap.timeline().pause();
			timeline(node).play();
		});

		menu.addEventListener("mouseleave", (evt) => {
			timeline(node).reverse();
		});
	});
}

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
