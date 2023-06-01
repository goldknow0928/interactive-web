const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio; //2)

const canvasWidth = 300; //1)
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

//4)
class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); //3)
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
    window.requestAnimationFrame(animate); //6)
    now = Date.now();
    delta = now - then;

    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight); //5)
    //x를 1px씩 이동시키기


    particle.draw();

    then = now - (delta % interval);
}

animate();

/**
 * 1)
 * canvas 사이즈 이해하기
 * 1.css로 정의하기 2. cnavas로 정의하는 방법이 있는데 둘 다 써야 한다.
 * canvas css 스타일과 고유의 스타일을 똑같이 맞춰서 작업 한다.
 *
 * 2)
 * Device-pixel-ratio(dpr): 하나의 css픽셀을 그릴 때 사용되는 장치의 픽셀 수
 * 1px 을 실제로 그리는데 몇 px을 쓰는지 알 수 있다.
 * dpr이 높을수록 선명한 그래픽을 보여줄 수 있다.
 *
 * 3)
 * degree가 아닌 radian을 사용하기 때문에 지름 / 180 * 360이라고 적어야 한다.
 * 각도 1도는 파이 3.14를 180으로 나눈 값과 같기 때문에 라디안을 단위로 쓰는 것에 각도를 쓰기 위해서는 이렇게 써야 한다.
 *
 * 4)
 * Particle 클래스를 통해서 여러개의 원을 생성시켜주고 싶은데, 각각 다른 위치에 생성시켜주기 위해서는
 * Particle 클래스의 constructor 안에서 정의된 x와 y값을 밖에서 각각 다르게 설정을 해주고 인스텃르를 생성해주게 되면
 * 각각 다른 x와 y좌표를 가진 인스턴스를 만들 수 있다.
 *
 * 5)
 * 매 프레임마다 전체화면을 지우고 다음 프레임에서 Particle을 draw한다.
 *
 * 6)
 * requestAnimationFrame: 1초에 모니터 주사율에 맞춰서 실행된다.
 * 모니터 주사율에 따라 애니메이션이 달라진다.
 * FPS를 적용한다.
 * 👉 내 모니터 주사율: 60hz = 1초에 60번 실행 = 약 16ms 마다 requestAnimationFrame 이 실행된다.
 * 👉 내 애니메이션의 목표 fps = 10 = 1초에 10번 프레임을 찍어라 = 100ms마다 requestAnimationFrame 을 실행시킨다.
 * if(delta > interval) 애니메이션 동작!
 * then = now - (delta % interval)
 */
