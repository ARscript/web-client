'use strict';

/**
 * @ngdoc service
 * @name webClientApp.sock
 * @description
 * # sock
 * Factory in the webClientApp.
 */
angular.module('webClientApp')
  .factory
  ( 'sock'
  , function
    ( socketFactory
    )
    {
      var sockjs;
      var sock = {}
      sock.reconnect = true

      sock.sock = createSocket();
      function createSocket(){
        sockjs = new SockJS('/sock')
        sockjs.onmessage = function(msg){
          console.log('--> ' + msg)
        }
        sockjs.onopen = function(){
          console.log('Socket Open')
          var msg = "We're connected"
          console.log('<-- ' + msg)
          sockjs.send(msg)
        }
        sockjs.onclose = function(){
          console.log("Socket Closed")
          if(sock.reconnect)
            createSocket()
        }

        return socketFactory
        ( { socket: sockjs
          }
        )

      }

      return sock;
    }
  );
