import { gsap } from "gsap";

const collapsedLinks = document.querySelectorAll(".collapsed-link");
const isHoverSupported = window.matchMedia("(hover: hover)").matches;

if (collapsedLinks.length && isHoverSupported) {
	collapsedLinks.forEach((link) => {
		const text = link.querySelector("span");
		gsap.set(text, { x: "100%" });

		const hoverTimeline = gsap
			.timeline({ paused: true })
			.to(link, {
				width: "fit-content",
			})
			.to(text, {
				x: 0,
				duration: 0.4,
				ease: "power2.out",
			});

		link.addEventListener("mouseenter", () => {
			hoverTimeline.play();
		});
		link.addEventListener("mouseleave", () => {
			hoverTimeline.reverse();
		});
	});
}
