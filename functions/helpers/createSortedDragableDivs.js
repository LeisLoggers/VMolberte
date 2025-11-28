const Sortable = require('sortablejs');

let removeArea = document.querySelector('.removeArea');

Sortable.create(
    removeArea,
    {
        group: 'sorters',
        onAdd: function (event) {
            removeArea.removeChild(event.item);
        },    
    })
removeArea.addEventListener('dragenter', (event) => {
    removeArea.classList.add('hoveredRemove')
})
removeArea.addEventListener('dragleave', (event) => {
    removeArea.classList.remove('hoveredRemove')
})
export function createSortedDragableDivs(groupArray, colorArray) {
    const groupSort = document.getElementById('groupSort');
    const colorSort = document.getElementById('colorSort');
    groupSort.innerHTML = '';
    colorSort.innerHTML = '';

    groupArray.forEach(elem => {
        let child = document.createElement('div');
        child.innerText = elem;
        child.classList.add('sortableContent');
        groupSort.appendChild(child);
    });
    Sortable.create(
        groupSort,
        {
            animation: 150,
            ghostClass: 'sortableContent-ghost',
            chosenClass: 'sortableContent-chosen',
            dragClass: 'sortableContent-drag',
            group: 'sorters'
        }
    );
    if (groupArray.join(',') !== colorArray.join(',')) {
        colorArray.forEach(elem => {
            let child = document.createElement('div');
            child.innerText = elem;
            child.classList.add('sortableContent');
            colorSort.appendChild(child);
        });
        Sortable.create(
            colorSort,
            {
                animation: 150,
                ghostClass: 'sortableContent-ghost',
                chosenClass: 'sortableContent-chosen',
                dragClass: 'sortableContent-drag',
                group: 'sorters'
            }
        );
    } else {
        colorSort.innerText = 'Порядок соответствует порядку групп';
    }
}