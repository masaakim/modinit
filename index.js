
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');

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

Modinit.prototype.template = function (prompt, modinitrc, result, options) {
  var readme = _.template(fs.readFileSync('template/readme.markdown').toString());
  var _package = _.template(fs.readFileSync('template/_package.json').toString());
  var license = _.template(fs.readFileSync('template/LICENSE').toString());
  var cmd = _.template(fs.readFileSync('template/cmd.js').toString());
  var test = _.template(fs.readFileSync('template/test.js').toString());
  var _index = fs.readFileSync('template/_index.js').toString();
  var travis = fs.readFileSync('template/travis.yml').toString();
  var gitignore = fs.readFileSync('template/gitignore').toString();

  var moduleName = prompt.moduleName;
  var moduleVarName = prompt.moduleName;

  var keywords = function (val) {
    return val.split(',').map(function (v) {
      return v.trim();
    }).filter(function (v) {
      return v.length > 0;
    });
  }(result['keywords']);

  readme = readme({
    'moduleName': moduleName,
    'description': prompt.description,
    'github': modinitrc.github,
    'author': modinitrc.author
  });

  var package_obj = {
    'moduleName': moduleName,
    'description': prompt.description,
    'github': modinitrc.github,
    'author': modinitrc.author,
    'keywords': keywords
  };
  if (options.bin) package_obj['cmd'] = true;
  else package_obj['cmd'] = false;

  _package = _package(package_obj);

  license = license({
    'author': modinitrc.author
  });

  cmd = cmd({
    'moduleName': moduleVarName
  });

  test = test({
    'testfw': modinitrc.testfw,
    'moduleName': moduleVarName
  });

  var res = {};
  res.readme = readme;
  res.readmeStyle = modinitrc.readme;
  res._package = _package;
  res.license = license;
  res._index = _index;
  res.gitignore = gitignore;
  res.test = test;
  res.moduleName = moduleName;
  res.moduleVarName = moduleVarName;
  if (options.bin) res.cmd = cmd;
  if (modinitrc.travis) res.travis = travis;

  return res;
};

Modinit.prototype.build = function (templates) {
  mkdirp(templates.moduleName, function (err) {
    if (err) throw err;
  });

  if (templates.cmd) {
    mkdirp(templates.moduleName + '/bin', function (err) {
      if (err) throw err;
    });
  }

  mkdirp(templates.moduleName + '/test', function (err) {
    if (err) throw err;
  });


  fs.writeFile(templates.moduleName + '/index.js', templates._index, function (err) {
    if (err) throw err;
  });

  fs.writeFile(templates.moduleName + '/test/test.js', templates.test, function (err) {
    if (err) throw err;
  });

  fs.writeFile(templates.moduleName + '/' + templates.readmeStyle, templates.readme, function (err) {
    if (err) throw err;
  });

  fs.writeFile(templates.moduleName + '/.gitignore', templates.gitignore, function (err) {
    if (err) throw err;
  });

  fs.writeFile(templates.moduleName + '/LICENSE', templates.license, function (err) {
    if (err) throw err;
  });

  fs.writeFile(templates.moduleName + '/package.json', templates._package, function (err) {
    if (err) throw err;
  });

  if (templates.cmd) {
    fs.writeFile(templates.moduleName + '/bin' + modulename, templates.cmd, function (err) {
      if (err) throw err;
    });
  }

  if (templates.travis) {
    fs.writeFile(templates.moduleName + '/.travis.yml', templates.travis, function (err) {
      if (err) throw err;
    });
  }

  return true;
};
