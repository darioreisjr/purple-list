export const getRandomStock = (min: number = 2, max: number = 100): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
