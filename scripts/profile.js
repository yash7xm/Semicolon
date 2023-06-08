const textArea = document.querySelector('.text-area');
const textMsg = document.querySelector('.text-area p');
const edit = document.querySelector('.edit');
const submit = document.querySelector('.submit');
const thanksMsg = document.querySelector('.thanks-msg');
const nameEditBtn = document.querySelector('.name-edit-btn');
const userName = document.querySelector('.name span');
const nav = document.querySelector('nav');
let initUserName = '';

nameEditBtn.addEventListener('click', () => {
    userName.textContent = userName.textContent.replace(/\s+/g, " ").trim();

    if (nameEditBtn.classList.contains('fa-pen-to-square')) {
        userName.setAttribute('contenteditable', 'true');
        userName.focus();
        nameEditBtn.classList.remove('fa-pen-to-square');
        nameEditBtn.classList.add('fa-check');
        initUserName = userName.textContent;
    }
    else if (nameEditBtn.classList.contains('fa-check')) {
        userName.removeAttribute('contenteditable', 'true');
        nameEditBtn.classList.add('fa-pen-to-square');
        nameEditBtn.classList.remove('fa-check');
        userName.blur();
        if (userName.textContent === '') {
            userName.textContent = 'Cannot be blank';
            nameEditBtn.style.display = 'none';
            setTimeout(() => {
                userName.textContent = initUserName;
                nameEditBtn.style.display = 'initial';
            }, 2000);
            return;
        }

        updateName();

        const tempName = userName.textContent;
        userName.textContent = 'Name Changed!';
        nameEditBtn.style.display = 'none';
        setTimeout(() => {
            userName.textContent = tempName;
            nameEditBtn.style.display = 'initial';
        }, 2000);
    }
})

userName.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    userName.textContent = text;
});

userName.addEventListener('focus', () => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(userName);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
});

edit.addEventListener('click', () => {
    if (!thanksMsg.classList.contains('hidden')) {
        thanksMsg.classList.add('hidden');
        textArea.style.display = 'initial';
        textMsg.style.display = 'initial';
        thanksMsg.querySelector('p').textContent = 'Thank You for your Feedback!';
    }
    textMsg.textContent = textMsg.textContent.replace(/\s+/g, " ").trim();
    edit.style.color = 'yellow'
    textMsg.setAttribute('contenteditable', 'true');
    textMsg.focus();
    if (textMsg.textContent === 'Max 80 chars long')
        textMsg.textContent = '';

})

submit.addEventListener('click', () => {
    textMsg.textContent = textMsg.textContent.replace(/\s+/g, " ").trim();
    textMsg.blur();
    textMsg.removeAttribute('contenteditable', 'true');
    if (!thanksMsg.classList.contains('hidden')) {
        console.log('yo');
        thanksMsg.classList.add('hidden');
        thanksMsg.querySelector('p').textContent = 'Thank You for your Feedback!';
        textArea.style.display = 'initial';
        textMsg.style.display = 'initial';
        return;
    }
    if (textMsg.textContent.length > 80) {
        thanksMsg.classList.remove('hidden');
        thanksMsg.querySelector('p').textContent = 'Oops! More than 80 chars';
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
        return;
    }
    if (textMsg.textContent === '' || textMsg.textContent === 'Max 80 chars long') {
        textMsg.textContent = 'Max 80 chars long';
        // console.log('in if');
    } else {
        // console.log('in else');
        updateMsg();
        thanksMsg.classList.remove('hidden');
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
    }
});

textMsg.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    textMsg.textContent = text;
});

textMsg.addEventListener('focus', () => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(textMsg);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
});

document.addEventListener('click', (e) => {
    if (e.target !== edit && e.target !== textArea && e.target !== textMsg) {
        textMsg.blur();
        textMsg.removeAttribute('contenteditable', 'true');
        if (textMsg.textContent === '')
            textMsg.textContent = 'Max 80 chars long';
        edit.style.color = 'var(--color-1)';
    }

    if (e.target !== nameEditBtn && e.target !== userName) {
        userName.blur();
        userName.removeAttribute('contenteditable', 'true');
        nameEditBtn.style.color = 'var(--color-1)';
        nameEditBtn.classList.add('fa-pen-to-square');
        nameEditBtn.classList.remove('fa-check');
    }
})
let userData;

