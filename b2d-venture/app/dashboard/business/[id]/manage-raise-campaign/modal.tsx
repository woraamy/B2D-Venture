"use client";

import { useState } from "react";

export default function Modal({ modalId, onSubmit, defaultData }) {
  const [formData, setFormData] = useState(defaultData || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div id={modalId} className="modal hidden">
      <div className="modal-content">
        <h2>Edit/Create Raise Campaign</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="businessName"
            value={formData.businessName || ""}
            onChange={handleChange}
            placeholder="Business Name"
            required
          />
          <input
            type="number"
            name="min_investment"
            value={formData.min_investment || ""}
            onChange={handleChange}
            placeholder="Minimum Investment"
            required
          />
          <input
            type="number"
            name="min_investment"
            value={formData.max_investment || ""}
            onChange={handleChange}
            placeholder="Maximum Investment"
            required
          />
          <input
            type="number"
            name="goal"
            value={formData.goal || ""}
            onChange={handleChange}
            placeholder="Goal"
            required
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date || ""}
            onChange={handleChange}
            placeholder="Start Date"
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date || ""}
            onChange={handleChange}
            placeholder="End Date"
            required
          />

          {/* Add other form inputs similarly */}
          <button type="submit">Submit</button>
        </form>
        <button className="close-modal">Close</button>
      </div>
    </div>
  );
}
