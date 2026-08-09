import { useState, useEffect, useRef } from 'react';
import socket from '../../socket';
import "./Chat.css";

export const Chat = ({ username, setUsername }) => {
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const contenedor = useRef(null);

    //Envio de los mensajes
    const handleSubmit = (e) => {
        e.preventDefault();

        //Verifica que no se manden mensajes sin nombre de usuario o mensajes en blanco
        if(message.trim() === "" || (username || '').trim() === "") return;
        
        socket.emit('message', {body: message, user: username});
        const newMsg = {
            body: message,
            user: username
        };

        //Agrega un nuevo mensaje al historial de mensajes
        setListMessages([...listMessages, newMsg]);
        setMessage('');
    }

    //Recepcion de los mensajes
    useEffect( () => {
        const receiveMessage = msg => {
            console.log("Mensaje que llegó del servidor:", msg);
            setListMessages([...listMessages, msg]);
        };
        socket.on('message', receiveMessage);

        return () => socket.off('message', receiveMessage);
    }, [listMessages]);

    //Autoscroll
    const scroll = () => {
        if (!contenedor.current) return; //evita que se ejecute el autoscroll si todavia no hay contenedor de chat
        const { offsetHeight, scrollHeight, scrollTop } = contenedor.current;
         if (scrollHeight <= scrollTop + offsetHeight + 100) { //Evita que el autoscroll ocurra si el jugador esta leyendo mensajes pasados
            contenedor.current?.scrollTo(0, scrollHeight)
        }
    };
    useEffect(() => {
        scroll()
    }, [listMessages]);

    //Division de los elementos HTML en caso de que el chat este abierto 
    return (
        <div className="chat-flotante">
        <button className="boton-chat" onClick={() => setOpen(!open)}>  {/*Boton de abrir y cerrar chat*/}
            {open ? "Cerrar chat" : "Abrir chat"}
        </button>

        {open && ( 
        <div className="chat-content">
            <input 
            value={username}
            onChange={event => setUsername(event.target.value)} 
            className='txt-username' 
            type="text" 
            placeholder='Ingrese su nombre de usuario' 
            />

            <div className='chat-container' ref={contenedor}>
            {
                listMessages.map((msg, idx) => (
                    <div className="msg-bubble" key={idx}>
                    <span className="msg-user">{msg.user}</span>
                    <span className="msg-body">: {msg.body}</span>
                    </div>
                ))
            }
             <div></div>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <div className='div-type-chat'>
                    <input
                    value={message}
                    placeholder="Ingrese su mensaje..."
                    onChange={ e => setMessage(e.target.value)}
                    type="text"
                    className="input-style"
                    autoComplete="off"
                    />
                    <button type="submit">Enviar</button>       
                </div>
            </form>
        </div>
        )}
        </div>
    );
};
export default Chat; 