import React, { useEffect, useState } from 'react';
import API from '../api/api';
import DoctorCard from '../components/DoctorCard';

export default function Doctors(){
  const [doctors, setDoctors] = useState([]);
  useEffect(()=> {
    (async ()=> {
      try {
        const res = await API.get('/doctors');
        setDoctors(res.data);
      } catch (err) { console.error(err); }
    })();
  }, []);
  return (
    <div>
      <h2>Doctors</h2>
      <div className="grid">
        {doctors.map(d => <DoctorCard doctor={d} key={d._id} />)}
      </div>
    </div>
  );
}
