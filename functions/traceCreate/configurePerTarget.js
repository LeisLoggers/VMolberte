import { configurePerTargetBox } from './perTarget/configurePerTargetBox.js';
import { configurePerTargetScatter } from './perTarget/configurePerTargetScatter.js';
import { configurePerTargetHist } from './perTarget/configurePerTargetHist.js';
import { createHorizontalTrace } from './createHorizontalTrace.js';
import { createVerticalTrace } from './createVerticalTrace.js';
import { fillPerTargetReport } from '../fillPerTargetReport.js';

export function configurePerTarget(configGraph) {
    const maxXlength = configGraph.get('genes').length;
    const filenames = configGraph.get('filenames')

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('graphTitle', 'Распределение нормализованного покрытия')
    let perGeneNCHist = configurePerTargetHist(
        configGraph,
        [createVerticalTrace(new Map([['where', 0.5], ['from', 0], ['to', 100], ['showLegend', false]])),
         createVerticalTrace(new Map([['where', 1.5], ['from', 0], ['to', 100], ['showLegend', false]]))]
    );

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('graphTitle', 'Распределение нормализованного покрытия по генам')
    let perGeneNCBox = configurePerTargetBox(
        configGraph,
        [createHorizontalTrace(new Map([['where', 0.5], ['from', -0.5], ['to', maxXlength], ['showLegend', false]])),
        createHorizontalTrace(new Map([['where', 1.5], ['from', -0.5], ['to', maxXlength], ['showLegend', false]]))]
    );

    configGraph.set('yMetric', 'mean_coverage');
    configGraph.set('graphTitle', 'Распределение среднего покрытия по генам')
    let perGeneMCBox = configurePerTargetBox(
        configGraph
    );

    configGraph.set('yMetric', 'normalized_coverage');
    configGraph.set('xMetric', '%gc');
    configGraph.set('graphTitle', 'Распределение нормализованного покрытия по ГЦ-составу')
    let perGeneNCscatter = configurePerTargetScatter(
        configGraph,
    [createHorizontalTrace(new Map([['where', 0.5], ['from', 0.2], ['to', 0.8], ['showLegend', false]])),
     createHorizontalTrace(new Map([['where', 1.5], ['from', 0.2], ['to', 0.8], ['showLegend', false]]))]);

    let traces = new Map();
    traces.set('perGeneNCHist', perGeneNCHist);
    traces.set('perGeneNCBox', perGeneNCBox);
    traces.set('perGeneMCBox', perGeneMCBox);
    traces.set('perGeneNCscatter', perGeneNCscatter);
    fillPerTargetReport(traces, filenames);
}