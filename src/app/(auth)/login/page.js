"use client";

import { useState } from "react";
import AuthForm from "../../_components/AuthForm";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    setError("");

    if (email === "test@example.com" && password === "password") {
      alert("Login successful!");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <AuthForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
