import React, { useEffect, useState } from 'react';
import API from '../api/api';

function paginate(arr, page, per) {
  const start = (page-1)*per;
  return arr.slice(start, start+per);
}

export default function AdminUsers(){
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const per = 8;

  const load = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(()=> { load(); }, []);

  const filtered = users.filter(u => (u.name||'').toLowerCase().includes(q.toLowerCase()) || (u.email||'').toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / per));
  const pageItems = paginate(filtered, page, per);

  const changeRole = async (id, role) => {
    try { await API.put(`/admin/users/${id}/role`, { role }); load(); } catch (err) { console.error(err); }
  };
  const deleteUser = async (id) => {
    if (!confirm('Delete user?')) return;
    try { await API.delete(`/admin/users/${id}`); load(); } catch (err) { console.error(err); }
  };

  const exportCSV = () => {
    const rows = [['Name','Email','Role']].concat(users.map(u => [u.name, u.email, u.role]));
    const csv = rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'users.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Users ({users.length})</h3>
        <div>
          <input placeholder='Search name or email' value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} />
          <button onClick={exportCSV} style={{marginLeft:8}}>Export CSV</button>
        </div>
      </div>
      <div style={{marginTop:12}}>
        {pageItems.map(u=> (
          <div key={u._id} className="doc-card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <strong>{u.name}</strong> <div style={{fontSize:13}}>{u.email}</div>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <select value={u.role} onChange={e=>changeRole(u._id, e.target.value)}>
                <option value="user">user</option>
                <option value="doctor">doctor</option>
                <option value="admin">admin</option>
              </select>
              <button onClick={()=>deleteUser(u._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        Page: {Array.from({length:pages}).map((_,i)=> (
          <button key={i} onClick={()=>setPage(i+1)} style={{marginRight:6, fontWeight: page===i+1 ? 'bold':'normal'}}>{i+1}</button>
        ))}
      </div>
    </div>
  );
}
