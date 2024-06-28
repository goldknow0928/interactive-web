import Particle from "./js/Particle.js"; // Particle 클래스를 가져온다.

const canvas = document.querySelector("canvas"); // 캔버스 요소 선택
const ctx = canvas.getContext("2d"); // 캔버스의 2D 컨텍스트 가져오기
const dpr = window.devicePixelRatio; // 장치의 픽셀 비율
let canvasWidth = innerWidth; // 캔버스 너비
let canvasHeight = innerHeight; // 캔버스 높이
const interval = 1000 / 60; //60fps 설정
const particles = []; //파티클 배열 초기화

// 캔버스를 초기화하는 함수
// 캔버스 크기를 창 크기에 맞추고, 장치의 픽셀 비율에 맞춰 스케일을 조정한다.
function init() {
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
}

// 파티클을 생성하는 함수
// 800개의 파티클을 생성하여 'particles' 배열에 추가한다.
function createRing() {
    const PARTICLE_NUM = 800; // 생성할 파티클 수

    for (let i = 0; i < PARTICLE_NUM; i++) {
        particles.push(new Particle());
    }
}

// 애니메이션을 렌더링하는 함수
// 파티클 배열을 순회하며 각 파티클을 업데이트하고 그린다. 불투명도가 0 이하인 파티클은 배열에서 제거한다.
function render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
        requestAnimationFrame(frame); // 다음 프레임 요청
        now = Date.now();
        delta = now - then;

        if (delta < interval) return; // 원하는 프레임 속도가 아니라면 리턴
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 클리어

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update(); // 파티클 업데이트
            particles[i].draw(ctx); // 파티클 그리기

            if (particles[i].opacity < 0) particles.splice(i, 1); // 불투명도가 0이하인 파티클 제거
        }

        then = now - (delta % interval);
    };

    requestAnimationFrame(frame);
}

// 페이지가 로드되면 캔버스를 초기화하고 애니메이션을 시작한다.
window.addEventListener("load", () => {
    init();
    render();
});

// 창 크기가 변경되면 캔버스를 다시 초기화한다.
window.addEventListener("resize", init);

// 클릭 시 카운트다운 애니메이션을 실행하고, 파티클을 생성한다.
window.addEventListener("click", () => {
    const texts = document.querySelectorAll("span");

    const countDownOption = {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "Power4.easeOut"
    }

    gsap.fromTo(texts[0], {opacity: 0, scale: 5}, {
        // 스프레드 연산자
        ...countDownOption
    })
    gsap.fromTo(texts[1], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 1,
        onStart: () => texts[0].style.opacity = 0
    })
    gsap.fromTo(texts[2], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 2,
        onStart: () => texts[1].style.opacity = 0 
    })


    const ringImg = document.querySelector("#ring");

    gsap.fromTo(ringImg, {opacity: 1}, {
        opacity: 0,
        duration: 1,
        delay: 3,
        onStart: () => {
            createRing();
            texts[2].style.opacity = 0 
        }
    })
});
