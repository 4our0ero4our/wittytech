"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FundWalletModal from "../../../components/FundWalletModal";
import { FaIdCard } from "react-icons/fa";

const VERIFICATION_OPTIONS = [
    {
        label: "NIN Number",
        value: "nin",
        amount: 10,
        fields: [
            { label: "NIN Number", name: "ninNumber", type: "text", placeholder: "Enter NIN Number" }
        ]
    },
    {
        label: "Phone Number",
        value: "phone",
        amount: 12,
        fields: [
            { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Enter Phone Number" }
        ]
    },
    {
        label: "Tracking ID",
        value: "tracking",
        amount: 8,
        fields: [
            { label: "Tracking ID", name: "trackingId", type: "text", placeholder: "Enter Tracking ID" }
        ]
    },
    {
        label: "Demographic Information",
        value: "demographic",
        amount: 15,
        fields: [
            { label: "First Name", name: "firstName", type: "text", placeholder: "Enter First Name" },
            { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter Last Name" },
            { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
            { label: "Date of Birth", name: "dob", type: "date" }
        ]
    }
];

const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
const HAS_PIN = true; // Simulate if user has set a PIN

export default function VerifyNINPage() {
    const [selected, setSelected] = useState(VERIFICATION_OPTIONS[0]);
    const [form, setForm] = useState({});
    const [pin, setPin] = useState("");
    const [showPinModal, setShowPinModal] = useState(!HAS_PIN);
    const [showFundModal, setShowFundModal] = useState(false);
    const router = useRouter();

    const handleSelect = (option) => {
        setSelected(option);
        setForm({});
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePinChange = (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!HAS_PIN) {
            setShowPinModal(true);
            return;
        }
        if (SIMULATED_WALLET_BALANCE < selected.amount) {
            alert("Insufficient balance! Please fund your wallet.");
            return;
        }
        alert("Verification submitted! (Simulated)");
    };

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaIdCard size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">NIN Verification</h1>
                    <div className="service-desc">Verify a National Identity Number (NIN) using your preferred method. Enter the required details and your transaction PIN.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">${selected.amount}</span>
            </div>
            {SIMULATED_WALLET_BALANCE < selected.amount && (
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
            <div className="verifynin-container">
                {/* <h1>Verify NIN</h1> */}
                <p className="verifynin-subtext">Please select your preferred verification method</p>
                <div className="verifynin-options">
                    {VERIFICATION_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className={`verifynin-option${selected.value === option.value ? " selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name="verificationType"
                                checked={selected.value === option.value}
                                onChange={() => handleSelect(option)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

                <form className="setpin-form" onSubmit={handleSubmit}>
                    {selected.value !== "demographic" ? (
                        <div className="ninvalidation-row">
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
                    ) : (
                        <div className="ninvalidation-row" style={{ flexWrap: 'wrap' }}>
                            <div className="setpin-field" style={{ flex: 1, minWidth: 180 }}>
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
                            <div className="setpin-field" style={{ flex: 1, minWidth: 180 }}>
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
                            <div className="setpin-field" style={{ flex: 1, minWidth: 180 }}>
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender || ""}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="setpin-field" style={{ flex: 1, minWidth: 180 }}>
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={form.dob || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="setpin-field" style={{ flex: 1, minWidth: 180 }}>
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
                    )}
                    <div className="verifynin-summary">
                        <span>Selected Verification Type: <b>{selected.label}</b></span>
                        <span>Amount to be charged: <b>${selected.amount}</b></span>
                    </div>
                    <button
                        className="btn-primary-verify"
                        type="submit"
                        disabled={SIMULATED_WALLET_BALANCE < selected.amount}
                    >
                        Verify
                    </button>
                </form>

                {showPinModal && (
                    <div className="modal-backdrop" onClick={() => setShowPinModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Set Transaction PIN</h2>
                            <p>Set your 5-digit transaction PIN to continue.</p>
                            <input
                                type="password"
                                placeholder="Enter 5-digit PIN"
                                value={pin}
                                onChange={handlePinChange}
                                maxLength={5}
                                style={{ marginBottom: 10 }}
                            />
                            <input
                                type="password"
                                placeholder="Re-enter 5-digit PIN"
                                value={pin}
                                onChange={handlePinChange}
                                maxLength={5}
                            />
                            <button
                                className="btn-primary"
                                style={{ marginTop: 10 }}
                                onClick={() => { setShowPinModal(false); alert("PIN set! (Simulated)"); }}
                            >
                                Set PIN
                            </button>
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
        </div>
    );
}
