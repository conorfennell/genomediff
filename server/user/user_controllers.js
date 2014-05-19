"use strict";
var request = require('request');

var token = '29b8a8e54c91c428fdb0cc3cc4c8cf1a';
module.exports = exports = {
  getUser : function(req, res, next) {
    request.get({
      url     : 'https://api.23andme.com/1/user/',
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getNames : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/names/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getRisks : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/risks/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getCarriers : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/carriers/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getDrugResponses : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/drug_responses/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getTraits : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/traits/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  }
};
