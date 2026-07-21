const express = require('express')
const router = express.Router()
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats
} = require('../controllers/productController')

router.get('/', getProducts)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/stats/dashboard', getDashboardStats)

module.exports = router