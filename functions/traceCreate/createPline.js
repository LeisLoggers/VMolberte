const { spawn } = require('child_process');
export async function createPline(config) {
    return new Promise((resolve, reject) => {
        const x0 = parseFloat(config.get('from'));
        const x1 = parseFloat(config.get('to'));
        const y = parseFloat(config.get('where'));
        //const name = config.get('name');
        //const pVal = config.get('pVal');

        let arr1 = document.getElementById('plotlyPlot').data[x0]['y'].join(',');
        let arr2 = document.getElementById('plotlyPlot').data[x1]['y'].join(',');
        let child = spawn("C:\\Users\\User\\PycharmProjects\\pythonProject\\apps\\ELECTRON\\functions\\traceCreate\\n.exe", [arr1, arr2])
        let result;
        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            result = data.toString();
        });

        // Чтение stderr (если есть ошибки или вывод)
        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        // Обработка завершения процесса
        child.on('close', (code) => {
            
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
                text: [result.trim()],
                texttemplate: "%{text}",
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
        });
    })
    
    
}