"use strict";var selectedLocation=null,selectedCuisine=null,locationID={London:61,Birmingham:69,Liverpool:323,Manchester:68},cuisineID={italian:55,american:1,british:133,indian:148};$(".location").on("click",function(e){selectedLocation=e.target.innerHTML,$(".location").removeClass("selected"),$(e.target).parent().parent().addClass("selected"),selectedCuisine&&fetchRestaurants(selectedLocation,selectedCuisine)}),$(".cuisine").on("click",function(e){selectedCuisine=e.target.innerHTML.toLowerCase().trim(),console.log("selected cuisine - "+selectedCuisine),selectedCuisine=cuisineID[selectedCuisine],console.log("selected cuisine - "+selectedCuisine),$(".cuisine").removeClass("selected-cuisine"),$(e.target).parent().addClass("selected-cuisine"),selectedLocation&&fetchRestaurants(selectedLocation,selectedCuisine)}),$(".location").keypress(function(e){13==e.which&&(selectedLocation=$(this).attr("class").split(" ")[1],$(".location").removeClass("selected"),$(this).addClass("selected"),selectedCuisine&&fetchRestaurants(selectedLocation,selectedCuisine))}),$(".cuisine").keypress(function(e){13==e.which&&(console.log($(this).attr("class").split(" ")[1]),selectedCuisine=$(this).attr("class").split(" ")[1].toLowerCase().trim(),selectedCuisine=cuisineID[selectedCuisine],$(".cuisine").removeClass("selected-cuisine"),$(this).addClass("selected-cuisine"),selectedLocation&&fetchRestaurants(selectedLocation,selectedCuisine))});var fetchRestaurants=function(e,t){console.log(e,t),document.getElementById("results").innerHTML='<img src="/dist/img/ring.svg" alt="fetching results"/>';var n="/api/"+e+"?cuisine="+t;fetch(n).then(function(e){return e.json()}).then(function(e){var e=JSON.parse(e.body),t=e.restaurants;document.getElementById("results").innerHTML="",t.map(function(e){document.getElementById("results").innerHTML+='<div class="restaurant"><div class="restaurant-image" id="'+e.restaurant.featured_image+'"></div>\n    <div class="restaurant-name">'+e.restaurant.name+'</div>\n    <div class="rating" style="background: #'+e.restaurant.user_rating.rating_color+'">'+e.restaurant.user_rating.aggregate_rating+"</div>\n      <div>"+e.restaurant.user_rating.votes+' votes</div>\n      <div class="new-review" name="'+e.restaurant.name+'">Add Review</div>',document.getElementById(e.restaurant.featured_image).style.backgroundImage="url('"+e.restaurant.featured_image+"')",console.log(e.restaurant)}),$(".new-review").on("click",function(e){console.log(e.target.getAttribute("name")),$('div[name="'+e.target.getAttribute("name")+'"]').parent().append('<div class="ratings-wrapper">\n      <div class="rating-value" tabindex="0">0</div>\n      <div class="rating-value" tabindex="0">1</div>\n      <div class="rating-value" tabindex="0">2</div>\n      <div class="rating-value" tabindex="0">3</div>\n      <div class="rating-value" tabindex="0">4</div>\n      <div class="rating-value" tabindex="0">5</div>\n      <br>\n      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>\n      </div>')})})["catch"](function(e){$(".new-review").on("click",function(e){console.log(e.target.getAttribute("name")),$('div[name="'+e.target.getAttribute("name")+'"]').parent().append('<div class="ratings-wrapper">\n      <div class="rating-value" tabindex="0">0</div>\n      <div class="rating-value" tabindex="0">1</div>\n      <div class="rating-value" tabindex="0">2</div>\n      <div class="rating-value" tabindex="0">3</div>\n      <div class="rating-value" tabindex="0">4</div>\n      <div class="rating-value" tabindex="0">5</div>\n      <br>\n      <textarea class="comment" name="comment" cols="40" rows="5"></textarea>\n      </div>')})})};