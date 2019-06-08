const JOI = require('joi');

module.exports = {
    user: JOI.object().keys({
      "id": JOI.number().integer().required(),
      "firstName": JOI.string().max(100).required(),
      "lastName": JOI.string().max(100).required(),
      "email": JOI.string().max(350).required().allow('', null),
      "password": JOI.string().max(100).required()
    }),
    rule: JOI.object().keys({
      'id': JOI.number().integer(),
      'label': JOI.string().max(50).required(),
      'automationsTotal': JOI.number().integer().required(),
      'automationsMonth': JOI.number().integer().required(),
      'triggerId': JOI.string().required(),
      'actionId': JOI.string().required(),
      'triggerPayload': JOI.object().required(),
      'actionPayload': JOI.object().required(),
    })
}
