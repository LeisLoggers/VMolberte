const path = require('path');
const fs = require('fs');

async function readColors() {
    return new Promise( async (resolve, reject) => {
        const colorFileDefaultPath = path.resolve(__dirname, '..', '..', 'assets', 'uniqueColors.json');
        const colorFileUserPath = path.resolve(__dirname, '..', '..', 'assets', 'userUniqueColors.json');
        if (fs.existsSync(colorFileUserPath)) {
            // Если существует юзер-файл, то читаем юзерфайл
            try {
                const response = await fetch(colorFileUserPath);
                if (!response.ok) {
                    throw new Error(`Fetch error: ${response.status}`);
                };
                const data = await response.json();
                return data['uniqueColors'];
            } catch (error) {
                console.log(`Ошибка при попытке прочитать файл User-Color: ${error}`);
                reject(error);
            };
        } else {
            // Если не существует юзер-файл, то читаем дефолт
            try {
                const response = await fetch(colorFileDefaultPath);
                if (!response.ok) {
                    throw new Error(`Fetch error: ${response.status}`);
                };
                const data = await response.json();
                resolve(data['uniqueColors']);
            } catch (error) {
                console.log(`Ошибка при попытке прочитать файл Default-Color: ${error}`);
                reject(error)
            };
        };
    })
   
};

module.exports = readColors;