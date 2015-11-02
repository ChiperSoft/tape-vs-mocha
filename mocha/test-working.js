
var assert = require('assert');
var Promise = require('bluebird');
var sinon = require('sinon');
var getData = require('../index').getData;

describe('getData', function () {

  it('opens connection and returns result', function (done) {

    var QUERY = "SELECT * FROM some_table";
    var expected = [
      {col_a: 1, col_b: 2},
      {col_a: 3, col_b: 4},
      {col_a: 5, col_b: 6}
    ];

    var mockDB = {
      openConnection: sinon.spy(function () {
        assert.ok(true, 'getData opened a connection');
        return Promise.resolve();
      }),
      closeConnection: sinon.spy(function () {
        assert.ok(true, 'getData closed the connection');
      }),
      query: sinon.spy(function (sql) {
        assert.equal(sql, QUERY, 'getData called query and passed in the expected SQL');
        return Promise.resolve(expected);
      })
    }

    getData(mockDB, QUERY)
      .then(function (actual) {
        assert.deepEqual(actual, expected, 'getData returned the correct results');
        assert.ok(mockDB.openConnection.calledOnce, 'openConnection was called');
        assert.ok(mockDB.closeConnection.calledOnce, 'closeConnection was called')
        assert.ok(mockDB.query.calledOnce, 'query was called')
        done();
      })
      .catch(done)

  });

});
