'use strict'

var controller = require('./login_controllers.js');

module.exports = exports = function (router) {
  router.route('/receive_code')
    .get(controller.get)
};
