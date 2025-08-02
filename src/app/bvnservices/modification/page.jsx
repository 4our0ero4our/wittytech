"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserEdit, FaIdCard, FaUserPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import FundWalletModal from "@/components/FundWalletModal";

const MODIFICATION_OPTIONS = [
    {
        label: "Name",
        value: "name",
        amount: 14,
        icon: <FaUserEdit color="#007bff" size={22} />,
        fields: [
            { label: "Old Name", name: "oldName", type: "text", placeholder: "Enter Old Name" },
            { label: "New Name", name: "newName", type: "text", placeholder: "Enter New Name" },
        ],
    },
    {
        label: "Date of Birth",
        value: "dob",
        amount: 14,
        icon: <FaIdCard color="#007bff" size={22} />,
        fields: [
            { label: "Old Date of Birth", name: "oldDob", type: "date", placeholder: "Enter Old DOB" },
            { label: "New Date of Birth", name: "newDob", type: "date", placeholder: "Enter New DOB" },
        ],
    },
    {
        label: "Address",
        value: "address",
        amount: 14,
        icon: <FaLocationDot color="#007bff" size={22} />,
        fields: [
            { label: "Old Address", name: "oldAddress", type: "text", placeholder: "Enter Old Address" },
            { label: "New Address", name: "newAddress", type: "text", placeholder: "Enter New Address" },
        ],
    },
    {
        label: "Phone Number",
        value: "phone",
        amount: 14,
        icon: <FaUserPlus color="#007bff" size={22} />,
        fields: [
            { label: "Old Phone Number", name: "oldPhone", type: "tel", placeholder: "Enter Old Phone Number" },
            { label: "New Phone Number", name: "newPhone", type: "tel", placeholder: "Enter New Phone Number" },
        ],
    },
];

const ENROLLMENT_CENTERS = [
    { value: '', label: 'Select Enrollment Center', price: 0 },
    { value: 'AGENCY', label: 'AGENCY', price: 10000 },
    { value: 'FIDELITY BANK', label: 'FIDELITY BANK', price: 10000 },
    { value: 'FIRST BANK', label: 'FIRST BANK', price: 10000 },
    { value: 'KEYSTONE BANK', label: 'KEYSTONE BANK', price: 10000 },
    { value: 'HERITAGE BANK', label: 'HERITAGE BANK', price: 10000 },
    { value: 'MACROFINANCE', label: 'MACROFINANCE', price: 10000 },
    { value: 'UNITY BANK', label: 'UNITY BANK', price: 10000 },
    { value: 'AGRIC BANK', label: 'AGRIC BANK', price: 10000 },
    { value: 'LAPO BANK', label: 'LAPO BANK', price: 7000 },
    { value: 'ENTERPRISE BANK', label: 'ENTERPRISE BANK', price: 7000 },
];

const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
const HAS_PIN = true; // Simulate if user has set a PIN

