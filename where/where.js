var myLat = 0;
var myLng = 0;

var infowindow = new google.maps.InfoWindow();
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 11,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;
var infowindow = new google.maps.InfoWindow();
			
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];

var closestT = Infinity;
var closestTtitle;

var myMarker;

arrivals = {
	"RALEN":[],
	"RALEN2":[],
	"RDAVN":[],
	"RDAVS":[],
	"RPORN":[],
	"RPORS":[],
	"RHARN":[],
	"RHARS":[],
	"RCENN":[],
	"RCENS":[],
	"RKENN":[],
	"RKENS":[],
	"RMGHN":[],
	"RMGHS":[],
	"RPRKN":[],
	"RPRKS":[],
	"RDTCN":[],
	"RDTCS":[],
	"RSOUN":[],
	"RSOUS":[],
	"RBRON":[],
	"RBROS":[],
	"RANDN":[],
	"RANDS":[],
	"RJFKN":[],
	"RJFKS":[],
	"RSAVN":[],
	"RSAVS":[],
	"RFIEN":[],
	"RFIES":[],
	"RSHAN":[],
	"RSHAS":[],
	"RASHS":[],
	"RASHS2":[],
	"RNQUN":[],
	"RNQUS":[],
	"RWOLN":[],
	"RWOLS":[],
	"RQUCN":[],
	"RQUCS":[],
	"RQUAN":[],
	"RQUAS":[],
	"RBRAS":[],
	"RBRAS2":[]
}
			
						
function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();		
				
}
			
function getMyLocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
			request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
        	request.send(null);
        	request.onreadystatechange = plotWC;
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{			
	plotRedLine();
		
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	
	myMarker = new google.maps.Marker({
		position: me,
		title: "I am here at " + myLat + " , " + myLng,
	});
	myMarker.setMap(map);

	google.maps.event.addListener(myMarker, 'click', function() {
		infowindow.setContent(myMarker.title + ", the nearest red line stop is " +closestTtitle+ ", "+ closestT + " miles away");
		infowindow.open(map, myMarker);
	});
	
}
	
		
function plotWC() {

	var str;
	var parsed;
	
	if (request.readyState == 4 && request.status == 200) {	
		
    	str = request.responseText;
        parsed = JSON.parse(str);
      	
        if (parsed.length >= 1) {
			if (parsed[0]['name'] == "Waldo") {
				createWaldo(parsed, 0);
			}
			else {
				createCarmen(parsed, 0);
			}
		}
		
		if (parsed.length == 2) {
			if (parsed[1]['name'] == "Waldo") {
				createWaldo(parsed, 1);
			}
			else {
				createCarmen(parsed, 1);
			}
		}
			
	}
}
	
function plotRedLine () {
	
	populateLines();

	request2.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
    request2.send(null);
    request2.onreadystatechange = function () {
    	if (request2.readyState == 4 && request2.status == 200) {
    		plotTrainMarks();
    		new google.maps.event.trigger( myMarker, 'click' );	
    	}
    }						
}
	
	
Number.prototype.toRad = 
function() {
   	return this * Math.PI / 180;
}
	
function getHaver(lat1, lat2, lon1, lon2) {

	var R = 3958.76; // km
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c;
	
}

function createWaldo(parsed, index) {

	var waldo = { 
		name : parsed[index]['name'],
		longitude : parsed[index]['loc'].longitude,
		latitude : parsed[index]['loc'].latitude
	};
				
	var waldopos = new google.maps.LatLng(waldo.latitude, waldo.longitude);
				
	var lat2 = waldo.latitude; 
	var lon2 = waldo.longitude; 
	var lat1 = myLat; 
	var lon1 = myLng; 
 
	var	d = getHaver(lat1, lat2, lon1, lon2);
				
	var waldomark = new google.maps.Marker({
		position: waldopos,
		title: waldo.name + " is at " + waldo.latitude + " , " + waldo.longitude
			   + ", " + d + " miles away",
		icon: "waldo.png"
	});
	waldomark.setMap(map);
			
	google.maps.event.addListener(waldomark, 'click', function() {
		infowindow.setContent(waldomark.title);
		infowindow.open(map, waldomark);
	});

}

function createCarmen(parsed, index) {
	var carmen = { 
		name : parsed[index]['name'],
		longitude : parsed[index]['loc'].longitude,
		latitude : parsed[index]['loc'].latitude
	};
				
	var carmenpos = new google.maps.LatLng(carmen.latitude, carmen.longitude);
				
	var lat2 = carmen.latitude; 
	var lon2 = carmen.longitude; 
	var lat1 = myLat; 
	var lon1 = myLng; 
 
	var	d = getHaver(lat1, lat2, lon1, lon2);
				
	var carmenmark = new google.maps.Marker({
		position: carmenpos,
		title: carmen.name + " is at " + carmen.latitude + " , " + carmen.longitude
			   + ", " + d + " miles away",
		icon: "carmen.png"
	});
	carmenmark.setMap(map);
			
	google.maps.event.addListener(carmenmark, 'click', function() {
		infowindow.setContent(carmenmark.title);
		infowindow.open(map, carmenmark);
	});
}

