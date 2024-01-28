export function OrderForm(props) {
  const submitCallback = ((event) => {
    event.preventDefault()
    console.log(event)
  }).bind(this)

  return(
    <form onSubmit={submitCallback}>
      <div className="row">
        <div className="field-set">
          <label htmlFor="price-input">Price</label>
          <input required id="price-input" name="price" type="number"/>
          €
        </div>
        <div className="field-set">
          <label htmlFor="quantity-input">Quantity</label>
          <input required id="quantity-input" name="quantity" type="number"/>
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
