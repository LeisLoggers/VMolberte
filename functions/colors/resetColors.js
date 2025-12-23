const fs = require('fs');
const path = require('path');

function resetColors() {
    const colorFileDefaultPath = (__dirname.includes("app.asar") ?
        path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'uniqueColors.json') :
        path.resolve(__dirname, '..', '..', 'assets', 'uniqueColors.json')
    );
    const colorFileUserPath = (__dirname.includes("app.asar") ?
        path.resolve(__dirname, '..', '..', '..', 'app.asar.unpacked', 'assets', 'userUniqueColors.json') :
        path.resolve(__dirname, '..', '..', 'assets', 'userUniqueColors.json')
    );
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