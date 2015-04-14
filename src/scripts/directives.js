(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.constants',
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile', 'InlineEditConstants',
      function($compile, InlineEditConstants) {
        return {
          restrict: 'A',
          controller: 'InlineEditController',
          scope: {
            model: '=inlineEdit',
            callback: '&inlineEditCallback',
            validate: '&inlineEditValidation'
          },
          link: function(scope, element, attrs) {
            scope.model = scope.$parent.$eval(attrs.inlineEdit);

            var onBlurBehavior = attrs.inlineEditOnBlur;
            if (onBlurBehavior === InlineEditConstants.CANCEL ||
                onBlurBehavior === InlineEditConstants.SAVE) {
              scope.isOnBlurBehaviorValid = true;
              scope.cancelOnBlur = onBlurBehavior === InlineEditConstants.CANCEL;
            }

            var container = angular.element(
              '<div class="ng-inline-edit" ' +
                'ng-class="{\'ng-inline-edit--validating\': validating, ' +
                  '\'ng-inline-edit--error\': validationError}">');

            var input = angular.element(
              '<input type="text" class="ng-inline-edit__input" ' +
                'ng-disabled="validating" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" />');

            var innerContainer = angular.element(
              '<div class="ng-inline-edit__inner-container"></div>');

            // text
            innerContainer.append(angular.element(
              '<span class="ng-inline-edit__text" ' +
                (attrs.hasOwnProperty('inlineEditOnClick') ?
                  'ng-click="editText()" ' : '') +
                'ng-if="!editMode">{{model}}</span>'));

            // edit button
            if (attrs.inlineEditBtnEdit) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--edit" ' +
                  'ng-if="!editMode" ' +
                  'ng-click="editText()">' +
                    attrs.inlineEditBtnEdit +
                '</a>'));
            }

            // save button
            if (attrs.inlineEditBtnSave) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--save" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(false, false)">' +
                    attrs.inlineEditBtnSave +
                '</a>'));
            }

            // cancel button
            if (attrs.inlineEditBtnCancel) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--cancel" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(true, false)">' +
                    attrs.inlineEditBtnCancel +
                '</a>'));
            }

            container
              .append(input)
              .append(innerContainer);

            element
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
