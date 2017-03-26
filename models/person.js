// id and name (express) are keywords

function Person(uid, firstName, favoriteCity){
	uid = uid.toString();
	// this.obj = {};
	this.information = { 'uid': uid,
				'firstName': firstName, 
				'favoriteCity': favoriteCity};

	// this.uid = uid;
	// this.firstName = firstName;
	// this.favoriteCity = favoriteCity;
}

module.exports = Person;