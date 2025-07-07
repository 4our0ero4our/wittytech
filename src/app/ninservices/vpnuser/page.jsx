"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import FundWalletModal from "@/components/FundWalletModal";

const SERVICE_COST = 20;
const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
const HAS_PIN = true; // Simulate if user has set a PIN

export default function VpnUserCreationPage() {
    const [showFundModal, setShowFundModal] = useState(false);
    const [form, setForm] = useState({});
    const [pin, setPin] = useState("");
    const [passport, setPassport] = useState(null);
    const [error, setError] = useState("");
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
    };

    const handlePassportChange = (e) => {
        setPassport(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!HAS_PIN) {
            setError("You must set a transaction PIN first.");
            return;
        }
        if (SIMULATED_WALLET_BALANCE < SERVICE_COST) {
            setError("");
            setShowSuccessOverlay(false);
            return;
        }
        const requiredFields = ["firstName", "lastName", "phone", "email", "lga", "nin"];
        for (const field of requiredFields) {
            if (!form[field]) {
                setError("All fields are required.");
                return;
            }
        }
        if (!passport) {
            setError("Passport is required.");
            return;
        }
        if (pin.length !== 5) {
            setError("PIN must be 5 digits.");
            return;
        }
        setError("");
        setShowSuccessOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowSuccessOverlay(false);
        router.push("/dashboard");
    };

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaUserPlus size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">VPN User Creation</h1>
                    <div className="service-desc">Fill in the details below to request VPN user creation. All fields are required.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">${SERVICE_COST}</span>
            </div>
            {SIMULATED_WALLET_BALANCE < SERVICE_COST && (
                <div className="verifynin-alert">
                    Your account is too low, please fund wallet and try again!!!
                    <button
                        type="button"
                        className="btn-fund"
                        onClick={() => setShowFundModal(true)}
                    >
                        Fund Wallet
                    </button>
                </div>
            )}
            <form className="setpin-form ninvalidation-form" onSubmit={handleSubmit}>
                <div className="vpnuser-form-row">
                    <div className="setpin-field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={form.firstName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={form.lastName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="vpnuser-form-row">
                    <div className="setpin-field">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={form.phone || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={form.email || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="vpnuser-form-row">
                    <div className="setpin-field">
                        <label>LGA</label>
                        <input
                            type="text"
                            name="lga"
                            placeholder="Enter LGA"
                            value={form.lga || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>NIN</label>
                        <input
                            type="text"
                            name="nin"
                            placeholder="Enter NIN"
                            value={form.nin || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="vpnuser-form-row">
                    <div className="setpin-field">
                        <label>Passport</label>
                        <input
                            type="file"
                            name="passport"
                            accept="image/*,application/pdf"
                            onChange={handlePassportChange}
                            required
                        />
                    </div>
                </div>
                <div className="vpnuser-form-row">
                    <div className="setpin-field">
                        <label>Transaction PIN</label>
                        <input
                            type="password"
                            name="pin"
                            placeholder="Enter 5-digit PIN"
                            value={pin}
                            onChange={handlePinChange}
                            maxLength={5}
                            required
                        />
                    </div>
                </div>
                {error && <div className="setpin-error">{error}</div>}
                <button
                    className="btn-primary-setpin"
                    style={{
                        opacity: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 0.5 : 1,
                        cursor: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 'not-allowed' : 'pointer'
                    }}
                    disabled={SIMULATED_WALLET_BALANCE < SERVICE_COST}
                    type="submit"
                >
                    Request VPN User
                </button>
            </form>
            {showSuccessOverlay && (
                <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                    <div className="modal-content success-modal" style={{ textAlign: 'center', padding: '36px 24px', border: '2px solid #7b2ff2' }}>
                        <button className="modal-close" onClick={handleCloseOverlay} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: '2rem', color: '#7b2ff2', cursor: 'pointer', lineHeight: 1, zIndex: 1 }}>&times;</button>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                            <div style={{ background: '#eaf3ff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19" cy="19" r="19" fill="#7b2ff2" />
                                    <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <h2 style={{ color: '#7b2ff2', marginBottom: 10, fontFamily: 'LexendExtraBold' }}>Your VPN user request has been successfully submitted</h2>
                        <button className="btn-primary" style={{ marginTop: 18, minWidth: 120 }} onClick={handleCloseOverlay}>Okay</button>
                    </div>
                </div>
            )}
            {showFundModal && (
                <FundWalletModal
                    open={showFundModal}
                    onClose={() => setShowFundModal(false)}
                    account={{
                        bank: "Palmpay",
                        bankLogo: "/banks/gtbank.png",
                        accountNumber: "1234567890",
                        accountName: "Alex Doe"
                    }}
                />
            )}
        </div>
    );
}
