import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

//Tail 클래스는 CanvasOption 클래스를 상속하며, 캔버스 설정과 관련된 초기화된 값들을 사용할 수 있다.
export default class Tail extends CanvasOption {
    //Tail 클래스의 생성자. 여러 파라미터를 받아서 Tail 객체를 생성한다.
    constructor(x, vy, colorDeg) {
        //super()를 호출하여 CanvasOption 클래스의 생성자를 실행하고 해당 설정값들을 상속한다.
        super();

        this.x = x;
        this.y = this.canvasHeight; //y값을 canvasHeight로 설정하여 캔버스의 가장 아래에서부터 시작한다.
        this.vy = vy;
        this.colorDeg = colorDeg;
        this.angle = randomNumBetween(0, 2); //랜덤한 각도로 초기화한다.
        this.friction = 0.985;
    }

    //Tail의 상태를 업데이트
    update() {
        this.vy *= this.friction; //수직 속도에 마찰을 적용
        this.y += this.vy; //y 위치 이동
        this.angle += 1;
        this.x += Math.cos(this.angle) * this.vy * 0.2; //x위치를 삼각함수를 이용하여 부드럽게 이동시킨다.
        this.opacity = -this.vy * 0.1;
    }

    //캔버스에 Tail을 그리는 메서드
    //설정된 위치와 속성에 따라 작은 원 형태의 Tail을 그린다.
    draw() {
        this.ctx.fillStyle = `hsla( ${this.colorDeg}, 100%, 65%, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
