
var fs = require('fs');

module.exports = Modinit;

function Modinit (res) {
  if (!(this instanceof Modinit)) return new Modinit(res);

  this.github = res.github;
  this.author = res.author;
  this.mail = res.mail;
  this.travis = res.travis;
  this.testfw = res.testfw;
  this.travis = res.travis;
  this.readme = res.readme;
  this.license = res.license;
}

Modinit.prototype.create = function () {
  if (this.travis === "Y") var travis = true;
  else var travis = false;

  return {
    "github": this.github,
    "author": this.author,
    "mail": this.mail,
    "testfw": this.testfw,
    "travis": travis,
    "readme": this.readme,
    "license": this.license
  };
  /*

  fs.writeFile('modinit.json', JSON.stringify(modinitrc, null, " "), function (err) {
    if (err) {
      console.log(err);
      return false;
    }
  });
  return true;
 */
};
