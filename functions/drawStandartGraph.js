
import { checkLengths } from "./checks/checkLengths.js";
import { configureBoxplotTraces } from "./traceCreate/configureBoxplotTraces.js";
import { configureScatterTraces } from "./traceCreate/configureScatterTraces.js";
import { configureReportTraces } from "./traceCreate/configureReportTraces.js";
import { configurePerTarget } from "./traceCreate/configurePerTarget.js";
import { fileParse } from './fileParse.js';
import { zipDict } from './helpers/zipDict.js';
const Plotly = require('plotly.js-dist');




ipcRenderer.on('drawIt', function (event, filesMetaData) {
    console.log('sended')
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
    let colorBy = document.getElementById('selectGroupColor').value;
    let yMetric = document.getElementById('metric_1').value;
    let xMetric = document.getElementById('metric_2').value || groupBy;
    let graphType = document.getElementById('selectGraphType').value;
    let filenames = [];
    let uniqueCategoriesSorted = [...document.getElementById('groupSort').querySelectorAll('.sortableContent')].map(el => el.innerText);
    let uniqueColorGroupsSorted = (
        [...document.getElementById('colorSort').querySelectorAll('.sortableContent')].map(el => el.innerText).length === 0 ?
            uniqueCategoriesSorted :
            [...document.getElementById('colorSort').querySelectorAll('.sortableContent')].map(el => el.innerText)
    );
    // Парсим файл
    (async () => {
        for (const [key, value] of filesMetaData.entries()) {
            filenames.push(value['filename'])
        }

        const fullData = await fileParse(filesMetaData);
        // Собираем конфиги
        // Проверка соответствия длин списков
        checkLengths(uniqueCategoriesSorted, uniqueColorGroupsSorted, available_colors);
        //
        let colorDiscreteMap = zipDict(uniqueColorGroupsSorted, available_colors);
        let configGraph = new Map()
        configGraph.set('categories', uniqueCategoriesSorted);
        configGraph.set('groupBy', groupBy);
        configGraph.set('colorBy', colorBy);
        configGraph.set('colorDiscreteMap', colorDiscreteMap);
        configGraph.set('xMetric', xMetric);
        configGraph.set('yMetric', yMetric);
        configGraph.set('graphType', graphType);
        configGraph.set('data', fullData);
        configGraph.set('filenames', filenames);
        if (graphType === 'box' || graphType === 'violin') {
            let boxplotTraces = configureBoxplotTraces(configGraph);
            document.getElementById('graphTitle').innerText = 'Ваш график';
            Plotly.newPlot('plotlyPlot', boxplotTraces[0], boxplotTraces[1], boxplotTraces[2])
        } else if (graphType === 'scatter') {
            let scatterTraces = configureScatterTraces(configGraph);
            document.getElementById('graphTitle').innerText = 'Ваш график';
            Plotly.newPlot('plotlyPlot', scatterTraces[0], scatterTraces[1], scatterTraces[2])
        // Различные отчёты
        } else if (graphType === 'quickReport') {
            configureReportTraces(configGraph, true)
        } else if (graphType === 'quickReportEnrichment') {
            configureReportTraces(configGraph, false)
        } else if (graphType === 'quickReportPerTarget') {
            let genes = [... new Set(fullData.map(d => d['name']))];
            configGraph.set('genes', genes);
            configurePerTarget(configGraph);
        }
    })();
})