// check if the user is registered or not 

var usermodel = require('../models/UsersModel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function validator(req, res, next) {

	usermodel.User.findOne({

			where: {
				username: req.body.username
			}
		})
		// use had already registered
		.then(function(result) {

			// store the user's hash password obtained from database in a variable and pass it through req object
			req.userHashPassword = result.dataValues.password
			next();

		})
		// err denotes the user was not found - > user was not registerd 
		.catch(function(err) {

			next({
				"status": 400,
				"message": "Please register first to login"
			})

		})


}

function check(req, res, next) {

	// comapre's first parameter password obtained from login form i.e. req.body.password
	// second parameter the value passed from previous function (from database) through req object
	bcrypt.compare(req.body.password, req.userHashPassword)
		.then(function(result) {
			next();

		})
		.catch(function(err) {
			next({
				"status": 400,
				"message": "Password Doesnot match"
			})
		})
}


function jwtTokenGen(req, res, next) {

	jwt.sign({
			username: req.body.username,
			accessLevel: 'superadmin'
		}, 'thisissecretkey', {
			expiresIn: "10h"
		},

		function(err, token) {
			if(err != null || undefined ){
			console.log(err)
			next({"status":401, "message":"Unauthorized token"})
			}
			else{
				req.genToken=token;
				next();
			// console.log(token)	
			}

		}
	)

}


function tokenVerify(req,res,next){
	console.log(req.headers.authorization)
	let token = req.headers.authorization.slice(6,req.headers.authorization.length)

	jwt.verify(token,'thisissecretkey',function(err,decoded){
		console.log(decoded);
		if(err !=null){
			next({status:500,message:err.message})
		console.log(err);
		}
		else{
			next();
		}
	})
}

module.exports = {
	validator,
	check,
	jwtTokenGen,
	tokenVerify
}