export const TAX_RATE = process.env.TAX_RATE || 0
export const FREE_SHIPPING_THRESHOLD =
  process.env.FREE_SHIPPING_THRESHOLD || 5000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 350

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}
export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (cart) {
      return cart
    }
  } catch (err) {}

  return []
}

export const cartSubtotal = (cart) => {
  //Sum up all of the individual product costs
  const subTotal = cart.reduce((counter, product) => {
    return counter + product.price * product.qty
  }, 0)

  return subTotal
}

export const shouldPayShipping = (cart) => {
  const subTotal = cartSubtotal(cart)

  return subTotal < FREE_SHIPPING_THRESHOLD
}

const cartTaxes = (cart) => {
  const subTotal = cartSubtotal(cart)

  return subTotal * Number(TAX_RATE)
}

export const cartTotal = (cart) => {
  if (cart.lenght === 0) {
    return 0
  }

  const subTotal = cartSubtotal(cart)

  const shipping = shouldPayShipping(cart) ? Number(SHIPPING_RATE) : 0

  const total = subTotal + cartTaxes(cart) + shipping

  return Math.round(total)
}

export const totalItemsInCart = (cart) => {
  if (cart.length === 0) {
    return 0
  }
  const total = cart.reduce((counter, product) => {
    return counter + product.qty
  }, 0)

  return total
}
