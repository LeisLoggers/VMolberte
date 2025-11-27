import { fileParse } from '../fileParse.js';
import { sortNumericArray } from './sortNumericArray.js';

ipcRenderer.on('presort-data', function (event, filesMetaData) {
    console.log('presort')
    const groupBy = document.getElementById('selectGroupType').value;
    fileParse(filesMetaData).then(fullData => {
        let uniqueCategories = [... new Set(fullData.map(d => d[groupBy]))];
        let sorters = sortNumericArray(Array.from(uniqueCategories));
        
    })
})