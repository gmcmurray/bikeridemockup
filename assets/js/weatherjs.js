var city;
const cityforecast = $('#forecast')
var colors = ["red", "yellow", "green", "blue", "purple"];

var getforecastweather = function (city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude&appid=6c739212e839903aab1ecb07a7173d6b`;
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            populateforecast(data, city);
            gettrails(lon,lat);
            return (console.log(data));
          });
        } else {
          alert('Error: ' + response.statusText);
          return (false);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };
  
  
  // Populates Forecast Cards, uses 5 averages of 8 points for daily number
  var populateforecast = function (data, city) {
    cityforecast.empty();
    for (let index = 1; index < 6; index++) {
      var avgwind = 0;
      var avgtemp = 0;
      var avghumidity = 0;
      var weatherdescript = data.list[(index - 1) * 8].weather[0].description
     lat=data.city.coord.lat;
     lon=data.city.coord.lon;
     console.log(lat,lon)
      // var weathericon = "./assets/Images/" + chooseiconfore(data, index - 1);
      for (var y = 0; y < 8; y++) {
        avgwind += data.list[(index - 1) * 8 + y].wind.speed / 8;
        avgtemp += data.list[(index - 1) * 8 + y].main.temp / 8;
        avghumidity += data.list[(index - 1) * 8 + y].main.humidity / 8;
      }
      avgwind = avgwind.toFixed(1);
      avghumidity = avghumidity.toFixed(1);
      avgtemp -= 273.15;
      avgtemp = avgtemp.toFixed(1);
      var date = moment().add(index, "days")
      cityforecast.append(`
      <div class="card col ${colors[index - 1]} lighten-3">
      <div class="row">
      <h5 id="cadtit" style="font-size:15px;font-weight: 900" class="card-title activator small black-text">${date.format(" ddd : MM/D/YY")}</h5>
       <ul >
          <li style="font-size:12px;font-weight: 900">${weatherdescript}</li>
          <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Temp: <span> ${avgtemp}<\span> C</li>
          <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Wind: <span> ${avgwind}<\span> mph </li>
          <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Humidity: <span>${avghumidity}<\span> %</li>
        </ul>
      </div>
    </div> 
        `)
  
    }
  }
  
  