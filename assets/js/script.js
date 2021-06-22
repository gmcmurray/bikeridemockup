var idd = [];
var info = [];
var data1;
var city = $('#citty').val();
var radius = parseInt($('#Searchrad').val());
var maxdist = parseInt($('#Maxdist').val());;
var mindist = parseInt($('#Mindist').val());;
var lon;
var lat;
var idt = 0;
var modal = $("#myModal");
var span = document.getElementsByClassName("close")[0];

let regpat = /[#,/]/;

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

function checkinputs() {
	return;
}

function gettrails(lon, lat) {
	fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=${lon}&lat=${lat}&radius=${radius}`, {
		method: "GET",
		headers: {
			"x-rapidapi-key": "26fb7b9ca9msh320f5ca6a5c631fp101b80jsne47c90687604",
			"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
		}
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			data1 = data.data;
			console.log(data.data)
			trailprocessing(data, maxdist, mindist)
			return (data1)
		})
		.catch(err => {
			console.error(err);
		});

	function FilterandSort(data){
		for (var x = 0; x < data.data.length; x++) {
			info[x] = [parseFloat(data.data[x].length), data.data[x].name.split(regpat)[0], data.data[x].id, data.data[x].url, data.data[x].city]
		}
		// console.log(info)
		// Sort trail list in descending order
		info.sort(function (a, b) {
			return b[0] - a[0];
		});
	return info;
	}


	function trailprocessing(data, maxdist, mindist) {
		FilterandSort(data);
		console.log(info.length)
		console.log("info", info)
		console.log("first", info[0][0], mindist, maxdist, "last", info[info.length - 1][0])
		// Flag error through modal if trail distance requirements aren't met
		// var end= info.length-1;
		console.log(maxdist, info[info.length - 1][0])
		if (mindist > info[0][0] || maxdist < info[info.length - 1][0]) {
			modal.style.display = "block";
			return;
		}

		for (let t = 0; t < info.length; t++) {
			console.log(info[t][0] < maxdist)
			if (info[t][0] > mindist && info[t][0] < maxdist) {
				$('#CityTrails').append(`<li>${info[t][1]}, Distance=${info[t][0]} miles,City=${info[t][4]} <button id= "${t}" onclick="NewTab(${t})">
			open url
		</button> </li> `);
			}
		}
		return

	}

	function NewTab(x) {
		window.open(info[x][3], "blank")
	};

	// Modal information
	span.onclick = function () {
		modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}


	$('#subapp').click(function (event) {
		console.log($('#citty').val());
		maxdist = parseFloat($('#maxdist').val());
		mindist = parseFloat($('#mindist').val());
		console.log(maxdist, mindist);
		getforecastweather(city);
	});


// gettrails(lon, lat);
// gettrailinfo(idt);