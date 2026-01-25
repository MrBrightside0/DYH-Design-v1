import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
// import { OrbitControls } from "@react-three/drei"
import { Mesh } from "three"
import { useKeyboardControls, useCursor } from "@react-three/drei"
import { Controls } from "./Controls"

const movement_speed = 0.01

interface SphereProps {
    positionX?: number,
    positionY?: number,
    positionZ?: number,
}

export const Sphere = ({
    positionX = 0,
    positionY = 0,
    positionZ = 0,
}: SphereProps) => {
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

    const ref = useRef<Mesh>(null!)

    useFrame(() => {
        if (!selected) return

        if (forwardPressed) ref.current.position.z -= movement_speed
        if (backwardPressed) ref.current.position.z += movement_speed
        if (leftPressed) ref.current.position.x -= movement_speed
        if (rightPressed) ref.current.position.x += movement_speed
    })

    return (
        <mesh ref={ref}
        position={[0, 0, 0]}
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
        <meshStandardMaterial color={color} />

        </mesh>
    )
    
}