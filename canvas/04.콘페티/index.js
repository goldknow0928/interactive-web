import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1; //최대 dpr을 2로 설정
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

const particles = [];

function init() {
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
}

function confetti({ x, y, count, deg, colors }) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, deg, colors));
    }
}

function render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
        requestAnimationFrame(frame);
        now = Date.now;
        delta = now - then;

        if (delta < interval) return;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);

            //파티클 지우기
            if (particles[i].opacity < 0) particles.splice(i, 1)
        }

        then = now - (delta % interval); //어느 모니터에서든지 1초에 60fps 실행되게
    };

    requestAnimationFrame(frame); //frame을 트리거를 걸어주면 스스로 계속 실행
}

window.addEventListener("click", () => {
    confetti({
        x: 0,
        y: 0.5,
        count: 10,
        deg: -50,
        colors: ["#ff0000"]
    });
});
window.addEventListener("resize", init);
window.addEventListener("load", () => {
    init();
    render();
});
