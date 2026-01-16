// import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import "../doctorPanel.css";


// export default function DoctorPanel(){
//   const [doctor, setDoctor] = useState(null);
//   const [appts, setAppts] = useState([]);
//   const [slotDate, setSlotDate] = useState('');
//   const [slotTime, setSlotTime] = useState('');

//   const loadDoctor = async () => {
//     try {
//       // fetch doctor profile by finding doctors list (assumes one linked to user)
//       const res = await API.get('/doctors');
//       // find the first doctor where user matches current token's user - backend doesn't expose user in this call, so fetch doctorpanel appointments to ensure doctor exists
//       const docRes = await API.get('/doctorpanel/appointments');
//       setAppts(docRes.data);
//       if (docRes.data.length>0) {
//         const docId = docRes.data[0].doctor ? docRes.data[0].doctor._id : null;
//         if (docId) {
//           const d = await API.get(`/doctors/${docId}`);
//           setDoctor(d.data);
//         }
//       } else {
//         // try get all doctors and pick one that has user null (fallback)
//         const all = await API.get('/doctors');
//         setDoctor(all.data[0] || null);
//       }
//     } catch (err) { console.error(err); }
//   };

//   useEffect(()=> { loadDoctor(); }, []);

//   const addSlot = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/doctorpanel/slots', { date: slotDate, time: slotTime });
//       setSlotDate(''); setSlotTime('');
//       loadDoctor();
//     } catch (err) { console.error(err); }
//   };

//   const removeSlot = async (index) => {
//     try {
//       await API.delete(`/doctorpanel/slots/${index}`);
//       loadDoctor();
//     } catch (err) { console.error(err); }
//   };

//   const updateApptStatus = async (id, status) => {
//     try {
//       await API.put(`/doctorpanel/appointments/${id}/status`, { status });
//       loadDoctor();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div>
//       <h2>Doctor Panel</h2>
//       {doctor && <div style={{marginBottom:12}}><strong>{doctor.name}</strong> - {doctor.specialty}</div>}

//       <section style={{marginBottom:20}}>
//         <h3>My Appointments</h3>
//         {appts.length===0 && <p>No appointments yet</p>}
//         {appts.map(a=> (
//           <div key={a._id} className="appt-card">
//             <div><strong>{a.patient?.name}</strong> - {a.date} {a.time}</div>
//             <div>Status: {a.status}</div>
//             <div style={{marginTop:8}}>
//               {a.status !== 'completed' && <button onClick={()=>updateApptStatus(a._id,'completed')}>Mark Completed</button>}
//               {a.status !== 'cancelled' && <button onClick={()=>updateApptStatus(a._id,'cancelled')}>Cancel</button>}
//             </div>
//           </div>
//         ))}
//       </section>

//       <section>
//         <h3>Manage Slots</h3>
//         <form onSubmit={addSlot}>
//           <input placeholder="YYYY-MM-DD" value={slotDate} onChange={e=>setSlotDate(e.target.value)} />
//           <input placeholder="HH:MM" value={slotTime} onChange={e=>setSlotTime(e.target.value)} />
//           <button>Add Slot</button>
//         </form>
//         <div style={{marginTop:12}}>
//           <h4>Current slots</h4>
//           {doctor?.slots?.map((s, idx)=> (
//             <div key={idx} className="slot">
//               <div>{s.date} {s.time} {s.booked ? '(Booked)' : ''}</div>
//               <button onClick={()=>removeSlot(idx)}>Remove</button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import API from '../api/api';
import "../doctorPanel.css";

export default function DoctorPanel() {
  const [doctor, setDoctor] = useState(null);
  const [appts, setAppts] = useState([]);
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');

  const loadDoctor = async () => {
    try {
      const docAppts = await API.get('/doctorpanel/appointments');
      setAppts(docAppts.data);

      if (docAppts.data.length > 0) {
        const docId = docAppts.data[0]?.doctor?._id;
        if (docId) {
          const fullDoc = await API.get(`/doctors/${docId}`);
          setDoctor(fullDoc.data);
        }
      } else {
        const all = await API.get('/doctors');
        setDoctor(all.data[0] || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadDoctor(); }, []);

  const addSlot = async (e) => {
    e.preventDefault();
    try {
      await API.post("/doctorpanel/slots", { date: slotDate, time: slotTime });
      setSlotDate("");
      setSlotTime("");
      loadDoctor();
    } catch (err) { console.error(err); }
  };

  const removeSlot = async (index) => {
    try {
      await API.delete(`/doctorpanel/slots/${index}`);
      loadDoctor();
    } catch (err) { console.error(err); }
  };

  const updateApptStatus = async (id, status) => {
    try {
      await API.put(`/doctorpanel/appointments/${id}/status`, { status });
      loadDoctor();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="doctor-panel-wrapper">
      <h2>Doctor Panel</h2>

      {doctor && (
        <div style={{ marginBottom: "20px", fontSize: "18px" }}>
          <strong>{doctor.name}</strong> — {doctor.specialty}
        </div>
      )}

      <section>
        <h3>My Appointments</h3>

        {appts.length === 0 && <p>No appointments yet.</p>}

        {appts.map((a) => (
          <div key={a._id} className="doctor-appt-card">

            <div className="appt-left">
              <div className="patient-name">{a.patient?.name}</div>
              <div className="appt-datetime">{a.date} — {a.time}</div>
            </div>

            <div className="appt-right">
              <div className={`appt-status ${a.status}`}>
                {a.status}
              </div>

              {a.status !== "completed" && (
                <button
                  onClick={() => updateApptStatus(a._id, "completed")}
                  className="btn mark-btn"
                >
                  Mark Completed
                </button>
              )}

              {a.status !== "cancelled" && (
                <button
                  onClick={() => updateApptStatus(a._id, "cancelled")}
                  className="btn cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        ))}
      </section>

      <section className="manage-slots">
        <h3>Manage Slots</h3>

        <form onSubmit={addSlot} className="row">
          <input
            type="date"
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
          />
          <input
            type="time"
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
          />
          <button className="add-slot-btn">Add Slot</button>
        </form>

        <div className="current-slots">
          <h4></h4>

          {doctor?.slots?.map((s, idx) => (
            <div key={idx} className="slot-item">
              <div>{s.date} — {s.time} {s.booked ? "(Booked)" : ""}</div>
              <button className="btn cancel-btn" onClick={() => removeSlot(idx)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
