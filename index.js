
var fs = require('fs');

module.exports = Modinit;

function Modinit () {
  if (!(this instanceof Modinit)) return new Modinit();
}

Modinit.prototype.create = function (res) {
  if (res.travis === "Y") var travis = true;
  else var travis = false;

  return {
    "github": res.github,
    "author": res.author,
    "mail": res.mail,
    "testfw": res.testfw,
    "travis": travis,
    "readme": res.readme,
    "license": res.license
  };
};

Modinit.prototype.template = function (prompt, modinitrc, options) {
  var readme = _.template(fs.readFileSync('template/readme.markdown').toString());
  var _package = _.template(fs.readFileSync('template/_package.json').toString());
  var license = _.template(fs.readFileSync('template/LICENSE').toString());
  var cmd = _.template(fs.readFileSync('template/cmd.js').toString());

  var moduleName = _.slugify(prompt.moduleName);
  var moduleVarName = _.camelize(prompt.moduleName);

  readme = readme({
    'moduleName': moduleName,
    'description': prompt.description,
    'github': modinitrc.github,
    'author': modinitrc.author
  });

  _package = _package({
    'moduleName': moduleName,
    'description': prompt.description,
    'github': modinitrc.github,
    'author': modinitrc.author
  });

  license = license({
    'author': modinitrc.author
  });

  cmd = cmd({
    'moduleVarName': moduleVarName
  });

  var res = {};
  res.readme = readme;
  res._package = _package;
  res.license = license;
  res.cmd = cmd;

  return res;
};
