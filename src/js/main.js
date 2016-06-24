let selectedLocation = null;
let selectedCuisine = null;
let voted = [];

let locationID = {
  "London": 61,
  "Birmingham": 69,
  "Liverpool": 323,
  "Manchester": 68
};

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
  console.log(selectedLocation, selectedCuisine);
  document.getElementById('results').innerHTML = '<img src="/dist/img/ring.svg" alt="fetching results"/>';
  var request = '/api/'+ selectedLocation + '?cuisine=' + selectedCuisine;
  fetch(request).then(function(response) {
    return response.json();
  }).then(function(data) {
    var data = JSON.parse(data.body);
    var restaurants = data.restaurants;
    document.getElementById('results').innerHTML = '';
    restaurants.map(x => {
      document.getElementById('results').innerHTML += `<div class="restaurant"><div class="restaurant-image" id="${x.restaurant.featured_image}"></div>
    <div class="restaurant-name">${x.restaurant.name}</div>
    <div class="rating" style="background: #${x.restaurant.user_rating.rating_color}">${x.restaurant.user_rating.aggregate_rating}</div>
      <div class="votes">${x.restaurant.user_rating.votes} votes</div>
      <div class="new-review" name="${x.restaurant.name}">Add Review</div>`;
      document.getElementById(x.restaurant.featured_image).style.backgroundImage = `url('${x.restaurant.featured_image}')`
      console.log(x.restaurant);
    });

    $('.new-review').on('click', function(e) {
      var name = e.target.getAttribute('name');
      console.log(name);
      $( 'div[name="'+e.target.getAttribute('name')+'"]' ).parent().append(`<div class="ratings-wrapper">
      <div class="rating-value" onclick="updateRating(0, '${name}')" tabindex="0">0</div>
      <div class="rating-value" onclick="updateRating(1, '${name}')" tabindex="0">1</div>
      <div class="rating-value" onclick="updateRating(2, '${name}')" tabindex="0">2</div>
      <div class="rating-value" onclick="updateRating(3, '${name}')" tabindex="0">3</div>
      <div class="rating-value" onclick="updateRating(4, '${name}')" tabindex="0">4</div>
      <div class="rating-value" onclick="updateRating(5, '${name}')" tabindex="0">5</div>
      <br>
      <p class="already-voted"></p>
      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>
      </div>`);
    });

  }).catch(function(error) {
    $('.new-review').on('click', function(e) {
      var name = e.target.getAttribute('name');
      console.log(name);
      $( 'div[name="'+e.target.getAttribute('name')+'"]' ).parent().append(`<div class="ratings-wrapper">
      <div class="rating-value" onclick="updateRating(0, '${name}')" tabindex="0">0</div>
      <div class="rating-value" onclick="updateRating(1, '${name}')" tabindex="0">1</div>
      <div class="rating-value" onclick="updateRating(2, '${name}')" tabindex="0">2</div>
      <div class="rating-value" onclick="updateRating(3, '${name}')" tabindex="0">3</div>
      <div class="rating-value" onclick="updateRating(4, '${name}')" tabindex="0">4</div>
      <div class="rating-value" onclick="updateRating(5, '${name}')" tabindex="0">5</div>
      <br>
      <p class="already-voted"></p>
      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>
      </div>`);
    });
  });
}


let updateRating = (newVote, name) => {
  if (voted.indexOf(name) > -1) {

  } else {
    let rating = $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML;
    let numberOfVotes = $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML;
    rating = parseFloat(rating);
    numberOfVotes = parseInt(numberOfVotes);
    let newRating = ((rating * numberOfVotes) + newVote) / ++numberOfVotes;
    $(`div[name='${name}']`).parent().find('.rating')[0].innerHTML = newRating.toFixed(1);
    $(`div[name='${name}']`).parent().find('.votes')[0].innerHTML = numberOfVotes;
    $(`div[name='${name}']`).parent().find('.already-voted')[0].innerHTML = "You have submitted a review for this restaurant";
    voted.push(name);
  }
}
