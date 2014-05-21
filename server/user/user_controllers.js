"use strict";
var request = require('request');

module.exports = exports = {
  getUser : function(req, res, next) {
    request.get({
      url     : 'https://api.23andme.com/1/user/',
      headers : {
        'Authorization' : 'Bearer ' + req.param('token')
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
        'Authorization' : 'Bearer ' + req.param('token')
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
        'Authorization' : 'Bearer ' + req.param('token')
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
        'Authorization' : 'Bearer ' + req.param('token')
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
        'Authorization' : 'Bearer ' + req.param('token')
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
        'Authorization' : 'Bearer ' + req.param('token')
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getNeanderthal : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/neanderthal/' + profileId,
      headers : {
        'Authorization' : 'Bearer ' + req.param('token')
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  },
  getAncestry : function(req, res, next) {
    var profileId = req.param('profileId') + '/';
    request.get({
      url     : 'https://api.23andme.com/1/ancestry/' + profileId + '?threshold=0.10',
      headers : {
        'Authorization' : 'Bearer ' + req.param('token')
      }
    }, function(error, response, body) {
      debugger;
      console.log(error, body);
      res.json(JSON.parse(body));
      res.end();
    });
  }
};
