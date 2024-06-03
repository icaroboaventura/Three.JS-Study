import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

console.log(OBJLoader)

//Scene
const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0xffffff, 1.1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.position.z = 2
scene.add(ambientLight, directionalLight)

//Debugging
// const gui = new dat.GUI();

// OBJLoader
// const objLoader = new OBJLoader();
// objLoader.load("./static/monkey/monkey.obj", (obj) => {
//   obj.position.z = -1;
//   obj.children[0].material = new THREE.MeshNormalMaterial();
//   scene.add(obj);
// });

// GLTFoader
const glbLoader = new GLTFLoader()
glbLoader.load('./static/web.glb', glb => {
  scene.add(glb.scene)
})

//Resizing
window.addEventListener('resize', () => {
  //Update Size
  aspect.width = window.innerWidth
  aspect.height = window.innerHeight

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height
  camera.updateProjectionMatrix()

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(
  75,
  aspect.width / aspect.height,
)
camera.position.z = 3
scene.add(camera)

//Renderer
const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true

//Clock Class
const clock = new THREE.Clock()

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime()

  //Update Controls
  orbitControls.update()

  //Renderer
  renderer.render(scene, camera)

  //RequestAnimationFrame
  window.requestAnimationFrame(animate)
}
animate()
