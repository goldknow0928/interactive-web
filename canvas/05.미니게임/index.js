import App from "./js/App.js";

const app = new App();

window.addEventListener("load", () => {
    app.resize();
    app.render();
});
