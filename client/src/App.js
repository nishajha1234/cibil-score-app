import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", pan: "" });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/cibil/check", form);
    setResult(res.data);
  };

  return (
    <div>
      <h1>CIBIL Score Checker</h1>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="PAN"
        onChange={(e) => setForm({ ...form, pan: e.target.value })}
      />

      <button onClick={handleSubmit}>Check Score</button>

      {result && (
        <div>
          <h2>Score: {result.data.score}</h2>
          <p>{result.data.report}</p>
          <p>Source: {result.source}</p>
        </div>
      )}
    </div>
  );
}

export default App;