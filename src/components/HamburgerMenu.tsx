"use client";

import React from "react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onToggle,
  className = "",
}) => {
  return (
    <button
      aria-label="Toggle Menu"
      onClick={onToggle}
      className={`pl-1 flex flex-col z-50 items-center justify-center space-y-1 w-auto h-auto mr-1 transition-all duration-500 ease-in-out transform ${className}`}
    >
      <div
        className={`bg-[--text] h-1 w-6 transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <div
        className={`bg-[--text] h-1 w-6 transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <div
        className={`bg-[--text] h-1 w-6 transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