function populateLines() {

	var tico = "ticon.png";
	var pt;
				
	pt = new google.maps.LatLng(42.395428, -71.142483);
	markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon : tico, 
										 id : "RALEN", id2 : "RALEN2"}));
	redStations.push(pt);
		
	pt = new google.maps.LatLng(42.39674, -71.121815);
	markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico, 
										 id : "RDAVN", id2 : "RDAVS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.3884, -71.119149);
	markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico,
										 id : "RPORN", id2 : "RPORS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.373362, -71.118956);
	markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico,
										 id : "RHARN", id2 : "RHARS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.365486, -71.103802);
	markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico,
										 id : "RCENN", id2 : "RCENS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.36249079, -71.08617653);
	markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico,
										 id : "RKENN", id2 : "RKENS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.361166, -71.070628);
	markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico,
										 id : "RMGHN", id2 : "RMGHS"}));
	redStations.push(pt);
		
	pt = new google.maps.LatLng(42.35639457, -71.0624242);
	markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico,
										 id : "RPRKN", id2 : "RPRKS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.355518, -71.060225);
	markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico,
										 id : "RDTCN", id2 : "RDTCS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.352271, -71.055242);
	markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico,
										 id : "RSOUN", id2 : "RSOUS"}));
	redStations.push(pt);
		
	pt = new google.maps.LatLng(42.342622, -71.056967);
	markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico,
										 id : "RBRON", id2 : "RBROS"}));
	redStations.push(pt);
	
	pt = new google.maps.LatLng(42.330154, -71.057655);
	markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico,
										 id : "RANDN", id2 : "RANDS"}));
	redStations.push(pt);
				
	pt = new google.maps.LatLng(42.320685, -71.052391);
	markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico,
										 id : "RJFKN", id2 : "RJFKS"}));
	redStations.push(pt);
	redBranchAshmont.push(pt);
	redBranchBraintree.push(pt);
				
	pt = new google.maps.LatLng(42.275275, -71.029583);
	markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico,
										 id : "RNQUN", id2 : "RNQUS"}));
	redBranchBraintree.push(pt);
				
	pt = new google.maps.LatLng(42.31129, -71.053331);
	markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico,
										 id : "RSAVN", id2 : "RSAVS"}));
	redBranchAshmont.push(pt);
				
	pt = new google.maps.LatLng(42.300093, -71.061667);
	markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico,
										 id : "RFIEN", id2 : "RFIES"}));
	redBranchAshmont.push(pt);
				
	pt = new google.maps.LatLng(42.2665139, -71.0203369);
	markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico,
										 id : "RWOLN", id2 : "RWOLS"}));
	redBranchBraintree.push(pt);
				
	pt = new google.maps.LatLng(42.251809, -71.005409);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico,
										 id : "RQUCN", id2 : "RQUCS"}));
	redBranchBraintree.push(pt);
				
	pt = new google.maps.LatLng(42.29312583, -71.06573796);
	markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico,
										 id : "RSHAN", id2 : "RSHAS"}));
	redBranchAshmont.push(pt);
				
	pt = new google.maps.LatLng(42.233391, -71.007153);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico,
										 id : "RQUAN", id2 : "RQUAS"}));
	redBranchBraintree.push(pt);
				
	pt = new google.maps.LatLng(42.284652, -71.064489);
	markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico,
										 id : "RASHS2", id2 : "RASHS"}));
	redBranchAshmont.push(pt);
				
	pt = new google.maps.LatLng(42.2078543, -71.0011385);
	markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico,
										 id2 : "RBRAS", id : "RBRAS2"}));
	redBranchBraintree.push(pt);
	
	redLine = new google.maps.Polyline({
		path: redStations,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLine.setMap(map);
	
	redLineAshmont = new google.maps.Polyline({
		path: redBranchAshmont,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLineAshmont.setMap(map);
	
	redLineBraintree = new google.maps.Polyline({
		path: redBranchBraintree,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLineBraintree.setMap(map);

}

function plotTrainMarks () {

	var lat1 = myLat; 
	var lon1 = myLng;
	var lon2;
	var lat2;
	var train;
	var str;
	var parsed;
	
	str = request2.responseText;
    parsed = JSON.parse(str);
    for (i = 0; i<parsed.length;i++) {
		arrivals[parsed[i]['PlatformKey']].push(parsed[i]);
	}
    
		
	for (var m in markers) {
		
		markers[m].setMap(map);
		lon2 = markers[m].position.lng(); 
		lat2 = markers[m].position.lat();
		var traindist = getHaver(lat1, lat2, lon1, lon2);
		if (traindist < closestT) {
			closestT = traindist;
			closestTtitle = markers[m].title;
		}
		
		google.maps.event.addListener(markers[m], 'click', function() {
				train = this;
				var content = train.title;
				if ((arrivals[train.id].length + arrivals[train.id2].length) > 0) {
					content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
					for (var z = 0; z<arrivals[train.id].length; z++) {
						if (arrivals[train.id][z]['TimeRemaining'].charAt(0) != '-') {
							content += '<tr><td>' + arrivals[train.id][z]['Line'] + '</td><td>' + arrivals[train.id][z]['Trip'] 
										+ '</td><td>North</td><td>' + arrivals[train.id][z]['TimeRemaining'] + 
										'</td></tr>';
						}
					}
					for (var z = 0; z<arrivals[train.id2].length; z++) {
						if (arrivals[train.id2][z]['TimeRemaining'].charAt(0) != '-') {
							content += '<tr><td>' + arrivals[train.id2][z]['Line'] + '</td><td>' + arrivals[train.id2][z]['Trip']
										+ '</td><td>South</td><td>' + arrivals[train.id2][z]['TimeRemaining'] + '</td></tr>';
						}
					}
					content += '</table>';
				}
				else {
					content += "<p>No schedule of upcoming trains for this station.</p>";
				}
				
			infowindow.setContent(content);		
			infowindow.open(map, train);
			

		});	

		
	}
	
}   
	

			
     