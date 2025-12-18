const { BrowserWindow, ipcMain } = require('electron');
const log = require('electron-log/main');


async function createDialogueWindow(options) {
    return new Promise((resolve, reject) => {
        try {
            let dialogueWindow = new BrowserWindow({
                height: 500,
                width: 600,
                icon: './assets/vm256.ico',
                frame: true,
                transparent: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            });
            dialogueWindow.menuBarVisible = false;
            dialogueWindow.loadFile('pages/dialogue.html');
            dialogueWindow.on('closed', () => (dialogueWindow = null));

        } catch (error) {
            log.error('Error with loading window: ', error)
            reject(error)
        };
    });
};
module.exports = createDialogueWindow;