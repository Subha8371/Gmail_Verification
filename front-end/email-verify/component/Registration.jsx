import React from "react";
import styles from "./Registration.module.css"; // Adjust path based on your project structure

const RegistrationForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div className={styles.page}>
  <div className={styles.form}>
    <h2 className={styles.h2}>Registration Form</h2> {/* Add className here */}
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className={styles.label}>Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
        className={styles.input}  
      />
      
      <label htmlFor="email" className={styles.label}>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}  
      />

      <label htmlFor="password" className={styles.label}>Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
        className={styles.input}  
      />

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Submitting..." : "Register"}
      </button>
    </form>
  </div>
</div>

  );
};

export default RegistrationForm;
