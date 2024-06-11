import { useState } from "react";

function Form() {
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [users, setUsers] = useState([]);

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

  function handleSignUp(user) {
    setUsers((prevUsers) => [...prevUsers, user]);
    setIsSignUp(true);
  } // Manage mode

  function handleSubmit(event) {
    event.preventDefault();

    if (isSignUp) {
      // Sign-Up Validation
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

      handleSignUp({ userName, userEmail, userPassword });
      console.log({ userName, userEmail, userPassword });
      console.log("Signed up successfully");
    } else {
      // Log-In Validation
      const user = users.find(
        (user) =>
          user.userEmail === userEmail && user.userPassword === userPassword
      );

      if (!user) {
        setErrorMessage("Invalid email or password");
        return;
      }

      setErrorMessage("");
      console.log("Logged in successfully", user);
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: isSignUp ? "pink" : "blue" }}>
            {isSignUp ? "Welcome make an account" : "Log in to your account"}
          </h2>
          {isSignUp && (
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={handleUserNameChange}
              autoComplete="username"
            />
          )}
          <input
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={handleUserEmailChange}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={userPassword}
            onChange={handleUserPasswordChange}
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          // style={{ color: isSignUp ? "blue" : "pink" }}
        >
          {isSignUp ? "Go to Log In" : "Go to Sign Up"}
        </button>
      </div>
    </>
  );
}

export default Form;
