jQuery(document).ready(function() {
	jQuery("#mapsvg").mapSvg({
		markerLastID: 7,
		disableAll: true,
		width: 593.3779761904764,
		height: 318.2870370370371,
		colors: {
			baseDefault: "#000000",
			selected: 40,
			hover: 20,
			directory: "#fafafa",
			status: {},
			base: "#eef1f7",
			stroke: "#1a5694"
		},
		viewBox: [477, 421, 593.3779761904764, 318.2870370370371],
		tooltips: {
			mode: "off",
			on: false,
			priority: "local",
			position: "left"
		},
		popovers: {
			mode: "off",
			on: false,
			priority: "local",
			position: "top",
			centerOn: true,
			width: 230,
			maxWidth: 50,
			maxHeight: 120,
			resetViewboxOnClose: true,
			mobileFullscreen: "1"
		},
		menuMarkers: {
			on: true,
			containerId: "mapsvg-menu-markers",
			template: function(marker) {
				return '<li><a href="#' + marker.id + '">' + marker.tooltip + '<br />' + marker.id + '</a></li>'
			}
		},
		source: "assets/img/map-svg/usa.svg",
		title: "Site Location Map",
		markers: [{
			id: "Seattle, WA",
			attached: true,
			isLink: false,
			tooltip: "VA Puget Sound Health Care System",
			popover: "<h4 class=\"text-primary margin-top-0\">VA Puget Sound Health Care System</h4>\nSeattle, WA",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 529.6547009588819,
			y: 464.3699853100326,
			geoCoords: [47.097613, -121.665638]
		}, {
			id: "Milwaukee, WI",
			attached: true,
			isLink: false,
			tooltip: "VISN 12 - VA Great Lakes Health Care System",
			popover: "<h4 class=\"text-primary margin-top-0\">VISN 12 - VA Great Lakes Health Care System</h4>\nMilwaukee, WI",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 846.9330272495802,
			y: 520.3999876124325,
			geoCoords: [43.055451, -88.274082]
		}, {
			id: "Cleveland, OH",
			attached: true,
			isLink: false,
			tooltip: "VA Northeast Ohio Healthcare System",
			popover: "<h4 class=\"text-primary margin-top-0\">VA Northeast Ohio Healthcare System</h4>\nCleveland, OH",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 531.079158159529,
			y: 467.79354457778527,
			geoCoords: [41.01301, -81.713583]
		}, {
			id: "Pittsburgh, PA",
			attached: true,
			isLink: false,
			tooltip: "VA Pittsburgh Healthcare System",
			popover: "<h4 class=\"text-primary margin-top-0\">VA Pittsburgh Healthcare System</h4>\nPittsburgh, PA",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 927.2651992253102,
			y: 556.8532421224277,
			geoCoords: [40.580701, -79.744596]
		}, {
			id: "Richmond, VA",
			attached: true,
			isLink: false,
			tooltip: "Central Virginia VA Health Care System",
			popover: "<h4 class=\"text-primary margin-top-0\">Central Virginia VA Health Care System</h4>\nRichmond, VA ",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 940.7664045993826,
			y: 592.6314363637191,
			geoCoords: [37.633674, -78.311069]
		}, {
			id: "Charleston, SC",
			attached: true,
			isLink: false,
			tooltip: "Ralph H. Johnson VA Medical Center",
			popover: "<h4 class=\"text-primary margin-top-0\">Ralph H. Johnson VA Medical Center</h4>\nCharleston, SC",
			data: {},
			src: "assets/img/map-svg/default-pin.svg",
			width: 26,
			height: 30,
			x: 922.5397794870095,
			y: 643.2611973368126,
			geoCoords: [33.256342, -79.94633]
		}],
		responsive: true
	});

    // $('#mapsvg').css('background','');
});