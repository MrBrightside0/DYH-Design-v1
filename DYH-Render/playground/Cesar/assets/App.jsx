import { Canvas } from "@react-three/fiber"
import Cube from "./Cube"

// Dejo apuntes para mi para saber q onda con esto jeje

const App = () => {

  // este coso es el decide que rollito todo vrd
  // true   es de q yo en yendo a la uni
  // false  y esto ps yo en mi poderocicimo fime

  const isSender = true

  // a esto si le se, aqui tunie mi cubito y lo hice aesthetic
  // el coso ese de abajo del 100 hace que aproveche toda la pantalla para q no quede chico pq el canvas es el coso q me fallaba
  return (
    <Canvas style={{ width: "100ww", height: "100vh" }} camera={{ position: [0, 0, 5], fov: 69, near: 0.1, far: 1000 }}
      gl={{ clearColor: "black" }}>
      <camera position={[0, 0, 5]} />
      <directionalLight position={(0, 0, 0.001)} />
      <ambientLight intensity={0.01} />
      <Cube isSender={isSender} />
    </Canvas>
  )
}

export default App
  return (
    <Canvas>
      <directionalLight position={(0, 0, .001)} />
      <ambientLight intensity={0.01} />
      <Cube position={[0, 0, 0]} color={"blue"} size={[1, 50, 1]} />
    </Canvas>
  )
}

export default App
