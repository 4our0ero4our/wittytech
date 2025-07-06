"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import FundWalletModal from "@/components/FundWalletModal";

export default function IpeClearancePage() {
    const [trackingId, setTrackingId] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [showFundModal, setShowFundModal] = useState(false);
    const router = useRouter();

    const handleTrackingIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setTrackingId(value);
        setError("");
    };
    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
        setError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (trackingId.length !== 15) {
            setError("Tracking ID must be exactly 15 digits.");
            return;
        }
        if (pin.length !== 5) {
            setError("Transaction PIN must be exactly 5 digits.");
            return;
        }
        setTrackingId("");
        setPin("");
        setError("");
        setShowSuccessOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowSuccessOverlay(false);
        router.push("/dashboard");
    };

    const showTrackingIdWarning = trackingId.length > 0 && trackingId.length !== 15;

    const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
    const SERVICE_COST = 14; // Adjust as needed

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaUserShield size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">IPE Clearance</h1>
                    <div className="service-desc">Request IPE Clearance by submitting your Tracking ID and Transaction PIN.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">$10</span>
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
            <form className="setpin-form" onSubmit={handleSubmit}>
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Tracking ID</label>
                        <input
                            type="text"
                            placeholder="Enter Tracking ID"
                            value={trackingId}
                            onChange={handleTrackingIdChange}
                            maxLength={15}
                            required
                        />
                        {showTrackingIdWarning && (
                            <span style={{ color: '#d32f2f', fontSize: '0.93em', marginTop: 2, display: 'block' }}>
                                Tracking ID must be exactly 15 digits
                            </span>
                        )}
                    </div>
                    <div className="setpin-field">
                        <label>Transaction PIN</label>
                        <input
                            type="password"
                            placeholder="Enter 5-digit Transaction PIN"
                            value={pin}
                            onChange={handlePinChange}
                            maxLength={5}
                            required
                        />
                    </div>
                </div>
                {error && <div className="setpin-error">{error}</div>}
                <button className="btn-primary-setpin" type="submit">Request IPE Clearance</button>
            </form>
            {showSuccessOverlay && (
                <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                    <div className="modal-content success-modal" style={{ textAlign: 'center', padding: '36px 24px', border: '2px solid #007bff' }}>
                        <button className="modal-close" onClick={handleCloseOverlay} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: '2rem', color: '#007bff', cursor: 'pointer', lineHeight: 1, zIndex: 1 }}>&times;</button>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                            <div style={{ background: '#eaf3ff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19" cy="19" r="19" fill="#007bff" />
                                    <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <h2 style={{ color: '#007bff', marginBottom: 10, fontFamily: 'LexendExtraBold' }}>Your request has been successfully submitted</h2>
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
