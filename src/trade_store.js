export class TradeStore {
  constructor(maxBacklog) {
    this.maxBacklog = maxBacklog
    this.trades = [];
  }

  getTrades() {
    return this.trades
  }

  handleTradeEvent(event) {
    this.trades.push(event)

    if (this.trades.length > this.maxBacklog) {
      this.trades.shift();
    }
  }
}
