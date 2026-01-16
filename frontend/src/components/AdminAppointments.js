import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminAppointments(){
  const [appts, setAppts] = useState([]);
  const [q, setQ] = useState('');

  const load = async () => {
    try { const res = await API.get('/admin/appointments'); setAppts(res.data); } catch (err) { console.error(err); }
  };
  useEffect(()=> { load(); }, []);

  const changeStatus = async (id, status) => {
    try { await API.put(`/admin/appointments/${id}/status`, { status }); load(); } catch (err) { console.error(err); }
  };

  const filtered = appts.filter(a => (a.doctor?.name||'').toLowerCase().includes(q.toLowerCase()) || (a.patient?.name||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h3>Appointments ({appts.length})</h3>
      <div style={{marginBottom:12}}>
        <input placeholder="Search by doctor or patient" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div>
        {filtered.map(a=> (
          <div key={a._id} className="appt-card">
            <div><strong>{a.doctor?.name}</strong> — {a.patient?.name} — {a.date} {a.time}</div>
            <div>Status: {a.status}</div>
            <div style={{marginTop:8}}>
              <button onClick={()=>changeStatus(a._id, 'completed')}>Complete</button>
              <button onClick={()=>changeStatus(a._id, 'cancelled')}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
