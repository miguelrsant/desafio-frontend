import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

export default function DefaultLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-zinc-100
        text-zinc-900
        transition-colors
        duration-300
        dark:bg-zinc-950
        dark:text-white
      "
    >
      <Header />

      <Outlet />
    </div>
  );
}
