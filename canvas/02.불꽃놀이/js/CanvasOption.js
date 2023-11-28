//CanvasOption 클래스를 정의한다.
//이 클래스는 캔버스 관련 설정을 가지고 있으며, 기본적인 캔버스 요소, 컨텍스트, 장치 픽셀 비율 등을 초기화한다.
export default class CanvasOption {
    constructor() {
        this.canvas = document.querySelector("canvas"); //HTML 문서 내의 첫번째 캔버스 요소를 가져온다.
        this.ctx = this.canvas.getContext("2d"); //가져온 캔버스 요소에서 2D 렌더링 컨텍스트를 가져온다.
        this.dpr = window.devicePixelRatio; //장치의 픽셀 비율을 가져온다.
        this.fps = 60; //초당 프레임 수를 설정한다.
        this.interval = 1000 / this.fps; //초당 프레임 수를 기반으로 프레임 간 간격을 계산한다.
        this.canvasWidth = innerWidth; //현재 창의 너비를 가져온다.
        this.canvasHeight = innerHeight; //현재 창의 높이를 가져온다.
        this.bgColor = "#000"; //기본 배경 색상을 #000으로 설정한다.
    }
}
