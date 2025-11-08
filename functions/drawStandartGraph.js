
import { configureBoxplotTraces } from "./configureBoxplotTraces.js";
import { configureScatterTraces } from "./configureScatterTraces.js";
import { configureReportTraces } from "./configureReportTraces.js"
import { fileParse } from './fileParse.js'
import { zipDict } from './zipDict.js'
const d3 = require('d3');
const Plotly = require('plotly.js-dist')




ipcRenderer.on('drawIt', function (event, filesMetaData) {
    let detailBlock = document.getElementById('detailBlock');
    const available_colors = [
        '#004074', '#a0a0a0', '#cd5c5c', '#ff1493', '#dfdf0f', '#ffa500',
        '#ddaddd', '#ff00ff', '#9370DB', '#4b00b2', '#adff2f', '#90ee90',
        '#3cb371', '#66cdaa', '#008b0b', '#4682b4', '#7b68ee', '#005959',
        '#000080', '#ffdead', '#f4a460', '#d269e1', '#800000', '#2f4f4f',
        "#C42727", "#00A651", "#0066CC", "#FFCC00", "#CC00CC", "#00CCCC",
        "#A66633", "#663399", "#339966", "#993366", "#336699", "#999933",
        "#804040", "#408040", "#404080", "#808040", "#804080", "#408080",
        "#CC6666", "#66CC66", "#6666CC", "#CCCC66", "#CC66CC", "#66CCCC",
        "#E67333", "#33E673", "#3333E6", "#E6E633", "#E633E6", "#33E6E6",
        "#B38066", "#66B380", "#8066B3", "#B3B380", "#B380B3", "#66B3B3",
        "#BF4040", "#4DBF4D", "#4D4DBF", "#BFBF40", "#BF40BF", "#40BFBF",
        "#F28C8C", "#8CF28C", "#8C8CF2", "#F2F28C", "#F28CF2", "#8CF2F2",
    ];

    let groupBy = document.getElementById('selectGroupType').value;
    let yMetric = document.getElementById('metric_1').value;
    let xMetric = document.getElementById('metric_2').value || groupBy;
    let graphType = document.getElementById('selectGraphType').value;
    let filenames = [];
    
    // Парсим файл
    (async () => {
        for (const [key, value] of filesMetaData.entries()) {
            filenames.push(value['filename'])
        }

        const fullData = await fileParse(filesMetaData);
        // Собираем конфиги
        let uniqueCategories = [... new Set(fullData.map(d => d[groupBy]))];
        let colorDiscreteMap = zipDict(uniqueCategories, available_colors);
        let configGraph = new Map()
        configGraph.set('categories', uniqueCategories);
        configGraph.set('groupBy', groupBy);
        configGraph.set('colorDiscreteMap', colorDiscreteMap);
        configGraph.set('xMetric', xMetric);
        configGraph.set('yMetric', yMetric);
        configGraph.set('graphType', graphType);
        configGraph.set('data', fullData);
        configGraph.set('filenames', filenames);
        if (graphType === 'box' || graphType === 'violin') {
            let boxplotTraces = configureBoxplotTraces(configGraph);
            Plotly.newPlot('plotlyPlot', boxplotTraces[0], boxplotTraces[1], boxplotTraces[2])
        } else if (graphType === 'scatter') {
            let scatterTraces = configureScatterTraces(configGraph);
            Plotly.newPlot('plotlyPlot', scatterTraces[0], scatterTraces[1], scatterTraces[2])
        } else if (graphType === 'quickReport') {
            configureReportTraces(configGraph, true)
        } else if (graphType === 'quickReportEnrichment') {
            configureReportTraces(configGraph, false)
        }
    })();
})