import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import {Planet} from './js/Planet.js'

let MainCamera, controls, scene, renderer;
let planet;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
let cameraPerspectiveHelper;
let cubes=[];
let pivot;
let flag = false;
let numOfPlanets = 3;
let cameraTheta = 0;
let cameraPos ={
	x: 2.0,
	y: 2.0,
	z: 1.0
}
const pointer = new THREE.Vector2();
const radius = 7;
let loc = document.getElementById('loc');

window.onload = function Init(){

    scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(1080, 720);
	document.body.appendChild(renderer.domElement);

	//Light
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );

	let location = {
		x: 0.1,
		y: 1.0,
		z: 0.1
	}
	//Create i number of planets
	for(let i = 0; i < numOfPlanets; i++){
		let current= new Planet(0.4, location, './texture.jpg')
		cubes[i] = current.Planet;
		scene.add(cubes[i]);
		location.z+=1;
		cubes[i].add(directionalLight);
	}
	MainCamera = createRotatingCamera(cubes[0]);
	MainCamera.lookAt(scene.position)
	//Setup camera controls
   	//OrbitControl();
	//CubeLocation();

	//Camera
	window.addEventListener( 'resize', onWindowResize );
	render()

}
function createRotatingCamera(object) {
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
	// Position the camera so that it is rotating around the object
	camera.position.set(object.position.x + 5, object.position.y, object.position.z);
  
	// Create a new empty object to use as the camera's parent
	pivot = new THREE.Object3D();
	scene.add(pivot);
  
	// Add the camera as a child of the pivot object
	pivot.add(camera);

	return camera;
  }
  
function rotateCamera(){
	// Rotate the pivot object around the y-axis
	MainCamera.rotation.z -= (-Math.PI / 2)/100;
	console.log(pivot.rotation.y )
}
//
// function OrbitControl(){
// 	//controls

// 	controls = new OrbitControls( camera, renderer.domElement );

// 	controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

// 	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// 	controls.dampingFactor = 0.05;

// 	controls.screenSpacePanning = false;

// 	controls.minDistance = 10;
// 	controls.maxDistance = 10;

// 	controls.maxPolarAngle = Math.PI / 2;
// 	CubeLocation();
// }
// function CubeLocation(){
// 	if(cube.position.x >= (radius-1)){
// 		cameraTheta=0.1;
// 	}
// 	cameraTheta +=0.1;
// 	cube.position.x = 1.0;
// 	cube.position.y = 2.0;
// 	cube.position.z = radius * Math.sin( THREE.MathUtils.degToRad( cameraTheta ) );
// }
function onWindowResize() {

	MainCamera.aspect = window.innerWidth / window.innerHeight;
	MainCamera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function render() {
	//CubeLocation()
	rotateCamera()
	renderer.render(scene, MainCamera);
	requestAnimationFrame(render);
}
