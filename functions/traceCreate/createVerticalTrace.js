export function createVerticalTrace(config) {
    let x = config.get('where');
    let y0 = config.get('from');
    let y1 = config.get('to');
    let lineColor = (config.get('lc') !== '' ? config.get('lc') : 'red');
    let lineStyle = (config.get('ls') !== undefined ? config.get('ls') : 'dash');
    let lineName = (config.get('ln') !== undefined ? config.get('ln') : 'newTrace');
    let showLegend = (config.get('showLegend') !== undefined ? config.get('showLegend') : true);

    const newTrace = {
        x: [x, x],
        y: [y0, y1],
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