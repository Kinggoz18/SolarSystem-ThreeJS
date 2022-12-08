import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

//Class to create planet object
export class Planet{
	
	//Constructor to set planets gloabl variables
    constructor(planetSize, location, texture){
        this.planetSize = planetSize; 		//Planets radius
		this.location = location;	//plaents location in the space
		this.texture = texture;
		this.planet = null;
		//Set up the planet
		this.CreatePlanet();
		this.orbitRadius;
    }
	//Returns this.plaet
	get Planet(){
		return this.planet;
	}
	//Creates a planet
	CreatePlanet(){
		//Load material 
		let text = new THREE.TextureLoader().load( `./js/texture.jpg`);
		const material = new THREE.MeshBasicMaterial( { map: text } );
		//planet
		var sphere = new THREE.SphereGeometry( this.planetSize, 34, 32 );
		this.planet = new THREE.Mesh(sphere, material);
		//Set the planets location in the space
		this.planet.position.x = this.location.x;
		this.planet.position.y = this.location.y
		this.planet.position.z = this.location.z;
	}
}