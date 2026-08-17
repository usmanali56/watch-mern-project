import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const ManageNewsletter = () => {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/newsletter')
      setSubscribers(data)
    } catch (error) {
      toast.error('Failed to load subscribers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) return

    try {
      await API.delete(`/newsletter/${id}`)
      toast.success('Subscriber removed')
      setSubscribers((prev) => prev.filter((s) => s._id !== id))
    } catch (error) {
      toast.error('Failed to remove')
    }
  }

  // Sab emails ko ek sath copy karne ke liye (bulk email bhejne ke kaam aata hai)
  const handleCopyAll = () => {
    const emails = subscribers.map((s) => s.email).join(', ')
    navigator.clipboard.writeText(emails)
    toast.success('All emails copied to clipboard')
  }

  return (
    <div>
      {/* Header - mobile par stack, tablet/laptop par side by side */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6'>
        <div className='flex items-center gap-3'>
          <h1 className='text-xl sm:text-2xl font-medium text-gray-900'>Newsletter Subscribers</h1>
          <span className='text-xs bg-gray-900 text-white px-2.5 py-1 rounded-full flex-shrink-0'>
            {subscribers.length}
          </span>
        </div>

        {subscribers.length > 0 && (
          <button
            onClick={handleCopyAll}
            className='text-sm border border-gray-300 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-50 self-start sm:self-auto'
          >
            Copy All Emails
          </button>
        )}
      </div>

      {loading ? (
        <p className='text-gray-500'>Loading...</p>
      ) : subscribers.length === 0 ? (
        <div className='bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-10 text-center'>
          <p className='text-gray-400'>No subscribers yet</p>
        </div>
      ) : (
        <>
          {/* Desktop/Tablet - normal table */}
          <div className='hidden sm:block bg-white rounded-md shadow-sm border border-gray-100 overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='border-b border-gray-200 text-xs uppercase text-gray-500'>
                  <th className='py-3 px-4'>Email</th>
                  <th className='py-3 px-4'>Subscribed On</th>
                  <th className='py-3 px-4'></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub._id} className='border-b border-gray-100'>
                    <td className='py-3 px-4 text-sm break-all'>{sub.email}</td>
                    <td className='py-3 px-4 text-sm text-gray-500 whitespace-nowrap'>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className='py-3 px-4'>
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className='text-sm text-red-500 hover:underline'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile - card list (table mobile par squeeze hoti hai, isliye alag layout) */}
          <div className='sm:hidden space-y-2'>
            {subscribers.map((sub) => (
              <div
                key={sub._id}
                className='bg-white rounded-md shadow-sm border border-gray-100 p-3 flex items-center justify-between gap-3'
              >
                <div className='min-w-0'>
                  <p className='text-sm break-all'>{sub.email}</p>
                  <p className='text-xs text-gray-400 mt-0.5'>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className='text-sm text-red-500 hover:underline flex-shrink-0 py-1'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ManageNewsletter