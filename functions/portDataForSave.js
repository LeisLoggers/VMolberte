import { createReportForSave } from './createReportForSave.js';
import { createPerTarForSave } from './createPerTarForSave.js';
const Plotly = require('plotly.js-dist')
const { fs } = require('fs')
const downloadBtn = document.getElementById('downloadAsHtml');
const resetBtn = document.getElementById('resetPlotSizes');


downloadBtn.addEventListener('click', function (event) {
    console.log('saving')
    const filename = document.getElementById('report').querySelector('h2').innerText;
    ipcRenderer.send('open-file-dialog-for-save', filename)
});

ipcRenderer.on('path-to-save', function (event, path, traces) {
    let header = document.getElementById('report').querySelector('.page-header').querySelector('h2').innerText.toString();
    console.log(header)
    if (header.includes('Per-target')) {
        createPerTarForSave(header, traces, path)
    } else {
        createReportForSave(header, traces, path);
    }
    
})

resetBtn.addEventListener('click', () => {
    let plots = document.querySelectorAll('.js-plotly-plot');
    plots.forEach(elem => {
        Plotly.Plots.resize(elem);
    })
})