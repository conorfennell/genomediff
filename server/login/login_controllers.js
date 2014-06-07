"use strict";
var request = require('request');


module.exports = exports = {
  get : function(req, res, next) {

    request.post({
      url   : 'https://api.23andme.com/token/',
      form  : {
        grant_type    : 'authorization_code',
        client_id     : process.env.TWENTY_THREE_CLIENT_ID,
        client_secret : process.env.TWENTY_THREE_SECRET,
        code          : req.param('code'),
        redirect_uri  : process.env.URL + '/login/receive_code/',
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
