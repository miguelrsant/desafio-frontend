import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-10">
      <section
        className="
          w-full
          max-w-xl
          rounded-3xl
          bg-white
          p-10
          text-center
          shadow-lg
          dark:bg-zinc-900
        "
      >
        <h1 className="text-7xl font-bold text-cyan-500">404</h1>

        <h2 className="mt-5 text-3xl font-bold text-zinc-900 dark:text-white">
          Página não encontrada
        </h2>

        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Parece que essa página se perdeu em algum universo do Rick and Morty.
        </p>

        <Link
          to="/"
          className="
            mt-8
            inline-flex
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-cyan-600
          "
        >
          Voltar para Home
        </Link>
      </section>
    </main>
  );
}
