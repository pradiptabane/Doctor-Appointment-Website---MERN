import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../auth/AuthProvider';

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [appts, setAppts] = useState([]);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await API.get('/appointments/my');
        setAppts(res.data);
      } catch (err) { console.error(err); }
    })();
  }, []);

  const cancel = async (id) => {
    try {
      await API.post(`/appointments/cancel/${id}`);
      setAppts(a => a.map(x => x._id===id ? {...x, status:'cancelled'} : x));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      <div>
        {appts.length === 0 && <p>No appointments yet</p>}
        {appts.map(a => (
          <div key={a._id} className="appt-card">
            <div><strong>{a.doctor.name}</strong> - {a.date} {a.time}</div>
            <div>Status: {a.status}</div>
            {a.status === 'booked' && <button onClick={() => cancel(a._id)}>Cancel</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
