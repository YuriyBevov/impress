const calc = document.querySelector(".calc-form");

if (calc) {
	const ctrls = calc.querySelectorAll("[data-price]");
	const total = calc.querySelector(".calc-form__total-price span");
	const basePrice = calc.querySelector("[data-base-price]");

	let currentValue = Number(basePrice.dataset.basePrice.replaceAll(" ", ""));

	const numberPrettify = (number) => {
		const separator = " ";
		return number
			.toString()
			.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
	};

	const fillPriceNode = (value) => {
		total.innerHTML = numberPrettify(Math.round(value));
	};

	fillPriceNode(currentValue);

	const setTotalPrice = () => {
		let total = currentValue;

		ctrls.forEach((ctrl) => {
			if (ctrl.checked && ctrl.dataset.price) {
				total += Number(ctrl.dataset.currentPrice)
					? Number(ctrl.dataset.currentPrice)
					: Number(ctrl.dataset.price);
			}
		});

		fillPriceNode(total);
	};

	ctrls.forEach((ctrl) => {
		ctrl.addEventListener("click", () => {
			if (ctrl.dataset.price) {
				setTotalPrice();
			}
		});
	});
}
