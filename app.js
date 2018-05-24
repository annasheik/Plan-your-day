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
       	let city = $('.search-query').val();

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

// Scroll to Weather Results
function scrollToWeatherResults() {
	$('html, body').animate({
		scrollTop: $('.weather-display').offset().top}, 700);
}


//event listener for a search form
function watchSubmit() {
	$('.search-form').on('submit', event => {
		console.log("Hello World");
		event.preventDefault;
       
		
		getDataFromWeatherAPI(displayWeatherResults);
        scrollToWeatherResults();
         $(event.currentTarget).find('.search-query').val('');
        
	});
}

$(watchSubmit);

//Get data from Foursquare API 
   /* getDataFromFoursquareAPI (callback, category) {
	const FOUSRQUARE_URL = 'https://api.foursquare.com/v2/venues/explore';
	let city = $('.search-query').val();
	let category = 
	const query = {
		client_id: 'DPOUX5ELF3MXCHKHK2DW1X4PNJXQL1H0I03LHTXLYKIVIBBM',
		client_secret: '3Z2NZ2PVA01NDLQVSI0SGJUXGXUPENANW0GFV3RTIZQE3CZ4',
		near: city,
		section: category,
		limit: 9,
		v: 20180520
	}
	.getJSON(FOUSRQUARE_URL, query, callback)
} 

//Create Foursquare results HTML
function createFoursquareHTML(result) {
	return `
	  	<div class="js-foursquare-results col-4">
	  		<div class="result-description">
		  		<img src="" class="result-img">
		  		<h3>${result.venue.name}</h3>
		  		<img src="" class="category-img">
		  		<p class="result-address">${result.venue.formattedAddress[0]}</p>
		  	    <p class="result-address">${result.venue.formattedAddress[0]}</p>	
	
		    </div>
	  	</div> `
	  	
	
}

//display Foursquare seach results - callback function
function displayFoursquareResults(data) {
	const foursquareResults = data.items.map((item) => createFoursquareHTML(item));
}

//event listener for category buttons
function submitCategoryButton () {
	$('.js-category-button').on('click', function(event) {
		let category = $(this).text();
	})
} */
