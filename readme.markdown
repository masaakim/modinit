# modinit  [![Build Status](https://travis-ci.org/morishitter/modinit.svg)](https://travis-ci.org/morishitter/modinit)

Initialize node packaged module.

## How to use

Create `modinit.json` in your home directory.

```shell
$ modinit create
```

Ex:

```json
{
  "github": "morishitter",
  "author": "Masaaki Morishita",
  "mail": "ikasama3.0@gmail.com",
  "license": "MIT",
  "readme": "readme.markdown",
  "test": "tape",
  "travis": true
}
```

And, initialize module.

```shell
$ modinit init <module-name>
```

##License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
