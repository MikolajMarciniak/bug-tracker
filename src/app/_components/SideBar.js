import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar" role="banner">
      <ul>
        <li>
          <a href="/projects">Dashboard</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </aside>
  );
}
