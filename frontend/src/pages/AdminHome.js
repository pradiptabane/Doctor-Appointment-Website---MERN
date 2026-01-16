import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminHome(){
  const [counts, setCounts] = useState({ users:0, doctors:0, appointments:0 });

  useEffect(()=>{
    (async ()=>{
      try {
        const u = await API.get('/admin/users');
        const d = await API.get('/admin/doctors');
        const a = await API.get('/admin/appointments');
        setCounts({ users: u.data.length, doctors: d.data.length, appointments: a.data.length });
      } catch (err) { console.error(err); }
    })();
  },[]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{display:'flex',gap:12}}>
        <div style={{background:'#fff',padding:16,borderRadius:8}}>Users: <strong>{counts.users}</strong></div>
        <div style={{background:'#fff',padding:16,borderRadius:8}}>Doctors: <strong>{counts.doctors}</strong></div>
        <div style={{background:'#fff',padding:16,borderRadius:8}}>Appointments: <strong>{counts.appointments}</strong></div>
      </div>
    </div>
  );
}
