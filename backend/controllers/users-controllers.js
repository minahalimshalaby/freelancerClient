const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const generateToken = require('../util/generateToken.js');

const { validationResult } = require('express-validator');

const User =  require('../models/users');
//
//
// const DUMMY_USERS = [
//            {
//
//              id: 'u1',
//              name: 'Mina Halim',
//              email: 'test@test.com',
//              password: 'testers'
//
//
//             }
//
//           ];




const getUsers = (req, res, next) => {

        // res.json({users: DUMMY_USERS});
        User.findAll().then(results =>  res.json({users: results})).catch(err => console.log(err));

};

const signup = (req, res, next) => {

          const errors = validationResult(req);
          if(!errors.isEmpty()) {

                throw new HttpError('Invalid inputs passed, Please check your data!.', 422);

          }

          const { name, email, password } = req.body;
          //
          User.findAll(
            {where: {email: `${email}`}}
          ).then(u => {

            console.log('user', u);
            if (u[0]) {


                  return next(
                  new HttpError('Could not create user, email already exists.!!', 422)
                  );


            }

          }).catch(err => console.log(err));
          //
          // if(hasUser) {
          //
          //         throw new HttpError('Could not create user, email already exists.!!', 422);
          //
          // }

          const createdUser = {

                  id: uuidv4(),
                  name,
                  email,
                  password


               };



                  User.create({

                    id: `${createdUser.id}`,
                    name,
                    email,
                    password


                  }).then(result =>  res.status(201).json({user: result})).catch(err => console.log(err));



          // DUMMY_USERS.push(createdUser);
          //
          // res.status(201).json({user: createdUser});


};


const login = (req, res, next) => {

          const errors = validationResult(req);
          if(!errors.isEmpty()) {

                throw new HttpError('Invalid inputs passed, Please check your data!.', 422);

          }


        const { email, password } = req.body;




        User.findAll(
          {where: {email: email}}
        ).then(u => {

          console.log('user111', u);
          if (!u[0] || u[0].dataValues.password !== password || u[0].dataValues.email !== email ) {


          return next(new HttpError('Could not identify user, Credentials seems to be wrong', 401));


          }
      return res.json({userId: u[0].id, userName: u[0].name, userEmail: u[0].email, userPassword: u[0].password, token: generateToken(u[0].id)});
        }).catch(err => console.log(err));



          // const identifiedUser = DUMMY_USERS.find(u => u.email === email);
          //
          // if (!identifiedUser || identifiedUser .password !== password) {
          //   throw new HttpError('Could not identify user, Credentials seems to be wrong', 401);
          // }
          //
          //   res.json({message: 'Logged In'});

};



exports.getUsers = getUsers;

exports.signup = signup;

exports.login = login;
