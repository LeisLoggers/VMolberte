import { sortNumericArray } from '../../helpers/sortNumericArray.js'

export function configurePerTargetScatter(configGraph, verticals, horizontals) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];
    let xValues = sortNumericArray(fullData.map(d => d[xMetric]));
    let yValues = sortNumericArray(fullData.map(d => d[yMetric]));
    let xMinMax = [xValues[0] - 0.1, xValues.pop() + 0.1]
    let yMinMax = [+yValues[0] - 0.5, +yValues.pop() + 0.5]

    const tracesDrawable = []
    let xTicksOrder = uniqueCategories;


    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d[groupBy] === category);
        let catTrace = {
            name: category,
            type: 'scatter',
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
    let layout = {
        title: {
            text: graphTitle, font: { weight: 'bold', size: 24, family: "Arial" }
        },
        xaxis: {
            title: { text: xMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            range: xMinMax

        },
        yaxis: {
            title: { text: yMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            range: yMinMax,
        },
        legend: {
            title: { text: groupBy, font: { weight: 'bold', size: 18, family: "Arial" } },
            font: { size: 18, family: "Arial" }
        },
        hovermode: 'closest',
        height: 700,
        autosize: true
    }

    let config = { responsive: true };

    return [tracesDrawable, layout, config]
}