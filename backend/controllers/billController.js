const supabase = require('../config/supabaseClient')

exports.createBill = async (req, res) => {
  const { items } = req.body // items = [{ product_id, quantity, price }]

  try {
    const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // 1. Create bill
    const { data: bill, error: billError } = await supabase
      .from('bills')
      .insert([{ total_amount }])
      .select()

    if (billError) throw billError

    const billId = bill[0].id

    // 2. Insert bill items
    const billItems = items.map((item) => ({
      bill_id: billId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase.from('bill_items').insert(billItems)
    if (itemsError) throw itemsError

    // 3. Reduce stock for each product
    for (const item of items) {
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('quantity')
        .eq('id', item.product_id)
        .single()

      if (fetchError) throw fetchError

      const newQty = product.quantity - item.quantity

      const { error: updateError } = await supabase
        .from('products')
        .update({ quantity: newQty })
        .eq('id', item.product_id)

      if (updateError) throw updateError
    }

    res.status(201).json({ message: 'Bill created', bill_id: billId, total_amount })
  } catch (err) {
    console.log('Billing error:', err)
    res.status(500).json({ error: err.message })
  }
}

exports.getBills = async (req, res) => {
  const { data, error } = await supabase.from('bills').select('*').order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}