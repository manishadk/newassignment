// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const baseUrlRoutes = 'http://localhost:3001';
// // console.log(test);
// const should = chai.should();
// chai.use(require('chai-like'));
// chai.use(require('chai-things'));
// chai.use(chaiHttp);
// // let server = require('../index')

// const server = require('../index.js');
// // server.on('listened', function() {
// //   console.log('The server is running!');
// // });

// // before( done =>
// // {
// //   server.on( "listened", function()
// //   {
// //     done()
// //   })
// // })

// // before(function (done) {
//   serverr = server.listen(3000, done);

// // });
// let serverr

// before(done => {
//   serverr = server.listen(3000, done);
// });

// after(done => {
//   serverr.close(done);
// });

// describe('User', function() {
//   before(function(done) {
//     User.sync({ force : true }) // drops table and re-creates it
//       .success(function() {
//         done(null);
//       })
//       .error(function(error) {
//         done(error);
//       });
//   });

// describe('Users', function() {
//       describe('POST user register', function() {

//         it('it should register a single user', function(done) {
//           chai.request(server)
//             .post('/v1/users')
//             .send({
//               "username": 'x1wsdsswamxcazzz',
//               "address": 'whazz',
//               "password": 'whazz'
//             })
//             .end(function(err, res) {
//               res.should.have.status(201);
//               res.body.should.be.an('object');
//               res.body.should.have.property('message').eql('user was registered');
//               done();
//             })

//         })

//         it('it should not register an already registered user', function(done) {
//           chai.request(server)
//             .post('/v1/users')
//             .send({
//               "username": 'wwwhhhaazzz',
//               "address": 'whazz',
//               "password": 'whazz'
//             })
//             .end(function(err, res) {
//               res.should.have.status(409);
//               res.should.be.an('object');
//               res.body.should.have.property('message');
//               done();
//             })
//         })
//       })

//       // describe('POST user login', function(){
//       //   it('it should login a user with valid credentials and return token', function(done){
//       //     .post('/v1/auth')
//       //   })
//       // })

//       describe('PUT user', function() {
//         userId = 84;
//         it('it should edit the user with new values', function(done) {
//           chai.request(server)
//             .put('/v1/users/' + userId)
//             .send({
//               'address': 'testAddress'
//             })
//             .end(function(err, res) {
//               res.should.have.status(201);
//               done()
//             })
//         })


//       })
// })


//       // /*
//       //  * Test the /GET route
//       //  */
//       // // describe('users', () => {
//       // //   describe('/GET users', () => {
//       // //       it('it should GET all the users', (done) => {
//       // //         chai.request(baseUrlRoutes)
//       // //             .get('/v1/users')
//       // //             .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMjEiLCJhY2Nlc3NMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NTg4MDU1MDksImV4cCI6MTU1ODg0MTUwOX0.RIkfkHOia2oOMKzFP3XYil14vR8gKa-iWixM7nfdlws')
//       // //             .end((err, res) => {
//       // //               // console.log(err);
//       // //               // console.log(res);
//       // //                   res.should.have.status(200);
//       // //                   res.body.should.be.an('array');
//       // //                   res.body.should.all.have.property('id');
//       // //                   res.body.should.all.have.property('username');
//       // //                   res.body.should.all.have.property('address');
//       // //                   res.body.length.should.be.above(0);
//       // //               done();
//       // //             });
//       // //       });
//       // //   });

//       // // });
//       // // expect(result).to.have.deep.property('[0].title', 'expected_title_1');



//       // // https://stackoverflow.com/questions/18941736/ensuring-express-app-is-running-before-each-mocha-test

//       // // https://mrvautin.com/ensure-express-app-started-before-tests/