const fs = require('fs');
const path = require('path');

function saveColors() {
    const colorFileDefaultPath = (__dirname.includes("app.asar") ?
        path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'uniqueColors.json') :
        path.resolve(__dirname, '..', '..', 'assets', 'uniqueColors.json')
    );
    const colorFileUserPath = (__dirname.includes("app.asar") ?
        path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'userUniqueColors.json') :
        path.resolve(__dirname, '..', '..', 'assets', 'userUniqueColors.json')
    );
    document.getElementById('save-colors').addEventListener('click', () => {
        const available_colors = [];
        document.getElementById('color-grid').querySelectorAll('.color-label').forEach(label => {
            available_colors.push(label.value);
        });
        uniqueColors = { 'uniqueColors': available_colors };
        if (fs.existsSync(colorFileUserPath)) {
            fs.unlinkSync(colorFileUserPath);
            fs.writeFileSync(colorFileUserPath, JSON.stringify(uniqueColors));
        } else {
            fs.writeFileSync(colorFileUserPath, JSON.stringify(uniqueColors));

        }
        alert('Ваша палитра сохранена.')
    })
}

module.exports = saveColors;