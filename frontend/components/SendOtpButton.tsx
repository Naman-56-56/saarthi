import { useState } from "react";
import { sendOtpEmailJS } from "@/lib/emailjs";

export type OtpParams = {
  email: string;
  passcode: string;
  time: string;
};

export default function SendOtpButton() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async function handleSendOtp() {
    setLoading(true);
    setError("");
    setSuccess(false);
    const otpCode = generateOtp();
    setOtp(otpCode);
    const expiryTime = new Date(Date.now() + 5 * 60000).toLocaleTimeString(); // 5 min expiry
    try {
      await sendOtpEmailJS({
        email: email,
        passcode: otpCode,
        time: expiryTime,
      });
      setSuccess(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <label className="block mb-2 font-medium">Email address</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full border rounded px-2 py-1 mb-3"
      />
      <button
        onClick={handleSendOtp}
        disabled={loading || !email}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded font-semibold"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
      {success && (
        <div className="mt-3 text-green-600 font-medium">OTP sent successfully!</div>
      )}
      {error && (
        <div className="mt-3 text-red-600 font-medium">{error}</div>
      )}
    </div>
  );
}
