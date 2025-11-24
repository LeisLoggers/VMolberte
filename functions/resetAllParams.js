export function resetAllParams() {
    let mk = document.getElementById('mergeKey');
    let grat = document.getElementById('selectGraphType');
    let grot = document.getElementById('selectGroupType');
    let groc = document.getElementById('selectGroupColor');
    let selectors = [mk, grat, grot, groc];

    selectors.forEach(el => {
        for (option in Array.from(el.options)) {
            if (option.value !== '' && option.value !== 'filename') {
                el.removeChild(option);
            };
        };
    });
};

/* 
    FILLME: Доделать функционал для полноценного рестарта и интегрировать
    в index.js
*/