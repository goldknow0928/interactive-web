import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";
import Spark from "./js/Spark.js";

class Canvas extends CanvasOption {
    //canvas 클래스와 생성자
    constructor() {
        super();

        this.tails = [];
        this.particles = [];
        this.sparks = [];

        //위와 같은 배열들은 캔버스에서 필요한 다양한 객체들의 여러 인스턴스를 보관하는 데 사용되며,
        //캔버스 내에서 각 요소들을 더 쉽게 관리하고 업데이트하며 렌더링할 수 있게 해준다.
    }

    //캔버스의 초기 설정 담당. 여기서 각 속성들을 설정하고, 파티클을 생성한다.
    init() {
        this.canvasWidth = innerWidth; //캔버스의 너비를 현재 창의 너비로 설정한다.
        this.canvasHeight = innerHeight; //캔버스의 높이를 현재 창의 높이로 설정한다.
        this.canvas.width = this.canvasWidth * this.dpr; //캔버스 요소의 너비를 현재 창의 너비에 픽셀 밀도 비율('dpr')을 곱한 값으로 설정한다.
        this.canvas.height = this.canvasHeight * this.dpr; //캔버스 요소의 높이를 현재 창의 높이에 픽셀 밀도 비율('dpr')을 곱한 값으로 설정한다.
        this.ctx.scale(this.dpr, this.dpr); //캔버스 컨텍스트에 픽셀 밀도 비율을 적용하여 화면을 더 세밀하게 그릴 수 있도록 조정한다.

        this.canvas.style.width = this.canvasWidth + "px"; //캔버스 요소의 css 스타일에서 너비를 설정한다.
        this.canvas.style.height = this.canvasHeight + "px"; //캔버스 요소의 css 스타일에서 높이를 설정한다.

        this.createParticles(); //파티클을 생성하는 createParticles() 메서드를 호출하여 캔버스에 파티클을 추가한다.
    }

    //Tail 객체를 생성하여 tails 배열에 추가하는 역할을 한다.
    createTail() {
        const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8); //새로운 tail객체의 가로 위치를 결정한다. 캔버스 너비의 20% ~ 80% 사이의 랜덤한 값을 선택한다.
        const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1; //세로 속도를 음수 값으로 설정한다. 이 값은 캔버스 높이의 1% ~ 1.5% 사이의 랜덤한 값을 사용한다.
        const colorDeg = randomNumBetween(0, 360); //색상 각도를 랜덤하게 설정한다. 0~360도 사이의 랜덤한 값을 가져온다.
        this.tails.push(new Tail(x, vy, colorDeg)); //위에서 계사된 x, vy, colorDeg를 사용하여 새로운 Tail 객체를 생성하고, 이를 tails 배열에 추가한다.
    }

    //x, y, colorDeg를 기반으로 여러 개의 파티클을 생성하여 particles 배열에 추가한다.
    createParticles(x, y, colorDeg) {
        const PARTICLE_NUM = 400; //한 번의 호출로 생성될 파티클의 수

        for (let i = 0; i < PARTICLE_NUM; i++) {
            //주어진 개수만큼 파티클을 생성하기 위해 반복문 사용
            //particle을 원형으로 변환
            const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001; //랜던 반지름 계산. 이 값은 랜덤한 값과 화면의 대각선 길이에 비례하여 결정된다.
            const angle = (Math.PI / 180) * randomNumBetween(0, 360); //랜덤한 각도를 선택하여 파티클의 이동 각도를 설정한다.

            //파티클의 이동 방향을 랜덤하게 설정한다. 반지름을 사용하여 x와 y방향의 속도를 계산한다.
            const vx = r * Math.cos(angle); //angle은 degree가 아니라 radian 값이다.
            const vy = r * Math.sin(angle);

            const opacity = randomNumBetween(0.6, 0.9); //파티클의 투명도를 랜덤하게 설정한다.
            const _colorDeg = randomNumBetween(-20, 20) + colorDeg; //파티클의 색상 각도를 주어진 기준값을 기반으로 조정한다.

            this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg)); //계산된 속도, 위치, 색상, 투명도 등을 사용하여 새로운 Particle 객체를 생성하고, 이를 particles 배열에 추가한다.
        }
    }

    //애니메이션 프레임을 렌더링하는 주요 함수이다. 여러 작업을 처리하고 화면을 업데이트 한다.
    render() {
        let now, delta;
        let then = Date.now();

        const frame = () => {
            //애니메이션 프레임을 요청하고, 그려지는 프레임마다 frame 함수를 호출한다.
            requestAnimationFrame(frame);

            now = Date.now();
            delta = now - then; //프레임 간의 시간 간격을 계산한다.
            if (delta < this.interval) return; //설정된 시간 간격(this.interval)보다 작으면 다음 프레임을 그리지 않고 이전 상태를 유지한다.

            //캔버스를 배경 색으로 채우고, 레이어를 덮는 하얀색의 사각형을 그린다.
            this.ctx.fillStyle = this.bgColor + "5";
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.fillStyle = `rgba(255,255,255, ${this.particles.length / 50000})`;
            this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasHeight);

            if (Math.random() < 0.03) this.createTail(); //조건을 충족하면 createTail 메서드를 호출하여 새로운 tail을 만든다.

            this.tails.forEach((tail, index) => {
                tail.update(); //Tail 객체의 상태를 업데이트한다.
                tail.draw(); //Tail 객체를 캔버스에 그린다.

                //해당 Tail 객체의 수직 속도(vy)를 기반으로 반복문을 실행한다.
                for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
                    //수직 속도의 음수 값에 비례하여 반복 횟수를 결정하고,
                    const vx = randomNumBetween(-5, 5) * 0.05;
                    const vy = randomNumBetween(-5, 5) * 0.05;
                    const opacity = Math.min(-tail.vy, 0.5);

                    this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg)); //각 반복마다 랜덤한 속도와 투명도로 Spark 객체를 생성하여 sparks 배열에 추가한다.
                }

                //Tail 객체의 수직 속도가 특정 임계값(-0.7)보다 크면,
                if (tail.vy > -0.7) {
                    this.tails.splice(index, 1); //해당 Tail 객체를 tails 배열에서 제거하고,
                    this.createParticles(tail.x, tail.y, tail.colorDeg); //createParticles() 메서드를 호출하여 그 위치에 새로운 파티클을 생성한다.
                }
            });

            this.particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

				//10%의 확률로
                if (Math.random() < 0.1) {
                    this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45)); //새로운 Spark 객체를 생성하여 sparks 배열에 추가한다.
                }

                if (particle.opacity < 0) this.particles.splice(index, 1); //파티클의 투명도가 일정 수준 이하인 경우, 해당 파티클을 particles 배열에서 제거한다.
            });

            this.sparks.forEach((spark, index) => {
                spark.update();
                spark.draw();

                if (spark.opacity < 0) this.sparks.splice(index, 1); //스파크의 투명도가 일정 수준 이하인 경우, 해당 스파크를 sparks 배열에서 제거한다.
            });

            then = now - (delta % this.interval); //프레임 간 시간 간격 조절
        };
		
        requestAnimationFrame(frame);
    }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
    canvas.init();
    canvas.render();
});

window.addEventListener("resize", () => {
    canvas.init();
});
