#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var prompt = require('prompt');
var pkg = require('./package.json');
var Modinit = require('./');

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
      if (err) console.log(err);

      if (modinit.create(result)) {
        console.log("");
        console.log("Create '.modinitrc'.");
      }
    });
  });

program.parse(process.argv);
