// modules for UI-Kitchen-Sink
var express        = require('express'); // "Fast, unopinionated, minimalist web framework for Node.js"
var app      = express();
var os = require('os');
var hostname = os.hostname();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// config files for UI-Kitchen-Sink
// For future db support:
//var db = require('./config/db');
// Check if port is set, if not set it to 8080
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
app.use(express.static(__dirname + '/')); // set the static files location
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('UI-Kitchen-Sink is accessible at ' + hostname+':'+port);
exports = module.exports = app; // expose app