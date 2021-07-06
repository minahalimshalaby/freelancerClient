// const mysql = require('mysql2');
// const pool = mysql.createPool({
//
//       host: 'localhost',
//       user: 'root',
//       database: 'freelancer-client',
//       password: 'root'
//
// });
//
//
// module.exports = pool.promise();


//


const Sequelize = require('sequelize');

const sequelize = new Sequelize('freelancer-client', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'

});

module.exports = sequelize;
