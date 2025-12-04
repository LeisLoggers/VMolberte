const { BrowserWindow } = require('electron');
const removeOldLogs = require('../helpers/removeOldLogs.js');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log/main');


async function createLoadingWindow() {
    return new Promise((resolve, reject) => {
        try {
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
            // Удаление старых логов
            removeOldLogs(log.transports.file.getFile().path);
            // Проверка наличия обновлений
            autoUpdater.checkForUpdatesAndNotify()
                .then((response) => {
                    log.info('Update checking successful');
                    resolve(loadingWindow);
                })
                .catch((err) => {
                    log.error('Update checking error: ', err);
                    reject(err);
                });

        } catch (error) {
            reject(error)
        };
    });
};
module.exports = createLoadingWindow;