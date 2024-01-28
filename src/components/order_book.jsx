export default function OrderBook(props) {
  const buyLimits = props.buyLimits;
  const sellLimits = props.sellLimits;
  return(
    <div className="flex orderbook">
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
                <td>{limit.price}</td>
                <td>{limit.quantity}</td>
              </tr>
              );
          })}
        </tbody>
      </table>
      <table className="sell-table">
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
                <td>{limit.price}</td>
                <td>{limit.quantity}</td>
              </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  )
}
