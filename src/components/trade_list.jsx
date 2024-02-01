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
          {props.trades.toReversed().map((trade) => {
            return(
              <tr key={trade.id}>
                <td class="text-end">{trade.quantity}</td>
                <td class="text-end">{trade.price} €</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </article>
  )
}
