import { fileParse } from '../fileParse.js';
import { sortNumericArray } from './sortNumericArray.js';
import { createSortedDragableDivs } from './createSortedDragableDivs.js';
import { zipDict } from './zipDict.js';

ipcRenderer.on('presort-data', function (event, filesMetaData) {
    console.log('presort')
    const available_colors = [];
    document.getElementById('color-grid').querySelectorAll('.color-label').forEach(label => {
        available_colors.push(label.value);
    });
    window.available_colors = available_colors;
    const groupBy = document.getElementById('selectGroupType').value;
    const colorBy = document.getElementById('selectGroupColor').value;
    window.groupBy = groupBy;
    window.colorBy = colorBy;
    fileParse(filesMetaData).then(fullData => {
        let uniqueCategories = [... new Set(fullData.map(d => d[groupBy]))];
        let uniqueColors = [... new Set(fullData.map(d => d[colorBy]))];
        let categoriesSorted = sortNumericArray(Array.from(uniqueCategories));
        let colorsSorted = sortNumericArray(Array.from(uniqueColors));
        let filesInWork = [];
        let colorGrid;
        console.log(groupBy === colorBy);
        if (groupBy === colorBy) {
           filesInWork = [... new Set(fullData.map(d => d['run'] || d['Run'] || d['filename']))];
           let filesToColor = zipDict(filesInWork, available_colors);
           colorGrid = fullData.reduce((acc, row) => {
            let filterRow = row['run'] ?? row['Run'] ?? row['filename'];
            acc[row[groupBy]] = {
                'color': `${filesToColor[filterRow]}66`, 
                'colorBy': row[colorBy]
            };
            return acc;
            }, {});
        } else {
            filesInWork = [... new Set(fullData.map(d => d[colorBy] || d['run'] || d['Run'] || d['filename']))];
            let filesToColor = zipDict(filesInWork, available_colors);
            colorGrid = fullData.reduce((acc, row) => {
            let filterRow = row['run'] ?? row['Run'] ?? row['filename'];
            acc[row[groupBy]] = {
                'color': `${filesToColor[filterRow]}66`, 
                'colorBy': row[colorBy]
            };
            return acc;
            }, {});
        }
        
        // let colorGrid = Object.fromEntries(
        //     fullData.map(row => [row[groupBy], `${filesToColor[row [colorBy] || row['run'] || row['Run'] || row['filename']]}66`])
        // )
        
        createSortedDragableDivs(categoriesSorted, colorsSorted, colorGrid);
    })
})