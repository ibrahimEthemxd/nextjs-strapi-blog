import Link from "next/link";
import { FaGithub, FaLinkedin, FaGlobe, FaStore } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 text-gray-700 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kişisel */}
        <div>
          <h3 className="text-lg font-semibold mb-2">İbrahim Ethem Öztürk</h3>
          <p className="text-sm">Bilgisayar Mühendisi, Frontend Developer</p>
          <p className="text-sm">Blog, portföy ve projelerimi burada bulabilirsiniz.</p>
        </div>

        {/* Linkler */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Bağlantılar</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/posts" className="hover:underline">Blog</Link>
            </li>
            <li>
              <a href="https://iethem.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Kişisel Websitem
              </a>
            </li>
            <li>
              <a href="https://shop.iethem.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                E-Ticaret Sitem
              </a>
            </li>
          </ul>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Sosyal Medya</h4>
          <div className="flex items-center gap-4 text-xl">
            <a href="mailto:ibrhm8581@gmail.com" title="Mail">
              <MdEmail className="hover:text-blue-600 transition" />
            </a>
            <a href="https://github.com/ibrahimEthemxd" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FaGithub className="hover:text-gray-900 transition" />
            </a>
            <a href="https://linkedin.com/in/ibrahim-ethem-öztürk-7399a429a/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin className="hover:text-blue-700 transition" />
            </a>
            <a href="https://iethem.com" target="_blank" rel="noopener noreferrer" title="Website">
              <FaGlobe className="hover:text-green-600 transition" />
            </a>
            <a href="https://shop.iethem.com" target="_blank" rel="noopener noreferrer" title="Shop">
              <FaStore className="hover:text-purple-600 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="text-center text-sm text-gray-500 py-4 border-t">
        © 2025 İbrahim Ethem Öztürk – Tüm Hakları Saklıdır
      </div>
    </footer>
  );
}
