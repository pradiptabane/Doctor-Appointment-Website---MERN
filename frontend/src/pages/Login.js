// import React, { useState, useContext } from 'react';
// import API from '../api/api';
// import { AuthContext } from '../auth/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import "../login.css";


// // Demo credentials (seeded)
// const DEMO = {
//   admin: { email: 'admin@prescripto.com', password: 'adminpass' },
//   doctor: { email: 'dr.sarah@prescripto.com', password: 'doctorpass' },
//   patient: { email: 'john@patient.com', password: 'patientpass' }
// };

// export default function Login(){
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [roleChoice, setRoleChoice] = useState('custom');
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [err, setErr] = useState('');

//   const onRoleChange = (r) => {
//     setRoleChoice(r);
//     if (r === 'custom') {
//       setForm({ email: '', password: '' });
//     } else {
//       const demo = DEMO[r];
//       setForm({ email: demo.email, password: demo.password });
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/login', form);
//       login(res.data.token, res.data.user);
//       // redirect based on role
//       if (res.data.user.role === 'admin') nav('/admin');
//       else if (res.data.user.role === 'doctor') nav('/doctorpanel');
//       else nav('/patientpanel');
//     } catch (err) {
//       setErr(err.response?.data?.msg || 'Error logging in');
//     }
//   };

//   return (
//     <div className="auth-card">
//       <h3>Login</h3>

//       <label style={{display:'block', marginBottom:8}}>Quick demo login</label>
//       <select value={roleChoice} onChange={e=>onRoleChange(e.target.value)} style={{width:'100%', marginBottom:12, padding:8}}>
//         <option value="custom">Custom (enter your email/password)</option>
//         <option value="patient">Patient (demo)</option>
//         <option value="doctor">Doctor (demo)</option>
//         <option value="admin">Admin (demo)</option>
//       </select>

//       <form onSubmit={submit}>
//         <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
//         <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" type="password" />
//         <button type="submit">Login</button>
//       </form>

//       <div style={{marginTop:10, fontSize:13}}>
//         <strong>Demo accounts:</strong>
//         <ul>
//           <li>Admin: admin@prescripto.com / adminpass</li>
//           <li>Doctor: dr.sarah@prescripto.com / doctorpass</li>
//           <li>Patient: john@patient.com / patientpass</li>
//         </ul>
//       </div>

//       {err && <p className="err">{err}</p>}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import API from "../api/api";
// import "../login.css"; // <-- make sure path is correct

// export default function Login() {
//   const [demo, setDemo] = useState("custom");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // Handle quick demo selection
//   const handleDemoChange = (value) => {
//     setDemo(value);

//     if (value === "admin") {
//       setEmail("admin@prescripto.com");
//       setPassword("adminpass");
//     } else if (value === "doctor") {
//       setEmail("dr.sarah@prescripto.com");
//       setPassword("doctorpass");
//     } else if (value === "patient") {
//       setEmail("john@patient.com");
//       setPassword("patientpass");
//     } else {
//       setEmail("");
//       setPassword("");
//     }
//   };

//   // Perform login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/auth/login", { email, password });

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Redirect based on role
//       if (res.data.role === "admin") window.location.href = "/admin";
//       else if (res.data.role === "doctor") window.location.href = "/doctor";
//       else if (res.data.role === "patient") window.location.href = "/patient";
//       else window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       setError("Invalid login credentials");
//     }
//   };

//   return (
//     <div className="login-page-wrap">
//       <div className="login-card">
//         <h2>Login</h2>
//         <p className="lead">Quick demo login</p>

//         {/* Demo Dropdown */}
//         <select
//           className="select"
//           value={demo}
//           onChange={(e) => handleDemoChange(e.target.value)}
//         >
//           <option value="custom">Custom (enter your email/password)</option>
//           <option value="admin">Admin</option>
//           <option value="doctor">Doctor</option>
//           <option value="patient">Patient</option>
//         </select>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             autoComplete="off"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             autoComplete="off"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && (
//             <div style={{ color: "#ff7a93", marginBottom: "8px" }}>
//               {error}
//             </div>
//           )}

//           <button type="submit" className="btn-primary">
//             Login
//           </button>
//         </form>

//         {/* Demo Accounts */}
//         <div className="demo-list">
//           <b>Demo accounts:</b>
//           <ul>
//             <li>Admin: admin@prescripto.com / adminpass</li>
//             <li>Doctor: dr.sarah@prescripto.com / doctorpass</li>
//             <li>Patient: john@patient.com / patientpass</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../login.css";

// Demo credentials (seeded)
const DEMO = {
  admin: { email: "admin@prescripto.com", password: "adminpass" },
  doctor: { email: "dr.sarah@prescripto.com", password: "doctorpass" },
  patient: { email: "john@patient.com", password: "patientpass" },
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [roleChoice, setRoleChoice] = useState("custom");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext); // may be undefined if provider not present
  const nav = useNavigate();

  const onRoleChange = (r) => {
    setRoleChoice(r);
    if (r === "custom") {
      setForm({ email: "", password: "" });
    } else {
      const demo = DEMO[r];
      setForm({ email: demo.email, password: demo.password });
    }
  };

  const finishLogin = (token, user) => {
    // Save token and user
    if (token) {
      localStorage.setItem("token", token);
      if (API && API.defaults) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (user) {
      try { localStorage.setItem("user", JSON.stringify(user)); } catch (e) {}
    }

    // Prefer using AuthContext.login if available (keeps previous app behavior)
    if (auth && typeof auth.login === "function") {
      try { auth.login(token, user); } catch (e) { console.warn("AuthContext.login failed:", e); }
    }

    // route based on role (try commonly used paths)
    const role = user?.role || user?.roleName || user?.type || null;
    if (role === "admin") return nav("/admin");
    if (role === "doctor") {
      // some apps use /doctorpanel or /doctor
      if (window.location.pathname.startsWith("/doctorpanel")) return nav("/doctorpanel");
      return nav("/doctorpanel");
    }
    if (role === "patient") return nav("/patientpanel");

    // fallback: try / (home) or fetch /auth/me then route
    nav("/");
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // POST login
      const res = await API.post("/auth/login", form);
      console.log("login response:", res);

      // handle different response shapes
      const data = res.data || {};
      const token =
        data.token ||
        data.accessToken ||
        data.authToken ||
        data.data?.token ||
        data.data?.accessToken ||
        null;

      // user object detection
      const user =
        data.user || data.data?.user || data || null;

      if (!token && data?.user && data?.user?.token) {
        // sometimes token nested
        finishLogin(data.user.token, data.user);
        return;
      }

      if (!token) {
        // try if server returned full session in a different key
        console.warn("No token found in login response:", data);
        setErr("Login succeeded but server did not return a token. Check server response.");
        setLoading(false);
        return;
      }

      finishLogin(token, user);
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        "Error logging in";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrap">
      <div className="login-card">
        <h2>Login</h2>
        <p className="lead">Quick demo login</p>

        <select
          className="select"
          value={roleChoice}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="custom">Custom (enter your email/password)</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        <form onSubmit={submit}>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            type="email"
            required
          />
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            type="password"
            required
          />

          {err && <div style={{ color: "#ff7a93", marginBottom: 8 }}>{err}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <div className="demo-list">
          <strong>Demo accounts:</strong>
          <ul>
            <li>Admin: admin@prescripto.com / adminpass</li>
            <li>Doctor: dr.sarah@prescripto.com / doctorpass</li>
            <li>Patient: john@patient.com / patientpass</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
