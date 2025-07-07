"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";
import FundWalletModal from "@/components/FundWalletModal";

export default function BVNVerificationPage() {
    const [bvn, setBvn] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [showFundModal, setShowFundModal] = useState(false);
    const router = useRouter();

    const handleBvnChange = (e) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, "");
        setBvn(value);
        setError("");
    };
    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
        setError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (bvn.length !== 11) {
            setError("BVN must be exactly 11 digits.");
            return;
        }
        if (pin.length !== 5) {
            setError("Transaction PIN must be exactly 5 digits.");
            return;
        }
        setSuccess(true);
        setBvn("");
        setPin("");
        setError("");
        setShowSuccessOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowSuccessOverlay(false);
        router.push("/dashboard");
    };

    const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
    const SERVICE_COST = 14;

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaUserEdit size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">BVN Verification</h1>
                    <div className="service-desc">Verify your BVN by submitting your BVN number and Transaction PIN.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">$12</span>
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
                        <label>BVN Number</label>
                        <input
                            type="text"
                            placeholder="Enter BVN Number"
                            value={bvn}
                            onChange={handleBvnChange}
                            maxLength={11}
                            required
                        />
                        {bvn.length > 0 && bvn.length < 11 && <div className="verifynin-subtext">
                            <p style={{ color: 'red', fontFamily: 'LexendLight' }}>
                                <b>Note:</b> BVN number must be exactly 11 digits.
                            </p>
                        </div>}
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
                <button
                    className="btn-primary-setpin"
                    style={{
                        opacity: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 0.5 : 1,
                        cursor: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 'not-allowed' : 'pointer'
                    }}
                    disabled={SIMULATED_WALLET_BALANCE < SERVICE_COST}
                    type="submit"
                >
                    Verify BVN
                </button>
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
        </div>
    );
} 