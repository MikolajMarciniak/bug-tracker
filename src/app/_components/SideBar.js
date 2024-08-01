import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar" role="banner">
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </aside>
  );
}
