import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const emptyForm = {
  name: '',
  price: '',
  image: '',
  category: 'Watches',
  stock: '',
  description: '',
}

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)

    try {
      const { data } = await API.get('/products')
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const openAddForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setImagePreview('')
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      description: product.description || '',
    })

    setEditingId(product._id)
    setImageFile(null)
    setImagePreview(product.image)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!editingId && !imageFile) {
      toast.error('Select product image')
      return
    }

    setSubmitting(true)

    try {
      let imageUrl = form.image

      if (imageFile) {
        setUploading(true)

        const formData = new FormData()
        formData.append('image', imageFile)

        const uploadRes = await API.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        imageUrl = uploadRes.data.imageUrl
        setUploading(false)
      }

      const payload = {
        ...form,
        image: imageUrl,
        price: Number(form.price),
        stock: Number(form.stock),
      }

      if (editingId) {
        await API.put(`/products/${editingId}`, payload)
        toast.success('Product has been updated')
      } else {
        await API.post('/products', payload)
        toast.success('Product has been added')
      }

      setShowForm(false)
      fetchProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this product?'
      )
    )
      return

    try {
      await API.delete(`/products/${id}`)
      toast.success('Product has been deleted ')
      fetchProducts()
    } catch (error) {
      toast.error('Delete nahi hua')
    }
  }

  return (
    <div className='w-full'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6'>
        <h1 className='text-xl sm:text-2xl font-medium text-gray-900'>
          Manage Products
        </h1>

        <button
          onClick={openAddForm}
          className='w-full sm:w-auto bg-gray-900 text-white text-sm px-5 sm:px-6 py-2.5 rounded-sm hover:bg-gray-800 transition-colors'
        >
          + Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4'>

          <div className='bg-white rounded-md p-4 sm:p-6 w-full max-w-lg max-h-[92vh] overflow-y-auto'>

            <h2 className='text-lg font-medium mb-4'>
              {editingId
                ? 'Edit Product '
                : 'Add new product'}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>

              {/* Name */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Name *
                </label>

                <input
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                  className='w-full border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 text-sm outline-none focus:border-gray-400'
                />
              </div>

              {/* Price */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Price ($) *
                </label>

                <input
                  name='price'
                  type='number'
                  value={form.price}
                  onChange={handleChange}
                  required
                  min='0'
                  className='w-full border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 text-sm outline-none focus:border-gray-400'
                />
              </div>

              {/* Image */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Product Image *
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md mb-2 border border-gray-200'
                  />
                )}

                <input
                  type='file'
                  accept='image/jpeg,image/jpg,image/png,image/webp,image/gif'
                  onChange={handleImageSelect}
                  className='w-full border border-gray-200 rounded-md px-2 sm:px-4 py-2.5 text-xs sm:text-sm file:mr-2 sm:file:mr-3 file:py-1.5 file:px-3 sm:file:px-4 file:rounded file:border-0 file:bg-gray-900 file:text-white file:text-xs file:cursor-pointer'
                />

                <p className='text-xs text-gray-400 mt-1'>
                  JPG, PNG ya WEBP. Max 5MB.
                </p>
              </div>

              {/* Category */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Category
                </label>

                <input
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className='w-full border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 text-sm outline-none focus:border-gray-400'
                />
              </div>

              {/* Stock */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Stock *
                </label>

                <input
                  name='stock'
                  type='number'
                  value={form.stock}
                  onChange={handleChange}
                  required
                  min='0'
                  className='w-full border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 text-sm outline-none focus:border-gray-400'
                />
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Description
                </label>

                <textarea
                  name='description'
                  value={form.description}
                  onChange={handleChange}
                  rows='3'
                  className='w-full border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 text-sm outline-none focus:border-gray-400 resize-none'
                />
              </div>

              {/* Buttons */}
              <div className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2'>

                <button
                  type='button'
                  onClick={() => setShowForm(false)}
                  className='w-full sm:w-auto sm:px-6 py-2.5 text-sm border border-gray-300 rounded-sm hover:bg-gray-50'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={submitting}
                  className='flex-1 bg-gray-900 text-white text-sm px-6 py-2.5 rounded-sm hover:bg-gray-800 disabled:opacity-50'
                >
                  {uploading
                    ? 'Image Uploading...'
                    : submitting
                    ? 'Saving...'
                    : editingId
                    ? 'Update'
                    : 'Add '}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <p className='text-gray-500 text-sm'>Loading...</p>
      ) : (
        <div className='bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden'>

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[650px] text-left'>

              <thead>
                <tr className='border-b border-gray-200 text-xs uppercase text-gray-500'>
                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Image
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Name
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Price
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Stock
                  </th>

                  <th className='py-3 px-3 sm:px-4 whitespace-nowrap'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className='border-b border-gray-100'
                  >

                    <td className='py-3 px-3 sm:px-4'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded'
                      />
                    </td>

                    <td className='py-3 px-3 sm:px-4 text-sm font-medium max-w-[180px] truncate'>
                      {product.name}
                    </td>

                    <td className='py-3 px-3 sm:px-4 text-sm whitespace-nowrap'>
                      ${product.price}
                    </td>

                    <td className='py-3 px-3 sm:px-4 text-sm'>
                      {product.stock}
                    </td>

                    <td className='py-3 px-3 sm:px-4'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => openEditForm(product)}
                          className='text-sm text-blue-600 hover:underline'
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className='text-sm text-red-500 hover:underline'
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {products.length === 0 && (
            <p className='text-center text-gray-400 py-10 px-4 text-sm'>
              No products have been added yet.
            </p>
          )}

        </div>
      )}
    </div>
  )
}

export default ManageProducts