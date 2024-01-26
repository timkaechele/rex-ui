// const Handlebars = require("handlebars");
//import Chart from 'chart.js/auto';
import WebsocketConnection from './ws';
import OrderBook from './orderbook';
import React from 'react';
const getUserId = () => {
  let storedUserId = localStorage.getItem("auth.user_id")
  if (storedUserId) {
    return storedUserId
  }

  let userId = crypto.randomUUID();
  localStorage.setItem("auth.user_id", userId);

  return userId;
}

let socket = new WebsocketConnection({url: "ws://localhost:8080"})
window.socket = socket;
socket.connect()
socket.authenticate(getUserId())

// let trades = []

// socket.setHandler("TradeEvent", (message) => {
//   let data = message.data
//   trades.push(data)

//   if (trades.length > 10) {
//     trades.shift();
//   }

//   let tradeTableTemplateElement = document.getElementById("trades-list")
//   let t = Handlebars.compile(tradeTableTemplateElement.innerText)
//   const tradesOutlet = document.getElementById("trades")
//   tradesOutlet.innerHTML = t({trades: trades})
// })

// let orders = new Map()

// const renderOrders = (orders) => {
//   let tradeTableTemplateElement = document.getElementById("orders-list")
//   let t = Handlebars.compile(tradeTableTemplateElement.innerText)
//   const tradesOutlet = document.getElementById("orders")

//   tradesOutlet.innerHTML = t({orders: orders})

// }

// socket.setHandler("OrderCreatedEvent", (message) => {
//   const attributes = message.data;

//   orders.set(attributes["id"], attributes)

//   renderOrders(Array.from(orders.values()))
// });

// socket.setHandler("OrderFillEvent", (message) => {
//   const attributes = message.data;

//   if (!orders.has(attributes["id"])) {
//     return;
//   }

//   const order = orders.get(attributes["id"])
//   order["remaining_quantity"] = attributes["remaining_quantity"]

//   if (order.remaining_quantity == 0) {
//     orders.delete(order.id)
//   } else {
//     orders.set(attributes["id"], order)
//   }


//   renderOrders(Array.from(orders.values()))
// });

// let orderbook = new OrderBook();

// socket.setHandler("OrderBookUpdateEvent", (message) => {
//   const attributes = message.data;

//   orderbook.processUpdate(attributes)

//    let tradeTableTemplateElement = document.getElementById("orderbook-view")
//   let t = Handlebars.compile(tradeTableTemplateElement.innerText)
//   const tradesOutlet = document.getElementById("order-book")
//   tradesOutlet.innerHTML = t({
//     buy: orderbook.buyEntries(),
//     sell: orderbook.sellEntries(),
//   })
// });

// let formTemplate = document.getElementById("order-form")
// t = Handlebars.compile(formTemplate.innerText);

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

import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

function TradeList(props) {
  // TODO: Actually implement a navigation bar
  return <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.trades.map((trade) => {
            return <tr>
              <td>{trade.quantity}</td>
              <td>{trade.price} €</td>
            </tr>
          })}
        </tbody>
      </table>
}

// Render your React component instead
const root = createRoot(document.getElementById('app'));

root.render(TradeList({trades: [{quantity: 100 , price: 120}]}))

