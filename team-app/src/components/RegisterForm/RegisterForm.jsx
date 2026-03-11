import React, { useState } from "react";
import { User, Mail, Phone, CreditCard, Lock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { registerUser } from "../../services/api";
import {
  personalDetailsSchema,
  kycDetailsSchema,
  securitySchema,
  registrationSchema,
  validateWithSchema,
} from "../../utils/validation";
import Modal from "../Modal/Modal";
import Toast from "../Toast/Toast";
import "./RegisterForm.css";

function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhar: "",
    pan: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Schema mapped to steps
  const stepSchemas = {
    1: personalDetailsSchema,
    2: kycDetailsSchema,
    3: securitySchema,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Aadhaar auto-format: 1234 5678 9012
    if (name === "aadhar") {
      const numericValue = value.replace(/\D/g, "").substring(0, 12);
      updatedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }

    // PAN auto-uppercase
    if (name === "pan") {
      updatedValue = value.toUpperCase();
    }

    const updatedFormData = {
      ...formData,
      [name]: updatedValue,
    };

    setFormData(updatedFormData);

    // Live validation for the current step
    const stepErrors = validateWithSchema(updatedFormData, stepSchemas[step]);
    setErrors(stepErrors);
  };

  const handleNextStep = () => {
    const stepErrors = validateWithSchema(formData, stepSchemas[step]);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final full validation
    const validationErrors = validateWithSchema(formData, registrationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await registerUser(formData);
      setShowModal(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        aadhar: "",
        pan: "",
        password: "",
      });
      setStep(1);
      setErrors({});
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="glass-panel">
        <div className="form-header">
          <h2>Create Account</h2>
          <p>Join our platform today.</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicators">
            <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`step-dot ${step >= 3 ? "active" : ""}`}>3</div>
          </div>
        </div>

        <form className="form-content" onSubmit={(e) => e.preventDefault()}>
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="form-step slide-in">
              <h3>Personal Details</h3>
              <div className="input-group">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}

              <div className="input-group">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}

              <div className="input-group">
                <Phone size={18} className="input-icon" />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  className={errors.mobile ? "input-error" : ""}
                />
              </div>
              {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>
          )}

          {/* STEP 2: KYC Details */}
          {step === 2 && (
            <div className="form-step slide-in">
              <h3>KYC Details</h3>
              <div className="input-group">
                <CreditCard size={18} className="input-icon" />
                <input
                  type="text"
                  name="aadhar"
                  placeholder="Aadhaar (1234 5678 9012)"
                  value={formData.aadhar}
                  onChange={handleChange}
                  maxLength="14"
                  className={errors.aadhar ? "input-error" : ""}
                />
              </div>
              {errors.aadhar && <span className="error-text">{errors.aadhar}</span>}

              <div className="input-group">
                <CreditCard size={18} className="input-icon" />
                <input
                  type="text"
                  name="pan"
                  placeholder="PAN (ABCDE1234F)"
                  value={formData.pan}
                  onChange={handleChange}
                  maxLength="10"
                  className={errors.pan ? "input-error" : ""}
                />
              </div>
              {errors.pan && <span className="error-text">{errors.pan}</span>}
            </div>
          )}

          {/* STEP 3: Security & Review */}
          {step === 3 && (
            <div className="form-step slide-in">
              <h3>Security & Review</h3>
              <div className="input-group password-group">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Secure Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}

              <div className="review-box">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.mobile}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="button-group">
            {step > 1 && (
              <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                <ArrowLeft size={16} /> Back
              </button>
            )}

            {step < 3 ? (
              <button type="button" className="btn-primary" onClick={handleNextStep}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" className="btn-success" onClick={handleSubmit} disabled={loading}>
                {loading ? "Registering..." : (
                  <>Complete <CheckCircle size={16} /></>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {showModal && (
        <Modal
          message="Account created successfully! Welcome aboard 🚀"
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

