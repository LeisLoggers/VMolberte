import { sortNumericArray } from '../../helpers/sortNumericArray.js'
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
            // Оси
            x: filteredData.map(d => d[yMetric]),
            xaxes: axes[0],
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
    let layout = {
        title: {
            text: graphTitle,
            font: { weight: 'bold', size: 24, family: "Arial" }
        },
        xaxis: {
            title: { text: 'Распределение', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 14, family: "Arial" },
        },
        yaxis: {
            title: { text: yMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        legend: {
            title: {
                text: groupBy,
                font: { weight: 'bold', size: 18, family: "Arial" }
            },
            font: { size: 18, family: "Arial" }
        },
        height: 700,
        flexgrow: 1,
        autosize: true
    }
    let config = { responsive: true };

    return [tracesDrawable, layout, config];
}