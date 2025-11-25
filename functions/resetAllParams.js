import { blink } from './blink.js';
ipcRenderer.on('resetAllParams', function resetAllParams() {
    let mk = document.getElementById('mergeKey');
    let grot = document.getElementById('selectGroupType');
    let groc = document.getElementById('selectGroupColor');
    let xMe = document.getElementById('metric_1');
    let yMe = document.getElementById('metric_2');
    let selectors = [mk, grot, groc, xMe, yMe];

    // Очистка селекторов
    selectors.forEach(el => {
        for (let option of Array.from(el.options)) {
            if (option.value !== '' && option.value !== 'filename') {
                el.removeChild(option);
            };
        };
    });
    blink(selectors);
});

/* 
    FILLME: Доделать функционал для полноценного рестарта и интегрировать
    в index.js
*/