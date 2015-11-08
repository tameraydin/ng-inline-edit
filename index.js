'use strict';

angular
  .module('demoApp', [
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
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
    }, {
      model: 'Click here and delete me',
      placeholder: 'Type your value here',
      callback: function(newValue) {
        console.log('value of your model is now: ' + newValue);
      }
    }, {
      model: 'Need more than 10 chars',
      validator: function(newValue) {
        var defer = $q.defer();

        $timeout(function() {
          if (newValue.length > 10) {
            defer.resolve();
          } else {
            defer.reject();
          }
        }, 2500);

        return defer.promise;
      }
    }, {
      model: '1250000',
      validator: function(newValue) {
        return !isNaN(newValue);
      }
    }];
  });
