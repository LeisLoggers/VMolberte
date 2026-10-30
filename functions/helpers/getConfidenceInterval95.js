export function getConfidenceInterval95(data) {
  const n = data.length;
  if (n < 2) return null;
  // 1. Среднее арифметическое (mean)
  const mean = data.reduce((sum, val) => sum + val, 0) / n;

  // 2. Дисперсия и стандартное отклонение
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);

  // 3. Стандартнуая ошибка
  const stdError = stdDev / Math.sqrt(n);

  // 4. Z-оценка для 95% уровня доверия равна примерно 1.96 - табличное значение
  const z = 1.96; 
  const marginOfError = z * stdError;

  return {
    mean: mean,
    lowerBound: mean - z * stdDev, // Нижняя граница
    upperBound: mean + z * stdDev  // Верхняя граница
  };
}