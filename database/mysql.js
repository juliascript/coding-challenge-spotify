var mysql = require('mysql');

var port = process.env.PORT || 3000;

function Database(){
	this.connection = mysql.createConnection({
	  host     : 'localhost',
	  port		: port,
	  user     : 'me',
	  password : 'secret',
	  database : 'my_db'
	});

	this.addPerson = function (person) {
		this.connection.connect(function(err){
			if (err) {
			    console.error('error connecting: ' + err.stack);
				return;
			}

			console.log('person: ' + JSON.stringify(person));
			console.log('connected as id ' + connection.threadId);
		});
	};
}

// will pass the db object around bc of require cache
module.exports = new Database();

// use as var db = require('./mysql')
// db.addPerson(person);