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
var now_cube_rotation_arr = [new Array(0,0,0),new Array(0,0,0),new Array(0,0,0)];
var now_camera_dir_arr = [0,0,600];
var to_cube_rotation_arr = [new Array(0,0,0),new Array(0,0,0),new Array(0,0,0)];
var to_camera_dir_arr = [0,0,600];

function loop() {
    if(!move_flg) return;
    for(var i = 0 ; i< 3 ; i++){
        for(var j = 0 ; j<3 ; j++){
            now_cube_rotation_arr[i][j] += (to_cube_rotation_arr[i][j] - now_cube_rotation_arr[i][j])*0.2;
            now_camera_dir_arr[i][j] += (to_camera_dir_arr[i][j] - now_camera_dir_arr[i][j])*0.2;
        }
        cube_arr[i].rotation.set(now_cube_rotation_arr[i][0] ,now_cube_rotation_arr[i][1],now_cube_rotation_arr[i][2]);
    }
    camera.position.set(now_camera_dir_arr[0],now_camera_dir_arr[1],now_camera_dir_arr[2]);
    camera.lookAt({x:0,y:0,z:0});
	renderer.clear();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
}
var speed_arr = [10,90,50];
function switchCube(num){

    for(var i = 0 ;i< 3 ; i++){
        var per = speed_arr[Math.floor(Math.random()*3)];
        console.log("-----" + Math.floor(Math.random()*3));
        switch(num){
            case 1:
                to_cube_rotation_arr[i] = [per*Math.PI/4*1,per*Math.PI/4*3,per*Math.PI/4*1];
                to_camera_dir_arr = [0,0,600];
            break;
            case 2:
                to_cube_rotation_arr[i] = [per*50*Math.PI/4,per*50*Math.PI/4,per*50*Math.PI/4*3];
                to_camera_dir_arr = [0,0,600];
            break;
            case 3:
                to_cube_rotation_arr[i] = [50*Math.PI/4*3,50*Math.PI/4*2,50*Math.PI/4*2];
                to_camera_dir_arr = [0,0,600];
            break;
            case 4:
                to_cube_rotation_arr[i] = [50*Math.PI/4*1,50*Math.PI/4*2,50*Math.PI/4*2];
                to_camera_dir_arr = [0,0,600];
            break;
            case 5:
                to_cube_rotation_arr[i] = [50*Math.PI,50*Math.PI,50*Math.PI];
                to_camera_dir_arr = [0,0,600];
            break;
            case 6:
                to_cube_rotation_arr[i] = [50*Math.PI/4*2,50*Math.PI/4*4,50*Math.PI/4*2];
                to_camera_dir_arr = [0,0,600];
            break;
        }    
    }
}



