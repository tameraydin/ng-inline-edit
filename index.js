'use strict';

angular
  .module('demoApp', [
    'angularInlineEdit'
  ])
  .controller('demoMainController', function($scope) {
    $scope.demoModel = 'An editable text';
    $scope.demoChangeListener = function(newValue) {
      alert(newValue);
    };
  });