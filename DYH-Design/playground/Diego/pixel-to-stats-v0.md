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
|----|-----------|----|
| ❤️ HP | 100 | Vida estándar |
| 🗡️ ATK | 20 | Daño base |
| 🛡️ DEF | 10 | Mitigación |
| ⚡ SPD | 5 | Movimiento |
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
|-----|-------------|----------|
| PixelMass | HP, HITBOX | ↑ |
| Density | DEF | ↑ |
| Density | SPD | ↓ |
| EdgeComplexity | ATK | ↑ |
| EdgeComplexity | BAL | ↓ |
| Symmetry | AGI | ↑ |
| AspectRatio extremo | BAL | ↓ |

---

### 🧠 Lógica de Conversión Pixel → Stats

La tabla Pixel → Stats define cómo las características visuales del dibujo
se traducen en consecuencias jugables medibles.

El sistema no premia un “dibujo correcto”, sino decisiones visuales
que generan **trade-offs claros** entre poder, control y riesgo.

Cada variable del dibujo afecta una o más estadísticas,
siempre respetando una dirección lógica y consistente.

- Dibujos grandes son más resistentes, pero más expuestos.
- Dibujos compactos son más sólidos, pero menos ágiles.
- Dibujos agresivos golpean más fuerte, pero son inestables.
- Dibujos balanceados ofrecen mejor control y respuesta.

Esta capa conceptual sirve como puente entre creatividad y sistema,
y precede a la implementación matemática definitiva.
