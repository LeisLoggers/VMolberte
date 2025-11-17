import { sortNumericArray } from '../../sortNumericArray.js'

export function configurePerTargetScatter(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let graphType = configGraph.get('graphType');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];
    let xMax = parseFloat(sortNumericArray(fullData.map(d => d[xMetric])).pop());
    let yMax = parseFloat(sortNumericArray(fullData.map(d => d[yMetric])).pop());
    xMax += xMax * 0.1;
    yMax += yMax * 0.1;


    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(uniqueCategories));


    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let catTrace = {
            name: category,
            type: graphType,
            mode: 'markers',
            marker: { color: colorDiscreteMap[filteredData.map(d => d[colorBy])[0]], size: 8 },
            legendgroup: category,
            showlegend: true,
            // Оси
            x: filteredData.map(d => d[xMetric]),
            xaxis: axes[0],
            y: filteredData.map(d => d[yMetric]),
            yaxis: axes[1],
            // Кастом
            customdata: filteredData.map(
                d => `<b>Файл:</b> ${d['filename']}<br>
<b>Группа:</b> ${d[groupBy]}<br>
<b>Code:</b> ${d['Code']}<br>
<b>${yMetric}:</b> ${d[yMetric]}<br>
<b>Ген:</b> ${d['name']}<br>
<b>Зонды:</b> ${d['probe'] || 'Не найдены'}`
            ),
            hovertemplate: '%{customdata}<extra></extra>',
            hoverlabel: {
                bgcolor: 'rgba(225,225,225,0.2)',
                font: {
                    color: '#000'
                }
            }
        }
        tracesDrawable.push(catTrace);
    };

    if (verticals) {
        verticals.forEach(vertical => { tracesDrawable.push(vertical) })
    };

    if (horizontals) {
        horizontals.forEach(horizontal => { tracesDrawable.push(horizontal) })
    };
    return tracesDrawable;
}