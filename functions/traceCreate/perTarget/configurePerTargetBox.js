import { sortNumericArray } from '../../sortNumericArray.js'
export function configurePerTargetBox(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let genes = configGraph.get('genes');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let yMetric = configGraph.get('yMetric');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];
    console.log(axes);

    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(genes));
    let xIndex = Array.from({ length: xTicksOrder.length }, (_, i) => i)

    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d['name'] === category);
        for (let group of uniqueCategories) {
            let geneData = filteredData.filter(d => d[groupBy] === group);
            let xPos = [];
            xPos.length = geneData.length;
            xPos.fill(xTicksOrder.indexOf(category));
            let catTrace = {
                name: group,
                type: 'box',
                mode: 'markers',
                outliercolor: 'red',
                marker: { color: colorDiscreteMap[geneData.map(d => d[colorBy])[0]], size: 8 },
                boxpoints: 'all',
                points: 'all',
                pointpos: -1.8,
                jitter: 0.5,
                legendgroup: group,
                showlegend: false,
                // Оси
                x: xPos,
                xaxis: axes[0],
                y: filteredData.map(d => d[yMetric]),
                yaxis: axes[1],
                // Кастом
                customdata: geneData.map(
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
        }
        
    };

    if (verticals) {
        verticals.forEach(vertical => { tracesDrawable.push(vertical) })
    };

    if (horizontals) {
        horizontals.forEach(horizontal => { tracesDrawable.push(horizontal) })
    };
    return [tracesDrawable, [xIndex, xTicksOrder]];
}