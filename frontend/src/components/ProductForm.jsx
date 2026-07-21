import { useState, useEffect } from 'react'
import API from '../api/axios'

export default function ProductForm({ editingProduct, onSaved }) {
  const [form, setForm] = useState({ name: '', price: '', quantity: '', low_stock_threshold: 5 })

  useEffect(() => {
    if (editingProduct) setForm(editingProduct)
    else setForm({ name: '', price: '', quantity: '', low_stock_threshold: 5 })
  }, [editingProduct])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) await API.put(`/products/${editingProduct.id}`, form)
      else await API.post('/products', form)
      setForm({ name: '', price: '', quantity: '', low_stock_threshold: 5 })
      onSaved()
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert('Error: ' + JSON.stringify(err.response?.data || err.message))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-md mb-6 flex gap-4 flex-wrap items-end border border-gray-100">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">NAME</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Product name"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">PRICE</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          step="0.01"
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">QUANTITY</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">LOW STOCK ALERT</label>
        <input
          type="number"
          name="low_stock_threshold"
          value={form.low_stock_threshold}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
      >
        {editingProduct ? 'Update' : 'Add'} Product
      </button>
    </form>
  )
}