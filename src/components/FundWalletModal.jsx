import { useState } from "react";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import PalmpayLogo from "../../public/Images/PalmpayLogo.png";

export default function FundWalletModal({ open, onClose, account }) {
    const [copied, setCopied] = useState(false);

    if (!open) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(account.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content fundwallet-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                <img
                    src={PalmpayLogo.src}
                    alt={account.bank}
                    className="fundwallet-bank-logo"
                />
                <h2 style={{ color: "#007bff", marginBottom: 8 }}>Fund Your Wallet</h2>
                <div style={{ marginBottom: 16, color: "#222" }}>
                    <div style={{ fontWeight: 600 }}>{account.bank}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0" }}>
                        <span style={{ fontSize: "1.2em", letterSpacing: 1 }}>{account.accountNumber}</span>
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
                    <div style={{ fontSize: "0.95em", color: "#666" }}>
                        Account Name: <b>{account.accountName}</b>
                    </div>
                </div>
                <div style={{ fontSize: "0.95em", color: "#555", marginBottom: 16 }}>
                    Transfer funds to this account to instantly top up your wallet.
                </div>
                <a href="/termsandconditions" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#007bff", fontSize: "0.95em", marginTop: '20px', fontFamily: "LexendExtraBold", display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                    Read the Terms and Conditions <FaExternalLinkAlt />
                </a>
            </div>
        </div>
    );
}
