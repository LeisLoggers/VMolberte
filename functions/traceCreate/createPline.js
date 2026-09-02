const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const wasm = require("../stats-lib/pkg/stats_lib.js");

function spawnPlineProcess(filepath, config, resolve) {
    const x0 = parseFloat(config.get('from'));
    const x1 = parseFloat(config.get('to'));
    const y = parseFloat(config.get('where'));
    let arr1 = document.getElementById('plotlyPlot').data[x0]['y'].map(Number);
    let arr2 = document.getElementById('plotlyPlot').data[x1]['y'].map(Number);
    let child = spawn(filepath, [arr1, arr2]);
    let result = wasm.mann_whitney_test(arr1, arr2);

    // child.stdout.on('data', (data) => {
    //     result = data.toString();
    // });

    // child.stderr.on('data', (data) => {
    //     console.error(`stderr: ${data}`);
    // });

    // child.on('close', (code) => {
        
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
            texttemplate: "p=%{text}",
            textposition: 'top center',
            showlegend: false,
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

        resolve([mainTrace, vert1, vert2, textTrace])
    ;
};
export async function createPline(config) {

    return new Promise((resolver, reject) => {
        const pLineExe = path.resolve(__dirname, '..', 'functions/traceCreate/n.exe')
        const exePath = path.join(__dirname, '..', '..', 'app.asar.unpacked', 'functions', 'traceCreate', 'n.exe');
        if (fs.existsSync(pLineExe) && !fs.existsSync(exePath)) {
            console.log('Найден pLineExe');
            spawnPlineProcess(pLineExe, config, resolver);
        } else if (fs.existsSync(pLineExe) && fs.existsSync(exePath)) {
            console.log('Найден asarExe');
            spawnPlineProcess(exePath, config, resolver);
        } else {
            reject('Файл n.exe не найден')
        } 
    })
}