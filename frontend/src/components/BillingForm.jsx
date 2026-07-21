import { useState, useEffect } from 'react'
import API from '../api/axios'

export default function BillingForm({ onBillCreated }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [qty, setQty] = useState(1)

  const fetchProducts = async () => {
    const res = await API.get('/products')
    setProducts(res.data)
  }

  useEffect(() => { fetchProducts() }, [])

  const addToCart = () => {
    if (!selectedProduct) return
    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return
    if (qty > product.quantity) {
      alert('Not enough stock')
      return
    }

    setCart([...cart, {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: Number(qty)
    }])
    setSelectedProduct('')
    setQty(1)
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty')
    try {
      await API.post('/bills', { items: cart })
      alert('Bill created successfully!')
      setCart([])
      fetchProducts()
      onBillCreated()
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert('Error: ' + JSON.stringify(err.response?.data || err.message))
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex gap-4 items-end mb-6 flex-wrap">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">PRODUCT</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition min-w-[220px]"
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">QUANTITY</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <button
          onClick={addToCart}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
        >
          + Add to Cart
        </button>
      </div>

      {cart.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-gray-100 mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase">
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-indigo-50/50 transition-colors">
                  <td className="p-3 font-medium text-gray-800">{item.name}</td>
                  <td className="p-3 text-gray-600">₹{item.price}</td>
                  <td className="p-3 text-gray-600">{item.quantity}</td>
                  <td className="p-3 font-semibold text-gray-800">₹{item.price * item.quantity}</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeFromCart(i)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cart.length === 0 && (
        <p className="text-gray-400 text-center py-8">Cart is empty — add products above</p>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-2xl font-bold text-gray-800">Total: ₹{total}</span>
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}