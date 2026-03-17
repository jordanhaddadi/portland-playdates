import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function AuthScreen({ onSuccess }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const getFriendlyError = (message) => {
    const text = (message || "").toLowerCase();
    if (text.includes("rate limit") || text.includes("too many emails")) {
      return "Too many codes requested. Please wait a minute and try again.";
    }
    return message || "Something went wrong. Please try again.";
  };

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => {
      setResendCountdown(c => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }
    });
    if (error) {
      setError(getFriendlyError(error.message));
    } else {
      setStep("otp");
      setResendCountdown(60);
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }
    });
    if (error) {
      setError(getFriendlyError(error.message));
    } else {
      setResendCountdown(60);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email"
    });
    if (error) {
      setError(getFriendlyError(error.message));
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  if (step === "otp") {
    return (
      <div className="ob-screen ob-welcome">
        <div className="ob-blob1" />
        <div className="ob-blob2" />
        <div className="ob-blob3" />

        <div className="auth-wrap">
          <div className="auth-card auth-card-otp">
            <div className="auth-logo auth-logo-mail">📬</div>

            <h2 className="auth-title">Check your email</h2>

            <p className="auth-sub">
              We sent a 6 digit code to <strong>{email}</strong>.
              Enter it below to continue.
            </p>

            <div className="auth-field">
              <label className="auth-label">Login code</label>
              <input
                className="auth-code-input"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="000000"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              />
            </div>

            <button
              className="ob-btn-primary auth-primary-btn"
              onClick={handleVerifyOtp}
              disabled={otp.length < 6 || loading}
            >
              {loading ? "Verifying..." : "Verify and continue"}
            </button>

            <button
              className="ob-btn-secondary auth-secondary-btn"
              onClick={() => setStep("email")}
            >
              Use a different email
            </button>

            <button
              className="auth-link-btn"
              onClick={handleResendOtp}
              disabled={loading || resendCountdown > 0}
            >
              {resendCountdown > 0
                ? `Resend code in ${resendCountdown}s`
                : "Resend code"}
            </button>

            <div className="auth-helper">
              The code expires in 1 hour.
            </div>

            {error && <div className="ob-error">{error}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ob-screen ob-welcome">
      <div className="ob-blob1" />
      <div className="ob-blob2" />
      <div className="ob-blob3" />

      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-beta-badge">Private beta</div>

          <div className="auth-brand">
            <div className="auth-logo">⚓</div>
            <div className="auth-city">Portland, Maine</div>
            <div className="auth-name">PlayDates</div>
          </div>

          <h1 className="auth-title">
            Welcome to<br />Portland PlayDates
          </h1>

          <p className="auth-sub">
            Enter your email to sign in or create your account.
            New here? We will walk you through setup.
          </p>

          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            className="ob-btn-primary auth-primary-btn"
            onClick={handleSendOtp}
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send login code"}
          </button>

          <div className="auth-helper">
            No password needed. We will email you a 6 digit code.
          </div>

          {error && <div className="ob-error">{error}</div>}

          <div className="auth-pillars">
            <span className="auth-pillar">Public spaces only</span>
            <span className="auth-pillar">Age matched</span>
            <span className="auth-pillar">Parent community</span>
          </div>
        </div>
      </div>
    </div>
  );
}

