import { randomNumBetween } from "./utils.js";

export default class Particle {
    constructor() {
        this.rAlpha = randomNumBetween(0, 5);
        this.r = innerHeight / 4;

        this.angleAlpha = randomNumBetween(1, 2);
        this.angle = randomNumBetween(0, 360);
    }

    update() {
        this.r += this.rAlpha;
        this.angle += this.angleAlpha;

        this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
        this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
}
