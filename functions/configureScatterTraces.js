import { sortNumericArray } from './sortNumericArray.js'




export function configureScatterTraces(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let graphTitle = `Зависимость ${yMetric} от ${xMetric}`;
    let graphType = configGraph.get('graphType');
    let fullData = configGraph.get('data');
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
            marker: { color: colorDiscreteMap[category], size: 8 },
            x: filteredData.map(d => d[xMetric]),
            y: filteredData.map(d => d[yMetric]),
            customdata: filteredData.map(
                d => `<b>Pool:</b> ${d[groupBy]}<br>
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
        height: 700,
        autosize: true
    }

    let config = { responsive: true };
    document.getElementById('graphTitle').innerText = 'Ваш график';
    

    return [tracesDrawable, layout, config]
}