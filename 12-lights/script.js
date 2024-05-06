import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();

//Debugging
const gui = new dat.GUI();

//----- Lights
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("IntensityAmbient");

const directionalLight = new THREE.DirectionalLight("#ffffff", 0);
scene.add(directionalLight);
directionalLight.position.set(0, 0, 0);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.01).name("IntensityDirectional");
gui.add(directionalLight.position, "x").min(-3).max(3).step(0.01).name("Dir Position x");
gui.add(directionalLight.position, "y").min(-3).max(3).step(0.01).name("Dir Position y");
gui.add(directionalLight.position, "z").min(-3).max(3).step(0.01).name("Dir Position z");
gui
  .add(directionalLight.rotation, "x")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .name("Dir Rotation x");
gui
  .add(directionalLight.rotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .name("Dir Rotation y");
gui
  .add(directionalLight.rotation, "z")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .name("Dir Rotation z");
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const hemisphereLight = new THREE.HemisphereLight("blue", "yellow", 0);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight("green", 0, 0);
scene.add(pointLight);
gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("Point position x");
gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("Point position y");
gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("Point position z");
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

const spotLight = new THREE.SpotLight("white", 1, 8, Math.PI * 0.25, 0.1, 1);
gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("Spot position z");
scene.add(spotLight);

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

//Mesh
const geometry = new THREE.TorusGeometry(0.3, 0.2, 64, 64);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
