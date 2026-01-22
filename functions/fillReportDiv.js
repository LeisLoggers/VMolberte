const Plotly = require('plotly.js-dist');
export function fillReportDiv(traces, filenames, outliers) {
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
                    <hr style="margin-top: 20px;">
                    <div id="pct_target_bases_10x_outliers">
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
                    <hr style="margin-top: 20px;">
                    <div id="pct_target_bases_20x_outliers">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Среднее покрытие</h3>
                    </div>
                    <div id="mean_target_coverage">
                    </div>
                    <hr style="margin-top: 20px;">
                    <div id="mean_target_coverage_outliers">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Количество прочтений на образец</h3>
                    </div>
                    <div id="total_reads">
                    </div>
                    <hr style="margin-top: 20px;">
                    <div id="mean_target_coverage_outliers">
                    </div>
                </div>

                <div class="content-block" style="margin-bottom: 10px;">
                    <div class="block-header">
                        <i class="fa-solid fa-splotch"></i>
                        <h3>Доля целевых оснований</h3>
                    </div>
                    <div id="pct_selected_bases">
                    </div>
                    <hr style="margin-top: 20px;">
                    <div id="pct_selected_bases_outliers">
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
    // Конфигурация страницы
    let reportHeader = document.getElementById('report').querySelector('h2');
    reportHeader.innerText = '';
    reportHeader.innerText = `Отчёт по ${filenames.join(', ')}`;
    let report = document.getElementById('report-content'); 
    report.innerHTML = reportDiv;
    document.getElementById('reportMenu').style.visibility = 'visible';
    // Размещение графиков в соответствующих полях
    for (const [key, value] of traces.entries()) {
        Plotly.newPlot(key, value[0], value[1], value[2]);
    };
    // Размещение выпаденцев
    console.log(outliers)
    for (const [key, value] of Object.entries(outliers)) {
        document.getElementById(key).innerHTML = `<details><summary>Выпавшие образцы ${key}:</summary><table><thead><tr><th>Code</th><th>Pool</th></thead><tbody>${value.join('')}</tbody></details>`
    };

    // Перевод пользователя на страницу отчётов
    document.querySelectorAll('.menu-item').forEach(element => {
        element.classList.remove('active');
    });
    document.getElementById('reportMenu').classList.add('active');
    document.querySelectorAll('.page').forEach(element => {
        element.classList.remove('active');
    });
    document.getElementById('report').classList.add('active');

    // Обновление страницы отчёта и нормализация размеров графиков
    document.getElementById('resetPlotSizes').dispatchEvent(new Event('click'));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log('Report filled')
}