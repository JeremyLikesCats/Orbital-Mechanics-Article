import * as THREE from 'three'
const simulation = document.getElementById("simulation1");
const timer = new THREE.Timer()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 60, simulation.clientWidth / simulation.clientHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( simulation.clientWidth, simulation.clientHeight );

document.getElementById("simulation1").appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
const earthGeometry = new THREE.SphereGeometry(simulation.clientHeight/30);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});
const earth = new THREE.Mesh (earthGeometry, earthMaterial);
scene.add( earth );


const moonTexture = textureLoader.load('textures/moon.png');
const moonGeometry = new THREE.SphereGeometry(simulation.clientHeight/60);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture
});
const moon = new THREE.Mesh (moonGeometry, moonMaterial);
scene.add( moon );

// Make moon rotate around center
const pivot = new THREE.Group();
scene.add( pivot );
pivot.add(moon);

camera.position.z = simulation.clientHeight/3;

moon.position.x = -simulation.clientHeight/7;

earth.rotation.x = Math.PI/2;
earth.rotation.y = Math.PI/2
moon.rotation.x = Math.PI/2;
moon.rotation.y = Math.PI/2

function animate ( time ) {
    timer.update(time)
    const delta = timer.getDelta()
    
    pivot.rotation.z += delta * Math.PI/2
    earth.rotation.y += delta * Math.PI/2
    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );