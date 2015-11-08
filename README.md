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
<span inline-edit="yourModel"></span>
<!-- with optional attributes:
  inline-edit-callback="yourListener(newValue)"
  inline-edit-validation="yourValidator(enteredValue)"
  inline-edit-placeholder="Type a value..."
  inline-edit-filter="currency"
  inline-edit-btn-edit="Click to edit"
  inline-edit-btn-save="Save me"
  inline-edit-btn-cancel="Nevermind"
  inline-edit-on-blur="cancel" // 'cancel' or 'save'
  inline-edit-on-click
  inline-edit-textarea // uses <textarea> instead <input> & disables Enter key submit
-->
```

## Development

See the instructions at [ng-pack](https://github.com/tameraydin/ng-pack#usage).

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)
