function validateMovement(data) {
  if (!data) return false;

  const { x, y, z } = data;

  const isValid =
    typeof x === "number" &&
    typeof y === "number" &&
    typeof z === "number";

  return isValid;
}

module.exports = { validateMovement };
