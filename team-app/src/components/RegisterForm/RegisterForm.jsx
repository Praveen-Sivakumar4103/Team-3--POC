import React, { useState } from "react";
import { registerUser } from "../../services/api";
import { validateForm } from "../../utils/validation";
import Modal from "../Modal/Modal";
import Toast from "../Toast/Toast";
import "./RegisterForm.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhar: "",
    pan: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Live validation + formatting
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Aadhaar auto-format: 1234 5678 9012
    if (name === "aadhar") {
      const numericValue = value.replace(/\D/g, "").substring(0, 12);
      updatedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // PAN auto-uppercase
    if (name === "pan") {
      updatedValue = value.toUpperCase();
    }

    const updatedFormData = {
      ...formData,
      [name]: updatedValue
    };

    setFormData(updatedFormData);

    // 🔥 Live Validation
    const validationErrors = validateForm({
      ...updatedFormData,
      aadhar: updatedFormData.aadhar
    });

    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await registerUser(formData);
      setShowModal(true);

      setFormData({
        name: "",
        email: "",
        mobile: "",
        aadhar: "",
        pan: "",
        password: ""
      });

      setErrors({});
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Register</h3>

        {/* Name */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
            className={errors.mobile ? "error-input" : ""}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        {/* Aadhaar */}
        <div className="form-group">
          <input
            type="text"
            name="aadhar"
            placeholder="Aadhaar Number (1234 5678 9012)"
            value={formData.aadhar}
            onChange={handleChange}
            maxLength="14"
            className={errors.aadhar ? "error-input" : ""}
          />
          {errors.aadhar && <span className="error">{errors.aadhar}</span>}
        </div>

        {/* PAN */}
        <div className="form-group">
          <input
            type="text"
            name="pan"
            placeholder="PAN Number (ABCDE1234F)"
            value={formData.pan}
            onChange={handleChange}
            maxLength="10"
            className={errors.pan ? "error-input" : ""}
          />
          {errors.pan && <span className="error">{errors.pan}</span>}
        </div>

        {/* Password */}
        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>

      {showModal && (
        <Modal
          message="User registered successfully 🎉"
          onClose={() => setShowModal(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default RegisterForm;
