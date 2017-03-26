
// TO DO Make a GET request to retrieve the object created in the previous request
// so, just have to keep track of the last person obj created with a post or put

// it's fine to require body parser in any route that accepts post reqs
//   because require caches the result the first time it's run
var bodyParser = require('body-parser');

var Person = require('../models/person');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var db = require('../database/local');

// -?- do I need to add separate paths for json and urlencoded post req? 
// yes, because each route returns either json or renders html


function binarySearchUsers(uid){
	usersArray = db['users'];
	var lowerBound = 0;
	var upperBound = usersArray.length;

	while (lowerBound < upperBound) {
		var middleIndex = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
		middleItem = usersArray[middleIndex]['uid'];

		if (middleItem == uid){
			return middleIndex;
		} else if (middleItem > uid) {
			upperBound = middleIndex;
		} else if (middleItem < uid) {
			lowerBound = middleIndex;
		}
	}
	return null;
}


function createNewUser(reqBody){
	var highestID = 0;
	if (db['users'].length > 0){
		// but what if a put request is made to id 100 .. the next call would create id 101
		lastIndex = (db['users'].length - 1);
		highestID = Number(db['users'][lastIndex]['uid']); 
	}

	var uid = highestID + 1; // I would advise against this because I could
						// potentially loop over this and get all 
						// info in the db

	var name = reqBody['name'];
	var city = reqBody['favoriteCity'];
	// create the person object
	var person = new Person(uid, name, city);
	db['lastCreatedUser'] = person.information;
	return person.information;
}

module.exports = function(app) {

	app.get('/people', function(req, res) {
		// all users
		
		if (!db['users']){
			return res.status(204);
		} 
		var people = db['users']; 
		// return all users 
		res.status(200).send(JSON.stringify(people));

	});

	app.post('/people', urlencodedParser, function(req, res) {
		if (!req.body) return res.status(400);

		var person = createNewUser(req.body);
		db.users.push(person);

		res.render('person', {	NAME: person.firstName,
								ID: person.uid, 
								CITY: person.favoriteCity 
							});

	});

	app.post('/api/people', jsonParser, function(req, res) {
		if (!req.body) return res.status(400);

		var person = createNewUser(req.body);
		
		// add person obj to db
		db.users.push(person);

		// return the newly created obj, 201
		res.status(201).send(JSON.stringify(person));

	});

	app.get('/people/lastCreated', function(req, res) {
		// gets last created user 
		return res.send(JSON.stringify(db.lastCreatedUser));
	});

	app.get('/people/:uid', function(req, res) {
		if (db['users'].length == 0){
			return res.status(404);
		}

		var uid = req.params.uid;

		// binary search users array to find person with uid
		var personIndex = binarySearchUsers(uid);

		if (personIndex === null) {
			return res.status(404);
		}

		var person = db['users'][personIndex];

		return res.send(JSON.stringify(person));
	});

	app.put('/people/:uid', jsonParser, function(req, res) {
		var uid = req.params.uid;

		// binary search users array to find person with uid
		var personIndex = binarySearchUsers(uid);

		if (personIndex === null) {
			// create a new user with this uid and req.body
			var person = createNewUser(req.body);

			// update uid to the one specified in the path
			person.uid = Number(uid);

			// add person obj to db
			db.users.push(person);

			res.status(201).send(JSON.stringify(person));
		}
		else {
			var person = db['users'][personIndex];
			
			// PUT replaces the object that was there
			db['users'][personIndex] = req.body;
			db['users'][personIndex]['uid'] = uid;

			res.status(200).send(JSON.stringify(person));
		}
	});

	app.delete('/people/:uid', function(req, res) {
		if (!db['users']){
			return res.status(204);
		}

		var uid = req.params.uid;

		// binary search users array to find person with uid
		var personIndex = binarySearchUsers(uid);

		if (personIndex === null) {
			return res.status(404); // should this be 400?
		}

		var person = db['users'][personIndex];

		// delete person from db
		db['users'].splice(personIndex, 1); // removes the person obj from index

		// send person that was deleted
		res.status(200).send(JSON.stringify(person));
	});
}