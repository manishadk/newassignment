var usermodel = require('../models/UsersModel');
var bcrypt = require('bcrypt');
var saltRounds = 10; 

function validator(req,res,next){

usermodel.User.findOne({
	where : { username:req.body.username}
})
.then(function(result){
	console.log(result);
	if (result.dataValues != ' '){

next({"status":409, "message":"user already exists"})

	}
})
.catch(function(err){
next();
})








}

// function validator (req,res,next){
// usermodel.User.findOne({
// 	where : {username:req.body.username}
// })
// .then(function(result){
// 	console.log(result.dataValues);
// if (result.dataValues != '') {
// 	next({"status":409,"message":'username already exists'})
// }
// })
// .catch(function(err){
// 	next();
// })

// }


// function hashGenerator (req,res,next){
// bcrypt.hash(req.body.password,saltRounds)
// .then(function(hash){
// 	console.log(hash);
// req.hash = hash;
// next();

// })
// .catch(function(err){
// next({"status": 500, "message":"Couldnot Hash Password ! "});
// })
// }

// function registerUser (req,res,next){
// 	console.log(req.hash)
// usermodel.User.create({
// 	username : req.body.username,
// 	password: req.hash,
// 	address : req.body.address
// })
// .then(function(result){
// req.responseParam  = {
// 	"status":201,
// 	"message":"User Registered Successfully"
// }
// next();
// })
// .catch(function(err){
// 	console.log(err);
// 	next({"status": 500, "message":"Couldnot Register User, Database Error ! "});
// })
// }

function hashGenerator(req,res,next){

req.body.password // this is the plaintext password
bcrypt.hash(req.body.password, saltRounds)
.then(function(hash){
	console.log(hash);
	req.hashvalue = hash;
next();
})
.catch(function(err){

})


}

function registerUser (req,res,next){
usermodel.User.create({
	username : req.body.username,
	password: req.hashvalue,
	address : req.body.address
})
.then(function(result){

	next();

})
.catch(function(err){

next({"status":500, "message":"DB Error"})

})

}

module.exports = {
	registerUser,
	hashGenerator
}

// module.exports = {
// 	validator,
// 	registerUser,
// 	hashGenerator
// }
//registerUser();


