import Input from "./Input";
import useInput from "../hooks/useInput"; // A custom React hook
import { isEmail, hasMinLength, isNotEmpty } from "../utils/validations"; // Validation functions

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange, // It works when the value changes
    handleInputBlur: handleEmailBlur, // It works when you go outside the input field
    hasError: emailHasError, // Is there a verification error?
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 5));

  // Function to run when form is submitted
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page refresh

    // If there are any errors, do not submit the form
    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
      </div>

      <Input
        type="email"
        name="email"
        id="email"
        labelText="Email"
        error={emailHasError && "Enter valid email"}
        value={emailValue}
        onBlur={handleEmailBlur}
        onChange={handleEmailChange}
      />

      <Input
        type="password"
        name="password"
        id="password"
        labelText="Password"
        error={passwordHasError && "The password must be at least 5 characters long"}
        value={passwordValue}
        onBlur={handlePasswordBlur}
        onChange={handlePasswordChange}
      />

      <div className="mb-3">
        <button className="btn btn-outline-warning me-2">Submit</button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}