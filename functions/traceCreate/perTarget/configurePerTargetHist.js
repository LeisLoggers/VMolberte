import { sortNumericArray } from '../../sortNumericArray.js'
export function configurePerTargetHist(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let yMetric = configGraph.get('yMetric');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];

    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(uniqueCategories));


    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let catTrace = {
            name: category,
            type: 'histogram',
            mode: 'markers',
            marker: { color: colorDiscreteMap[filteredData.map(d => d[colorBy])[0]], size: 8 },
            legendgroup: category,
            showlegend: false,
            // Оси
            y: filteredData.map(d => d[yMetric]),
            yaxis: axes[1],
            
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