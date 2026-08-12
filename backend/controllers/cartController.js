import Cart from "../models/Cart.js"

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    if (!cart) {
      return res.json({ user: req.user._id, items: [] })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      })
    } else {
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({ product: productId, quantity })
      }
      await cart.save()
    }

    const populatedCart = await cart.populate("items.product")
    res.status(200).json(populatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: "cart not found" })

    const item = cart.items.find((item) => item.product.toString() === productId)
    if (!item) return res.status(404).json({ message: "Item not found in the cart" })

    item.quantity = quantity
    await cart.save()

    const populatedCart = await cart.populate("items.product")
    res.json(populatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: "cart not found" })

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)
    await cart.save()

    const populatedCart = await cart.populate("items.product")
    res.json(populatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getCart, addToCart, updateCartItem, removeFromCart }