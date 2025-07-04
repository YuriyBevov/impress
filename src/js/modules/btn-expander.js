const btns = document.querySelectorAll(".main-btn--expander");

if (btns.length) {
	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.previousElementSibling.classList.toggle("collapsed");
			btn.classList.add("hidden");
		});
	});
}
