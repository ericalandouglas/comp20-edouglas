
	var infowindow = new google.maps.InfoWindow();
	var map;
	var redStations = [];
	var redBranchAshmont = [];
	var redBranchBraintree = [];
	var orangeStations = [];
	var blueStations = [];
	var markers = [];
	var myLat;
	var myLon;
	var me;
	var meMarker;
		
	function getMyLocation()
	{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				myLat = position.coords.latitude;
				myLon = position.coords.longitude;
				jqxhr = $.ajax({
						type: 'GET',
						url: "/mapper/find_closest_stations?lat=" + myLat + "&lon=" + myLon,
						success: function(data) {
							me = new google.maps.LatLng(myLat, myLon);
							closestPt = null;
							contents = "<h2>You are here</h2>";
							if (jqxhr.status == 200) {
								closest = JSON.parse(jqxhr.responseText);
								if (closest.length > 0) {
									closestPt = new google.maps.LatLng(closest[0]['station']['stop_lat'], closest[0]['station']['stop_lon']);
									contents += "<p>The closest station to you is <strong>" + closest[0]['station']['stop_name'] + "</strong> which is approximately " + closest[0]['station']['distance'] + " miles away from you.";
								}
								else {
									contents += "<p>There is no MBTA subway station within 5 miles of you.</p>";
								}
							}
							else {
								contents += "<p>Whoops, something went wrong!  Alas, cannot find closest MBTA subway station to you.</p>";
							}
							meMarker = new google.maps.Marker({position: me, title: contents});
							meMarker.setMap(map);
							map.setCenter(me, 12);
							if (closestPt != null) {
								closestLine = new google.maps.Polyline({
									path: [me, closestPt],
									strokeColor: "#000000",
									strokeOpacity: 0.5,
									strokeWeight: 15
								});
								closestLine.setMap(map);
							}
							infowindow.setContent(meMarker.title);
							infowindow.open(map, meMarker);
						}
					});
			});
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}
	
	function init()
	{
		// Middle of MBTA map
		centerMBTA = new google.maps.LatLng(42.330497742, -71.095794678);
			
		// Set up map
		myOptions = {
			zoom: 11, // The larger the zoom number, the bigger the zoom
			center: centerMBTA,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
				
		// Create the map in the "map_canvas" <div>
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 
 		// Create the markers
		tico = "images/t_icon.png";
		railico = "images/rail.png";
	
				pt = new google.maps.LatLng(42.395428, -71.142483);
				markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.39674, -71.121815);
				markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.3884, -71.119149);
				markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.373362, -71.118956);
				markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.365486, -71.103802);
				markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.36249079, -71.08617653);
				markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.361166, -71.070628);
				markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.35639457, -71.0624242);
				markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.355518, -71.060225);
				markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.352271, -71.055242);
				markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.342622, -71.056967);
				markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.330154, -71.057655);
				markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.320685, -71.052391);
				markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico}));
					redStations.push(pt);
					redBranchAshmont.push(pt);
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.275275, -71.029583);
				markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.31129, -71.053331);
				markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.300093, -71.061667);
				markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.2665139, -71.0203369);
				markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.251809, -71.005409);
				markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.29312583, -71.06573796);
				markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.233391, -71.007153);
				markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.284652, -71.064489);
				markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.2078543, -71.0011385);
				markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico}));
					redBranchBraintree.push(pt);
		
			pt = new google.maps.LatLng(42.43668, -71.071097);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Oak Grove Station", icon: tico}));
			pt = new google.maps.LatLng(42.426632, -71.07411);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Malden Center Station", icon: tico}));
			pt = new google.maps.LatLng(42.40237, -71.077082);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Wellington Station", icon: tico}));
			pt = new google.maps.LatLng(42.383975, -71.076994);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Sullivan Station", icon: tico}));
			pt = new google.maps.LatLng(42.373622, -71.069533);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Community College Station", icon: tico}));
			pt = new google.maps.LatLng(42.365577, -71.06129);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "North Station", icon: tico}));
			pt = new google.maps.LatLng(42.363021, -71.05829);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Haymarket Station", icon: tico}));
			pt = new google.maps.LatLng(42.358978, -71.057598);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "State St. Station", icon: tico}));
			pt = new google.maps.LatLng(42.355518, -71.060225);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
			pt = new google.maps.LatLng(42.352547, -71.062752);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Chinatown Station", icon: tico}));
			pt = new google.maps.LatLng(42.349662, -71.063917);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Tufts Medical Center Station", icon: tico}));
			pt = new google.maps.LatLng(42.34735, -71.075727);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Back Bay Station", icon: tico}));
			pt = new google.maps.LatLng(42.341512, -71.083423);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Massachusetts Ave. Station", icon: tico}));
			pt = new google.maps.LatLng(42.336377, -71.088961);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Ruggles Station", icon: tico}));
			pt = new google.maps.LatLng(42.331397, -71.095451);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Roxbury Crossing Station", icon: tico}));
			pt = new google.maps.LatLng(42.323132, -71.099592);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Jackson Square Station", icon: tico}));
			pt = new google.maps.LatLng(42.317062, -71.104248);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Stony Brook Station", icon: tico}));
			pt = new google.maps.LatLng(42.310525, -71.107414);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Green St. Station", icon: tico}));
			pt = new google.maps.LatLng(42.300523, -71.113686);
			orangeStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Forest Hills Station", icon: tico}));
		
			pt = new google.maps.LatLng(42.361365, -71.062037);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Bowdoin Station", icon: tico}));
			pt = new google.maps.LatLng(42.359705, -71.059215);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Government Center Station", icon: tico}));
			pt = new google.maps.LatLng(42.358978, -71.057598);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "State St. Station", icon: tico}));
			pt = new google.maps.LatLng(42.359784, -71.051652);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Aquarium Station", icon: tico}));
			pt = new google.maps.LatLng(42.36911856, -71.03952958);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Maverick Station", icon: tico}));
			pt = new google.maps.LatLng(42.374262, -71.030395);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Airport Station", icon: tico}));
			pt = new google.maps.LatLng(42.3796403, -71.02286539);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Wood Island Station", icon: tico}));
			pt = new google.maps.LatLng(42.386867, -71.004736);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Orient Heights Station", icon: tico}));
			pt = new google.maps.LatLng(42.39050067, -70.99712259);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Suffolk Downs Station", icon: tico}));
			pt = new google.maps.LatLng(42.39754234, -70.99231944);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Beachmont Station", icon: tico}));
			pt = new google.maps.LatLng(42.40784254, -70.99253321);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Revere Beach Station", icon: tico}));
			pt = new google.maps.LatLng(42.41342, -70.991648);
			blueStations.push(pt);
			markers.push(new google.maps.Marker({position: pt, title: "Wonderland Station", icon: tico}));

			pt = new google.maps.LatLng(41.727, -71.442453);
			markers.push(new google.maps.Marker({position: pt, title: "TF Green Airport", icon: railico}));
			pt = new google.maps.LatLng(41.83, -71.413332);
			markers.push(new google.maps.Marker({position: pt, title: "Providence", icon: railico}));
			pt = new google.maps.LatLng(42.091, -71.430342);
			markers.push(new google.maps.Marker({position: pt, title: "Forge Park / 495", icon: railico}));
			pt = new google.maps.LatLng(42.178, -70.7462);
			markers.push(new google.maps.Marker({position: pt, title: "Greenbush", icon: railico}));
			pt = new google.maps.LatLng(42.293, -71.235087);
			markers.push(new google.maps.Marker({position: pt, title: "Needham Heights", icon: railico}));
			pt = new google.maps.LatLng(42.656, -70.625616);
			markers.push(new google.maps.Marker({position: pt, title: "Rockport", icon: railico}));
			pt = new google.maps.LatLng(42.238, -71.132376);
			markers.push(new google.maps.Marker({position: pt, title: "Readville", icon: railico}));
			pt = new google.maps.LatLng(42.638, -71.314916);
			markers.push(new google.maps.Marker({position: pt, title: "Lowell", icon: railico}));
			pt = new google.maps.LatLng(42.262, -71.793881);
			markers.push(new google.maps.Marker({position: pt, title: "Worcester / Union Station", icon: railico}));
			pt = new google.maps.LatLng(42.582, -71.79275);
			markers.push(new google.maps.Marker({position: pt, title: "Fitchburg", icon: railico}));
			pt = new google.maps.LatLng(42.773, -71.085962);
			markers.push(new google.maps.Marker({position: pt, title: "Haverhill", icon: railico}));
			pt = new google.maps.LatLng(41.981, -70.692514);
			markers.push(new google.maps.Marker({position: pt, title: "Plymouth", icon: railico}));
			pt = new google.maps.LatLng(42.084, -71.396735);
			markers.push(new google.maps.Marker({position: pt, title: "Franklin", icon: railico}));
			pt = new google.maps.LatLng(42.769, -71.085998);
			markers.push(new google.maps.Marker({position: pt, title: "Bradford", icon: railico}));
			pt = new google.maps.LatLng(42.593, -71.280869);
			markers.push(new google.maps.Marker({position: pt, title: "North Billerica", icon: railico}));
			pt = new google.maps.LatLng(42.28, -71.238089);
			markers.push(new google.maps.Marker({position: pt, title: "Needham Center", icon: railico}));
			pt = new google.maps.LatLng(42.22, -70.7877);
			markers.push(new google.maps.Marker({position: pt, title: "North Scituate", icon: railico}));
			pt = new google.maps.LatLng(42.246, -71.684614);
			markers.push(new google.maps.Marker({position: pt, title: "Grafton", icon: railico}));
			pt = new google.maps.LatLng(42.541, -71.739402);
			markers.push(new google.maps.Marker({position: pt, title: "North Leominster", icon: railico}));
			pt = new google.maps.LatLng(41.898, -71.354621);
			markers.push(new google.maps.Marker({position: pt, title: "South Attleboro", icon: railico}));
			pt = new google.maps.LatLng(42.616, -70.668767);
			markers.push(new google.maps.Marker({position: pt, title: "Gloucester", icon: railico}));
			pt = new google.maps.LatLng(42.254, -71.11927);
			markers.push(new google.maps.Marker({position: pt, title: "Fairmount", icon: railico}));
			pt = new google.maps.LatLng(41.979, -70.720315);
			markers.push(new google.maps.Marker({position: pt, title: "Kingston", icon: railico}));
			pt = new google.maps.LatLng(42.611, -70.706456);
			markers.push(new google.maps.Marker({position: pt, title: "West Gloucester", icon: railico}));
			pt = new google.maps.LatLng(42.281, -71.085475);
			markers.push(new google.maps.Marker({position: pt, title: "Morton Street", icon: railico}));
			pt = new google.maps.LatLng(42.7, -71.159797);
			markers.push(new google.maps.Marker({position: pt, title: "Lawrence", icon: railico}));
			pt = new google.maps.LatLng(42.013, -70.820832);
			markers.push(new google.maps.Marker({position: pt, title: "Halifax", icon: railico}));
			pt = new google.maps.LatLng(42.273, -71.238007);
			markers.push(new google.maps.Marker({position: pt, title: "Needham Junction", icon: railico}));
			pt = new google.maps.LatLng(41.942, -71.284897);
			markers.push(new google.maps.Marker({position: pt, title: "Attleboro", icon: railico}));
			pt = new google.maps.LatLng(42.545, -71.648363);
			markers.push(new google.maps.Marker({position: pt, title: "Shirley", icon: railico}));
			pt = new google.maps.LatLng(42.121, -71.325217);
			markers.push(new google.maps.Marker({position: pt, title: "Norfolk", icon: railico}));
			pt = new google.maps.LatLng(42.242, -70.837);
			markers.push(new google.maps.Marker({position: pt, title: "Cohasset", icon: railico}));
			pt = new google.maps.LatLng(42.269, -71.652005);
			markers.push(new google.maps.Marker({position: pt, title: "Westborough", icon: railico}));
			pt = new google.maps.LatLng(42.033, -71.219318);
			markers.push(new google.maps.Marker({position: pt, title: "Mansfield", icon: railico}));
			pt = new google.maps.LatLng(42.574, -70.770473);
			markers.push(new google.maps.Marker({position: pt, title: "Manchester", icon: railico}));
			pt = new google.maps.LatLng(42.245, -70.8698);
			markers.push(new google.maps.Marker({position: pt, title: "Nantasket Junction", icon: railico}));
			pt = new google.maps.LatLng(42.546, -71.173569);
			markers.push(new google.maps.Marker({position: pt, title: "Wilmington", icon: railico}));
			pt = new google.maps.LatLng(42.268, -71.523621);
			markers.push(new google.maps.Marker({position: pt, title: "Southborough", icon: railico}));
			pt = new google.maps.LatLng(42.276, -71.214853);
			markers.push(new google.maps.Marker({position: pt, title: "Hersey", icon: railico}));
			pt = new google.maps.LatLng(42.043, -70.881553);
			markers.push(new google.maps.Marker({position: pt, title: "Hanson", icon: railico}));
			pt = new google.maps.LatLng(42.658, -71.144513);
			markers.push(new google.maps.Marker({position: pt, title: "Andover", icon: railico}));
			pt = new google.maps.LatLng(42.319, -71.069072);
			markers.push(new google.maps.Marker({position: pt, title: "Uphams Corner", icon: railico}));
			pt = new google.maps.LatLng(42.144, -71.259016);
			markers.push(new google.maps.Marker({position: pt, title: "Walpole", icon: railico}));
			pt = new google.maps.LatLng(42.56, -71.590117);
			markers.push(new google.maps.Marker({position: pt, title: "Ayer", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.519, -71.502643);
			markers.push(new google.maps.Marker({position: pt, title: "Littleton / Rte 495", icon: railico}));
			pt = new google.maps.LatLng(42.159, -71.236125);
			markers.push(new google.maps.Marker({position: pt, title: "Plimptonville", icon: railico}));
			pt = new google.maps.LatLng(42.262, -71.478813);
			markers.push(new google.maps.Marker({position: pt, title: "Ashland", icon: railico}));
			pt = new google.maps.LatLng(42.084, -70.923204);
			markers.push(new google.maps.Marker({position: pt, title: "Whitman", icon: railico}));
			pt = new google.maps.LatLng(42.518, -71.13865);
			markers.push(new google.maps.Marker({position: pt, title: "Anderson/ Woburn", icon: railico}));
			pt = new google.maps.LatLng(42.237, -70.9031);
			markers.push(new google.maps.Marker({position: pt, title: "West Hingham", icon: railico}));
			pt = new google.maps.LatLng(42.561, -70.812745);
			markers.push(new google.maps.Marker({position: pt, title: "Beverly Farms", icon: railico}));
			pt = new google.maps.LatLng(42.282, -71.159932);
			markers.push(new google.maps.Marker({position: pt, title: "West Roxbury", icon: railico}));
			pt = new google.maps.LatLng(42.125, -71.183213);
			markers.push(new google.maps.Marker({position: pt, title: "Sharon", icon: railico}));
			pt = new google.maps.LatLng(42.626, -71.159653);
			markers.push(new google.maps.Marker({position: pt, title: "Ballardvale", icon: railico}));
			pt = new google.maps.LatLng(42.108, -70.935296);
			markers.push(new google.maps.Marker({position: pt, title: "Abington", icon: railico}));
			pt = new google.maps.LatLng(42.462, -71.455322);
			markers.push(new google.maps.Marker({position: pt, title: "South Acton", icon: railico}));
			pt = new google.maps.LatLng(42.277, -71.416792);
			markers.push(new google.maps.Marker({position: pt, title: "Framingham", icon: railico}));
			pt = new google.maps.LatLng(42.124, -71.10309);
			markers.push(new google.maps.Marker({position: pt, title: "Stoughton", icon: railico}));
			pt = new google.maps.LatLng(42.172, -71.220704);
			markers.push(new google.maps.Marker({position: pt, title: "Windsor Gardens", icon: railico}));
			pt = new google.maps.LatLng(42.219, -70.9214);
			markers.push(new google.maps.Marker({position: pt, title: "East Weymouth", icon: railico}));
			pt = new google.maps.LatLng(42.568, -71.159724);
			markers.push(new google.maps.Marker({position: pt, title: "North Wilmington", icon: railico}));
			pt = new google.maps.LatLng(42.56, -70.824813);
			markers.push(new google.maps.Marker({position: pt, title: "Prides Crossing", icon: railico}));
			pt = new google.maps.LatLng(42.504, -71.137511);
			markers.push(new google.maps.Marker({position: pt, title: "Mishawum", icon: railico}));
			pt = new google.maps.LatLng(42.285, -71.1547);
			markers.push(new google.maps.Marker({position: pt, title: "Highland", icon: railico}));
			pt = new google.maps.LatLng(42.546, -71.173569);
			markers.push(new google.maps.Marker({position: pt, title: "Wilmington", icon: railico}));
			pt = new google.maps.LatLng(42.453, -71.137041);
			markers.push(new google.maps.Marker({position: pt, title: "Winchester Center", icon: railico}));
			pt = new google.maps.LatLng(42.157, -71.14553);
			markers.push(new google.maps.Marker({position: pt, title: "Canton Center", icon: railico}));
			pt = new google.maps.LatLng(42.221, -70.9682);
			markers.push(new google.maps.Marker({position: pt, title: "Weymouth Landing/ East Braintree", icon: railico}));
			pt = new google.maps.LatLng(42.561, -70.870035);
			markers.push(new google.maps.Marker({position: pt, title: "Montserrat", icon: railico}));
			pt = new google.maps.LatLng(42.191, -71.199748);
			markers.push(new google.maps.Marker({position: pt, title: "Norwood Central", icon: railico}));
			pt = new google.maps.LatLng(42.456, -71.392371);
			markers.push(new google.maps.Marker({position: pt, title: "West Concord", icon: railico}));
			pt = new google.maps.LatLng(42.154, -70.95249);
			markers.push(new google.maps.Marker({position: pt, title: "South Weymouth", icon: railico}));
			pt = new google.maps.LatLng(42.287, -71.14606);
			markers.push(new google.maps.Marker({position: pt, title: "Bellevue", icon: railico}));
			pt = new google.maps.LatLng(42.282, -71.390548);
			markers.push(new google.maps.Marker({position: pt, title: "West Natick", icon: railico}));
			pt = new google.maps.LatLng(42.8, -70.880262);
			markers.push(new google.maps.Marker({position: pt, title: "Newburyport", icon: railico}));
			pt = new google.maps.LatLng(42.163, -71.153374);
			markers.push(new google.maps.Marker({position: pt, title: "Canton Junction", icon: railico}));
			pt = new google.maps.LatLng(42.445, -71.140909);
			markers.push(new google.maps.Marker({position: pt, title: "Wedgemere", icon: railico}));
			pt = new google.maps.LatLng(42.287, -71.12961);
			markers.push(new google.maps.Marker({position: pt, title: "Roslindale Village", icon: railico}));
			pt = new google.maps.LatLng(42.196, -71.196784);
			markers.push(new google.maps.Marker({position: pt, title: "Norwood Depot", icon: railico}));
			pt = new google.maps.LatLng(42.518, -71.13865);
			markers.push(new google.maps.Marker({position: pt, title: "Anderson/ Woburn", icon: railico}));
			pt = new google.maps.LatLng(42.251, -71.004843);
			markers.push(new google.maps.Marker({position: pt, title: "Quincy Center", icon: railico}));
			pt = new google.maps.LatLng(42.457, -71.358051);
			markers.push(new google.maps.Marker({position: pt, title: "Concord", icon: railico}));
			pt = new google.maps.LatLng(41.878, -70.918444);
			markers.push(new google.maps.Marker({position: pt, title: "Middleboro/ Lakeville", icon: railico}));
			pt = new google.maps.LatLng(42.285, -71.347641);
			markers.push(new google.maps.Marker({position: pt, title: "Natick", icon: railico}));
			pt = new google.maps.LatLng(42.3, -71.113377);
			markers.push(new google.maps.Marker({position: pt, title: "Forest Hills", icon: railico}));
			pt = new google.maps.LatLng(42.421, -71.132468);
			markers.push(new google.maps.Marker({position: pt, title: "West Medford", icon: railico}));
			pt = new google.maps.LatLng(42.521, -71.10744);
			markers.push(new google.maps.Marker({position: pt, title: "Reading", icon: railico}));
			pt = new google.maps.LatLng(42.453, -71.137041);
			markers.push(new google.maps.Marker({position: pt, title: "Winchester Center", icon: railico}));
			pt = new google.maps.LatLng(42.296, -71.294311);
			markers.push(new google.maps.Marker({position: pt, title: "Wellesley Square", icon: railico}));
			pt = new google.maps.LatLng(42.725, -70.859436);
			markers.push(new google.maps.Marker({position: pt, title: "Rowley", icon: railico}));
			pt = new google.maps.LatLng(42.321, -71.052555);
			markers.push(new google.maps.Marker({position: pt, title: "JFK/UMASS", icon: railico}));
			pt = new google.maps.LatLng(42.21, -71.1471);
			markers.push(new google.maps.Marker({position: pt, title: "Route 128", icon: railico}));
			pt = new google.maps.LatLng(42.221, -71.183406);
			markers.push(new google.maps.Marker({position: pt, title: "Islington", icon: railico}));
			pt = new google.maps.LatLng(42.414, -71.325344);
			markers.push(new google.maps.Marker({position: pt, title: "Lincoln", icon: railico}));
			pt = new google.maps.LatLng(41.986, -70.966625);
			markers.push(new google.maps.Marker({position: pt, title: "Bridgewater", icon: railico}));
			pt = new google.maps.LatLng(42.678, -70.840024);
			markers.push(new google.maps.Marker({position: pt, title: "Ipswich", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.336, -71.090524);
			markers.push(new google.maps.Marker({position: pt, title: "Ruggles", icon: railico}));
			pt = new google.maps.LatLng(42.445, -71.140909);
			markers.push(new google.maps.Marker({position: pt, title: "Wedgemere", icon: railico}));
			pt = new google.maps.LatLng(42.502, -71.075);
			markers.push(new google.maps.Marker({position: pt, title: "Wakefield", icon: railico}));
			pt = new google.maps.LatLng(42.31, -71.276769);
			markers.push(new google.maps.Marker({position: pt, title: "Wellesley Hills", icon: railico}));
			pt = new google.maps.LatLng(42.255, -71.125022);
			markers.push(new google.maps.Marker({position: pt, title: "Hyde Park", icon: railico}));
			pt = new google.maps.LatLng(42.366, -71.061251);
			markers.push(new google.maps.Marker({position: pt, title: "North Station", icon: railico}));
			pt = new google.maps.LatLng(42.06, -71.01246);
			markers.push(new google.maps.Marker({position: pt, title: "Campello", icon: railico}));
			pt = new google.maps.LatLng(42.396, -71.302357);
			markers.push(new google.maps.Marker({position: pt, title: "Silver Hill", icon: railico}));
			pt = new google.maps.LatLng(42.226, -71.173806);
			markers.push(new google.maps.Marker({position: pt, title: "Dedham Corp Center", icon: railico}));
			pt = new google.maps.LatLng(42.347, -71.075769);
			markers.push(new google.maps.Marker({position: pt, title: "Back Bay", icon: railico}));
			pt = new google.maps.LatLng(42.324, -71.272288);
			markers.push(new google.maps.Marker({position: pt, title: "Wellesley Farms", icon: railico}));
			pt = new google.maps.LatLng(42.086, -71.01686);
			markers.push(new google.maps.Marker({position: pt, title: "Brockton", icon: railico}));
			pt = new google.maps.LatLng(42.386, -71.289203);
			markers.push(new google.maps.Marker({position: pt, title: "Hastings", icon: railico}));
			pt = new google.maps.LatLng(42.421, -71.132468);
			markers.push(new google.maps.Marker({position: pt, title: "West Medford", icon: railico}));
			pt = new google.maps.LatLng(42.483, -71.067233);
			markers.push(new google.maps.Marker({position: pt, title: "Greenwood", icon: railico}));
			pt = new google.maps.LatLng(42.233, -71.160413);
			markers.push(new google.maps.Marker({position: pt, title: "Endicott", icon: railico}));
			pt = new google.maps.LatLng(42.336, -71.090524);
			markers.push(new google.maps.Marker({position: pt, title: "Ruggles", icon: railico}));
			pt = new google.maps.LatLng(42.611, -70.874005);
			markers.push(new google.maps.Marker({position: pt, title: "Hamilton/ Wenham", icon: railico}));
			pt = new google.maps.LatLng(42.582, -70.884501);
			markers.push(new google.maps.Marker({position: pt, title: "North Beverly", icon: railico}));
			pt = new google.maps.LatLng(42.347, -71.075769);
			markers.push(new google.maps.Marker({position: pt, title: "Back Bay", icon: railico}));
			pt = new google.maps.LatLng(42.346, -71.246658);
			markers.push(new google.maps.Marker({position: pt, title: "Auburndale", icon: railico}));
			pt = new google.maps.LatLng(42.379, -71.282411);
			markers.push(new google.maps.Marker({position: pt, title: "Kendal Green", icon: railico}));
			pt = new google.maps.LatLng(42.106, -71.021078);
			markers.push(new google.maps.Marker({position: pt, title: "Montello", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.238, -71.132376);
			markers.push(new google.maps.Marker({position: pt, title: "Readville", icon: railico}));
			pt = new google.maps.LatLng(42.469, -71.06827);
			markers.push(new google.maps.Marker({position: pt, title: "Melrose Highlands", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.362, -71.260854);
			markers.push(new google.maps.Marker({position: pt, title: "Brandeis/ Roberts", icon: railico}));
			pt = new google.maps.LatLng(42.349, -71.22901);
			markers.push(new google.maps.Marker({position: pt, title: "West Newton", icon: railico}));
			pt = new google.maps.LatLng(42.255, -71.125022);
			markers.push(new google.maps.Marker({position: pt, title: "Hyde Park", icon: railico}));
			pt = new google.maps.LatLng(42.254, -71.11927);
			markers.push(new google.maps.Marker({position: pt, title: "Fairmount", icon: railico}));
			pt = new google.maps.LatLng(42.459, -71.069448);
			markers.push(new google.maps.Marker({position: pt, title: "Melrose Cedar Park", icon: railico}));
			pt = new google.maps.LatLng(42.155, -71.027518);
			markers.push(new google.maps.Marker({position: pt, title: "Holbrook/ Randolph", icon: railico}));
			pt = new google.maps.LatLng(42.547, -70.885168);
			markers.push(new google.maps.Marker({position: pt, title: "Beverly", icon: railico}));
			pt = new google.maps.LatLng(42.336, -71.090524);
			markers.push(new google.maps.Marker({position: pt, title: "Ruggles", icon: railico}));
			pt = new google.maps.LatLng(42.452, -71.069518);
			markers.push(new google.maps.Marker({position: pt, title: "Wyoming Hill", icon: railico}));
			pt = new google.maps.LatLng(42.374, -71.236595);
			markers.push(new google.maps.Marker({position: pt, title: "Waltham", icon: railico}));
			pt = new google.maps.LatLng(42.524, -70.898903);
			markers.push(new google.maps.Marker({position: pt, title: "Salem", icon: railico}));
			pt = new google.maps.LatLng(42.281, -71.085475);
			markers.push(new google.maps.Marker({position: pt, title: "Morton Street", icon: railico}));
			pt = new google.maps.LatLng(42.352, -71.207338);
			markers.push(new google.maps.Marker({position: pt, title: "Newtonville", icon: railico}));
			pt = new google.maps.LatLng(42.209, -71.00085);
			markers.push(new google.maps.Marker({position: pt, title: "Braintree", icon: railico}));
			pt = new google.maps.LatLng(42.209, -71.00085);
			markers.push(new google.maps.Marker({position: pt, title: "Braintree", icon: railico}));
			pt = new google.maps.LatLng(42.251, -71.004843);
			markers.push(new google.maps.Marker({position: pt, title: "Quincy Center", icon: railico}));
			pt = new google.maps.LatLng(42.347, -71.098937);
			markers.push(new google.maps.Marker({position: pt, title: "Yawkey", icon: railico}));
			pt = new google.maps.LatLng(42.251, -71.004843);
			markers.push(new google.maps.Marker({position: pt, title: "Quincy Center", icon: railico}));
			pt = new google.maps.LatLng(42.426, -71.074227);
			markers.push(new google.maps.Marker({position: pt, title: "Malden Center", icon: railico}));
			pt = new google.maps.LatLng(42.474, -70.922036);
			markers.push(new google.maps.Marker({position: pt, title: "Swampscott", icon: railico}));
			pt = new google.maps.LatLng(42.387, -71.189864);
			markers.push(new google.maps.Marker({position: pt, title: "Waverley", icon: railico}));
			pt = new google.maps.LatLng(42.347, -71.075769);
			markers.push(new google.maps.Marker({position: pt, title: "Back Bay", icon: railico}));
			pt = new google.maps.LatLng(42.319, -71.069072);
			markers.push(new google.maps.Marker({position: pt, title: "Uphams Corner", icon: railico}));
			pt = new google.maps.LatLng(42.321, -71.052555);
			markers.push(new google.maps.Marker({position: pt, title: "JFK/UMASS", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.398, -71.174499);
			markers.push(new google.maps.Marker({position: pt, title: "Belmont", icon: railico}));
			pt = new google.maps.LatLng(42.347, -71.075769);
			markers.push(new google.maps.Marker({position: pt, title: "Back Bay", icon: railico}));
			pt = new google.maps.LatLng(42.462, -70.947794);
			markers.push(new google.maps.Marker({position: pt, title: "Lynn", icon: railico}));
			pt = new google.maps.LatLng(42.366, -71.061251);
			markers.push(new google.maps.Marker({position: pt, title: "North Station", icon: railico}));
			pt = new google.maps.LatLng(42.321, -71.052555);
			markers.push(new google.maps.Marker({position: pt, title: "JFK/UMASS", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.454, -70.975698);
			markers.push(new google.maps.Marker({position: pt, title: "River Works", icon: railico}));
			pt = new google.maps.LatLng(42.353, -71.055364);
			markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: railico}));
			pt = new google.maps.LatLng(42.388, -71.119159);
			markers.push(new google.maps.Marker({position: pt, title: "Porter Square", icon: railico}));
			pt = new google.maps.LatLng(42.366, -71.061251);
			markers.push(new google.maps.Marker({position: pt, title: "North Station", icon: railico}));
			pt = new google.maps.LatLng(42.396, -71.034826);
			markers.push(new google.maps.Marker({position: pt, title: "Chelsea", icon: railico}));
			pt = new google.maps.LatLng(42.366, -71.061251);
			markers.push(new google.maps.Marker({position: pt, title: "North Station", icon: railico}));
				
		// Render markers to map
		for (var m in markers) {
			markers[m].setMap(map);
			google.maps.event.addListener(markers[m], 'click', function() {
				stopName = this.title;
				mvcObj = this;
				jqxhr = $.ajax({
						type: 'GET',
						url: "/mapper/station_schedule_all.json?stop_name=" + stopName,
						success: function(data) {
							content = "<strong>" + stopName + "</strong>";
							results = JSON.parse(jqxhr.responseText);
							if (results.length > 0) {
								content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
								$.each(results, function() {
									content += '<tr><td>' + this['line'] + '</td><td>' + this['trip'] + '</td><td>' + this['direction'] + '</td><td>' + this['time_remaining'] + '</td></tr>';
								});
								content += '</table>';
							}
							else {
								content += "<p>No schedule of upcoming trains for this station.</p>";
							}
							infowindow.setContent(content);
							
							infowindow.open(map, mvcObj);
						}
					});
			});
		}
			
		// Render polylines (Red, Orange, and Blue)
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
		orangeLine = new google.maps.Polyline({
			path: orangeStations,
			strokeColor: "#FF6600",
			strokeOpacity: 1.0,
			strokeWeight: 10
		});
		orangeLine.setMap(map);
		blueLine = new google.maps.Polyline({
			path: blueStations,
			strokeColor: "#0000FF",
			strokeOpacity: 1.0,
			strokeWeight: 10
		});
		blueLine.setMap(map);
		getMyLocation();
	}

