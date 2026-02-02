import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef, useState, useEffect, useMemo } from "react" 
import { useGLTF} from "@react-three/drei"
import {useAnimations, Clone} from "@react-three/drei"
import * as THREE from "three"
import { io } from "socket.io-client";
import { SkeletonUtils } from "three-stdlib";

// CORRECCIÓN IMPORTANTE: Socket fuera de los componentes para evitar bucles
const socket = io("http://localhost:3000");

const Model3D = ({isMoving, isAttacking}) => {
  const { scene, animations } = useGLTF("/models/link.glb") //ruta del link 3d

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]) //clonar y no tener problemas con las animaciones y mas jugadores
  
  const {actions} = useAnimations(animations, clone) // para las acciones play, stop, fade

  

  useEffect(() => {
  
  const ataque = actions ["Dagger_Attack2"]  
  const correr = actions["Run"] || actions["Walk"] 
  const quieto = actions["Idle"]

  if (isMoving){
    quieto?.stop()
    correr?.reset().fadeIn(0.2).play()
  }else{
    correr?.stop()
    quieto?.reset().fadeIn(0.2).play()
  }

  if (isAttacking){
    correr?.stop()
    quieto?.stop()

    ataque?.reset().setLoop(THREE.LoopOnce,1).fadeIn(0.2).play() // para que se haga una vez y no se quede atacando siempre
    if (ataque) ataque.clampWhenFinished = true // se quede en la ultima posicion antes del ataque
  } else if (isMoving){
    ataque?.stop()
    quieto?.stop()
    correr?.reset().fadeIn(0.2).play()
  } else{
    ataque?.stop()
    correr?.stop()
    quieto?.reset().fadeIn(0.2).play()
  }
 
return () => {
        actions && Object.values(actions).forEach(action => action.stop())
    } // limpieza

}, [isMoving, isAttacking, actions])

  return <primitive object={clone} scale={0.5} /> //para poder tener varios links
}

const Player = ({position}) => { // el jugador 
  const ref = useRef()
  const keys = useRef({})
  const [moving, setIsMoving] = useState (false) // estado para ver si se esta moviendo, por predeterminado en false (quieto)
  const [attacking, setIsAttaking] = useState (false) // estado para ver si esta atacando por predeterminado en false (no ataca)

  // CORRECCIÓN: Unifiqué los dos useEffects en uno solo para optimizar rendimiento
  useEffect(() => { // useEffect para el teclado y mouse
    const handleKeyDown = (e) => { keys.current[e.code] = true }
    const handleKeyUp = (e) => { keys.current[e.code] = false }

    const handleMouseDown = () => {
      if (!attacking){
        setIsAttaking(true)
        console.log("Hyaaaa muere claudia sheinbun") // gritito de ataque que ojala en algun momento tenga sonido

        // CORRECCIÓN: Enviamos el ataque al servidor aquí mismo
        socket.emit("mover-personaje",{
          x: ref.current.position.x,
          y: ref.current.position.y,
          z: ref.current.position.z,
          rotation: ref.current.rotation.y,
          isMoving : false,
          isAttacking: true
        })

        setTimeout(() =>{
          setIsAttaking(false)
        }, 1265) // tiempo exacto que dura la animacion de ataque(1250ms) + poquito mas para que no se corte mal
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [attacking]) //para que el timer funcione bien

  //el movement
  useFrame((state, delta) => {
  if (attacking) return // si esta atacando no se mueve asi como en los dark souls
    
  const speed = 5 * delta
  let seMueve = false // bandera local para ver si se mueve

    if (keys.current ["KeyW"] || keys.current["ArrowUp"]) {ref.current.position.z -= speed; seMueve = true}
    if (keys.current ["KeyS"] || keys.current["ArrowDown"]) {ref.current.position.z += speed; seMueve = true }
    if (keys.current ["KeyA"] || keys.current["ArrowLeft"]) {ref.current.position.x -= speed; seMueve = true }
    if (keys.current ["KeyD"] || keys.current["ArrowRight"]) {ref.current.position.x += speed; seMueve = true }

    if (seMueve !== moving) setIsMoving(seMueve) // cambiar solo el estado si se mueve para optimizar y no alentar la compu

    if (seMueve){ // enviar datos al servidor si me muevo
      
      // CORRECCIÓN: Eliminado el console.log que causaba LAG
      socket.emit("mover-personaje", {
            x: ref.current.position.x,
            y: ref.current.position.y,
            z: ref.current.position.z,
            rotation: ref.current.rotation.y,
            isMoving : true,
            isAttacking : false
        })
    }


    // rotacion del personaje
    if (keys.current ["KeyA"])  ref.current.rotation.y = -Math.PI / 2
    if (keys.current ["KeyD"])  ref.current.rotation.y = Math.PI / 2
    if (keys.current ["KeyW"])  ref.current.rotation.y = Math.PI
    if (keys.current ["KeyS"])  ref.current.rotation.y = 0
  })
  return (
    < group ref ={ref} position={position}>
      < Model3D isMoving={moving} isAttacking={attacking}/>
    </ group>
  )
}

const RemotePlayer = ({data}) => { // para los otros jugadores
  return (
      <group 
          position={[data.x, data.y, data.z]}
          rotation={[0, data.rotation, 0]}
        >
        <Model3D 
          isMoving={data.isMoving} 
          isAttacking={data.isAttacking} 
        />
      </group>
    )
}

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

  const [otrosJugadores, setOtrosJugadores] = useState({}); // lista para otros jugadores

  useEffect(() => {
    // cargar los que ya estaban
    socket.on('jugadores-actuales', (jugadoresServer) => {
      // filtrar para no agregarnos a nosotros mismos
      const otros = { ...jugadoresServer };
      delete otros[socket.id]; 
      setOtrosJugadores(otros);
    });

    //  Alguien nuevo
    socket.on('nuevo-jugador', (datos) => {
      setOtrosJugadores((prev) => ({ ...prev, [datos.id]: datos }));
    });

    // movimiento de alguien mas
    socket.on('jugador-se-movio', (datos) => {
      setOtrosJugadores((prev) => {
         // actualizar solo si existe
         if (!prev[datos.id]) return prev;
         return {
            ...prev,
            [datos.id]: datos
         };
      });
    });

    // el otro se fue
    socket.on('jugador-desconectado', (id) => {
      setOtrosJugadores((prev) => {
        const nuevos = { ...prev };
        delete nuevos[id];
        return nuevos;
      });
    });

    // Limpieza al cerrar
    return () => {
      socket.off('jugadores-actuales');
      socket.off('nuevo-jugador');
      socket.off('jugador-se-movio');
      socket.off('jugador-desconectado');
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <ambientLight intensity={0.8} />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      {/* Yo yo yo */}
      <Player position={[0, 0, 0]} />

      {/* los otros */}
      {Object.keys(otrosJugadores).map((id) => (
         <RemotePlayer 
            key={id} 
            data={otrosJugadores[id]} 
         />
      ))}

    </Canvas>
  )
}

export default App