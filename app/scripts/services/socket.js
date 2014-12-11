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
    )
    {

      var localWS = new WebSocket("ws://localhost:8887/echo");
      localWS.onopen = function()
      {
         // Web Socket is connected, send data using send()
        localWS.send("We are connected");
        console.log('local ws send: ');
      };
      localWS.onmessage = function (evt)
      {
        var received_msg = evt.data;
        console.log('<-- ' + received_msg);
        sock.send(received_msg)
      };
      localWS.onclose = function()
      {
        // websocket is closed.
        console.log('local socket closed.');
      };
    }
  );
