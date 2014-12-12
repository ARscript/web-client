'use strict';
var $ = jQuery;

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller
  ( 'MainCtrl'
  , function
    ( $scope
    , socket
    , utils
    , sock
    , $http
    )
    {
      ace.config.set("basePath","bower_components/ace-builds/src-min-noconflict")

      $scope.data = {};
      $scope.data.vimMode = true;
      $scope.utils = utils

      $scope.aceLoaded = function(editor) {
        var session = editor.getSession()
        editor.setKeyboardHandler("ace/keyboard/vim");
        //updateEditor();
        $http.get('test.js').success(function(data) {
          editor.setValue(data);
        });

        editor.setValue($scope.editorText);
      };

      $scope.aceChanged = function(e) {
        //
      };

      $scope.editorText = 'var camera, scene, renderer; var geometry, material, mesh; init(); animate();';

      var videoSelect = document.querySelector('select#videoSource');
      var videoElement = document.getElementById('camera-stream');

      $scope.wsTest = function(){
        if(!'WebSocket' in window) {
          alert('WebSockets are not available in your browser. This app will not work!');
        }
      };

      var updateEditorStyle = function() {
        var windowHeight = $(window).height() - 50;
        // $('.aceContainer').heigth(windowHeight + 'px');
      };


      // Normalize the various vendor prefixed versions of getUserMedia.
      navigator.getUserMedia = (navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);

      function gotSources(sourceInfos) {
        for (var i = 0; i !== sourceInfos.length; ++i) {
          var sourceInfo = sourceInfos[i];
          var option = document.createElement('option');
          option.value = sourceInfo.id;
          if (sourceInfo.kind === 'video') {
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
          } else {
            console.log('Some other kind of source: ', sourceInfo);
          }
        }
      }


      function start(){
        if (!!window.stream) {
          videoElement.src = null;
          window.stream.stop();
        }
        var videoSource = videoSelect.value;
        var constraints = {
          video: {
            optional: [{sourceId: videoSource}]
          }
        };
        navigator.getUserMedia(constraints, successCallback, errorCallback);
      }

      function errorCallback(error){
        console.log('navigator.getUserMedia error: ', error);
      }

      function successCallback(stream) {
        window.stream = stream; // make stream available to console
        videoElement.src = window.URL.createObjectURL(stream);
        videoElement.play();
      }

      MediaStreamTrack.getSources(gotSources);
      videoSelect.onchange = start;
      start();

      // TODO make all k

      /*
      $scope.runScript = new function() {
        console.log("running script");
        console.log(//editor.getValue());
      };

      $scope.updateEditor = new function() {
        if($scope.data.vimMode)
          $scope.editor.setKeyboardHandler("ace/keyboard/vim");
        else
          $scope.editor.setKeyboardHandler("ace/keyboard/default")
      }
*/

    }
  );
