var rp = require('request-promise');
var companies = require('./companies');
var workers = require('./workers');
rp.debug = false;

function Paychex(config) {

  this.config = config || {};

  this.Companies = new companies(this);
  this.Workers = new workers(this);

}

Paychex.prototype._setAccessToken = function(token) {
  this.config.access_token = token;
}

Paychex.prototype._getAccessToken = function(token) {
  return this.config.access_token;
}

Paychex.prototype._makeRequest = function(options, callback) {

  if (options.auth) {
    delete options.auth;
    options.headers = {
      Authorization : 'Bearer ' + this._getAccessToken()
    }
  }

  options.uri = this.config.base_url + options.uri;

  return rp(options)
      .then(function (result) {
        //console.log(result)
        if (callback) {
          return callback(result);
        } else {
          return result;
        }
      }).catch(function(err){
        //console.log(err.error)
        throw err.error;
      })

}


Paychex.prototype.init = function(config) {
  var self = this;

  var client_id = config.client_id;
  var client_secret = config.client_secret;
  delete config.client_id;
  delete config.client_secret;

  if (!client_id || !client_secret) {
    var msg = 'Missing Client ID/Client Secret';
    throw new Error(msg);
  }

  this.config = Object.assign(this.config, config);


  if (this.config.sandbox) {
    this.config.base_url = 'https://sandbox.api.paychex.com'
  } else {
    this.config.base_url = 'https://api.paychex.com'
  }

  var options = {
      method : 'POST',
      uri: '/auth/oauth/v2/token',
      qs: {
        client_id : client_id,
        client_secret : client_secret,
        grant_type : 'client_credentials'
      },
      headers: {
      },
      json: true // Automatically parses the JSON string in the response
  };
  return self._makeRequest(options,function(result){
    if(result.access_token){
      self._setAccessToken(result.access_token)
    }
    return;
  })

}

Paychex.prototype.Paychex = Paychex;





var paychex = module.exports = exports = new Paychex;
