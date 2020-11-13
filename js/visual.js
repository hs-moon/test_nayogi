import {Text} from './text.js';
import {BounceString} from './bouncestrings.js';
import { distance } from './utils.js';
import { MouseTrack } from './mouseTrack.js';
import { Bar } from './bar.js';

export class Visual {
    constructor(id) {
        this.id = id;
        this.text = new Text();
        this.strings = [];
        this.mousePoints = [];
        this.fontWidth = 200;
        this.fontSize = this.fontWidth * 8 / 7;
        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        this.mapLatLng;

        var content = document.createElement('div');
        content.className = 'overlay_info';

        this.img = document.createElement('img'); 
        this.img.id = 'overlayImg';
        this.img.src = '../img/CarTopView.svg';
        this.img.width = '60';
        this.img.height = '40';
         
        if (id == '1') {
            this.startPosition = new kakao.maps.LatLng(37.450701, 126.570667);
        } else if (id == '2') {
            this.startPosition = new kakao.maps.LatLng(35.450701, 126.570667);
        } else {
            this.startPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        }
        var carPosition = this.startPosition;

        content.appendChild(this.img)

        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: this.startPosition, //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        this.linePath = [];
        this.linePath.push(this.startPosition);

        var imageSrc = '../img/CarTopView.svg';
        var imageSize = new kakao.maps.Size(64, 40);
        var imageOption = {offset: new kakao.maps.Point(0, 0)};
        this.markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        this.markerImage.radius = 90 * Math.PI / 180;
        this.markerPosition = this.startPosition;
        this.marker = new kakao.maps.Marker({
            position: this.markerPosition, 
            image: this.markerImage // 마커이미지 설정 
        });

        this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        this.map.relayout();
        this.customOverlay = new kakao.maps.CustomOverlay({
            position: carPosition,
            content: content,
            xAnchor: 0.5,
            yAnchor: 0.5   
        });

        // this.marker.setMap(this.map); 
        this.customOverlay.setMap(this.map);

        kakao.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this));
        kakao.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this));
    }

    show(stageWidth, stageHeight) {

    }

    onMapClick(mouseEvent) {
        var latlng = mouseEvent.latLng;
        
        this.marker.setPosition(mouseEvent.latLng);
        this.linePath.push(mouseEvent.latLng);
        var polyline = new kakao.maps.Polyline({
            path: this.linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FFAE00', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        polyline.setMap(this.map);    

        this.customOverlay.setPosition(mouseEvent.latLng);
        var pathLast = this.linePath.length - 1;
        var x = this.linePath[pathLast].getLat() - this.linePath[pathLast-1].getLat();
        var y = this.linePath[pathLast].getLng() - this.linePath[pathLast-1].getLng();
        console.log(x, y);
        var direction = -Math.round(Math.atan2(x, y) * 180 / Math.PI);
        console.log(direction);

        this.img.style.transform = `rotate(${direction}deg)`;
    }

    setMapType(maptype) { 
        var roadmapControl = document.getElementById('btnRoadmap');
        var skyviewControl = document.getElementById('btnSkyview'); 
        if (maptype === 'roadmap') {
            this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
            roadmapControl.className = 'selected_btn';
            skyviewControl.className = 'btn';
        } else {
            this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
            skyviewControl.className = 'selected_btn';
            roadmapControl.className = 'btn';
        }
    }
}