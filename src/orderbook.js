export default class OrderBook {
  constructor() {
    this.buySide = new Map()
    this.sellSide = new Map()
  }

  processUpdate(orderbookUpdate) {
    let side = null;
    if(orderbookUpdate.side == "buy") {
      side = this.buySide;
    } else {
      side = this.sellSide;
    }

    if (orderbookUpdate.quantity == 0) {
     side.delete(orderbookUpdate.price)
    } else {
      side.set(orderbookUpdate.price, orderbookUpdate)
    }
  }

  buyEntries() {
    let keys = Array.from(this.buySide.keys())

    return keys.sort((a,b) => { return a - b  }).map((key) => {
      return this.buySide.get(key)
    })
  }

  sellEntries() {
    let keys = Array.from(this.sellSide.keys())

    return keys.sort((a,b) => { return a - b  }).map((key) => {
      return this.sellSide.get(key)
    })
  }
}
