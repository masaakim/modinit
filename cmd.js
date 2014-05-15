#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var prompt = require('prompt');
var pkg = require('./package.json');

program.version(pkg.version)

program
  .command('create')
  .description('create .modinitrc')
  .action(function () {
    prompt.message = '[?]'.magenta;
    prompt.delimiter = ':';

    prompt.start();

    prompt.get({
      properties: {
        github: {
          description: "GitHub username".magenta
        },
        author: {
          description: "Author".magenta
        },
        mail: {
          description: "Mail".magenta
        },
        testfw: {
          description: "Testing framework".magenta
        },
        travis: {
          description: "Use travis?(Y/n)".magenta,
          default: 'Y'
        },
        readme: {
          description: "README style".magenta,
          default: 'README.md'
        },
        license: {
          description: "License".magenta,
          default: 'MIT'
        }
      }
    }, function (err, result) {
      var travis;
      if (result.travis === "Y") travis = true;
      else travis = false;

      var modinitrc = {
        "github": result.github,
        "author": result.author,
        "mail": result.mail,
        "testfw": result.testfw,
        "travis": travis,
        "license": result.license
      };

      console.log("");
      console.log("GitHub username: " + result.github.cyan);
      console.log("Author: " + result.author.cyan);
      console.log("Mail: " + result.mail.cyan);
      console.log("Testing framework: " + result.testfw.cyan);
      console.log("Use travis: " + result.travis.cyan);
      console.log("README style: " + result.readme.cyan);
      console.log("License: " + result.license.cyan);
      console.log("");

      fs.writeFile('modinit.json', JSON.stringify(modinitrc, null, " "), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Create '.modinitrc' in your home directory.");
        }
      });
    });
  });

program.parse(process.argv);
