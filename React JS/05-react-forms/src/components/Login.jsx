import { useRef, useState } from "react";

export default function Login() {
  //If the email and password are invalid, the value will be true, and an error message will be displayed
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //It is used to access the values ​​of the input fields using "email.current.value" and "password.current.value"
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page refresh

    // Clears previous errors
    setEmailError(false);
    setPasswordError(false);

    // Get input values
    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    // Simple validation rules
    const emailIsInvalid = !emailVal.includes("@"); // Invalid if there is no @ symbol
    const passwordIsInvalid = passwordVal.length <= 5; // Invalid if 5 characters or less

    // If the email is incorrect
    if (emailIsInvalid) {
      setEmailError(true);
      return; // Exits the function, it doesn't continue.
    }

    // If the password is incorrect
    if (passwordIsInvalid) {
      setPasswordError(true);
      return; // Exits the function, it doesn't continue.
    }

    console.log("form submitted");

    // Clear error conditions
    setEmailError(false);
    setPasswordError(false);

    // Clear form
    email.current.value = "";
    password.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          ref={email}
        />
        {/* If there is an error (emailError === true), a red error message will be displayed. */}
        {emailError && (
          <div className="invalid-feedback d-block">Enter valid email.</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          ref={password}
        />{" "}
        {/* If there is an error (passwordError === true), a red error message will be displayed. */}
        {passwordError && (
          <div className="invalid-feedback d-block">The password must be at least 5 characters long.</div>
        )}
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-warning me-2">Submit</button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}
