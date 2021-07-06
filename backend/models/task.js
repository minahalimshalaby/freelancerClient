const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Task = sequelize.define('task', {

  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true

  },
  title:  {
    type: Sequelize.STRING,
    allowNull: false


  },
  description: {
   type: Sequelize.STRING,
   allowNull: false


 },
 price: {
  type: Sequelize.DOUBLE,
  allowNull: false


},

creator: {
  type: Sequelize.STRING,
  allowNull: false

},




});

module.exports = Task;
