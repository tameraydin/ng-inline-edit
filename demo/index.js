'use strict';

angular
  .module('demoApp', [
    'ngAnimate',
    'ngMaterial',
    'angularInlineEdit'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  })
  .controller('demoMainController', function($scope, $timeout, $q) {
    $scope.tabData = [{
      selectedIndex: 0
    }, {
      selectedIndex: 0
    }, {
      selectedIndex: 0
    }];

    $scope.examples = [{
      model: 'An editable text',
      validator: function(newValue) {
        return !!newValue;
      }
    }];

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
