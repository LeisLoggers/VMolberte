import { blink } from './blink.js';
ipcRenderer.on('resetAllParams', function resetAllParams() {
    let gt = document.getElementById('selectGraphType');
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
    // Очистка меню сортировки
    const groupSort = document.getElementById('groupSort');
    const colorSort = document.getElementById('colorSort');
    groupSort.innerHTML = '';
    colorSort.innerHTML = '';
    // Очистка графиков
    document.getElementById('reportMenu').style.visibility = 'hidden';
    document.getElementById('plotlyPlot').innerHTML = '';
    document.getElementById('graphTitle').innerText = 'Тут мог бы быть Ваш график';

    selectors.splice(1, 0, gt);
    blink(selectors, 'cancel');
});
