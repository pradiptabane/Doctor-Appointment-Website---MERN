// import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import "../adminPanel.css";


// export default function AdminPanel(){
//   const [tab, setTab] = useState('doctors');
//   const [doctors, setDoctors] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [appts, setAppts] = useState([]);
//   const [form, setForm] = useState({ name:'', specialty:'', bio:'' });
//   const [slotForm, setSlotForm] = useState({ doctorId:'', date:'', time:'' });

//   const loadDoctors = async () => {
//     try { const res = await API.get('/admin/doctors'); setDoctors(res.data); } catch (err) { console.error(err); }
//   };
//   const loadUsers = async () => {
//     try { const res = await API.get('/admin/users'); setUsers(res.data); } catch (err) { console.error(err); }
//   };
//   const loadAppts = async () => {
//     try { const res = await API.get('/admin/appointments'); setAppts(res.data); } catch (err) { console.error(err); }
//   };

//   useEffect(()=> { if (tab==='doctors') loadDoctors(); if (tab==='users') loadUsers(); if (tab==='appointments') loadAppts(); }, [tab]);

//   const addDoctor = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/doctors', {...form});
//       setForm({ name:'', specialty:'', bio:'' });
//       loadDoctors();
//     } catch (err) { console.error(err); }
//   };

//   const deleteDoctor = async (id) => {
//     if (!confirm('Delete doctor?')) return;
//     try { await API.delete(`/admin/doctors/${id}`); loadDoctors(); } catch (err) { console.error(err); }
//   };

//   const addSlot = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post(`/admin/doctors/${slotForm.doctorId}/slots`, { date: slotForm.date, time: slotForm.time });
//       setSlotForm({ doctorId:'', date:'', time:'' });
//       loadDoctors();
//     } catch (err) { console.error(err); }
//   };

//   const changeRole = async (id, role) => {
//     try { await API.put(`/admin/users/${id}/role`, { role }); loadUsers(); } catch (err) { console.error(err); }
//   };

//   const deleteUser = async (id) => {
//     if (!confirm('Delete user?')) return;
//     try { await API.delete(`/admin/users/${id}`); loadUsers(); } catch (err) { console.error(err); }
//   };

//   const updateApptStatus = async (id, status) => {
//     try { await API.put(`/admin/appointments/${id}/status`, { status }); loadAppts(); } catch (err) { console.error(err); }
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <div style={{display:'flex', gap:12, marginBottom:12}}>
//         <button onClick={()=>setTab('doctors')}>Doctors</button>
//         <button onClick={()=>setTab('appointments')}>Appointments</button>
//         <button onClick={()=>setTab('users')}>Users</button>
//       </div>

//       {tab==='doctors' && (
//         <div>
//           <h3>Add Doctor</h3>
//           <form onSubmit={addDoctor}>
//             <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
//             <input placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form, specialty:e.target.value})}/>
//             <textarea placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})}/>
//             <button>Add Doctor</button>
//           </form>

//           <h3>All doctors</h3>
//           <div className="grid">
//             {doctors.map(d=> (
//               <div key={d._id} className="doc-card">
//                 <div><strong>{d.name}</strong><div>{d.specialty}</div></div>
//                 <div style={{marginTop:8}}>
//                   <button onClick={()=>deleteDoctor(d._id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <h3>Add Slot to Doctor</h3>
//           <form onSubmit={addSlot}>
//             <select value={slotForm.doctorId} onChange={e=>setSlotForm({...slotForm, doctorId:e.target.value})}>
//               <option value="">Select doctor</option>
//               {doctors.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
//             </select>
//             <input placeholder="YYYY-MM-DD" value={slotForm.date} onChange={e=>setSlotForm({...slotForm, date:e.target.value})}/>
//             <input placeholder="HH:MM" value={slotForm.time} onChange={e=>setSlotForm({...slotForm, time:e.target.value})}/>
//             <button>Add Slot</button>
//           </form>
//         </div>
//       )}

