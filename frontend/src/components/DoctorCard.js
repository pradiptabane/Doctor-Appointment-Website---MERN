import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }){
  return (
    <div className="doc-card">
      <div className="avatar">{doctor.avatar ? <img src={doctor.avatar} alt="a"/> : <div className="avatar-initial">{doctor.name[0]}</div>}</div>
      <div className="doc-info">
        <h4>{doctor.name}</h4>
        <p>{doctor.specialty}</p>
        <Link to={`/doctor/${doctor._id}`} className="btn">View</Link>
      </div>
    </div>
  );
}
