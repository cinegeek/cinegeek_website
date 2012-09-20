var renderer;
var move_flg = true;

function initThree() {
    width = document.getElementById('canvas_frame').clientWidth;
    height = document.getElementById('canvas_frame').clientHeight;  
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height );
    document.getElementById('canvas_frame').appendChild(renderer.domElement);
    renderer.setClearColorHex(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {  
    camera = new THREE.PerspectiveCamera( 25 , width / height , 10 , 1200 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 0;
    camera.lookAt( {x:0, y:0, z:0 } );
}
var scene;
function initScene() {    
    scene = new THREE.Scene();
}
var light;
function initLight() {  
    light = new THREE.DirectionalLight(0xeeeeee, 1.0, 0);
    light.position.set( 100, 100, 200 );
    scene.add(light);
    light2 = new THREE.AmbientLight(0xaaaaaa);
    light2.position.set( 100, 100, 200 );
    scene.add(light2);    
}
var cube_arr = new Array();
function initObject(){
    var materials = new Array();
    for(var i = 1 ; i < 7 ; i++){
        var tex = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("img/" + i +".gif")});
        materials.push(tex);
    }
    for(i = 0 ; i < 3 ; i++){
        cube_arr[i] = new THREE.Mesh(
             new THREE.CubeGeometry(100,100,100,30,30,30,materials),
             new THREE.MeshFaceMaterial()
        );
        scene.add(cube_arr[i]);
        cube_arr[i].position.set(-150 + 150*i,0,0);
        cube_arr[i].rotation.set(0,0,0);
    }
}
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();

    renderer.clear();
    renderer.render(scene, camera);
    loop();
}
var cube_rotation_arr = [0,0,0];
var cube_dir_arr = [0,0,600];
function loop() {
    if(!move_flg) return;
    cube_arr[0].rotation.set(0 ,0, 0);
    camera.position.set(0,0,600);
	renderer.clear();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
}