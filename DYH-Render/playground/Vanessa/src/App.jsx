
import { Canvas } from "@react-three/fiber"
import './App.css'
import { useMemo } from "react"
import { Experience } from "./Experience"
import { KeyboardControls } from "@react-three/drei"
import { Controls } from "./Controls"
import { SocketManager } from "./SocketManager"

function App() {

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.backward, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    []
  )

  return(
    <> 
      <SocketManager />
      <KeyboardControls map={map}>
        <Canvas >
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
