function obtenerImageData() {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function binarizarImagen(imageData) {
  const { data, width, height } = imageData;
  const mascara = new Array(width * height);

  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // si no es blanco cuenta como dibujo
    const esDibujo = !(r > 240 && g > 240 && b > 240);
    mascara[j] = esDibujo ? 1 : 0;
  }

  return { mascara, width, height };
}

// calcular área (masa)
function calcularArea(mascara) {
  let area = 0;
  for (let i = 0; i < mascara.length; i++) {
    area += mascara[i];
  }
  return area;
}

// calcular centroide
function calcularCentroide(mascara, width, height) {
  let sumaX = 0;
  let sumaY = 0;
  let masa = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;

      if (mascara[index] === 1) {
        sumaX += x;
        sumaY += y;
        masa++;
      }
    }
  }

  if (masa === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: sumaX / masa,
    y: sumaY / masa
  };
}

function analizarDibujo() {
  const imageData = obtenerImageData();
  const { mascara, width, height } = binarizarImagen(imageData);

  const area = calcularArea(mascara);
  const centroide = calcularCentroide(mascara, width, height);

  console.log("Área del dibujo:", area);
  console.log("Centroide:", centroide);

  return { area, centroide };
}
