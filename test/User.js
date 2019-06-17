// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const chaiLike = require('chai-like');
// const chaiThings = require('chai-things');

// const server = require('../index');
// var serverRun;
// chai.use(chaiHttp);
// chai.use(chaiLike);
// chai.use(chaiThings);


// before(done => {
//   serverRun = server.listen(3002, done);
// });


// after(done => {
//   serverRun.close(done);
// });



// describe('Users', function(){
// 	describe('POST register', function(){
// 		it('it should register a user', function(done){
// 			chai.request(server)
// 			.post('/v1/users')
// 			.send({'username':'masdadsasdasd','address':'asdasd','password':'sdsdf'})
// 			.end(function(err,res){
// 				res.should.have.status(201);
// 				res.body.should.be.an('object');
// 			done()

// 			})

// 		})

// 		it('it should not register a user', function(done){
// 			chai.request(server)
// 			.post('/v1/users')
// 			.send({'username':'masdadsasdasd','address':'asdasd','password':'sdsdf'})
// 			.end(function(err,res){
// 				res.should.have.status(409);
// 				res.body.should.be.an('object');
// 			done()

// 			})
// 		})

// 	})

// 	// describe('PUT users', function(){
// 		// userid = 84 ; 
// 		// it('it should edit an user',function(done){
// 		// 	chai.request(server)
// 		// 	.put('/v1/users'+userid )
// 		// 	.send({'address':'ewsasdasdasd'})
// 		// 	.end(function(err,res){
// 		// 		res.should.have.status(201);
// 		// 		done()
// 		// 	})
// 		// })

// 		// describe('get  users', function(){ 
// 		// it('it should get all teh users',function(done){
// 		// 	chai.request(server)
// 		// 	.get('/v1/users' )
// 		// 	.set({'authorization':'Bearer sdfsdfsdfffsdfsdfdsfdsfsdf'})
// 		// 	.end(function(err,res){
// 		// 		res.should.have.status(201);
// 		// 		done()
// 		// 	})
// 		// })
// 	// })
// })
























// // before(function(done){
// // 	serverRun = server.listen(3000,done)
// // })






