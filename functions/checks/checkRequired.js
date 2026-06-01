const { ipcRenderer } = require("electron");

let drawBtn = document.getElementById('drawButton');

drawBtn.addEventListener('click', function (event) {
    console.log('[SEND] checkRequired event');
    ipcRenderer.send('check-required');
})


function upgradedChecks() {
    const requiredFieldsId = ['selectGraphType', 'selectGroupType', "selectGroupColor", "metric_1", "metric_2"];
    const graphType = document.getElementById('selectGraphType').value;
    let fieldValues = new Map();
    for (let field of requiredFieldsId) {
        fieldValues.set(field, document.getElementById(field).value);
    };

    let fieldToImage = {
        "quickReport": ['selectGroupType', "selectGroupColor"],
        "quickReportEnrichment": ['selectGroupType', "selectGroupColor"],
        "quickReportPerTarget": ['selectGroupType', "selectGroupColor"],
        "scatter": ['selectGroupType', "selectGroupColor", "metric_1"],
        "box": ['selectGroupType', "selectGroupColor", "metric_1"],
        "grBox": ['selectGroupType', "selectGroupColor", "metric_1"],
        "violin": ['selectGroupType', "selectGroupColor", "metric_1"],
        "hist": ['selectGroupType', "selectGroupColor", "metric_1"]
    };

    let isFullFilled = [];

    fieldToImage[graphType].forEach(element => {
        isFullFilled.push(fieldValues.get(element))    
    });

    if (isFullFilled.every(el => el)) {
        ipcRenderer.send('draw-signal')
    } else {
        alert('Указаны не все требуемые поля.')
    };
}
ipcRenderer.on('check-required-renderer', upgradedChecks)