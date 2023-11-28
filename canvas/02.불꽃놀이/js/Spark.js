import CanvasOption from "./CanvasOption.js";

//Spark 클래스는 CanvasOption 클래스를 상속하며, 캔버스 설정과 관련된 초기화된 값들을 사용할 수 있다.
export default class Spark extends CanvasOption {
    //Spark 클래스의 생성자. 여러 파라미터를 받아서 Spark 객체를 생성한다.
    constructor(x, y, vx, vy, opacity, colorDeg) {
        //super()를 호출하여 CanvasOption 클래스의 생성자를 실행하고 해당 설정값들을 상속한다.
        super();

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.opacity = opacity;
        this.colorDeg = colorDeg;
    }

    //스파크의 상태를 업데이트
    //투명도를 감소시키고 위치를 이동시킨다.
    update() {
        this.opacity -= 0.01;

        this.x += this.vx;
        this.y += this.vy;
    }

    //캔버스에 스파크를 그리는 메서드
    //설정된 위치와 속성에 따라 작은 원 형태의 스파크를 그린다.
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla( ${this.colorDeg}, 100%, 65%, ${this.opacity})`;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
