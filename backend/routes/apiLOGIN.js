const jwt = require('jsonwebtoken')
var Crypto = require('crypto')

var iterations = 2500
var keylength = 128
var digest = 'sha512'

module.exports = function (router, response, DB, jwt, Validator, Schemas) {

  router.post("/login", function (req, res) {
    var login = {
      email: req.body['email'],
      loginPassword: req.body['loginPassword'],
    }
    const validation = Validator.validate(login, Schemas.login);
    if (validation.invalid) {
      response.badRequestError(validation.message, res);
      return;
    } else login = validation.value;

    DB.query('SELECT password, salt FROM Users WHERE email = ?', login.email, function (err, results) {
      if (err) response.databaseError(res);
      else {
        if (results.length == 0) {
          response.notFoundError('There is no user with that mail', res);
          return;
        }
        const user = results[0];

        // hashing user's salt and password with the same amount of iterations, key length and digest
        Crypto.pbkdf2(login.password, user.salt, iterations, keylength, digest, function (err, encodedPassword) {
          if (err) response.serverError('There was a server-error', res);
          else {
            var inputPassword = Buffer.from(encodedPassword, 'binary').toString('base64')
            if (inputPassword === user.password) response.success('Successfully logged in', res);// callback(false, 'Successfully logged in')
            else response.unauthorizedError('The Username-Password-Combination doesn\'t match', res); // callback(true, 'The Username-Password-Combination doesn\'t match', false)
          }
        })

      }
    });

  });

  router.post("/register", function (req, res) {
    var user = {
      email: req.body['email'],
      registerPassword: req.body['registerPassword'],
      registerFirstname: req.body['registerFirstname'],
      registerIcecream: req.body['registerIcecream']
    }
    const validation = Validator.validate(user, Schemas.user);
    if (validation.invalid) {
      response.badRequestError(validation.message, res);
      return;
    } else user = validation.value;

    DB.query("SELECT email FROM Users WHERE email = ?;", user.email, function (err, result) {
      if (err) response.databaseError(res);
      else {
        console.log(result);
        if (result.length == 0) {

          Crypto.randomBytes(64, function (err, buf) { // creating a unique salt for a particular user
            if (err) response.serverError('There was a server-error', res);
            else {
              // console.log('random shit generated\n\n');
              const salt = buf.toString('base64');
              // console.log(salt);

              // hashing user's salt and password with 2500 iterations, a length of 128 (172 characters) and sha512 digest
              Crypto.pbkdf2(user.password, salt, iterations, keylength, digest, function (err, encodedPassword) {
                if (err) response.serverError('There was a server-error', res);
                else {
                  // console.log('password generated\n\n');
                  user.password = Buffer.from(encodedPassword, 'binary').toString('base64');
                  user.salt = salt;
                  DB.query("INSERT INTO Users SET ?;", user, function (err, result) {
                    if (err) response.databaseError(res);
                    else response.success('Successfully registered', res);
                  });
                }
              })
            }
          })
        } else response.badRequestError("There is already a user with that email", res);

      }

    });

  });

};
