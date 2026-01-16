import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorProfile from './pages/DoctorProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AdminPanelFull from './pages/AdminPanelFull';
import AdminLayout from './pages/AdminLayout';
import DoctorPanel from './pages/DoctorPanel';
import PatientPanel from './pages/PatientPanel';
import { AuthContext } from './auth/AuthProvider';


function RequireAuth({ allowedRoles, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth allowedRoles={['user', 'admin']}>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/doctorpanel"
            element={
              <RequireAuth allowedRoles={['doctor']}>
                <DoctorPanel />
              </RequireAuth>
            }
          />

          <Route
            path="/patientpanel"
            element={
              <RequireAuth allowedRoles={['user']}>
                <PatientPanel />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/*"
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminPanelFull />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
