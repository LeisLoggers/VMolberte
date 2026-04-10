
export function configureGrouppedBoxplotTraces(configGraph, verticals, horizontals) {
    let uniqueCategories  = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorBy = configGraph.get('colorBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let xMetric = configGraph.get('xMetric');
    let yMetric = configGraph.get('yMetric');
    let graphTitle = `Распределение "${yMetric}" по "${groupBy}"`;
    let fullData = configGraph.get('data');
    const tracesDrawable = []
    const colorByValues = Object.keys(colorDiscreteMap);
    
    colorByValues.forEach(colorVal => {
        const filteredData = fullData.filter(d => d[colorBy] === colorVal);

        const x = filteredData.map(d => d[groupBy]);
        const y = filteredData.map(d => d[yMetric])
        tracesDrawable.push({
            type: 'box',
            x: x,
            y: y,
            name: colorVal,
            marker: {color: colorDiscreteMap[colorVal]},
            boxpoints: 'all',
            points: 'all',
            pointpos: -1.3,
            jitter: 0.2,
            legend: 'legend',
            hoverlabel: {
                bgcolor: 'rgba(225,225,225,0.2)',
                font: {
                    color: '#000'
                }
            }
        })
    });
    

    if (verticals) {
        verticals.forEach(vertical => { tracesDrawable.push(vertical) })
    };

    if (horizontals) {
        horizontals.forEach(horizontal => { tracesDrawable.push(horizontal) })
    };
    console.log(tracesDrawable);
    let layout = {
        title: {
            text: graphTitle, font: { weight: 'bold', size: 24, family: "Arial" }
        },
        xaxis: {
            title: { text: xMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
            categoryorder: 'array',
            categoryarray: uniqueCategories,
            automargin: true
        },
        yaxis: {
            title: { text: yMetric, font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        legend: {
            title: {
                text: colorBy,
                font: { weight: 'bold', size: 18, family: "Arial" }
            },
            font: { size: 18, family: "Arial" }
        },
        boxmode: 'group',
        height: 700,
        flexgrow: 1,
        autosize: true
    }
    let config = { responsive: true };
    

    return [tracesDrawable, layout, config]
}