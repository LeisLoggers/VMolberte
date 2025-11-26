const fs = require('fs');

export function createPerTarForSave(header, traces, path) {
    const objFromMap = {};
    for (const [key, value] of traces.entries()) {
        objFromMap[key] = value;
    };
    const fileHeader = header.toString();
    console.log(fileHeader);
    let template =
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[VM] Отчёт по запуску</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.plot.ly/plotly-latest.min.js" charset="utf-8"></script>
    <style>
        :root {
            --primary-color: #2c7be5;
            --secondary-color: #11cdef;
            --success-color: #2dce89;
            --info-color: #11cdef;
            --warning-color: #fb6340;
            --danger-color: #f5365c;
            --light-color: #f8f9fe;
            --dark-color: #32325d;
            --sidebar-width: 260px;
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f5f7;
            color: var(--dark-color);
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }
        /* Экран загрузки */
        .loadingContainer {
            width: 400px;
            display: flexbox;
	        align-self: center;
	        justify-self: center;
            background: linear-gradient(135deg, #004074 0%, #a0a0a0a0 100%);
            color: white;
            height: 400px;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border-radius: 22px;
            overflow-y: hidden;
        }

        .loadingContainer-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            height: fit-content;
        }

            .sidebar-header h1 {
                font-size: 1.8rem;
                margin-bottom: 5px;
            }

            .sidebar-header p {
                font-size: 0.9rem;
                opacity: 0.8;
            }

        .content {
            height: 100%;
            display: flex;
            vertical-align: middle;
        }

        .loader {
          width: 30px;
          height: 100px;
          display: block;
          margin: 35px auto 0;
          border-left: 2px solid #FFF;
          border-bottom: 2px solid #FFF;
          border-right: 2px solid #FFF;
          border-radius: 0 0 50px 50px;
          position: relative;
          box-shadow: 0 0 #FFF inset;
          background-image: linear-gradient(#FFF 100px, transparent 0);
          background-position: 0 0;
          background-size: 36px 120px;
          background-repeat: no-repeat;
          box-sizing: border-box;
          animation: animloader 6s linear infinite;
        }
        .loader::after {
          content: '';
          box-sizing: border-box;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          border: 2px solid #FFF;
          border-radius: 50%;
          width: 36px;
          height: 10px;
        }
        .loader::before {
          content: '';
          box-sizing: border-box;
          left: 0;
          bottom: -4px;
          border-radius: 50%;
          position: absolute;
          width: 12px;
          height: 6px;
          animation: animloader1 6s linear infinite;
        }

        @keyframes animloader {
          0% {
            background-position: 0 80px;
          }
          100% {
            background-position: 0 0;
          }
        }

        @keyframes animloader1 {
          0% {
            box-shadow: 4px -10px rgba(51, 122, 183, 0), 6px 0 rgba(51, 122, 183, 0), 8px -15px rgba(51, 122, 183, 0), 12px 0 rgba(51, 122, 183, 0);
          }
          20% {
            box-shadow: 4px -20px rgba(51, 122, 183, 0), 8px -10px rgba(51, 122, 183, 0), 10px -30px rgba(51, 122, 183, 0.5), 15px -5px rgba(51, 122, 183, 0);
          }
          40% {
            box-shadow: 2px -40px rgba(51, 122, 183, 0.5), 8px -30px rgba(51, 122, 183, 0.4), 8px -60px rgba(51, 122, 183, 0.5), 12px -15px rgba(51, 122, 183, 0.5);
          }
          60% {
            box-shadow: 4px -60px rgba(51, 122, 183, 0.5), 6px -50px rgba(51, 122, 183, 0.4), 10px -90px rgba(51, 122, 183, 0.5), 15px -25px rgba(51, 122, 183, 0.5);
          }
          80% {
            box-shadow: 2px -80px rgba(51, 122, 183, 0.5), 4px -70px rgba(51, 122, 183, 0.4), 8px -120px rgba(51, 122, 183, 0), 12px -35px rgba(51, 122, 183, 0.5);
          }
          100% {
            box-shadow: 4px -100px rgba(51, 122, 183, 0), 8px -90px rgba(51, 122, 183, 0), 10px -120px rgba(51, 122, 183, 0), 15px -45px rgba(51, 122, 183, 0);
          }
        }

        /* Sidebar Styles */
        .sidebar {
            width: var(--sidebar-width);
            background: linear-gradient(135deg, #004074 0%, #a0a0a0a0 100%);
            color: white;
            position: fixed;
            width: 100vw;
            overflow-y: auto;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-header h1 {
            font-size: 1.8rem;
            margin-bottom: 5px;
        }

        .sidebar-header p {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .sidebar-menu {
            padding: 20px 0;
        }

        .menu-item {
            padding: 15px 25px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: var(--transition);
            border-left: 3px solid transparent;
        }

        .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-left-color: white;
        }

        .menu-item.active {
            background-color: rgba(255, 255, 255, 0.2);
            border-left-color: white;
        }

        .menu-item i {
            margin-right: 15px;
            font-size: 1.2rem;
        }

        /* Main Content */
        .main-content {
            display: none;
            margin-top: 100px;
            flex: 1;
            padding: 30px;
            width: calc(100% - var(--sidebar-width));
            
        }

        .page {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        .page.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .page-header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }

        .page-header h2 {
            font-size: 2rem;
            color: var(--dark-color);
            margin-bottom: 10px;
        }

        .page-header p {
            color: #6c757d;
        }

        /* Main Page Styles */
        .content-blocks {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .content-block {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: var(--transition);
        }

        .content-block:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .block-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }

        .block-header i {
            color: var(--primary-color);
            margin-right: 10px;
        }

        .block-header h3 {
            font-size: 1.1rem;
            color: var(--dark-color);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar {
                height: 70px;
            }

            .sidebar-header h1,
            .sidebar-header p,
            .menu-item span {
                display: none;
            }

            .menu-item {
                justify-content: center;
                padding: 15px;
            }

            .menu-item i {
                margin: 0;
            }

            .main-content {
                margin-left: 70px;
                width: calc(100% - 70px);
                padding: 20px;
            }

            .content-blocks {
                grid-template-columns: 1fr;
            }

            .action-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="loadingContainer">
        <div class="loadingContainer-header">
            <h1><i class="fas fa-dna"></i> VMolberte</h1>
            <p>Как ICDMS, только на JS.</p>
        </div>
        <div class="content">
            <span class="loader"></span>
        </div>
    </div>
    <div class="sidebar">
        <div class="sidebar-header">
            <h1><i class="fas fa-dna"></i> VMolberte</h1>
            <p>Как ICDMS, только на JS.</p>
        </div>
    </div>

    <div class="main-content">
        <div id="report" class="page active">
			<div class="page-header">
                <h2></h2>
			</div>

			<div id="report-content">
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
			</div>
        </div>

    </div>

    <script>
    window.addEventListener('DOMContentLoaded', function() {
        let traces = ${JSON.stringify(objFromMap)};
        let tracesKeys = Object.keys(traces);
        document.getElementById('report').querySelector('h2').innerText = '${fileHeader}';
        for (const key in traces) {
            Plotly.newPlot(key, traces[key][0], traces[key][1], traces[key][2]);
        };
        document.querySelector('.loadingContainer').style.display = 'none';
		document.querySelector('.main-content').style.display = 'block';		
        let plots = document.querySelectorAll('.js-plotly-plot');
		plots.forEach(elem => {
			Plotly.Plots.resize(elem);
		});
    });

    </script>
</body>
</html>`
    fs.writeFile(path, template, err => {
        if (err) {
            console.log('Ошибка при сохранении');
            return
        }
        console.log('Файл сохранён')
    })
}