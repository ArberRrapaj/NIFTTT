var express = require('express'),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    fs = require('fs'),
    response = require('../utilities/ResponseHandler'),
    DB = require('../db/DBConnector');
// certLogin = fs.readFileSync('cert/login.cer'),

// add Login-Routes before the login-check
require("./apiLOGIN.js")(router, response, DB, jwt);

/**
 * Secures the API to be only accessed by logged in people.
 */
router.use("/", function (req, res, next) {
    console.log('Checking LoginToken...');
    // Check header or url parameters or post parameters for token.
    var loginToken = req.headers['authorization'] || req.body.token || req.query.token || "";
    // Verfity token with supplied certificate.
    jwt.verify(loginToken, certLogin, function (err, decoded) {
        if (err) {
            // console.log('Login-Token is invalid!');
            next(); // response.unauthorizedError("Failed to authenticate token.", res);
        } else {
            // Save the user information in req.user
            req.user = { id: decoded.uid, email: decoded.emailAddress, firstName: decoded.firstName, lastName: decoded.lastName };
            // console.log('Login-Token is valid!');
            next();
        }
    });
});

// REST Routes
require("./apiGET.js")(router, response, DB, Validator, Schemas);
require("./apiPOST")(router, response, DB, Validator, Schemas);
require("./apiPUT")(router, response, DB, Validator, Schemas);
require("./apiDELETE")(router, response, DB, Validator, Schemas);

module.exports = router;
