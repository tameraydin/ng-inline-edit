(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.providers', [])
    .value('InlineEditConfig', {
      btnEdit: '<ng-md-icon icon="mode_edit" size="16" style="fill: #2196F3"></ng-md-icon>',
      btnSave: '',
      btnCancel: '',
      editOnClick: false,
      onBlur: null
    })
    .constant('InlineEditConstants', {
      CANCEL: 'cancel',
      SAVE: 'save'
    });

})(window, window.angular);