// fetchUserData();
async function fetchUserData() {
    await fetch('http://localhost:8080/graphData')
        .then(response => response.json())
        .then(data => {
            userData = data;
            google.charts.setOnLoadCallback(drawBasic);
            google.charts.setOnLoadCallback(drawChart);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


let chart, data, options;
var chartContainer = document.getElementById('chart_div').parentElement;
let containerWidth, containerHeight;
containerWidth = chartContainer.offsetWidth;
containerHeight = chartContainer.offsetHeight;
google.charts.load('current', { packages: ['corechart', 'line'] });

function drawBasic() {
    data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Score');

    let dataArray = [];
    for (let i = 0; i < userData.score.length; i++) {
        dataArray.push([i + 1, parseInt(userData.score[i].wpm)]);
    }

    data.addRows(dataArray);

    options = {
        hAxis: {
            title: '',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
        },
        vAxis: {
            title: 'Score',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
            titleTextStyle: {
                fontSize: 20,
                color: 'rgb(126, 87, 194)',
            },
        },
        backgroundColor: 'transparent',
        chartArea: {
            backgroundColor: 'transparent',
        },
        colors: ['yellow'],
        width: containerWidth,
        height: containerHeight,
        legend: 'none',
    };

    chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('fetch)');
    fetchUserData();
});

window.addEventListener('resize', () => {
    window.location.reload();
    handleChartResize();
    fetchUserData();
})

function handleChartResize() {
    console.log('chart');
    containerWidth = chartContainer.offsetWidth;
    containerHeight = chartContainer.offsetHeight;
    // google.charts.setOnLoadCallback(drawBasic);
}


google.charts.load("current", { packages: ["calendar"] });

function drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });

    const hashtable = {};
    function addToHashtable(date, data) {
        if (hashtable[date]) {
            hashtable[date] += data;
        } else {
            hashtable[date] = data;
        }
    }

    for (let i = 0; i < userData.score.length; i++) {
        const date = userData.score[i].date;
        addToHashtable(date, 1);
    }

    console.log(hashtable);
    const hashArray = Object.entries(hashtable);
    console.log(hashArray);

    let dataArray = [];
    for (let i = 0; i < hashArray.length; i++) {
        let date = hashArray[i][0];
        let freq = hashArray[i][1];
        console.log(date);
        let dateArray = date.split(" ");
        console.log(dateArray);
        dataArray.push([new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])), freq]);
    }

    console.log(dataArray);

    dataTable.addRows(dataArray);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

    var options = {
        title: "",
        legend: 'none',
        width: '1100',
        height: '450',
        noDataPattern: {
            backgroundColor: 'transparent',
            color: '#050a18',
        },
        colorAxis: { minValue: 0, colors: ['#FFFFE0', '#FFD700'] },

        calendar: {
            underMonthSpace: 15,
            dayOfWeekRightSpace: 15,
            unusedMonthOutlineColor: {
                stroke: '#ccc',
                strokeOpacity: 0.5,
                strokeWidth: 0.5
            },
            cellColor: {
                stroke: '#1e2345',
                strokeOpacity: 0.5,
                strokeWidth: 1,
                color: 'black',
            },
            focusedCellColor: {
                stroke: 'yellow',
                strokeOpacity: 0.8,
                strokeWidth: 1,

            },

            monthOutlineColor: {
                stroke: 'yellow',
                strokeOpacity: 0.5,
                strokeWidth: 1
            },
            cellSize: 18,
            yearLabel: {
                fontName: 'Times-Roman',
                fontSize: 32,
                color: 'transparent',
                bold: true,
                italic: true
            },
        }
    };
    chart.draw(dataTable, options);
}
console.log(document.cookie);

async function updateMsg() {
    console.log('heelo')
    try {
        const response = await fetch('http://localhost:8080/updateMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Msg: textMsg.textContent.replace(/\s+/g, " ").trim()
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update msg');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateName() {
    console.log('name update')
    try {
        const response = await fetch('http://localhost:8080/updateName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: userName.textContent
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update name');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


function handleNavToggle(){
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true" ;
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}