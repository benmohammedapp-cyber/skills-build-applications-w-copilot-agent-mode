import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { name: 'Users', path: '/users' },
  { name: 'Teams', path: '/teams' },
  { name: 'Activities', path: '/activities' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Workouts', path: '/workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto flex-row gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-light text-dark' : 'text-white-50'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="alert alert-info mb-4">
          <strong>API config:</strong> VITE_CODESPACE_NAME must be defined in <code>.env.local</code> for Codespaces.
          If it is unset, the app falls back to <code>http://localhost:8000</code>.
          {codespaceName ? (
            <div className="mt-2">
              Active base URL: <code>https://{codespaceName}-8000.app.github.dev</code>
            </div>
          ) : null}
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
