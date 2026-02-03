# 🎮 Draw Your Hero
## 🧪 Semana 1 – Playground
### Exploración Pixel → Stats (v0)

> Documento exploratorio  
> Los valores aquí definidos **no son finales ni balanceados**.

---

## 🎯 Objetivo
Explorar relaciones entre el dibujo 2D (píxeles, forma y complejidad)
y los atributos jugables antes de definir el sistema oficial.

---

## 📊 Stats Base (Referenciales)

Estos valores representan un personaje "promedio", antes de aplicar modificadores derivados del dibujo

| Stat | Valor Base | Rol |
| :--- | :--- | :--- |
| ❤️ HP | 100 | Vida estándar |
| 🗡️ ATK| 20 | Daño base |
| 🛡️ DEF | 10 | Mitigación |
| ⚡ SPD | 5 | Movimiento |
| 🏹 **RNG** | **5.0** | **Alcance de ataque** |
| 🤸 AGI | 20 | Respuesta |
| 🔋 STAM | 100 | Energía |
| 🎯 HITBOX | 1.0 | Tamaño neutro |
| ⚖️ BAL | 50 | Estabilidad |

---

## ✏️ Variables del Dibujo (Inputs)

| Variable | Rango | Idea |
|-------|------|------|
| PixelMass | 0–1 | Tamaño total de pixeles|
| Density | 0–1 | Compactación |
| AspectRatio | 0–1 | Proporción |
| EdgeComplexity | 0–1 | Agresividad |
| Symmetry | 0–1 | Control |

## 🔗 Tabla Conceptual Pixel → Stats

| Input | Stat Afectado | Tendencia |
| :--- | :--- | :--- |
| PixelMass | HP, HITBOX | ↑ (Sube) |
| Density | DEF | ↑ (Sube) |
| Density | SPD | ↓ (Baja) |
| EdgeComplexity | ATK | ↑ (Sube) |
| EdgeComplexity | BAL | ↓ (Baja) |
| Symmetry | AGI | ↑ (Sube) |
| AspectRatio | **RNG** | **↑ (Sube)** |
| AspectRatio | BAL | ↓ (Baja si es extremo) |
---

### 🧠 Lógica de Conversión Pixel → Stats

La tabla Pixel → Stats define cómo las características visuales del dibujo
se traducen en consecuencias jugables medibles.

El sistema no premia un “dibujo correcto”, sino decisiones visuales
que generan **trade-offs claros** entre poder, control y riesgo.

Cada variable del dibujo afecta una o más estadísticas,
siempre respetando una dirección lógica y consistente.

> - Dibujos grandes son más resistentes, pero más expuestos.
> - Dibujos compactos son más sólidos, pero menos ágiles.
> - Dibujos agresivos golpean más fuerte, pero son inestables.
> - Dibujos balanceados ofrecen mejor control y respuesta.

Esta capa conceptual sirve como puente entre creatividad y sistema,
y precede a la implementación matemática definitiva.

---

## 🧮 Normalización de Variables (Base matematica del sistema)

Todas las variables visuales del dibujo se transforman
a un rango normalizado entre 0 y 1.

> 0   = valor mínimo observado  
> 1   = valor máximo permitido 

No importa qué tan grande, raro o extremo sea el dibujo,
el sistema siempre lo traduce a una escala común.

---

## 🧩 Ejemplo mental:

El dibujo más pequeño posible → 0

El más grande permitido → 1

Uno mediano → 0.5

---
Así:

> **No hay dibujos “rotos”**

Todo cabe en el sistema

## 📐 Estructura Matemática General

Stat Final = Stat Base × Modificadores del Dibujo

Todos los personajes empiezan igual
y el dibujo los empuja en distintas direcciones.


## 🧩 Ejemplo:

HP base = 100

Tu dibujo aporta +20%

HP final = 120

> 👉 El dibujo no crea stats de cero, solo las transforma.

## ⚖️ Pesos de Influencia

Cada relación Pixel → Stat tiene un peso asociado
que define su impacto relativo.

Stat = Base × (1 + (Variable × Peso))

Los pesos dicen qué tan fuerte influye una variable.

No todo afecta igual.


## 🧩 Ejemplo:

PixelMass afecta mucho HP → peso alto

PixelMass casi no afecta SPD → peso bajo

Mentalmente:

Peso 0.2 = efecto suave

Peso 0.8 = efecto fuerte

> 👉 Los pesos son las perillas de balanceo del diseñador.

## 🧪 Ejemplos de Conversión Matemática

HP = HP_base × (1 + PixelMass × w_hp)

DEF = DEF_base × (1 + Density × w_def)

SPD = SPD_base × (1 − Density × w_spd)

ATK = ATK_base × (1 + EdgeComplexity × w_atk)

RNG = RNG_base x (1 + AspectRatio x w_rng)

**Empieza en HP base**

Mira qué tan grande es el dibujo

Aplica solo una parte de eso (peso)

## 🧩 Ejemplo mental:

PixelMass = 0.6

Peso = 0.5

→ HP sube un 30%

## 🚧 Límites de Seguridad

Todos los stats finales están limitados por rangos máximos y mínimos.

Stat_final = clamp(Stat_final, Min, Max)


## 🧠 Por qué existe

Porque los jugadores siempre buscan romper el sistema.

## 🧩 Ejemplo

Aunque la fórmula diga:

HP = 500

El clamp dice:

máximo permitido = 250

> 👉 El juego nunca se rompe.

## 🧠 Principios Matemáticos del Sistema

- No existen builds perfectas
- Todo poder tiene un costo
- Las variables visuales generan consecuencias
- El balance se logra por oposición, no por prohibición
