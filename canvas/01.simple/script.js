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

// ctx.fillRect(10, 10, 50, 50);

ctx.beginPath();
ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360); //3)

ctx.fill();
ctx.closePath();

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
 */
