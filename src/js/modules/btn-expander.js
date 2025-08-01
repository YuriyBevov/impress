const btns = document.querySelectorAll(".main-btn--expander");

if (btns.length) {
	btns.forEach((btn) => {
		const contentNodeHeight = btn.previousElementSibling;
		console.log(contentNodeHeight.clientHeight);
		if (contentNodeHeight.clientHeight > 240) {
			contentNodeHeight.classList.add("collapsed");
			btn.style.display = "flex";
		}
		btn.addEventListener("click", () => {
			btn.previousElementSibling.classList.toggle("collapsed");
			btn.classList.add("hidden");
		});
	});
}

// const navMain = document.querySelector(".main-nav");
// const navToggle = document.querySelector(".main-nav__toggle");

// navMain?.classList.remove("main-nav--nojs");

// navToggle?.addEventListener("click", () => {
// 	if (navMain?.classList.contains("main-nav--closed")) {
// 		navMain?.classList.remove("main-nav--closed");
// 		navMain?.classList.add("main-nav--opened");
// 	} else {
// 		navMain?.classList.add("main-nav--closed");
// 		navMain?.classList.remove("main-nav--opened");
// 	}
// });
