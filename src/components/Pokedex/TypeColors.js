export const TYPE_COLOR = {
  normal: "#A8A878",
  water: "#6890F0",
  ice: "#86D1F3",
  grass: "#78c850",
  fire: "#F08030",
  dragon: "#7038F8",
  electric: "#F8D030",
  bug: "#A8B820",
  fairy: "#EE99AC",
  ground: "#E0C068",
  rock: "#B8A038",
  steel: "#42BD94",
  poison: "#A040A0",
  ghost: "#705898",
  dark: "#5A5979",
  flying: "#4A677D",
  fighting: "#994025",
  psychic: "#F85888",
};

export const hexToRGBA = (hex, a = 0.2) => {
  if (!hex) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r},${g},${b},${a})`;
};

export const COLOR = {
  TYPE: (type = "normal", opacity = 0.9) =>
    hexToRGBA(TYPE_COLOR[type], opacity),
  LINEAR_GRAD: (type = "normal", opacity = 0.9) =>
    `linear-gradient(${hexToRGBA(TYPE_COLOR[type], opacity)},#000)`,
};
