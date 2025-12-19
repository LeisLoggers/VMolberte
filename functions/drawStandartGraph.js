
import { checkLengths } from "./checks/checkLengths.js";
import { configureBoxplotTraces } from "./traceCreate/configureBoxplotTraces.js";
import { configureScatterTraces } from "./traceCreate/configureScatterTraces.js";
import { configureHistTraces } from "./traceCreate/configureHistTraces.js";
import { configureReportTraces } from "./traceCreate/configureReportTraces.js";
import { configurePerTarget } from "./traceCreate/configurePerTarget.js";
import { fileParse } from './fileParse.js';
import { zipDict } from './helpers/zipDict.js';
const Plotly = require('plotly.js-dist');




ipcRenderer.on('drawIt', function (event, filesMetaData) {
    console.log('sended')
    const available_colors = [];
    document.querySelectorAll('.color-label').forEach(label => {
        available_colors.push(label.value);
    });

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
        configGraph.set('colors', uniqueColorGroupsSorted);
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
        } else if (graphType === 'hist') {
            let heatmapTraces = configureHistTraces(configGraph);
            document.getElementById('graphTitle').innerText = 'Ваш график';
            Plotly.newPlot('plotlyPlot', heatmapTraces[0], heatmapTraces[1], heatmapTraces[2])
        }
        // Различные отчёты
        else if (graphType === 'quickReport') {
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