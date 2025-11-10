const { ipcMain } = require('electron');
const Plotly = require('plotly.js-dist');
import { createHorizontalTrace } from './traceCreate/createHorizontalTrace.js';
import { createPline } from './traceCreate/createPline.js';

document.getElementById('addHor').addEventListener('click', function (event) {
    ipcRenderer.send('addHor');
})

ipcRenderer.on('draw-horizontal', function (event) {
    const canvas = document.getElementById('plotlyPlot');
    const lineType = document.getElementById('horizontalSelect').value;
    const yValues = document.getElementById('horizontalLine').value.split(' ');
    const color = document.getElementById('horizontalColorSelect').value;

    let x0, x1, y;
    let newTrace;
    
    if (lineType === 'threshold') {
        x0 = canvas.layout.xaxis.range[0];
        x1 = canvas.layout.xaxis.range[1];
        y = +yValues[0];
    } else {
        x0 = +yValues[0];
        x1 = +yValues[1];
        y = +yValues[2];
    }
    let ls = (yValues[4] ? yValues[4] : 'dash')
    let config = new Map([
        ['x0', x0],
        ['x1', x1],
        ['y', y],
        ['lc', color]
    ])
    if (lineType === 'pLine') {
        newTrace = createPline(config);
    } else {
        newTrace = createHorizontalTrace(config);
    };
    Plotly.addTraces(canvas, newTrace)
})