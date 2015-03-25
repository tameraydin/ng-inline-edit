(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile',
      function($compile) {
        return {
          restrict: 'A',
          controller: 'InlineEditController',
          scope: {
            model: '=inlineEdit',
            callback: '&inlineEditCallback'
          },
          link: function(scope, element, attrs) {
            scope.model = scope.$parent.$eval(attrs.inlineEdit);
            if (attrs.hasOwnProperty('inlineEditCancelOnBlur')) {
              scope.cancelOnBlur = true;
            }

            var input = angular.element(
              '<input type="text" class="ng-inline-edit__input" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" />');
            var container = angular.element(
              '<div class="ng-inline-edit__container"></div>');

            container
              // text
              .append(angular.element(
                '<span class="ng-inline-edit__text" ' +
                  'ng-hide="editMode">{{model}}</span>'))
              // button
              .append(angular.element(
                '<a class="ng-inline-edit__button" ' +
                  'ng-show="model && !editMode" ' +
                  'ng-click="editText()">' + (attrs.inlineEditButtonHtml || '') + '</a>'));

            element
              .append(input)
              .append(container);

            scope.editInput = input;

            attrs.$observe('inlineEdit', function(newValue) {
              scope.model = scope.$parent.$eval(newValue);
              $compile(element.contents())(scope);
            });
          }
        };
      }
    ]);

})(window, window.angular);
