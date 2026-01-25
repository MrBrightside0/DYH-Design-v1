import tensorflow as tf

# -----------------------------
# Carga y normalización de imagen
# -----------------------------
def cargar_imagen(path):
    imagen = tf.io.read_file(path)
    imagen = tf.image.decode_png(imagen, channels=1)
    imagen = tf.image.convert_image_dtype(imagen, tf.float32)
    return imagen


# -----------------------------
# Preprocesamiento
# -----------------------------
def binarizar_imagen(imagen, umbral=0.5):
    return tf.where(imagen > umbral, 1.0, 0.0)


# -----------------------------
# Cálculo del área (masa)
# -----------------------------
def calcular_area(mascara):
    return tf.reduce_sum(mascara)


# -----------------------------
# Cálculo del centroide
# -----------------------------
def calcular_centroide(mascara):
    h = tf.shape(mascara)[0]
    w = tf.shape(mascara)[1]

    x = tf.range(w, dtype=tf.float32)
    y = tf.range(h, dtype=tf.float32)

    X, Y = tf.meshgrid(x, y)

    masa_total = tf.reduce_sum(mascara)

    # Evita división entre cero
    masa_total = tf.maximum(masa_total, 1e-6)

    cx = tf.reduce_sum(X * mascara) / masa_total
    cy = tf.reduce_sum(Y * mascara) / masa_total

    return cx, cy


# -----------------------------
# Orquestador de flujo
# -----------------------------
def calcular_area_y_centroide(path_imagen):
    imagen = cargar_imagen(path_imagen)
    mascara = binarizar_imagen(imagen)

    area = calcular_area(mascara)
    centroide = calcular_centroide(mascara)

    return area, centroide
