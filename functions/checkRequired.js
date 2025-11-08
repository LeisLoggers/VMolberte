const { ipcRenderer } = require("electron");

let drawBtn = document.getElementById('drawButton');

drawBtn.addEventListener('click', function (event) {
    console.log('[SEND] checkRequired event');
    ipcRenderer.send('check-required');
})

ipcRenderer.on('check-required-renderer', function (event) {
    const required = {
        'groupType': document.getElementById('selectGroupType').value,
        'yMetric': document.getElementById('metric_1').value,
    };

    let successCount = 2;
    let currentCount = 2;

    if (document.getElementById('selectGraphType').value.includes('quickReport')) {
        if (required['groupType'] !== '') {
            console.log('[PROC] checkRequired OK');
            ipcRenderer.send('draw-signal');
        } else {
            alert('Указаны не все обязательные поля.')
        }
    } else {
        Object.keys(required).forEach(param => {
            if (required[param] === '') {
                currentCount -= 1;
            } else {
                currentCount -= 0
            };
        })
        if (currentCount === successCount) {
            console.log('[PROC] checkRequired OK');
            ipcRenderer.send('draw-signal');
        } else {
            alert('Указаны не все обязательные поля.')
        };
    }
    
});