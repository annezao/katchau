import moment from "moment";
import "moment/locale/pt-br";
import 'hammerjs';
import 'chartjs-plugin-zoom';

moment.locale('pt-br');
/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// ##############################
// // // Chart variables
// #############################

// #########################################
// // // used inside src/views/Dashboard.jsx
// #########################################

function getAccumulate(array = null) {

  if(array !== null){
    let sum = 0;

    array.forEach(function (el) {
      sum += el.v;
      el.y = sum;
    });

    return array;
  }
  else return []
}

let mainCharts = {
  dia: {
    datasets: (data, gradientStroke) => {
      return [
        {
          label: "",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#d048b6",
          pointBorderColor: "rgba(255,255,255,0)",
          hoverBackgroundColor: "#F10EC7",
          pointBorderWidth: 15,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 20,
          pointRadius: 4,
          data: data
        }
      ];
    },
    labels: [
      moment("00:00", 'HH:mm'),
      moment("01:00", 'HH:mm'),
      moment("02:00", 'HH:mm'),
      moment("03:00", 'HH:mm'),
      moment("04:00", 'HH:mm'),
      moment("05:00", 'HH:mm'),
      moment("06:00", 'HH:mm'),
      moment("07:00", 'HH:mm'),
      moment("08:00", 'HH:mm'),
      moment("09:00", 'HH:mm'),
      moment("12:00", 'HH:mm'),
      moment("13:00", 'HH:mm'),
      moment("14:00", 'HH:mm'),
      moment("16:00", 'HH:mm'),
      moment("17:00", 'HH:mm'),
      moment("18:00", 'HH:mm'),
      moment("19:00", 'HH:mm'),
      moment("20:00", 'HH:mm'),
      moment("20:00", 'HH:mm'),
      moment("21:00", 'HH:mm'),
      moment("22:00", 'HH:mm'),
      moment("23:00", 'HH:mm')
    ],
    options: (min, max) => {

      console.log("charts.jsx options: (min, max)", min, max);
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          callbacks: {
            title: function (tooltipItem, myData) {
              return `${myData.data[tooltipItem[0].index].x.format('LLL')}`;
            },
            label: function (tooltipItem, myData) {
              return `foram gastos ${tooltipItem.value}kW`;
            }
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 10,
                fontColor: "#9a9a9a",
                callback: function (value) {
                  if (Math.floor(value) === value) {
                    return value
                  }
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Watts'
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 30,
                fontColor: "#9a9a9a"
              },
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'HH:mm'
                }
              }
            }
          ]
        },
        pan: {
          enabled: true,
          mode: "xy",
          rangeMin: {
            x: moment("00:00", 'HH:mm').valueOf(),
            y: 0
          },
          rangeMax: {
            x: moment("23:00", 'HH:mm').valueOf(),
            y: (max + 1000)
          }
        },
        zoom: {
          enabled: true,
          drag: false,
          mode: "xy",
          rangeMin: {
            y: 0
          },
          rangeMax: {
            y: (max + 400)
          }
        }
      }
    },
    values: (day) => {

      let m = moment(),
        n = moment().add(-1, 'd'),
        todayExample = m.date() + "/" + (m.month() + 1) + "/" + m.year(),
        yesterdayExample = n.date() + "/" + (n.month() + 1) + "/" + n.year();
      day = moment(day);
      day = day.date() + "/" + (day.month() + 1) + "/" + day.year();

      let v = {};
      v[todayExample] = [
        { x: moment("00:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) }
      ];
      
      v[yesterdayExample] = [
        { x: moment("00:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("00:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("01:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("02:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("03:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("04:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("05:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("06:00", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("06:15", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("06:30", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) },
        { x: moment("06:45", 'HH:mm'), v: Math.floor((Math.random() * 300) + 50) }
      ]

      return getAccumulate(v[day])
    }
  },
  mes: {
    datasets: (data, gradientStroke) => {
      return [
        {
          label: "",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#d048b6",
          pointBorderColor: "rgba(255,255,255,0)",
          hoverBackgroundColor: "#F10EC7",
          pointBorderWidth: 15,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 20,
          pointRadius: 4,
          data: data
        }
      ];
    },
    labels: (month) => {
      let data = [], days = moment(month, "MM").endOf("month").date();
      for (let index = 1; index <= days; index++) {
        data.push(moment(`${index}/${month}`, "DD/MM"));
      }
      return data;
    },
    options: (min, max) => {

      console.log("charts.jsx options: (min, max)", min, max);
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          callbacks: {
            title: function (tooltipItem, myData) {
              return `${myData.data[tooltipItem[0].index].x.format('LL')}`;
            },
            label: function (tooltipItem, myData) {
              return `foram gastos ${tooltipItem.value}kW`;
            }
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 10,
                fontColor: "#9a9a9a",
                callback: function (value) {
                  if (Math.floor(value) === value) {
                    return value
                  }
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Watts'
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 30,
                fontColor: "#9a9a9a"
              },
              type: 'time',
              time: {
                displayFormats: {
                  'day': 'MMM DD'
                }
              }
            }
          ]
        }
      }
    },
    values: (month) => {
      let data = [], days = moment(month, "MM").endOf("month").date();
      for (let index = 1; index <= days; index++) {
        data.push({ x: moment(`${index}/${month}`, "DD/MM"), y: Math.floor((Math.random() * 3000) + 1000) });
      }
      console.log(data);
      return data;
    }
  },
  ano: {
    datasets: (data, gradientStroke) => {
      return [
        {
          label: "",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#d048b6",
          pointBorderColor: "rgba(255,255,255,0)",
          hoverBackgroundColor: "#F10EC7",
          pointBorderWidth: 15,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 20,
          pointRadius: 4,
          data: data
        }
      ];
    },
    labels: [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ"
    ],
    options: (min, max) => {

      console.log("charts.jsx options: (min, max)", min, max);
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          callbacks: {
            label: function (tooltipItem, myData) {
              return `foram gastos ${tooltipItem.value}kW`;
            }
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a",
                callback: function (value) {
                  if (Math.floor(value) === value) {
                    return value
                  }
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Watts'
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      }
    },
    values: [
      { x: "JAN", y: 15834 },
      { x: "FEV", y: 13500 },
      { x: "MAR", y: 14523 },
      { x: "ABR", y: 13234 },
      { x: "MAI", y: 12834 },
      { x: "JUN", y: 13333 },
      { x: "JUL", y: 12843 }
    ]
  }
};

let chartExample3 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
      datasets: [
        {
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45]
        }
      ]
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};

const chartExample4 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80]
        }
      ]
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};

export {
  mainCharts, // in src/views/Dashboard.jsx
  chartExample3,
  chartExample4
};
