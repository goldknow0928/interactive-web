import { randomNumBetween } from "./utils.js";

export default class Particle {

    // 생성자
    // 파티클의 초기 속성을 설정한다. 반지름, 각도, 불투명도 등의 초기 값을 설정한다.
    constructor() {
        this.rFriction = randomNumBetween(0.95, 1.01); // 반지름의 마찰력
        this.rAlpha = randomNumBetween(0, 5); // 반지름의 가속도
        this.r = innerHeight / 4; // 반지름 초기값

        this.angleFriction = randomNumBetween(0.97, 0.99); // 각도의 마찰력
        this.angleAlpha = randomNumBetween(1, 2); // 각도의 가속도
        this.angle = randomNumBetween(0, 360); // 초기 각도

        this.opacity = randomNumBetween(0.2, 1); // 초기 불투명도
    }

    // 업데이트
    // 반지름과 각도의 가속도와 마찰력을 계산하여 파티클의 위치를 업데이트한다. 또한 불투명도를 줄여 파티클이 점점 사라지게 한다.
    update() {
        this.rAlpha *= this.rFriction; // 반지름 가속도 업데이트
        this.r += this.rAlpha; // 반지름 업데이트

        this.angleAlpha *= this.angleFriction; // 각도 가속도 업데이트
        this.angle += this.angleAlpha; // 각도 업데이트

        //x, y를 실시간으로 적용
        this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
        this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

        this.opacity -= 0.003; // 불투명도 감소
    }

    // 그리기
    // 파티클을 캔버스에 그린다.
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2); // 파티클 그리기
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // 파티클 색상 설정
        ctx.fill();
        ctx.closePath();
    }
}
