module.exports = function (router, response, DB, Validator, Schemas) {

    router.put('/users/:email', function (req, res) {
        const validation = Validator.validate(req.params["email"], Schemas.email);
        if (validation.invalid) {
            response.badRequestError(validation.message, res);
            return;
        } else req.params["email"] = validation.value;

        // const email = req.params["email"];
        response.success("Thanks for using PUT on users/:email, there will be something here very soon, maybe!", res);
    });

    router.put("/rules/:id", function (req, res) {
        const body = req.body;
        var rule = {
            id: req.params["id"],
            name: body['name'],
            triggerPlatform: body['triggerPlatform'],
            actionPlatform: body['actionPlatform'],
            triggerPayload: body['triggerPayload'],
            actionPayload: body['actionPayload'],
            active: body['active'],
            user: body['user']
        }
        const validation = Validator.validate(rule, Schemas.rule);
        console.log(rule);
        if (validation.invalid) {
            response.badRequestError(validation.message, res);
            return;
        } else rule = validation.value;
        console.log(validation);
        // Check if the rule with that id even exists
        DB.query("SELECT id FROM Rules WHERE id = ?;", req.params["id"], function (err, result) {
            if (err) response.databaseError(res);
            else {
                if (result.length != 0) {
                    // Check if the user is valid
                    DB.query("SELECT email FROM Users WHERE email = ?;", rule['user'], function (err, result) {
                        if (err) response.databaseError(res);
                        else {
                            if (result.length != 0) {
                                /*
                                // Check if there is already a rule with that name
                                DB.query("SELECT id FROM Rules WHERE name = ?;", rule['name'], function (err, result) {
                                    if (err) response.databaseError(res);
                                    else {
                                        if (result.length == 0) {
                                            DB.query("UPDATE Rules SET ? WHERE id = ?", [rule, req.params["id"]], function (err, result) {
                                                if (err) response.databaseError(res);
                                                else response.success('Successfully updated rule', res);
                                            });
                                        } else response.badRequestError('There is already a rule with that name', res);
                                    }
                                })
                                */
                                DB.query("UPDATE Rules SET ? WHERE id = ?", [rule, req.params["id"]], function (err, result) {
                                    if (err) response.databaseError(res);
                                    else response.success('Successfully updated rule', res);
                                });
                            } else response.notFoundError('There is no user with that email', res);
                        }
                    });
                } else response.notFoundError('There is no rule with that id', res);
            }
        });

    });

    return router;
}
