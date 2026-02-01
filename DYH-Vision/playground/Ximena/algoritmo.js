function calculos(ctx, canvas) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let area = 0;
  let sumX = 0;
  let sumY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const alpha = imageData.data[index + 3];

      if (alpha > 0) {
        area++;
        sumX = sumX + x;
        sumY = sumY + y;
      }
    }
  }

  if (area === 0) return null;

  return {
    area: area,
    sumX: sumX,
    sumY: sumY,
    centroidX: sumX / area,
    centroidY: sumY / area
  };
}


canvas.addEventListener("pointerup", () => {
  const result = calculos(ctx, canvas);
  console.log(result);
  console.log(JSON.stringify(result, null, 2));
});

