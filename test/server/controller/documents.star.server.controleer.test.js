/**
 * Created by Administrator on 5/30/2016.
 */


/**
 * Created by Administrator on 5/30/2016.
 */

var expect = require('chai').expect;
var controllerToTest = require('../../../controllers/documents.star.server.controller');
var serReatingObj= require('../../../config/db/documents/ratingdb');
var sinon=require("sinon");
var error=new Error("some error occured");


describe("Star controller",function () {
    describe('set star Document', function() {                                              //search document
        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"setStar");
            var req = {
                body:{
                    DOC_ID:2
                },
                session:{
                    data:{
                        id:1
                    }
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    expect(data).to.be.equal("valid");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,null,2);
            controllerToTest.setStar(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"setStar");
            var req = {
                body:{
                    DOC_ID:2
                },
                session:{
                    data:{
                        id:1
                    }
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,error,null);
            controllerToTest.setStar(req,res); // call the function to be tested
        });


        it('returns the result', function(done) {
            var req = {
                body:{
                    DOC_ID:''
                },
                session:{
                    data:{
                        id:1
                    }
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.setStar(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                body:{
                    DOC_ID:null
                },
                session:{
                    data:{
                        id:1
                    }
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.setStar(req,res); // call the function to be tested
        });
        // it('returns the result', function(done) {
        //     var req = {
        //         body:{
        //             DOC_ID:'abc'
        //         },
        //         session:{
        //             data:{
        //                 id:1
        //             }
        //         }
        //     };
        //     // we provide the response object which the controller uses
        //     var res = {
        //         end: function(data) {
        //             expect(data).to.be.equal('invalid');
        //             expect(data).to.be.a('string');
        //             done();
        //         },
        //         writeHead:function(){
        //
        //         }
        //     };
        //     controllerToTest.setStar(req,res); // call the function to be tested
        // });
    });

    describe('get star Document', function() {//search document


        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"getStar");
            var req = {
                query:{
                    DOC_ID:2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,null,{id:1,dtar:2});
            controllerToTest.getStar(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"getStar");
            var req = {
                query:{
                    DOC_ID:2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,error,null);
            controllerToTest.getStar(req,res); // call the function to be tested
        });



        it('returns the result', function(done) {
            var req = {
                query:{
                    DOC_ID:''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            
            controllerToTest.getStar(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    DOC_ID:null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.getStar(req,res); // call the function to be tested
        });
        // it('returns the result', function(done) {
        //     var req = {
        //         query:{
        //             DOC_ID:'abc'
        //         }
        //     };
        //     // we provide the response object which the controller uses
        //     var res = {
        //         end: function(data) {
        //             //expect(data).to.be.equal('invalid');
        //             console.log(data);
        //             //expect(data).to.be.an('error');
        //             done();
        //         },
        //         error:{
        //
        //         },
        //         writeHead:function(){
        //
        //         }
        //     };
        //     controllerToTest.getStar(req,res); // call the function to be tested
        // });
    });

    describe('get star info', function() {                                              //search document
        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"getStarInfo");
            var req = {
                query:{
                    id:2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    expect(data).to.be.a('string');
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,null,{id:1,dtar:2});
            controllerToTest.getRatingInfo(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(serReatingObj,"getStarInfo");
            var req = {
                query:{
                    id:2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,error,null);
            controllerToTest.getRatingInfo(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    id:''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.getRatingInfo(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    id:null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.getRatingInfo(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var req = {
                query:{
                    id:'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.getRatingInfo(req,res); // call the function to be tested
        });
    });
});

