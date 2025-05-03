const map = document.querySelector("#y-maps");

if (map) {
	let myMap = null;
	const responsiveWidth = 960;
	// const tabSwitchers = document.querySelectorAll('.tabs-switcher');

	window.addEventListener("load", () => {
		ymaps.ready(init);
	});

	function init() {
		const options = JSON.parse(map.dataset.options);

		let isMobileView = window.innerWidth >= responsiveWidth ? false : true;
		let isDesktopView = window.innerWidth >= responsiveWidth ? true : false;

		const setView = (map, view) => {
			let coords = null;

			isDesktopView = view === "desktop" ? true : false;
			isMobileView = view === "mobile" ? true : false;

			if (view === "desktop") {
				coords = JSON.parse("[" + options.desktopViewCenter + "]");
			}

			if (view === "mobile") {
				coords = JSON.parse("[" + options.mobileViewCenter + "]");
			}

			map.setCenter(coords, options.zoom);
			map.container.fitToViewport();
		};

		// Создание карты.
		myMap = new ymaps.Map(
			"y-maps",
			{
				center: isDesktopView
					? JSON.parse("[" + options.desktopViewCenter + "]")
					: JSON.parse("[" + options.mobileViewCenter + "]"),
				zoom: Number(options.zoom),
				controls: [],
				behaviors: ["drag", "dblClickZoom"],
			},
			{
				maxZoom: options.maxZoom,
			},
		);

		window.addEventListener("resize", () => {
			if (window.innerWidth >= responsiveWidth && isMobileView) {
				setView(myMap, "desktop");
			} else if (window.innerWidth < responsiveWidth && isDesktopView) {
				setView(myMap, "mobile");
			}
		});

		const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="ymaps-icon-content-layout">$[properties.iconContent]</div>',
		);

		options.placemarks.forEach((placemark, index) => {
			// Метка
			const pin = new ymaps.Placemark(
				JSON.parse("[" + placemark.placemarkCoords + "]"),
				{
					iconContent: placemark.placemarkContent
						? `<div class="ymaps-icon-content-layout-inner">${placemark.placemarkContent}</div>`
						: "",
				},
				{
					// Опции.
					// Необходимо указать данный тип макета.
					placemarkID: index,
					iconLayout: "default#imageWithContent",
					// Своё изображение иконки метки.
					iconImageHref: placemark.iconPath,
					// Размеры метки.
					iconImageSize: [50, 50],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-25, -25],
					iconContentOffset: [50, 10],
					iconContentLayout: MyIconContentLayout,
				},
			);

			myMap.geoObjects.add(pin);

			pin.events.add("click", (evt) => {
				evt.preventDefault();
				console.log("test");
				// myMap.setZoom(options.maxZoom).then(() => {
				// const id = evt.get("target").options.get("placemarkID");
				// tabSwitchers.forEach((switcher) => {
				// 	if (Number(switcher.dataset.tab) === Number(id)) {
				// 		switcher.click();
				// 	}
				// });
				// });
			});
		});

		// const tabs = document.querySelectorAll(".tabs-switcher");
		// tabs.forEach((tab) => {
		// 	tab.addEventListener("click", () => {
		// 		const id = tab.dataset.tab;

		// 		myMap.geoObjects.each((placemark) => {
		// 			if (Number(placemark.options.get("placemarkID")) === Number(id)) {
		// 				myMap.setZoom(options.maxZoom).then(() => {
		// 					myMap.panTo(placemark.geometry.getCoordinates(), { duration: 0 });
		// 					myMap.container.fitToViewport();
		// 				});
		// 			}
		// 		});
		// 	});
		// });

		// ZOOM-CONTROL
		let ZoomLayout = ymaps.templateLayoutFactory.createClass(
			//Шаблон html кнопок зума
			// "<button id='zoom-refresh' class='zoom-btn zoom-btn-refresh' aria-label='Вернуть карту в первоначальное состояние'></button>" +
			"<div class='zoom-btns'>" +
				"<button id='zoom-in' class='zoom-btn zoom-btn-in' aria-label='Увеличить масштаб'></button>" +
				"<button id='zoom-out' class='zoom-btn zoom-btn-out' aria-label='Уменьшить масштаб'></button>" +
				"</div>",
			{
				// Переопределяем методы макета, чтобы выполнять дополнительные действия
				// при построении и очистке макета.
				build: function () {
					// Вызываем родительский метод build.
					ZoomLayout.superclass.build.call(this);

					// Привязываем функции-обработчики к контексту и сохраняем ссылки
					// на них, чтобы потом отписаться от событий.
					this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
					this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

					// Начинаем слушать клики на кнопках макета.
					let zoomInBtn = document.getElementById("zoom-in");
					let zoomOutBtn = document.getElementById("zoom-out");
					// let zoomRefreshBtn = document.getElementById("zoom-refresh");

					zoomInBtn.addEventListener("click", this.zoomInCallback);
					zoomOutBtn.addEventListener("click", this.zoomOutCallback);

					// zoomRefreshBtn.addEventListener("click", () => {
					// 	tabSwitchers[0].click();
					// 	const center = isDesktopView
					// 		? JSON.parse("[" + options.desktopViewCenter + "]")
					// 		: JSON.parse("[" + options.mobileViewCenter + "]");
					// 	const zoom = Number(options.zoom);
					// 	myMap.setZoom(zoom).then(() => {
					// 		myMap.panTo(center, { duration: 0 });
					// 	});
					// });
				},

				clear: function () {
					// Снимаем обработчики кликов.
					zoomInBtn.removeEventListener("click", this.zoomInCallback);
					zoomOutBtn.removeEventListener("click", this.zoomOutCallback);
					// Вызываем родительский метод clear.
					ZoomLayout.superclass.clear.call(this);
				},

				zoomIn: function () {
					myMap.balloon.close();

					let map = this.getData().control.getMap();
					map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
				},

				zoomOut: function () {
					myMap.balloon.close();

					let map = this.getData().control.getMap();
					map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
				},
			},
		);

		let zoomControl = new ymaps.control.ZoomControl({
			options: {
				layout: ZoomLayout,
				position: { right: "30px", bottom: "30px" },
			},
		});
		myMap.controls.add(zoomControl);
	}
}
