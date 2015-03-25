'use strict';

describe('angularInlineEdit', function() {

  beforeEach(module('angularInlineEdit'));

  var compiler,
    scope,
    rootScope,
    controller,
    button,
    element;

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
      });
    });

    it('initial values should be set', function() {
      expect(scope.editMode).toBeFalsy();
    });
  });
});
