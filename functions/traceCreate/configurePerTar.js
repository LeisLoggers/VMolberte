import { configurePerTargetBox } from './perTarget/configurePerTargetBox.js';
import { configurePerTargetScatter } from './perTarget/configurePerTargetScatter.js';
import { configurePerTargetHist } from './perTarget/configurePerTargetHist.js';

export function configurePerTar(configGraph) {
    let groupBy = configGraph.get('groupBy');
    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('xMetric', 'name');
    configGraph.set('axes', ['x2', 'y2']);
    let box = configurePerTargetBox(configGraph);
    let perGene = box[0];
    let range = box[1];

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('xMetric', '%gc');
    configGraph.set('axes', ['x3', 'y3']);
    let ncGC = configurePerTargetScatter(configGraph);

    let layout = {
        title: {
            text: 'Отчёт по файлу per-target', font: { weight: 'bold', size: 24, family: "Arial" }
        },
        grid: {
            rows: 2,
            columns: 1,
            subplots: [
                ['x2y2', 'x3y3']
            ]

        },
        // Распределение NC по генам (x1 y1)
        xaxis2: {
            domain: [0, 1],
            title: { text: 'Гены', font: { weight: 'bold', size: 16, family: "Arial" } },
            tickfont: { size: 16, family: "Arial" },
            range: [range[0][0] - 1, range[0].at(-1) + 1],
            tickmode: 'array',
            tickvals: range[0],
            ticktext: range[1]
        },
        yaxis2: {
            domain: [0.85, 1],
            tickfont: { size: 18, family: "Arial" },
        },
        // Распределение NC по %gc (x2 y2)
        xaxis3: {
            domain: [0, 1],
            range:[0, 1],
            title: { text: 'ГЦ-состав', font: { weight: 'bold', size: 22, family: "Arial" } },
            tickfont: { size: 18, family: "Arial" },
        },
        yaxis3: {
            domain: [0, 0.6],
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
    
    return [[...perGene, ...ncGC], layout, config]
}