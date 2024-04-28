import "./style.css";
import * as THREE from "three";

//--------------------------------------- Scene ---------------------------------------

const scene = new THREE.Scene();

//--------------------------------------- Axes helper ---------------------------------------

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

//--------------------------------------- Group ---------------------------------------

const group = new THREE.Group();

//------------ Mesh

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.y = 2;
mesh.scale.x = 2;
mesh.rotation.x = Math.PI / 4; // Rotation directions: .25 = Math.PI / 4 ; .5 Math.PI ; .75 = (3 * Math.PI) / 2 ; 1 = Math.PI * 2

//------------ Mesh 2

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "green" });
const mesh2 = new THREE.Mesh(geometry2, material2);

//------------ Add Meshes to group

group.add(mesh, mesh2);
group.position.x = 2;
scene.add(group);

//--------------------------------------- Camera ---------------------------------------

const aspect = {
  with: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, aspect.with / aspect.height); // default: near = 1, far = 2000
camera.position.z = 3;
// camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

//--------------------------------------- Renderer ---------------------------------------

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.with, aspect.height);
renderer.render(scene, camera);
