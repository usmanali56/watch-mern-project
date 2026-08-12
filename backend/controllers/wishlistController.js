import Wishlist from "../models/Wishlist.js"

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.product")
    if (!wishlist) {
      return res.json({ user: req.user._id, items: [] })
    }
    res.json(wishlist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body
    let wishlist = await Wishlist.findOne({ user: req.user._id })

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [{ product: productId }]
      })
    } else {
      const itemIndex = wishlist.items.findIndex((item) => item.product.toString() === productId)
      if (itemIndex > -1) {
        wishlist.items.splice(itemIndex, 1)
      } else {
        wishlist.items.push({ product: productId })
      }
      await wishlist.save()
    }

    const populatedWishlist = await wishlist.populate("items.product")
    res.status(200).json(populatedWishlist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getWishlist, toggleWishlist }