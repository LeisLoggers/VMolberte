import { isItNaN } from './isItNaN.js'

const compareFn = (a, b) => parseFloat(a) - parseFloat(b)
export function sortNumericArray(array) {
    // Функция для сортировки значений группы при числовых значениях групп
    let strings = [];
    let nums = [];
    array.forEach(el => {
        if (isItNaN(el)) {
            nums.push(el);
        } else {
            strings.push(el);
        }
    });
    nums.sort(compareFn);
    strings.sort()
    return [...nums, ...strings]
}