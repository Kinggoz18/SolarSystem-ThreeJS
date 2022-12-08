import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

//Class to create camera object
export class SolarCamera{

    //Takes in the sun, centers and rotates around it
    constructor(sunObject, scene){
        this.sunObject = sunObject;
        this.camera = this.createRotatingCamera()
        this.pivot;
        this.scene = scene; //For testing camera.LookAt
    }

    //Returns the rotating camera
    get RotatingCamera(){
        return this.camera;
    }
    //Get the pivot
    get Pivot(){
        return this.pivot;
    }
    //Create the rotating camera
    createRotatingCamera() {
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
        // Position the camera so that it is rotating around the sun object
        camera.position.set(0, this.sunObject.position.y + 20, 0);
        camera.lookAt(this.sunObject.position);
        // Create a new empty object to use as the camera's parent
        this.pivot = new THREE.Object3D();
        // Add the camera as a child of the pivot object
        this.pivot.add(camera);
        return camera;
    }

    //Function to rotate the camera
    rotateCamera(){
        // Rotate the pivot object around the y-axis
        this.camera.rotation.z += 0.01;
        return this.camera;
    }

    //Functiont to update the camereas location
    SetCameraLocation(x, y, z){
        this.cameraLoc.x = x;
        this.cameraLoc.y = y;
        this.cameraLoc.z = z;
    }
}