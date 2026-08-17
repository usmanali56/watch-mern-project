import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const ManageOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)

    try {
      const { data } = await API.get('/orders')
      setOrders(data)
    } catch (error) {
      toast.error('Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        orderStatus: newStatus,
      })

      toast.success('Order status update ')

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      )
    } catch (error) {
      toast.error('Status update nahi hua')
    }
  }

  const statusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'Shipped':
        return 'bg-blue-100 text-blue-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className='w-full'>

      {/* Heading */}
      <h1 className='text-xl sm:text-2xl font-medium text-gray-900 mb-5 sm:mb-6'>
        Manage Orders
      </h1>

      {loading ? (
        <p className='text-gray-500 text-sm'>
          Loading...
        </p>
      ) : (
        <div className='bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden'>

          {/* Responsive Table */}
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[800px] text-left'>

              <thead>
                <tr className='border-b border-gray-200 text-xs uppercase text-gray-500'>
                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Customer
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Items
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Total
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Payment
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className='border-b border-gray-100 align-top'
                  >

                    {/* Customer */}
                    <td className='py-3 px-3 sm:px-4 text-sm'>
                      <p className='font-medium whitespace-nowrap'>
                        {order.user?.name}
                      </p>

                      <p className='text-gray-400 text-xs break-all max-w-[180px]'>
                        {order.user?.email}
                      </p>

                      <p className='text-gray-400 text-xs mt-1'>
                        {order.shippingAddress?.phone}
                      </p>
                    </td>

                    {/* Items */}
                    <td className='py-3 px-3 sm:px-4 text-sm'>
                      {order.items.map((item, i) => (
                        <p
                          key={i}
                          className='text-gray-600 whitespace-nowrap'
                        >
                          {item.product?.name || 'Product deleted'} x
                          {item.quantity}
                        </p>
                      ))}
                    </td>

                    {/* Total */}
                    <td className='py-3 px-3 sm:px-4 text-sm font-medium whitespace-nowrap'>
                      ${order.totalAmount}
                    </td>

                    {/* Payment */}
                    <td className='py-3 px-3 sm:px-4 text-sm'>
                      <p className='whitespace-nowrap'>
                        {order.paymentMethod}
                      </p>

                      <span
                        className={`inline-block text-xs px-2 py-0.5 mt-1 rounded-full whitespace-nowrap ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Status */}
                    <td className='py-3 px-3 sm:px-4'>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer outline-none ${statusColor(
                          order.orderStatus
                        )}`}
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <p className='text-center text-gray-400 py-10 px-4 text-sm'>
            No orders have been received yet.
            </p>
          )}

        </div>
      )}
    </div>
  )
}

export default ManageOrders