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
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white relative overflow-hidden">

      <div className="absolute w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-blue-600 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-purple-600 opacity-20 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-blue-400">
          DirectCredit
        </h1>
        <span className="text-xs sm:text-sm text-gray-400">
          Credit Intelligence
        </span>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Know Your Financial <br />
              <span className="text-blue-400">Trust Score</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-400">
              Instantly analyze your credit profile with a secure and intelligent system.
            </p>

            <div className="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
              <p>✔ No impact on score</p>
              <p>✔ AI-powered insights</p>
              <p>✔ Bank-grade security</p>
            </div>
          </div>

          <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">

            {!result ? (
              <>
                <h3 className="text-base sm:text-lg xl:text-xl font-semibold mb-4 sm:mb-6 text-center">
                  Enter Your Details
                </h3>

                <div className="mb-4 sm:mb-6">
                  <input
                    value={form.name}
                    className={`w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 border ${errors.name ? "border-red-400" : "border-white/20"
                      } focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base`}
                    placeholder="Full Name"
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-4 sm:mb-6">
                  <input
                    value={form.pan}
                    className={`w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 border ${errors.pan || apiError
                        ? "border-red-400"
                        : "border-white/20"
                      } focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base`}
                    placeholder="PAN Number"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        pan: e.target.value.toUpperCase(),
                      });
                      setErrors({ ...errors, pan: "" });
                      setApiError("");
                    }}
                  />

                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                    Format: ABCDE1234F
                  </p>

                  {errors.pan && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.pan}
                    </p>
                  )}

                  {apiError && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {apiError}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
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
                <h3 className="text-sm sm:text-lg text-gray-300 mb-2">
                  Your Credit Score
                </h3>

                <div
                  className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 ${getScoreColor(
                    result.data.score
                  )}`}
                >
                  {result.data.score}
                </div>

                <p className="text-sm sm:text-lg font-medium leading-tight mb-1">
                  {getScoreText(result.data.score)}
                </p>

                <p className="text-[10px] sm:text-xs text-gray-400">
                  {result.source === "cache"
                    ? `Previously retrieved • ${new Date(
                      result.data.createdAt
                    ).toLocaleString()}`
                    : "Real-time credit evaluation"}
                </p>

                {result.source === "cache" && (
                  <p className="text-green-400 text-[10px] sm:text-xs mt-1">
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
                  className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl text-xs sm:text-sm transition"
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