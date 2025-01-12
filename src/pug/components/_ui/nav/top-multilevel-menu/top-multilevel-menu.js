import {gsap} from 'gsap';
const menu = document.querySelector('.top-multilevel-menu');
const wrapper = document.querySelector('.top-multilevel-menu__wrapper');
const inners = menu.querySelectorAll('.has-inner');
console.log('test');

if(menu) {
  const tl = gsap.timeline().pause();

  tl.fromTo(wrapper, {
    visibility: 'hidden',
    y: -5,
    opacity: 0
  },
  {
    visibility: 'visible',
    y: 0,
    duration: 0.3,
    opacity: 1
  });

  menu.addEventListener('mouseenter', (evt) => {
    console.log('over');
    tl.play();
  });

  menu.addEventListener('mouseleave', (evt) => {
    console.log('leave');
    tl.reverse();
  });
}

if(inners) {
  const onClickToggleNavItemHandler = (evt) => {
    evt.stopPropagation();
    const target = evt.target;
    console.log(evt.target, evt.currentTarget);
    if(target.classList.contains('top-multilevel-menu__expander')) {
      evt.preventDefault();

      evt.currentTarget.classList.toggle('expanded');
    }
  }

  inners.forEach(inner => {
    inner.addEventListener('click', onClickToggleNavItemHandler);
  })
}