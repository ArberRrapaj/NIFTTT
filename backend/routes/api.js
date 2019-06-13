var express = require('express'),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    fs = require('fs'),
    response = require('../utilities/ResponseHandler'),
    Validator = require('../utilities/ValidationHandler'),
    Schemas = require('../utilities/Schemas'),
    path = require('path'),
    DB = require('../db/DBConnector'),
    loginCert = fs.readFileSync('cert/loginRS256.key'),
    cookieParser = require("cookie-parser")(),
    cors = require("cors")();

// require('../bin/eventChecker')(DB);
// add Login-Routes before the login-check
router.use(cookieParser)
router.use(cors)
require("./apiLOGIN.js")(router, response, DB, jwt, Validator, Schemas, loginCert);

/**
 * Secures the API to be only accessed by logged in people.
 */
router.use("/", function (req, res, next) {
    console.log('Checking LoginToken...');
    // Check header or url parameters or post parameters for token.
    var loginToken = req.cookies["authtoken"] || req.headers['authtoken'] || req.body['authtoken'] || req.query['authtoken'] || "";
    // Verfity token with supplied certificate.
    jwt.verify(loginToken, loginCert, function (err, decoded) {
        if (err) {
            console.log('Login-Token is invalid!');
            // next();
            response.unauthorizedError("Failed to authenticate loginToken.", res);
        } else {
            // Save the user information in req.user
            req.user = { email: decoded.email, firstName: decoded.firstName, icecream: decoded.icecream };
            console.log('Login-Token is valid!');
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
