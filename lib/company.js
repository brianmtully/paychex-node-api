var rp = require('request-promise');
var Worker = require('./worker');

rp.debug = false;

function Company(info, config) {
  Object.assign(this, info)
  this.id = this.companyId;

  this._config = config || {};

}

Company.prototype._getAccessToken = function(token) {
  return this._config.access_token;
}

Company.prototype._makeRequest = function(options, callback) {

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


Company.prototype.getId = function() {
  return this.id;
}

/* searchStartDate
searchEndDate*/
Company.prototype.payPeriods = function(query){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/payperiods',
      auth: true,
      json: true
  };

  if (query) {
    options.qs = query;
  }

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.payComponents = function(){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/paycomponents',
      auth: true,
      json: true
  };


  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.organizations = function(){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/organizations',
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.organization = function(organizationId){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/organizations/' + organizationId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.jobTitles = function(){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/jobtitles',
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.jobTitle = function(jobTitleId){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/jobtitles/' + jobTitleId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.workerStatuses = function(){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/workerstatuses',
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}

Company.prototype.workerStatus = function(workerStatusId){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/workerstatuses/' + workerStatusId,
      auth: true,
      json: true
  };

  return this._makeRequest(options).then(function(result){
    return result.content;
  });

}


/*
givenName
familyName
legalLastFour

searchStartDate
searchEndDate
*/

Company.prototype.workers = function(query){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri:'/companies/' + this.id + '/workers',
      auth: true,
      json: true
  };

  if (query) {
    options.qs = query;
  }

  return paychex._makeRequest(options).then(function(result){
    var workers = [];
    result.content.forEach(function(w){
      var worker = new Worker(w, paychex.config);
      workers.push(worker);
    })

    return workers;
  });

}

Company.prototype.getWorkerByEmployeeId = function(employeeId){

  var options = {
      method : 'GET',
      uri: '/companies/' + this.id + '/workers',
      qs: {
        employeeId : employeeId
      },
      auth: true,
      json: true
  };
  return this.paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return new Worker(result.content[0], paychex.config);
    } else {
      return null;
    }
  });

}


module.exports = Company;
