<html>
<head>
<!-- you can include other scripts here -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r69/three.js"></script>
<script src="http://threejs.org/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
<script>
var camera, scene, renderer;
var geometry, material, mesh;
init();
render();

var pointcloud;

// Connect to local websocket for data
var ws = new WebSocket("ws://localhost:8887");

ws.onopen = function() {
    console.log('Connected');
    ws.send("We are connected");
};

// Get data from tango service
ws.onmessage = function (evt) {
    var data = evt.data;
    var obj = JSON.parse(data);
    buffer = obj['buffer'];
    pointcloud = createPointCloud(buffer);
};

ws.onclose = function() {
    console.log('local socket closed.');
};


function animate() {
    requestAnimationFrame(animate);
    //updatePointCloud();
    renderer.render(scene, camera);
}

function init() {
    var contentWidth = window.innerWidth - 20;
    var contentHeight = window.innerHeight - 20;

    camera = new THREE.PerspectiveCamera(75, contentWidth / contentHeight, 1, 10000);
    camera.position.z = 16;

    controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.addEventListener( 'change', render );

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0009);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(contentWidth, contentHeight);

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function createPointCloud(buffer) {
    var colors = [];
    var pointSize = 0.05;
    geometry = new THREE.Geometry({dynamic:true});
    material = new THREE.PointCloudMaterial({size:pointSize, vertexColors:true});

    // Create Dataview to deal with the byte buffer
    var arrayBuffer = new ArrayBuffer(buffer.length);
    var vertices = new DataView(arrayBuffer);
    for(var i=0; i < buffer.length; i++)
        points.setUint8(i, buffer[i]);

    for(var i=0; i < verticies.byteLength/Float32Array.BYTES_PER_ELEMENT; i+=3) {
        var x = verticies.getFloat32(i * Float32Array.BYTES_PER_ELEMENT, true);
        var y = verticies.getFloat32((i + 1) * Float32Array.BYTES_PER_ELEMENT , true)
        var z = verticies.getFloat32((i + 2) * Float32Array.BYTES_PER_ELEMENT, true)
        geometry.vertices.push(new THREE.Vector3(x, y, z));
        colors.push(new THREE.Color(0x00ffff));
    }

    geometry.colors = colors;

    var pointcloud = new THREE.PointCloud(geometry, material);
    scene.add(pointcloud);

}

function updatePointCloud() {

    // Load the pointcloud
    var points = new Float32Array(buffer);
    for(var i=0; i < points.length; i+=3) {
        // Point
        var x = points[i];
        var y = points[i+1];
        var z = points[i+2];
        geometry.vertices.push(new THREE.Vector3(x, y, z));
        colors.push(new THREE.Color(0x00ffff));
    }

    geometry.colors = colors;
    pointcloud.geometry = geometry;
    pointcloud.geometry.verticesNeedUpdate = true;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function render() {
    renderer.render( scene, camera );
}

</script>
</body>
</html>
