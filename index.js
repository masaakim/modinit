
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
  var _index = fs.readFileSync('template/_index.js').toString();
  var travis = fs.readFileSync('template/travis.yml').toString();
  var test = fs.readFileSync('template/test.js').toString();

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
  res.readmeStyle = prompt.readme;
  res._package = _package;
  res.license = license;
  res.cmd = cmd;
  res._index = _index;
  res.test = test;
  res.moduleName = moduleName;
  res.moduleVarName = moduleVarName;
  if (modinitrc.travis) res.travis = travis;

  return res;
};

Modinit.prototype.build = function (templates) {
  mkdirp(templates.moduleName, function (err) {
    if (err) throw err;
  });

  mkdirp(templates.moduleName + '/bin', function (err) {
    if (err) throw err;
  });

  mkdirp(templates.moduleName + '/test', function (err) {
    if (err) throw err;
  });


  fs.writeFile(moduleName + '/index.js', templates._index, function (err) {
    if (err) throw err;
  });

  fs.writeFile(moduleName + '/bin' + modulename, templates.cmd, function (err) {
    if (err) throw err;
  });

  fs.writeFile(moduleName + '/test/test.js', templates.test, function (err) {
    if (err) throw err;
  });

  fs.writeFile(moduleName + '/' + templates.readmeStyle, templates.readme, function (err) {
    if (err) throw err;
  });

  fs.writeFile(moduleName + '/LICENSE', templates.license, function (err) {
    if (err) throw err;
  });

  fs.writeFile(moduleName + '/package.json', templates._package, function (err) {
    if (err) throw err;
  });

  if (templates.travis) {
    fs.writeFile(moduleName + 'index.js', templates._index, function (err) {
      if (err) throw err;
    });
  }

  return true;
};
