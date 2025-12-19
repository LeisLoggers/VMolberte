const readColors = require('../functions/colors/readColors.js');
const getLuminance = require('../functions/colors/getLuminance.js');
const changeBoxColor = require('../functions/colors/changeBoxColor.js');
const saveColors = require('../functions/colors/saveColors.js');
const resetColors = require('../functions/colors/resetColors.js');

function configureColorGrid() {
    readColors().then(colors => {
        let currentColors = Array.from(document.querySelectorAll('.color-label'), el => el.value).join('');
        if (colors.join('') === currentColors) {
            return
        } else {
            grid.innerHTML = '';
            colors.forEach(hex => {
                const box = document.createElement('div');
                const optVert = document.createElement('option');
                box.className = 'color-box';
                box.style.backgroundColor = hex;
                optVert.innerText = hex;
                optVert.value = hex;
                optVert.style.backgroundColor = hex;

                const label = document.createElement('input');
                label.className = 'color-label';
                label.value = hex;

                // Определение цвета текста для лучшей читаемости
                const luminance = getLuminance(hex);
                label.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
                optVert.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
                box.appendChild(label);
                label.addEventListener('change', changeBoxColor);

                grid.appendChild(box);

                verticalColorSelect.appendChild(optVert);
            });
        }
    })
 };

document.getElementById("color-grid-menu").addEventListener('click', configureColorGrid);
saveColors();
resetColors();