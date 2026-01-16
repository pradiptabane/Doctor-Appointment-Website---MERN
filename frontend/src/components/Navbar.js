import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => { logout(); nav('/'); };

  return (
    <nav className="nav">
      <div className="logo"><Link to="/">Prescripto</Link></div>
      <div className="links">
        <Link to="/doctors">Doctors</Link>
        {user ? (
          <>
            <Link to="/dashboard">My Appointments</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {user.role === 'doctor' && <Link to="/doctorpanel">Doctor Panel</Link>}
            <span className="user-pill">{user.name} ({user.role})</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
