import { createRoot } from 'react-dom/client';
import AppLayout from './components/app_layout';
import WebsocketConnection from './ws';
import { getUserId } from './user_id_store';
import { OrderStore } from './order_store';
import { TradeStore } from './trade_store';
import { PriceStore } from './price_store';
import OrderBook from './order_book';

let socket = new WebsocketConnection({url: "ws://localhost:8080"})
window.socket = socket;
socket.connect()
socket.authenticate(getUserId())

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

let orderStore = new OrderStore();
let orderBook = new OrderBook();
let tradeStore = new TradeStore(50);
let priceStore = new PriceStore(50);

const render = () => {
  root.render(AppLayout({
    trades: tradeStore.getTrades(),
    orders: orderStore.getOrders(),
    orderBook: {
      buy: orderBook.buyEntries(),
      sell: orderBook.sellEntries(),
    },
    prices: {
      labels: priceStore.getLabels(),
      prices: priceStore.getPrices()
    }
  }));
}

socket.setHandler("OrderCreatedEvent", (event) => {
  orderStore.handleOrderCreatedEvent(event.data)
})

socket.setHandler("OrderFillEvent", (event) => {
  orderStore.handleOrderFillEvent(event.data)
})

socket.setHandler("OrderCancelledEvent", (event) => {
  orderStore.handleOrderCancelledEvent(event.data)
})

socket.setHandler("TradeEvent", (event) => {
  priceStore.handleTradeEvent(event.data)
  tradeStore.handleTradeEvent(event.data)
})

socket.setHandler("OrderBookUpdateEvent", (event) => {
  orderBook.processUpdate(event.data)
  render()
})

render()



