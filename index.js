'use strict';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { SolarCamera } from './js/Camera.js';
import {Planet} from './js/Planet.js'
import { Sun } from './js/Sun.js';

const raycaster = new THREE.Raycaster()
let intersects;


let MainCamera, xCamera, controls, scene, renderer;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let pivot;
let cubes=[];
let planetObj =[];
let intersectedObject;
let sun, sunObject;
let numOfPlanets = 8;
let planetControl =[];
let orbitSpeed = [1, 5, 0.09, 11, 1, 0.05, 5, 10]	//The distance of each planet from the sun
let Speed = [0.1, 0.05, 0.09, 0.05, 0.1, 0.05, 0.05, 0.050]	//The distance of each planet from the sun
let orbit = [13, 18, 22, 27, 32, 39, 47, 54]	//The distance of each planet from the sun
let names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
let cameraTheta = 0;
let sunloc ={
	x: 0.1,
	y: 1.0,
	z: 0.1
}

Init()
document.addEventListener('click', Picking, false)

function Init(){

	SetUpScene();
	const canvas = document.querySelector('#canvas');
	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Set up our sun
	sun = new Sun(8.5, sunloc, './js/sun.jpg');
	sunObject = sun.Sun;
	scene.add(sunObject);

	//Create light and pass it for each planets
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	CreatePlanet(directionalLight);
	scene.add(directionalLight);
	//Set uo the camera
	xCamera= new SolarCamera(sunObject, scene);
	pivot = xCamera.Pivot;
	scene.add(pivot);
	
	MainCamera = xCamera.RotatingCamera;

	//Setup camera controls
   	OrbitControl();
	GUIControl();
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
	//Create i number of planets
	for(let i = 0; i < numOfPlanets; i++){
		InitializePlanet(i, directionalLight);
	}
}
function OrbitControl(){
	//controls
	controls = new OrbitControls( MainCamera, renderer.domElement );
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;
	controls.minDistance = 10;
	controls.maxDistance = 100;
	controls.maxPolarAngle = Math.PI / 2;

}
function CubeLocation(){
	//USE TREE HERE MAYBE 
	let i =0;
	cubes.forEach(element => {
		orbitSpeed[i] +=(Speed[i]/10)
		element.position.set(Math.cos(orbitSpeed[i]) * orbit[i], 0, Math.sin(orbitSpeed[i]) * orbit[i]);
		i+=1;
	});
}
function onWindowResize() {

	MainCamera.aspect = window.innerWidth / window.innerHeight;
	MainCamera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function render() {
	CubeLocation()		//Uncomment to test
	//MainCamera = xCamera.rotateCamera()	//Uncomment to test
	renderer.render(scene, MainCamera);
	requestAnimationFrame(render);
}
function InitializePlanet(i, directionalLight){
	let current;
	//Switch statement to set the objects position
	switch (i)
	{
		case 0:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.2, './js/texture.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -13);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 1:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture2.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -18);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 2:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture3.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -22);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 3:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture4.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -27);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 4:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture5.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -32);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 5:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture6.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -39);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 6:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture7.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -47);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 7:
			{
				console.log(names[i])
				current= new Planet(names[i], 1.6, './js/texture8.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -54);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		default:
			{
				console.log('Inavlid Range');
				break;
			}
		
	}
}

function GUIControl(){
	for(let i = 0; i< numOfPlanets; i++){
		planetControl[i] = document.getElementById(`${names[i]}`);
	}
	for(let i=0; i<numOfPlanets; i++)
	{
		planetControl[i].addEventListener('input', (event)=>{
			let value = planetControl[i].value/100;
			console.log(value)
			Speed[i]=value;
		})
	}
}

function Picking(event){
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        MainCamera
    )
    intersects = raycaster.intersectObjects(cubes, false)

    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    }
	let i = 0;
    cubes.forEach((o, i) => {
        if (intersectedObject === o) {
			console.log(planetObj[i].Name);
		  }
    })
}
