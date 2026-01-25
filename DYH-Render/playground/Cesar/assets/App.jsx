import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef, useEffect } from "react"


const Cube = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return

    ref.current.rotation.x = state.mouse.y * Math.PI
    ref.current.rotation.y = state.mouse.x * Math.PI
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 3.14159265358973284626433
    console.log(state.clock.elapsedTime)

    ref.current.position.x = state.mouse.x * 3.14159265358973284626433
    ref.current.position.y = state.mouse.y * 3.14159265358973284626433
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
      <directionalLight position={(0, 0, .001)} />
      <ambientLight intensity={0.01} />
      <Cube position={[0, 0, 0]} color={"blue"} size={[1, 50, 1]} />
    </Canvas>
  )
}

export default App
