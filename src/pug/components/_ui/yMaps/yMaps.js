const map = document.querySelector("#y-maps");

const data = {
	coords: "55.7486144400693,37.6534946239627",
	zoom: 13,
	maxZoom: 18,
	placemarks: [
		{
			iconPath: "/local/templates/impression/assets/images/map-pin-yellow.svg",
			placemarkCoords: "55.73975206899516,37.656819499999955",
			placemarkContent: "Бюро переводов на Марксистской",
			balloonContent: `
          <div class="map-contact">
            <div class="map-contact-header">
              <span class="map-contact-header-title">Бюро переводов на Марксистской</span>
              <button class="balloon-closer" aria-label="Закрыть"></button>
            </div>

            <div class="map-contact-content">
              <div class="map-contact-content-top">
                <img src="/local/templates/impression/assets/images/contact1.png" width="400" height="300"/>

                <div class="contact-card">
                  <div class="contact-card-field">
                    <strong>Адрес:</strong>
                    <address>г. Москва, ул. Марксистская, дом 10, строение 1, 3 этаж, оф. 306</address>
                  </div>

                  <div class="contact-card-field">
                    <strong>Телефон:</strong>
                    <a href="tel:+74959285366">+7 (495) 928-53-66</a>
                  </div>
              
                  <div class="contact-card-field">
                    <strong>Whatsapp:</strong>
                    <a href="https://wa.me/+79859285366" rel="noopener nofollow noreferrer" target="_blank">+7 (985) 928-53-66</a>
                  </div>
                      
                  <div class="contact-card-field">
                    <strong>Email:</strong>
                    <a href="mailto:info@buroimpression.ru">info@buroimpression.ru</a>
                  </div>
                </div>
              </div>

              <div class="map-contact-content-bottom">
                <p>Единственный выход из ст. Марксистская, из стеклянных дверей – прямо. Выходите на улицу и идете прямо около 60 метров. Желто-белый 4 этажный исторический особняк, через калитку входите на территорию, заходите в здание (подъезд находится по правую руку), проходите прямо до лестницы и поднимаетесь на 3-й этаж.</p>
                <p>На третьем этаже проходите по коридору прямо до конца и, повернув налево, оказываетесь перед нашим офисом № 306.</p>
                <p>Если заблудитесь, не стесняйтесь – звоните, мы с радостью Вам подскажем!</p>
              </div>
            </div>
          </div>`,
		},
		{
			iconPath: "/local/templates/impression/assets/images/map-pin-violet.svg",
			placemarkCoords: "55.75701906897993,37.63815249999991",
			placemarkContent: "Бюро переводов на Китай-городе",

			balloonContent: `
          <div class="map-contact">
            <div class="map-contact-header">
              <span class="map-contact-header-title">Бюро переводов на Китай-городе</span>
              <button class="balloon-closer" aria-label="Закрыть"></button>
            </div>

            <div class="map-contact-content">
              <div class="map-contact-content-top">
                <img src="/local/templates/impression/assets/images/contact2.png" width="400" height="300"/>
                <div class="contact-card">
                  <div class="contact-card-field">
                    <strong>Адрес:</strong>
                    <address>г. Москва, Петроверигский переулок, дом № 3, строение 1, в помещении нотариальной конторы Радченко И.В.</address>
                  </div>

                  <div class="contact-card-field">
                    <strong>Телефон:</strong>
                    <a href="tel:+74997072130">+7 (499) 707-21-30</a>
                    <a href="tel:+79197274334">+7 (919) 727-43-34</a>
                  </div>
                      
                  <div class="contact-card-field">
                    <strong>Email:</strong>
                    <a href="mailto:zakaz@cldoc.ru">zakaz@cldoc.ru</a>
                  </div>
                </div>
              </div>

              <div class="map-contact-content-bottom">
                <p>Метро «Китай-город» (Таганско-Краснопресненская линия). Выход в сторону улицы Маросейка, из стеклянных дверей метро направо, пройти по переходу до конца, выход налево.</p>
                <p>Выйдя из метро, поверните направо и далее пройдите по улице Маросейка до пересечения с Петроверигским переулком.</p>
              </div>
            </div>
          </div>`,
		},
	],
};

if (map) {
	let myMap = null;

	window.addEventListener("load", () => {
		ymaps.ready(init);
	});

	function init() {
		const options = window.ymapsData ? window.ymapsData : data;
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
