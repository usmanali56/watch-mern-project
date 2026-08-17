import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const ManageMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null) // kaunsa message khula hua hai

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/contact')
      setMessages(data)
    } catch (error) {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // Message kholte waqt agar unread hai to "read" mark kar dete hain
  const handleExpand = async (message) => {
    const isOpening = expandedId !== message._id
    setExpandedId(isOpening ? message._id : null)

    if (isOpening && !message.isRead) {
      try {
        await API.put(`/contact/${message._id}/read`)
        setMessages((prev) =>
          prev.map((m) => (m._id === message._id ? { ...m, isRead: true } : m))
        )
      } catch (error) {
        console.error('Read mark error:', error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      await API.delete(`/contact/${id}`)
      toast.success('Message deleted')
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  return (
    <div>
      <div className='flex flex-wrap items-center gap-3 mb-4 sm:mb-6'>
        <h1 className='text-xl sm:text-2xl font-medium text-gray-900'>Messages</h1>
        {unreadCount > 0 && (
          <span className='text-xs bg-red-500 text-white px-2.5 py-1 rounded-full'>
            {unreadCount} new
          </span>
        )}
      </div>

      {loading ? (
        <p className='text-gray-500'>Loading...</p>
      ) : messages.length === 0 ? (
        <div className='bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-10 text-center'>
          <p className='text-gray-400'>No messages yet</p>
        </div>
      ) : (
        <div className='space-y-3'>
          {messages.map((message) => (
            <div
              key={message._id}
              className='bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden'
            >
              {/* Header - hamesha dikhta hai, click karne se khulta hai */}
              <button
                onClick={() => handleExpand(message)}
                className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                  {!message.isRead && (
                    <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0' />
                  )}
                  <div className='min-w-0'>
                    <p className={`text-sm truncate ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {message.name} — {message.subject || 'No Subject'}
                    </p>
                    <p className='text-xs text-gray-400 truncate'>{message.email}</p>
                  </div>
                </div>
                <span className='text-xs text-gray-400 flex-shrink-0 sm:ml-3 pl-4 sm:pl-0'>
                  {new Date(message.createdAt).toLocaleDateString()}
                </span>
              </button>

              {/* Expanded content */}
              {expandedId === message._id && (
                <div className='px-3 sm:px-4 pb-4 border-t border-gray-100 pt-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3'>
                    <p className='break-words'><span className='text-gray-400'>Name:</span> {message.name}</p>
                    <p className='break-words'><span className='text-gray-400'>Email:</span> {message.email}</p>
                    {message.phone && <p className='break-words'><span className='text-gray-400'>Phone:</span> {message.phone}</p>}
                    <p className='break-words'><span className='text-gray-400'>Date:</span> {new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                  <p className='text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-wrap break-words mb-3'>
                    {message.message}
                  </p>
                  <button
                    onClick={() => handleDelete(message._id)}
                    className='text-sm text-red-500 hover:underline py-1'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageMessages