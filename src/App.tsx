import { useEffect, useState } from 'react'
import { useStore } from './store'
import { useTelegram } from './useTelegram'

function App() {
  const tg = useTelegram()
  const { items, history, loading, error, fetchItems, fetchHistory } = useStore()
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    fetchItems()
    fetchHistory()
  }, [fetchItems, fetchHistory])

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>

  return (
    <div className="p-4">
      {tg && (
        <div className="mb-4 text-sm text-gray-500">
          Hello, {tg.initDataUnsafe?.user?.username ?? 'guest'}
        </div>
      )}
      <button
        onClick={() => setShowHistory((h) => !h)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showHistory ? 'Show catalogue' : 'Show history'}
      </button>
      {showHistory ? (
        <div className="grid gap-4">
          {history.map((h) => (
            <div key={h.id} className="border rounded p-4">
              <div>Order #{h.id}</div>
              <div className="text-sm text-gray-500">
                {new Date(h.timestamp * 1000).toLocaleDateString()}
              </div>
              <div className="text-sm font-medium">
                {h.total} {h.currency}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4 flex gap-4 items-center"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{item.price} NOT</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
