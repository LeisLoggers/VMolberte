const fs  = require('fs');
import { createSortedDragableDivs } from './createSortedDragableDivs.js';


ipcRenderer.on('create-from-file', function createSortedFromFile(event, file) {
    try {
        let fileOrder = fs.readFileSync(file[0], 'utf8')
        let list = fileOrder.split(',');
        createSortedDragableDivs(list, list);
    }
    catch (error) {
        console.log('Проблема с файлом сортировки ', error)
    };
    
})