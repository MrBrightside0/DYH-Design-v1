# ✏️ Draw Your Hero
> **Let AI define your Destiny** > Proyecto Integrador Ene-Jun 2026 

![Project Status](https://img.shields.io/badge/Status-Development-green?style=for-the-badge)
![Semester](https://img.shields.io/badge/Cycle-Ene_Jun_2026-blue?style=for-the-badge)

## 📖 Sobre el Proyecto
**Draw Your Hero** es una experiencia multijugador competitiva donde la creatividad define el poder. [cite_start]El usuario dibuja su propio personaje en un lienzo digital; una Inteligencia Artificial analiza el trazo (píxeles, masa, forma) y genera atributos únicos (Stats) para un avatar 3D que combatirá en una arena en tiempo real[cite: 3, 39, 41].

El sistema está dividido en 4 células de trabajo especializadas (Squads) que convergen en un MVP final.

---

## 🚀 Directorio de Squads
Acceso rápido a los repositorios de cada equipo especializado:

| Squad | Misión Principal | Tecnologías Clave |
| :--- | :--- | :--- |
| [**👁️ DYH-Vision**](./DYH-Vision) | **AI Core.** Traducir píxeles a matemáticas. | [cite_start]TensorFlow.js, Canvas API [cite: 3, 58] |
| [**🎨 DYH-Render**](./DYH-Render) | **Frontend 3D.** Visualización y shaders. | [cite_start]React Three Fiber, WebGL [cite: 10, 67] |
| [**⚙️ DYH-Server**](./DYH-Server) | **Backend.** Lógica multijugador y física. | [cite_start]Node.js, Socket.io [cite: 16, 78] |
| [**📐 DYH-Design**](./DYH-Design) | **Game Logic.** UX, Balance y Reglas. | [cite_start]Figma, JSON Data [cite: 24, 87] |

---

## 📅 Cronograma General (Roadmap)

El desarrollo está estructurado en 4 sprints semanales intensivos:

### [cite_start]**Semana 1: "Hola Mundo" & Configuración** (12 - 16 Ene) [cite: 32]
* [cite_start]**Vision:** Captura de trazos en Canvas HTML5[cite: 33].
* [cite_start]**Render:** Cubo giratorio en React Three Fiber[cite: 34].
* [cite_start]**Server:** Chat básico con WebSockets[cite: 35].
* [cite_start]**Design:** Definición de tablas de atributos[cite: 36].

### [cite_start]**Semana 2: Lógica Unitaria** (19 - 23 Ene) [cite: 38]
* [cite_start]**Vision:** Algoritmos de Área y Centroide[cite: 39].
* [cite_start]**Render:** Control de movimiento con Inputs[cite: 40].
* [cite_start]**Server:** Transmisión de coordenadas JSON[cite: 41].
* [cite_start]**Design:** Wireframes y Flujos UX[cite: 42].

### [cite_start]**Semana 3: Primera Integración** (26 - 30 Ene) [cite: 43]
* [cite_start]**Render & Server:** Sincronización visual (Cliente A ve a Cliente B)[cite: 44].
* [cite_start]**Vision:** Exportación de JSON para el motor[cite: 45].
* [cite_start]**Design:** Pruebas de balanceo teórico[cite: 47].

### [cite_start]**Semana 4: MVP End-to-End** (2 - 6 Feb) [cite: 49]
* [cite_start]Ciclo completo: Dibujo -> Generación 3D -> Instancia en Sala -> Combate con física[cite: 51, 52, 53, 54, 55].

---

## 🤝 Flujo de Trabajo (Workflow)

Para mantener el orden entre los equipos, seguimos la **Estructura Híbrida**:

1.  **Playground (`/playground`):** * Cada desarrollador tiene su propia carpeta personal.
    * Es zona de experimentación y "caja de arena".
    * *Regla:* No tocar el código personal de otros.
2.  **Source (`/src`):**
    * Contiene el código "oficial" y compartido.
    * Todo lo que entra aquí debe ser funcional.
    * Se utiliza para las integraciones de la Semana 3 y 4.

> [cite_start]"Todos los avances se subirán a un repositorio de GitHub"[cite: 56].

---
*Generated for the "Draw Your Hero" Project Team - Ene 2026.*
