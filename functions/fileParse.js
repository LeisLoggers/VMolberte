const d3 = require('d3');

export async function fileParse(filesMetaData) {
    const fullData = [];

    const promises = [];

    for (const index of filesMetaData.keys()) {
        const fileMeta = filesMetaData.get(index);
        const filepath = fileMeta['filepath'];
        const resolution = fileMeta['resolution'];
        const filename = fileMeta['filename'];

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