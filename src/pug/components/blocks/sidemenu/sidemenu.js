document.addEventListener("DOMContentLoaded", () => {
	const openers = document.querySelectorAll(".sidemenu__opener");

	if (openers.length) {
		const items = document.querySelectorAll(".sidemenu__list-item");
		const onClickToogleItem = (target) => {
			items.forEach((item) => {
				const active = item.querySelector(".initial-expanded");
				active ? active.classList.remove("initial-expanded") : null;
			});

			target.classList.toggle("expanded");
		};

		openers.forEach((opener) => {
			opener.addEventListener("click", () => {
				console.log(opener.closest("li"));
				onClickToogleItem(opener.closest("li"));
			});
		});
	}
});
// document.addEventListener("DOMContentLoaded", () => {
// 	const openers = document.querySelectorAll(".sidemenu__opener");

// 	if (openers.length) {
// 		const items = document.querySelectorAll(".sidemenu__list-item");
// 		const onClickToogleItem = (target) => {
// 			items.forEach((item) => {
// 				const active = item.querySelector(".initial");
// 				active ? active.classList.remove("initial") : null;

// 				if (target !== item && item.classList.contains("expanded")) {
// 					item.classList.remove("expanded");
// 				}
// 			});
// 			target.classList.toggle("expanded");
// 		};

// 		openers.forEach((opener) => {
// 			opener.addEventListener("click", () => {
// 				console.log(opener.closest("li"));
// 				// opener.closest("li").classList.toggle("expanded");
// 				onClickToogleItem(opener.closest("li"));
// 			});
// 		});
// 	}
// 	// const items = document.querySelectorAll(".sidemenu__list-item");

// 	// if (items.length) {
// 	// 	const onClickToogleItem = (target) => {
// 	// 		items.forEach((item) => {
// 	// 			const active = item.querySelector(".initial");
// 	// 			active ? active.classList.remove("initial") : null;

// 	// 			if (target !== item && item.classList.contains("expanded")) {
// 	// 				item.classList.remove("expanded");
// 	// 			}
// 	// 		});
// 	// 		target.classList.toggle("expanded");
// 	// 	};
// 	// 	items.forEach((item) => {
// 	// 		item.addEventListener("click", (evt) => {
// 	// 			console.log(evt.target);
// 	// 			if (item.querySelector("ul") && evt.target === item) {
// 	// 				onClickToogleItem(item);
// 	// 			}
// 	// 		});
// 	// 	});
// 	// }
// });
