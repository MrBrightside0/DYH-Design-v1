import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef } from "react"

const Cube = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 2
    console.log(state.clock.elapsedTime)
  })
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry arg={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const App = () => {
  return (
    <Canvas>
      <directionalLight position={(0, 0, .001)} />
      <ambientLight intensity={0.01} />
      <Cube position={[-1, 0, 0]} color={"blue"} size={[1, 8, 1]} />
    </Canvas>
  )
}

export default App
