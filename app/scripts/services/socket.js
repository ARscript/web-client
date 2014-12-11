'use strict';

/**
 * @ngdoc service
 * @name webClientApp.socket
 * @description
 * # socket
 * Service in the webClientApp.
 */
angular.module('webClientApp')
  .service('socket', function () {

  var localWebsocket = new WebSocket("ws://localhost:8887/echo");
  ws.onopen = function()
  {
     // Web Socket is connected, send data using send()
    ws.send("We are connected");
    console.log('local ws send: ');
  };
  ws.onmessage = function (evt)
  {
    var received_msg = evt.data;
    console.log('local ws recv: ' + received_msg);
  };
  ws.onclose = function()
  {
    // websocket is closed.
    console.log('local socket closed.');
  };


  });
