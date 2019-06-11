const JOI = require('joi');

class ValidationHandler {
    static validate(object, schema) {
        var result = JOI.validate(object, schema);
        if (result.error === null) {
            result.invalid = false;
            result.valid = true;
            result.message = result.error;
        } else {
            result.invalid = true;
            result.valid = false;
            result.message = result.error.name + ": " + result.error.details[0].message;
        }
        return result;
    }
}

module.exports = ValidationHandler;