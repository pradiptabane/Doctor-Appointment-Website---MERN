// import React, { useState, useContext } from 'react';
// import API from '../api/api';
// import { AuthContext } from '../auth/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// export default function Signup(){
//   const [form, setForm] = useState({ name:'', email: '', password: '' });
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [err, setErr] = useState('');

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/register', form);
//       login(res.data.token, res.data.user);
//       nav('/dashboard');
//     } catch (err) {
//       setErr(err.response?.data?.msg || 'Error signing up');
//     }
//   };

//   return (
//     <div className="auth-card">
//       <h3>Sign up</h3>
//       <form onSubmit={submit}>
//         <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" />
//         <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
//         <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" type="password" />
//         <button type="submit">Create account</button>
//       </form>
//       {err && <p className="err">{err}</p>}
//     </div>
//   );
// }


// at top of file
import React, { useState } from 'react';
import API from '../api/api';
import '../signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      setMsg('Account created — please login.');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page-wrap">
      <div className="signup-card">
        <h2>Sign up</h2>
        <p className="lead">Create an account to book appointments</p>

        <form onSubmit={submit}>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" />
          <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" />
          <button className="btn-primary" type="submit">Create account</button>
        </form>

        {msg && <div className={`msg ${msg.includes('failed') ? 'err' : 'ok'}`}>{msg}</div>}

        <div className="card-foot">
          <div className="small">Already have an account?</div>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
