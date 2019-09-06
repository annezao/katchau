import moment from "moment";
import Parse from 'parse';
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
};

function returnFormatedDate(date) {
  return moment(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes(), "YYYY-MM-DD HH:mm");
}

async function readVoltageByDay(device, start, end, willUpdate) {
  const Voltage = Parse.Object.extend('Voltage')
  const query = new Parse.Query(Voltage)

  query.equalTo("source", device)
  query.greaterThanOrEqualTo("date", start)
  query.lessThanOrEqualTo("date", end)
  query.include('value')
  query.include('date')

  let result = await query.find(),
    arr = [],
    sum = 0

  for (let i = 0; i < result.length; i++) {
    let thisObject = result[i], value = thisObject.get('value');
    sum += parseFloat(value.toFixed(2));
    arr.push({ 'x': returnFormatedDate(thisObject.get("date")), 'y': parseFloat(sum.toFixed(2)), "v": parseFloat(value.toFixed(2)) })
  }

  return arr
}
async function readVoltageByMonth(device, start, end) {
  const Voltage = Parse.Object.extend('Voltage')
  const query = new Parse.Query(Voltage)

  query.equalTo("source", device)
  query.greaterThanOrEqualTo("date", start)
  query.lessThanOrEqualTo("date", end)
  query.include('value')
  query.include('date')

  let result = await query.find(),
    arr = []

  if(result.length){
    const groups = result.reduce((groups, result) => {
      let thisObject = result,
        day = thisObject.get('date'),
        d = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0).toISOString()

      if (!groups[d]) {
        groups[d] = [];
      }

      groups[d].push(thisObject.get('value'));
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
}
async function readVoltageByYear(device, start, end) {
  const Voltage = Parse.Object.extend('Voltage')
  const query = new Parse.Query(Voltage)

  query.equalTo("source", device)
  query.greaterThanOrEqualTo("date", start)
  query.lessThanOrEqualTo("date", end)
  query.include('value')
  query.include('date')

  let result = await query.find(),
    arr = []

  if (result.length) {
    const groups = result.reduce((groups, result) => {
      let thisObject = result,
        day = thisObject.get('date'),
        d = moment(`${day.getFullYear()}/${day.getMonth()+1}/1`, "YYYY/MM/DD").format('MMM')

      if (!groups[d]) {
        groups[d] = [];
      }

      groups[d].push(thisObject.get('value'));
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    Object.keys(groups).forEach((month) => {
      arr.push({
        x: month,
        y: groups[month].reduce((x, y) => x + y, 0),
        month: moment().month(month).format("MMMM")
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
}

async function readVoltage(type, device, date) {
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
    default:
      date = new Date();
      return readVoltageByYear(
        device,
        new Date(date.getFullYear(), 0, 1),
        new Date(date.getFullYear(), 11, 1))
  }
}

export {
  mainCharts,
  readVoltage
};
