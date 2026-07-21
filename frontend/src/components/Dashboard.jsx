import { useState, useEffect } from 'react'
import API from '../api/axios'
import { Bar } from 'react-chartjs-2'
import { Package, DollarSign, AlertTriangle } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    lowStockCount: 0,
    bills: []
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    const res = await API.get('/products/stats/dashboard')
    setStats(res.data)
    setLoading(false)
  }

  useEffect(() => { fetchStats() }, [])

  const chartData = {
    labels: stats.bills.map((b, i) => `Bill ${i + 1}`),
    datasets: [
      {
        label: 'Sales Amount (₹)',
        data: stats.bills.map((b) => b.total_amount),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(79, 70, 229, 1)'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 800, easing: 'easeOutQuart' }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Package className="text-blue-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <p className="text-3xl font-bold text-gray-800">₹{stats.totalSales}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Low Stock Items</p>
            <p className="text-3xl font-bold text-red-600">{stats.lowStockCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Sales Overview</h2>
        {stats.bills.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-400 text-center py-8">No sales yet — create a bill to see the chart</p>
        )}
      </div>
    </div>
  )
}