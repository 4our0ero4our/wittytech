"use client";
import React, { useState } from "react";

const logoSrc = "/Images/WittyTechLogo.jpg"; // Update if your logo is elsewhere

const TABS = [
    {
        key: "license",
        label: "License Onboarding",
        content: (
            <div style={{ fontFamily: 'LexendLight', fontSize: 15 }}>
                <h3 style={{ fontFamily: 'LexendBold', marginBottom: 10 }}>Consent & Authorization Agreement</h3>
                <ol style={{ paddingLeft: 20, marginBottom: 20 }}>
                    <li>NIMC recommends that NIN modifications be done personally by the NIN owner using their own device. However, by using this platform, you confirm that due to illiteracy or difficulty using the official portal, you voluntarily authorize us to proceed with the modification on your behalf, despite NIMC's guideline.</li>
                    <li>You confirm that you are either the NIN owner or have full consent and authorization from the NIN owner to act on their behalf, regardless of the device being used.</li>
                    <li>If in the future, NIMC enforces a rule that modifications must strictly be done on the owner's device, this platform may no longer be able to process such requests unless compliant access is available.</li>
                    <li>I agree to pay the platform fixed service fee and authorize the platform to use any method or technology necessary to complete my modification even uploading document the platform wishes.</li>
                    <li>Alias Emails: This platform uses alias email addresses for all modifications. If I prefer to use my own email, I must request an email update directly from NIMC after the modification is complete. If login credentials are provided upon request, I agree to use them exactly as given and understand that I must initiate a delinking request with NIMC if I intend to use the account on a different device. Any unauthorized changes that may compromise the account are strictly prohibited, and the platform bears no responsibility for any resulting issues.</li>
                    <li>Update Delays: Modifications reflect immediately on the NIMC and immigration portal, but banks and SIM providers may delay syncing. If I need updates urgently for banking, I understand I should not proceed.</li>
                    <li>Non-Withdrawal Policy: Wallet funds are non-withdrawable. This platform is designed for agents using it as part of their business, not as a banking tool.</li>
                    <li>Failed Services: If a service fails, the payment is refunded to my wallet but still cannot be withdrawn.</li>
                    <li>No Double Submission: I will not submit the same request on another platform while it is being processed here. Doing so forfeits my payment due to processing costs.</li>
                    <li>Third-Party Authorization: If I am submitting on behalf of someone else, I confirm that the NIN owner has authorized me to access and request modification of their details.</li>
                    <li>This agreement applies to all past, current, and future modification requests submitted through this platform.</li>
                    <li>When we make changes to your NIN, these updates are immediately reflected in the NIMC database and the immigration portal. However, please be aware that banks and SIM card providers do not read real-time information; they save records, and it takes a longer time for these updates to be reflected in their systems. If you are modifying your NIN primarily for bank purposes and cannot afford to wait for these updates, we advise you not to proceed with the modification at this time.</li>
                    <li>If there is a delay, issue, or network failure from NIMC, I agree to wait patiently until NIMC resolves the issue. I understand that submitting during such periods may result in failure, and I should not send new requests until the issue is fixed.</li>
                </ol>
                <p style={{ marginBottom: 10 }}>
                    If you can abide by these terms, click on <b>"I Agree"</b>. If not, click on <b>"Not Agreed"</b>.
                </p>
            </div>
        ),
    },
    {
        key: "nin",
        label: "NIN Verification",
        content: (
            <div style={{ fontFamily: 'LexendLight', fontSize: 15 }}>
                <h3 style={{ fontFamily: 'LexendBold', marginBottom: 10 }}>NIN Verification Consent</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
                    <li>You authorize this platform to verify your NIN details with the relevant authorities.</li>
                    <li>All information provided must be accurate and truthful.</li>
                    <li>You understand that verification results are subject to the data available from NIMC.</li>
                    <li>Service fees are non-refundable once verification is processed.</li>
                </ul>
                <p style={{ marginBottom: 10 }}>
                    By clicking <b>"I Agree"</b>, you consent to the above terms for NIN verification.
                </p>
            </div>
        ),
    },
    {
        key: "bvn",
        label: "BVN Verification",
        content: (
            <div style={{ fontFamily: 'LexendLight', fontSize: 15 }}>
                <h3 style={{ fontFamily: 'LexendBold', marginBottom: 10 }}>BVN Verification Consent</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
                    <li>You authorize this platform to verify your BVN details with the relevant authorities.</li>
                    <li>All information provided must be accurate and truthful.</li>
                    <li>Service fees are non-refundable once verification is processed.</li>
                </ul>
                <p style={{ marginBottom: 10 }}>
                    By clicking <b>"I Agree"</b>, you consent to the above terms for BVN verification.
                </p>
            </div>
        ),
    },
    {
        key: "funding wallet",
        label: "Funding Wallet",
        content: (
            <div style={{ fontFamily: 'LexendLight', fontSize: 15 }}>
                <h3 style={{ fontFamily: 'LexendBold', marginBottom: 10 }}>Funding Wallet</h3>
                <p style={{ marginBottom: 10 }}>
                    Note Money deposited cannot be withdrawn to your bank account, can only be used for another service. Please review our policy for more details
                </p>
                <p style={{ marginBottom: 10 }}>
                    By clicking <b>"I Agree"</b>, you consent to the above terms for funding your wallet.
                </p>
            </div>
        ),
    },
];

export default function TermsAndConditionsPage() {
    const [activeTab, setActiveTab] = useState(TABS[0].key);

    return (
        <div style={{ maxWidth: 1500, margin: "40px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #0001", padding: 0, fontFamily: 'LexendLight', minHeight: 500 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px 0 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img src={logoSrc} alt="Company Logo" style={{ width: 60, height: 32, objectFit: "contain" }} />
                    <div>
                        <h2 style={{ margin: 0, fontFamily: 'LexendBold', fontSize: 22, color: '#007bff' }}>Terms & Consent</h2>
                        <div style={{ color: '#888', fontSize: 14 }}>Review and accept the terms for your selected service.</div>
                    </div>
                </div>
                {/* Optionally, a close button could be here if this is a modal */}
            </div>
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #eee", margin: "24px 0 0 0", padding: "0 32px" }}>
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === tab.key ? "3px solid #007bff" : "3px solid transparent",
                            color: activeTab === tab.key ? "#007bff" : "#222",
                            fontWeight: activeTab === tab.key ? 700 : 400,
                            fontFamily: 'LexendBold',
                            fontSize: 16,
                            padding: "12px 24px",
                            cursor: "pointer",
                            outline: "none",
                            transition: "border-bottom 0.2s"
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Content */}
            <div style={{ padding: "32px", minHeight: 320 }}>
                {TABS.find(tab => tab.key === activeTab)?.content}
            </div>
            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "0 0 32px 0" }}>
                <button
                    style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 32px",
                        fontFamily: 'LexendBold',
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px #007bff22"
                    }}
                >
                    I Agree
                </button>
                <button
                    style={{
                        background: "#fff",
                        color: "#007bff",
                        border: "1.5px solid #007bff",
                        borderRadius: 8,
                        padding: "12px 32px",
                        fontFamily: 'LexendBold',
                        fontSize: 16,
                        cursor: "pointer"
                    }}
                >
                    Not Agreed
                </button>
            </div>
        </div>
    );
}
