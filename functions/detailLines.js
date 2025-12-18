const { ipcMain } = require('electron');
const Plotly = require('plotly.js-dist');
import { createVerticalTrace } from './traceCreate/createVerticalTrace.js';
import { createHorizontalTrace } from './traceCreate/createHorizontalTrace.js';
import { createPline } from './traceCreate/createPline.js';

document.getElementById('addVert').addEventListener('click', function (event) {
    const lineDirection = document.getElementById('lineDirection').value;
    const plotlyPlot = document.getElementById('plotlyPlot').textContent;
    if (plotlyPlot.length === 17) {
        alert('Сначала нарисуйте график');
    } else {
        if (lineDirection === 'vertical') {
            ipcRenderer.send('addVert');
        } else if (lineDirection === 'horizontal') {
            ipcRenderer.send('addHor');
        } else {
            alert('Не указано направление линии')
        }
    }
    
})

ipcRenderer.on('draw-vertical', function (event) {
    let newTrace;
    const canvas = document.getElementById('plotlyPlot');
    const lineType = document.getElementById('verticalSelect').value || 'threshold';
    const color = document.getElementById('verticalColorSelect').value;
    let fromWhere = document.getElementById('fromWhere').value || canvas.layout.yaxis.range[0];
    let toWhere = document.getElementById('toWhere').value || canvas.layout.yaxis.range[1];
    let whereLine = document.getElementById('whereLine').value;
    let ls = document.getElementById('verticalStyleSelect').value;
    let ln = document.getElementById('lineName').value || 'линия' ;
    let showLegend = (document.getElementById('showLegend').value === 'true' ? true : false);
    

    let config = new Map([
        ['where', whereLine],
        ['from', fromWhere],
        ['to', toWhere],
        ['lc', color],
        ['ls', ls],
        ['ln', ln],
        ['showLegend', showLegend]
    ])
    if (lineType === 'pValue') {
        newTrace = createPline(config).then((newTrace) => {
            Plotly.addTraces(canvas, newTrace);
        });
    } else {
        newTrace = createHorizontalTrace(config);
        Plotly.addTraces(canvas, newTrace)
    };
})

ipcRenderer.on('draw-horizontal', function (event) {
    console.log('recieved horizontal command');
    let newTrace;
    const canvas = document.getElementById('plotlyPlot');
    const lineType = document.getElementById('verticalSelect').value;
    const color = document.getElementById('verticalColorSelect').value;
    let fromWhere = document.getElementById('fromWhere').value || canvas.layout.xaxis.range[0];
    let toWhere = document.getElementById('toWhere').value || canvas.layout.xaxis.range[1];
    let whereLine = document.getElementById('whereLine').value;
    let ls = document.getElementById('verticalStyleSelect').value;
    let ln = document.getElementById('lineName').value || 'линия';
    let showLegend = (document.getElementById('showLegend').value === 'true' ? true : false);

    let config = new Map([
        ['where', whereLine],
        ['from', fromWhere],
        ['to', toWhere],
        ['lc', color],
        ['ls', ls],
        ['ln', ln],
        ['showLegend', showLegend]
    ])
    if (lineType === 'pValue') {
        newTrace = createPline(config).then((newTrace) => {
            Plotly.addTraces(canvas, newTrace);
        });
    } else {
        newTrace = createHorizontalTrace(config);
        Plotly.addTraces(canvas, newTrace)
    };
    
})