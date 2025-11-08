const { ipcMain } = require('electron');
const Plotly = require('plotly.js-dist');
import { createVerticalTrace } from './traceCreate/createVerticalTrace.js';

document.getElementById('addVert').addEventListener('click', function (event) {
    ipcRenderer.send('addVert');
})

ipcRenderer.on('draw-vertical', function (event) {
    let canvas = document.getElementById('plotlyPlot');
    let yValues = document.getElementById('horizontalLine').value.split(' ');
    let y0 = yValues[0];
    let y1 = yValues[1];
    let x = yValues[2];
    let color = (yValues[3] ? yValues[3] : 'red')
    let ls = (yValues[4] ? yValues[4] : 'dash')

    const newTrace = createVerticalTrace(y0, y1, x, color, ls)
    Plotly.addTraces(canvas, newTrace)
})