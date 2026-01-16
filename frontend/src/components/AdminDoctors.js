import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminDoctors(){
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name:'', specialty:'', bio:'' });
  const [q, setQ] = useState('');

  const load = async () => {
    try { const res = await API.get('/admin/doctors'); setDoctors(res.data); } catch (err) { console.error(err); }
  };
  useEffect(()=> { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try { await API.post('/doctors', form); setForm({ name:'', specialty:'', bio:'' }); load(); } catch (err) { console.error(err); }
  };
  const remove = async (id) => {
    if (!confirm('Delete doctor?')) return;
    try { await API.delete(`/admin/doctors/${id}`); load(); } catch (err) { console.error(err); }
  };
  const addSlot = async (id) => {
    const date = prompt('Date (YYYY-MM-DD)'); if (!date) return;
    const time = prompt('Time (HH:MM)'); if (!time) return;
    try { await API.post(`/admin/doctors/${id}/slots`, { date, time }); load(); } catch (err) { console.error(err); }
  };

  const filtered = doctors.filter(d => (d.name||'').toLowerCase().includes(q.toLowerCase()) || (d.specialty||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h3>Doctors ({doctors.length})</h3>
      <div style={{marginTop:8, marginBottom:12}}>
        <input placeholder="Search doctors" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <form onSubmit={add} style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form, specialty:e.target.value})} />
        <input placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
        <div></div><button style={{gridColumn:'span 2'}}>Add Doctor</button>
      </form>

      <div className="grid">
        {filtered.map(d=> (
          <div key={d._id} className="doc-card">
            <div>
              <strong>{d.name}</strong><div style={{fontSize:13}}>{d.specialty}</div>
              <div style={{marginTop:6, fontSize:13}}>{d.bio}</div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              <button onClick={()=>addSlot(d._id)}>Add Slot</button>
              <button onClick={()=>remove(d._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
