
var test = require('tape').test;
var Promise = require('bluebird');
var getData = require('../index').getData;

test('getData', function (troot) {

  test('opens connection and returns result', function (t) {
    t.plan(4);

    var QUERY = "SELECT * FROM some_table";
    var expected = [
      {col_a: 1, col_b: 2},
      {col_a: 3, col_b: 4},
      {col_a: 5, col_b: 6}
    ];

    var mockDB = {
      openConnection: function () {
        t.pass('getData opened a connection');
        return Promise.resolve();
      },
      closeConnection: function () {
        t.pass('getData closed the connection');
      },
      query: function (sql) {
        t.equal(sql, QUERY, 'getData called query and passed in the expected SQL');
        return Promise.resolve(expected);
      }
    }

    getData(mockDB, QUERY)
      .then(function (actual) {
        t.same(actual, expected, 'getData returned the correct results');
      })
      .catch(t.fail)
      .then(t.end);

  });

  troot.end();

});

