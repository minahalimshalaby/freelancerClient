const jwt = require('jsonwebtoken');

const generateToken = (id) => {


                      return jwt.sign({id}, 'keepitsecret', {


                            expiresIn: '5m'

                      });



};

module.exports = generateToken;
