const JOI = require('joi');

class ValidationHandler {
    static validate(object, schema) {
        var result = JOI.validate(object, schema);
        if (result.error === null) {
            return {invalid: false, valid: true, message: result.error};
        } else {
            return {invalid: true, valid: false, message: result.error.name + ": " + result.error.details[0].message};
        }
    }
}

module.exports = ValidationHandler;