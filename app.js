// Running text in searchfield
var searchEx = [ 'San Diego', 'London', 'Seattle', 'San Francisco', 'New York', 'Vancouver', 'Paris', 'Athens'];
  setInterval(function() {
    $("input#js-search").attr("placeholder", searchEx[searchEx.push(searchEx.shift())-1]);
  }, 2000);

let offsetToken = 0;

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

// C to F: C * 9/5 +32

return `
<div class="weather-results">
	<h2 class="h2-weather">Current weather in ${result.name}</h2>
	<p class="p-temp"><span>${(result.main.temp).toFixed(0)} &#8451;  | ${((result.main.temp * 9/5) +32).toFixed(0)} &#8457;</span><img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" class="weather-icon"
	alt="weather icon of ${result.weather[0].main}"></p>
	<p class="weatherDescription">${result.weather[0].main}</p>
	<p class='weather-p'><span class='weather-span'>Description:</span> ${result.weather[0].description}</p>
	<p class='weather-p'><span class='weather-span'>Humidity:</span> ${result.main.humidity}%</p>
	<p class='weather-p'><span class='weather-span'>Wind:</span> ${result.wind.speed} mps</p>
</div>

<nav role="navigation" class="venues-nav" data-city="${city}">
	<button class="js-category-button" data-category="food">Food</button>
	<button class="js-category-button" data-category="events">Events</button>
	<button class="js-category-button" data-category="arts">Entertainment</button>
	<button class="js-category-button" data-category="outdoors">Outdoors</button>
</nav> `
}
//Display weather search results - a callback function
function displayWeatherResults(city, data) {
	const results = createWeatherHTML(city, data);
	
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
		$('.weather-display').prop('hidden', false);
		$('.venues-page').prop('hidden', true);
		const city = $('.search-query').val();
		getDataFromWeatherAPI(city, displayWeatherResults);
	
		scrollToWeatherResults();
		$(event.currentTarget).find('.search-query').val('');     
	});
}



//Get data from Foursquare API 
function getDataFromFoursquareAPI (callback, category, city) {
	const FOUSRQUARE_URL = 'https://api.foursquare.com/v2/venues/explore?';
	
	
	const query = {
		client_id: 'DPOUX5ELF3MXCHKHK2DW1X4PNJXQL1H0I03LHTXLYKIVIBBM',
		client_secret: '3Z2NZ2PVA01NDLQVSI0SGJUXGXUPENANW0GFV3RTIZQE3CZ4',
		near: city,
		venuePhotos: 1,
		section: category,
		limit: 9,
		v: 20180520,
		offset: offsetToken
		

	};
	
	$.getJSON(FOUSRQUARE_URL, query, callback)
} 

//Create Foursquare results HTML
function createFoursquareHTML(result) {
	venueID = result.venue.id;
	getFoursquarePhoto(venueID, renderFoursquarePhotoResults);
	return `
	<div class="js-foursquare-results col-4">
	<div class="result-description">
	<div id='${venueID}-photo'></div>
	<h3 class='venue-name'>${result.venue.name}</h3>
	<p><img src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" class="category-img"></p>
	</span>
                <span class="icon-text">
                    ${result.venue.categories[0].name}
                </span>
	<p class="result-address">${result.venue.location.formattedAddress[0]}</p>
	<p class="result-address">${result.venue.location.formattedAddress[1]}</p>	
	<p class="result-address">${result.venue.location.formattedAddress[2]}</p>
	
	</div>
	</div> `

}



//display Foursquare seach results - callback function
function displayFoursquareResults(data) {

//console.log(JSON.stringify(data))
	const foursquareResults = data.response.groups[0].items.map((item) => createFoursquareHTML(item));
	$('.venues').html(foursquareResults);
}

function scrollToFoursquareResults() {
	$('html, body').animate({
		scrollTop: $('.venues-page').offset().top}, 700);
}
//event listener for category buttons
function submitCategoryButton () {
	$('main').on('click', '.js-category-button', function(event) {
		const category = $(this).data('category');
		const city = $(this).parent().data('city');
        $('.venues-page').prop('hidden', false);
        $('footer').prop('hidden', false);
		getDataFromFoursquareAPI(displayFoursquareResults, category, city);

        scrollToFoursquareResults();
        $('.js-next-button').prop('hidden', false);
	})
} 

//handle Next Button
function handleNextButton() {
	$('.js-next-button').on('click', event => {
     $('.js-prev-button').prop('hidden', false);
      const category = $('.js-category-button').data('category');
      const city = $('.js-category-button').parent().data('city');
      offsetToken +=9;
      getDataFromFoursquareAPI(displayFoursquareResults, category, city)
	});	
	}

//handle Prev Button
function handlePrevButton () {
  $('.js-prev-button').on('click', event => {
    const category = $('.js-category-button').data('category');
    const city = $('.js-category-button').parent().data('city');
    if (offsetToken > 0){
            offsetToken = offsetToken - 9;
            }
        if (offsetToken === 0) {
            $('.js-prev-button').prop('hidden', true);
        }
    getDataFromFoursquareAPI(displayFoursquareResults, category, city)
  });
}

// Foursquare photo API request
function getFoursquarePhoto(venueID, callback) {
	const FOUSRQUARE_PHOTO_URL = `https://api.foursquare.com/v2/venues/${venueID}`;

    const query = {
		client_id: 'DPOUX5ELF3MXCHKHK2DW1X4PNJXQL1H0I03LHTXLYKIVIBBM',
		client_secret: '3Z2NZ2PVA01NDLQVSI0SGJUXGXUPENANW0GFV3RTIZQE3CZ4',
		v: 20180520
	}
	$.getJSON(FOUSRQUARE_PHOTO_URL, query, callback)

}

function generateFoursquarePhotoResults(photoResults) {
    const photoUrl = photoResults.prefix + '300x500' + photoResults.suffix;
	return `
	<img class='image-result' src='${photoUrl}'
	alt='image of a venue'></div>
	
	`
}

function renderFoursquarePhotoResults(data, venueID) {
	let foursquarePhotos = data.response.venue.photos.groups[0].items.map((item) => generateFoursquarePhotoResults(item));
	$(`#${data.response.venue.id}-photo`).html(foursquarePhotos);
	
}

function setupEventHandlers() {
	watchSubmit();
	submitCategoryButton();
	handleNextButton();
	handlePrevButton();
}



//autocomplete location name in form
function activatePlacesSearch() {
    let options = {
        types: ['(regions)']
    };
    let input = document.getElementById('js-search');
    let autocomplete = new google.maps.places.Autocomplete(input, options);
}
$(setupEventHandlers);

