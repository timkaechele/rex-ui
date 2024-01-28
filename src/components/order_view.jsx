
const fillState = (order) => {
  return ((order.quantity - order.remaining_quantity) / order.quantity) * 100;
}

export default function OrderView(props) {
  const orders = props.orders || []

  return(
    <table>
      <thead>
        <tr>
          <th>Limit</th>
          <th>Side</th>
          <th>Quantity</th>
          <th>Remaining Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return(
            <tr key={order.id}>
              <td>{order.price}</td>
              <td>{order.side}</td>
              <td>{order.quantity}</td>
              <td>{order.remaining_quantity}</td>

            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
