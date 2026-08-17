import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '../../context/CartContext'
import API from '../../api/axios'
import StripePaymentForm from './StripePaymentForm'

// Stripe ko sirf ek hi baar load karna hai (component ke bahar rakhte hain taake baar baar na ho)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Checkout = () => {
  const { cart, fetchCart } = useCart()
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('COD') // 'COD' ya 'Card'
  const [submitting, setSubmitting] = useState(false)
  const [clientSecret, setClientSecret] = useState(null) // Card payment ke liye Stripe se milega
  const [orderId, setOrderId] = useState(null)

  // Kabhi kabhi koi product delete ho jata hai lekin cart mein uska purana reference reh jata hai
  // Aise items (jinka product null hai) ko yahan hata dete hain taake app crash na ho
  const items = (cart.items || []).filter((item) => item.product)

  // Total amount calculate karna
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  // Order create karne ka function - COD aur Card dono ke liye
  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (items.length === 0) {
      alert('Your cart is Empty ')
      return
    }

    setSubmitting(true)
    try {
      // Cart ke items ko order ke format mein convert karte hain
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }))

      const { data } = await API.post('/orders', {
        items: orderItems,
        shippingAddress,
        totalAmount,
        paymentMethod,
      })

      if (paymentMethod === 'COD') {
        // COD hai to order seedha ban gaya, cart context ko refresh karo aur success page pe bhejo
        await fetchCart()
        navigate('/order-success', { state: { orderId: data.order._id } })
      } else {
        // Card hai to Stripe ka form dikhana hai - clientSecret save kar lete hain
        setClientSecret(data.clientSecret)
        setOrderId(data.order._id)
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Order place karne mein masla hua')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='px-4 md:px-10 py-6 mt-10 max-w-4xl mx-auto'>
      {/* Breadcrumb */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-2 sm:gap-0'>
        <h1 className='uppercase text-lg sm:text-xl md:text-2xl'>Checkout</h1>
        <nav className='flex justify-between gap-3 sm:gap-5 text-sm sm:text-base'>
          <Link to='/'>Home</Link>
          <span>/</span>
          <Link to='/cart'>Cart</Link>
          <span>/</span>
          <span className='text-gray-500'>Checkout</span>
        </nav>
      </div>

      {items.length === 0 ? (
        <p className='text-center text-gray-500 py-10'>Empty cart </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Left side - Shipping form + payment */}
          <div>
            {/* Agar clientSecret mil chuka hai to Stripe card form dikhao, warna shipping form */}
            {!clientSecret ? (
              <form onSubmit={handlePlaceOrder}>
                <h2 className='text-lg font-medium mb-4'>Shipping Address</h2>

                <div className='mb-4'>
                  <label className='block text-sm text-gray-500 mb-1'>Full Name *</label>
                  <input
                    name='fullName'
                    value={shippingAddress.fullName}
                    onChange={handleAddressChange}
                    required
                    className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm text-gray-500 mb-1'>Phone Number *</label>
                  <input
                    name='phone'
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    required
                    className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm text-gray-500 mb-1'>Address *</label>
                  <input
                    name='address'
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    required
                    className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
                  />
                </div>

                <div className='mb-6'>
                  <label className='block text-sm text-gray-500 mb-1'>City *</label>
                  <input
                    name='city'
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                    className='w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
                  />
                </div>

                <h2 className='text-lg font-medium mb-4'>Payment Method</h2>

                <div className='mb-6 space-y-3'>
                  <label className='flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='COD'
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className='text-sm'>Cash on Delivery</span>
                  </label>

                  <label className='flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Card'
                      checked={paymentMethod === 'Card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className='text-sm'>Credit / Debit Card</span>
                  </label>
                </div>

                <button
                  type='submit'
                  disabled={submitting}
                  className='w-full bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50'
                >
                  {submitting
                    ? 'Processing...'
                    : paymentMethod === 'COD'
                    ? 'Place Order (COD)'
                    : 'Continue to Payment'}
                </button>
              </form>
            ) : (
              // Stripe ka card form - alag component mein (kyunke Elements wrapper chahiye)
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm orderId={orderId} />
              </Elements>
            )}
          </div>

          {/* Right side - Order summary */}
          <div className='bg-gray-50 p-6 h-fit'>
            <h2 className='text-lg font-medium mb-4'>Order Summary</h2>
            {items.map((item) => (
              <div key={item.product._id} className='flex justify-between text-sm py-2 border-b border-gray-200'>
                <span>
                  {item.product.name} <span className='text-gray-400'>x{item.quantity}</span>
                </span>
                <span>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className='flex justify-between font-medium text-base pt-4'>
              <span>Total</span>
              <span>${totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout