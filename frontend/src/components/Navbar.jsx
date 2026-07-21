import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Receipt } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/billing', label: 'Billing', icon: Receipt },
  ]

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <span className="font-bold text-xl tracking-tight flex items-center gap-2">
          📦 Inventory & Billing
        </span>
        <div className="flex gap-2">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-white text-indigo-700 shadow-md font-semibold'
                    : 'hover:bg-white/20 text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}