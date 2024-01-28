export class PriceStore {
  constructor(historyRetention) {
    this.historyRetention = historyRetention
    this.counter = 0
    this.labels = []
    this.prices = []
  }

  handleTradeEvent(event) {
    this.counter = this.counter + 1;
    this.labels.push(this.counter)
    this.prices.push(event.price)

    if (this.labels.length > this.historyRetention + 1) {
      this.labels.shift()
    }

    if (this.prices.length > this.historyRetention ) {
      this.prices.shift()
    }
  }

  getLabels() {
    return this.labels;
  }

  getPrices() {
    return this.prices;
  }
}
