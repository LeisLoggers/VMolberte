const Plotly = require('plotly.js-dist')
export function fillReportDiv(traces, filenames) {
    let reportDiv = 
    `
                
                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Ширина покрытия 10Х</h3>
                    </div>
                    <div id="breadth_10x">
                    </div>
                    <hr style="margin-top: 20px;">
                    <div id="pct_target_bases_10x">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Ширина покрытия 20Х</h3>
                    </div>
                    <div id="breadth_20x">
                    </div>
                    <hr style="margin-top: 20px;">
                    <div id="pct_target_bases_20x">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Среднее покрытие</h3>
                    </div>
                    <div id="mean_target_coverage">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Количество прочтений на образец</h3>
                    </div>
                    <div id="total_reads">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Доля целевых оснований</h3>
                    </div>
                    <div id="pct_selected_bases">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Доля ПЦР-дубликатов</h3>
                    </div>
                    <div id="pct_exc_dupe">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>AT-дропаут</h3>
                    </div>
                    <div id="at_dropout">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>GC-дропаут</h3>
                    </div>
                    <div id="gc_dropout">
                    </div>
                </div>

    `
    let reportHeader = document.getElementById('report').querySelector('h2');
    reportHeader.innerText = `Отчёт по ${filenames.join(', ')}`;
    let report = document.getElementById('report-content'); 
    report.innerHTML = reportDiv;
    document.getElementById('reportMenu').style.visibility = 'visible';
    document.getElementById('reportMenu').classList.toggle('toggling');
    for (const [key, value] of traces.entries()) {
        Plotly.newPlot(key, value[0], value[1], value[2]);
    };
    console.log('Report filled')
}