import { createReportForSave } from './createReportForSave.js';
import { createPerTarForSave } from './createPerTarForSave.js';
const Plotly = require('plotly.js-dist');
const downloadBtn = document.getElementById('downloadAsHtml');
const resetBtn = document.getElementById('resetPlotSizes');


downloadBtn.addEventListener('click', function (event) {
    console.log('saving')
    const filename = document.getElementById('report').querySelector('h2').innerText;
    ipcRenderer.send('open-file-dialog-for-save', filename)
});

ipcRenderer.on('path-to-save', function (event, path, traces) {
    let header = document.getElementById('report').querySelector('.page-header').querySelector('h2').innerText.toString();
    if (header.includes('Per-target')) {
        createPerTarForSave(header, traces, path)
    } else {
        let tables = Array.from(document.getElementsByTagName('details')).map(d => d.innerHTML);
        createReportForSave(header, traces, path, tables);
    }
    
})

resetBtn.addEventListener('click', () => {
    let plots = document.querySelectorAll('.js-plotly-plot');
    plots.forEach(elem => {
        Plotly.Plots.resize(elem);
    })
})