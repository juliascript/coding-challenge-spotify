var request = require('request');

var user1 = {name: "Sean", 
			favoriteCity: "New York"};

console.log("Making GET request to /people");
request({
    url: "http://localhost:3000/people/",
    method: "GET"
}, function (error, response, body){
	console.log(body);

	console.log("Making POST request to /people");
	request({
	    url: "http://localhost:3000/api/people",
	    method: "POST",
	    json: true,   
	    body: user1
	}, function (error, response, body){
		console.log(body);
		
		console.log("Making GET request to /people/lastCreated");
		request({
		    url: "http://localhost:3000/people/lastCreated",
		    method: "GET"
		}, function (error, response, body){
			console.log(body);
			
				user1['favoriteCity'] = "Brooklyn"
				console.log("Making PUT request to /people/1 with Brooklyn");
				request({
				    url: "http://localhost:3000/people/1",
				    method: "PUT",
				    json: true,   
				    body: user1
				}, function (error, response, body){
					console.log(body);

					console.log("Making GET request to /people");
					request({
					    url: "http://localhost:3000/people/",
					    method: "GET"
					}, function (error, response, body){
						console.log(body);

						console.log("Making DELETE request to /people/1");
						request({
						    url: "http://localhost:3000/people/1",
						    method: "DELETE"
						}, function (error, response, body){
							console.log(body);

							console.log("Making GET request to /people");
							request({
							    url: "http://localhost:3000/people",
							    method: "GET"
							}, function (error, response, body){
								console.log(body);



									
									});

								
								});





					});


				});



			});

		});

});

