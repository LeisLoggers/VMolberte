const { ipcMain } = require('electron');
const Plotly = require('plotly.js-dist');
import { createVerticalTrace } from './traceCreate/createVerticalTrace.js';

document.getElementById('addVert').addEventListener('click', function (event) {
    const lineDirection = document.getElementById('lineDirection').value;
    if (lineDirection === 'vertical') {
        ipcRenderer.send('addVert');
    } else if (lineDirection === 'horizontal') {
        ipcRenderer.send('addHor');
    } else {
        alert('Не указано направление линии')
    }
})

ipcRenderer.on('draw-vertical', function (event) {
    const canvas = document.getElementById('plotlyPlot');
    const lineType = document.getElementById('verticalSelect').value;
    const xValues = document.getElementById('verticalLine').value.split(' ');
    const color = document.getElementById('verticalColorSelect').value;
    /* FIXME: Требуется реализовать универсальный функционал откуда куда и как рисовать линии,
    а так же изменить под это html.*/

    let x, y0, y1;
    let newTrace;

    if (lineType === 'threshold') {
        y0 = canvas.layout.yaxis.range[0];
        y1 = canvas.layout.yaxis.range[1];
        x = +xValues[0];
    } else {
        y0 = +xValues[0];
        y1 = +xValues[1];
        x = +xValues[2];
    }
    let ls = (xValues[4] ? xValues[4] : 'dash')
    let config = new Map([
        ['x', x],
        ['y0', y0],
        ['y1', y1],
        ['lc', color]
    ])
    if (lineType === 'pLine') {
        newTrace = createPline(config);
    } else {
        newTrace = createVerticalTrace(config);
    };
    Plotly.addTraces(canvas, newTrace)
})