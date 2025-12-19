const fs = require('fs');
const path = require('path');

function saveColors() {
    const colorFileUserPath = path.resolve(__dirname, '..', '..', 'assets', 'userUniqueColors.json');
    document.getElementById('save-colors').addEventListener('click', () => {
        const available_colors = [];
        document.querySelectorAll('.color-label').forEach(label => {
            available_colors.push(label.value);
        });
        uniqueColors = { 'uniqueColors': available_colors };
        fs.writeFileSync(colorFileUserPath, JSON.stringify(uniqueColors));
        alert('Ваша палитра сохранена.')
    })
}

module.exports = saveColors;