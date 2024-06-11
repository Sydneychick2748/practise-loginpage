import { useState } from "react";

function Form() {
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  function handleUserNameChange(event) {
    setUsername(event.target.value);
  }

  function handleUserEmailChange(event) {
    setUserEmail(event.target.value);
  }

  function handleUserPasswordChange(event) {
    setUserPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!EMAIL_REGEX.test(userEmail)) {
      setErrorMessage("Invalid email address");
      return;
    }
    if (!PASSWORD_REGEX.test(userPassword)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain letters and numbers"
      );
      return;
    }

    setErrorMessage("");
    console.log("username:", userName);
    console.log("email:", userEmail);
    console.log("password:", userPassword);
  }

  return (
    <>
      <div className="newUser">
        <form onSubmit={handleSubmit}>
          <h2>Welcome make an account</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={handleUserNameChange}
            autoComplete="username"
          />
          <input
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={handleUserEmailChange}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter a password"
            value={userPassword}
            onChange={handleUserPasswordChange}
            autoComplete="new-password"
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </>
  );
}

export default Form;
