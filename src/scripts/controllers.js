(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function() {
          $scope.inputValue = $scope.model;
          $scope.editMode = true;
          $timeout(function() {
            $scope.editInput[0].focus();
            $document.bind('click', $scope.onDocumentClick);
          }, 0);
        };

        $scope.applyText = function(cancel, byDOMClick) {
          if (!cancel && $scope.inputValue && $scope.model !== $scope.inputValue) {
            $scope.model = $scope.inputValue;
            $scope.callback({
              newValue: $scope.model
            });
          }

          $scope.editMode = false;
          if (byDOMClick) {
            $scope.$apply();
          }
          $document.unbind('click', $scope.onDocumentClick);
        };

        $scope.onInputKeyup = function(event) {
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
        };

        $scope.onDocumentClick = function(event) {
          if (event.target !== $scope.editInput[0]) {
            $scope.applyText($scope.cancelOnBlur, true);
          }
        };
      }
    ]);

})(window, window.angular);
