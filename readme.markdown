# modinit  [![Build Status](https://travis-ci.org/morishitter/modinit.svg)](https://travis-ci.org/morishitter/modinit)

Initialize node packaged module.

## Installation

```shell
$ npm install -g modinit
```

## How to use

Create `modinit.json` in current directory.

`modinit.json` is configuration file to initialize your node modules.

```shell
$ modinit create
```

Ex:

```json
{
  "github": "morishitter",
  "author": "Masaaki Morishita",
  "mail": "morishitter.0@gmail.com",
  "license": "MIT",
  "readme": "readme.md",
  "changelog": "changelog.md",
  "travis": true
}
```


And, initialize module based on your `modinit.json`.

```shell
$ modinit init <module-name>
```

Rename module name:

```shell
$ modinit rename <new-module-name>
```

##License

The MIT License (MIT)

Copyright (c) 2014-2015 Masaaki Morishita
