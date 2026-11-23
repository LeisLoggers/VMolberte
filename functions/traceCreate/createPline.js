const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const statsLibPath = path.join(__dirname, '../functions', 'statslib', 'index.win32-x64-msvc.node');
const statsLib = require(statsLibPath);

function formatStatContent(title, text) {
    let container = document.querySelector(".stats-bar-content");
    let newCard = document.createElement('div');
    newCard.classList.add('stats-bar-card');
    let titleP = document.createElement('p');
    titleP.innerText = title;
    titleP.classList.add('stats-bar-card-header')
    let textP = document.createElement('p');
    textP.innerHTML = text;
    textP.classList.add('stats-bar-card-content');
    newCard.appendChild(titleP);
    newCard.appendChild(textP);
    container.prepend(newCard);
};
export function createPline(config) {
    const x0 = parseFloat(config.get('from'));
    const x1 = parseFloat(config.get('to'));
    const y = parseFloat(config.get('where'));
    let arr1 = document.getElementById('plotlyPlot').data[x0]['y'].map(Number);
    let arr2 = document.getElementById('plotlyPlot').data[x1]['y'].map(Number);
    const a = new Float64Array(arr1);
    const b = new Float64Array(arr2)
    let [text, p] = statsLib.calculateIndependentStats(a, b);
    let result = p < 0.05 ? "p<0.05" : "p>0.05";
    const mainTrace = {
            x: [x0, x1],
            y: [y, y],
            mode: 'lines',
            showlegend: false,
            line: {
                dash: 'solid',
                color: 'black',
                width: 2,
            },
        };
        let textTrace = {
            mode: 'text',
            x: [(x0 + x1) / 2],
            y: [y],
            text: [result],
            texttemplate: "%{text}",
            textposition: 'top center',
            showlegend: false, // TODO: Шрифт p покрупнее
        }
        let currentYaxisRange = document.getElementById('plotlyPlot').layout.yaxis.range;
        let rangeDiff = parseFloat(currentYaxisRange[1]) - parseFloat(currentYaxisRange[0]);
        let yOffsetPlus = y + (0.01 * rangeDiff);
        let yOffsetMinus = y - (0.01 * rangeDiff);

        const vert1 = {
            x: [x0, x0],
            y: [yOffsetPlus, yOffsetMinus],
            mode: 'lines',
            showlegend: false,
            line: {
                dash: 'solid',
                color: 'black',
                width: 2,
            },
        }
        const vert2 = {
            x: [x1, x1],
            y: [yOffsetPlus, yOffsetMinus],
            mode: 'lines',
            showlegend: false,
            line: {
                dash: 'solid',
                color: 'black',
                width: 2,
            },
        }
        formatStatContent(`Группы ${x0} + ${x1}`, text);
        return([mainTrace, vert1, vert2, textTrace])

}