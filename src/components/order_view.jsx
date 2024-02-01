const fillState = (order) => {
  return ((order.quantity - order.remaining_quantity) / order.quantity) * 100;
}

export default function OrderView(props) {
  const socket = window.socket;
  const orders = props.orders || []

  const cancelOrder = ((event, orderId) => {
    socket.sendCancelOrder(orderId)
  }).bind(this)

  return(
    <table>
      <thead>
        <tr>
          <th>Limit</th>
          <th>Side</th>
          <th>Quantity</th>
          <th>Remaining Quantity</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return(
            <tr key={order.id}>
              <td class="text-end">{order.price}</td>
              <td class="text-center">{order.side}</td>
              <td class="text-end">{order.quantity}</td>
              <td class="text-end">{order.remaining_quantity}</td>
              <td><button onClick={(event) => { cancelOrder(event, order.id) }}>Cancel</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
