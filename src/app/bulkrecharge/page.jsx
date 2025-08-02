"use client";
import React, { useState } from "react";
import { FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const NETWORKS = [
    { label: "MTN", value: "MTN", prices: { 100: 98, 200: 196, 500: 490, 1000: 980 } },
    { label: "GLO", value: "GLO", prices: { 100: 97, 200: 194, 500: 485, 1000: 970 } },
    { label: "Airtel", value: "Airtel", prices: { 100: 99, 200: 198, 500: 495, 1000: 990 } },
    { label: "9Mobile", value: "9Mobile", prices: { 100: 96, 200: 192, 500: 480, 1000: 960 } },
];
const AMOUNTS = [100, 200, 500, 1000];

const USSD_CODES = {
    MTN: "*555*PIN#",
    GLO: "*123*PIN#",
    Airtel: "*126*PIN#",
    "9Mobile": "*222*PIN#",
};

function generateRandomPins(quantity) {
    // Simulate 16-digit PINs
    return Array.from({ length: quantity }, () =>
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("")
    );
}

function saveToHistory(batch) {
    if (typeof window !== 'undefined') {
        const history = JSON.parse(localStorage.getItem("rechargeHistory") || "[]");
        history.unshift(batch);
        localStorage.setItem("rechargeHistory", JSON.stringify(history));
    }
}

function getHistory() {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem("rechargeHistory") || "[]");
    }
    return [];
}

function downloadPinsPDF({ pins, company, network, amount, ussd }) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210, pageHeight = 297;
    const cardWidth = 85, cardHeight = 45;
    const margin = 10;
    const cardsPerRow = 2;
    const cardsPerCol = 5;
    const cardsPerPage = cardsPerRow * cardsPerCol;
    let x = margin, y = margin;
    pins.forEach((pin, i) => {
        // Card background
        doc.setFillColor(0, 123, 255);
        doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4, 'F');
        // Card border
        doc.setDrawColor(0, 123, 255);
        doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4);
        // Company name
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, "bold");
        doc.text(company, x + cardWidth / 2, y + 12, { align: "center" });
        // PIN
        doc.setFontSize(16);
        doc.setFont(undefined, "bold");
        doc.text(pin, x + cardWidth / 2, y + 25, { align: "center" });
        // USSD
        doc.setFontSize(12);
        doc.setFont(undefined, "normal");
        doc.text(`Recharge: ₦{ussd}`, x + cardWidth / 2, y + 34, { align: "center" });
        // Amount
        doc.setFontSize(11);
        doc.text(`₦{Number(amount).toLocaleString()}`, x + cardWidth / 2, y + 41, { align: "center" });
        doc.text(`₦{network}`, x + cardWidth / 2, y + 48, { align: "center" });
        // Move to next card
        if ((i + 1) % cardsPerRow === 0) {
            x = margin;
            y += cardHeight + 7;
            if ((i + 1) % cardsPerPage === 0 && i !== pins.length - 1) {
                doc.addPage();
                x = margin;
                y = margin;
            }
        } else {
            x += cardWidth + 10;
        }
    });
    doc.save(`₦{company}_₦{network}_recharge_cards.pdf`);
}