//       {tab==='appointments' && (
//         <div>
//           <h3>All Appointments</h3>
//           {appts.map(a=> (
//             <div key={a._id} className="appt-card">
//               <div><strong>{a.doctor?.name}</strong> - {a.patient?.name} - {a.date} {a.time}</div>
//               <div>Status: {a.status}</div>
//               <div style={{marginTop:8}}>
//                 <button onClick={()=>updateApptStatus(a._id, 'completed')}>Mark Completed</button>
//                 <button onClick={()=>updateApptStatus(a._id, 'cancelled')}>Cancel</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {tab==='users' && (
//         <div>
//           <h3>All Users</h3>
//           {users.map(u=> (
//             <div key={u._id} className="doc-card">
//               <div><strong>{u.name}</strong> - {u.email} - Role: {u.role}</div>
//               <div style={{marginTop:8}}>
//                 <select value={u.role} onChange={e=>changeRole(u._id, e.target.value)}>
//                   <option value="user">user</option>
//                   <option value="doctor">doctor</option>
//                   <option value="admin">admin</option>
//                 </select>
//                 <button onClick={()=>deleteUser(u._id)} style={{marginLeft:8}}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import API from '../api/api';
import "../adminPanel.css";

export default function AdminPanel(){
  const [tab, setTab] = useState('doctors');
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appts, setAppts] = useState([]);
  const [form, setForm] = useState({ name:'', specialty:'', bio:'' });
  const [slotForm, setSlotForm] = useState({ doctorId:'', date:'', time:'' });

  const loadDoctors = async () => {
    try { const res = await API.get('/admin/doctors'); setDoctors(res.data || []); } catch (err) { console.error(err); }
  };
  const loadUsers = async () => {
    try { const res = await API.get('/admin/users'); setUsers(res.data || []); } catch (err) { console.error(err); }
  };
  const loadAppts = async () => {
    try { const res = await API.get('/admin/appointments'); setAppts(res.data || []); } catch (err) { console.error(err); }
  };

  useEffect(()=> {
    // load only the active tab data
    if (tab === 'doctors') loadDoctors();
    if (tab === 'users') loadUsers();
    if (tab === 'appointments') loadAppts();
  }, [tab]);

  // initial load for sensible defaults (optional)
  useEffect(()=> {
    loadDoctors();
    loadUsers();
    loadAppts();
  }, []);

  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await API.post('/doctors', {...form});
      setForm({ name:'', specialty:'', bio:'' });
      loadDoctors();
      setTab('doctors');
    } catch (err) { console.error(err); }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm('Delete doctor?')) return;
    try { await API.delete(`/admin/doctors/${id}`); loadDoctors(); } catch (err) { console.error(err); }
  };

  const addSlot = async (e) => {
    e.preventDefault();
    if (!slotForm.doctorId) { alert('Select a doctor'); return; }
    try {
      await API.post(`/admin/doctors/${slotForm.doctorId}/slots`, { date: slotForm.date, time: slotForm.time });
      setSlotForm({ doctorId:'', date:'', time:'' });
      loadDoctors();
    } catch (err) { console.error(err); }
  };

  const changeRole = async (id, role) => {
    try { await API.put(`/admin/users/${id}/role`, { role }); loadUsers(); } catch (err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try { await API.delete(`/admin/users/${id}`); loadUsers(); } catch (err) { console.error(err); }
  };

  const updateApptStatus = async (id, status) => {
    try { await API.put(`/admin/appointments/${id}/status`, { status }); loadAppts(); } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <h1>Admin Console</h1>

          <div className="admin-tabs" role="tablist" aria-label="Admin sections">
            <button className={`admin-tab ${tab==='doctors'?'active':''}`} onClick={()=>setTab('doctors')}>Doctors</button>
            <button className={`admin-tab ${tab==='appointments'?'active':''}`} onClick={()=>setTab('appointments')}>Appointments</button>
            <button className={`admin-tab ${tab==='users'?'active':''}`} onClick={()=>setTab('users')}>Users</button>
          </div>
        </div>

        {/* ===== Doctors Tab ===== */}
        {tab==='doctors' && (
          <>
            <div className="section-grid">
              <div className="panel">
                <h3 className="panel-title">Add Doctor</h3>
                <form className="form" onSubmit={addDoctor}>
                  <input className="field" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
                  <input className="field" placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form, specialty:e.target.value})}/>
                  <textarea className="field" placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})}/>
                  <div style={{display:'flex', gap:10}}>
                    <button className="btn btn-primary" type="submit">Add Doctor</button>
                    <button type="button" className="btn btn-ghost" onClick={()=>setForm({ name:'', specialty:'', bio:'' })}>Reset</button>
                  </div>
                </form>
              </div>

              <div className="panel">
                <h3 className="panel-title">Add Slot to Doctor</h3>
                <form className="form-inline" onSubmit={addSlot}>
                  <select className="field select" value={slotForm.doctorId} onChange={e=>setSlotForm({...slotForm, doctorId:e.target.value})}>
                    <option value="">— Select doctor —</option>
                    {doctors.map(d=> <option key={d._id} value={d._id}>{d.name} ({d.specialty})</option>)}
                  </select>
                  <input className="field" placeholder="YYYY-MM-DD" value={slotForm.date} onChange={e=>setSlotForm({...slotForm, date:e.target.value})}/>
                  <input className="field" placeholder="HH:MM" value={slotForm.time} onChange={e=>setSlotForm({...slotForm, time:e.target.value})}/>
                  <button className="btn btn-primary" type="submit">Add Slot</button>
                </form>
              </div>
            </div>

            <h3 className="section-title">All Doctors</h3>
            <div className="doc-grid">
              {doctors.length===0 && <div className="admin-empty">No doctors found</div>}
              {doctors.map(d=> (
                <div key={d._id} className="doc-card">
                  <div>
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-specialty">{d.specialty}</div>
                    <div className="doc-bio">{d.bio}</div>
                  </div>
                  <div className="doc-actions">
                    <button className="action-btn action-edit" onClick={()=>{ setForm({ name:d.name, specialty:d.specialty, bio:d.bio }); window.scrollTo({top:0, behavior:'smooth'}); }}>Edit</button>
                    <button className="action-btn action-delete" onClick={()=>deleteDoctor(d._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== Appointments Tab ===== */}
        {tab==='appointments' && (
          <>
            <h3 className="section-title">All Appointments</h3>
            {appts.length===0 && <div className="admin-empty">No appointments found</div>}
            <div className="appt-list">
              {appts.map(a=> (
                <div key={a._id} className="appt-card">
                  <div className="appt-left">
                    <div className="appt-main"><strong>{a.doctor?.name || '—'}</strong> — {a.patient?.name || '—'}</div>
                    <div className="appt-sub">{a.date} {a.time}</div>
                  </div>

                  <div className="appt-right">
                    <div className={`appt-status ${a.status}`}>Status: {a.status}</div>
                    <button className="btn mark-btn" onClick={()=>updateApptStatus(a._id, 'completed')}>Mark Completed</button>
                    <button className="btn cancel-btn" onClick={()=>updateApptStatus(a._id, 'cancelled')}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== Users Tab ===== */}
        {tab==='users' && (
          <>
            <h3 className="section-title">All Users</h3>
            <div className="doc-grid">
              {users.length===0 && <div className="admin-empty">No users found</div>}
              {users.map(u=> (
                <div key={u._id} className="doc-card">
                  <div>
                    <div className="doc-name">{u.name}</div>
                    <div className="doc-specialty">{u.email}</div>
                    <div className="doc-bio">Role: <strong>{u.role}</strong></div>
                  </div>
                  <div className="doc-actions">
                    <select className="field small-select" value={u.role} onChange={e=>changeRole(u._id, e.target.value)}>
                      <option value="user">user</option>
                      <option value="doctor">doctor</option>
                      <option value="admin">admin</option>
                    </select>
                    <button className="action-btn action-delete" onClick={()=>deleteUser(u._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
