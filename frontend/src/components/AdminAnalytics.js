import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminAnalytics(){
  const [counts, setCounts] = useState({ users:0, doctors:0, appointments:0, booked:0 });

  useEffect(()=>{
    (async ()=>{
      try {
        const u = await API.get('/admin/users');
        const d = await API.get('/admin/doctors');
        const a = await API.get('/admin/appointments');
        const booked = a.data.filter(x => x.status==='booked').length;
        setCounts({ users: u.data.length, doctors: d.data.length, appointments: a.data.length, booked });
      } catch (err) { console.error(err); }
    })();
  },[]);

  return (
    <div>
      <h3>Overview</h3>
      <div style={{display:'flex', gap:12}}>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>Users: <strong>{counts.users}</strong></div>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>Doctors: <strong>{counts.doctors}</strong></div>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>Appointments: <strong>{counts.appointments}</strong></div>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>Booked now: <strong>{counts.booked}</strong></div>
      </div>
      <p style={{marginTop:12}}>Charts and deeper analytics can be plugged in (e.g., Recharts).</p>
    </div>
  );
}
