<html>
<head>
<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r69/three.js"></script>
</head>
<body>
<script>
var camera, scene, renderer;
var geometry, material, mesh;
init();
animate();

function init() {

  var contentWidth = window.innerWidth;
  var contentHeight = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, contentWidth / contentHeight, 1, 10000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(contentWidth, contentHeight);

  document.body.appendChild( renderer.domElement  );

}

function animate() {

  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);

}

</script>
</body>
</html>
