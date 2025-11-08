export function createHorizontalTrace(config) { 
    let x0 = config.get('x0');
    let x1 = config.get('x1');
    let y = config.get('y');
    let lineColor = (config.get('lc') !== undefined ? config.get('lc') : 'red');
    let lineStyle = (config.get('ls') !== undefined ? config.get('ls') : 'dash');
    let lineName = (config.get('ln') !== undefined ? config.get('ln') : 'newTrace');
    let showLegend = (config.get('showLegend') !== undefined ? config.get('showLegend') : true);

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