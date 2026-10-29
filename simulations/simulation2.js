import * as THREE from 'three'

const scene = THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.getElementById("simulation2").appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

