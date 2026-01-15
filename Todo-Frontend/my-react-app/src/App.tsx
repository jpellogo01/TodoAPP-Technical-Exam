import React, { useState, useEffect } from "react";
import { TodoApp } from "./components/TodoApp";
import { Login } from "./components/Login/Login";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/check", {
          credentials: "include",
        });
        const text = await res.text();
        if (text.startsWith("Logged in")) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (checkingSession) return <p>Checking session...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      {isLoggedIn ? (
        <TodoApp />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;
