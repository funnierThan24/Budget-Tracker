//chart 1: constant (wont change)
const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'pie',
        data: {
        labels: ['Need', 'Want', 'Saving'],
        datasets: [{
            label: '% of Balance',
            data: [50, 30, 20],
            borderWidth: 2
        }]
        },
    });

//chart 2 depicts users budget
//let formVal = document.getElementById("sel");

//variable to update chart2
let chartneed = 0;
let chartsavings = 0;
let chartwants = 0;

//create second chart
const ctx2 = document.getElementById('myChart2');

const newChart = new Chart(ctx2, {
    type: 'pie',
    data: {
    labels: ['Need', 'Want', 'Saving'],
    datasets: [{
        label: 'Amount Spent',
        data: [0, 0, 0],
        borderWidth: 2
    }]
    },
});


//update chart to show how user expenses are divided
function updateChart(expense, formVal){

    if(formVal == "Need"){
        newChart.data.datasets[0].data[0] = (parseFloat(expense)+newChart.data.datasets[0].data[0]);
        newChart.update();      
    }
    else if(formVal == "Want"){
        newChart.data.datasets[0].data[1] += (parseFloat(expense)+newChart.data.datasets[0].data[1]);
        newChart.update();
    }
    else if(formVal == "Savings"){
        newChart.data.datasets[0].data[2] += (parseFloat(expense)+newChart.data.datasets[0].data[2]);
        newChart.update();
    }
}
