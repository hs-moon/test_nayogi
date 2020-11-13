import {Visual} from './visual.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        var params = this.getUrlParams();
        this.id = params.id;
        this.visual = new Visual(this.id);
        console.log(this.id);

    }

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.canvas.style.width = this.stageWidth + 'px';
        this.canvas.style.height = this.stageHeight + 'px';
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 4;

        this.visual.show(this.stageWidth, this.stageHeight);
    }

    

}

window.onload = () => {
    new App();
};