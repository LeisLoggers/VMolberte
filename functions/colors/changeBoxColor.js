const getLuminance = require('./getLuminance.js');

function changeBoxColor(event) {
    let input = event.target;
    if (input.value.length === 7) {
        let hex = input.value;
        const luminance = getLuminance(hex);
        input.style.color = luminance > 128 ? '#000000' : '#FFFFFF';
        input.parentElement.style.backgroundColor = `${hex}`;
    }
}


module.exports = changeBoxColor;