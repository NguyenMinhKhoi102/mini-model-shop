const wrapper = document.querySelector(".wrapper");
const wrapperCircle = wrapper.querySelector(".wrapper-circles");
const wrapperCarousel = wrapper.querySelector("#carousel");
const wrapperBtnPrevious = wrapper.querySelector("#wrapper-btn-previous");
const wrapperBtnNext = wrapper.querySelector("#wrapper-btn-next");
const slider = wrapperCarousel.querySelector(".carousel-slider");

const progress = document.querySelector(".progress");
const progressFront = progress.querySelector(".progress-front");
const progressOccupy = progress.querySelector(".progress-occupy");
const progressTail = progress.querySelector(".progress-tail");

const limited = slider.children.length;

let index = 0;
let sliderScrollStatus = false;

const checkNext = () => {
  index === 0 ? wrapperBtnNext.classList.add("disabled") : wrapperBtnNext.classList.remove("disabled");
}

checkNext();

const initClones = () => {
  [...slider.children].reverse().forEach((e, i) => {
    const cloneSliderNode = e.cloneNode(true);
    const cloneCircleNode = wrapperCircle.children[i].cloneNode(true);

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
  tail.innerText = limited;
  progressTail.appendChild(tail);
  progressOccupy.style.width = `${100 / limited}%`;
}

initClones();

const rerenderCarousel = () => {
  const sliderItems = [...slider.children];
  const itemWidth = sliderItems[0].offsetWidth;
  const space = 300;
  const lastItemSliderActive = slider.querySelector("li.active");

  slider.style.transition = "all 0.6s cubic-bezier(0.29, 0.79, 0.53, 0.92)";
  slider.style.transform = `translateX(${(itemWidth + space) * index}px)`;
  lastItemSliderActive.classList.remove("active");
  sliderItems[sliderItems.length - index - 1].classList.add("active");

  checkNext();
}

const rerenderProgress = () => {
  const progressFrontList = progressFront.querySelectorAll("li");
  const lastProgressFrontActive = progressFront.querySelector("li.active");

  progressOccupy.style.width = `${(index + 1) / limited * 100}%`;
  lastProgressFrontActive.classList.remove("active");
  progressFrontList[index % limited].classList.add("active");
  index !== limited - 1 || progressTail.firstElementChild.classList.add("active");
}

const resetAnimation = () => {
  const sliderItems = [...slider.children];
  const circleItems = [...wrapperCircle.children];
  const lastHalfSliders = sliderItems.slice(Math.floor(sliderItems.length / 2));
  const firstHalfCircles = circleItems.slice(0, Math.floor(circleItems.length / 2));

  setTimeout(() => {
    // reset slider
    lastHalfSliders.reverse().forEach(e => {
      slider.prepend(e);
    });
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";

    // reset circle
    firstHalfCircles.forEach(e => {
      e.classList = "circle-item";
      wrapperCircle.appendChild(e);
    })
    index = 0;
    checkNext();
  }, 600);

  // reset progress
  progressOccupy.style.width = "0";
  progressTail.firstElementChild.classList.remove("active");
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
  const currentIndex = index;
  const circleItems = [...wrapperCircle.children]
  switch (btnType) {
    case "previous":
      preventContiniousPressing(wrapperBtnPrevious, handlePreviousClick);
      circleItems[index++].classList.add("hidden");
      circleItems[index].classList.add("active");
      break;
    case "next":
      preventContiniousPressing(wrapperBtnNext, handleNextClick);
      if (index > 0) {
        circleItems[index--].classList.remove("active");
        circleItems[index].classList.remove("hidden");
      }
      break;
    default:
      break;
  }
  if (index != currentIndex) {
    rerenderCarousel();
    rerenderProgress();
    index < limited || resetAnimation();
  }
};

const handlePreviousClick = () => handleBtnWrapper("previous");
const handleNextClick = () => handleBtnWrapper("next");

wrapperBtnPrevious.addEventListener("click", handlePreviousClick);
wrapperBtnNext.addEventListener("click", handleNextClick);

