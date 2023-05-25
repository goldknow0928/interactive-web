/**
 * 각 이벤트 처리기를 개별적인 함수로 분리하여 코드를 보다 모듈화하고 가독성을 향상시킴
 * 이벤트 퍼리기에서 필요한 요소들의 좌표 계산을 담당하는 함수를 추가하여 코드 중복을 줄임
 * preloaderBtn 관련 이벤트 처리에서 콜백 함수를 별도로 분리하여 재사용성을 높임
 * 함수와 이벤트 이름을 더 명확하게 표현하도록 변경
 */

//변수
const cursor = document.querySelector(".cursor"),
    header = document.querySelector(".header"),
    preloader = document.querySelector(".preloader"),
    preloaderBtn = document.querySelector(".preloader__btn"),
    preloaderBtnHold = document.querySelector(".preloader__btn_hold"),
    poster = document.querySelector(".poster"),
    posterParallax = document.querySelector(".poster__parallax"),
    preloaderHideThreshold = 18; //scale 최대값

let intervalId = null,
    scale = 1;

//cursor 이벤트 처리
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("click", handleMouseClick);

function handleMouseMove(e) {
    moveCursor(e.clientX, e.clientY);
}

function moveCursor(x, y) {
    const cursorDefaultInner = document.querySelector(".cursor__default__inner");
    const cursorTraceInner = document.querySelector(".cursor__trace__inner");

    cursorDefaultInner.style.top = `${y}px`;
    cursorDefaultInner.style.left = `${x}px`;

    cursorTraceInner.style.top = `${y}px`;
    cursorTraceInner.style.left = `${x}px`;
}

function handleMouseDown() {
    cursor.classList.add("cursor--active");
}

function handleMouseUp() {
    cursor.classList.remove("cursor--active");
}

function handleMouseClick(e) {
    createRipple(e.clientX, e.clientY);
}

function createRipple(x, y) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    cursor.appendChild(ripple);

    ripple.style.top = `${y - ripple.clientHeight / 2}px`;
    ripple.style.left = `${x - ripple.clientWidth / 2}px`;

    ripple.addEventListener("animationend", (e) => {
        cursor.removeChild(ripple);
    });
}

//Hold scale 이벤트 처리
preloaderBtn.addEventListener("mousedown", handlePreloaderBtnMouseDown);
preloaderBtn.addEventListener("mouseup", handlePreloaderBtnMouseUp);

function handlePreloaderBtnMouseDown() {
    intervalId = setInterval(increseScale, 10);
}

function handlePreloaderBtnMouseUp() {
    clearInterval(intervalId);
    intervalId = setInterval(decreaseScale, 10);
}

function increseScale() {
    scale += 0.175;
    setPreloaderStyle(scale);

    if (scale >= preloaderHideThreshold) {
        showContent();
        clearInterval(intervalId);
    }
}

function decreaseScale() {
    scale -= 0.075;
    setPreloaderStyle(scale);

    //scale 음수 막기
    if (scale <= 1) {
        clearInterval(intervalId);
    }
}

function setPreloaderStyle(scale) {
    preloaderBtn.style.transform = `scale(${scale})`;
    preloaderBtnHold.style.opacity = 1 - (scale - 1) / preloaderHideThreshold;
}

function showContent() {
    preloader.classList.add("hidden-area");
    header.classList.remove("hidden-area");
    header.classList.add("shown-area");
    poster.classList.remove("hidden-area");
    poster.classList.add("shown-area");
}

// Header Parallax 이벤트 처리
header.addEventListener("mousemove", handleHeaderParallax);

function handleHeaderParallax(e) {
    const xRelativeToHeader = e.clientX / header.clientWidth;
    const yRelativeToHeader = e.clientY / header.clientHeight;

    moveHeaderElements(xRelativeToHeader, yRelativeToHeader);
}

function moveHeaderElements(x, y) {
    document.querySelector(".header__title").style.transform = `translate(${x * -50}px, ${y * -50}px)`;
    document.querySelector("#circle-1").style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    document.querySelector("#circle-2").style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    document.querySelector("#cube__image_1").style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    document.querySelector("#cube__image_2").style.transform = `translate(${x * 20}px, ${y * -20}px)`;
    document.querySelector("#cube__image_3").style.transform = `translate(${x * -15}px, ${y * 15}px)`;
    document.querySelector("#cube__image_4").style.transform = `translate(${x * 10}px, ${y * 10}px)`;
}

// Poster Parallax 이벤트 처리
const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

document.querySelectorAll(".poster-image_wrapper").forEach((poster) => {
    observer.observe(poster);
});

posterParallax.addEventListener("mousemove", handlePosterParallax);

function handleIntersection(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("poster-image_state_visible");
        }
    });
}

function handlePosterParallax(e) {
    const xRelativeToPoster = e.clientX / posterParallax.clientWidth;
    const yRelativeToPoster = e.clientY / posterParallax.clientHeight;

    movePosterElements(xRelativeToPoster, yRelativeToPoster);
}

function movePosterElements(x, y) {
    document.querySelector("#poster-image_wrapper_2").style.transform = `translate(${x * -40}px, ${y * -40}px)`;
    document.querySelector("#poster-image_wrapper_3").style.transform = `translate(${x * 30}px, ${y * 30}px)`;
}
