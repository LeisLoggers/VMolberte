const { ipcRenderer } = require('electron');
const PptxGenJS = require('pptxgenjs');
let pptxFile = undefined;
document.getElementById('downloadAsPPTX').addEventListener('click', async () => {
    // 1. Найти все графики Plotly на странице
    const graphDivs = document.querySelectorAll('.js-plotly-plot');

    if (graphDivs.length === 0) {
        alert('Графики не найдены');
        return;
    }

    // 2. Создание презентацию
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
    pptx.layout = 'WIDE';

    // 3. Для каждого графика
    for (let i = 0; i < graphDivs.length; i++) {
        const div = graphDivs[i];

        // Получить текущие данные графика

        // График в PNG (Data URL)
        const imgDataUrl = await Plotly.toImage(div, {
            format: 'png',
            width: 1600,
            height: 700,
        });

        // Добавить слайд
        const slide = pptx.addSlide();
        slide.background = { color: 'FFFFFF' }; // белый фон

        // Заголовок слайда
        // const title = slide.addText(`График ${i+1}`, {
        //     x: 1,
        //     y: 0.3,
        //     w: 10,
        //     h: 0.8,
        //     fontSize: 24,
        //     color: '333333',
        //     fontFace: 'Arial',
        // });

        // Вставить изображение
        slide.addImage({
            data: imgDataUrl,
            x: 0,
            y: 1.2,
            w: 13.33,
            h: 5.5,
        });
    }

    // 4. Сохранить файл
    pptxFile = pptx;
    const path = await ipcRenderer.invoke('pptx-file');
    console.log(path[0]);
    pptx.writeFile({ fileName: path })
        .then(() => {
            console.log('Презентация сохранена');
        })
        .catch(err => {
            console.error('Ошибка сохранения:', err);
        });
});