console.log('accordeon');
const accordeons = document.querySelectorAll('.accordeon');

if (accordeons) {
  accordeons.forEach((accordeon) => {
    const items = accordeon.querySelectorAll('.accordeon-header');

    items.forEach((item) => {
      item.addEventListener('click', () => {
        console.log('click');
        items.forEach((item) => {
          item.parentNode.classList.contains('expanded') && item.parentNode.classList.remove('expanded');
        });

        setTimeout(() => {
          item.parentNode.classList.toggle('expanded');
        }, 0);
      });
    });
  });
}
