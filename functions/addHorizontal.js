const { ipcMain } = require('electron');
const Plotly = require('plotly.js-dist')
import { createPline } from './traceCreate/createPline.js'
import { createHorizontalTrace } from './traceCreate/createHorizontalTrace.js'

document.getElementById('addHor').addEventListener('click', function (event) {
    ipcRenderer.send('addHor');
})

ipcRenderer.on('draw-horizontal', function (event) {
    let canvas = document.getElementById('plotlyPlot');
    let yValues = document.getElementById('horizontalLine').value.split(' ');
    let start = yValues[0];
    let end = yValues[1];
    let height = yValues[2];
    let color = (yValues[3] ? yValues[3] : 'red')
    let ls = (yValues[4] ? yValues[4] : 'dash')
    let config = new Map([
        ['x0', start],
        ['x1', end],
        ['y', height],
    ])
    //const newTrace = createHorizontalTrace(start, end, height, color, ls)
    const newTrace = createPline(config)
    Plotly.addTraces(canvas, newTrace)
})