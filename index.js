const { app, BrowserWindow, screen, ipcMain, dialog } = require('electron')
const { os } = require('node:os');
let filesMetaData;
let currentTraces;

const createLoadingWindow = () => {
    let loadingWindow = new BrowserWindow({
        height: 400,
        width: 400,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    loadingWindow.loadFile('pages/loading.html');
    loadingWindow.on('closed', () => (loadingWindow = null));
    return loadingWindow
};

const createWindow = (loadingWindow) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    const win = new BrowserWindow({
        width: width,
        height: height,
        icon: './assets/logo256.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: 'preload.js',
        }
    });
    win.webContents.openDevTools();
    win.menuBarVisible = false;
    win.loadFile('pages/index.html')
    win.on('ready-to-show', () => {
        if (loadingWindow) {
            loadingWindow.close()
        }
    })
    
    
}
// Выход из приложения
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('ready', () => {
    let loadingWindow = createLoadingWindow();
    setTimeout(() => createWindow(loadingWindow), 1000)
    
})
// Получение файла/файлов и путей к ним
ipcMain.on('open-file-dialog-for-file', async (event) => {
    const result = await dialog.showOpenDialog({
        properties: ['multiSelections', 'openFile'],
        title: 'Выберите файлы',
        buttonLabel: 'Выбрать',
        filters: [
            { name: 'Данные', extensions: ['csv', 'tsv', 'txt'] },
            { name: 'All files', extensions: ['*'] }
        ]
    })
    if (!result.canceled) {
        event.sender.send('selected-file', result.filePaths);
    }
})

ipcMain.on('dropped-file', (event, files) => {
    event.sender.send('selected-file', files);
})

// Очистка метаданных по загруженным файлам
ipcMain.on('clear-fp-wrong-paths', (event) => {
    filesMetaData.length = 0;
    console.log('Filepaths cleared');
})

// Проверка заполнения нужных полей
ipcMain.on('check-required', (event) => {
    event.sender.send('check-required-renderer');
})

// Получение метаданных по файлам и сохранение их в переменную приложения
ipcMain.on('send-meta-data', (event, metaData) => {
    filesMetaData = metaData;
})

// Отправка метаданных на отрисовку
ipcMain.on('draw-signal', (event) => {
    event.sender.send('drawIt', filesMetaData)
})

// Добавление горизонтальной линии
ipcMain.on('addHor', (event) => {
    event.sender.send('draw-horizontal')
})

// Добавление вертикальной линии
ipcMain.on('addVert', (event) => {
    event.sender.send('draw-vertical')
})

// Получение Map актуальных трасс
ipcMain.on('save-current-traces', (event, traces) => {
    currentTraces = traces;
})
// Удаление актуальных трасс
ipcMain.on('remove-current-traces', (event) => {
    for (key of currentTraces.keys()) {
        currentTraces.delete(key)
    };
})

// Сохранение файла отчёта
ipcMain.on('open-file-dialog-for-save', async (event, filename) => {
    const result = await dialog.showSaveDialog({
        properties: ['createDirectory', 'showOverwriteConfirmation'],
        title: 'Куда сохранить файл?',
        buttonLabel: 'Сохранить',
        defaultPath: filename,
        filters: [
            { name: 'Отчёт', extensions: ['html'] },
            { name: 'All files', extensions: ['*'] }
        ]
    })
    if (!result.canceled) {
        event.sender.send('path-to-save', result.filePath, currentTraces);
    }
})