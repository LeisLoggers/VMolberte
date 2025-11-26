const { ipcRenderer } = require('electron');
export function progressUpdate() {
    progressBar.style.strokeDashoffset = circumference;
    progressText.textContent = '0%';
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        const offset = circumference - (progress / 100) * circumference;
        progressBar.style.strokeDashoffset = offset;
        progressText.textContent = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval)
            return
        };
    }, 50);
};

export function progressReset() {
    progressBar.style.strokeDashoffset = circumference;
    progressText.textContent = '0%';
};

ipcRenderer.on('run-progress-bar-main', function(event) {
    console.log('recieved');
    progressUpdate();
})

ipcRenderer.on('reset-progress', function (event) {
    progressReset();
});
/*
    FIXME: пока похоже, что запуск прогресса и обсчёт остального идёт в одном потоке с интерфейсом
*/