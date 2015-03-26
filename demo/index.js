'use strict';

angular
  .module('demoApp', [
    'angularInlineEdit'
  ])
  .controller('demoMainController', function($scope, $timeout, $q) {
    $scope.demoModel = 'An editable text';
    $scope.demoChangeListener = function(newValue) {
      alert('Accepted value: ' + newValue);
    };
    $scope.demoValidator = function(newValue) {
      var defer = $q.defer();

      if (newValue.length > 5) {
        defer.resolve();
      } else {
        defer.reject();
      }

      return defer.promise;
    };
  });
