import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../patientPanel.css'; // <-- make sure this file exists

export default function PatientPanel(){
  const [profile, setProfile] = useState(null);
  const [appts, setAppts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', medicalHistory:'', password:'' });

  const load = async () => {
    try {
      const p = await API.get('/auth/me');
      setProfile(p.data);
      setForm({
        name: p.data.name || '',
        phone: p.data.phone || '',
        medicalHistory: p.data.medicalHistory || '',
        password: ''
      });
      const a = await API.get('/appointments/my');
      setAppts(a.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(()=> { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await API.put('/auth/me', form);
      setEditing(false);
      load();
    } catch (err) { console.error(err); }
  };

  const cancelAppt = async (id) => {
    try {
      await API.post(`/appointments/cancel/${id}`);
      load();
    } catch (err) { console.error(err); }
  };

  // small helper to show date/time cleanly if needed
  const formatDateTime = (dateStr, timeStr) => {
    // if date/time already combined or formatted, return as-is
    if (!dateStr && !timeStr) return '';
    return `${dateStr || ''}${timeStr ? ` ${timeStr}` : ''}`;
  };

  return (
    <div className="patient-panel-wrapper">
      <h2>Patient Panel</h2>

      {profile && (
        <div className="patient-profile-card">
          <div style={{display:'flex', gap:20, alignItems:'flex-start', width:'100%'}}>
            <div style={{minWidth:92}}>
              <div className="avatar-initial" style={{width:92, height:92, fontSize:34}}>
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'P'}
              </div>
            </div>

            <div style={{flex:1}}>
              <h3 style={{margin:0}}>{profile.name}</h3>
              <p style={{marginTop:8, marginBottom:6, color:'var(--muted)'}}>{profile.email}</p>
              <p style={{margin:6}}>Phone: {profile.phone || '—'}</p>
              <p style={{margin:6}}>Medical history: {profile.medicalHistory || '—'}</p>

              {!editing ? (
                <div style={{marginTop:10}}>
                  <button className="link-btn" onClick={()=>setEditing(true)}>Edit</button>
                </div>
              ) : (
                <form onSubmit={save} style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
                  <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
                  <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
                  <textarea value={form.medicalHistory} onChange={e=>setForm({...form, medicalHistory:e.target.value})} placeholder="Medical history" />
                  <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="New password (leave blank)" />
                  <div style={{display:'flex', gap:10, marginTop:6}}>
                    <button type="submit" className="btn">Save</button>
                    <button type="button" className="link-btn" onClick={()=>{ setEditing(false); setForm({ name: profile.name || '', phone: profile.phone || '', medicalHistory: profile.medicalHistory || '', password: '' }); }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="patient-section-title">My Appointments</div>

      <div className="patient-appointments-list">
        {appts.length===0 && <p style={{color:'var(--muted)'}}>No appointments</p>}
        {appts.map(a=> (
          <div key={a._id} className="patient-appt-card">
            <div className="patient-appt-left">
              <div style={{fontWeight:700, marginBottom:6}}>{a.doctor?.name || '—'}</div>
              <div style={{color:'var(--muted)'}}>{formatDateTime(a.date, a.time)}</div>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div className="patient-appt-status">
                {`Status: ${a.status}`}
              </div>

              {a.status === 'booked' && (
                <button onClick={()=>cancelAppt(a._id)} className="cancel-btn">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
