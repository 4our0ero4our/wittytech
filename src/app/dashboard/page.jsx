'use client'
import BvnVerificationImg from '../../../public/Images/BvnVerificationImg.png';
import NinVerificationImg from '../../../public/Images/NinVerificationImg.png';
import FundWalletImg from '../../../public/Images/FundWalletImg.png';
import SettingsImg from '../../../public/Images/SettingsImg.png';
import ViewTransactionsImg from '../../../public/Images/ViewTransactionsImg.png';
import WithdrawFundsImg from '../../../public/Images/WithdrawFundsImg.png';
import YesAcctWalletImg from '../../../public/Images/YesAcctWalletImg.png';
import PalmpayLogo from '../../../public/Images/PalmpayLogo.png';
import NIMCImage from '../../../public/Images/NIMCImage.png';
import BVNImage from '../../../public/Images/BVNImage.jpg';
import { FaRegCopy } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../components/Modal";
import IntroModal from "../../components/IntroModal";


const quickActions = [
    { label: "NIN Verification", img: NIMCImage },
    { label: "NIN With Phone", img: NIMCImage },
    { label: "BVN Verification", img: BVNImage },
    { label: "BVN CARD", img: BVNImage },
    { label: "IPE Clearance", img: BvnVerificationImg },
    { label: "PIN Set", img: SettingsImg },
    { label: "Validation", img: BvnVerificationImg },
    { label: "Modification", img: BvnVerificationImg },
    { label: "Transactions", img: BvnVerificationImg },
    { label: "Verifications", img: BvnVerificationImg },
    { label: "Instant IPE Clearance", img: BvnVerificationImg },
    { label: "Instant Validations", img: BvnVerificationImg },
];

const user = {
    name: "John Doe",
    username: "johndoe",
    role: "End User",
    referral: "https://example.com/referral",
};

function AccountNumberRow({ accountNumber, copyColor }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", gap: 8 }}>
            <span>{accountNumber}</span>
            <button
                onClick={handleCopy}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#007bff",
                    fontSize: "1.1em",
                    padding: 0,
                    flexDirection: 'row',
                }}
                aria-label="Copy account number"
            >
                <FaRegCopy style={{ color: copyColor }} />
            </button>
            {copied && <span style={{ color: copyColor, fontSize: "0.9em" }}>Copied!</span>}
        </div>
    );
}

function FundWalletModal({ open, onClose, account }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(account.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ textAlign: "center" }}>
                <img
                    src={account.bankLogo}
                    alt={account.bank}
                    style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        borderRadius: 12,
                        marginBottom: 12,
                        background: "#f8faff",
                        border: "1px solid #e0e0e0"
                    }}
                />
                <h2 style={{ color: "#007bff", marginBottom: 8, fontFamily: 'LexendBold' }}>Fund Your Wallet</h2>
                <div style={{ marginBottom: 16, color: "#222" }}>
                    <div style={{ fontWeight: 600, fontFamily: 'LexendBold', fontSize: '1.2em' }}>{account.bank}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0" }}>
                        <span style={{ fontSize: "1.2em", letterSpacing: 1, fontFamily: 'LexendBold' }}>{account.accountNumber}</span>
                        <button
                            onClick={handleCopy}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#007bff",
                                fontSize: "1.1em",
                                padding: 0,
                            }}
                            aria-label="Copy account number"
                        >
                            <FaRegCopy />
                        </button>
                        {copied && <span style={{ color: "#007bff", fontSize: "0.9em" }}>Copied!</span>}
                    </div>
                    <div style={{ fontSize: "0.95em", color: "#666", fontFamily: 'LexendLight' }}>
                        Account Name: <b style={{ fontFamily: 'LexendBold' }}>{account.accountName}</b>
                    </div>
                </div>
                <div style={{ fontSize: "0.95em", color: "#555", fontFamily: 'LexendLight' }}>
                    Transfer funds to this account to instantly top up your wallet.
                </div>
            </div>
        </Modal>
    );
}

export default function DashboardPage() {
    const virtualAccount = {
        accountNumber: "1234567890",
        bank: "Palmpay",
        accountName: "John Doe",
        bankLogo: PalmpayLogo.src,
    };
    const [showFundModal, setShowFundModal] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            <IntroModal open={showIntro} onClose={() => setShowIntro(false)} />
            <div className="dashboard-container">
                <section className="dashboard-header">
                    <h1>Welcome to WittyTech Platform, {user.name}</h1>
                    <p className="referral-link">Your referral link: <AccountNumberRow accountNumber={user.referral} copyColor='#007bff' /></p>
                    <div className="dashboard-actions">
                        <button className="btn-primary" onClick={() => setShowFundModal(true)}>
                            Fund Wallet
                        </button>
                        <button className="btn-outline">Join Whatsapp Group</button>
                    </div>
                </section>

                <section className="user-info-card">
                    <div className="user-info-row">
                        <span className="user-avatar">{user.name[0]}</span>
                        <div>
                            <div className="user-username">Username: {user.username}</div>
                            <div className="user-role">{user.role}</div>
                        </div>
                    </div>
                    {!virtualAccount?.accountNumber && (
                        <div className="create-account-card">
                            <div>
                                <strong>Create a Virtual Account</strong>
                                <p>Create a virtual account and a Palmpay account for quicker transactions.</p>
                            </div>
                            <button className="btn-primary">Create Account</button>
                        </div>
                    )}
                </section>

                <section className="virtual-account-info">
                    <h2>Virtual Account Information</h2>
                    {virtualAccount?.accountNumber ? (
                        <div className="account-details">
                            <div>
                                <strong style={{ fontFamily: 'LexendBold' }}>Account Generated</strong>
                                <div style={{ fontFamily: 'LexendLight', flexDirection: 'row' }}>Account Number: <AccountNumberRow accountNumber={virtualAccount.accountNumber} copyColor='#fff' /></div>
                                <div style={{ fontFamily: 'LexendLight' }}>Account Name: {virtualAccount.accountName}</div>
                                <div style={{ fontFamily: 'LexendLight' }}>Bank: {virtualAccount.bank}</div>
                            </div>
                            <img src={PalmpayLogo.src} className="bank-logo" alt="Wallet" />
                        </div>
                    ) : (
                        <div className="account-details">
                            <div>
                                <strong>No Account Generated Yet</strong>
                                <div>Generate your virtual account to start receiving payments.</div>
                            </div>
                            <img src={PalmpayLogo.src} className="bank-logo" alt="Wallet" />
                        </div>
                    )}
                </section>

                <section className="quick-actions-section">
                    <h2>Quick Actions</h2>
                    <div className="quick-actions-grid">
                        {quickActions.map((action) => (
                            <div className="quick-action-card" key={action.label}>
                                <img src={action.img.src} alt={action.label} />
                                <span>{action.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
                <FundWalletModal
                    open={showFundModal}
                    onClose={() => setShowFundModal(false)}
                    account={{
                        bank: virtualAccount.bank,
                        bankLogo: virtualAccount.bankLogo,
                        accountNumber: virtualAccount.accountNumber,
                        accountName: user.name,
                    }}
                />
            </div>
        </>
    );
}

