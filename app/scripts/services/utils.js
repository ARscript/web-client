'use strict';

/**
 * @ngdoc service
 * @name webClientApp.utils
 * @description
 * # utils
 * Factory in the webClientApp.
 */
angular.module('webClientApp')
  .factory
  ( 'utils'
  , function
    ( $mdToast
    )
    {
      /**
       * Function Declarations
       */
      var checkForTango = function(userAgent){
        var pat = /Yellowstone Build/g
        return pat.test(userAgent)
      }

      /**
       * Util Export
       */
      var utils = {};
      utils.isTango = checkForTango(navigator.userAgent)

      var toastPosition = {
        bottom: true,
        top: false,
        left: false,
        right: true
      };

      var getToastPosition = function() {
        return Object.keys(toastPosition)
        .filter(function(pos) { return toastPosition[pos]; })
        .join(' ');
      };

      utils.showInfoMessage = function(message) {
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position(getToastPosition())
          .hideDelay(6000)
        );
      };


      return utils;
    }
  );
