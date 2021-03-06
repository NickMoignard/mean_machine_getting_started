// load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

// get an instance of the express router
var adminRouter = express.Router();

// Middleware ================================================================
adminRouter.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Route middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {
	// do validation on name here
	// more validation
	console.log('validating '+ name);

	// once validation is done save the new item in the req
	req.name = name;
	next();
});


// ===========================================================================
// admin main page. the dashboard (http://localhost:1337/admin) ==============
adminRouter.get('/', function(req, res) {
	res.send('i am the dashboard')
});
// users page. (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
	res.send('all the users!')
});

// posts page. (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
	res.send('all of the posts')
});
// ===========================================================================
// Route with parameters =====================================================
adminRouter.get('/users/:name', function(req, res) {
	res.send("hello " + req.params.name)
});

//============================================================================
// apply the routes to the application
app.use('/admin', adminRouter)

//start the server
app.listen(1337);
console.log('server is on port 1337');