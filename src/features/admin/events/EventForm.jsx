import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Events.module.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaTimes } from 'react-icons/fa';

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Musical Concert',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    city: '',
    totalTickets: '',
    regularPrice: '',
    vipPrice: '',
    vvipPrice: '',
    photo: null,
    isFeatured: false
  });

  // Load event data in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Replace with actual API call
      const sampleEvent = {
        name: 'Sample Event',
        type: 'Musical Concert',
        description: 'This is a sample event',
        startDate: '2023-12-01',
        endDate: '2023-12-02',
        startTime: '18:00',
        endTime: '23:00',
        venue: 'Sample Venue',
        city: 'Nairobi',
        totalTickets: '1000',
        regularPrice: '2000',
        vipPrice: '5000',
        vvipPrice: '10000',
        isFeatured: true
      };
      setFormData(sampleEvent);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your save logic here
    navigate('/admin/events');
  };

  const handleCancel = () => {
    navigate('/admin/events');
  };

  return (
    <div className={styles.eventFormContainer}>
      <h2>{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* Basic Info */}
          <div className={styles.formSection}>
            <h3>Basic Information</h3>
            <div className={styles.formGroup}>
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Event Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Musical Concert">Musical Concert</option>
                <option value="Comedy Event">Comedy Event</option>
                <option value="Conference">Conference</option>
                <option value="Party & Hangout">Party & Hangout</option>
                <option value="Sports Related">Sports Event</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                Featured Event
              </label>
            </div>
          </div>

          {/* Date & Time */}
          <div className={styles.formSection}>
            <h3>Date & Time</h3>
            <div className={styles.formGroup}>
              <label><FaCalendarAlt /> Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label><FaCalendarAlt /> End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Location */}
          <div className={styles.formSection}>
            <h3>Location</h3>
            <div className={styles.formGroup}>
              <label><FaMapMarkerAlt /> Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Tickets */}
          <div className={styles.formSection}>
            <h3><FaTicketAlt /> Ticket Information</h3>
            <div className={styles.formGroup}>
              <label>Total Tickets Available</label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Regular Price (KSh)</label>
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label>VIP Price (KSh) - Optional</label>
              <input
                type="number"
                name="vipPrice"
                value={formData.vipPrice}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label>VVIP Price (KSh) - Optional</label>
              <input
                type="number"
                name="vvipPrice"
                value={formData.vvipPrice}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className={styles.formSection}>
            <h3>Event Image</h3>
            <div className={styles.formGroup}>
              <label>Upload Image</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {isEditMode ? 'Update Event' : 'Create Event'}
          </button>
          <button 
            type="button" 
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;