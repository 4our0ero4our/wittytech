"use client";
import { useState, useMemo } from "react";
import { FaSearch, FaSort, FaFilePdf, FaIdCard, FaUserPlus, FaUserEdit, FaWallet } from "react-icons/fa";
// If you install jsPDF, import it like this:
import { jsPDF } from "jspdf";

const MOCK_TRANSACTIONS = [
    {
        id: "PMX09812",
        name: "NIN Services",
        type: "NIN Verification",
        date: "2022-01-29T20:00:00Z",
        amount: 300,
        status: "Pending",
        direction: "+",
        icon: <FaIdCard />,
        subtitle: "NIN Verification",
    },
    {
        id: "PMX0979",
        name: "NIN Services",
        type: "NIN Personalisation",
        date: "2022-01-25T09:15:00Z",
        amount: -890.15,
        status: "Success",
        direction: "-",
        icon: <FaUserPlus />,
        subtitle: "NIN Personalisation",
    },
    {
        id: "OVF19244",
        name: "NIN Services",
        type: "IPE Clearance",
        date: "2022-01-25T06:45:00Z",
        amount: -600,
        status: "Success",
        direction: "-",
        icon: <FaIdCard />,
        subtitle: "IPE Clearance",
    },
    {
        id: "AMX09871",
        name: "BVN Services",
        type: "BVN Verification",
        date: "2022-01-23T21:00:00Z",
        amount: 1243,
        status: "Pending",
        direction: "+",
        icon: <FaIdCard />,
        subtitle: "BVN Verification",
    },
    {
        id: "PMX09873",
        name: "BVN Services",
        type: "BVN Modification",
        date: "2022-01-15T10:15:00Z",
        amount: -123,
        status: "Failed",
        direction: "-",
        icon: <FaUserEdit />,
        subtitle: "BVN Modification",
    },
    {
        id: "AMX89786",
        name: "Fund Wallet",
        type: "Fund Wallet",
        date: "2022-01-15T09:00:00Z",
        amount: -190,
        status: "Success",
        direction: "-",
        icon: <FaWallet />,
        subtitle: "Fund Wallet",
    },
    {
        id: "AMX89786",
        name: "NIN Services",
        type: "NIN Verification",
        date: "2022-01-15T09:00:00Z",
        amount: -190,
        status: "Success",
        direction: "-",
        icon: <FaIdCard />,
        subtitle: "NIN Verification",
    },
];

