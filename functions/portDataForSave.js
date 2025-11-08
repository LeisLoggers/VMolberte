import { createReportForSave } from './createReportForSave.js';

const downloadBtn = document.getElementById('downloadAsHtml');


downloadBtn.addEventListener('click', function (event) {
    console.log('saving')
    const filename = document.getElementById('report').querySelector('h2').innerText;
    ipcRenderer.send('open-file-dialog-for-save', filename)
});

ipcRenderer.on('path-to-save', function (event, path, traces) {
    let header = document.getElementById('report').querySelector('.page-header').querySelector('h2').innerText.toString();
    console.log(header)
    createReportForSave(header, traces, path);
})