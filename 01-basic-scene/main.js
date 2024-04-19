import * as THREE from "three";
import gsap from "gsap";

//--------- Canvas

const canvas = document.querySelector(".webgl");

//--------- Scene

const scene = new THREE.Scene();

//---------  Objects

// Group
const group = new THREE.Group();
scene.add(group);

// Cube 1
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
group.add(cube1);
cube1.position.set(0, 0, -2);
// Cube 2
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
group.add(cube2);
cube2.position.set(2, 0, -2);
// Cube 3
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
group.add(cube3);
cube3.position.set(-2, 0, -2);

//---------  Sizes

const sizes = {
  with: window.innerWidth,
  height: window.innerHeight,
};

//---------  Camera

const camera = new THREE.PerspectiveCamera(75, sizes.with / sizes.height);
camera.position.z = 3;
camera.position.x = 0;
scene.add(camera);

//---------  Renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.with, sizes.height);

//---------  Animation

// gsap animation version -------------- from gsap lib
gsap.to(cube1.rotation, { x: Math.PI * 2, delay: 0, repeat: -1, duration: 2 });
gsap.fromTo(cube1.position, { y: 0 }, { y: -2.5, delay: 0, repeat: -1, duration: 2, yoyo: true });

gsap.to(cube2.rotation, { y: Math.PI * 2, delay: 0, repeat: -1, duration: 2, ease: false });
gsap.fromTo(cube2.position, { y: 0 }, { y: 2.5, delay: 0, repeat: -1, duration: 2, yoyo: true });

gsap.to(cube3.rotation, { z: Math.PI * 2, delay: 0, repeat: -1, duration: 2 });
gsap.fromTo(cube3.position, { y: 0 }, { y: 2.5, delay: 0, repeat: -1, duration: 2, yoyo: true });

// Clock animation version -------------- from three.js
// const clock = new THREE.Clock();

const loop = () => {
  // Clock animation version --------------
  // const elapsedtime = clock.getElapsedTime();
  // cube1.position.y = Math.sin(elapsedtime);
  // cube1.rotation.y = Math.sin(elapsedtime);

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
