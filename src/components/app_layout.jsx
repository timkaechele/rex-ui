import  TradeList from './trade_list'
import { OrderForm } from './order_form'
import OrderBook from './order_book'
import OrderView from './order_view'
import PriceChart from './price_chart'

export default function AppLayout(props) {
  return(
    <div className="grid">
      <div className="left-sidebar">
        <OrderBook buyLimits={props.orderBook.buy} sellLimits={props.orderBook.sell}/>
      </div>
      <div className="center-top">
        <PriceChart labels={props.prices.labels} data={props.prices.prices}/>
      </div>
      <div className="center-bottom">
        <OrderForm />
        <OrderView orders={props.orders}/>
      </div>
      <div className="right-sidebar">
        <TradeList trades={props.trades}/>
      </div>
    </div>
  )
}
