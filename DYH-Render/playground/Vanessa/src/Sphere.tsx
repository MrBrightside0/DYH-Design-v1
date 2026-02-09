import { useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
// import { OrbitControls } from "@react-three/drei"
import { Mesh, Vector3 } from "three"
import { useKeyboardControls, useCursor } from "@react-three/drei"
import { Controls } from "./Controls"
import { socket } from "./SocketManager"



const movement_speed = 0.05

interface SphereProps {
    positionX?: number,
    positionY?: number,
    positionZ?: number,
    isLocal?: boolean
}

export const Sphere = ({
    positionX = 0,
    positionY = 0,
    positionZ = 0,
    isLocal = false,
}: SphereProps) => {

    const ref = useRef<Mesh>(null!)
    const [position, setPosition] = useState<[number, number, number]>([ positionX, positionY, positionZ ])

    const [isHovered, setIsHovered] = useState(false)
    useCursor(isHovered)
    const [selected, setSelected] = useState(false)

    const forwardPressed = useKeyboardControls(
        (state) => state[Controls.forward]
    )

    const backwardPressed = useKeyboardControls(
        (state) => state[Controls.backward]
    )

    const leftPressed = useKeyboardControls(
        (state) => state[Controls.left]
    )

    const rightPressed = useKeyboardControls(
        (state) => state[Controls.right]
    )
    
    let color = isHovered ? "pink" : "green"
    if (selected) {
        color = "red"
    }



    useFrame(() => {
        if (!isLocal) return

        let moved = false

        if (forwardPressed) { ref.current.position.z -= movement_speed; moved = true; 
            console.log("Se presiono W")
        }
        if (backwardPressed) { ref.current.position.z += movement_speed; moved = true; }
        if (leftPressed) { ref.current.position.x -= movement_speed; moved = true; }
        if (rightPressed) { ref.current.position.x += movement_speed; moved = true; }

        if (moved){
            socket.emit("move", [
                ref.current.position.x,
                ref.current.position.y,
                ref.current.position.z,
            ])
        }
    })

    useFrame(() => {
        if (!isLocal) {
            const targetPosition = new Vector3(positionX, positionY, positionZ)

            ref.current.position.lerp(targetPosition, 0.1)
        }
    })

    return (
        <mesh ref={ref}
        position={[positionX, positionY, positionZ]}
        onPointerEnter={(e) => {
            e.stopPropagation()
            setIsHovered(true)
        }}
        onPointerLeave={(e) => {
            e.stopPropagation()
            setIsHovered(false)
        }} 

        onClick={(e) => {
            e.stopPropagation()
            setSelected(!selected)
        }} 
        
        onPointerMissed={() => setSelected(false)}>
        
        <ambientLight />
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color={isLocal ? "purple" : color} />

        </mesh>
    )
    
}