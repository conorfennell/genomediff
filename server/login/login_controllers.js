"use strict";
var request = require('request');


module.exports = exports = {
  get : function(req, res, next) {

    request.post({
      url   : 'https://api.23andme.com/token/',
      form  : {
        grant_type    : 'authorization_code',
        client_id     : '4bb5ab70105c7a37223fd72585df3f2c',
        client_secret : '4a7821824be46fdbd05216b7284cd70c',
        code          : req.param('code'),
        redirect_uri  : 'http://localhost:9000/login/receive_code/',
        scope         : 'basic analyses'
      }
    }, function(error, response, body) {
      if (req.cookies.token1 === undefined) {
        res.cookie('token1', JSON.parse(body).access_token, { maxAge: 3000000 });
      } else {
        res.cookie('token2', JSON.parse(body).access_token, { maxAge: 3000000 });
      }
      res.redirect('/#/main/login');
    });
  }
};
