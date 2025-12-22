const changeBoxColor = require('./changeBoxColor.js');
const getLuminance = require('./getLuminance.js');

function createEmptyColorBox(event) {
    let neighbour = event.target.parentElement;
    const box = document.createElement('div');
    const plus = document.createElement('div');
    const minus = document.createElement('div');
    const defaultColor = '#F0F0F0';
    const luminance = getLuminance('#F0F0F0');
    box.className = 'color-box';
    plus.className = 'color-box-add';
    minus.className = 'color-box-remove';
    plus.innerText = '+';
    minus.innerText = 'x';
    box.style.backgroundColor = defaultColor;

    const input = document.createElement('input');
    input.className = 'color-label';
    input.value = defaultColor;
    input.type = 'color';
    input.colorspace = 'limited-srgb';
    input.addEventListener('change', changeBoxColor);
    
    // Определение цвета текста для лучшей читаемости

    input.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
    minus.style.color = luminance > 128 ? '#000000' : '#FFFFFF';

    // Функционал
    box.appendChild(input);
    box.appendChild(minus);
    box.appendChild(plus);
    plus.addEventListener('click', createEmptyColorBox);
    minus.addEventListener('click', function (eventer) { grid.removeChild(eventer.target.parentElement) })
    box.addEventListener('mouseenter', () => { box.querySelector('.color-box-add').style.display = 'block' });
    box.addEventListener('mouseenter', () => { box.querySelector('.color-box-remove').style.display = 'block' });
    box.addEventListener('mouseleave', () => { box.querySelector('.color-box-add').style.display = 'none' });
    box.addEventListener('mouseleave', () => { box.querySelector('.color-box-remove').style.display = 'none' });

    neighbour.insertAdjacentElement('afterend', box);
}

module.exports = createEmptyColorBox;