export default function BvnModificationPage() {
    const [selected, setSelected] = useState(MODIFICATION_OPTIONS[0]);
    const [form, setForm] = useState({});
    const [nin, setNin] = useState("");
    const [pin, setPin] = useState("");
    const [enrollmentCenter, setEnrollmentCenter] = useState(ENROLLMENT_CENTERS[0]);
    const [showFundModal, setShowFundModal] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const router = useRouter();

    const handleSelect = (option) => {
        setSelected(option);
        setForm({});
        setError("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNinChange = (e) => {
        setNin(e.target.value.replace(/\D/g, "").slice(0, 11));
    };

    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
    };

    const handleEnrollmentCenterChange = (e) => {
        const center = ENROLLMENT_CENTERS.find(c => c.value === e.target.value);
        setEnrollmentCenter(center || ENROLLMENT_CENTERS[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!HAS_PIN) {
            setError("You must set a transaction PIN first.");
            return;
        }
        if (!enrollmentCenter.value) {
            setError("Please select an enrollment center.");
            return;
        }
        if (SIMULATED_WALLET_BALANCE < enrollmentCenter.price) {
            setShowFundModal(true);
            return;
        }
        if (nin.length !== 11) {
            setError("NIN number must be exactly 11 digits.");
            return;
        }
        // Validate all fields
        for (const field of selected.fields) {
            if (!form[field.name]) {
                setError("All fields are required.");
                return;
            }
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
                <div className="service-header-icon"><FaUserEdit size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">BVN Modification</h1>
                    <div className="service-desc">Select the BVN data you want to modify and fill in the required details.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">
                    {enrollmentCenter.value ? `₦${enrollmentCenter.price.toLocaleString()}` : '--'}
                </span>
            </div>
            {SIMULATED_WALLET_BALANCE < enrollmentCenter.price && (
                <div className="verifynin-alert" style={{ marginTop: 18 }}>
                    <span>Insufficient balance! Please <b>fund your wallet</b> to continue.</span>
                    <button
                        type="button"
                        className="btn-fund"
                        onClick={() => setShowFundModal(true)}
                    >
                        Fund Wallet
                    </button>
                </div>
            )}
            <p className="verifynin-subtext">Please select the data you want to modify</p>
            <div className="verifynin-options">
                {MODIFICATION_OPTIONS.map((option) => (
                    <label
                        key={option.value}
                        className={`verifynin-option${selected.value === option.value ? " selected" : ""}`}
                    >
                        <input
                            type="radio"
                            name="modificationType"
                            checked={selected.value === option.value}
                            onChange={() => handleSelect(option)}
                        />
                        <span style={{ marginRight: 8 }}>{option.icon}</span>
                        {option.label}
                    </label>
                ))}
            </div>

            <form className="setpin-form" onSubmit={handleSubmit}>
                <div className="ninvalidation-row">
                    <div className="setpin-field" style={{ width: '100%' }}>
                        <label>Enrollment Center</label>
                        <select
                            name="enrollmentCenter"
                            value={enrollmentCenter.value}
                            onChange={handleEnrollmentCenterChange}
                            required
                        >
                            {ENROLLMENT_CENTERS.map(center => (
                                <option key={center.value} value={center.value} data-price={center.price}>
                                    {center.label}
                                    {center.price ? ` (₦${center.price.toLocaleString()})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="ninvalidation-row nin-grid-2x2">
                    <div className="setpin-field">
                        <label>NIN Number</label>
                        <input
                            type="text"
                            name="nin"
                            placeholder="Enter BVN Number"
                            value={nin}
                            onChange={handleNinChange}
                            maxLength={11}
                            required
                        />
                        {nin.length > 0 && nin.length < 11 && (
                            <div className="verifynin-subtext">
                                <p style={{ color: 'red', fontFamily: 'LexendLight' }}>
                                    <b>Note:</b> BVN must be exactly 11 digits.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="setpin-field">
                        <label>{selected.fields[0].label}</label>
                        <input
                            type={selected.fields[0].type}
                            name={selected.fields[0].name}
                            placeholder={selected.fields[0].placeholder}
                            value={form[selected.fields[0].name] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>{selected.fields[1].label}</label>
                        <input
                            type={selected.fields[1].type}
                            name={selected.fields[1].name}
                            placeholder={selected.fields[1].placeholder}
                            value={form[selected.fields[1].name] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                {showFundModal && (
                    <div className="verifynin-alert" style={{ marginTop: 18 }}>
                        <span>Insufficient balance! Please <b>fund your wallet</b> to continue.</span>
                    </div>
                )}
                {error && <div className="setpin-error">{error}</div>}
                <button
                    className="btn-primary-setpin"
                    style={{
                        opacity: SIMULATED_WALLET_BALANCE < enrollmentCenter.price ? 0.5 : 1,
                        cursor: SIMULATED_WALLET_BALANCE < enrollmentCenter.price ? 'not-allowed' : 'pointer'
                    }}
                    disabled={SIMULATED_WALLET_BALANCE < enrollmentCenter.price}
                    type="submit"
                >
                    Request Modification
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
