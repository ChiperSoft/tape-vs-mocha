
var test = require('tape').test;
var getOtherData = require('../index2').getOtherData;

test('getOtherData', function (troot) {

  test('returns the correct information', function (t) {
    var data = getOtherData();

    t.equal(data.a, 'A');
    t.equal(data.b, 'B');
    t.equal(data.c, 'C');

    t.end();
  });

  troot.end();

})