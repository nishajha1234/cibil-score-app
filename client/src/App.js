import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", pan: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const getScoreColor = (score) => {
    if (score > 750) return "text-emerald-400";
    if (score > 650) return "text-yellow-300";
    return "text-red-400";
  };

  const getScoreText = (score) => {
    if (score > 750) return "Excellent Credit Score";
    if (score > 650) return "Average Credit Score";
    return "Poor Credit Score";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.pan.trim()) {
      newErrors.pan = "PAN is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      newErrors.pan = "Invalid PAN format (ABCDE1234F)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cibil/check`,
        form
      );

      setResult(res.data);
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 rounded-full blur-3xl bottom-[-120px] right-[-120px] animate-pulse"></div>

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-wide text-blue-400">
          DirectCredit
        </h1>
        <span className="text-sm text-gray-400">Credit Intelligence</span>
      </div>

      {/* MAIN */}
      <div className="h-[calc(100vh-70px)] flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Know Your Financial <br />
              <span className="text-blue-400">Trust Score</span>
            </h2>

            <p className="text-gray-400">
              Instantly analyze your credit profile with a secure and intelligent system.
            </p>

            <div className="space-y-2 text-gray-300 text-sm">
              <p>✔ No impact on score</p>
              <p>✔ AI-powered insights</p>
              <p>✔ Bank-grade security</p>
            </div>
          </div>

          {/* CARD */}
          <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">

            {!result ? (
              <>
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Enter Your Details
                </h3>

                {/* NAME */}
                <div className="mb-6">
                  <input
                    value={form.name}
                    className={`w-full p-3 rounded-xl bg-white/10 border ${errors.name ? "border-red-400" : "border-white/20"
                      } focus:ring-2 focus:ring-blue-500 outline-none transition`}
                    placeholder="Full Name"
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* PAN */}
                <div className="mb-6">
                  <input
                    value={form.pan}
                    className={`w-full p-3 rounded-xl bg-white/10 border ${errors.pan || apiError ? "border-red-400" : "border-white/20"
                      } focus:ring-2 focus:ring-blue-500 outline-none transition`}
                    placeholder="PAN Number"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        pan: e.target.value.toUpperCase(),
                      });
                      setErrors({ ...errors, pan: "" });
                      setApiError(""); // clear API error on typing
                    }}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Format: ABCDE1234F
                  </p>

                  {errors.pan && (
                    <p className="text-red-400 text-sm mt-1">{errors.pan}</p>
                  )}

                  {apiError && (
                    <p className="text-red-400 text-sm mt-1">{apiError}</p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Checking Score...
                    </>
                  ) : (
                    "Check Score"
                  )}
                </button>

              </>
            ) : (
              <div className="text-center animate-fadeIn">
                <h3 className="text-lg text-gray-300 mb-2">
                  Your Credit Score
                </h3>

                <div
                  className={`text-7xl font-extrabold mb-6 ${getScoreColor(
                    result.data.score
                  )}`}
                >
                  {result.data.score}
                </div>

                <p className="text-lg font-medium leading-tight mb-1">
                  {getScoreText(result.data.score)}
                </p>


                <p className="text-xs text-gray-400">
                  {result.source === "cache"
                    ? `Previously retrieved • ${new Date(result.data.createdAt).toLocaleString()}`
                    : "Real-time credit evaluation"}
                </p>

                {result.source === "cache" && (
                  <p className="text-green-400 text-xs mt-1">
                    ⚡ Fast response using cached data
                  </p>
                )}

                <button
                  onClick={() => {
                    setResult(null);
                    setForm({ name: "", pan: "" });
                    setErrors({});
                    setApiError("");
                  }}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition"
                >
                  Check Another
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;