import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Sphere } from "./Sphere"

export const Experience = () => {
    return (
        <>
            <Sphere />
            <OrbitControls enableZoom={false} />

            <ContactShadows
                rotation-x={Math.PI /2}
                position={[0, -1.6, 0]}
                opacity={0.42} 
            />

        </>
    )
}