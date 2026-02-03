# 🧪 Semana 3: Probando el Balance (Paper Prototyping)

> **Estado:** Listo ✅  
> **Resumen:** Hicimos pelear a los dibujos en papel para asegurarnos de que el juego sea justo (tipo Piedra, Papel o Tijera).

---

## 🎭 1. Los 4 Roles Principales

Después de revisar los datos, estos son los 4 tipos de personajes definidos.  
Aquí están sus stats finales, incluyendo cuánta vida tienen y su rango de ataque.

| Icono | Arquetipo | Vida (HP) | Stats Clave | Fuerte contra 🟢 | Débil contra 🔴 |
|:---:|:---|:---:|:---|:---|:---|
| 🏹 | **Francotirador** | **5** (Papel) | Rango: 10, Daño: 8, Vel: 2 | **Tanques** *(Lentos)* | **Asesinos** *(Rápidos)* |
| 🗡️ | **Asesino** | **5** (Papel) | Vel: 8, Daño: 6, Rango: 4 | **Snipers** *(Frágiles)* | **Tanques** *(Duros)* |
| 🛡️ | **Tanque** | **8** (Muro) | Def: 8, Rango: 4, Vel: 3 | **Asesinos** *(Poco daño)* | **Snipers** *(Kiteo)* |
| ⚔️ | **Soldado** | **6** (Normal) | Todo: 6, Rango: 6, Vel: 6 | **Nadie** *(Neutro)* | **Nadie** *(Neutro)* |

> **Nota:**  
> * **HP 5:** Se muere de 2 o 3 golpes fuertes.  
> * **HP 8:** Aguanta muchísimo castigo.  
> * **Rango 10:** Pega de lado a lado de la pantalla.

---

## ⚔️ 2. ¿Quién gana a quién? (Resumen Rápido)

Simulamos combates 1 contra 1 y así quedó el balance del juego:

### 🟢 El Francotirador destroza al Tanque
* **¿Por qué?** El Tanque es lentísimo (Vel 3). El Sniper le baja toda la vida (HP 8) a disparos antes de que el Tanque pueda acercarse.

### 🟢 El Asesino caza al Francotirador
* **¿Por qué?** El Sniper tiene muy poca vida (HP 5). El Asesino es tan rápido (Vel 8) que esquiva las balas, se le pone enfrente y lo elimina rápido.

### 🟢 El Tanque aplasta al Asesino
* **¿Por qué?** El Asesino pega rápido pero suave. El Tanque tiene tanta defensa y vida que los golpes le hacen cosquillas. Gana por resistencia.

### 🟡 El Soldado... depende de ti
* Como tiene **Vida 6** y stats balanceados, sus peleas siempre son un **Empate Técnico**. Aquí no gana el dibujo, ganan tus manos.

---

## 🎨 3. ¿Cómo lo va a ver el jugador?

Para que no tengan que leer números aburridos, vamos a poner un **Gráfico de Radar** antes de pelear:

* Pico hacia arriba 👉 **Sniper**
* Pico a la derecha 👉 **Asesino**
* Gráfico “gordo” abajo 👉 **Tanque**