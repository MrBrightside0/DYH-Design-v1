import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef } from "react"

const Cube = ({position, size, color}) => {
  
  const ref = useRef()
  
  useFrame((state, delta) => {
    ref.current.rotation.x += delta //delta es el tiempo en segundos entre frames
    ref.current.rotation.y += delta * 2.0
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2.0
     ref.current.position.y = Math.cos(state.clock.elapsedTime) * 2.0
    console.log(state)
  })  
  

  return (
   <mesh position={position} ref = {ref}> // todo lo que hicimos en la caja va a adentro del mesh
         <boxGeometry args={size}/>
         <meshStandardMaterial color={color}/>
      </mesh>

  )

}


 const App = () => {
  return (
    <Canvas>
     
      *<directionalLight position={[0,0,2]} /> 
      <ambientLight />
      //la iluminacion va afuera del mesh
      // todo lo que hicimos en la caja va a adentro del mesh

      {/*<group position={[-1,-1,0]}>                                         
      <Cube position={[0,0,0]} color={"green"} size={[1,1,1]} />

      <Cube position={[2,0,0]} color={"red"} size={[1,1,1]} />

      <Cube position={[2,2,0]} color={"blue"} size={[1,1,1]} />

      <Cube position={[0,2,0]} color={"orange"} size={[1,1,1]} />
      </group>*/}

        <Cube position={[0,0,0]} size={[1,1,1,]} color={"red"}/>
      
    </Canvas>
  )
}

export default App
