var Company = require('./company');

function Companies(paychex) {
  this.paychex = paychex;
}

Companies.prototype.list = function(){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri: '/companies',
      auth: true,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    var companies = [];
    result.content.forEach(function(c){
      var company = new Company(c, paychex.config);
      companies.push(company);
    })

    return companies;
  });

}


Companies.prototype.get = function(companyId){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri: '/companies/' + companyId,
      auth: true,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return new Company(result.content[0], paychex.config);
    } else {
      return null;
    }
  });

}

Companies.prototype.getByDisplayId = function(displayId){
  var paychex = this.paychex;
  var options = {
      method : 'GET',
      uri: '/companies',
      qs: {
        displayid : displayId
      },
      auth: true,
      json: true
  };

  return paychex._makeRequest(options).then(function(result){
    if (result.content[0]){
      return new Company(result.content[0], paychex.config);
    } else {
      return null;
    }
  });


}


module.exports = Companies;
