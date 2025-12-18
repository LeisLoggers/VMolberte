import { fileParse } from '../fileParse.js';
import { sortNumericArray } from './sortNumericArray.js';
import { createSortedDragableDivs } from './createSortedDragableDivs.js';

ipcRenderer.on('presort-data', function (event, filesMetaData) {
    console.log('presort')
    const groupBy = document.getElementById('selectGroupType').value;
    const colorBy = document.getElementById('selectGroupColor').value;
    fileParse(filesMetaData).then(fullData => {
        let uniqueCategories = [... new Set(fullData.map(d => d[groupBy]))];
        let uniqueColors = [... new Set(fullData.map(d => d[colorBy]))];
        let categoriesSorted = sortNumericArray(Array.from(uniqueCategories));
        let colorsSorted = sortNumericArray(Array.from(uniqueColors));
        createSortedDragableDivs(categoriesSorted, colorsSorted);
    })
})