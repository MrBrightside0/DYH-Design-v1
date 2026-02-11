import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"

const socket = new WebSocket("ws://localhost:8080")

const Cube = ({ isSender }) => {
    const ref = useRef()

    // oli, estas lineas para que el servidor mande la posicion y todo eso a los servidores

    useEffect(() => {
        socket.onmessage = (event) => {
            if (!ref.current || isSender) return

            const data = JSON.parse(event.data)

            ref.current.rotation.x = data.rx
            ref.current.rotation.y = data.ry
            ref.current.position.x = data.px
            ref.current.position.y = data.py
        }
    }, [isSender])

    // y esto de es lo que para recibir la info y todo eso
    useFrame((state) => {
        if (!ref.current || !isSender) return

        const data = {
            rx: state.mouse.y * Math.PI,
            ry: state.mouse.x * Math.PI,
            px: state.mouse.x * 3,
            py: state.mouse.y * 3,
        }

        ref.current.rotation.x = data.rx
        ref.current.rotation.y = data.ry
        ref.current.position.x = data.px
        ref.current.position.y = data.py

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data))
        }
    })

    return (
        <mesh ref={ref}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    )
}

export default Cube
