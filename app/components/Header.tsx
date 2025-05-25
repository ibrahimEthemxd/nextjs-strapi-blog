'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-green-500 shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Site İsmi */}
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition cursor-pointer">
            İBRAHİM ETHEM ÖZTÜRK
          </h1>
        </Link>

        {/* Arama Kutusu */}
        <div className="w-full max-w-sm flex">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ara
          </button>
        </div>

        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Blog Oluştur
        </Link>
      </div>
    </header>
  );
}

export default Header;
