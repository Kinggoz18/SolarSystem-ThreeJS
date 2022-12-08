import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { SolarCamera } from './js/Camera.js';
import {Planet} from './js/Planet.js'
import { Sun } from './js/Sun.js';


let MainCamera, xCamera, controls, scene, renderer;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
let pivot;
let cubes=[];
let sun, sunObject;
let numOfPlanets = 9;
let sunloc ={
	x: 0.1,
	y: 1.0,
	z: 0.1
}
let location = {
	x: 10,
	y: 1.0,
	z: -3
}

Init()

function Init(){

	SetUpScene();
	const canvas = document.querySelector('#canvas');
	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Set up our sun
	sun = new Sun(4.0, sunloc, './js/sun.jpg');
	sunObject = sun.Sun;
	scene.add(sunObject);

	//Create light and pass it for each planets
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	CreatePlanet(directionalLight);

	//Set uo the camera
	xCamera= new SolarCamera(sunObject, scene);
	pivot = xCamera.Pivot;
	scene.add(pivot);
	
	MainCamera = xCamera.RotatingCamera;

	//Setup camera controls
   	//OrbitControl();
	//CubeLocation();

	//Camera
	window.addEventListener( 'resize', onWindowResize );
	render()

}
//Function to setup scene
function SetUpScene()
{
	//Set up skybox texture
	const loader = new THREE.CubeTextureLoader();
	loader.setPath( 'js/bkg/blue/' );
	const textureCube = loader.load( [
		'bkg1_right.png', 'bkg1_left.png',
		'bkg1_top.png', 'bkg1_bot.png',
		'bkg1_front.png', 'bkg1_back.png'
	] );
	scene = new THREE.Scene();
	scene.background = textureCube;
}
//Functiont to create the planets
function CreatePlanet(directionalLight){
	let bulbMat = new THREE.MeshStandardMaterial( {
		emissive: 0xffffee,
		emissiveIntensity: 1,
		color: 0x000000
	} );

	//Create i number of planets
	for(let i = 0; i < numOfPlanets; i++){
		let current= new Planet(2.6, location, './js/texture.jpg')
		cubes[i] = current.Planet;
		scene.add(cubes[i]);
		cubes[i].add(directionalLight);
		SetNextLocation()
	}
}
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
	//MainCamera = xCamera.rotateCamera()
	renderer.render(scene, MainCamera);
	requestAnimationFrame(render);
}

//Function set location for each planets
function SetNextLocation(){
	let z = Math.floor(Math.random() * 50);
	let x = Math.floor(Math.random() * 10);
	location.z= z;
	location.x=x;
	console.log(`Z: ${location.z} and X: ${location.x}`)
}
