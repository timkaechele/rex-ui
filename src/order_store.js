export class OrderStore {
  constructor() {
    this.orders = new Map();
  }

  getOrders() {
    return Array.from(this.orders.values());
  }

  handleOrderCreatedEvent(event) {
    this.orders.set(event.id, event)
  }

  handleOrderCancelledEvent(event) {
    this.orders.delete(event.id)
  }

  handleOrderFillEvent(event) {
    let order = this.orders.get(event.id)
    if (!order) {
      return
    }

    order.remaining_quantity = event.remaining_quantity
    if (order.remaining_quantity == 0) {
      this.orders.delete(event.id)
    } else {
      this.orders.set(event.id, order)
    }
  }
}