const SERVICE_TYPES = [
    "All Services",
    ...Array.from(new Set(MOCK_TRANSACTIONS.map((t) => t.type))),
];

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
        year: "2-digit",
        month: "short",
        day: "2-digit",
    });
}
function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export default function TransactionHistoryPage() {
    // Toggle between MOCK_TRANSACTIONS and [] to simulate empty state
    const [transactions] = useState(MOCK_TRANSACTIONS); // or [] for empty
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortDir, setSortDir] = useState("desc");
    const [serviceType, setServiceType] = useState("All Services");

    const filtered = useMemo(() => {
        let data = transactions;
        if (serviceType !== "All Services") {
            data = data.filter((t) => t.type === serviceType);
        }
        if (search.trim()) {
            const s = search.trim().toLowerCase();
            data = data.filter(
                (t) =>
                    t.name.toLowerCase().includes(s) ||
                    t.type.toLowerCase().includes(s) ||
                    t.id.toLowerCase().includes(s)
            );
        }
        data = [...data].sort((a, b) => {
            if (sortBy === "date") {
                return sortDir === "desc"
                    ? new Date(b.date) - new Date(a.date)
                    : new Date(a.date) - new Date(b.date);
            } else if (sortBy === "type") {
                return sortDir === "asc"
                    ? a.type.localeCompare(b.type)
                    : b.type.localeCompare(a.type);
            }
            return 0;
        });
        return data;
    }, [transactions, search, sortBy, sortDir, serviceType]);

    const handleExportPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape' });
        const title = 'Transaction History';
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(title, 14, 18);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        // Table headers
        const headers = [[
            'Service Type',
            'Date',
            'Transaction ID',
            'Amount',
            'Status',
        ]];
        // Table rows
        const rows = filtered.map(t => [
            `${t.name}\n${t.subtitle}`,
            `${formatDate(t.date)}\n${formatTime(t.date)}`,
            t.id,
            `${t.direction}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            t.status,
        ]);

        // Try to use autoTable if available
        if (doc.autoTable) {
            doc.autoTable({
                head: headers,
                body: rows,
                startY: 26,
                styles: { font: 'helvetica', fontSize: 10 },
                headStyles: { fillColor: [0, 123, 255], textColor: 255, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [240, 245, 255] },
                margin: { left: 14, right: 14 },
                theme: 'grid',
            });
        } else {
            // Fallback: basic table
            let y = 30;
            doc.setFont('helvetica', 'bold');
            headers[0].forEach((h, i) => doc.text(h, 14 + i * 60, y));
            doc.setFont('helvetica', 'normal');
            y += 8;
            rows.forEach(row => {
                row.forEach((cell, i) => doc.text(String(cell), 14 + i * 60, y));
                y += 8;
            });
        }
        doc.save('transaction-history.pdf');
    };

    return (
        <div className="transaction-history-container">
            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaWallet size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">Transaction History</h1>
                    <div className="service-desc">View and manage all your service transactions in one place.</div>
                </div>
            </div>
            {/* Controls Row */}
            <div className="transaction-controls-row">
                {/* Search */}
                <div className="transaction-search-box">
                    <FaSearch className="transaction-search-icon" />
                    <input
                        type="text"
                        placeholder="Search by service, subtitle or ID"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="transaction-search-input"
                    />
                </div>
                {/* Service Type Sort */}
                <div className="transaction-service-type-select-wrap">
                    <select
                        value={serviceType}
                        onChange={e => setServiceType(e.target.value)}
                        className="transaction-service-type-select"
                    >
                        {SERVICE_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                {/* Date Sort */}
                <button
                    onClick={() => {
                        setSortBy("date");
                        setSortDir(sortDir === "desc" ? "asc" : "desc");
                    }}
                    className="transaction-date-sort-btn"
                >
                    Date
                    <FaSort className={`transaction-date-sort-icon${sortBy === "date" && sortDir === "desc" ? " desc" : ""}`} />
                </button>
                {/* Export PDF */}
                <button
                    onClick={handleExportPDF}
                    className="transaction-export-btn"
                >
                    <FaFilePdf className="transaction-export-icon" /> Export PDF
                </button>
            </div>
            {/* Table/List */}
            <div className="transaction-table-wrap">
                {filtered.length === 0 ? (
                    <div className="transaction-empty-state">
                        <div className="transaction-empty-icon">🗂️</div>
                        No transactions yet.
                    </div>
                ) : (
                    <table className="transaction-table">
                        <thead>
                            <tr className="transaction-table-header">
                                <th className="transaction-table-th service">Service Type</th>
                                <th className="transaction-table-th date">Date</th>
                                <th className="transaction-table-th id">Transaction ID</th>
                                <th className="transaction-table-th amount">Amount</th>
                                <th className="transaction-table-th status">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id} className="transaction-table-row">
                                    {/* Service Type with icon, title, and subtitle stacked */}
                                    <td className="transaction-service-cell">
                                        <div className="transaction-service-icon-wrap">{t.icon}</div>
                                        <div className="transaction-service-info">
                                            <div className="transaction-service-title">{t.name}</div>
                                            <div className="transaction-service-subtitle">{t.subtitle}</div>
                                        </div>
                                    </td>
                                    {/* Date and time stacked */}
                                    <td className="transaction-date-cell">
                                        <div className="transaction-date-main">{formatDate(t.date)}</div>
                                        <div className="transaction-date-time">{formatTime(t.date)}</div>
                                    </td>
                                    {/* Transaction ID */}
                                    <td className="transaction-id-cell">{t.id}</td>
                                    {/* Amount */}
                                    <td className={`transaction-amount-cell${t.amount < 0 ? " negative" : " positive"}`}>{t.direction}{Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    {/* Status */}
                                    <td className="transaction-status-cell">
                                        <span className={`transaction-status-badge status-${t.status.toLowerCase()}`}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* Responsive tweaks moved to CSS */}
        </div>
    );
}
