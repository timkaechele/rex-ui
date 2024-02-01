export function OrderForm(props) {
  const socket = window.socket;

  const submitCallback = ((event) => {
    event.preventDefault()

    const formData = new FormData(event.target);
    const price = parseInt(formData.get("price"))
    const quantity = parseInt(formData.get("quantity"))
    const side = formData.get("side")
    event.target.reset();
    socket.sendTrade({
      price,
      quantity,
      side
    })
  }).bind(this)

  return(
    <form class="order-form" onSubmit={submitCallback}>
      <div className="row">
        <div className="field-set">
          <label htmlFor="price-input">Price</label>
          <input required id="price-input" name="price" type="number"/>
        </div>
        <div className="field-set">
          <label htmlFor="quantity-input">Quantity</label>
          <input required id="quantity-input" name="quantity" min="0" type="number"/>
        </div>
        <div className="field-set">
          <label htmlFor="side-input">Side</label>
          <select name="side" id="side-input">
            <option value="buy">BUY</option>
            <option value="sell">SELL</option>
          </select>
        </div>
        <div className="field-set">
          <input type="submit" value="Create Order"/>
        </div>
      </div>
    </form>
  )
}
