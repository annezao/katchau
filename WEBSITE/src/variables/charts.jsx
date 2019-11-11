import moment from "moment";
// import Parse from 'parse';
import axios from "axios";
import "moment/locale/pt-br";
import 'hammerjs';
import 'chartjs-plugin-zoom';

moment.locale('pt-br');


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
    labels: (date) => {
      return [
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 2, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 4, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0)
      ]
    },
    options: (min, max, date) => {
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
                return `${myData.datasets[0].data[tooltipItem[0].index].x.format('LLL')}`;
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
            mode: "y",
            rangeMin: {
              x: moment(date).valueOf(),
              y: 0
            },
            rangeMax: {
              x: moment(date).add({ hours: 23 }).valueOf(),
              y: (parseInt(max) + 1000)
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
              y: (parseInt(max) + 400)
            }
          }
        }
    },
    //example
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

      return v[day]
      // return getAccumulate(v[day])
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
    labels: (date) => {
      let data = [], month = date.getMonth()+1,
        days = moment(month, "MM").endOf("month").date();
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
              return `${myData.datasets[0].data[tooltipItem[0].index].x.format('LL')}`;
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
    //example
    values: (month) => {
      let data = [], days = moment(month, "MM").endOf("month").date();
      for (let index = 1; index <= days; index++) {
        data.push({ x: moment(`${index}/${month}`, "DD/MM"), y: Math.floor((Math.random() * 3000) + 1000) });
      }
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
    labels: () => moment.monthsShort(),
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
              return `${myData.datasets[0].data[tooltipItem[0].index].month} de ${new Date().getFullYear()}`;
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
    //example
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
},
baseUrl = 'http://127.0.0.1:8000';

function filterDates(arr, start, end) {
  let filteredArr = arr.filter((potency) => {
    let date = new Date(potency.date);
    return date.getTime() >= start.getTime() &&
      date.getTime() <= end.getTime();
  });

  return filteredArr;
}

async function readVoltageByDay(device, start, end) {

  let arr = [];
  try {

    const response = await axios.get(`${baseUrl}/api/Device/${device}/Potency`);
    console.log(`An array with ${response.data.length} potencies...`);

    let filteredData = filterDates(response.data, start, end);
    console.log(`was filtered and now has ${filteredData.length} potencies.`);

    filteredData.forEach(function (potency) {
      arr.push({ 'x': moment(potency.date), 'y': potency.value, "v": potency.value })
    });

    return arr;

  } catch (error) {

    console.error(error);
    return arr;
  }
}

async function readVoltageByMonth(device, start, end) {

  let arr = [];
  try {

    const response = await axios.get(`${baseUrl}/api/Device/${device}/Potency`);
    console.log(`An array with ${response.data.length} potencies...`);

    let filteredData = filterDates(response.data, start, end);
    console.log(`was filtered and now has ${filteredData.length} potencies.`);

    if (filteredData.length) {
      const groups = filteredData.reduce((groups, result) => {
        let thisObject = result,
          day = new Date(thisObject.date),
          d = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0).toISOString()

        if (!groups[d]) {
          groups[d] = [];
        }

        groups[d].push(thisObject.value);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      Object.keys(groups).forEach((date) => {
        arr.push({
          x: moment(date),
          y: groups[date].reduce((x, y) => x + y, 0)
        })
      });

      arr.sort(function (a, b) {
        if (a.y < b.y) {
          return -1;
        }
        if (a.y > b.y) {
          return 1;
        }
        return 0;
      })
    }

    return arr;

  } catch (error) {

    console.error(error);
    return arr;
  }
}
async function readVoltageByYear(device, start, end) {
  return [];
}

async function readVoltage(type, device, date){
  switch (type) {
    case "dia":
      return readVoltageByDay(
        device,
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59));
    
    case "mes":
      return readVoltageByMonth(
        device,
        new Date(date.getFullYear(), date.getMonth(), 1),
        new Date(date.getFullYear(), date.getMonth() + 1, 0));

    case "ano":
      date = new Date();
      return readVoltageByYear(
        device,
        new Date(date.getFullYear(), 0, 1),
        new Date(date.getFullYear(), 11, 1))

    default:
        return []
  }
}

export {
  mainCharts,
  readVoltage
};
