const fs = require('fs');
const path = require('path');
const log = require('electron-log/main');

function removeOldLogs(logPath) {
    let logDirectory = path.dirname(logPath);
    fs.readdir(logDirectory, (err, data) =>  {
        if (!err) {
            let files = data.map(d => path.join(logDirectory, d));
            files.forEach(file => {
                if (file.includes('old')) {
                    try {
                        fs.unlink(file, (e, s) => {})
                    } catch (unlinkError) {
                        log.error('Old log remove error: ', unlinkError)
                    };
                } else {
                };
            })
        } else {
            log.error('Reading logDir error: ', err);
        };
    });
};
module.exports = removeOldLogs; 