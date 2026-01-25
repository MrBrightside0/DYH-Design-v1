import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef, useState, useEffect } from "react" 


const Sphere = ({ position, size, colorBase }) => {
  const ref = useRef()

  // Mouse
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Teclado
  const keys = useRef({})

  
  useEffect(() => {
    const handleKeyDown = (e) => { keys.current[e.code] = true }
    const handleKeyUp = (e) => { keys.current[e.code] = false }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    //movimiento
    const speed = 5 * delta // Velocidad de movimiento

    if (keys.current["KeyW"] || keys.current["ArrowUp"])    ref.current.position.y += speed
    if (keys.current["KeyS"] || keys.current["ArrowDown"])  ref.current.position.y -= speed
    if (keys.current["KeyD"] || keys.current["ArrowRight"]) ref.current.position.x += speed
    if (keys.current["KeyA"] || keys.current["ArrowLeft"])  ref.current.position.x -= speed


    ref.current.rotation.y += delta * (isHovered ? 2 : 0.5) // rota mas rapido si esta el mouse encima
  })

  return (
    <mesh
      position={position}
      ref={ref}
      // Eventos del Mouse
      onPointerEnter={(e) => { e.stopPropagation(); setIsHovered(true) }}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1} // Crece si le das click
    >
      <sphereGeometry args={size} />
      {/* Cambia de color: Verde (Click), Naranja (Hover), Azul (Normal) */}
      <meshStandardMaterial 
        color={isClicked ? "green" : (isHovered ? "orange" : colorBase)} 
        wireframe 
      />
    </mesh>
  )
}


const Cube = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta 
    ref.current.rotation.y += delta * 2.0
  })
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Torus = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0
  })
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

//APP PRINCIPAL
const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <ambientLight intensity={0.5} />

      
      <Sphere position={[0, 0, 0]} size={[1, 32, 32]} colorBase="lightblue" />

    </Canvas>
  )
}

export default App