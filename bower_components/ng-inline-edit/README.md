# ng-inline-edit [![Build Status](http://img.shields.io/travis/tameraydin/ng-inline-edit/master.svg?style=flat-square)](https://travis-ci.org/tameraydin/ng-inline-edit) [![Code Climate](http://img.shields.io/codeclimate/github/tameraydin/ng-inline-edit.svg?style=flat-square)](https://codeclimate.com/github/tameraydin/ng-inline-edit/dist/ng-inline-edit.js) [![Coverage Status](https://img.shields.io/coveralls/tameraydin/ng-inline-edit/master.svg?style=flat-square)](https://coveralls.io/r/tameraydin/ng-inline-edit?branch=master)

[Demo](http://tamerayd.in/ng-inline-edit/)

## Usage

Install **ng-inline-edit** via [Bower](http://bower.io):
```bash
bower install ng-inline-edit --production
```

Include main files:
```html
<link rel="stylesheet" href="bower_components/ng-inline-edit/dist/ng-inline-edit.min.css">
<script src="bower_components/ng-inline-edit/dist/ng-inline-edit.min.js"></script>
```

Include ``angularInlineEdit`` module as a dependency into your app:
```javascript
angular
  .module('yourApp', [
    'angularInlineEdit'
  ]);
```

Pass your model to ``inline-edit`` attribute on your HTML element and provide a callback function to listen changes:
```html
<span inline-edit="yourModel" inline-edit-callback="yourChangeListener(newValue)"></span>
<!-- with optional attributes:
  inline-edit-button-html="Edit"
  inline-edit-cancel-on-blur
-->
```

## Development

1. Clone the repo or [download](https://github.com/tameraydin/ng-inline-edit/archive/master.zip).
2. ``npm install && bower install``
3. Setup E2E testing environment: ``npm install -g protractor && webdriver-manager update --standalone``
4. Run ``gulp watch`` and open [http://localhost:8080/demo/index.html](http://localhost:8080/demo/index.html)
5. Use ``gulp test-unit`` or ``gulp test-e2e`` to execute your tests
6. Finally, be sure that selenium driver is up: ``webdriver-manager start`` and run ``gulp build``

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)

## TODO

- Add more unit tests
