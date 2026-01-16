import React, { useState } from 'react';
import AdminUsers from '../components/AdminUsers';
import AdminDoctors from '../components/AdminDoctors';
import AdminAppointments from '../components/AdminAppointments';
import AdminAnalytics from '../components/AdminAnalytics';
import "../adminPanel.css";


export default function AdminPanelFull(){
  const [tab, setTab] = useState('dashboard');
  return (
    <div>
      <h2>Admin Console</h2>
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        <button onClick={()=>setTab('dashboard')}>Dashboard</button>
        <button onClick={()=>setTab('users')}>Users</button>
        <button onClick={()=>setTab('doctors')}>Doctors</button>
        <button onClick={()=>setTab('appointments')}>Appointments</button>
      </div>
      <div>
        {tab==='dashboard' && <AdminAnalytics />}
        {tab==='users' && <AdminUsers />}
        {tab==='doctors' && <AdminDoctors />}
        {tab==='appointments' && <AdminAppointments />}
      </div>
    </div>
  );
}
