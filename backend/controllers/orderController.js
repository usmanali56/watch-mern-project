import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import stripe from "../config/stripe.js"

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod } = req.body

    if (!["COD", "Card"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Wrong payment method" })
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: "Pending",
    })

    if (paymentMethod === "COD") {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
      return res.status(201).json({ message: "Cash on delivery", order })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
      metadata: { orderId: order._id.toString() }
    })

    order.stripePaymentIntentId = paymentIntent.id
    await order.save()

    res.status(201).json({ message: "Card payment", order, clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const confirmCardPayment = async (req, res) => {
  try {
    const { orderId } = req.body
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ message: "order not found" })

    const paymentIntent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId)

    if (paymentIntent.status === "succeeded") {
      order.paymentStatus = "Paid"
      await order.save()
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
      return res.json({ message: "payment complete", order })
    }

    order.paymentStatus = "Failed"
    await order.save()
    res.status(400).json({ message: "Payment fail" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product").sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true })
    if (!order) return res.status(404).json({ message: "Order not found" })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { createOrder, confirmCardPayment, getMyOrders, getAllOrders, updateOrderStatus }