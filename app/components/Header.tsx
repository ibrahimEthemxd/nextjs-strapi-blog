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
    <header className="bg-orange-700 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold text-white hover:text-blue-200 transform hover:-translate-scale-0.5 transition duration-500 cursor-pointer">
            İBRAHİM ETHEM ÖZTÜRK
          </h1>
        </Link>

        <div className="w-full max-w-sm flex">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-0 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
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
