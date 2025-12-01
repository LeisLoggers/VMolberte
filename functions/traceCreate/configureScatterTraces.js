import { sortNumericArray } from '../helpers/sortNumericArray.js'




export function configureScatterTraces(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let graphTitle = `Зависимость ${yMetric} от ${xMetric}`;
    let graphType = configGraph.get('graphType');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];
    let xMax = parseFloat(sortNumericArray(fullData.map(d => d[xMetric])).pop());
    let yMax = parseFloat(sortNumericArray(fullData.map(d => d[yMetric])).pop());
    xMax += xMax * 0.1;
    yMax += yMax * 0.1;


    const tracesDrawable = []
    let xTicksOrder = uniqueCategories;


    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let catTrace = {
            name: category,
            type: graphType,
            mode: 'markers',
            marker: { color: colorDiscreteMap[filteredData.map(d => d[colorBy])[0]], size: 8 },
            // Оси
            x: filteredData.map(d => d[xMetric]),
            xaxis: axes[0],
            y: filteredData.map(d => d[yMetric]),
            yaxis: axes[1],
            // Кастом
            customdata: filteredData.map(
                d => `<b>Файл:</b> ${d['filename']}<br>
<b>Pool:</b> ${d[groupBy]}<br>
<b>Code:</b> ${d['Code']}<br>
<b>${yMetric}:</b> ${d[yMetric]}<br>
<b>${xMetric}:</b> ${d[xMetric]}`
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


    let layout = {
        title: {
            text: graphTitle, font: { weight: 'bold', size: 24, family: "Arial" }
        },
        xaxis: {
            title: { text: xMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            range: [0, xMax]

        },
        yaxis: {
            title: { text: yMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            range: [0, yMax],
        },
        legend: {
            title: { text: groupBy, font: { weight: 'bold', size: 18, family: "Arial" } },
            font: { size: 18, family: "Arial" }
        },
        legend2: {
            title: {
                text: 'Цвет',
                font: { weight: 'bold', size: 18, family: "Arial" }
            },
            font: { size: 18, family: 'Arial' },
            orientation: 'v',
            x: -0.15,
            y: 1.05,
            xanchor: 'center',
            visible: true,
        },
        height: 700,
        autosize: true
    }
    if (groupBy !== colorBy) {
        Object.keys(colorDiscreteMap).forEach(key => {
            let colorTrace = {
                name: key,
                type: 'scatter',
                mode: 'markers',
                marker: { color: colorDiscreteMap[key], size: 16 },
                visible: 'legendonly',
                legend: 'legend2',
                x: [0],
                y: [0]
            };
            tracesDrawable.push(colorTrace);
        });
    } else {
        delete layout.legend2;
    }
    let config = { responsive: true };
    

    return [tracesDrawable, layout, config]
}