var Worker = require('./worker');

function Workers(paychex) {
  this.paychex = paychex;

}

/*
givenName
familyName
legalLastFour

searchStartDate
searchEndDate
*/

Workers.prototype.list = function(companyId, query){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri:'/companies/' + companyId + '/workers',
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


Workers.prototype.get = function(workerId){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri: '/workers/' + workerId,
      auth: true,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return new Worker(result.content[0], paychex.config);
    } else {
      return null;
    }
  });

}

Workers.prototype.update = function(workerId, update){
  var paychex = this.paychex;
  var options = {
      method : 'PATCH',
      uri: '/workers/' + workerId,
      auth: true,
      body: update,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return new Worker(result.content[0], paychex.config);
    } else {
      return null;
    }
  });

}

Workers.prototype.getByEmployeeId = function(companyId, employeeId){

  var options = {
      method : 'GET',
      uri: '/companies/' + companyId + '/workers',
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

module.exports = Workers;
