import React from "react";
import WittyTechLogo from "../../public/Images/WittyTechLogo.jpg"; // adjust path as needed

export default function IntroModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content intro-modal"
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                <div className="intro-logo-wrap">
                    <img src={WittyTechLogo.src} alt="Witty's Tech Logo" className="intro-logo" />
                </div>
                <h2 className="intro-title">
                    Welcome to <span className="brand">Witty's Tech</span> – Your Trusted Digital Service Hub!
                </h2>
                <p className="intro-lead">
                    At Witty's Tech, we make identity and business services simple, fast, and reliable.<br />
                    Whatever you need, <b>We've got it.</b>
                </p>
                <ul className="intro-list">
                    <li>BVN Services</li>
                    <li>NIN Services</li>
                    <li>Bulk Card Sales</li>
                    <li>CAC Registration &amp; Support</li>
                    <li>Data Verification</li>
                    <li>Modifications &amp; Updates</li>
                </ul>
                <button className="intro-btn" onClick={onClose}>Get Started</button>
            </div>
        </div>
    );
}