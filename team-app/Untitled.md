# Problem Statement
POC: Test button actions, form validation, and API responses.
Testing
• Jest basics
• React Testing Library
• Component testing
• API mocking

this is our proboem statement

---

## 1️⃣ Project Overview

This project is a **Proof of Concept (POC)** that demonstrates how modern web applications can be **tested automatically** to ensure reliability and prevent bugs.

The system includes:

- A **React Registration Form**
    
- **Input validation logic**
    
- **Button actions**
    
- A **mock API service**
    
- **Automated tests** using **Jest** and **React Testing Library**
    

### 🎯 Objective

To verify that:

1. Form inputs work correctly
    
2. Validation rules prevent incorrect data
    
3. Buttons trigger the correct functions
    
4. API responses behave as expected
    
5. The UI responds properly to success or error states
    

---

# 🏗 System Architecture

Your application consists of **five main layers**.

### 1️⃣ UI Layer

The **React components** that users interact with.

Example:

- RegisterForm component
    
- Input fields
    
- Buttons
    

### 2️⃣ Validation Layer

Logic that checks user inputs.

Example:

- Email format
    
- Mobile number format
    
- Aadhaar length
    
- PAN structure
    

### 3️⃣ Service Layer

Handles communication with backend services.

In this POC:

- A **mock API** simulates a backend server.
    

### 4️⃣ Interaction Layer

Functions that respond to user actions.

Example:

- handleChange()
    
- handleSubmit()
    
- resetForm()
    

### 5️⃣ Testing Layer

Automated tests verify that everything works correctly.

This layer uses:

- **Jest**
    
- **React Testing Library**
    

---

# 🧑‍💻 Application Flow

Here is the **complete workflow**.

### Step 1 – User Opens Registration Form

The user sees fields for:

- Name
    
- Email
    
- Mobile
    
- Aadhaar
    
- PAN
    
- Password
    

---

### Step 2 – User Enters Data

Each input is captured by:

handleChange()

This function updates the **React state**.

---

### Step 3 – Validation Runs

Before submission, validations run using **Regex patterns**.

Example:

Email validation

/^[^\s@]+@[^\s@]+\.[^\s@]+$/

Mobile validation

/^[6-9]\d{9}$/

PAN validation

/^[A-Z]{5}[0-9]{4}[A-Z]$/

Aadhaar validation

/^\d{12}$/

If validation fails:

⚠ Error messages appear.

---

### Step 4 – Submit Button

When the **Register button** is clicked:

handleSubmit()

This function:

1. Prevents default form refresh
    
2. Runs validations
    
3. Calls API service
    

---

### Step 5 – API Request

A simulated API is used:

registerUser(data)

Example behavior:

- Waits **1 second**
    
- Returns success message
    

Registration Successful

---

### Step 6 – UI Response

Based on API response:

Success → Modal appears  
Failure → Toast notification appears

---

# 🧪 Testing Strategy

Testing is the **main focus** of the POC.

Three major areas are tested:

---

# 1️⃣ Component Testing

Component testing ensures that **UI components render and behave correctly**.

Example test:

render(<RegisterForm />);  
expect(screen.getByText("Register")).toBeInTheDocument();

This test checks if the form renders properly.

### What we test

✔ Component loads  
✔ Inputs appear  
✔ Buttons exist

---

# 2️⃣ Form Validation Testing

We verify that **invalid inputs trigger errors**.

Example cases:

|Test Case|Expected Result|
|---|---|
|Invalid email|Error message|
|Mobile less than 10 digits|Validation fails|
|PAN wrong format|Error shown|
|Aadhaar not 12 digits|Validation fails|

Example test:

fireEvent.change(emailInput, {  
  target: { value: "wrongemail" }  
});  
  
fireEvent.click(submitButton);  
  
expect(screen.getByText("Invalid Email")).toBeInTheDocument();

---

# 3️⃣ Button Action Testing

Buttons must trigger the correct functions.

Buttons tested:

### Register Button

Expected behavior:

- Calls handleSubmit
    
- Runs validation
    
- Sends API request
    

### Reset Button

Expected behavior:

- Clears all fields
    
- Resets form state
    

Example test:

fireEvent.click(resetButton);  
expect(nameInput.value).toBe("");

---

# 4️⃣ API Mock Testing

Real APIs are not used in tests.

Instead we use **mock APIs**.

Mocking allows us to simulate:

✔ Successful response  
✔ Error response  
✔ Network delay

Example:

jest.mock("../services/api");

Success test:

registerUser.mockResolvedValue({  
  message: "Registration successful"  
});

Error test:

registerUser.mockRejectedValue({  
  message: "Server error"  
});

---

# 5️⃣ User Interaction Testing

React Testing Library simulates **real user behavior**.

Examples:

User typing

fireEvent.change(input)

User clicking

fireEvent.click(button)

This ensures the UI behaves correctly **from a user's perspective**.

---

# 🧑‍🤝‍🧑 Team Role Explanation

Since there are **10 members**, the project is divided into specialized roles.

### Development Team

**1. React Setup**  
Project structure and dependencies.

**2. UI Development**  
Build RegisterForm.

**3. Validation Logic**  
Implement regex validation.

**4. Button Actions**  
Implement form interactions.

**5. Formatting**  
Aadhaar formatting and PAN uppercase.

---

### Service Layer

**6. API Simulation**  
Create mock API.

**7. UI Feedback Components**  
Modal and Toast notifications.

---

### Testing Team

**8. Jest Setup**  
Configure testing environment.

**9. Component Testing**  
Write tests for React components.

**10. API Mock Testing**  
Test API behavior.

---

# 📊 Benefits of Automated Testing

This POC demonstrates why testing is important.

### 1️⃣ Detects Bugs Early

Errors are found before deployment.

### 2️⃣ Improves Code Quality

Developers write cleaner code.

### 3️⃣ Enables Safe Refactoring

Code can be changed without breaking features.

### 4️⃣ Saves Development Time

Automated tests reduce manual testing.

---

# 📈 Future Enhancements

Possible improvements include:

- Backend integration
    
- Database storage
    
- OTP verification
    
- Authentication system
    
- Deployment to cloud platforms
    
- CI/CD pipelines for automated testing