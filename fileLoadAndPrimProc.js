const { ipcRenderer } = require('electron');
const fs  = require('fs');
const { os } = require('node:os');
const nodePath = require('path')

function toggleHovered(element, duration = 200) {
    return new Promise((resolve) => {
        element.classList.add('hovered');
        setTimeout(() => {
            element.classList.remove('hovered');
            resolve();
        }, duration);
    });
}

async function blink(elems) {
    for (const elem of elems) {
        await toggleHovered(elem);
    }
}



const buttonCreated = document.getElementById('fileUploadArea');

buttonCreated.addEventListener('click', function (event) {
    console.log('[SEND] Signal from renderer');
    ipcRenderer.send('open-file-dialog-for-file')
});

buttonCreated.addEventListener('dragover', (event) => {
    event.preventDefault();
});

buttonCreated.addEventListener('drop', function (event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let file of files) {
        console.log(file)
        console.log(require('path').resolve(file.path));
    }
    ipcRenderer.send('dropped-file', files)
})

ipcRenderer.on('selected-file', function (event, filePaths) {

    let separator;
    let lfh = new Set();
    let fileMetaData = new Map();
    let unseparated = [];

    filePaths.forEach((path, index )=> {
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
    if (unseparated.length !== 0) {
        alert(`Не удалось определить разделитель для файлов ${unseparated.join(', ')}\nВыполнение программы остановлено.`);
        event.sender.send('clear-fp-wrong-paths');
        return
    }
    if (separator) {
        let gt = document.getElementById('selectGraphType');
        let menu = document.getElementById('selectGroupType');
        let colormenu = document.getElementById('selectGroupColor');
        let metric1 = document.getElementById('metric_1');
        let metric2 = document.getElementById('metric_2');
        let decoration = [gt, menu, colormenu, metric1, metric2]
        lfh.forEach(column => {
            let groupOption = document.createElement('option');
            let colorOption = document.createElement('option');
            let m1Option = document.createElement('option');
            let m2Option = document.createElement('option');
            groupOption.innerText = column;
            colorOption.innerText = column;
            m1Option.innerText = column;
            m2Option.innerText = column;
            groupOption.value = column;
            colorOption.value = column;
            m1Option.value = column;
            m2Option.value = column;
            menu.appendChild(groupOption);
            colormenu.appendChild(colorOption)
            metric1.appendChild(m1Option);
            metric2.appendChild(m2Option);
        })
        blink(decoration);
        document.getElementById('fileName').innerText = `Выбрано файлов: ${fileMetaData.size}`;
        event.sender.send('send-meta-data', fileMetaData)
    }
    
    
});

