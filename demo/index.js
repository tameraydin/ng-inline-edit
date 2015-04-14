'use strict';

angular
  .module('demoApp', [
    'ngMaterial',
    'angularInlineEdit'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  })
  .controller('demoMainController', function($scope, $timeout, $q) {
    $scope.tabData = {
      selectedIndex : 0
    };

    $scope.demoModel = 'An editable text';
    $scope.demoChangeListener = function(newValue) {
      alert('Accepted value: ' + newValue);
    };
    $scope.demoValidator = function(newValue) {
      var defer = $q.defer();

      // $timeout(function() {
      if (newValue.length > 5) {
        defer.resolve();
      } else {
        defer.reject();
      }
      // }, 2000);

      return defer.promise;
    };
  });
