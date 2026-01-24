# 🎮 Draw Your Hero

## 🧪 Semana 2 — UX & Flujos

### Laboratorio y Arena (v0)

> Documento de diseño UX  
> Wireframes conceptuales y flujos de usuario.

---

## 🧩 Wireframes UX – Laboratorio

🎯 ¿Qué es el Laboratorio?

Es el lugar seguro del jugador:

- Donde mejora su héroe
- Donde ve stats
- Donde prepara el combate

## 🧱 Pantallas mínimas del Laboratorio

"Pantalla: Laboratorio Principal"

- Héroe al centro
- Stats visibles:
- Vida
- Ataque
- Defensa
- Velocidad

> Botones:

    - ➕ Mejorar Stats
    - 🎒 Inventario
    - ⚔️ Ir a Arena

Función:

- Mostrar el estado actual del héroe
- Permitir acceso a mejoras y combate

---

> Pantalla: Mejora de Stats

Lista de stats

- Costo en puntos / recursos
- Botón confirmar mejora
- Pantalla: Inventario
- Lista de ítems
- Equipar / quitar
- Efecto visible en stats

Función:

- Incrementar atributos del héroe
- Limitar mejoras según recursos disponibles

---

### 🎒 Pantalla: Inventario

**Elementos:**

- 📦 Lista de ítems
- 🔄 Acción: Equipar / Quitar
- 📊 Visualización de cambios en stats

**Función:**

- Personalización del héroe
- Impacto directo en el rendimiento en combate

---

## ⚔️ 2. Wireframes UX – Arena

### 📌 Descripción

La Arena representa el núcleo del gameplay. Aquí se ejecutan los combates y se validan las decisiones del jugador.

---

### 🎯 Pantalla: Selección de Combate

**Elementos:**

- 👾 Lista de enemigos
- 🎚️ Nivel de dificultad
- 🏆 Recompensa estimada

**Función:**

- Permitir al jugador elegir el riesgo
- Preparar el combate

---

### ⚔️ Pantalla: Combate

**Elementos:**

- 🧍‍♂️ Héroe con ❤️ HP visible
- 👹 Enemigo con ❤️ HP visible
- 🎮 Acciones disponibles:
  - ⚔️ Atacar
  - 🛡️ Defender
  - ✨ Habilidad especial
- 🔁 Indicador de turno (Jugador / Enemigo)

**Función:**

- Resolver el combate por turnos
- Aplicar las estadísticas y mecánicas definidas

---

### 🏁 Pantalla: Resultado de Combate

**Elementos:**

- 🏆 Estado: Victoria | ❌ Derrota
- 🎁 Recompensas obtenidas
- 🔘 Opciones:
  - 🔙 Volver al Laboratorio
  - 🔁 Reintentar combate

**Función:**

- Cerrar el ciclo de combate
- Reintegrar al jugador al flujo principal

---

## 🔄 3. Flujos de Navegación

### 🧭 Flujo Principal

---

### 🔀 Flujos Alternos

- ❌ Derrota → regreso directo al Laboratorio
- 🚫 Recursos insuficientes → bloqueo de mejoras
- 💀 Vida en 0 → penalización o reinicio

---

## 🧠 4. Estados del Jugador

### 📍 Estados Definidos

- 💤 IDLE → jugador en laboratorio
- 🛠️ PREPARING → configuración de stats e ítems
- ⚔️ IN_COMBAT → combate activo
- 🏆 VICTORY → combate ganado
- ❌ DEFEAT → combate perdido

**Función:**
Estos estados servirán como base para la lógica del juego, control de flujo y futuras implementaciones en código.

---