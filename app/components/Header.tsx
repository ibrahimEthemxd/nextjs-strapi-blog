import Link  from 'next/link'

function Header() {
  return (
    <header className="bg-green-500 shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Site İsmi */}
        <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
          <h1>İBRAHİM ETHEM ÖZTÜRK</h1>
        </Link>

        {/* Arama Kutusu */}
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Ara..."
            className=" w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled // şimdilik sadece görsel amaçlı
          />
        </div>
         <Link
        href="/create"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Blog Oluştur
      </Link>
      </div>
    </header>
  )
}

export default Header
