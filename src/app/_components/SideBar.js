// components/Sidebar.js
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
}
