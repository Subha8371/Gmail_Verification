"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Registration from "../../component/Registration";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [emailToken, setEmailToken] = useState(null); // Store email token from response
  const [token, setToken] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, store the email token and show the modal
        setEmailToken(data.emailToken);
        setShowModal(true);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Registration
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {/* Show modal if showModal is true */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>
              Check your email! A verification link has been sent to your email
              address.
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
