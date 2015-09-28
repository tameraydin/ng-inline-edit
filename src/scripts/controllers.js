(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.placeholder = '';
        $scope.validationError = false;
        $scope.validating = false;
        $scope.isOnBlurBehaviorValid = false;
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function(inputValue) {
          $scope.editMode = true;
          $scope.inputValue = (typeof inputValue === 'string') ?
            inputValue : $scope.model;

          $timeout(function() {
            $scope.editInput[0].focus();
            if ($scope.isOnBlurBehaviorValid) {
              $document.bind('click', $scope.onDocumentClick);
            }
          }, 0);
        };

        $scope.applyText = function(cancel, byDOM) {
          var inputValue = $scope.inputValue; // initial input value
          $scope.validationError = false;

          function _onSuccess() {
            $scope.model = inputValue;
            $scope.callback({
              newValue: inputValue
            });

            $scope.editMode = false;
          }

          function _onFailure() {
            $scope.validationError = true;
            $timeout(function() {
              $scope.editText(inputValue);
            }, 0);
          }

          function _onEnd(apply) {
            $scope.validating = false;
            if (apply && byDOM) {
              $scope.$apply();
            }
          }

          if (cancel || $scope.model === inputValue) {
            $scope.editMode = false;
            if (byDOM) {
              $scope.$apply();
            }

          } else {
            $scope.validating = true;
            if (byDOM) {
              $scope.$apply();
            }

            var validationResult = $scope.validate({
                newValue: $scope.inputValue
              });

            if (validationResult && validationResult.then) { // promise
              validationResult
                .then(_onSuccess)
                .catch(_onFailure)
                .finally(_onEnd);

            } else if (validationResult ||
                typeof validationResult === 'undefined') {
              _onSuccess();
              _onEnd(true);

            } else {
              _onFailure();
              _onEnd(true);
            }
          }

          if ($scope.isOnBlurBehaviorValid) {
            $document.unbind('click', $scope.onDocumentClick);
          }
        };

        $scope.onInputKeyup = function(event) {
          if (!$scope.validating) {
            switch (event.keyCode) {
              case 13: // ENTER
                if ($scope.isInputTextarea) {
                  return;
                }
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
