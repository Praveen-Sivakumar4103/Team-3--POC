export const validateForm = (formData) => {
  let errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
    errors.mobile = "Enter valid 10-digit mobile number";
  }

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
