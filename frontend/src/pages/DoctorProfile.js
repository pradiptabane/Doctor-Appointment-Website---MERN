import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../auth/AuthProvider';

export default function DoctorProfile(){
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState('');

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await API.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  const book = async (date, time) => {
    if (!user) { setMsg('Please login to book'); return; }
    try {
      await API.post('/appointments/book', { doctorId: id, date, time });
      setMsg('Booked successfully');
      const res = await API.get(`/doctors/${id}`);
      setDoctor(res.data);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error booking');
    }
  };

  if (!doctor) return <div>Loading...</div>;
  return (
    <div>
      <h2>{doctor.name} — {doctor.specialty}</h2>
      <p>{doctor.bio}</p>
      <h3>Available slots</h3>
      <div className="slots">
        {doctor.slots.map((s, i) => (
          <div key={i} className={`slot ${s.booked ? 'booked' : ''}`}>
            <div>{s.date} {s.time}</div>
            <button disabled={s.booked} onClick={()=> book(s.date, s.time)}>{s.booked ? 'Booked' : 'Book'}</button>
          </div>
        ))}
      </div>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
