import {sortNumericArray} from '../sortNumericArray.js'




export function configureBoxplotTraces(configGraph, verticals, horizontals) {
    let uniqueCategories  = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let graphTitle = `Распределение ${yMetric} по ${groupBy}`;
    let graphType = configGraph.get('graphType');
    let fullData = configGraph.get('data');
    

    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(uniqueCategories));
    let xIndex = Array.from({ length: xTicksOrder.length }, (_, i) => i)

    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let xPos = [];
        xPos.length = filteredData.length;
        xPos.fill(xTicksOrder.indexOf(category));
        let catTrace = {
            name: category,
            type: graphType,
            mode: 'markers',
            outliercolor: 'red',
            marker: { color: colorDiscreteMap[filteredData.map(d => d[colorBy])[0]], size: 8 },
            boxpoints: 'all',
            points: 'all',
            pointpos: -1.8,
            jitter: 0.5,

            x: xPos,
            y: filteredData.map(d => d[yMetric]),
            customdata: filteredData.map(
                d => `<b>Файл:</b> ${d['filename']}<br>
<b>Группа:</b> ${d[groupBy]}<br>
<b>Code:</b> ${d['Code']}<br>
<b>${yMetric}:</b> ${d[yMetric]}`
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
            range: [xIndex[0] - 1, xIndex.at(-1) + 1],
            tickmode: 'array',
            tickvals: xIndex,
            ticktext: xTicksOrder
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
    document.getElementById('graphTitle').innerText = 'Ваш график';
    

    return [tracesDrawable, layout, config]
}