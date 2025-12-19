const fs = require('fs');
const path = require('path');

function resetColors() {
    const colorFileDefaultPath = path.resolve(__dirname, '..', '..', 'assets', 'uniqueColors.json');
    const colorFileUserPath = path.resolve(__dirname, '..', '..', 'assets', 'userUniqueColors.json');
    document.getElementById('reset-colors').addEventListener('click', () => {
        fs.unlinkSync(colorFileUserPath);
        document.getElementById("color-grid-menu").dispatchEvent(new Event('click'));
        alert('Ваша палитра удалена. ');

    });
    
}

module.exports = resetColors;