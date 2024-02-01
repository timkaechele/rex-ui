import { createRoot } from 'react-dom/client';
import AppLayout from './components/app_layout';
import WebsocketConnection from './ws';
import { getUserId } from './user_id_store';
import { OrderStore } from './order_store';
import { TradeStore } from './trade_store';
import { PriceStore } from './price_store';
import OrderBook from './order_book';

let socket = new WebsocketConnection({url: "wss://rex.timkaechele.me/ws"})
window.socket = socket;

socket.connect()
socket.authenticate(getUserId())
socket.fetchOrderBook()
socket.fetchOrders()
socket.fetchTrades()

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

let orderStore = new OrderStore();
let orderBook = new OrderBook();
let tradeStore = new TradeStore(30);
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



const handleOrderCreationEvent = (event) => {
  orderStore.handleOrderCreatedEvent(event.data)
  render()
}

socket.setHandler("OrderCreatedEvent", handleOrderCreationEvent)
socket.setHandler("OrderFetchEvent", handleOrderCreationEvent)

socket.setHandler("OrderFillEvent", (event) => {
  orderStore.handleOrderFillEvent(event.data)
  render()
})

socket.setHandler("OrderCancelledEvent", (event) => {
  orderStore.handleOrderCancelledEvent(event.data)
  render()
})

const handleTradeEvent = (event) => {
  priceStore.handleTradeEvent(event.data)
  tradeStore.handleTradeEvent(event.data)
  render()
}

socket.setHandler("TradeEvent", handleTradeEvent)
socket.setHandler("TradeFetchEvent", handleTradeEvent)

const orderBookUpdateHandler = (event) => {
  orderBook.processUpdate(event.data)
  render()
}

socket.setHandler("OrderBookUpdateEvent", orderBookUpdateHandler)
socket.setHandler("OrderBookFetchEvent", orderBookUpdateHandler)

render()



