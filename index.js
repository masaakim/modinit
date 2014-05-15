
var fs = require('fs');

module.exports = Modinit;

function Modinit (res) {
  if (!(this instanceof Modinit)) return new Modinit(res);

  this.github = res.github;
  this.author = res.author;
  this.mail = res.mail;
  if (res.travis === "Y") this.travis = true;
  else this.travis = false;
  this.testfw = res.testfw;
  this.travis = res.travis;
  this.readme = res.readme;
  this.license = res.license;
}

Modinit.prototype.create = function () {
  var modinitrc = {
    "github": this.github,
    "author": this.author,
    "mail": this.mail,
    "testfw": this.testfw,
    "travis": this.travis,
    "readme": this.readme,
    "license": this.license
  };

  fs.writeFile('modinit.json', JSON.stringify(modinitrc, null, " "), function (err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log("");
      console.log("GitHub username: " + result.github.cyan);
      console.log("Author: " + result.author.cyan);
      console.log("Mail: " + result.mail.cyan);
      console.log("Testing framework: " + result.testfw.cyan);
      console.log("Use travis: " + result.travis.cyan);
      console.log("README style: " + result.readme.cyan);
      console.log("License: " + result.license.cyan);
      return true;
    }
  });
};
