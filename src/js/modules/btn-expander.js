const btns = document.querySelectorAll(".main-btn--expander");

if (btns.length) {
	btns.forEach((btn) => {
		const contentNodeHeight = btn.previousElementSibling;
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
