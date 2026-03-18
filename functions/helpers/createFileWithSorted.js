const fs = require('fs');

ipcRenderer.on('path-to-save-sort', function createFile(event, path, sortedOrder) {
    fs.writeFile(path, sortedOrder.join(','), err => {
            if (err) {
                console.log('Ошибка при сохранении сортировочного файла');
                return
            }
            console.log('Файл сортировки сохранён')
        })
})