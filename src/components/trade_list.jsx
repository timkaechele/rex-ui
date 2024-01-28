export default function TradeList(props) {
  return(
    <article>
      <h1>Trades</h1>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.trades.map((trade) => {
            return(
              <tr key={trade.id}>
                <td>{trade.quantity}</td>
                <td>{trade.price} €</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </article>
  )
}
