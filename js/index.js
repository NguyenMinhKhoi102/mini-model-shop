const btnPrevious = document.querySelector(".wrapper-btn__previous");
const btnNext = document.querySelector(".wrapper-btn__next");

const circles = document.querySelector(".wrapper-circles");
const circleList = circles.querySelectorAll("li");
const carousel = document.querySelector(".carousel-slider");
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

let cloneNodeList = []
carouselList.forEach((e) => {
  cloneNodeList.push(e.cloneNode(true));
});

cloneNodeList.forEach((clone) => {
  carousel.insertBefore(clone, carousel.firstChild);
});

let itemListLength = carouselList.length - 1;
let index = 0;

const renderProgress = () => {
  carouselList.forEach((e, i) => {
    const li = document.createElement("li");
    li.innerText = i + 1;
    i === 0 ? li.classList.add("active") : "";
    progressFront.appendChild(li);
  });
  const tail = document.createElement("li");
  tail.innerText = carouselList.length;
  progressTail.appendChild(tail);
}

renderProgress();

const checkNext = () => {
  if (index === 0) {
    btnNext.classList.add("disabled");
  } else btnNext.classList.remove("disabled");
}

checkNext();

const rerenderCarousel = () => {
  const itemActived = itemListLength - index;
  let itemWidth = carouselList[0].offsetWidth;
  let space = 300;
  carousel.style.transform = `translateX(${(itemWidth + space) * index}px)`

  const lastItemCarouselActive = carousel.querySelector("li.active");
  lastItemCarouselActive.classList.remove("active");
  const cloneNode = lastItemCarouselActive.cloneNode(true);
  carousel.children[itemActived].classList.add("active");
  // carousel.prepend(cloneNode);


  const circleActive = circles.querySelector("li.active");
  const circleNext = circleList[index];
  circleActive.classList.remove("active");
  circleNext.classList.add("active");

  const progressFrontList = progressFront.querySelectorAll("li");
  const lastProgressFrontActive = progressFront.querySelector("li.active");
  const progressTailFirstItem = progressTail.firstElementChild;
  progressOccupy.style.width = `${(index + 1) / carouselList.length * 100}%`;
  lastProgressFrontActive.classList.remove("active");
  progressFrontList[index].classList.add("active");
  if (progressTailFirstItem.classList.contains("active")) progressTailFirstItem.classList.remove("active");
  if (index === carouselList.length - 1) progressTailFirstItem.classList.add("active");

  checkNext();
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

let direction;

btnPrevious.addEventListener("click", () => {
  direction = 1;
  carousel.style.justifyContent = "flex-start";
  carousel.style.transform = `translateX(1242px)`;
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
  direction = -1;
  carousel.style.justifyContent = "flex-end";
  carousel.style.transform = `translateX(-1242px)`;
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
  }
});

carousel.addEventListener("transitionend", () => {
  // if (index === 0) {
  //   carousel.style.transition = "none";
  //   carousel.style.transform = "translate(0)";
  //   carouselList.forEach((e) => {
  //     carousel.prepend(e);
  //   })
  //   console.log(carousel)
  //   setTimeout(() => {
  //     carousel.style.transition = "all 0.6s ease-out";
  //   }, 3000)
  // }
  // if (direction === 1)
  //   carousel.prepend(carousel.lastElementChild);
  // else if (direction === -1)
  //   carousel.appendChild(carousel.firstElementChild);
  // carousel.style.transition = "none";
  // carousel.style.transform = "translate(0)";

  // setTimeout(() => {
  //   carousel.style.transition = "all 0.6s ease-out";
  // })
})