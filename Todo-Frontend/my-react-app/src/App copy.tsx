import React from "react";
import { TodoApp } from "./components/TodoApp";
const App: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <TodoApp />
    </div>
  );
};

export default App;
