import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Lights
const ambientLight = new THREE.AmbientLight("#ffffff", 0.35);
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.castShadow = true;
directionalLight.position.set(0, 2, 0);
scene.add(ambientLight, directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//boxMesh
const boxGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
const boxMaterial = new THREE.MeshStandardMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.position.y = 0.7;
scene.add(boxMesh);

//planeMesh
const planeGeometry = new THREE.PlaneGeometry(2.75, 2.75);
const planeMaterial = new THREE.MeshStandardMaterial();
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
camera.position.y = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //   boxMesh.position.y = 1.5 + Math.sin(elapsedTime * 2);
  boxMesh.rotation.y = elapsedTime * 2;
  boxMesh.rotation.x = elapsedTime * 2;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
