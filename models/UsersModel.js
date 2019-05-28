var db = require('../configs/databaseconfig')


const User = db.sequelize.define('User', {
  // attributes

  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true

  },

  username: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  password: {
  	type: db.Sequelize.STRING,
  	allowNull: false

  },

  address: {
    type: db.Sequelize.STRING,
    allowNull:false
    // allowNull defaults to true
  }
}, 

{
  // options
  freezeTableName:true,
  tableName:'my_users'
}

);

User.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})

module.exports= {
User
}