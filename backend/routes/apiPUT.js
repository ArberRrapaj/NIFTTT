module.exports = function (router, response, DB, Validator, Schemas) {

    router.put('/users/:email', function (req, res) {
        response.success("Thanks for using users/:email, there will be something here very soon!", res);
    });

    router.put("/rules/:id", function (req, res) {
        response.success("Thanks for using rules/:id, there will be something here very soon!", res);
    });

    return router;
}
