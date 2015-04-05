'use strict';

describe('angularInlineEdit', function() {

  beforeEach(module('angularInlineEdit'));

  var compiler,
    scope,
    rootScope,
    controller,
    button,
    element,
    mock = {
      callback: function() {
        return true;
      },
      validate: function() {
        return true;
      }
    };

  describe('InlineEditController', function() {

    beforeEach(function() {
      inject(function($injector, _$rootScope_, _$controller_) {
        rootScope = _$rootScope_;
        controller = _$controller_;
        scope = _$rootScope_.$new();

        controller('InlineEditController', {
          $scope: scope,
          $rootScope: rootScope
        });

        spyOn(mock, 'callback').and.callThrough();
        spyOn(mock, 'validate').and.callThrough();
      });
    });

    it('initial values should be set', function() {
      expect(scope.editMode).toBeFalsy();
      expect(scope.validationError).toBeFalsy();
      expect(scope.validating).toBeFalsy();
      expect(scope.cancelOnBlur).toBeFalsy();
      expect(scope.inputValue).toBe('');
    });

    it('editText() should work', function() {
      scope.model = 'a text';

      scope.editText();
      expect(scope.editMode).toBeTruthy();
      expect(scope.inputValue).toBe(scope.model);

      scope.editText('x');
      expect(scope.inputValue).toBe('x');
    });

    describe('applyText()', function() {

      it('should work with a valid entry', function() {
        scope.validate = mock.validate;
        scope.callback = mock.callback;
        scope.model = 'first';
        scope.editText('second');

        scope.applyText();
        expect(scope.model).toBe('second');
        expect(mock.validate).toHaveBeenCalled();
        expect(mock.callback).toHaveBeenCalled();

        scope.editText('third');
        scope.applyText(true);
        expect(scope.model).toBe('second');
        expect(mock.validate.calls.count()).toEqual(1);
        expect(mock.callback.calls.count()).toEqual(1);
      });

      it('should work with an invalid entry', function() {
        scope.validate = function() {
          return false;
        };
        scope.callback = mock.callback;
        scope.model = 'first';
        scope.editText('second');

        scope.applyText();
        expect(scope.model).toBe('first');
        expect(mock.callback).not.toHaveBeenCalled();
      });

      // TODO
      // - should work with promises
    });
  });

  // TODO
  // - directive
});
