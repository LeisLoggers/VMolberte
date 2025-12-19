

function getLuminance(hexColor) {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    // Using sRGB luminance formula
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

module.exports = getLuminance;