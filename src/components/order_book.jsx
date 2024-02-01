export default function OrderBook(props) {
  const buyLimits = props.buyLimits;
  const sellLimits = props.sellLimits;
  return(
    <article>
      <h1>Order book</h1>
      <section>
        <h1>Buy</h1>
        <table className="buy-table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {buyLimits.map((limit) => {
              return (
                <tr key={limit.price}>
                  <td class="text-end">{limit.price}</td>
                  <td class="text-end">{limit.quantity}</td>
                </tr>
                );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <h1>Sell</h1>
        <table className="buy-table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sellLimits.map((limit) => {
              return (
                <tr key={limit.price}>
                  <td class="text-end">{limit.price}</td>
                  <td class="text-end">{limit.quantity}</td>
                </tr>
                );
            })}
          </tbody>
        </table>
      </section>
    </article>
  )
}
