import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="mt-5 pt-2 px-0">
        <Outlet />
      </main>
    </>
  );
}
