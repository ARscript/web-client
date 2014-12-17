<html>
<head>
<!-- you can include other scripts here -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r69/three.js"></script>
</head>
<body>
<script>
var camera, scene, renderer;
var geometry, material, mesh;
init();
animate();

var pointcloud;
var buffer;

// Connect to local websocket for data
var ws = new WebSocket("ws://localhost:8887/echo");

ws.onopen = function() {
  console.log('local ws send: ');
  ws.send("We are connected");
};

// Get data from tango service
ws.onmessage = function (evt) {
  var data = evt.data;
  console.log('<-- ' + data);
  var obj = JSON.parse(data);
  buffer = obj['buffer'];
  console.log(buffer);
  pointcloud = createPointCloud(buffer);
};

ws.onclose = function() {
  console.log('local socket closed.');
};

function init() {
  var contentWidth = window.innerWidth;
  var contentHeight = window.innerHeight;

  camera = new THREE.PerspectiveCamera(75, contentWidth / contentHeight, 1, 10000);
  camera.position.z = 250;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0009);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(contentWidth, contentHeight);

  document.body.appendChild( renderer.domElement );
}

function createPointCloud(buffer) {
  var colors = [];
  var pointSize = 1;
  geometry = new THREE.Geometry({dynamic:true});
  material = new THREE.PointCloudMaterial({size:pointSize, vertexColors:true});

  for(var i=0; i < buffer.length; i+=3) {
    var x = buffer[i];
    var y = buffer[i+1];
    var z = buffer[i+2];
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    colors.push(new THREE.Color(0x00ffff));
  }

  geometry.colors = colors;

  var pointcloud = new THREE.PointCloud(geometry, material);
  scene.add(pointcloud);

  return pointcloud;
}

function updatePointCloud() {

  // Load the pointcloud
  for(var i=0; i < buffer.length; i+=3) {
    // Point
    var x = buffer[i];
    var y = buffer[i+1];
    var z = buffer[i+2];
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    colors.push(new THREE.Color(0x00ffff));
  }

  geometry.colors = colors;
  pointcloud.geometry = geometry;
  pointcloud.geometry.verticesNeedUpdate = true;

}

function animate() {
  requestAnimationFrame(animate);
  // update pointcloud verticies
  //updatePointCloud();
  renderer.render(scene, camera);
}
</script>
</body>
</html>
