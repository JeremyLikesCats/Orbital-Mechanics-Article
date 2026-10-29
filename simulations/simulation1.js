import * as THREE from 'three'

const timer = new THREE.Timer()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.getElementById("simulation1").appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
const earthGeometry = new THREE.SphereGeometry(2);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});
const earth = new THREE.Mesh (earthGeometry, earthMaterial);
scene.add( earth );


const moonTexture = textureLoader.load('textures/moon.png');
const moonGeometry = new THREE.SphereGeometry(1);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture
});
const moon = new THREE.Mesh (moonGeometry, moonMaterial);
scene.add( moon );

// Make moon rotate around center
const pivot = new THREE.Group();
scene.add( pivot );
pivot.add(moon);

camera.position.z = 20;

moon.position.x = -10;

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

