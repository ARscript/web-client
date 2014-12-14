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
    , $mdDialog
    )
    {
      ace.config.set("basePath","bower_components/ace-builds/src-min-noconflict")

      $scope.vimMode = true;
      $scope.utils = utils

      $scope.aceLoaded = function(editor) {
        // add session to scope
        var session = editor.getSession()
        $scope.session = session;

        editor.setKeyboardHandler("ace/keyboard/vim");
        //updateEditor();
        $http.get('test.js').success(function(data) {
          $scope.editorText = data;
        });

        editor.setValue($scope.editorText);
      };

      $scope.aceChanged = function(e) {
        var editorEvent = e[0];
        var editor = e[1];

        $scope.editorText = editor.session.getValue();
      };

      $scope.editorText = '';

      $scope.toggleVimMode = function() {
        console.log("vim toggle");
        console.log($scope.session);
      }

      $scope.runScript = function() {
        console.log("running script");
        $('#three-container').empty();
        // eval contents
        eval($scope.editorText);
      };

      $scope.showSetup = function(ev) {

        $mdDialog.show({
          //controller: DialogController,
          templateUrl: '/views/setup.tmpl.html',
          targetEvent: ev,
        })
        .then(function(answer) {

          //$scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
          //$scope.alert = 'You cancelled the dialog.';
        });
      };

      $scope.showKey = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
          .title('Session Key')
          .content($scope.room_key)
          .ariaLabel('Session notification')
          .ok('Got it!')
          .targetEvent(ev)
        );
      };

      $scope.room_key = 'a234bo23';

      $scope.wsTest = function(){
        if(!'WebSocket' in window) {
          alert('WebSockets are not available in your browser. This app will not work!');
        }
      };

      var updateEditorStyle = function() {
        var windowHeight = $(window).height() - 50;
        // $('.aceContainer').heigth(windowHeight + 'px');
      };


      // Get User media for local camera
      // Only need to do this on tango
      // TODO: If !tango get webrtc video from tango
      var videoSelect = document.querySelector('select#videoSource');
      var videoElement = document.getElementById('camera-stream');

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

      if(utils.isTango) {
        MediaStreamTrack.getSources(gotSources);
        videoSelect.onchange = start;
        start();
        $scope.showKey();
      } else {
        // TODO: get webrtc connection from tango and display video stream
        $scope.showSetup();
      }

    }
  );
