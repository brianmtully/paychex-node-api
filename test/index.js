var Paychex = require('../lib')
var should = require('chai').should();
var expect = require('chai').expect;
var nock = require('nock');

var companies;

describe('Paychex', function(){

  before(function() {
    return Paychex.init({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      sandbox : true
    });
  });

    describe('Companies', function(){

      describe('list()', function(){

        it('returns an array of companies', function(){
          return Paychex.Companies.list().then(function(companies){
            //console.log(companies)
            expect(companies).to.be.an('array');
          })
        });


      });

      describe('get()', function(){

        it('returns company 00UJ9ANUIKH2V0MTN8SH', function(){
          return Paychex.Companies.get('00UJ9ANUIKH2V0MTN8SH').then(function(company){
            //console.log(company)
            expect(company).to.be.an('Object');
            expect(company.companyId).to.equal('00UJ9ANUIKH2V0MTN8SH');
          })
        });




      });

      describe('getByDisplayId()', function(){

        it('returns company 00UJ9ANUIKH2V0MTN8SH', function(){
          return Paychex.Companies.getByDisplayId('11061545').then(function(company){
            //console.log(company)
            expect(company).to.be.an('Object');
            expect(company.companyId).to.equal('00UJ9ANUIKH2V0MTN8SH');
          })
        });


      });


    });


    describe('Company', function(){


    });

    describe('Workers', function(){


    });

    describe('Worker', function(){


    });


});