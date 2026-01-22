

function isEven(index) {
    if (index % 2 === 0 || index === 0) {
        return 'even'
    } else {
        return 'odd'
    }
}

export function collectOutliers(fullData, objectMetricToThreshold) {
    let result = {};
    for (const [metric, threshold] of Object.entries(objectMetricToThreshold)) {
        let key = `${metric.toLowerCase()}_outliers`;
        result[key] = [];
        let filteredData = fullData.filter(d => d[metric] < threshold);
        filteredData.forEach((el, index) => {
            result[key].push(`<tr class="${isEven(index)}"><td>${el['Code']}</td><td>${el['Pool']}</td></tr>`)
        })
        result[key].push(`<tfoot><tr><td class="tfSumm">Всего:</td><td>${filteredData.length}</td></tr></tfoot>`)
    }
    return result
}