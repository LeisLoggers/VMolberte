const d3 = require('d3');
const XLSX = require('xlsx');

export async function fileParse(filesMetaData) {
    const fullData = [];

    const promises = [];

    for (const index of filesMetaData.keys()) {
        const fileMeta = filesMetaData.get(index);
        const filepath = fileMeta['filepath'];
        const resolution = fileMeta['resolution'];
        const filename = fileMeta['filename'];
        let mergeKey = document.getElementById('mergeKey').value;
        /*
        * FIXME:
        * Если строка с данным значением mergeKey существует в
        * fullDara, то нужно найти такую строку в fullData
        * и добавить ей значений.
        */
        const promise = new Promise((resolve, reject) => {
            if (resolution === 'tsv') {
                d3.tsv(filepath, (data) => {
                    data['filename'] = filename;
                    fullData.push(data);
                    resolve();
                });
            } else if (resolution === 'csv') {
                d3.csv(filepath, (data) => {
                    data['filename'] = filename;
                    fullData.push(data);
                    resolve();
                });
            } else if (resolution === 'xlsx') {
                let workbook = XLSX.readFile(filepath);
                let worksheet = workbook.Sheets[fileMeta['sheetname']];
                let jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach(el => {
                    el['filename'] = filename;
                });
                fullData.push(...jsonData);
                resolve();
            } else {
                // Если тип не поддерживается
                resolve();
            }
        });
        promises.push(promise);
    }

    await Promise.all(promises);
    return fullData;
}