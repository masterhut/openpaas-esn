'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');

describe('The activitystreams controller module', function() {

  it('get should return HTTP 400 when uuid is not set', function(done) {
    var mock = {
      model: function() {
        return {
          getFromActivityStreamID: function(uuid, cb) {
            return cb(new Error());
          }
        };
      }
    };
    this.mongoose = mockery.registerMock('mongoose', mock);
    var activitystreams = require(this.testEnv.basePath + '/backend/webserver/controllers/activitystreams');
    var req = {
      params: {}
    };

    var res = {
      json: function(code) {
        expect(code).to.equal(400);
        done();
      }
    };

    activitystreams.get(req, res);
  });

  it('get should return HTTP 500 when Domain returns error', function(done) {
    var mongooseMock = {
      model: function() {
        return {
          getFromActivityStreamID: function(uuid, cb) {
            return cb(new Error());
          }
        };
      }
    };
    this.mongoose = mockery.registerMock('mongoose', mongooseMock);
    var activitystreams = require(this.testEnv.basePath + '/backend/webserver/controllers/activitystreams');
    var req = {
      params: {
        uuid: '12345'
      }
    };

    var res = {
      json: function(code) {
        expect(code).to.equal(500);
        done();
      }
    };
    activitystreams.get(req, res);
  });

  it('get should return HTTP 500 timeline module returns error', function(done) {
    var domain = {
      _id: '123456789'
    };

    var mongooseMock = {
      model: function() {
        return {
          getFromActivityStreamID: function(uuid, cb) {
            return cb(null, domain);
          }
        };
      }
    };
    this.mongoose = mockery.registerMock('mongoose', mongooseMock);

    var timelineMock = {
      query: function(options, cb) {
        return cb(new Error());
      }
    };
    mockery.registerMock('../../core/activitystreams', timelineMock);

    var activitystreams = require(this.testEnv.basePath + '/backend/webserver/controllers/activitystreams');
    var req = {
      params: {
        uuid: '12345'
      },
      query: {}
    };

    var res = {
      json: function(code) {
        expect(code).to.equal(500);
        done();
      }
    };
    activitystreams.get(req, res);
  });

  it('get should return HTTP 404 if domain can not be found', function(done) {
    var mongooseMock = {
      model: function() {
        return {
          getFromActivityStreamID: function(uuid, cb) {
            return cb(null, null);
          }
        };
      }
    };
    this.mongoose = mockery.registerMock('mongoose', mongooseMock);
    var activitystreams = require(this.testEnv.basePath + '/backend/webserver/controllers/activitystreams');
    var req = {
      params: {
        uuid: '12345'
      },
      query: {}
    };

    var res = {
      json: function(code) {
        expect(code).to.equal(404);
        done();
      }
    };
    activitystreams.get(req, res);
  });

  it('get should return timeline as JSON', function(done) {
    var domain = {
      _id: '123456789'
    };

    var timeline = [
      {_id: 1},
      {_id: 2}
    ];

    var mongooseMock = {
      model: function() {
        return {
          getFromActivityStreamID: function(uuid, cb) {
            return cb(null, domain);
          }
        };
      }
    };
    this.mongoose = mockery.registerMock('mongoose', mongooseMock);

    var timelineMock = {
      query: function(options, cb) {
        return cb(null, timeline);
      }
    };
    mockery.registerMock('../../core/activitystreams', timelineMock);

    var activitystreams = require(this.testEnv.basePath + '/backend/webserver/controllers/activitystreams');
    var req = {
      params: {
        uuid: '12345'
      },
      query: {}
    };

    var res = {
      json: function(result) {
        expect(result).to.be.an.array;
        expect(result).to.deep.equal(timeline);
        done();
      }
    };
    activitystreams.get(req, res);
  });
});
