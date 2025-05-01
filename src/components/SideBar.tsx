import React from "react";
import Link from "next/link";

interface SideBarProps {
  isMobile?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isMobile = false }) => {
  return (
    <aside
      role="complementary"
      className={`w-64 bg-gray-100 p-4 ${isMobile ? "hidden" : ""}`}
    >
      <nav role="navigation">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
