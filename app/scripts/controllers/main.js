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
.controller('MainCtrl', function ($scope) {
  $scope.data = {};
  $scope.data.vimMode = true;

  $scope.aceLoaded = function(_editor) {
    // Options
  };
  $scope.aceChanged = function(e) {
    //
  };

  var videoSelect = document.querySelector('select#videoSource');
  var videoElement = document.getElementById('camera-stream');

  $scope.wsTest = function(){
    if(!'WebSocket' in window) {
      alert('WebSockets are not available in your browser. This app will not work');
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
  init();
  animate();

  function init() {

    var contentWidth = $("#video-container").width()
    var contentHeight = $("#video-container").height()
    camera = new THREE.PerspectiveCamera(75, contentWidth / contentHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
             wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(contentWidth, contentHeight);

    $(renderer.domElement).prependTo("#video-container")
    //document.getElementById('video-content').appendChild(renderer.domElement);

  }

  function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

  }

});
