import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [counts, setCounts] = useState({ doctors: 0, patients: 0, appointments: 0, years: 0 });
  const [animCounts, setAnimCounts] = useState({ doctors: 0, patients: 0, appointments: 0, years: 0 });

  useEffect(() => {
    // fetch doctors for featured section
    axios.get("http://localhost:5000/api/doctors")
      .then(res => {
        setDoctors(res.data.slice(0, 4));
        // simple derived stats based on data available:
        setCounts(prev => ({ ...prev, doctors: res.data.length }));
      })
      .catch(() => { setDoctors([]); });

    // fetch appointments count (best-effort)
    axios.get("http://localhost:5000/api/appointments")
      .then(res => {
        const appts = Array.isArray(res.data) ? res.data.length : 0;
        setCounts(prev => ({ ...prev, appointments: appts }));
      })
      .catch(() => { /* ignore */ });

    // try users count via admin endpoint (works only if token present)
    // fallback: seed-known patients number
    setCounts(prev => ({ ...prev, patients: 1250, years: 6 }));
  }, []);

  // animation for counters
  useEffect(() => {
    const target = counts;
    const duration = 900; // ms
    const frameRate = 40; // update ms
    const steps = Math.ceil(duration / frameRate);
    const start = { ...animCounts };
    const diff = {
      doctors: (target.doctors - start.doctors) / steps,
      patients: (target.patients - start.patients) / steps,
      appointments: (target.appointments - start.appointments) / steps,
      years: (target.years - start.years) / steps,
    };
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setAnimCounts(c => ({
        doctors: Math.round((c.doctors + diff.doctors) * 10) / 10,
        patients: Math.round((c.patients + diff.patients) * 10) / 10,
        appointments: Math.round((c.appointments + diff.appointments) * 10) / 10,
        years: Math.round((c.years + diff.years) * 10) / 10,
      }));
      if (i >= steps) {
        setAnimCounts(target);
        clearInterval(timer);
      }
    }, frameRate);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts.doctors, counts.patients, counts.appointments, counts.years]);

  return (
    <div className="container">

      {/* HERO SECTION */}
      <header className="hero">
        <div>
          <h1>Book Appointment With<br />Trusted Doctors</h1>
          <p>Find doctors by specialty, book slots and manage your appointments.</p>

          <div className="cta">
            <button className="btn">Book Now</button>
            <button className="btn" style={{ background: "rgba(255,255,255,0.05)", color: "#bfefff" }}>
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* STATS / COUNTERS */}
      <div className="stats" style={{ marginTop: 24 }}>
        <div className="stat">
          <h4>{Math.round(animCounts.doctors)}</h4>
          <p>Doctors</p>
        </div>
        <div className="stat">
          <h4>{Math.round(animCounts.patients)}</h4>
          <p>Patients</p>
        </div>
        <div className="stat">
          <h4>{Math.round(animCounts.appointments)}</h4>
          <p>Appointments</p>
        </div>
        <div className="stat">
          <h4>{Math.round(animCounts.years)}</h4>
          <p>Years in Service</p>
        </div>
      </div>

      {/* SPECIALTIES SECTION */}
      <div className="specialties-section">
        <h2>Popular Specialties</h2>
        <div className="specialties-grid">
          {[
            "General Physician",
            "Dermatologist",
            "Pediatrician",
            "Cardiologist",
            "Neurologist",
            "Orthopedic",
          ].map((item) => (
            <div className="specialty-card" key={item}>
              <span>🩺</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED DOCTORS */}
      <div className="featured-doctors-section">
        <h2>Featured Doctors</h2>
        <p className="subtext">Meet our top-rated specialists</p>

        <div className="grid">
          {doctors.length === 0 && <p style={{ color: "#9aa0b4" }}>No doctors found.</p>}
          {doctors.map((doc) => (
            <div className="doc-card" key={doc._id}>
              <div className="avatar-initial">{doc.name ? doc.name.charAt(0) : "D"}</div>
              <div className="doc-info">
                <h4>{doc.name}</h4>
                <p>{doc.specialty}</p>
                <button className="btn">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="reviews-section">
        <h2>What Our Patients Say</h2>

        <div className="reviews-grid">
          {[
            { name: "Aman Sharma", review: "Amazing doctors! Booking an appointment took less than a minute." },
            { name: "Priya Verma", review: "Very professional and friendly experience. Highly recommended." },
            { name: "Rahul Das", review: "Great platform. Clean UI and fast service." },
          ].map((r) => (
            <div className="review-card" key={r.name}>
              <p className="review-text">“{r.review}”</p>
              <h4 className="reviewer">– {r.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* SOCIAL MEDIA LINKS */}
      <div className="social-links">
        <h3>Connect with us</h3>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Prescripto</h3>
            <p>Your trusted healthcare partner.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Doctors</p>
            <p>Contact</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        <p className="footer-bottom">© 2025 Prescripto. All rights reserved.</p>
      </footer>

    </div>
  );
}
