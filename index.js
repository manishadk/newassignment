const express = require('express');
const application = new express();
const bodyParser = require('body-parser');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// put this in the beginning of your app.js/server.js
let initCallback;

// debugger;

var swaggerDefinition = {

	info: {
		// API informations (required)
		title: 'Hotel Assignment', // Title (required)
		version: 'v1', // Version (required)
		description: 'API Documetation', // Description (optional)
	},
	host: 'localhost:3001', // Host (optional)
	basePath: '/', // Base path (optional)
securityDefinitions : {
	bearerAuth : {
		type: 'apiKey',
		name: 'authorization',
		scheme : 'bearer',
		in : 'header'
	}
}

}

var options = {
	swaggerDefinition,
	apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options);

application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



var usermodel = require('./models/UsersModel')

var userController = require('./controllers/UsersController');

var authController = require('./controllers/AuthenticationController');



// // var authController = require('./controllers/AuthController');

//this is the first middleware - application middleware , all routes hit this middleware first
application.use(function(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,Authorization');
	next(); // next passes to another application middleware 
})

// this will parse the json data in form body that arrives from client-browser (ajax)
application.use(bodyParser.json());

/**
 * @swagger
 * /v1/users:
 *   post:
 *     tags:
 *      - Users
 *     name: Resigister name
 *     summary: This API registers a single  user
 *     description: Register a single user
 *     produces: application/json
 *     parameters:
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          address:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *       201:
 *         description: User was registered
 *       409:
 *        description: username already exists
 *       500:
 *        description: DB Error
 *
 */
application.post('/v1/users', userController.validator, userController.hashGenerator, userController.registerUser, function(req, res) {

	res.status(201);
	res.send({
		"message": "user was registered"
	})

})

/**
* @swagger
* /v1/users:
*   get:
*     tags:
*       - Users
*     name: Find user
*     summary: Finds a user
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A single user object
*       401:
*         description: No auth token
*/
application.get('/v1/users', authController.tokenVerify, function(req, res) {


	usermodel.User.findAll({
			attributes: ['id', 'username', 'address']
		})
		.then(function(result) {
			// response can be sent from within the middleware 
			res.status(200);
			res.json(result);
		})
		.catch(function(err) {

		})
})

// get single user
application.get('/v1/users/:id', function(req, res) {

	usermodel.User.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(200);
			res.json(result)
		})
		.catch(function(err) {

		})
})
/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          address:
 *           type:string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
application.put('/v1/users/:id', function(req, res) {

	usermodel.User.update({
			username: req.body.username,
			address: req.body.address
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "User Edited succesfuly"
			})
		})
		.catch(function(err) {

		})
})

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
application.delete('/v1/users/:id', function(req, res, next) {
	console.log(req.params.id)

	usermodel.User.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			if (result == 1) {

				res.status(200)
				res.send({
					"message": "deleted succesfully"
				});
			} else {
				next({
					"status": 500,
					"message": "Couldnot delete"
				})

			}
		})
		.catch(function(err) {
			next({
				"status": 500,
				"message": "Couldnot delete"
			})
		})
})


/**
* @swagger
* /v1/auth:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a user
*     consumes:
*       - application/json
*     parameters:
*       - name: user
*         in: body
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*         required:
*           - username
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       403:
*         description: Username and password don't match
*/
application.post('/v1/auth', authController.validator, authController.check, authController.jwtTokenGen, function(req, res) {

	res.status(200);
	res.send({
		"message": "token generated succesfuly !",
		"token": req.genToken
	})

	//status // json , send as object or json 
	// console.log(req.genToken)
	// res.status(200);
	// res.send({"message":"You have succesfuly logged in"})
	//send token to browser

})



application.use(function(err, req, res, next) {

	// console.log(err.status);
	// console.log(err.message);
	console.log(err);
	res.status(err.status);
	res.send({
		"message": err.message
	})


})

// if(!module.parent){
// application.listen(3001);
// }


console.log('app running')

application.listen(3001);


module.exports = application;





