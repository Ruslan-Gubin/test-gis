import { COLOR_VARIANTS } from "../constants/colors";
import { getRandomNumber } from "./randomNumber";

const getColor = (i: number) => {
  return COLOR_VARIANTS[i]
}

export function calculateRandomPieSectors() {
  const numSectors = getRandomNumber(1, 8);
  let totalPercentage = 0; 

  const sectors = [];
  const result = []

  for (let i = 0; i < numSectors; i++) {
    const percentage = Math.random() * 100;
    sectors.push(percentage);
    totalPercentage += percentage;
  }

  /** Нормализуем доли секторов, чтобы их сумма была равна 100% */
  for (let i = 0; i < numSectors; i++) {
    sectors[i] /= totalPercentage;
    sectors[i] *= 100; 
    const ratio = sectors[i]
    const radius = getRandomNumber(40, 200);
    const color = getColor(i)
    result.push({ ratio, radius, color })
  }

  return result;
}

