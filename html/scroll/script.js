/** 리스트 */
const listItemWrapper = document.getElementById("list-item-wrapper");
const listItems = Array.from(document.querySelectorAll(".list-item"));
const STANDARD_OFFSET = 350;

function updateListItemStyle() {
    const scrollY = window.scrollY;
    const listStyleChangeStartY = listItemWrapper.offsetTop - STANDARD_OFFSET;
    const listStyleChangeEndY = listItemWrapper.offsetTop + listItemWrapper.offsetHeight - STANDARD_OFFSET;
    const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;
    const targetIndex = Math.round((scrollY - listStyleChangeStartY) / division);

    listItems.forEach((item) => {
        //모든 리스트 아이템을 반복하면서 "on" 이 있는 경우 해당 id 제거
        if (item.id === "on") {
            item.removeAttribute("id");
        }
    });

    if (listItems[targetIndex]) {
        listItems[targetIndex].id = "on"; //타겟index 에만 "on" 추가
    }
}

/** 산타 */
const panel1ImgEl = document.getElementById("panel1-img");
const flyingSantaImageEl = document.getElementById("flying-santa-image");
const SCROLL_THRESHOLD = 100;
const MAX_TRANSLATE_X = 80;
const MAX_TRANSLATE_Y = 13;
const MAX_ROTATION_DEGREE = 23;

function updateSantaStyle() {
    const scrollYBottom = window.scrollY + document.documentElement.clientHeight;
    const panelBottom = panel1ImgEl.offsetTop + panel1ImgEl.offsetHeight + SCROLL_THRESHOLD;

    if (scrollYBottom > panel1ImgEl.offsetTop && scrollYBottom < panelBottom) {
        const panelHeight = panel1ImgEl.offsetHeight + SCROLL_THRESHOLD;
        const scrollPercent = (scrollYBottom - panel1ImgEl.offsetTop) / panelHeight;
        const translateX = MAX_TRANSLATE_X - MAX_TRANSLATE_X * 1.5 * scrollPercent;
        const translateY = -MAX_TRANSLATE_Y + MAX_TRANSLATE_Y * 1.8 * scrollPercent;
        const rotationDegree = MAX_ROTATION_DEGREE - MAX_ROTATION_DEGREE * 1.7 * scrollPercent;

        flyingSantaImageEl.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
    }
}

/** 비디오 */
const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");
const fixedWrapper = document.getElementById("fixed-wrapper");
const fixedDescription = document.getElementById("fixed-description");
const VIDEO_PLAY_BACK = 500;
const fixedDescriptionAppearTiming = 3470;
const fixedDescriptionAppearEnds = 3800;

function centerElement(elementId, video) {
    const element = document.getElementById(elementId);
    const parent = element.parentElement;
    const scrollOffset = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const offsetHeight = element.offsetHeight;

    if (scrollOffset > parent.offsetTop - (clientHeight - offsetHeight) / 2) {
        element.style.position = "fixed";
        element.style.top = "50%";
        element.style.left = "50%";
        element.style.transform = "translate(-50%, -50%)";

        if (video) {
            const videoSectionOffset = videoSection.offsetTop;
            video.currentTime = (scrollOffset - videoSectionOffset) / VIDEO_PLAY_BACK;
        }
    } else {
        element.style = null;
    }
}

//비디오섹션 높이 = 비디오 재생 시간 * 높이 값
function adjustVideoSectionHeight() {
    videoSection.style.height = videoElement.duration * VIDEO_PLAY_BACK + "px";
}

//fixedDescription 등장 및 투명도 조정
function adjustFixedDescriptionAppearance() {
    const scrollOffset = window.scrollY;
    console.log(scrollOffset);

    if (scrollOffset > fixedDescriptionAppearTiming && scrollOffset < fixedDescriptionAppearEnds) {
        fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - scrollOffset}px)`;
        fixedDescription.style.opacity = (scrollOffset - fixedDescriptionAppearTiming) / 300;
    } else if (scrollOffset > fixedDescriptionAppearEnds) {
        fixedDescription.style.transform = "translateY(0px)";
        fixedDescription.style.opacity = 1;
    } else {
        fixedDescription.style.transform = "translateY(100px)";
        fixedDescription.style.opacity = 0;
    }
}

function handleVideoScroll() {
    centerElement("fixed-wrapper", videoElement);

    const scrollOffset = window.scrollY;
    const videoSectionOffset = videoSection.offsetTop;
    const videoSectionHeight = videoSection.offsetHeight;
    const fixedWrapperHeight = fixedWrapper.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollOffset > videoSectionOffset + videoSectionHeight - (fixedWrapperHeight + (clientHeight - fixedWrapperHeight) / 2)) {
        fixedWrapper.style.position = "relative";
        fixedWrapper.style.top = "initial";
        fixedWrapper.style.left = "initial";
        fixedWrapper.style.transform = `translateY(${videoSectionHeight - fixedWrapperHeight}px)`;
    }

    adjustFixedDescriptionAppearance();
}

//비디오 metadata 로드 시, videoSection 높이 조정
videoElement.addEventListener("loadedmetadata", adjustVideoSectionHeight);

function handleScroll() {
    requestAnimationFrame(updateListItemStyle); //리스트
    requestAnimationFrame(updateSantaStyle); //산타
    handleVideoScroll(); //비디오
    centerElement("bank-beyond"); //텍스트 이미지
}

window.addEventListener("scroll", handleScroll);

/** 슬라이드 */
const sliderImages = document.querySelectorAll(".slider-image");
const sliderIndex = document.getElementById("slider-index");
const sliderContentWrapper = document.getElementById("slider-content-wrapper");
let CURRENT_IMAGE_INDEX = 0;

function changeSlider(step) {
    CURRENT_IMAGE_INDEX += step;

    if (CURRENT_IMAGE_INDEX < 0) {
        CURRENT_IMAGE_INDEX = sliderImages.length - 1;
    } else if (CURRENT_IMAGE_INDEX >= sliderImages.length) {
        CURRENT_IMAGE_INDEX = 0;
    }

    sliderContentWrapper.scrollLeft = sliderImages[CURRENT_IMAGE_INDEX].offsetLeft;
}

document.getElementById("left-button").addEventListener("click", () => {
    changeSlider(-1);
});

document.getElementById("right-button").addEventListener("click", () => {
    changeSlider(1);
});

function updateSliderIndex() {
    const imageWidth = sliderImages[0].offsetWidth;
    CURRENT_IMAGE_INDEX = Math.round(sliderContentWrapper.scrollLeft / imageWidth);
    sliderIndex.innerText = `${CURRENT_IMAGE_INDEX + 1} / ${sliderImages.length}`;
}

sliderContentWrapper.addEventListener("scroll", updateSliderIndex);

function initializeSlider() {
    sliderContentWrapper.scrollLeft = sliderImages[CURRENT_IMAGE_INDEX].offsetLeft;
    updateSliderIndex();
}

initializeSlider();
