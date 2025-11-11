export function createHorizontalTrace(config) { 
    let x0 = config.get('from');
    let x1 = config.get('to');
    let y = config.get('where');
    let lineColor = (config.get('lc') !== undefined ? config.get('lc') : 'red');
    let lineStyle = (config.get('ls') !== undefined ? config.get('ls') : 'dash');
    let lineName = (config.get('ln') !== undefined ? config.get('ln') : 'линия');
    let showLegend = (config.get('showLegend') !== undefined ? config.get('showLegend') : false);

    const newTrace = {
        x: [x0, x1],
        y: [y, y],
        mode: 'lines',
        name: lineName,
        showlegend: showLegend,
        line: {
            color: lineColor,
            dash: lineStyle,
            width: 2,
        },
    }
    return newTrace
};