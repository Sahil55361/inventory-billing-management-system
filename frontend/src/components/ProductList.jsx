import { Pencil, Trash2 } from 'lucide-react'

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase">
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-400">No products yet — add one above</td>
            </tr>
          )}
          {products.map((p) => (
            <tr key={p.id} className="border-t border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150">
              <td className="p-4 font-medium text-gray-800">{p.name}</td>
              <td className="p-4 text-gray-600">₹{p.price}</td>
              <td className="p-4 text-gray-600">{p.quantity}</td>
              <td className="p-4">
                {p.quantity <= p.low_stock_threshold ? (
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Low Stock</span>
                ) : (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">In Stock</span>
                )}
              </td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-white p-2 rounded-lg transition-all duration-150"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 active:scale-95 text-white p-2 rounded-lg transition-all duration-150"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}