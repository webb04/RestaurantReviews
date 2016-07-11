"use strict";function minRatingUpdate(e){minimum=e,document.querySelector("#min-rating").value=e;var a=$(".restaurant"),t=a.filter(function(t){return parseFloat(a[t].querySelector(".rating").innerHTML)>=e&&parseInt(a[t].querySelector(".price").innerHTML)<=maximum});a.hide(),t.show()}function maxAverageSpendUpdate(e){maximum=e,document.querySelector("#max-average-spend").value=e;var a=$(".restaurant"),t=a.filter(function(t){return parseInt(a[t].querySelector(".price").innerHTML)<=e&&parseFloat(a[t].querySelector(".rating").innerHTML)>=minimum});a.hide(),t.show()}var selectedLocation=null,selectedCuisine=null,voted=[],restaurants=null,filtered=null,selectedRating={},minimum=0,maximum=130,cuisineID={italian:55,american:1,british:133,indian:148};$(".location").on("click",function(e){selectedLocation=e.target.innerHTML,$(".location").removeClass("selected"),$(".location").attr("aria-checked","false"),$(e.target).parent().parent().addClass("selected"),$(e.target).parent().parent().attr("aria-checked","true"),selectedCuisine&&fetchRestaurants(selectedLocation,selectedCuisine)}),$(".cuisine").on("click",function(e){selectedCuisine=e.target.innerHTML.toLowerCase().trim(),selectedCuisine=cuisineID[selectedCuisine],$(".cuisine").removeClass("selected-cuisine"),$(".cuisine").attr("aria-checked","false"),$(e.target).parent().addClass("selected-cuisine"),$(e.target).parent().attr("aria-checked","true"),selectedLocation&&fetchRestaurants(selectedLocation,selectedCuisine)}),$(".location").keypress(function(e){13==e.which&&(selectedLocation=$(this).attr("class").split(" ")[1],$(".location").removeClass("selected"),$(".location").attr("aria-checked","false"),$(this).addClass("selected"),$(e.target).parent().parent().attr("aria-checked","true"),selectedCuisine&&fetchRestaurants(selectedLocation,selectedCuisine))}),$(".cuisine").keypress(function(e){13==e.which&&(selectedCuisine=$(this).attr("class").split(" ")[1].toLowerCase().trim(),selectedCuisine=cuisineID[selectedCuisine],$(".cuisine").removeClass("selected-cuisine"),$(".cuisine").attr("aria-checked","false"),$(this).addClass("selected-cuisine"),$(e.target).parent().attr("aria-checked","true"),selectedLocation&&fetchRestaurants(selectedLocation,selectedCuisine))});var fetchRestaurants=function(e,a){document.getElementById("filter").innerHTML='<h2 role="heading" aria-level="2">Filter</h2><label for="fader1">Minimum rating</label><br>\n<input tabindex="0" type="range" min="0" max="5" value="0" id="fader1"\n	step="0.1" oninput="minRatingUpdate(value)"><br>\n  <output for="fader1" id="min-rating">0</output><br>',document.getElementById("filter").innerHTML+='<label for="fader2">Maximum average spend for two</label><br>\n<input tabindex="0" type="range" min="10" max="130" value="130" id="fader2"\n	step="5" oninput="maxAverageSpendUpdate(value)"><br>\n  <span>£</span><output for="fader2" id="max-average-spend">130</output>',document.getElementById("results").innerHTML='<img src="/dist/img/ring.svg" alt="fetching results"/>';var t="/api/"+e+"?cuisine="+a;fetch(t).then(function(e){return e.json()}).then(function(e){var e=JSON.parse(e.body),a=e.restaurants;document.getElementById("results").innerHTML="",a.map(function(e){e.restaurant.formattedname=e.restaurant.name.replace("'",""),null==document.getElementById(""+e.restaurant.formattedname)&&(document.getElementById("results").innerHTML+='<div class="restaurant"><div class="restaurant-image" tabindex=\'0\' role="img" id="'+e.restaurant.featured_image+'"></div>\n        <label style="display: none" for="'+e.restaurant.featured_image+'">'+e.restaurant.name+'</label>\n        <div class="restaurant-name" id="'+e.restaurant.formattedname+'">'+e.restaurant.name+'</div>\n        <div class="rating" style="border: solid 5px #'+e.restaurant.user_rating.rating_color+'">'+e.restaurant.user_rating.aggregate_rating+'</div>\n        <div class="votes">'+e.restaurant.user_rating.votes+' votes</div>\n        <div class="opening-times">12:00 - 23:00</div>\n        <span>Average price for two: £</span>\n        <div class="price">'+e.restaurant.average_cost_for_two+"</div>\n        <div>"+e.restaurant.location.address+'</div>\n        <div class="new-review" style="display: none" name="'+e.restaurant.formattedname+'"></div>\n        <div class="reviews"></div>\n        <div class="review-wrapper">\n          <input type="text" placeholder="First name" name=\''+e.restaurant.formattedname+'\'></input>\n          <input type="text" placeholder="Last name" name=\''+e.restaurant.formattedname+'\'></input>\n          <textarea aria-label="Leave a review" role="textbox" aria-multiline="true" placeholder="Leave a comment" class="comment" cols="40" rows="3" name=\''+e.restaurant.formattedname+'\'></textarea>\n          <div class="ratings-wrapper">\n            <div class=\'rating-value\' role="button" aria-label="0" onclick=\'updateRating(0, "'+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(0, \""+e.restaurant.formattedname+'", event)\' tabindex=\'0\'>0</div>\n            <div class=\'rating-value\' role="button" aria-label="1" onclick="updateRating(1, "'+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(1, \""+e.restaurant.formattedname+"\", event)' tabindex='0'>1</div>\n            <div class='rating-value' role=\"button\" aria-label=\"2\" onclick='updateRating(2, \""+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(2, \""+e.restaurant.formattedname+"\", event)' tabindex='0'>2</div>\n            <div class='rating-value' role=\"button\" aria-label=\"3\" onclick='updateRating(3, \""+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(3, \""+e.restaurant.formattedname+"\", event)' tabindex='0'>3</div>\n            <div class='rating-value' role=\"button\" aria-label=\"4\" onclick='updateRating(4, \""+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(4, \""+e.restaurant.formattedname+"\", event)' tabindex='0'>4</div>\n            <div class='rating-value' role=\"button\" aria-label=\"5\" onclick='updateRating(5, \""+e.restaurant.formattedname+"\")' onkeypress='updateRatingKeypress(5, \""+e.restaurant.formattedname+"\", event)' tabindex='0'>5</div>\n            <p class=\"already-voted\"></p>\n          </div>\n          <button onclick=\"addComment('"+e.restaurant.formattedname+"')\">Submit</button>\n        </div>",document.getElementById(e.restaurant.featured_image).style.backgroundImage="url('"+e.restaurant.featured_image+"'), url('/dist/img/default.jpg')")}),fetchReviews()})["catch"](function(e){fetchReviews()})},updateRating=function(e,a){selectedRating[a]=e},updateRatingKeypress=function(e,a,t){13==t.which&&(selectedRating[a]=e)},fetchReviews=function(){var e;$.getJSON("reviews.json",function(a){e=a;for(var t=document.querySelectorAll(".restaurant"),n=0;n<t.length;n++)for(var r=Math.round(3*Math.random()+1),i=0;r>i;i++){var s=e[Math.floor(Math.random()*e.length)];t[n].getElementsByClassName("reviews")[0].innerHTML+='<div class="review-wrapper"><div><span>'+s.name+", </span><span>"+s.date+", </span><span>"+s.rating+"</span></div>"+s.review+"</div>"}})},addComment=function(e){var a=$("textarea[name='"+e+"']"),t=$("input[name='"+e+"']")[0].value,n=$("input[name='"+e+"']")[1].value,r=!1;if($("textarea[name='"+e+"']").removeClass("invalid"),$("input[name='"+e+"']").first().removeClass("invalid"),$("input[name='"+e+"']").first().next().removeClass("invalid"),""==a.val()&&($("textarea[name='"+e+"']").addClass("invalid"),r=!0),""==t&&($("input[name='"+e+"']").first().addClass("invalid"),r=!0),""==n&&($("input[name='"+e+"']").first().next().addClass("invalid"),r=!0),!r){a.parent().prev().append('<div class="review-wrapper">\n  <div>\n    <span>'+t+" "+n+", </span>\n    <span>"+moment().format("DD/MM/YYYY")+", </span>\n    <span>"+(selectedRating[e]||"Rating not given")+"</span>\n  </div>\n  "+a.val()+"\n  </div>"),a.parent().hide();var i=$("div[name='"+e+"']").parent().parent().find(".rating")[0].innerHTML,s=$("div[name='"+e+"']").parent().parent().find(".votes")[0].innerHTML;i=parseFloat(i),s=parseInt(s);var d=(i*s+selectedRating[e])/++s;$("div[name='"+e+"']").parent().parent().find(".rating")[0].innerHTML=d.toFixed(1),$("div[name='"+e+"']").parent().parent().find(".votes")[0].innerHTML=s,$("div[name='"+e+"']").parent().parent().find(".already-voted")[0].innerHTML="You have submitted a rating for this restaurant",voted.push(e)}};