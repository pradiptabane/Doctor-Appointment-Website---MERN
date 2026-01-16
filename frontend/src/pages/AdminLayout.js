import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminPanelFull from './AdminPanelFull';

export default function AdminLayout(){
  return (
    <div style={{display:'flex', minHeight:'80vh'}}>
      <aside style={{width:260, background:'#fff', borderRight:'1px solid #eee', padding:16}}>
        <h3>Admin Console</h3>
        <nav style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
          <Link to="/admin">Overview</Link>
          <Link to="/admin?tab=users">Users</Link>
          <Link to="/admin?tab=doctors">Doctors</Link>
          <Link to="/admin?tab=appointments">Appointments</Link>
        </nav>
      </aside>
      <main style={{flex:1, padding:16, background:'#f7f9fc'}}>
        <Outlet />
      </main>
    </div>
  );
}
