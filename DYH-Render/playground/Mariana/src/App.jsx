import { Canvas } from "@react-three/fiber"
// Importamos la escena desde el src/ "oficial" de DYH-Render (código compartido),
// no la duplicamos aquí en el playground.
import { AvatarScene } from "../../../src/components/AvatarScene"

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a2e" }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} shadows>
        <AvatarScene />
      </Canvas>
    </div>
  )
}

export default App
