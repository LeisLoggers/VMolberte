import { configurePerTargetBox } from './perTarget/configurePerTargetBox.js';
import { configurePerTargetScatter } from './perTarget/configurePerTargetScatter.js';
import { configurePerTargetHist } from './perTarget/configurePerTargetHist.js';

export function configurePerTar(configGraph) {
    let groupBy = configGraph.get('groupBy');
    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('xMetric', 'name');
    configGraph.set('axes', ['x1', 'y1']);
    let perGene = configurePerTargetBox(configGraph);

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('xMetric', '%gc');
    configGraph.set('axes', ['x2', 'y2']);
    let ncGC = configurePerTargetScatter(configGraph);

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('axes', ['x3', 'y2']);
    let ncHist = configurePerTargetHist(configGraph);

    let layout = {
        title: {
            text: 'Отчёт по файлу per-target', font: { weight: 'bold', size: 24, family: "Arial" }
        },
        grid: {
            rows: 2,
            columns: 2,
            subplots: [
                ['x1y1', 'x2y2', 'x3y2']
            ]

        },
        // Распределение NC по генам (x1 y1)
        xaxis1: {
            domain: [0, 1],
            title: { text: 'Гены', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        yaxis1: {
            domain: [0.8, 1],
            title: { text: 'Нормализованное покрытие', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        // Распределение NC по %gc (x2 y2)
        xaxis2: {
            domain: [0, 0.9],
            title: { text: 'ГЦ-состав', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        yaxis2: {
            domain: [0, 0.8],
            title: { text: 'Нормализованное покрытие', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        // Распределение NC (x3 y2)
        xaxis3: {
            domain: [0.9, 1],
            tickfont: { size: 18, family: "Arial" },
        },
        yaxis2: {
            domain: [0, 0.8],
            title: { text: 'Нормализованное покрытие', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
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


    return [[...perGene, ...ncGC, ...ncHist], layout, config]
}