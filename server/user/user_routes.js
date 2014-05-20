'use strict'

var controller = require('./user_controllers.js');

module.exports = exports = function (router) {
  router.route('/')
    .get(controller.getUser);

  router.route('/names/')
    .get(controller.getNames);

  router.route('/risks/')
    .get(controller.getRisks);

  router.route('/carriers/')
    .get(controller.getCarriers);

  router.route('/traits/')
    .get(controller.getTraits);

  router.route('/drug_responses/')
    .get(controller.getDrugResponses);

  router.route('/neanderthal/')
    .get(controller.getNeanderthal);
};
