import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useCart } from '../../context/CartContext'
import API from '../../api/axios'

// Ye component sirf Card payment ke waqt dikhta hai (jab clientSecret mil chuka ho)
const StripePaymentForm = ({ orderId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { fetchCart } = useCart()
  const navigate = useNavigate()

  const [processing, setProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return // Stripe abhi load nahi hua

    setProcessing(true)
    setErrorMsg('')

    // Stripe ko payment confirm karne ko kehte hain (card details Stripe khud securely handle karta hai)
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // agar 3D-secure na chahiye ho to yahin rok dega, redirect nahi karega
    })

    if (error) {
      setErrorMsg(error.message)
      setProcessing(false)
      return
    }

    // Payment successful - ab apne backend ko batate hain ke order confirm kar de
    try {
      await API.post('/orders/confirm-payment', { orderId })
      await fetchCart()
      navigate('/order-success', { state: { orderId } })
    } catch (err) {
      setErrorMsg('Payment was successful, but there was an issue confirming your order. Please contact support.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handlePayment}>
      <h2 className='text-lg font-medium mb-4'>Card Details</h2>

      {/* Stripe ka built-in secure card input - khud hi number/expiry/cvc sab handle karta hai */}
      <div className='border border-gray-200 rounded-md p-4 mb-4'>
        <PaymentElement />
      </div>

      {errorMsg && <p className='text-red-500 text-sm mb-4'>{errorMsg}</p>}

      <button
        type='submit'
        disabled={!stripe || processing}
        className='w-full bg-gray-900 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50'
      >
        {processing ? 'Processing Payment...' : 'Pay Now'}
      </button>
    </form>
  )
}

export default StripePaymentForm