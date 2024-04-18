import * as THREE from "three";

const canvas = document.querySelector(".webgl");

// Scene

const scene = new THREE.Scene();

// Red Cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes

const sizes = {
  with: 800,
  height: 600,
};

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.with / sizes.height);
camera.position.z = 3;
camera.position.x = 2;
scene.add(camera);

// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.with, sizes.height);
renderer.render(scene, camera);
