# ✏️ Draw Your Hero
> **Let AI define your Destiny** > Proyecto Integrador Ene-Jun 2026 

![Project Status](https://img.shields.io/badge/Status-Development-green?style=for-the-badge)
![Semester](https://img.shields.io/badge/Cycle-Ene_Jun_2026-blue?style=for-the-badge)

## 📖 Sobre el Proyecto
**Draw Your Hero** es una experiencia multijugador competitiva donde la creatividad define el poder. El usuario dibuja su propio personaje en un lienzo digital; una Inteligencia Artificial analiza el trazo (píxeles, masa, forma) y genera atributos únicos (Stats) para un avatar 3D que combatirá en una arena en tiempo real.

El sistema está dividido en 4 células de trabajo especializadas (Squads) que convergen en un MVP final.

---

## 🚀 Directorio de Squads
Acceso rápido a los repositorios de cada equipo especializado:

| Squad | Misión Principal | Tecnologías Clave |
| :--- | :--- | :--- |
| [**👁️ DYH-Vision**](./DYH-Vision) | **AI Core.** Traducir píxeles a matemáticas. | TensorFlow.js, Canvas API |
| [**🎨 DYH-Render**](./DYH-Render) | **Frontend 3D.** Visualización y shaders. | React Three Fiber, WebGL |
| [**⚙️ DYH-Server**](./DYH-Server) | **Backend.** Lógica multijugador y física. | Node.js, Socket.io |
| [**📐 DYH-Design**](./DYH-Design) | **Game Logic.** UX, Balance y Reglas. | Figma, JSON Data |

---

## 📅 Cronograma General (Roadmap)

El desarrollo está estructurado en 4 sprints semanales intensivos:

### **Semana 1: "Hola Mundo" & Configuración** (12 - 16 Ene)
* **Vision:** Captura de trazos en Canvas HTML5.
* **Render:** Cubo giratorio en React Three Fiber.
* **Server:** Chat básico con WebSockets.
* **Design:** Definición de tablas de atributos.

### **Semana 2: Lógica Unitaria** (19 - 23 Ene)
* **Vision:** Algoritmos de Área y Centroide.
* **Render:** Control de movimiento con Inputs.
* **Server:** Transmisión de coordenadas JSON.
* **Design:** Wireframes y Flujos UX.

### **Semana 3: Primera Integración** (26 - 30 Ene)
* **Render & Server:** Sincronización visual (Cliente A ve a Cliente B).
* **Vision:** Exportación de JSON para el motor.
* **Design:** Pruebas de balanceo teórico.

### **Semana 4: MVP End-to-End** (2 - 6 Feb)
* Ciclo completo: Dibujo -> Generación 3D -> Instancia en Sala -> Combate con física.

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

> "Todos los avances se subirán a un repositorio de GitHub".

---
*Generated for the "Draw Your Hero" Project Team - Ene 2026.*
