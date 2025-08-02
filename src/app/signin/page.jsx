"use client";
import React, { useState } from "react";
import WittyTechLogo from "../../../public/Images/WittyTechLogo.jpg";
import SignupImage from "../../../public/Images/signupimg.jpg";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

function AuthInput({ icon, ...props }) {
    return (
        <div style={{ position: "relative", marginBottom: 18 }}>
            <span style={{ position: "absolute", left: 12, top: 12, color: "#bbb" }}>{icon}</span>
            <input
                {...props}
                style={{
                    width: "100%",
                    padding: "12px 12px 12px 38px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: 8,
                    fontSize: 16,
                    fontFamily: 'LexendLight',
                    outline: "none",
                    background: props.disabled ? "#f5f5f5" : "#fff"
                }}
            />
        </div>
    );
}

export default function SignupPage() {
    const [tab, setTab] = useState("signin");
    const [showForgot, setShowForgot] = useState(false);
    const [showChange, setShowChange] = useState(false);
    // Sign Up state
    const [signup, setSignup] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    // Sign In state
    const [signin, setSignin] = useState({ username: "", password: "" });
    // Forgot/Change password state
    const [forgot, setForgot] = useState({ user: "", newPassword: "", confirmNew: "" });
    const [change, setChange] = useState({ old: "", new: "", confirm: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Responsive check
    const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

    // Handlers
    const handleSignup = (e) => {
        e.preventDefault();
        if (!signup.fullName || !signup.username || !signup.email || !signup.phone || !signup.password || !signup.confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (signup.password !== signup.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        // setSuccess("Account created! (Simulated)");
    };
    const handleSignin = (e) => {
        e.preventDefault();
        if (!signin.username || !signin.password) {
            setError("Username and password required.");
            return;
        }
        setError("");
        // setSuccess("Signed in! (Simulated)");
    };
    const handleForgot = (e) => {
        e.preventDefault();
        if (!forgot.user || !forgot.newPassword || !forgot.confirmNew) {
            setError("All fields required.");
            return;
        }
        if (forgot.newPassword !== forgot.confirmNew) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        // setSuccess("Password reset! (Simulated)");
        setShowForgot(false);
    };
    const handleChange = (e) => {
        e.preventDefault();
        if (!change.old || !change.new || !change.confirm) {
            setError("All fields required.");
            return;
        }
        if (change.new !== change.confirm) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        // setSuccess("Password changed! (Simulated)");
        setShowChange(false);
    };

    return (
        <div className={isMobile ? "auth-root-mobile" : "auth-root-desktop"}>
            {/* Left/image/overlay */}
            <div className={isMobile ? "auth-left-mobile" : "auth-left-desktop"}>
                <img src={SignupImage.src} alt="Signup" className="signup-image" />
                <div className={isMobile ? "signup-overlay-mobile" : "signup-overlay-desktop"}>
                    <div className="signup-logo-row">
                        <img src={WittyTechLogo.src} alt="Logo" className="signup-overlay-logo" />
                    </div>
                    <div className="signup-quote-row">
                        <div className="signup-quote-text">"Simply all the tools that you need for day-to-day operations in one place."</div>
                        {/* <div className="signup-quote-author">Karen Yue</div>
                        <div className="signup-quote-role">Director of Digital Marketing Technology</div> */}
                    </div>
                </div>
            </div>
            {/* Right/form */}
            <div className={isMobile ? "auth-right-mobile" : "auth-right-desktop"}>
                <div className="auth-form-wrap">
                    <img src={WittyTechLogo.src} alt="Logo" className="auth-logo" />
                    <div className="auth-tabs">
                        <button onClick={() => { setTab("signin"); setError(""); setSuccess(""); }} className={tab === "signin" ? "auth-tab active" : "auth-tab"}>Sign In</button>
                        <button onClick={() => { setTab("signup"); setError(""); setSuccess(""); }} className={tab === "signup" ? "auth-tab active" : "auth-tab"}>Sign Up</button>
                    </div>
                    {tab === "signup" && (
                        <form onSubmit={handleSignup} autoComplete="off">
                            <AuthInput icon={<FaUserCircle />} placeholder="Full Name" value={signup.fullName} onChange={e => setSignup({ ...signup, fullName: e.target.value })} />
                            <AuthInput icon={<FaUser />} placeholder="Username" value={signup.username} onChange={e => setSignup({ ...signup, username: e.target.value })} />
                            <AuthInput icon={<FaEnvelope />} placeholder="Email" type="email" value={signup.email} onChange={e => setSignup({ ...signup, email: e.target.value })} />
                            <AuthInput icon={<FaPhone />} placeholder="Phone Number" value={signup.phone} onChange={e => setSignup({ ...signup, phone: e.target.value.replace(/\D/g, "") })} maxLength={11} />
                            <AuthInput icon={<FaLock />} placeholder="Password" type="password" value={signup.password} onChange={e => setSignup({ ...signup, password: e.target.value })} />
                            <AuthInput icon={<FaLock />} placeholder="Confirm Password" type="password" value={signup.confirmPassword} onChange={e => setSignup({ ...signup, confirmPassword: e.target.value })} />
                            {error && <div className="setpin-error" style={{ marginBottom: 10 }}>{error}</div>}
                            {success && <div className="auth-success-msg">{success}</div>}
                            <Link href="/dashboard">
                                <button className="btn-primary-setpin auth-btn-submit" type="submit">Sign Up</button>
                            </Link>
                        </form>
                    )}
                    {tab === "signin" && (
                        <form onSubmit={handleSignin} autoComplete="off">
                            <AuthInput icon={<FaUser />} placeholder="Username" value={signin.username} onChange={e => setSignin({ ...signin, username: e.target.value })} />
                            <AuthInput icon={<FaLock />} placeholder="Password" type="password" value={signin.password} onChange={e => setSignin({ ...signin, password: e.target.value })} />
                            <div className="auth-links-row">
                                <button type="button" className="auth-link" onClick={() => { setShowForgot(true); setError(""); setSuccess(""); }}>Forgot password?</button>
                                <button type="button" className="auth-link secondary" onClick={() => setShowChange(true)}>Change password</button>
                            </div>
                            {error && <div className="setpin-error" style={{ marginBottom: 10 }}>{error}</div>}
                            {success && <div className="auth-success-msg">{success}</div>}
                            <Link href="/dashboard">
                                <button className="btn-primary-setpin auth-btn-submit" type="submit">Sign In</button>
                            </Link>
                        </form>
                    )}
                    <div className="auth-bottom-switch">
                        {tab === "signin" ? (
                            <>Don't have an account? <button className="auth-switch-btn" onClick={() => setTab("signup")}>Sign up</button></>
                        ) : (
                            <>Already have an account? <button className="auth-switch-btn" onClick={() => setTab("signin")}>Sign in</button></>
                        )}
                    </div>
                </div>
                {/* Forgot Password Modal */}
                {showForgot && (
                    <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                        <div className="modal-content auth-modal-content">
                            <button className="modal-close" onClick={() => setShowForgot(false)} aria-label="Close">&times;</button>
                            <h2 className="auth-modal-title">Reset Password</h2>
                            <form onSubmit={handleForgot} autoComplete="off">
                                <AuthInput icon={<FaUser />} placeholder="Email or Username" value={forgot.user} onChange={e => setForgot({ ...forgot, user: e.target.value })} />
                                <AuthInput icon={<FaLock />} placeholder="New Password" type="password" value={forgot.newPassword} onChange={e => setForgot({ ...forgot, newPassword: e.target.value })} />
                                <AuthInput icon={<FaLock />} placeholder="Confirm New Password" type="password" value={forgot.confirmNew} onChange={e => setForgot({ ...forgot, confirmNew: e.target.value })} />
                                {error && <div className="setpin-error" style={{ marginBottom: 10 }}>{error}</div>}
                                <button className="btn-primary-setpin auth-btn-submit" type="submit">Reset Password</button>
                            </form>
                        </div>
                    </div>
                )}
                {/* Change Password Modal */}
                {showChange && (
                    <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                        <div className="modal-content auth-modal-content">
                            <button className="modal-close" onClick={() => setShowChange(false)} aria-label="Close">&times;</button>
                            <h2 className="auth-modal-title">Change Password</h2>
                            <form onSubmit={handleChange} autoComplete="off">
                                <AuthInput icon={<FaLock />} placeholder="Old Password" type="password" value={change.old} onChange={e => setChange({ ...change, old: e.target.value })} />
                                <AuthInput icon={<FaLock />} placeholder="New Password" type="password" value={change.new} onChange={e => setChange({ ...change, new: e.target.value })} />
                                <AuthInput icon={<FaLock />} placeholder="Confirm New Password" type="password" value={change.confirm} onChange={e => setChange({ ...change, confirm: e.target.value })} />
                                {error && <div className="setpin-error" style={{ marginBottom: 10 }}>{error}</div>}
                                <button className="btn-primary-setpin auth-btn-submit" type="submit">Change Password</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
