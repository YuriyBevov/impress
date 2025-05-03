import { Modal } from "../classes/Modal";

const modals = document.querySelectorAll(".modal");
console.log(modals);

if (modals) {
	modals.forEach((modal) => {
		new Modal(modal);
	});
}
