var rp = require('request-promise');
rp.debug = false;

function Worker(info, config) {
  Object.assign(this, info)
  this.id = info.workerId;

  this._config = config || {};

}

Worker.prototype._getAccessToken = function(token) {
  return this._config.access_token;
}

Worker.prototype._makeRequest = function(options, callback) {

  if (options.auth) {
    delete options.auth;
    options.headers = {
      Authorization : 'Bearer ' + this._getAccessToken()
    }
  }

  options.uri = this._config.base_url + options.uri;

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

Worker.prototype.getId = function() {
  return this.id;
}

Worker.prototype.update = function(update){
  var self = this;
  var paychex = this.paychex;
  var options = {
      method : 'PATCH',
      uri: '/workers/' + this.id,
      auth: true,
      body: update,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return Object.assign(self, result.content[0]);
    } else {
      return null;
    }
  });

}

Worker.prototype.communications = function(data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/communications',
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'POST';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (options.method == 'GET') {
      return result.content;
    } else {
      if (result.content[0]){
        return result.content[0];
      } else {
        return null;
      }
    }
  });

}


Worker.prototype.communication = function(communicationId, data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/communications/' + communicationId,
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'PATCH';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (result.content[0]){
      return result.content[0];
    } else {
      return null;
    }
  });

}

Worker.prototype.deleteCommunication = function(communicationId) {
  var options = {
      method : 'DELETE',
      uri: '/workers/' + this.id + '/communications/' + communicationId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Worker.prototype.compensation = function() {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/compensation',
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Worker.prototype.payRates = function(data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/compensation/payrates',
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'POST';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (options.method == 'GET') {
      return result.content;
    } else {
      if (result.content[0]){
        return result.content[0];
      } else {
        return null;
      }
    }
  });

}

Worker.prototype.payRate = function(rateId, data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/compensation/payrates/' + rateId,
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'PATCH';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (result.content[0]){
      return result.content[0];
    } else {
      return null;
    }
  });

}

Worker.prototype.deletePayRate = function(rateId) {
  var options = {
      method : 'DELETE',
      uri: '/workers/' + this.id + '/compensation/payrates/' + rateId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}


Worker.prototype.directDeposits = function(data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/directdeposits',
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'POST';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (options.method == 'GET') {
      return result.content;
    } else {
      if (result.content[0]){
        return result.content[0];
      } else {
        return null;
      }
    }
  });

}

Worker.prototype.directDeposit = function(directDepositId, data) {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/directdeposits/' + directDepositId,
      auth: true,
      json: true
  };

  if (data) {
    options.method = 'PATCH';
    options.body = data;
  }

  return this._makeRequest(options).then(function(result){
    if (result.content[0]){
      return result.content[0];
    } else {
      return null;
    }
  });

}

Worker.prototype.deleteDirectDeposit = function(directDepositId) {
  var options = {
      method : 'DELETE',
      uri: '/workers/' + this.id + '/directdeposits/' + directDepositId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Worker.prototype.payStandards = function() {
  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/compensation/paystandards',
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    if (result.content[0]){
      return result.content[0];
    } else {
      return null;
    }
  });

}

Worker.prototype.checks = function(payPeriodId, earnings) {

  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/checks',
      auth: true,
      json: true,
      qs: {payPeriodId: payPeriodId}
  };

  if (earnings) {
    delete options.qs;
    options.method = 'POST';
    options.body = {
      workerId: this.id,
      payPeriodId: payPeriodId,
      earnings: earnings
    }
  }

  return this._makeRequest(options).then(function(result){
    if (options.method == 'GET') {
      return result.content
    } else {
      if (result.content[0]){
        return result.content[0];
      } else {
        return null;
      }
    }
  });

}


Worker.prototype.check = function(checkId) {

  var options = {
      method : 'GET',
      uri: '/workers/' + this.id + '/checks/' + checkId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    if (result.content[0]){
      return result.content[0];
    } else {
      return null;
    }
  });

}

Worker.prototype.deleteCheck = function(checkId) {

  var options = {
      method : 'DELETE',
      uri: '/workers/' + this.id + '/checks/' + checkId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}


module.exports = Worker;
