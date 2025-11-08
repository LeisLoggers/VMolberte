
const d3 = require('d3');
const Plotly = require('plotly.js-dist')

ipcRenderer.on('drawIt', function (event, filepath) {
    let detailBlock = document.getElementById('detailBlock');
    const available_colors = [
        '#004074', '#a0a0a0', '#cd5c5c', '#ff1493', '#ffA07a', '#ffa500',
        '#ddaddd', '#ff00ff', '#9370DB', '#4b00b2', '#adff2f', '#90ee90',
        '#3cb371', '#00b0000', '#66cdaa', '#008b0b', '#4682b4', '#7b68ee',
        '#000080', '#ffdead', '#f4a460', '#d269e1', '#800000', '#2f4f4f',
    ];
    
    let yData = {};
    let xData = {};
    let yMetric = document.getElementById('metric_1').value;
    let xMetric = document.getElementById('metric_2').value;
    let groupBy = document.getElementById('selectGroupType').value;
    xMetric = (xMetric !== '' ? xMetric : groupBy); // Если xMetric не выбран, то по x рисуем группы
    let graphTitle = (xMetric == groupBy ?
        `Распределение ${yMetric} по ${groupBy}` :
        `Зависимость ${yMetric} от ${xMetric}`);
    let graphType = document.getElementById('selectGraphType').value;
    let groupSet = new Set();
    // Парсим файл
    let fd = [];
    d3.tsv(filepath, function (data) {
        fd.push(data);
        if (data[groupBy] in yData) {
            yData[data[groupBy]].push(data[yMetric])
        } else {
            yData[data[groupBy]] = [data[yMetric]]
        }
        if (data[groupBy] in xData) {
            xData[data[groupBy]].push(data[xMetric])
        } else {
            xData[data[groupBy]] = [data[xMetric]]
        }
        groupSet.add(data[groupBy]);
    }).then(function () { 
        console.log(fd)
        let grArr = Array.from(groupSet);
        let colorDiscreteMap = {};
        grArr.forEach((group, index) => {
            colorDiscreteMap[group] = available_colors[index]
        });
        let tracesDrawable = []
        grArr.forEach(group => {
            let trace = {
                x: xData[group],
                y: yData[group],
                type: graphType,
                mode: 'markers',
                boxpoints: 'all',
                pointpos: -1.8,
                jitter: 0.5,
                marker: { color: colorDiscreteMap[group] },
                name: group,
                //customdata:,
                //hovertemplate: '<b>%{customdata[0]}'
            }
            tracesDrawable.push(trace)
        })
        

        let layout = {
            title: {
                text: graphTitle, font: { weight: 'bold', size: 24, family: "Arial"}
},
            xaxis: {
                title: { text: xMetric, font: { weight: 'bold', size: 22, family: "Arial" }},
                tickfont: { size: 18, family: "Arial" }
            },
            yaxis: {
                title: { text: yMetric, font: { weight: 'bold', size: 22, family: "Arial" }},
                tickfont: { size: 18, family: "Arial" }
            },
            legend: {
                title: { text: groupBy, font: { weight: 'bold', size: 18, family: "Arial" } },
                font: { size: 18, family: "Arial" }
            },
            height: 700,
            autosize: true
        }
        let config = { responsive: true };
        document.getElementById('plotlyPlot').innerHTML = '';
        document.getElementById('graphTitle').innerText = `${graphType}`;
        if (detailBlock.style.display == 'none') {
            detailBlock.style.display = 'grid';
        };
        Plotly.newPlot('plotlyPlot', tracesDrawable, layout, config)})
})