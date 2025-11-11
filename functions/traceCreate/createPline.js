export function createPline(config) {
    const x0 = config.get('from');
    const x1 = config.get('to');
    const y = parseFloat(config.get('where'));
    //const name = config.get('name');
    //const pVal = config.get('pVal');

    const mainTrace = {
        x: [x0, x1],
        y: [y, y],
        mode: 'lines',
        showlegend: false,
        line: {
            dash: 'solid',
            color: 'black',
            width: 2,
        },
    };
    let currentYaxisRange = document.getElementById('plotlyPlot').layout.yaxis.range;
    let rangeDiff = parseFloat(currentYaxisRange[1]) - parseFloat(currentYaxisRange[0]);
    let yOffsetPlus = y + (0.01 * rangeDiff);
    let yOffsetMinus = y - (0.01 * rangeDiff);

    const vert1 = {
        x: [x0, x0],
        y: [yOffsetPlus, yOffsetMinus],
        mode: 'lines',
        showlegend: false,
        line: {
            dash: 'solid',
            color: 'black',
            width: 2,
        },
    }
    const vert2 = {
        x: [x1, x1],
        y: [yOffsetPlus, yOffsetMinus],
        mode: 'lines',
        showlegend: false,
        line: {
            dash: 'solid',
            color: 'black',
            width: 2,
        },
    }

    return [mainTrace, vert1, vert2]
}