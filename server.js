var http = require('http');
var request = require("request")
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/london', function(req, res) {
    var cuisine = req.query.cuisine;
    var url = 'https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&cuisines=' + cuisine;
    request({
        url: url,
        method: 'GET',
        headers: {
            'user_key': '7fbdcfbb30dfe6d0b74f258d0586a97d'
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            if (response.statusCode == 200) {
              res.json({ body });
            }
        }
    });
});

router.get('/birmingham', function(req, res) {
    var cuisine = req.query.cuisine;
    var url = 'https://developers.zomato.com/api/v2.1/search?entity_id=69&entity_type=city&cuisines=' + cuisine;
    request({
        url: url,
        method: 'GET',
        headers: {
            'user_key': '7fbdcfbb30dfe6d0b74f258d0586a97d'
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            if (response.statusCode == 200) {
              res.json({ body });
            }
        }
    });
});

router.get('/liverpool', function(req, res) {
    var cuisine = req.query.cuisine;
    var url = 'https://developers.zomato.com/api/v2.1/search?entity_id=323&entity_type=city&cuisines=' + cuisine;
    request({
        url: url,
        method: 'GET',
        headers: {
            'user_key': '7fbdcfbb30dfe6d0b74f258d0586a97d'
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            if (response.statusCode == 200) {
              res.json({ body });
            }
        }
    });
});

router.get('/manchester', function(req, res) {
    var cuisine = req.query.cuisine;
    var url = 'https://developers.zomato.com/api/v2.1/search?entity_id=68&entity_type=city&cuisines=' + cuisine;
    request({
        url: url,
        method: 'GET',
        headers: {
            'user_key': '7fbdcfbb30dfe6d0b74f258d0586a97d'
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            if (response.statusCode == 200) {
              res.json({ body });
            }
        }
    });
});





app.use('/api', router);
app.use('/', express.static(__dirname));

// app.listen(port);
app.listen(3000, function() { console.log('listening')});
