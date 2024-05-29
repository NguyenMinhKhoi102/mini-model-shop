const wrapper = document.querySelector(".wrapper");

const wrapperCircle = wrapper.querySelector(".wrapper-circles");
const wrapperCarousel = wrapper.querySelector("#carousel");
const wrapperBtnPrevious = wrapper.querySelector("#wrapper-btn-previous");
const wrapperBtnNext = wrapper.querySelector("#wrapper-btn-next");

const slider = wrapperCarousel.querySelector(".carousel-slider");

const sliderList = slider.querySelectorAll("li");
const circleList = wrapperCircle.querySelectorAll("li");

const progress = document.querySelector(".progress");

const progressFront = progress.querySelector(".progress-front");
const progressOccupy = progress.querySelector(".progress-occupy");
const progressTail = progress.querySelector(".progress-tail");

const initClones = () => {
  Array.from(sliderList).reverse().forEach((e, i) => {
    const cloneSliderNode = e.cloneNode(true);
    const cloneCircleNode = circleList[i].cloneNode(true);

    cloneSliderNode.classList = "carousel-item";
    cloneCircleNode.classList = "circle-item";

    slider.prepend(cloneSliderNode);
    wrapperCircle.appendChild(cloneCircleNode);

    const li = document.createElement("li");
    li.innerText = i + 1;
    i === 0 ? li.classList.add("active") : "";
    progressFront.appendChild(li);
  });

  const tail = document.createElement("li");
  tail.innerText = sliderList.length;
  progressTail.appendChild(tail);
  progressOccupy.style.width = `${100 / sliderList.length}%`;
}

initClones();

const sliderClone = wrapperCarousel.querySelector(".carousel-slider");
const sliderListClone = sliderClone.querySelectorAll("li");
const circleClone = wrapper.querySelector(".wrapper-circles");
const circleListClone = circleClone.querySelectorAll("li");

let index = 0;
let limited = sliderList.length;
let sliderScrollStatus = false;

const checkNext = () => {
  index === 0 ? wrapperBtnNext.classList.add("disabled") : wrapperBtnNext.classList.remove("disabled");
}

checkNext();

const resetAnimation = () => {
  // reset slider
  let sliderItems = Array.from(sliderClone.children);
  let circleItems = Array.from(circleClone.children);
  let midIndex = Math.floor(sliderItems.length / 2);
  let firstHalfSliders = sliderItems.slice(0, midIndex);
  let lastHalfSliders = sliderItems.slice(midIndex);
  let firstHalfCircles = circleItems.slice(0, midIndex);

  setTimeout(() => {
    lastHalfSliders.forEach(e => {
      sliderClone.insertBefore(e, firstHalfSliders[0]);
    });
    sliderClone.style.transition = "none";
    sliderClone.style.transform = "translateX(0)";

    firstHalfCircles.forEach(e => {
      e.style.transition = "none";
      e.classList = "circle-item";
      circleClone.appendChild(e);
    })
    index = 0;
    checkNext();
  }, 600);

  // reset progress
  progressOccupy.style.width = "0";
  progressTail.firstElementChild.classList.remove("active");
}

const rerenderCarousel = (btnType) => {
  if (btnType === "previous") {
    circleClone.children[index++].classList.add("hidden");
    circleClone.children[index].classList.add("active");
  } else if (btnType === "next" && index > 0) {
    circleClone.children[index--].classList.remove("active");
    circleClone.children[index].classList.remove("hidden");
  }

  const itemWidth = sliderList[0].offsetWidth;
  const space = 300;

  sliderClone.style.transition = "all 0.6s ease-out";
  sliderClone.style.transform = `translateX(${(itemWidth + space) * index}px)`;

  const lastItemCarouselActive = sliderClone.querySelector("li.active");

  lastItemCarouselActive.classList.remove("active");
  sliderClone.children[sliderListClone.length - index - 1].classList.add("active");

  index < limited || resetAnimation();

  checkNext();
}

const rerenderProgress = () => {
  const progressFrontList = progressFront.querySelectorAll("li");
  const lastProgressFrontActive = progressFront.querySelector("li.active");

  progressOccupy.style.width = `${(index + 1) / sliderList.length * 100}%`;
  lastProgressFrontActive.classList.remove("active");
  progressFrontList[index % sliderList.length].classList.add("active");
  index !== sliderList.length - 1 || progressTail.firstElementChild.classList.add("active");
}

const preventContiniousPressing = (button, handleBtnWrapper) => {
  if (sliderScrollStatus) return;
  sliderScrollStatus = true;
  button.removeEventListener('click', handleBtnWrapper);
  setTimeout(() => {
    sliderScrollStatus = false;
    button.addEventListener('click', handleBtnWrapper);
  }, 600);
};

const handleBtnWrapper = (btnType) => {
  switch (btnType) {
    case "previous":
      preventContiniousPressing(wrapperBtnPrevious, handlePreviousClick);
      break;
    case "next":
      preventContiniousPressing(wrapperBtnNext, handleNextClick);
      break;
    default:
      break;
  }
  rerenderCarousel(btnType);
  rerenderProgress();
};

const handlePreviousClick = () => handleBtnWrapper("previous");
const handleNextClick = () => handleBtnWrapper("next");

wrapperBtnPrevious.addEventListener("click", handlePreviousClick);
wrapperBtnNext.addEventListener("click", handleNextClick);

