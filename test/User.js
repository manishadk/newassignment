const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server = require('../index');
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);


before(done => {
  serverRun = server.listen(3002, done);
});


after(done => {
  serverRun.close(done);
});



describe('Users', function(){
	describe('POST register', function(){
		it('it should register a user', function(done){
			chai.request(server)
			.post('/v1/users')
			.send({'username':'k1kk231111','address':'asdasd','password':'sdsdf'})
			.end(function(err,res){
				res.should.have.status(201);
				res.body.should.be.an('object');
			})

			done()
		})

	})
})
























// before(function(done){
// 	serverRun = server.listen(3000,done)
// })






