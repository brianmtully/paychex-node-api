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
      var company;

      before(function() {
        return Paychex.Companies.get('00UJ9ANUIKH2V0MTN8SH').then(function(comp){
          company = comp;
          //console.log(company);
          return company;
        })
      });

      describe('payPeriods()', function(){

        it('returns company pay periods', function(){
          return company.payPeriods().then(function(payPeriods){
            console.log(payPeriods)
            expect(payPeriods).to.be.an('array');
          })
        });


      });

      describe('payComponents()', function(){

        it('returns company pay components', function(){
          return company.payComponents().then(function(payComponents){
            console.log(payComponents)
            expect(payComponents).to.be.an('array');
          })
        });


      });

      describe('organizations()', function(){

        it('returns organizations for company', function(){
          return company.organizations().then(function(organizations){
            console.log(organizations)
            expect(organizations).to.be.an('array');
          })
        });


      });


    });

    describe('Workers', function(){


    });

    describe('Worker', function(){


    });


});
