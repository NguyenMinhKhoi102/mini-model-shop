const btnPrevious = document.querySelector(".wrapper-btn__previous");
const btnNext = document.querySelector(".wrapper-btn__next");

const circles = document.querySelector(".wrapper-circles");
const circleList = circles.querySelectorAll("li");
const carousel = document.querySelector(".carousel");
const carouselList = carousel.querySelectorAll("li");

const progressOccupy = document.querySelector(".progress-occupy");
const progressFront = document.querySelector(".progress-front");
const progressTail = document.querySelector(".progress-tail");

let itemActived = circles.querySelector(".active");
let circleActive = itemActived.querySelector(".circle");
let textActive = itemActived.querySelector(".circle-text");

circleActive.style.scale = "1";
textActive.style.opacity = "1";
textActive.style.visibility = "visible";
textActive.style.rotate = "0deg";

let itemListLength = carouselList.length - 1;
let index = 0;

const checkNext = () => {
  return index === 0 ? true : false;
}

const rerenderCarousel = () => {
  let activeIndex = itemListLength - index;
  let itemWidth = carouselList[activeIndex].offsetWidth;
  let space = 300;
  carousel.style.transform = `translateX(${(itemWidth + space) * index}px)`

  const lastItemCarouselActive = carousel.querySelector("li.active");
  lastItemCarouselActive.classList.remove("active");
  carouselList[activeIndex].classList.add("active");

  const circleActive = circles.querySelector("li.active");
  const circleNext = circleList[index];
  circleActive.classList.remove("active");
  circleNext.classList.add("active");

  progressOccupy.style.width = `${(index + 1) / carouselList.length * 100}%`;
  progressFront.innerText = index + 1;
  if (index === carouselList.length - 1) {
    progressFront.style.opacity = "0";
    progressFront.style.visibility = "hidden";
    progressTail.firstElementChild.style.transform = "translateX(-232px)";
    progressTail.lastElementChild.style.opacity = "1";
    progressTail.lastElementChild.style.visibility = "visible";
  } else {
    progressFront.innerText = index + 1;
    progressFront.style.opacity = "1";
    progressFront.style.visibility = "visible";
    progressTail.firstElementChild.style.transform = "translateX(0)";
    progressTail.lastElementChild.style.opacity = "0";
    progressTail.lastElementChild.style.visibility = "hidden";
  }

  btnNext.style.backgroundColor = checkNext() ? "#4d4d4d4d" : "#000000";

}

const resetCircleState = () => {
  circleList.forEach((e, i) => {
    const circle = e.querySelector(".circle");
    const text = e.querySelector(".circle-text");
    if (i === index) {
      circle.style.opacity = "1";
      circle.style.visibility = "visible";
      circle.style.scale = "1";

      text.style.opacity = "1";
      text.style.visibility = "visible";
      text.style.rotate = "0deg";
    } else {
      circle.style.opacity = "1";
      circle.style.visibility = "visible";
      circle.style.scale = "0";

      text.style.opacity = "0";
      text.style.visibility = "hidden";
      text.style.rotate = "75deg";
    }
  });
}

btnPrevious.addEventListener("click", () => {
  index + 1 > itemListLength ? index = 0 : index++;
  if (index !== 0) {
    const circleItemActive = circles.querySelector("li.active");
    const circleItemNext = circleList[index];

    const circleActive = circleItemActive.querySelector(".circle");
    const textActive = circleItemActive.querySelector(".circle-text");
    const circleNext = circleItemNext.querySelector(".circle");
    const textNext = circleItemNext.querySelector(".circle-text");

    circleActive.style.opacity = "0";
    circleActive.style.visibility = "hidden";
    textActive.style.opacity = "0";
    textActive.style.visibility = "hidden";
    textActive.style.rotate = "-75deg";

    circleNext.style.scale = "1";
    textNext.style.opacity = "1";
    textNext.style.visibility = "visible";
    textNext.style.rotate = "0deg";
  } else resetCircleState();

  rerenderCarousel();
});

btnNext.addEventListener("click", () => {
  if (index > 0) {
    index--;

    const circleItemActive = circles.querySelector("li.active");
    const circleItemPrev = circleList[index];

    const circleActive = circleItemActive.querySelector(".circle");
    const textActive = circleItemActive.querySelector(".circle-text");
    const circlePrev = circleItemPrev.querySelector(".circle");
    const textPrev = circleItemPrev.querySelector(".circle-text");

    circleActive.style.scale = "0";
    textActive.style.opacity = "0";
    textActive.style.visibility = "hidden";
    textActive.style.rotate = "75deg";

    circlePrev.style.scale = "1";
    circlePrev.style.opacity = "1";
    circlePrev.style.visibility = "visible";
    textPrev.style.opacity = "1";
    textPrev.style.visibility = "visible";
    textPrev.style.rotate = "0deg";

    rerenderCarousel();
  } else {
    resetCircleState();
    btnNext.style.backgroundColor = "#4d4d4d4d";
  }
});

// btnPrevious.addEventListener("click", () => {
//   active + 1 > itemListLength ? active = 0 : active++;
//   rerenderCarousel();
//   const nextItem = itemActived.nextElementSibling || circleList.firstElementChild;
//   // if (nextItem != circleList.firstElementChild) {
//   const nextCircle = nextItem.querySelector(".circle");
//   const nextText = nextItem.querySelector(".circle-text");

//   progressOccupy.style.width = `${nextItem.dataset.key / 6 * 100}%`
//   progressFront.innerText = nextItem.dataset.key;
//   // carousel.style.transform = `translateX(calc((1028px + 200px) * ${nextItem.dataset.key - 1}))`
//   // if (nextItem.dataset.key == 6) {
//   //   progressFront.style.opacity = "0";
//   //   progressFront.style.visibility = "hidden";
//   //   progressTail.firstElementChild.style.transform = "translateX(-232px)";
//   //   progressTail.lastElementChild.style.opacity = "1";
//   //   progressTail.lastElementChild.style.visibility = "visible";
//   //   carousel.style.transform = `translateX(0)`
//   // }



//   circleActive.style.opacity = "0";
//   circleActive.style.visibility = "hidden";
//   textActive.style.opacity = "0";
//   textActive.style.visibility = "hidden";
//   textActive.style.transform = "rotate(-75deg)";

//   nextCircle.style.transform = "scale(1)";
//   nextText.style.opacity = "1";
//   nextText.style.visibility = "visible";
//   nextText.style.transform = "rotate(0)";

//   itemActived = nextItem;
//   circleActive = nextCircle;
//   textActive = nextText;
//   // } else {

//   // }

// });

// btnNext.addEventListener("click", () => {
//   const prevItem = itemActived.previousElementSibling;
//   if (prevItem) {
//     const prevCircle = prevItem.querySelector(".circle");
//     const prevText = prevItem.querySelector(".circle-text");

//     progressOccupy.style.width = `${prevItem.dataset.key / 6 * 100}%`;
//     progressFront.innerText = prevItem.dataset.key;

//     circleActive.style.transform = "scale(0)";
//     textActive.style.opacity = "0";
//     textActive.style.visibility = "hidden";
//     textActive.style.transform = "rotate(75deg)";

//     prevCircle.style.transform = "scale(1)";
//     prevCircle.style.opacity = "1";
//     prevCircle.style.visibility = "visible";
//     prevText.style.opacity = "1";
//     prevText.style.visibility = "visible";
//     prevText.style.transform = "rotate(0)";

//     itemActived = prevItem;
//     circleActive = prevCircle;
//     textActive = prevText;
//   } else {

//   }

// });

