let selectedLocation = null;
let selectedCuisine = null;

let locationID = {
  "London": 61,
  "Birmingham": 69,
  "Liverpool": 323,
  "Manchester": 68
};

let cuisineID = {
  "Italian": 55,
  "American": 1,
  "British": 133,
  "Indian": 148
};

$('.location').on('click', function(e) {
  selectedLocation = e.target.innerHTML;
  $('.location').removeClass('selected');
  $(e.target).parent().parent().addClass('selected');
  if (selectedCuisine) fetchRestaurants(selectedLocation, selectedCuisine);
});

$('.cuisine').on('click', function(e) {
  selectedCuisine = e.target.innerHTML;
  selectedCuisine = cuisineID[selectedCuisine];
  $('.cuisine').removeClass('selected-cuisine');
  $(e.target).parent().addClass('selected-cuisine');
  if (selectedLocation) fetchRestaurants(selectedLocation, selectedCuisine);
});

$('.location').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      selectedLocation = $(this).attr('class').split(" ")[1];
      $('.location').removeClass('selected');
      $(this).addClass('selected');
      if (selectedCuisine) fetchRestaurants(selectedLocation, selectedCuisine);
    }
  });

  $('.cuisine').keypress(function(e){
      if(e.which == 13){//Enter key pressed
        selectedCuisine = $(this).attr('class').split(" ")[1];
        selectedCuisine = cuisineID[selectedCuisine];
        $('.cuisine').removeClass('selected-cuisine');
        $(this).addClass('selected-cuisine');
        if (selectedLocation) fetchRestaurants(selectedLocation, selectedCuisine);
      }
    });

let fetchRestaurants = (selectedLocation, selectedCuisine) => {
  console.log(selectedLocation, selectedCuisine);
  document.getElementById('results').innerHTML = '<img src="/dist/img/ring.svg"/>';
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
      <div>${x.restaurant.user_rating.votes} votes</div>
      <div class="new-review" name="${x.restaurant.name}">Add Review</div>`;
      document.getElementById(x.restaurant.featured_image).style.backgroundImage = `url('${x.restaurant.featured_image}')`
      console.log(x.restaurant);
    });

    $('.new-review').on('click', function(e) {
      console.log(e.target.getAttribute('name'));
      $( 'div[name="'+e.target.getAttribute('name')+'"]' ).parent().append(`<div class="ratings-wrapper">
      <div class="rating-value" tabindex="0">0</div>
      <div class="rating-value" tabindex="0">1</div>
      <div class="rating-value" tabindex="0">2</div>
      <div class="rating-value" tabindex="0">3</div>
      <div class="rating-value" tabindex="0">4</div>
      <div class="rating-value" tabindex="0">5</div>
      <br>
      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>
      </div>`);
    });

  }).catch(function(error) {
    $('.new-review').on('click', function(e) {
      console.log(e.target.getAttribute('name'));
      $( 'div[name="'+e.target.getAttribute('name')+'"]' ).parent().append(`<div class="ratings-wrapper">
      <div class="rating-value" tabindex="0">0</div>
      <div class="rating-value" tabindex="0">1</div>
      <div class="rating-value" tabindex="0">2</div>
      <div class="rating-value" tabindex="0">3</div>
      <div class="rating-value" tabindex="0">4</div>
      <div class="rating-value" tabindex="0">5</div>
      <br>
      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>
      </div>`);
    });
  });
}
