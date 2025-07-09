"use client";

import React from "react";
import HamburgerMenu from "./HamburgerMenu";

interface NavbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
}) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center px-4 z-50"
      role="banner"
    >
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3 w-48">
        <HamburgerMenu isOpen={!sidebarCollapsed} onToggle={onToggleSidebar} />
        <span className="text-xl font-bold text-[var(--primary)]">LOGO</span>
      </div>

      {/* Center: Search bar */}
      <div className="flex-grow max-w-2xl px-4">
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search"
          className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 w-48 justify-end text-[var(--text-muted)]">
        <button aria-label="Settings" className="hover:text-[var(--primary)]">
          ⚙️
        </button>
        <button
          aria-label="Notifications"
          className="hover:text-[var(--primary)]"
        >
          🔔
        </button>
        <button
          aria-label="Account"
          className="hover:text-[var(--primary)] w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"
        >
          A
        </button>
      </div>
    </header>
  );
};

export default Navbar;
