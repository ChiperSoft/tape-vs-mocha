
var assert = require('assert');
var getOtherData = require('../index2').getOtherData;

describe('getOtherData', function () {

  it('returns the correct information', function () {

    var data = getOtherData();

    assert.equal(data.a, 'A');
    assert.equal(data.b, 'B');
    assert.equal(data.c, 'C');

  });

})