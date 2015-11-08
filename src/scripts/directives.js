(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.providers',
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile', 'InlineEditConfig', 'InlineEditConstants',
      function($compile, InlineEditConfig, InlineEditConstants) {
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
            scope.isInputTextarea = attrs.hasOwnProperty('inlineEditTextarea');

            var onBlurBehavior = attrs.hasOwnProperty('inlineEditOnBlur') ?
              attrs.inlineEditOnBlur : InlineEditConfig.onBlur;
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
              (scope.isInputTextarea ?
                '<textarea ' : '<input type="text" ') +
                'class="ng-inline-edit__input" ' +
                'ng-disabled="validating" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" ' +
                'placeholder="{{placeholder}}" />');

            var innerContainer = angular.element(
              '<div class="ng-inline-edit__inner-container"></div>');

            // text
            innerContainer.append(angular.element(
              '<span class="ng-inline-edit__text" ' +
                'ng-class="{\'ng-inline-edit__text--placeholder\': !model}" ' +
                (attrs.hasOwnProperty('inlineEditOnClick') || InlineEditConfig.editOnClick ?
                  'ng-click="editText()" ' : '') +
                'ng-if="!editMode">{{(model || placeholder)' +
                  (attrs.hasOwnProperty('inlineEditFilter') ? ' | ' + attrs.inlineEditFilter : '') +
                  '}}</span>'));

            // edit button
            var inlineEditBtnEdit = attrs.hasOwnProperty('inlineEditBtnEdit') ?
              attrs.inlineEditBtnEdit : InlineEditConfig.btnEdit;
            if (inlineEditBtnEdit) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--edit" ' +
                  'ng-if="!editMode" ' +
                  'ng-click="editText()">' +
                    inlineEditBtnEdit +
                '</a>'));
            }

            // save button
            var inlineEditBtnSave = attrs.hasOwnProperty('inlineEditBtnSave') ?
              attrs.inlineEditBtnSave : InlineEditConfig.btnSave;
            if (inlineEditBtnSave) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--save" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(false, false)">' +
                    inlineEditBtnSave +
                '</a>'));
            }

            // cancel button
            var inlineEditBtnCancel = attrs.hasOwnProperty('inlineEditBtnCancel') ?
              attrs.inlineEditBtnCancel : InlineEditConfig.btnCancel;
            if (inlineEditBtnCancel) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--cancel" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(true, false)">' +
                    inlineEditBtnCancel +
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

            attrs.$observe('inlineEditPlaceholder', function(placeholder) {
              scope.placeholder = placeholder;
            });

            scope.$watch('model', function(newValue) {
              if (!isNaN(parseFloat(newValue)) && isFinite(newValue) && newValue === 0) {
                scope.model = '0';
              }
            });
          }
        };
      }
    ]);

})(window, window.angular);
