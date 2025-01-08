import {gsap} from "gsap";

const burger = document.querySelector('.burger');

if(burger) {
  const tl = gsap.timeline().pause();

  tl.to('.burger-line--top', {
    xPercent: -150,
    opacity: 0,
    duration: 0.2,
  })
  tl.to('.burger-line--bottom', {
    xPercent: 150,
    opacity: 0,
    duration: 0.2
  }, "-=0.2")
  tl.to('.burger-line--middle-top', {
    rotate: '45deg',
    duration: 0.3
  }, "-=0.2")
  tl.to('.burger-line--middle-bottom', {
    rotate: '-45deg',
    duration: 0.3,
  }, "-=0.2")

  let isOpen = false;

  const onClickOpenNav = () => {
    !isOpen ? tl.play() : tl.reverse();
    isOpen = !isOpen;
  }

  burger.addEventListener('click', onClickOpenNav);
}