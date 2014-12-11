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
    (
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

      return utils;
    }
  );
