import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CANNON from 'cannon-es'

//Link to Cannon.js library
//cannon-es = https://pmndrs.github.io/cannon-es/docs/index.html

//Scene
const scene = new THREE.Scene()

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

//Lights
const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.2)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#FFFFFF', 0.5)
directionalLight.castShadow = true
directionalLight.position.set(5, 5, 0)
scene.add(directionalLight)

//Meshes
//1-Sphere Mesh
const sphereGeometry = new THREE.SphereGeometry(0.3, 32)
const sphereMaterial = new THREE.MeshStandardMaterial()
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.y = 1
sphereMesh.castShadow = true
scene.add(sphereMesh)

//2- Plane Mesh
const planeGeometry = new THREE.PlaneGeometry(15, 15)
const planeMaterial = new THREE.MeshStandardMaterial()
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.receiveShadow = true
planeMesh.rotation.x = -Math.PI * 0.5

scene.add(planeMesh)

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(
  75,
  aspect.width / aspect.height,
)
camera.position.z = 5
camera.position.y = 2
scene.add(camera)

// Physics World

const world = new CANNON.World()
world.gravity.set(0, -9.81, 0)
const sphereShape = new CANNON.Sphere(0.3)
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 1, 0),
  shape: sphereShape,
})

world.addBody(sphereBody)

const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 0, 0),
})

world.addBody(planeBody)
//Renderer
const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(aspect.width, aspect.height)

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true

//Clock Class
const clock = new THREE.Clock()

let previousElapsedTime = 0

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousElapsedTime
  previousElapsedTime = elapsedTime

  // Update World

  world.step(deltaTime)

  //   sphereMesh.position.x = sphereBody.position.x
  //   sphereMesh.position.y = sphereBody.position.y
  //   sphereMesh.position.z = sphereBody.position.z

  sphereMesh.position.copy(sphereBody.position)

  //Update Controls
  orbitControls.update()

  //Renderer
  renderer.render(scene, camera)

  //RequestAnimationFrame
  window.requestAnimationFrame(animate)
}
animate()
