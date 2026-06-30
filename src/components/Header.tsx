import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../assets/Logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { dark, toggleTheme } = useTheme();

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-zinc-200
        bg-white/80
        backdrop-blur-xl
        dark:border-zinc-800
        dark:bg-zinc-950/80
      "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white
                shadow-lg
                ring-1
                ring-zinc-200
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl

                dark:bg-zinc-800
                dark:ring-zinc-700
            "
          >
            <img
              src={Logo}
              alt="Rick and Morty"
              className="
                h-10
                w-10
                object-contain
                "
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              Rick & Morty
            </h1>

            <p className="text-xs text-zinc-500">Explorer</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="
              font-medium
              text-zinc-700
              transition
              hover:text-cyan-500
              dark:text-zinc-300
            "
          >
            Home
          </Link>

          <button
            onClick={toggleTheme}
            className="
              rounded-xl
              bg-zinc-200
              p-2
              transition
              hover:scale-110
              dark:bg-zinc-800
            "
          >
            {dark ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? (
            <X className="dark:text-white" />
          ) : (
            <Menu className="dark:text-white" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          className="
            border-t
            border-zinc-200
            bg-white
            dark:border-zinc-800
            dark:bg-zinc-950
            md:hidden
          "
        >
          <div className="flex flex-col gap-4 p-6">
            <Link to="/" className="dark:text-white">
              Home
            </Link>

            <button
              onClick={toggleTheme}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-zinc-200
                px-4
                py-2
                dark:bg-zinc-800
                dark:text-white
              "
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}

              {dark ? 'Modo Claro' : 'Modo Escuro'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
