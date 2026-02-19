export const validateForm = (formData) => {
  let errors = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  // Email
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  // Mobile
  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
    errors.mobile = "Enter valid 10-digit mobile number";
  }

  // Aadhaar (remove spaces before checking)
  const cleanAadhar = formData.aadhar.replace(/\s/g, "");
  if (!formData.aadhar) {
    errors.aadhar = "Aadhaar number is required";
  } else if (!/^\d{12}$/.test(cleanAadhar)) {
    errors.aadhar = "Aadhaar must be 12 digits";
  }

  // PAN
  if (!formData.pan) {
    errors.pan = "PAN number is required";
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
    errors.pan = "Invalid PAN format (ABCDE1234F)";
  }

  // Strong Password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)
  ) {
    errors.password =
      "Password must be 8+ chars, include uppercase, lowercase, number & special character";
  }

  return errors;
};
