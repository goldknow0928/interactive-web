import Background from "./Background.js";

export default class App {
    static canvas = document.querySelector("canvas");
    static ctx = App.canvas.getContext("2d");
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;
    static width = 1024;
    static height = 768;

    constructor() {
        //이미지 불러오기
        this.backgrounds = [
            new Background({ img: document.querySelector("#bg1-img"), speed: -1 }),
            new Background({ img: document.querySelector("#bg2-img"), speed: -3 }),
            new Background({ img: document.querySelector("#bg3-img"), speed: -5 }),
        ];

        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
        App.canvas.style.width = width + "px";
        App.canvas.style.height = width * (3 / 4) + "px";
    }

    render() {
        let now, delta;
        let then = Date.now();
        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now;
            delta = now - delta;

            if (delta < App.interval) return;

            App.ctx.clearRect(0, 0, App.width, App.height);
            App.ctx.fillRect(50, 50, 100, 100);

            //이미지
            this.backgrounds.forEach((background) => {
                background.update();
                background.draw();
            });

            then = now - (delta % App.interval);
        };

        requestAnimationFrame(frame);
    }
}
