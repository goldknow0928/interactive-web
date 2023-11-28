import CanvasOption from "./CanvasOption.js";

//Particle 클래스는 CanvasOption 클래스를 상속하며, 캔버스 설정과 관련된 초기화된 값들을 사용할 수 있다.
export default class Particle extends CanvasOption {
    //Particle 클래스의 생성자. 여러 파라미터를 받아서 Particle 객체를 생성한다.
    constructor(x, y, vx, vy, opacity, colorDeg) {
        //super() 를 호출하여 CanvasOption 클래스의 생성자를 실행하고 해당 설정값들을 상속한다.
        super();

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.opacity = opacity;
        this.gravity = 0.12;
        this.friction = 0.93;
        this.colorDeg = colorDeg;
    }

    //파티클의 상태를 업데이트하는 메서드
    //중력과 마찰에 따라 속도 및 위치를 조절하고, 투명도를 줄인다.
    update() {
        this.vy += this.gravity;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        this.opacity -= 0.015;
    }

    //캔버스에 파티클을 그리는 메서드
    //설정된 위치와 속성에 따라 원 모양의 파티클을 그린다.
    draw() {
        this.ctx.fillStyle = `hsla( ${this.colorDeg}, 100%, 65%, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
