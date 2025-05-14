const map = document.querySelector("#y-maps");

if (map) {
	let myMap = null;
	// const responsiveWidth = 960;

	window.addEventListener("load", () => {
		ymaps.ready(init);
	});

	function init() {
		const options = JSON.parse(map.dataset.options);
		const BalloonLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="balloon-overlay"></div>' +
				'<div class="custom-balloon">' +
				'<div class="custom-baloon-content">' +
				"$[properties.balloonContent]" +
				"</div>" +
				"</div>",
			{
				build: function () {
					BalloonLayout.superclass.build.call(this);

					// Блокируем взаимодействие с картой
					myMap.behaviors.disable(["drag", "dblClickZoom"]);

					const closeButton =
						this.getElement().querySelector(".balloon-closer");
					const overlay =
						this.getElement().parentElement.querySelector(".balloon-overlay");

					// Обработчик закрытия по крестику
					closeButton.addEventListener("click", () => {
						myMap.balloon.close();
					});

					// Обработчик закрытия по оверлею
					overlay.addEventListener("click", (e) => {
						if (e.target === overlay) {
							myMap.balloon.close();
						}
					});
				},

				clear: function () {
					// Восстанавливаем взаимодействие с картой
					myMap.behaviors.enable(["drag", "dblClickZoom"]);
					BalloonLayout.superclass.clear.call(this);
				},
			},
		);

		myMap = new ymaps.Map(
			"y-maps",
			{
				center: JSON.parse("[" + options.coords + "]"),
				zoom: Number(options.zoom),
				controls: [],
				behaviors: ["drag", "dblClickZoom"],
			},
			{
				maxZoom: options.maxZoom,
			},
		);

		const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="ymaps-icon-content-layout">$[properties.iconContent]</div>',
		);

		options.placemarks.forEach((placemark, index) => {
			const pin = new ymaps.Placemark(
				JSON.parse("[" + placemark.placemarkCoords + "]"),
				{
					iconContent: placemark.placemarkContent
						? `<div class="ymaps-icon-content-layout-inner">${placemark.placemarkContent}</div>`
						: "",
					balloonContent: placemark.balloonContent || "",
				},
				{
					placemarkID: index,
					iconLayout: "default#imageWithContent",
					iconImageHref: placemark.iconPath,
					iconImageSize: [50, 50],
					iconImageOffset: [-25, -25],
					iconContentOffset: [50, 10],
					iconContentLayout: MyIconContentLayout,
					balloonLayout: BalloonLayout,
					balloonCloseButton: false,
					balloonPanelMaxMapArea: 0,
				},
			);

			myMap.geoObjects.add(pin);

			pin.events.add("click", function (e) {
				const target = e.get("target");
				const coords = target.geometry.getCoordinates();

				// Закрываем предыдущий балун
				myMap.balloon.close();
				target.balloon.open(coords);
			});
		});

		let ZoomLayout = ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-btns'>" +
				"<button id='zoom-in' class='zoom-btn zoom-btn-in'></button>" +
				"<button id='zoom-out' class='zoom-btn zoom-btn-out'></button>" +
				"</div>",
			{
				build: function () {
					ZoomLayout.superclass.build.call(this);
					this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
					this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

					let zoomInBtn = document.getElementById("zoom-in");
					let zoomOutBtn = document.getElementById("zoom-out");

					zoomInBtn.addEventListener("click", this.zoomInCallback);
					zoomOutBtn.addEventListener("click", this.zoomOutCallback);
				},

				clear: function () {
					let zoomInBtn = document.getElementById("zoom-in");
					let zoomOutBtn = document.getElementById("zoom-out");

					zoomInBtn.removeEventListener("click", this.zoomInCallback);
					zoomOutBtn.removeEventListener("click", this.zoomOutCallback);
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
				position: { right: "40px", bottom: "40px" },
			},
		});
		myMap.controls.add(zoomControl);
	}
}
