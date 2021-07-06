const express = require('express');
const bodyParser = require('body-parser');


const HttpError = require('./models/http-error');

const tasksRoutes = require('./routes/tasks-routes');
const usersRoutes = require('./routes/users-routes');

const Task =  require('./models/task');
const User =  require('./models/users');

const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {

        User.findByPk('f7139914-0dee-4846-8991-b8f4f903d9ad')
        .then(user => {

                  req.user = user;
                  next();
        })
        .catch(err => console.log(err));

});

app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);


app.use((req, res, next) => {

          const error = new HttpError('Could not found this route!!', 404);

          throw error;


});

app.use((error, req, res, next) => {

          if(res.headerSent) {

                  return next(error);

          }

          res.status(error.code || 500).json({message: error.message || 'An unknown error occured!!'});


});

Task.belongsTo(User, {constraints: true});
User.hasMany(Task);

sequelize
// .sync({force: true})
.sync()
.then(result => {

      // console.log(result);
      return User.findByPk('f7139914-0dee-4846-8991-b8f4f903d9ad');
      // app.listen(5000, console.log('Server is running on port 5000'));


}).then(user => {

      if(!user) {

          return User.create({id: '1', name: 'mina', email:'mena@gmail.com', password:'1234567'});

      }

      return user;

}).then(user => {

  console.log(user);
  app.listen(5000, console.log('Server is running on port 5000'));

}).catch(err => {

      console.log(err);

});
