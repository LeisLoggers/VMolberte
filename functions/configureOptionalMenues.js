const readColors = require('../functions/colors/readColors.js');
const fillNewspaper = require('../functions/windows/fillNewspaper.js');
const getLuminance = require('../functions/colors/getLuminance.js');
const changeBoxColor = require('../functions/colors/changeBoxColor.js');
const createEmptyColorBox = require('../functions/colors/createEmptyColorBox.js');
const saveColors = require('../functions/colors/saveColors.js');
const resetColors = require('../functions/colors/resetColors.js');

function configureColorGrid() {
    document.querySelector('.loading-circle').style.display = 'block';
    readColors().then(colors => {
        let currentColors = Array.from(document.querySelectorAll('.color-label'), el => el.value).join('');
        if (colors.join('') === currentColors) {
            document.querySelector('.loading-circle').style.display = 'block';
            return
        } else {
            grid.innerHTML = '';
            colors.forEach(hex => {
                const box = document.createElement('div');
                const plus = document.createElement('div');
                const minus = document.createElement('div');
                const optVert = document.createElement('option');
                const luminance = getLuminance(hex);
                box.className = 'color-box';
                plus.className = 'color-box-add';
                minus.className = 'color-box-remove';
                plus.innerText = '+';
                minus.innerText = 'x';
                box.style.backgroundColor = hex;
                optVert.innerText = hex;
                optVert.value = hex;
                optVert.style.backgroundColor = hex;

                const input = document.createElement('input');
                input.className = 'color-label';
                input.value = hex;
                input.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
                input.type = 'color';
                input.colorspace = 'limited-srgb';
                input.addEventListener('change', changeBoxColor);

                // Определение цвета текста для лучшей читаемости
                
                minus.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
                optVert.style.color = luminance > 128 ? '#000000' : '#FFFFFF';

                // Функционал
                box.appendChild(input);
                box.appendChild(minus);
                box.appendChild(plus);
                plus.addEventListener('click', createEmptyColorBox);
                minus.addEventListener('click', function (eventer) {grid.removeChild(eventer.target.parentElement)})
                box.addEventListener('mouseenter', () => { box.querySelector('.color-box-add').style.display = 'block' });
                box.addEventListener('mouseleave', () => { box.querySelector('.color-box-add').style.display = 'none' });
                grid.appendChild(box);
                verticalColorSelect.appendChild(optVert);
                document.querySelector('.loading-circle').style.display = 'none';
            });
        }
    })
 };

document.getElementById("color-grid-menu").addEventListener('click', configureColorGrid);
document.getElementById("newspaper-menu").addEventListener('click', fillNewspaper);
saveColors();
resetColors();