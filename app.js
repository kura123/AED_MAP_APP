const mapDiv = document.getElementById("map-canvas");

const map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(36.578268, 136.648035),//金沢駅の座標
    zoom: 15,
});

let allData = [];
let marker = [];
const markerLatLng = [];

const loadCSV = (targetFile) => {
    // XMLHttpRequestの用意
    let request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);

    // 読み込んだCSVデータ
    const csvData = request.responseText;

    // CSVの全行を取得
    const lines = csvData.split("\n");

    for (let i = 2; i < 8; i++) {
        // 1行ごとの処理

        const wordSet = lines[i].split(",");

        const wordData = {
            name: wordSet[1],
            lat: wordSet[3],
            lng: wordSet[4],
        };

        allData.push(wordData);
    }

    for (let i = 0; i < allData.length; i++) {
        markerLatLng[i] = {
            lat: parseFloat(allData[i].lat),
            lng: parseFloat(allData[i].lng)
        };
        console.log(markerLatLng[i]);
        marker[i] = new google.maps.Marker({
            position: markerLatLng[i],
            map: map,
            title: "AEDはここだよ"
        });
        //マーカーを押した時
        google.maps.event.addListener(marker[i], "click", function () {
            //リクエスト用のプロパティクラス
            var request = {
                origin: null,//出発地点のLatLngオブジェクト
                destination: null,//到着地点のLatLngオブジェクト
                travelMode: google.maps.DirectionsTravelMode.WALKING,//WALKING=徒歩
                unitSystem: google.maps.UnitSystem.METRIC
            }
            var directionsService = new google.maps.DirectionsService();
            request.origin = new google.maps.LatLng(36.578268, 136.648035);//金沢駅
            request.destination = new google.maps.LatLng(markerLatLng[i]);

            directionsDisplay = new google.maps.DirectionsRenderer();

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    currentDirections = directionsDisplay.getDirections();

                    var route = currentDirections.routes[0];
                    for (var i = 0; i < route.legs.length; i++) {
                        route.legs[i].distance.text;
                        let time = route.legs[i].duration.text;//時間
                        route.legs[i].duration.value; //秒単位の所要時間

                        alert(time);
                    }
                }
            });

        });
    }
}

loadCSV("AEDmap-Developer.csv");