const colorToString = (color) => {
  if (!color) return;
  const { r, g, b, a } = color;

  // Ensure values are within valid ranges
  const validR = Math.min(255, Math.max(0, r));
  const validG = Math.min(255, Math.max(0, g));
  const validB = Math.min(255, Math.max(0, b));
  const validA = Math.min(1, Math.max(0, a));

  return `rgba(${validR}, ${validG}, ${validB}, ${validA})`;
};

export default colorToString;
