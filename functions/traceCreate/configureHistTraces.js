import {getConfidenceInterval95} from '../helpers/getConfidenceInterval95.js';
import {createVerticalTrace} from './createVerticalTrace.js';

export function configureHistTraces(configGraph) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let yMetric = configGraph.get('yMetric');
    let graphTitle = `Распределение ${yMetric} по ${groupBy}`;
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];

    const tracesDrawable = []
    let xTicksOrder = uniqueCategories;
    let ciData = fullData.map(d => d[yMetric]);
    let data = ciData
        .map(val => Number(val))
        .filter(val => !isNaN(val)); // Удалит элементы, которые не удалось превратить в числа
    let ci = getConfidenceInterval95(data);
    let ciConfigL = new Map([
        ['where', ci['lowerBound']], 
        ['from', 0], 
        ['to', ci['mean']]
    ]);
    let ciConfigU = new Map([
        ['where', ci['upperBound']], 
        ['from', 0], 
        ['to', ci['mean']]
    ]);
    
    let verticals = []
    verticals.push(createVerticalTrace(ciConfigL))
    verticals.push(createVerticalTrace(ciConfigU))
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
        shapes: verticals,
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
    console.log(layout.shapes);
    return [tracesDrawable, layout, config];
}