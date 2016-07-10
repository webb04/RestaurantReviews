let selectedLocation = null;
let selectedCuisine = null;
let voted = [];
let restaurants = null;
let filtered = null;

let selectedRating = null;

let minimum = 0;
let maximum = 130;

let cuisineID = {
  "italian": 55,
  "american": 1,
  "british": 133,
  "indian": 148
};

$('.location').on('click', function(e) {
  selectedLocation = e.target.innerHTML;
  $('.location').removeClass('selected');
  $('.location').attr('aria-checked', 'false');
  $(e.target).parent().parent().addClass('selected');
  $(e.target).parent().parent().attr('aria-checked', 'true');
  if (selectedCuisine) fetchRestaurants(selectedLocation, selectedCuisine);
});

$('.cuisine').on('click', function(e) {
  selectedCuisine = e.target.innerHTML.toLowerCase().trim();
  selectedCuisine = cuisineID[selectedCuisine];
  $('.cuisine').removeClass('selected-cuisine');
  $('.cuisine').attr('aria-checked', 'false');
  $(e.target).parent().addClass('selected-cuisine');
  $(e.target).parent().attr('aria-checked', 'true');
  if (selectedLocation) fetchRestaurants(selectedLocation, selectedCuisine);
});

$('.location').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      selectedLocation = $(this).attr('class').split(" ")[1];
      $('.location').removeClass('selected');
      $('.location').attr('aria-checked', 'false');
      $(this).addClass('selected');
      $(e.target).parent().parent().attr('aria-checked', 'true');
      if (selectedCuisine) fetchRestaurants(selectedLocation, selectedCuisine);
    }
  });

  $('.cuisine').keypress(function(e){
      if(e.which == 13){//Enter key pressed
        selectedCuisine = $(this).attr('class').split(" ")[1].toLowerCase().trim();
        selectedCuisine = cuisineID[selectedCuisine];
        $('.cuisine').removeClass('selected-cuisine');
        $('.cuisine').attr('aria-checked', 'false');
        $(this).addClass('selected-cuisine');
        $(e.target).parent().attr('aria-checked', 'true');
        if (selectedLocation) fetchRestaurants(selectedLocation, selectedCuisine);
      }
    });

let fetchRestaurants = (selectedLocation, selectedCuisine) => {

  document.getElementById('filter').innerHTML = `<h2 role="heading" aria-level="2">Filter</h2><label for="fader1">Minimum rating</label><br>
<input type="range" min="0" max="5" value="0" id="fader1"
	step="0.1" oninput="minRatingUpdate(value)"><br>
  <output for="fader1" id="min-rating">0</output><br>`

  document.getElementById('filter').innerHTML += `<label for="fader2">Maximum average spend for two</label><br>
<input type="range" min="10" max="130" value="130" id="fader2"
	step="5" oninput="maxAverageSpendUpdate(value)"><br>
  <span>£</span><output for="fader2" id="max-average-spend">130</output>`

  document.getElementById('results').innerHTML = '<img src="/dist/img/ring.svg" alt="fetching results"/>';
  var request = '/api/'+ selectedLocation + '?cuisine=' + selectedCuisine;
  fetch(request).then(function(response) {
    return response.json();
  }).then(function(data) {
    var data = JSON.parse(data.body);
    var restaurants = data.restaurants;
    document.getElementById('results').innerHTML = '';
    restaurants.map(x => {
      x.restaurant.formattedname = x.restaurant.name.replace("'", "");
      document.getElementById('results').innerHTML += `<div class="restaurant"><div class="restaurant-image" tabindex='0' role="img" id="${x.restaurant.featured_image}"></div>
    <label style="display: none" for="${x.restaurant.featured_image}">${x.restaurant.name}</label>
    <div class="restaurant-name">${x.restaurant.name}</div>
    <div class="rating" style="background: #${x.restaurant.user_rating.rating_color}">${x.restaurant.user_rating.aggregate_rating}</div>
      <div class="votes">${x.restaurant.user_rating.votes} votes</div>
      <div class="opening-times">12:00 - 23:00</div>
      <span>Average price for two: £</span>
      <div class="price">${x.restaurant.average_cost_for_two}</div>
      <div>${x.restaurant.location.address}</div>
      <div class="new-review" style="display: none" name="${x.restaurant.formattedname}"></div>
      <div class="ratings-wrapper">
        <div class='rating-value' role="button" aria-label="0" onclick='updateRating(0, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(0, "${x.restaurant.formattedname}", event)' tabindex='0'>0</div>
        <div class='rating-value' role="button" aria-label="1" onclick="updateRating(1, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(1, "${x.restaurant.formattedname}", event)' tabindex='0'>1</div>
        <div class='rating-value' role="button" aria-label="2" onclick='updateRating(2, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(2, "${x.restaurant.formattedname}", event)' tabindex='0'>2</div>
        <div class='rating-value' role="button" aria-label="3" onclick='updateRating(3, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(3, "${x.restaurant.formattedname}", event)' tabindex='0'>3</div>
        <div class='rating-value' role="button" aria-label="4" onclick='updateRating(4, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(4, "${x.restaurant.formattedname}", event)' tabindex='0'>4</div>
        <div class='rating-value' role="button" aria-label="5" onclick='updateRating(5, "${x.restaurant.formattedname}")' onkeypress='updateRatingKeypress(5, "${x.restaurant.formattedname}", event)' tabindex='0'>5</div>
        <p class="already-voted"></p>
      </div>
      <div class="reviews"></div>
      <div class="review-wrapper">
          <textarea aria-label="Leave a review" role="textbox" aria-multiline="true" placeholder="Leave a comment" class="comment" cols="40" rows="3" name='${x.restaurant.name}'></textarea>
          <button onclick="addComment('${x.restaurant.name}')">Submit</button>
      </div>`;
        document.getElementById(x.restaurant.featured_image).style.backgroundImage = `url('${x.restaurant.featured_image}'), url('/dist/img/default.jpg')`
  });

    fetchReviews();

  }).catch(function(error) {

    fetchReviews();

  });
}


