const express = require('express');
// const bodyParser = require('body-parser');

const { check } = require('express-validator');



const usersControllers = require('../controllers/users-controllers');



const router = express.Router();










router.get('/', usersControllers.getUsers);





router.post('/signup',[

                      check('name')
                      .not()
                      .isEmpty(),
                      check('email')
                      .normalizeEmail()
                      .isEmail(),
                      check('password')
                      .isLength({min: 6})

                        ], usersControllers.signup);


router.post('/login', [

                      check('email')
                      .normalizeEmail()
                      .isEmail(),
                      check('password')
                      .isLength({min: 7})

                    ], usersControllers.login);


module.exports = router;
