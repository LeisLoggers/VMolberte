import { configureBoxplotTraces } from "./configureBoxplotTraces.js";
import { configureScatterTraces } from "./configureScatterTraces.js";
import { createHorizontalTrace } from './traceCreate/createHorizontalTrace.js';
import { createVerticalTrace } from './traceCreate/createVerticalTrace.js';
import { fillReportDiv } from "./fillReportDiv.js"
import { sortNumericArray } from "./sortNumericArray.js"

export function configureReportTraces(configGraph, enrichmentFlag) {
    let uniqueCategories = configGraph.get('categories');
    let groupBy = configGraph.get('groupBy');
    let colorDiscreteMap = configGraph.get('colorDiscreteMap');
    let fullData = configGraph.get('data');
    let mtcMax = parseFloat(sortNumericArray(fullData.map(d => d['MEAN_TARGET_COVERAGE'])).pop());
    mtcMax += 30;
    let filenames = configGraph.get('filenames')

    let breadth_10X_trace = configureScatterTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', 'MEAN_TARGET_COVERAGE'],
        ['yMetric', (enrichmentFlag ? 'PCT_TARGET_BASES_10X' : 'PCT_TARGET_BASES_50X')],
        ['graphType', 'scatter'],
        ['data', fullData]
    ]
    ), [(enrichmentFlag ?
        createVerticalTrace(new Map([['x', 70], ['y0', 0], ['y1', 1.2], ['showLegend', false]])) :
        createVerticalTrace(new Map([['x', 300], ['y0', 0], ['y1', 1.2], ['showLegend', false]])))],
        [createHorizontalTrace(new Map([['x0', -1], ['x1', mtcMax], ['y', 0.95], ['showLegend', false]]))]);

    let breadth_20X_trace = configureScatterTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', 'MEAN_TARGET_COVERAGE'],
        ['yMetric', (enrichmentFlag ? 'PCT_TARGET_BASES_20X' : 'PCT_TARGET_BASES_100X')],
        ['graphType', 'scatter'],
        ['data', fullData]
    ]
    ), [(enrichmentFlag ?
        createVerticalTrace(new Map([['x', 70], ['y0', 0], ['y1', 1.2], ['showLegend', false]])) :
        createVerticalTrace(new Map([['x', 300], ['y0', 0], ['y1', 1.2], ['showLegend', false]])))],
        [createHorizontalTrace(new Map([['x0', -1], ['x1', mtcMax], ['y', 0.9], ['showLegend', false]]))]);

    let pct_target_bases_10X_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', (enrichmentFlag ? 'PCT_TARGET_BASES_10X' : 'PCT_TARGET_BASES_50X')],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ), '',
        [createHorizontalTrace(new Map([['x0', -1], ['x1', uniqueCategories.length], ['y', 0.95], ['showLegend', false]]))]);

    let pct_target_bases_20X_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', (enrichmentFlag ? 'PCT_TARGET_BASES_20X' : 'PCT_TARGET_BASES_100X')],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ), '', [createHorizontalTrace(new Map([['x0', -1], ['x1', uniqueCategories.length], ['y', 0.9], ['showLegend', false]]))]);

    let pct_selected_bases_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'PCT_SELECTED_BASES'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ), '', [createHorizontalTrace(new Map([['x0', -1], ['x1', uniqueCategories.length], ['y', 0.9], ['showLegend', false]]))]);

    let pct_exc_dupe_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'PCT_EXC_DUPE'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ), '', [createHorizontalTrace(new Map([['x0', -1], ['x1', uniqueCategories.length], ['y', 0.1], ['showLegend', false]])),
        createHorizontalTrace(new Map([['x0', -1], ['x1', uniqueCategories.length], ['y', 0.2], ['showLegend', false]]))]);

    let total_reads_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'TOTAL_READS'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ));

    let mean_target_coverage_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'MEAN_TARGET_COVERAGE'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ), '', [(enrichmentFlag ?
        createHorizontalTrace(new Map([['y', 70], ['x0', -1], ['y1', uniqueCategories.length], ['showLegend', false]])) :
        createHorizontalTrace(new Map([['y', 300], ['x0', -1], ['y1', uniqueCategories.length], ['showLegend', false]])))]);

    let at_dropout_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'AT_DROPOUT'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ));

    let gc_dropout_trace = configureBoxplotTraces(new Map([
        ['categories', uniqueCategories],
        ['groupBy', groupBy],
        ['colorDiscreteMap', colorDiscreteMap],
        ['xMetric', ''],
        ['yMetric', 'GC_DROPOUT'],
        ['graphType', 'box'],
        ['data', fullData]
    ]
    ));

    let traces = new Map();
    traces.set('breadth_10x', breadth_10X_trace);
    traces.set('pct_target_bases_10x', pct_target_bases_10X_trace);
    traces.set('breadth_20x', breadth_20X_trace);
    traces.set('pct_target_bases_20x', pct_target_bases_20X_trace);
    traces.set('mean_target_coverage', mean_target_coverage_trace);
    traces.set('total_reads', total_reads_trace);
    traces.set('pct_selected_bases', pct_selected_bases_trace);
    traces.set('pct_exc_dupe', pct_exc_dupe_trace);
    traces.set('at_dropout', at_dropout_trace);
    traces.set('gc_dropout', gc_dropout_trace);
    ipcRenderer.send('save-current-traces', traces);
    fillReportDiv(traces, filenames)
    
}