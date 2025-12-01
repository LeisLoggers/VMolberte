const Plotly = require('plotly.js-dist')
export function fillPerTargetReport(traces, filenames) {
    let reportDiv =
        `
                
                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Распределение нормализованного покрытия</h3>
                    </div>
                    <div id="perGeneNCHist">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Распределение нормализованного покрытия по генам</h3>
                    </div>
                    <div id="perGeneNCBox">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Распределение среднего покрытия по генам</h3>
                    </div>
                    <div id="perGeneMCBox">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Зависимость нормализованного покрытия от ГЦ-состава</h3>
                    </div>
                    <div id="perGeneNCscatter">
                    </div>
                </div>

    `
    let reportHeader = document.getElementById('report').querySelector('h2');
    reportHeader.innerText = '';
    reportHeader.innerText = `Per-target Отчёт по ${filenames.join(', ')}`;
    let report = document.getElementById('report-content');
    report.innerHTML = reportDiv;
    document.getElementById('reportMenu').style.visibility = 'visible';
    for (const [key, value] of traces.entries()) {
        Plotly.newPlot(key, value[0], value[1], value[2]);
    };
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active')
    });
    document.getElementById('report').classList.add('active');
    document.getElementById('resetPlotSizes').dispatchEvent(new Event('click'));
    console.log('Report filled')
}