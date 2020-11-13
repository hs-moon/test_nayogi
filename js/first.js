import {Visual} from './visual.js'

class App {
    constructor() {
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
        this.visual.show(this.stageWidth, this.stageHeight);
    }
}

window.onload = () => {
    new App();
};