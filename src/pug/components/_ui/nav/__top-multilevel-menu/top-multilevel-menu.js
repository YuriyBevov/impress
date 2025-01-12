
const items = document.querySelectorAll('.main-nav__list-item > a > svg');
const innerItems = document.querySelectorAll('.top-multilevel-menu__list-item > a > svg');

if(items.length) {
  items.forEach(item => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.currentTarget.closest('.main-nav__list-item').classList.toggle('expanded');
    });
  });
}

if(innerItems.length) {
  innerItems.forEach(item => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.currentTarget.closest('.top-multilevel-menu__list-item').classList.toggle('expanded');
    });
  });
}

window.addEventListener('keydown', (evt) => {
  if(evt.key === 'Enter' && evt.target.classList.contains('main-nav-item-expander')) {
    evt.preventDefault();
    const active = document.querySelector('.top-multilevel-menu__list-item.expanded');

    if(active) {
      active.classList.remove('expanded');
    }

    evt.target.closest('li').classList.toggle('expanded');
  }
});

window.addEventListener('click', (evt) => {
  if(!evt.target.classList.contains('top-multilevel-menu') && window.innerWidth > 1239) {
    document.querySelectorAll('.expanded').forEach(item => {
      item.classList.remove('expanded');
    })
  }
});
