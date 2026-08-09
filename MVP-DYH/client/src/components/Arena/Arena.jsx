import './Arena.css';
import Arena_fondo from '../../assets/Arena_fondo.png';
import { useEffect, useState, useRef } from 'react';
import socket from '../../socket';

const Arena = ({ character, username }) => {
    const [players, setPlayers] = useState({});
    const [localId, setLocalId] = useState(null);
    const arenaRef = useRef(null);

    // Register player when character is ready
    useEffect(() => {
        if (!character) return;

        // Prepare payload including sprites and chosen color
        const payload = {
            stats: character.stats,
            color: character.color || character.stats.color || '#ff0077',
            username: username || 'Anon',
            sprites: character.sprites
        };

        socket.emit('registerPlayer', payload);

        // Handlers
        const onPlayerId = (data) => {
            setLocalId(data.playerId);
        };

        const onCurrent = (all) => {
            setPlayers(all || {});
        };

        const onNewPlayer = (p) => {
            setPlayers(prev => ({ ...prev, [p.playerId]: p }));
        };

        const onRetrans = ({ playerId, position }) => {
            setPlayers(prev => {
                if (!prev[playerId]) return prev;
                return { ...prev, [playerId]: { ...prev[playerId], position } };
            });
        };

        const onDisconnect = ({ playerId }) => {
            setPlayers(prev => {
                const copy = { ...prev };
                delete copy[playerId];
                return copy;
            });
        };

        socket.on('playerId', onPlayerId);
        socket.on('currentPlayers', onCurrent);
        socket.on('newPlayer', onNewPlayer);
        socket.on('retransmision', onRetrans);
        socket.on('disconnectPlayer', onDisconnect);

        return () => {
            socket.off('playerId', onPlayerId);
            socket.off('currentPlayers', onCurrent);
            socket.off('newPlayer', onNewPlayer);
            socket.off('retransmision', onRetrans);
            socket.off('disconnectPlayer', onDisconnect);
        };
    }, [character, username]);

    // Simple keyboard movement for local player
    useEffect(() => {
        const handleKey = (e) => {
            if (!localId) return;
            setPlayers(prev => {
                const copy = { ...prev };
                const me = copy[localId] || { position: { x: 640, y: 360 } };
                let { x, y } = me.position || { x: 640, y: 360 };
                const step = 10;
                if (e.key === 'ArrowUp') y -= step;
                if (e.key === 'ArrowDown') y += step;
                if (e.key === 'ArrowLeft') x -= step;
                if (e.key === 'ArrowRight') x += step;
                const updated = { ...me, position: { x, y } };
                copy[localId] = updated;
                // Emit movement to server
                socket.emit('playerMove', { x, y });
                return copy;
            });
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [localId]);

    const playerCount = Object.keys(players).length;

    return(
        <div className = 'arena-container' ref={arenaRef}>
            <img src = {Arena_fondo} className='arena-fondo' alt="fondo"/>

            {/* Waiting overlay if less than 2 players */}
            { playerCount < 2 && (
                <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:999}}>
                    <div style={{background:'rgba(0,0,0,0.6)', color:'white', padding:20, borderRadius:8}}>
                        Sala de espera — {playerCount}/2 jugadores conectados
                    </div>
                </div>
            )}

            {/* Render all players */}
            {Object.values(players).map(p => {
                const pos = p.position || { x: 640, y: 360 };
                const isMe = p.playerId === localId;
                const size = 64 * (p.stats?.scale || 1);
                return (
                    <div key={p.playerId} style={{position:'absolute', left: pos.x - size/2, top: pos.y - size/2, textAlign:'center'}}>
                        <div style={{marginBottom:6, color:'white', fontWeight:'bold', textShadow:'0 1px 3px rgba(0,0,0,0.7)'}}>{p.username}</div>
                        {p.sprites ? (
                            <div style={{width:size, height:size, backgroundImage:`url(${p.sprites})`, backgroundSize:'cover', border:`3px solid ${p.color}`, borderRadius:8}} />
                        ) : (
                            <div style={{width:size, height:size, backgroundColor:p.color || '#888', border:`3px solid ${p.color}`, borderRadius:999}} />
                        )}
                        {isMe && <div style={{color:'#fff', fontSize:12, marginTop:4}}>Tú</div>}
                    </div>
                )
            })}

        </div>
    );
}

export default Arena;
