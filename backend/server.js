const express = require('express')
const cors = require('cors')
require('dotenv').config()

const productRoutes = require('./routes/productRoutes')
const billRoutes = require('./routes/billRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/products', productRoutes)
app.use('/api/bills', billRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))