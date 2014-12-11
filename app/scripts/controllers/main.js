'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.data = {};
    $scope.data.vimMode = true;

   // var webGL = { template: 'var shit = cool' };
    $scope.aceLoaded = function(_editor) {
      _editor.setKeyboardHandler(require('ace/keyboard/keybinding/vim').Vim);
      // Options
      //_editor.setReadOnly(true);
    };
/*
    $scope.aceChanged = function(e) {
      //
    };
*/
  });
