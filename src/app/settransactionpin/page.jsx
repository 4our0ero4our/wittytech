"use client";
import React, { useState } from "react";
import { FaKey } from "react-icons/fa";

export default function SetTransactionPinPage() {
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
        setError("");
    };
    const handleConfirmPinChange = (e) => {
        setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 5));
        setError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin.length !== 5) {
            setError("PIN must be exactly 5 digits.");
            return;
        }
        if (pin !== confirmPin) {
            setError("PINs do not match.");
            return;
        }
        setSuccess(true);
        setPin("");
        setConfirmPin("");
        setError("");
        setTimeout(() => setSuccess(false), 2500);
    };

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaKey size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">Set Transaction PIN</h1>
                    <div className="service-desc">Set or reset your 5-digit transaction PIN. This PIN will be required for all transactions.</div>
                </div>
            </div>
            <form className="setpin-form" onSubmit={handleSubmit}>
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>New PIN</label>
                        <input
                            type="password"
                            placeholder="Enter 5-digit PIN"
                            value={pin}
                            onChange={handlePinChange}
                            maxLength={5}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Confirm New PIN</label>
                        <input
                            type="password"
                            placeholder="Re-enter 5-digit PIN"
                            value={confirmPin}
                            onChange={handleConfirmPinChange}
                            maxLength={5}
                            required
                        />
                    </div>
                </div>
                {error && <div className="setpin-error">{error}</div>}
                {success && <div className="setpin-success">PIN set successfully!</div>}
                <button className="btn-primary-setpin" type="submit">Set PIN</button>
            </form>
        </div>
    );
} 