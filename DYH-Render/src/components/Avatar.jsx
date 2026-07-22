import { Billboard, Text } from "@react-three/drei"

// Avatar individual: una cápsula con su color de identidad y su nombre
// flotando siempre de frente a la cámara (Billboard).
export const Avatar = ({ position = [0, 0, 0], color = "white", name = "" }) => {
    return (
        <group position={position}>
            {/* Cuerpo del avatar */}
            <mesh castShadow>
                <capsuleGeometry args={[0.4, 1, 4, 8]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Nombre flotante: Billboard hace que el texto siempre mire a cámara,
                sin importar hacia dónde gire el avatar o la vista del usuario */}
            <Billboard position={[0, 1.3, 0]}>
                <Text
                    fontSize={0.3}
                    color="white"
                    outlineWidth={0.02}
                    outlineColor="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            </Billboard>
        </group>
    )
}
