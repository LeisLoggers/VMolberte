import { sortNumericArray } from '../../sortNumericArray.js'
export function configurePerTargetBox(configGraph, verticals, horizontals) {
    let uniqueCategories = Array.from(configGraph.get('categories'));
    let graphTitle = configGraph.get('graphTitle');
    let genes = configGraph.get('genes');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let yMetric = configGraph.get('yMetric');
    let fullData = configGraph.get('data');
    let axes = configGraph.get('axes') || ['x', 'y'];

    const tracesDrawable = []
    let xTicksOrder = sortNumericArray(Array.from(genes));
    let xIndex = Array.from({ length: xTicksOrder.length }, (_, i) => i)
    let passedGroups = new Set();
    for (let category of xTicksOrder) {
        const filteredData = fullData.filter(d => d['name'] === category);
        for (let group of uniqueCategories) {
            let geneData = filteredData.filter(d => d[groupBy] === group);
            let xPos = [];
            xPos.length = geneData.length;
            xPos.fill(xTicksOrder.indexOf(category));
            let catTrace = {
                name: group,
                type: 'violin',
                mode: 'markers',
                outliercolor: 'red',
                legendgroup: group,
                legendgrouptitle: group,
                // Оптимизация для большого количества графиков
                visible: (uniqueCategories.indexOf(group) !== 0 ? 'legendonly' : true),
                showlegend: (passedGroups.has(group) ? false : true),
                marker: { color: colorDiscreteMap[geneData.map(d => d[colorBy])[0]], size: 8 },
                boxpoints: 'all',
                points: 'all',
                pointpos: -1.8,
                jitter: 0.5,
                // Оси
                x: xPos,
                xaxis: axes[0],
                y: geneData.map(d => d[yMetric]),
                yaxis: axes[1],
                // Кастом
                customdata: geneData.map(
                    d => `<b>Файл:</b> ${d['filename']}<br>
<b>Группа:</b> ${d[groupBy]}<br>
<b>Code:</b> ${d['Code']}<br>
<b>${yMetric}:</b> ${d[yMetric]}<br>
<b>%gc:</b> ${d['%gc']}<br>
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
            passedGroups.add(group);
            tracesDrawable.push(catTrace);
        }
        
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
            title: { text: 'Гены', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            range: [xIndex[0] - 1, xIndex.at(-1) + 1],
            tickmode: 'array',
            tickvals: xIndex,
            ticktext: xTicksOrder,
            automargin: true,
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