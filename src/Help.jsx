import React, { useState } from 'react';
import './Help.css';

function Help() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setEmail('');
    setMessage('');
  };

  return (
    <main className="help-page">
      <section className="help-container">
        <h1 className="help-heading"> CONTACT US</h1>
        <form className="help-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="help-label">Your Email</label>
          <input
            type="email"
            id="email"
            className="help-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="message" className="help-label">Your Message</label>
          <textarea
            id="message"
            className="help-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or inquiry"
            required
          />
          <button type="submit" className="help-btn">Send Message</button>
        </form>

        {showAlert && (
          <div className="alert-message">
            <p>We'll get back to you shortly!</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Help;
