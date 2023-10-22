var express = require('express');
var router = express.Router();

// MongoDB
let itemss = [];
const foundItems = require('./../public/javascripts/db'); // The path to your example.js file
foundItems((items) => {
  console.log('b:', items[0].name);
    itemss = items;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Kahvit', foundItemss: itemss });
});

module.exports = router;

