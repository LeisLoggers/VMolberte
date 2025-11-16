export function configureSelectBoxes(columns, lfh) {
    let gt = document.getElementById('selectGraphType');
    let menu = document.getElementById('selectGroupType');
    let colormenu = document.getElementById('selectGroupColor');
    let metric1 = document.getElementById('metric_1');
    let metric2 = document.getElementById('metric_2');
    let mergeKey = document.getElementById('mergeKey');
    let decoration = [mergeKey, gt, menu, colormenu, metric1, metric2]
    columns.forEach(column => {
        if (lfh.includes(column)) {
            return;
        } else {
            let groupOption = document.createElement('option');
            let colorOption = document.createElement('option');
            let m1Option = document.createElement('option');
            let m2Option = document.createElement('option');
            let mergeOpt = document.createElement('option');
            groupOption.innerText = column;
            colorOption.innerText = column;
            m1Option.innerText = column;
            m2Option.innerText = column;
            mergeOpt.innerText = column;
            groupOption.value = column;
            colorOption.value = column;
            m1Option.value = column;
            m2Option.value = column;
            mergeOpt.value = column;
            menu.appendChild(groupOption);
            colormenu.appendChild(colorOption)
            metric1.appendChild(m1Option);
            metric2.appendChild(m2Option);
            mergeKey.appendChild(mergeOpt)
        };
    })
    return decoration;
}