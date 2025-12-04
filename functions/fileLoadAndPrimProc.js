const fs  = require('fs');
const nodePath = require('path');
import {configureSelectBoxes} from './configureSelectBoxes.js';
import { blink } from './blink.js';




const fileUpload = document.getElementById('fileUploadArea');
const clearFP = document.getElementById('clearFP');
fileUpload.addEventListener('click', function (event) {
    ipcRenderer.send('open-file-dialog-for-file')
});
clearFP.addEventListener('click', function () {
    ipcRenderer.send('clear-fp-wrong-paths');
    document.getElementById('fileName').innerText = `Файлы не выбраны`;
})



ipcRenderer.on('selected-file', function (event, filePaths) {

    let separator;
    let lfh = new Set();
    let fileMetaData = new Map();
    let unseparated = [];
    let decoration;
    let headersInSelect = document.getElementById('selectGroupType');
    let currentHeaders = Array.from(headersInSelect.options).map(option => option.value);

    filePaths.forEach((path, index) => {
        fileMetaData.set(index, { 'filepath': path });
        fileMetaData.get(index)['filename'] = nodePath.basename(path).split('.')[0];
        let fileHeader = fs.readFileSync(path, 'utf8').split('\n')[0];
        if (fileHeader.split('\t').length > 1) {
            separator = '\t';
            fileMetaData.get(index)['resolution'] = 'tsv';
            lfh = lfh.union(new Set(fileHeader.split(separator)));
        } else if (fileHeader.split(',').length > 1) {
            separator = ',';
            lfh = lfh.union(new Set(fileHeader.split(separator)));
            fileMetaData.get(index)['resolution'] = 'csv';
        } else {
            unseparated.push(nodePath.basename(path));
        }
    })
    // В случае ошибки с разделителем - чистим все процессы.
    if (unseparated.length !== 0) {
        alert(`Не удалось определить разделитель для файлов ${unseparated.join(', ')}\nВыполнение программы остановлено.`);
        event.sender.send('clear-fp-wrong-paths');
        document.getElementById('fileName').innerText = `Файлы не выбраны`;
        return
    }
    // Настраиваем все меню select
    if (separator) {
        if (currentHeaders.length > 2) {
            lfh = lfh.union(new Set(currentHeaders));
            decoration = configureSelectBoxes(lfh, currentHeaders);
            blink(decoration, 'configure');
            event.sender.send('send-meta-data', fileMetaData)
        } else {
            decoration = configureSelectBoxes(lfh, currentHeaders);
            blink(decoration, 'configure');
            event.sender.send('send-meta-data', fileMetaData)
        };


    };
});

ipcRenderer.on('update-meta-length', function (event, metaLen) {
    document.getElementById('fileName').innerText = `Выбрано файлов: ${metaLen}`;
})
