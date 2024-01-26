export default class WebsocketConnection {
  constructor(config) {
    this.config = config
    this.requestId = 0
    this.connected = false
    this.handleMessage = this.handleMessage.bind(this)
    this.messageQueue= []
    this.handlers = {}
  }

  handleMessage(message) {
    const rawData = message.data
    const data = JSON.parse(rawData)

    const handler = this.handlers[data["name"]]

    if (handler !== undefined && handler !== null) {
      handler(data)
    }

    console.log(data)
  }

  setHandler(eventName, handler) {
    this.handlers[eventName] = handler
  }

  connect() {
    this.websocket = new WebSocket(this.config.url);
    this.websocket.onopen = () => {
      this.connected = true;
      this.flushMessageQueue();
    }

    this.websocket.onmessage = this.handleMessage

    this.onclose = function() {
      this.connected = false
    }
  }

  authenticate(userId) {
    let authRequest = {
      request_id: this.nextRequestId(),
      type: "request",
      name: "authenticate",
      args: {
        user_id: userId
      },
    }

    this.sendMessage(authRequest)
  }

  sendTrade(tradeData) {
    const tradeRequest = {
      type: "request",
      request_id: this.nextRequestId(),
      name: "order.create",
      args: {
        price: tradeData.price,
        quantity: tradeData.quantity,
        side: tradeData.side
      }
    }

    this.websocket.send(JSON.stringify(tradeRequest));
  }

  flushMessageQueue() {
    let i = 0
    while(this.messageQueue.length != 0) {
      console.log(i)
      i++;
      let message = this.messageQueue.shift()
      this.websocket.send(message)
    }
  }

  sendMessage(obj) {
    const serializedMessage = JSON.stringify(obj);

    if (this.connected) {
      this.websocket.send(serializedMessage);
    } else {
      // Hold the message till we are connected again
      this.messageQueue.push(serializedMessage)
    }
  }

  nextRequestId() {
    this.requestId += 1;
    return this.requestId;
  }
}
