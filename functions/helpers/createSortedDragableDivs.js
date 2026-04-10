const Sortable = require('sortablejs');

let removeArea = document.querySelector('.removeArea');

Sortable.create(
    removeArea,
    {
        group: 'sorters',
        onAdd: function (event) {
            removeArea.classList.remove('hoveredRemove');
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
        child.dataset.source = 'group';
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
            group: 'sorters',
            onAdd: function (event) {
                if (event.from.id === 'colorSort' || event.item.dataset.source === 'color') {
                    event.from.appendChild(event.item);
                }
            }
        }
    );
    if (groupArray.join(',') !== colorArray.join(',')) {
        colorArray.forEach(elem => {
            let child = document.createElement('div');
            child.dataset.source = 'color';
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
                group: 'sorters',
                onAdd: function (event) {
                    if (event.from.id === 'groupSort' || event.item.dataset.source === 'group') {
                        event.from.appendChild(event.item);
                    }
                }
            }
        );
    } else {
        //colorSort.innerText = 'Порядок соответствует порядку групп';
    }
}