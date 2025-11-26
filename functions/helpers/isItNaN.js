export function isItNaN(str) {
    // Функция для определения, может ли строка быть числом.
    return !isNaN(Number(str)) && str.trim() !== ''
};
