const Handlebars = require("handlebars");
import Chart from 'chart.js/auto';
import WebsocketConnection from './ws';


const getUserId = () => {
  let storedUserId = localStorage.getItem("auth.user_id")
  if (storedUserId) {
    return storedUserId
  }

  let userId = crypto.randomUUID();
  localStorage.setItem("auth.user_id", userId);

  return userId;
}

let socket = new WebsocketConnection({url: "ws://192.168.1.107:8080"})
socket.connect()
socket.authenticate(getUserId())

let events = []

socket.setHandler("TradeEvent", (message) => {
  let data = message.data
  events.push(JSON.stringify(data))
})

const tradesOutlet = document.getElementById("trades")

let tradeTableTemplateElement = document.getElementById("trades-list")
let t = Handlebars.compile(tradeTableTemplateElement.innerText);

let tradeEvents = []

setInterval(() => {
  let tradeTableTemplateElement = document.getElementById("trades-list")
  let t = Handlebars.compile(tradeTableTemplateElement.innerText);


  tradeEvents.push({
    quantity: Math.floor(Math.random() * 10000),
    price: Math.floor(Math.random() * 10000),
    above: Math.floor(Math.random() * 10000) % 2 == 0,
  })


  if (tradeEvents.length > 15) {
    tradeEvents.shift()
  }

  tradesOutlet.innerHTML = t({trades: tradeEvents})
}, 100)

// let limitTableTemplateElement = document.getElementById("limits-table-template")
// let lt = Handlebars.compile(limitTableTemplateElement.innerText);

// let trades = []
// let limits = []

// var chartDataX = []
// var chartDataY = []

// let chartCanvas = document.getElementById("chart")

// let chart = new Chart(chartCanvas, {
//   type: 'line',
//   responsive: true,
//   options: {
//     animation: {
//         duration: 128
//     }
//   },
//   data: {
//   labels: chartDataX,
//   datasets: [{
//     label: 'Close Price',
//     data: chartDataY,
//     fill: false,
//     borderColor: '#ff0000',
//     tension: 0.1
//   }]
// }
// })


// ws.addEventListener("message", (message) => {
//   let parsedMessage = JSON.parse(message.data)

//   if (parsedMessage["event"] == "trade") {
//     // chartDataX.push(parsedMessage["data"]["id"])
//     // chartDataY.push(parsedMessage["data"]["quantity"])

//     // if (chartDataX.length > 100) {
//     //    chart.data.labels.shift();
//     // }

//     // if (chartDataY.length > 99) {
//     //   chartDataY.shift()
//     // }

//     // chart.update();
//     // trades.push(parsedMessage["data"])
//     // if (trades.length > 10) {
//     //   trades.shift();
//     // }
//     // let result = t({trades: trades})
//     // tradesOutlet.innerHTML = result
//   }

//   if (parsedMessage["event"] == "limit") {
//     limits.push(parsedMessage["data"])
//     if (limits.length > 10) {
//       limits.shift();
//     }
//     let result = lt({limits: limits})
//     limitsOutlet.innerHTML = result
//   }
// })

let formTemplate = document.getElementById("order-form")
t = Handlebars.compile(formTemplate.innerText);

// let outlet = document.getElementById("form-outlet")

// outlet.innerHTML = t({})
// outlet.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const formData = new FormData(event.target);

//   let data = {}
//   for(let [name, value] of formData) {
//     if (name == "price" || name == "quantity") {
//       data[name] = parseInt(value)
//     } else {
//       data[name] = value
//     }
//   }

//   socket.sendTrade({
//     price: data["price"],
//     quantity: data["quantity"],
//     side: data["side"],
//   })
// })


