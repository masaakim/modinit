
var test = require('colored-tape');
var Modinit = require('../');

test('create', function (t) {
  var prompt = {
    "github": "morishitter",
    "author": "Masaaki Morishita",
    "mail": "ikasama3.0@gmail.com",
    "testfw": "tape",
    "travis": "Y",
    "readme": "readme.markdown",
    "license": "MIT"
  };

  var modinit = new Modinit(prompt);
  var result = modinit.create();

  var expected = {
    "github": "morishitter",
    "author": "Masaaki Morishita",
    "mail": "ikasama3.0@gmail.com",
    "testfw": "tape",
    "travis": true,
    "readme": "readme.markdown",
    "license": "MIT"
  };

  t.same(result, expected);

  t.end();
});
