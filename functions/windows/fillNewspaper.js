const path = require('path');
const fs = require('fs');

function createNewsBlock(data) {
    const updateCard = document.createElement('div');
    updateCard.className = 'update-card';
    const updateDate = document.createElement('div');
    updateDate.className = 'update-date';
    const day = document.createElement('div');
    const month = document.createElement('div');
    day.className = 'day';
    month.className = 'month';
    day.innerText = data.date.day;
    month.innerText = data.date.month;

    updateDate.appendChild(day);
    updateDate.appendChild(month);
    updateCard.appendChild(updateDate);

    const updateContent = document.createElement('div');
    updateContent.className = 'update-content';
    const updateHeader = document.createElement('h3');
    updateHeader.innerText = data.header;
    updateContent.appendChild(updateHeader);

    data.content.forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.innerText = line;
        updateContent.appendChild(paragraph);
    });

    const updateTags = document.createElement('div');
    updateTags.className = 'update-tags';
    Object.keys(data.tags).forEach(tag => {
        let tagSpan = document.createElement('span');
        tagSpan.className = data.tags[tag].type;
        tagSpan.innerText = data.tags[tag].text;
        updateTags.appendChild(tagSpan);
    });
    updateContent.appendChild(updateTags);
    updateCard.appendChild(updateContent)

    document.getElementById('updates-container').appendChild(updateCard);
}


function fillNewspaper() {
    document.querySelector('.loading-circle').style.display = 'block';
    const newsPath = path.join(__dirname, '..', '..', 'assets', 'newspaper.json');
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(newsPath)) {
            reject('Файл с новостями не найден');
        } else {
            fetch(newsPath).then(newspaper => {
                newspaper.json().then(data => {
                    document.getElementById('updates-container').innerHTML = '';
                    Array.from(Object.keys(data)).reverse().forEach(key => {
                        if (key !== 'template') {
                            createNewsBlock(data[key]);
                        }
                    })
                    document.querySelector('.loading-circle').style.display = 'none';
                    resolve();
                }).catch(dataError => {
                    document.querySelector('.loading-circle').style.display = 'none';
                    reject(`Ошибка json newspaper ${dataError}`);
                })
            }).catch(err => {
                document.querySelector('.loading-circle').style.display = 'none';
                reject(`Ошибка фетча newspaper ${err}`);
            });
        };
    });
};

module.exports = fillNewspaper;