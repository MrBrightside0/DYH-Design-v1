import './Arena.css';
import Arena_fondo from '../../assets/Arena_fondo.png';

const Arena = ({ character }) => {
    return(
        <div className = 'arena-container'> {/* Cajita donde va a estar la arena */}
            {/* Coso que hace que si 'character' no es nulo, muestra la arena y los sprites */}
            {character && (   
                <div className='arena'>
                    <img src = {Arena_fondo} className='arena-fondo'></img> {/* Se pone el dibujo de fondo */}
                    {/* Se hace un div, donde se pone los sprites como fondo y se recorta dependiendo del movimiento */}
                    <div className='sprites' 
                            style = {{backgroundImage: `url(${character.sprites})`,
                                        transform: `scale(${character.stats.scale})`}}>
                    </div>
                </div>
            )}
        </div>
    );
}

{/* Coso para cambiar la perspectiva del sprite (Me lo escribió claude porque lo escribió kawaisito)*/}
{/* 
    SPRITESHEET - Distribución de vistas (cada vista: 320x320px, total: 640x960px)
    ┌─────────┬─────────┐
    │   v1    │   v2    │  background-position: 0px 0px      | -320px 0px
    ├─────────┼─────────┤
    │   v3    │   v4    │  background-position: 0px -320px   | -320px -320px
    ├─────────┼─────────┤
    │   v5    │   v6    │  background-position: 0px -640px   | -320px -640px
    └─────────┴─────────┘
    Para cambiar la vista del personaje, modificar background-position en .sprites
*/}

export default Arena;
