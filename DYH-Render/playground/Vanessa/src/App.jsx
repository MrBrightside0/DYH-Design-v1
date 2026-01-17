
import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef } from "react"

const Cube = ({position, size, color}) => {

  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta 
    ref.current.position.z = Math.sin(state.clock.elapsedTime) *2
    console.log(state.clock.elapsedTime)
  })
  
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry arg={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const App = () => {

  return (
    <Canvas>

      <directionalLight position={[0, 0, 1]} />
      <ambientLight intensity={0.001} />

      <Cube position={[0, 1, 0]} size={[4, 4, 4]} color={"red"} />
  
    </Canvas>
  )
}

export default App
