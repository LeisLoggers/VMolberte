const {readXlsx} = require('sheetstream');
export async function readExcelToJson(filePath, sheetName, fileName) {
    let all = await readXlsx(filePath, {sheet: sheetName, batchSize: 5000, header: true}).toArray();
    all.forEach(row => {
        row['filename'] = fileName
    });
    return all;
}