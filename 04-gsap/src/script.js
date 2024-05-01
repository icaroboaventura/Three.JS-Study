import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "yellow" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera
const aspect = {
  with: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.with / aspect.height, 0.1, 1000);
camera.position.z = 4;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.with, aspect.height);

// Clock class: to make the same animation regardless of the monitor fps
const clock = new THREE.Clock();

const animate = () => {
  // Get elapsed time
  const elapsedTime = clock.getElapsedTime();

  // Update rotation
  cube.rotation.y = elapsedTime * Math.PI * 2;

  // Update position
  cube.position.x = Math.sin(elapsedTime * 2);
  cube.position.y = Math.cos(elapsedTime * 2);

  // Renderer
  renderer.render(scene, camera);

  // Request animation
  window.requestAnimationFrame(animate);
};

animate();
