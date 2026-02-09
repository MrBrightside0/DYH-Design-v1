import { io } from "socket.io-client";
import { useEffect } from "react"
import { atom, useAtom } from "jotai"

export const socket = io("http://localhost:3000", {
    transports: ["websocket"],
});

export const playersAtom = atom({})

export const SocketManager = () => {

    const [_players, setPlayers] = useAtom(playersAtom)

    useEffect(() => {
        function onConnect() {
            console.log("connected")
        }
        function onDisconnect() {
            console.log("disconnected")
        }

        function onHello() {
            console.log("hello");
        }

        function onPlayers(value) {
            setPlayers(value)
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);
        socket.on("players", onPlayers);
        
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("hello", onHello);
            socket.off("players", onPlayers);
        }

        
        
    }, []);
    
    return null
}