const supabase = require('../config/supabaseClient')

exports.getProducts = async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

exports.addProduct = async (req, res) => {
  const { name, price, quantity, low_stock_threshold } = req.body
  console.log('Received body:', req.body)
  const { data, error } = await supabase.from('products').insert([{ name, price, quantity, low_stock_threshold }]).select()
  if (error) {
    console.log('Supabase error:', error)
    return res.status(500).json({ error: error.message })
  }
  res.status(201).json(data[0])
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, price, quantity, low_stock_threshold } = req.body
  const { data, error } = await supabase.from('products').update({ name, price, quantity, low_stock_threshold }).eq('id', id).select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Product deleted' })
}

exports.getDashboardStats = async (req, res) => {
  try {
    const { data: products, error: productError } = await supabase.from('products').select('*')
    if (productError) throw productError

    const { data: bills, error: billError } = await supabase.from('bills').select('*')
    if (billError) throw billError

    const totalProducts = products.length
    const totalSales = bills.reduce((sum, b) => sum + Number(b.total_amount), 0)
    const lowStockCount = products.filter(p => p.quantity <= p.low_stock_threshold).length

    res.json({
      totalProducts,
      totalSales,
      lowStockCount,
      bills
    })
  } catch (err) {
    console.log('Dashboard error:', err)
    res.status(500).json({ error: err.message })
  }
}