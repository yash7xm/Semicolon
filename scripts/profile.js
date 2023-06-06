const textArea = document.querySelector('.text-area');
const edit = document.querySelector('.edit');
const submit = document.querySelector('.submit');

edit.addEventListener('click', () => {
    edit.style.color = 'yellow'
    textArea.setAttribute('contenteditable', 'true');
    textArea.focus();
    if (textArea.textContent === 'Max 80 chars long')
        textArea.textContent = '';
})

submit.addEventListener('click', () => {
    textArea.blur();
    textArea.removeAttribute('contenteditable', 'true');
    if (textArea.textContent === '')
        textArea.textContent = 'Max 80 chars long';

})

document.addEventListener('click', (e) => {
    if (e.target !== edit && e.target !== textArea) {
        textArea.blur();
        textArea.removeAttribute('contenteditable', 'true');
        if (textArea.textContent === '')
            textArea.textContent = 'Max 80 chars long';
        edit.style.color = 'var(--color-1)';
    }
})
let userData;

// fetchUserData();
async function fetchUserData() {
    await fetch('http://localhost:8080/graphData')
        .then(response => response.json())
        .then(data => {
            userData = data;
            console.log(userData);
            google.charts.setOnLoadCallback(drawBasic);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


let chart,data,options;
var chartContainer = document.getElementById('chart_div').parentElement;
let containerWidth,containerHeight;
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
    backgroundColor: 'transparent', // Set background color to transparent
    chartArea: {
      backgroundColor: 'transparent', // Set chart area background color to transparent
    },
    colors: ['yellow'], // Set line color to yellow
    width: containerWidth,
    height: containerHeight,
    legend: 'none',
  };

   chart = new google.visualization.LineChart(document.getElementById('chart_div'));


   chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', function() {
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







google.charts.load("current", {packages:["calendar"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
 var dataTable = new google.visualization.DataTable();
 dataTable.addColumn({ type: 'date', id: 'Date' });
 dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
 dataTable.addRows([
    [ new Date(2012, 3, 13), 1],
    [ new Date(2012, 3, 14), 2],
    [ new Date(2012, 3, 15), 3],
    [ new Date(2012, 3, 16), 4],
    [ new Date(2012, 3, 17), 5],
  ]);

 var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

 var options = {
   title: "",
   height: 500,
   width: 2000,
   legend: 'none',
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
cellSize: 20,
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