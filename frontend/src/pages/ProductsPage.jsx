import { useState, useEffect } from 'react'
import API from '../api/axios'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  const fetchProducts = async () => {
    const res = await API.get('/products')
    setProducts(res.data)
  }

  useEffect(() => { fetchProducts() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await API.delete(`/products/${id}`)
    fetchProducts()
  }

  const handleSaved = () => {
    setEditingProduct(null)
    fetchProducts()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h1>
      <ProductForm editingProduct={editingProduct} onSaved={handleSaved} />
      <ProductList products={products} onEdit={(p) => setEditingProduct(p)} onDelete={handleDelete} />
    </div>
  )
}