let updateRating = (newVote, name) => {
  if (voted.indexOf(name) > -1) {

  } else {
    selectedRating = newVote;
    let rating = $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML;
    let numberOfVotes = $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML;
    rating = parseFloat(rating);
    numberOfVotes = parseInt(numberOfVotes);
    let newRating = ((rating * numberOfVotes) + newVote) / ++numberOfVotes;
    $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML = newRating.toFixed(1);
    $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML = numberOfVotes;
    $(`div[name='${name}']`).parent().find('.already-voted')[0].innerHTML = "You have submitted a rating for this restaurant";
    voted.push(name);
  }
}

let updateRatingKeypress = (newVote, name, e) => {
  if (voted.indexOf(name) > -1) {

  } else {
    if (e.which == 13){//Enter key pressed
      selectedRating = newVote;
      let rating = $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML;
      let numberOfVotes = $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML;
      rating = parseFloat(rating);
      numberOfVotes = parseInt(numberOfVotes);
      let newRating = ((rating * numberOfVotes) + newVote) / ++numberOfVotes;
      $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML = newRating.toFixed(1);
      $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML = numberOfVotes;
      $(`div[name='${name}']`).parent().find('.already-voted')[0].innerHTML = "You have submitted a rating for this restaurant";
      voted.push(name);
    }
  }}

let fetchReviews = () => {
  var json;
  $.getJSON("reviews.json", function(data){
    json = data;

    var restaurants = document.querySelectorAll('.restaurant');

    for( var index=0; index < restaurants.length; index++ ) {
      var comments = Math.round((Math.random() * 3) + 1);
      for (var i = 0; i < comments; i++) {
        var item = json[Math.floor(Math.random()*json.length)];
        restaurants[index].getElementsByClassName('reviews')[0].innerHTML += `<div class="review-wrapper"><div><span>${item.name}, </span><span>${item.date}, </span><span>${item.rating}</span></div>${item.review}</div>`;
      }
    }
  });
}

let addComment = (restaurant) => {
  let text = $(`textarea[name='${restaurant}']`);
  console.log(text.val());
  if (text.val() != "") {
    text.parent().prev().append(`<div class="review-wrapper">
    <div>
      <span>Logged in user, </span>
      <span>${moment().format('DD/MM/YYYY')}, </span>
      <span>${selectedRating || 'Rating not given'}</span>
    </div>
    ${text.val()}
    </div>`)
    // text.next().hide();
    text.parent().hide();
  }
}

function minRatingUpdate(min) {
  minimum = min;
	document.querySelector('#min-rating').value = min;
  let restaurants = $('.restaurant');
  let filtered = restaurants.filter(x => ((parseFloat(restaurants[x].querySelector('.rating').innerHTML) >= min) && (parseInt(restaurants[x].querySelector('.price').innerHTML) <= maximum)));
  restaurants.hide();
  filtered.show();
}

function maxAverageSpendUpdate(max) {
  maximum = max;
  document.querySelector('#max-average-spend').value = max;
  let restaurants = $('.restaurant');
  let filtered = restaurants.filter(x => ((parseInt(restaurants[x].querySelector('.price').innerHTML) <= max) && (parseFloat(restaurants[x].querySelector('.rating').innerHTML) >= minimum)));
  restaurants.hide();
  filtered.show();
}
