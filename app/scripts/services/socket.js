'use strict';

/**
 * @ngdoc service
 * @name webClientApp.socket
 * @description
 * # socket
 * Service in the webClientApp.
 */
angular.module('webClientApp')
  .service
  ( 'socket'
  , function
    ( sock
    , utils
    )
    {

      var localWS = new WebSocket("ws://localhost:8887/echo");
      localWS.onopen = function() {
        utils.showInfoMessage('local socket connected');
        console.log('local ws send: ');
        localWS.send("We are connected");
      };

      localWS.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log('<-- ' + received_msg);
        sock.send(received_msg)
      };

      localWS.onclose = function() {
        console.log('local socket closed.');
        utils.showInfoMessage('local socket closed');
      };
    }
  );
