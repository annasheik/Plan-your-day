//OpenWeatherMap API
//Get data from OpenWeatherMap API

function getDataFromWeatherAPI (city, callback) {
	const OpenWeatherMap_URL = 'https://api.openweathermap.org/data/2.5/weather?id=524901';
	const key = '023c7f0c54ac98ec1eda11f7fc2a77b2';
	function success(data) {
		callback(city, data);
	}
	const query = {
		q: city,
		APPID: key,
		units: 'metric'
	};
	$.getJSON(OpenWeatherMap_URL, query, success);
}

// Create the weather result HTML
function createWeatherHTML (city, result) {
	console.log('createResultHTML', result);
// C to F: C * 9/5 +32

return `
<div class="weather-results">
<h2 class="h2-weather">Current weather in ${result.name}</h2>
<p class="p-temp"><span>${(result.main.temp).toFixed(0)} &#8451;  | ${((result.main.temp * 9/5) +32).toFixed(0)} &#8457;</span><img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" class="weather-icon"
alt="weather icon of ${result.weather[0].main}"></p>
<p class="weatherDescription">${result.weather[0].main}</p>
<p>Description: ${result.weather[0].description}</p>
<p>Humidity: ${result.main.humidity}%</p>
<p>Wind: ${result.wind.speed} mps</p>
</div>

<nav role="navigation" class="venues-nav" data-city="${city}">
<button class="js-category-button" data-category="food">Food</button>
<button class="js-category-button" data-category="events">Events</button>
<button class="js-category-button" data-category="arts">Entertainment</button>
<button class="js-category-button" data-category="outdoors">Outdoors</button>
</nav>
`
}
//Display weather search results - a callback function
function displayWeatherResults(city, data) {
	const results = createWeatherHTML(city, data);
	console.log(results);
	$('.weather-display').html(results);
}

// Scroll to Weather Results
function scrollToWeatherResults() {
	$('html, body').animate({
		scrollTop: $('.weather-display').offset().top}, 700);
}

// TODO: create err function

//event listener for a search form
function watchSubmit() {
	$('.search-form').on('submit', event => {
		console.log("Hello World");
		event.preventDefault();
		const city = $('.search-query').val();
		getDataFromWeatherAPI(city, displayWeatherResults);
		scrollToWeatherResults();
		$(event.currentTarget).find('.search-query').val('');     
	});
}



//Get data from Foursquare API 
function getDataFromFoursquareAPI (callback, category, city) {
	const FOUSRQUARE_URL = 'https://api.foursquare.com/v2/venues/explore';
	
	
	const query = {
		client_id: 'DPOUX5ELF3MXCHKHK2DW1X4PNJXQL1H0I03LHTXLYKIVIBBM',
		client_secret: '3Z2NZ2PVA01NDLQVSI0SGJUXGXUPENANW0GFV3RTIZQE3CZ4',
		near: city,
		section: category,
		limit: 9,
		v: 20180520
	};
	
	$.getJSON(FOUSRQUARE_URL, query, callback)
} 

//Create Foursquare results HTML
function createFoursquareHTML(result) {
	return `
	Hello
	<div class="js-foursquare-results col-4">
	<div class="result-description">
	<img src="" class="result-img">
	<h3>${result.venue.name}</h3>
	<img src="" class="category-img">
	<p class="result-address">${result.venue}</p>
	<p class="result-address">${result.venue}</p>	
	
	</div>
	</div> `

	
}

//display Foursquare seach results - callback function
function displayFoursquareResults(data) {
	
	const foursquareResults = data.response.groups[0].items.map((item) => createFoursquareHTML(item));
	$('.venues').html(foursquareResults);
}

//event listener for category buttons
function submitCategoryButton () {
	$('main').on('click', '.js-category-button', function(event) {
		const category = $(this).data('category');
		const city = $(this).parent().data('city');
		getDataFromFoursquareAPI(displayFoursquareResults, category, city);

	})
} 

function setupEventHandlers() {
	watchSubmit();
	submitCategoryButton();
}

$(setupEventHandlers);
