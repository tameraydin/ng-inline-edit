(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.validationError = false;
        $scope.validating = false;
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function(inputValue) {
          $scope.inputValue = (typeof inputValue === 'string') ?
            inputValue : $scope.model;
          $scope.editMode = true;
          $timeout(function() {
            $scope.editInput[0].focus();
            $document.bind('click', $scope.onDocumentClick);
          }, 0);
        };

        $scope.applyText = function(cancel, byDOM) {
          $scope.validationError = false;

          if (cancel) {
            $scope.editMode = false;
            if (byDOM) {
              $scope.$apply();
            }

          } else if ($scope.model !== $scope.inputValue) {
            var inputValue = $scope.inputValue;

            $scope.validating = true;
            if (byDOM) {
              $scope.$apply();
            }

            $scope.validate({
              newValue: $scope.inputValue
            })
              .then(function() {
                $scope.model = $scope.inputValue;
                $scope.callback({
                  newValue: $scope.model
                });

                $scope.editMode = false;
              })
              .catch(function() {
                $scope.validationError = true;
                $scope.editText(inputValue);
              })
              .finally(function() {
                $scope.validating = false;
              });
          }

          $document.unbind('click', $scope.onDocumentClick);
        };

        $scope.onInputKeyup = function(event) {
          if (!$scope.validating) {
            switch (event.keyCode) {
              case 13: // ENTER
                $scope.applyText(false, false);
                break;
              case 27: // ESC
                $scope.applyText(true, false);
                break;
              default:
                break;
            }
          }
        };

        $scope.onDocumentClick = function(event) {
          if (!$scope.validating) {
            if (event.target !== $scope.editInput[0]) {
              $scope.applyText($scope.cancelOnBlur, true);
            }
          }
        };
      }
    ]);

})(window, window.angular);
