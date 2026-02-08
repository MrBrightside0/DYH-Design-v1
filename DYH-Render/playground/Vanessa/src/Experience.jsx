import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Sphere } from "./Sphere"
import { useAtom } from "jotai"
// import { Players } from "./Players"
import { playersAtom } from "./SocketManager"
import { socket } from "./SocketManager"

export const Experience = () => {

    const [players]= useAtom(playersAtom)

    return (
        <>
            <ambientLight />
            {/* <Sphere /> */}
            {/* <Players /> */}
            <OrbitControls enableZoom={true} />
            
            { players.map((player)=> (
                <Sphere 
                    key={player.id}
                    positionX={player.position[0]} 
                    positionY={player.position[1]} 
                    positionZ={player.position[2]}
                    isLocal={player.id === socket.id} 
                />
            ))}
            
            <ContactShadows
                rotation-x={Math.PI /2}
                position={[0, -1.6, 0]}
                opacity={0.42} 
            />

        </>
    )
}