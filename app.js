//OpenWeatherMap API
//Get data from OpenWeatherMap API

function getDataFromWeatherAPI (callback) {
	const OpenWeatherMap_URL = 'https://api.openweathermap.org/data/2.5/weather?id=524901';
	const key = '023c7f0c54ac98ec1eda11f7fc2a77b2';
	let city = $('.search-query').val();
	const query = {
		q: city,
		APPID: key,
		units: 'metric'
	};
	$.getJSON(OpenWeatherMap_URL, query, callback);
}

// Create the weather result HTML
function createWeatherHTML (result) {
	  console.log('createResultHTML', result);
// C to F: C * 9/5 +32
	return `
	<div class="weather-results">
	  	<h2>Current weather in ${result.name}</h2>
	  	 <p><span>${result.main.temp} &#8451;| ${((result.main.temp * 9/5) +32).toFixed(2)} &#8457;</span><img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png"></p>
	  	 <p class="weatherDescription">${result.weather[0].main}</p>
	  	 <p>Description: ${result.weather[0].description}</p>
	  	 <p>Humidity: ${result.main.humidity}%</p>
	  	 <p>Wind: ${result.wind.speed} mps</p>
	  	 </div>

	  	 <nav role="navigation" class="venues-nav">
	  	 	<button class="js-category-button">Food</button>
	  	 	<button class="js-category-button">Events</button>
	  	 	<button class="js-category-button">Entertainment</button>
	  	 	<button class="js-category-button">Outdoors</button>
	  	 </nav>
	`
}
//Display weather search results - a callback function
function displayWeatherResults(data) {
	const results = createWeatherHTML(data);
	console.log(results);
	$('.weather-display').html(results);
}

//event listener for a search form
function watchSubmit() {
	$('.search-form').on('submit', event => {
		console.log("Hello World");
		event.preventDefault;

		
		getDataFromWeatherAPI(displayWeatherResults);
        $(event.currentTarget).find('.search-query').val('');
	});
}

$(watchSubmit);
