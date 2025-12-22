const fs = require('fs');
const path = require('path');

function resetColors() {
    const colorFileDefaultPath = path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'uniqueColors.json');
    const colorFileUserPath = path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'userUniqueColors.json');
    document.getElementById('reset-colors').addEventListener('click', () => {
        if (fs.existsSync(colorFileUserPath)) {
            fs.unlinkSync(colorFileUserPath);
            document.getElementById("color-grid-menu").dispatchEvent(new Event('click'));
            alert('Ваша палитра удалена. ');
        } else {
            document.getElementById("color-grid-menu").dispatchEvent(new Event('click'));
        }

    });
    
}

module.exports = resetColors;