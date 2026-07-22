import { ContactShadows, OrbitControls } from "@react-three/drei"
import { Avatar } from "./Avatar"

// DATOS SIMULADOS (DYH-20): array "falso" que imita lo que en el futuro
// vendrá del servidor por socket ({ id, name, position }). Por ahora es
// estático para poder probar el render sin depender del backend.
const mockPlayers = [
    { id: "p1", name: "Kenner", position: [-2, 0, 0], color: "#ff8c42" },
    { id: "p2", name: "Vanessa", position: [0, 0, 0], color: "#4cc9f0" },
    { id: "p3", name: "Cesar", position: [2, 0, 0], color: "#ef476f" },
    { id: "p4", name: "Mariana", position: [0, 0, -2], color: "#06d6a0" },
]

export const AvatarScene = () => {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} intensity={1} castShadow />

            {/* DYH-20: render de múltiples avatares 3D a partir del array simulado */}
            {mockPlayers.map((player) => (
                <Avatar
                    key={player.id}
                    position={player.position}
                    color={player.color}
                    name={player.name}
                />
            ))}

            <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -1.1, 0]}
                opacity={0.4}
                blur={2}
            />

            <OrbitControls enableZoom={true} />
        </>
    )
}
