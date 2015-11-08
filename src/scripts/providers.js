(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.providers', [])
    .value('InlineEditConfig', {
      btnEdit: 'Edit',
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
