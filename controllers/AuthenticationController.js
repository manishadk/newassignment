// check if the user is registered or not 

var usermodel = require('../models/UsersModel');
var bcrypt = require('bcrypt');
function validator (req,res,next){

usermodel.User.findOne({

	where:{ username : req.body.username}
})
// use had already registered
.then(function(result){

// store the user's hash password obtained from database in a variable and pass it through req object
req.userHashPassword = result.dataValues.password
	next();

})
// err denotes the user was not found - > user was not registerd 
.catch(function(err){

	next({"status" :400 , "message": "Please register first to login"})

})


}

function check(req,res,next){

 // comapre's first parameter password obtained from login form i.e. req.body.password
 // second parameter the value passed from previous function (from database) through req object
bcrypt.compare(req.body.password,req.userHashPassword)
.then(function(result){
	next();

})
.catch(function(err){
	next({"status":400, "message" : "Password Doesnot match"})
})
}

module.exports = {
	validator,
	check
}