export default function BulkRechargePage() {
    const [network, setNetwork] = useState("");
    const [networkAmount, setNetworkAmount] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [pins, setPins] = useState([]);
    const [history, setHistory] = useState([]);

    // Load history from localStorage on client-side
    React.useEffect(() => {
        setHistory(getHistory());
    }, []);

    // Simulate backend price fetch
    React.useEffect(() => {
        if (network && networkAmount && quantity) {
            const net = NETWORKS.find((n) => n.value === network);
            const pricePerCard = net?.prices[networkAmount] || 0;
            setAmount(pricePerCard * Number(quantity));
        } else {
            setAmount(0);
        }
    }, [network, networkAmount, quantity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!network) {
            setError("Please select a network.");
            return;
        }
        if (!networkAmount) {
            setError("Please select a network amount.");
            return;
        }
        if (!nameOnCard.trim()) {
            setError("Please enter a name on card.");
            return;
        }
        if (!quantity || isNaN(quantity) || Number(quantity) < 1) {
            setError("Please enter a valid quantity.");
            return;
        }
        setError("");
        const pinList = generateRandomPins(Number(quantity));
        setPins(pinList);
        setSuccess(true);
        // Save to history
        const batch = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            network,
            networkAmount,
            company: nameOnCard,
            quantity,
            amount,
            pins: pinList,
        };
        saveToHistory(batch);
        setHistory(getHistory());
    };

    return (
        <div className="setpin-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaPrint size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">Bulk Recharge Card Printing</h1>
                    <div className="service-desc">Start your own recharge card printing business &amp; earn extra cash!</div>
                </div>
            </div>
            <form className="setpin-form" onSubmit={handleSubmit} style={{ maxWidth: 1500, margin: "0 auto" }}>
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Network</label>
                        <select value={network} onChange={e => setNetwork(e.target.value)} required>
                            <option value="">Select Network</option>
                            {NETWORKS.map(n => (
                                <option key={n.value} value={n.value}>{n.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="setpin-field">
                        <label>Network Amount</label>
                        <select value={networkAmount} onChange={e => setNetworkAmount(e.target.value)} required>
                            <option value="">Select Amount</option>
                            {AMOUNTS.map(a => (
                                <option key={a} value={a}>₦{a.toLocaleString()}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="ninvalidation-row">
                    <div className="setpin-field" style={{ width: "100%" }}>
                        <label>Name on Card</label>
                        <input
                            type="text"
                            value={nameOnCard}
                            onChange={e => setNameOnCard(e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                        <div className="verifynin-subtext" style={{ fontSize: 13, marginTop: 2 }}>
                            Your Company name to show on generated pin
                        </div>
                    </div>
                </div>
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Quantity</label>
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={e => setQuantity(e.target.value.replace(/\D/g, ""))}
                            placeholder="Enter quantity"
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Amount</label>
                        <input
                            type="text"
                            value={amount ? `₦${amount.toLocaleString()}` : ""}
                            readOnly
                            style={{ background: "#f5f5f5", color: "#333", fontWeight: 600 }}
                        />
                    </div>
                </div>
                {error && <div className="setpin-error">{error}</div>}
                <button className="btn-primary-setpin" type="submit" style={{ marginTop: 18 }}>
                    Generate
                </button>
            </form>
            {/* Generated PINs display and PDF download */}
            {pins.length > 0 && (
                <div style={{ margin: "40px auto 0", maxWidth: 700 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <h3 style={{ color: "#007bff", fontFamily: 'LexendBold' }}>Generated Recharge Cards</h3>
                        <button className="btn-primary" onClick={() => downloadPinsPDF({ pins, company: nameOnCard, network, amount: networkAmount, ussd: USSD_CODES[network] })}>
                            Download as PDF
                        </button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                        {pins.map((pin, i) => (
                            <div key={i} style={{ background: "#007bff", color: "#fff", borderRadius: 8, width: 260, minHeight: 90, marginBottom: 18, padding: 16, boxShadow: "0 2px 8px #007bff22", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{nameOnCard}</div>
                                <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: 2, marginBottom: 6 }}>{pin}</div>
                                <div style={{ fontSize: 13, marginBottom: 2 }}>Recharge: <b>{USSD_CODES[network]}</b></div>
                                <div style={{ fontSize: 13 }}>₦{Number(networkAmount).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Recharge History */}
            <div style={{ margin: "60px auto 0", maxWidth: 1500 }}>
                <h3 style={{ color: "#007bff", fontFamily: 'LexendBold', marginBottom: 16 }}>Recharge History</h3>
                {history.length === 0 && <div style={{ color: '#888', fontFamily: 'LexendLight' }}>No recharge history yet.</div>}
                {history.length > 0 && (
                    <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'LexendLight' }}>
                            <thead style={{ background: '#f5f8ff' }}>
                                <tr>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Date</th>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Network</th>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Quantity</th>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Company</th>
                                    <th style={{ padding: 10, textAlign: 'left' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((batch) => (
                                    <tr key={batch.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: 10 }}>{batch.date}</td>
                                        <td style={{ padding: 10 }}>{batch.network}</td>
                                        <td style={{ padding: 10 }}>₦{Number(batch.networkAmount || batch.amount / Number(batch.quantity)).toLocaleString()}</td>
                                        <td style={{ padding: 10 }}>{batch.quantity}</td>
                                        <td style={{ padding: 10 }}>{batch.company}</td>
                                        <td style={{ padding: 10 }}>
                                            <button className="btn-primary" style={{ fontSize: 13, padding: '6px 14px' }}
                                                onClick={() => downloadPinsPDF({ pins: batch.pins, company: batch.company, network: batch.network, amount: batch.networkAmount, ussd: USSD_CODES[batch.network] })}>
                                                Download PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {success && (
                <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                    <div className="modal-content success-modal" style={{ textAlign: 'center', padding: '36px 24px', border: '2px solid #007bff' }}>
                        <button className="modal-close" onClick={() => setSuccess(false)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: '2rem', color: '#007bff', cursor: 'pointer', lineHeight: 1, zIndex: 1 }}>&times;</button>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                            <div style={{ background: '#eaf3ff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                <FaPrint size={38} color="#007bff" />
                            </div>
                        </div>
                        <h2 style={{ color: '#007bff', marginBottom: 10, fontFamily: 'LexendExtraBold' }}>Recharge cards generated successfully!</h2>
                        <button className="btn-primary" style={{ marginTop: 18, minWidth: 120 }} onClick={() => setSuccess(false)}>Okay</button>
                    </div>
                </div>
            )}
        </div>
    );
}
