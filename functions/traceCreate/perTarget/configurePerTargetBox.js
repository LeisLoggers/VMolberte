import { sortNumericArray } from '../../sortNumericArray.js'
export function configurePerTargetBox(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let genes = configGraph.get('genes');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let yMetric = configGraph.get('yMetric');
    let graphType = configGraph.get('graphType');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];


    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(uniqueCategories));
    

    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let xPos = [];
        xPos.length = filteredData.length;
        xPos.fill(xTicksOrder.indexOf(category));
        for (let gene of genes) {
            let geneData = filteredData.filter(d => d['name'] === gene);
            let catTrace = {
                name: category,
                type: graphType,
                mode: 'markers',
                outliercolor: 'red',
                marker: { color: colorDiscreteMap[geneData.map(d => d[colorBy])[0]], size: 8 },
                boxpoints: 'all',
                points: 'all',
                pointpos: -1.8,
                jitter: 0.5,
                legendgroup: category,
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
    return tracesDrawable;
}