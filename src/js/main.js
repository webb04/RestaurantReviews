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

// get current location and use radius to work out how close they are
let fetchRestaurants = (selectedLocation, selectedCuisine) => {
  console.log(selectedLocation, selectedCuisine);
  var request = '/api/'+ selectedLocation + '?cuisine=' + selectedCuisine;
  fetch(request).then(function(response) {
    return response.json();
  }).then(function(data) {
    var data = data.body;
    console.log(JSON.parse(data));
    // data.map(x => stations.push(x.stationName));
    // stations = stations.map(x => x.toLowerCase());
  }).catch(function(error) { });
}
