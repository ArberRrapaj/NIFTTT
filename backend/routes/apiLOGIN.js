const jwt = require('jsonwebtoken')
var Crypto = require('crypto')

var iterations = 2500
var keylength = 128
var digest = 'sha512'

module.exports = function (router, response, DB, jwt) {

  router.post("/login", function (req, res) {
    DB.query('SELECT password, salt FROM Users WHERE email = ?', req.body["email"], function (err, results) {
      if (err) res.send(err);
      else {
        if (results.length == 0) {
          res.send("There is no user with that mail");
          return;
        }
        const user = results[0];

        // hashing user's salt and password with the same amount of iterations, key length and digest
        Crypto.pbkdf2(req.body['password'], user.salt, iterations, keylength, digest, function (err, encodedPassword) {
          if (err) callback(err, 'Internal Error, try again later please', true)
          else {

            var inputPassword = Buffer.from(encodedPassword, 'binary').toString('base64')
            if (inputPassword === user.password) response.success('Successfully logged in', res);// callback(false, 'Successfully logged in')
            else res.send('The Username-Password-Combination doesn\'t match'); // callback(true, 'The Username-Password-Combination doesn\'t match', false)
          }
        })

      }
    });

  });

  router.post("/register", function (req, res) {
    var salt;
    var hashedPassword;
    const password = req.body['registerPassword'];
    const email = req.body['email'];

    DB.query("SELECT email FROM Users WHERE email = ?;", email, function (err, result) {
      if (err) response.databaseError(res);
      else {
        console.log(result);
        if (result.length == 0) {

          Crypto.randomBytes(64, function (err, buf) { // creating a unique salt for a particular user
            if (err) response.serverError('There was a server-error', res);
            else {
              // console.log('random shit generated\n\n');
              salt = buf.toString('base64');
              // console.log(salt);

              // hashing user's salt and password with 2500 iterations, a length of 128 (172 characters) and sha512 digest
              Crypto.pbkdf2(password, salt, iterations, keylength, digest, function (err, encodedPassword) {
                if (err) response.serverError('There was a server-error', res);
                else {
                  // console.log('password generated\n\n');
                  hashedPassword = Buffer.from(encodedPassword, 'binary').toString('base64');
                  // console.log(hashedPassword);
                  var user = {
                    email: email,
                    password: hashedPassword,
                    salt: salt,
                    firstName: req.body['registerFirstname'],
                    icecream: req.body['registerIcecream']
                  }
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
