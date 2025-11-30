const { app, BrowserWindow, screen, ipcMain, dialog } = require('electron');
const { updateElectronApp } = require('update-electron-app');
const { UpdateSourceType } = require('./node_modules/update-electron-app/dist/index');
updateElectronApp({
    updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: "LeisLoggers/VMolberte"
    },
    updateInterval: '5 minutes'

})

if (require('electron-squirrel-startup')) app.quit();
app.setAppUserModelId("com.squirrel.VMolberte.VMolberte");

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
    setTimeout(() => createWindow(loadingWindow), 3000)
    
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

// Очистка метаданных по загруженным файлам
ipcMain.on('clear-fp-wrong-paths', (event) => {
    event.sender.send('resetAllParams');
    event.sender.send('reset-progress');
    filesMetaData.clear();
})

// Проверка заполнения нужных полей
ipcMain.on('check-required', (event) => {
    event.sender.send('check-required-renderer');
})

ipcMain.on('run-progress-bar', (event) => {
    event.sender.send('run-progress-bar-main')
})

// Получение метаданных по файлам и сохранение их в переменную приложения
ipcMain.on('send-meta-data', (event, metaData) => {
    if (filesMetaData !== undefined) {
        let startPos = filesMetaData.size + 1;
        for (let [key, value] of metaData) {
            filesMetaData.set(key + startPos, value);
        };
    } else {
        filesMetaData = metaData;
    }
    event.sender.send('update-meta-length', filesMetaData.size);
})

ipcMain.on('need-sorting', (event) => {
    event.sender.send('presort-data', filesMetaData);
})

// Отправка метаданных на отрисовку
ipcMain.on('draw-signal', (event) => {
    event.sender.send('run-progress-bar-main')
    event.sender.send('drawIt', filesMetaData)
    /* 
        FIXME: Прогресс работает в main, как и вычисления.
        из прогресса нельзя обращаться в DOM, вычислениям нужен import,
        import'у нужен module, а если делать через Worker, то Worker'у 
        нужен parentPort, но parentPort не любит module.
        СУКАААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
    */
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