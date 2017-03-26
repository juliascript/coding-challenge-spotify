var request = require('request');

var user1 = {name: "Julia", 
			favoriteCity: "Brooklyn"};

var user2 = {name: "Jul", 
			favoriteCity: "NYC"};

request({
    url: "http://localhost:3000/api/people",
    method: "POST",
    json: true,   
    body: user1
}, function (error, response, body){
	console.log(body);
	

	request({
	    url: "http://localhost:3000/api/people",
	    method: "POST",
	    json: true,   
	    body: user2
	}, function (error, response, body){
		console.log(body);
		

		request({
		    url: "http://localhost:3000/people/",
		    method: "GET"
		}, function (error, response, body){
			console.log(body);

			request({
			    url: "http://localhost:3000/people/1",
			    method: "GET"
			}, function (error, response, body){
				console.log(body);

				user1['favoriteCity'] = "NYC"

				request({
				    url: "http://localhost:3000/people/1",
				    method: "PUT",
				    json: true,   
				    body: user1
				}, function (error, response, body){
					console.log(body);


					request({
					    url: "http://localhost:3000/people/1",
					    method: "DELETE"
					}, function (error, response, body){
						console.log(body);

						request({
						    url: "http://localhost:3000/people/",
						    method: "GET"
						}, function (error, response, body){
							console.log(body);

							request({
							    url: "http://localhost:3000/people/2",
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

	});
