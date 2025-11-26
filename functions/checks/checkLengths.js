export function checkLengths(uniqueGroups, uniqueColorGroups, available_colors) {
    let ugl = uniqueGroups.length;
    let ucgl = uniqueColorGroups.length;
    let acl = available_colors.length;
    if (ugl > acl || ucgl > acl) {
        alert(`Количество уникальных категорий (${ugl}) или цветовых групп (${ucgl}) превышает количество допустимых цветов (${acl}).\n
        Попробуйте выбрать другие столбцы. График будет отрисован без уникальных цветовых кодировок.`)
    };
};