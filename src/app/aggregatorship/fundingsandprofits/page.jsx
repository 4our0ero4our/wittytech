"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaWallet, FaChartLine, FaDownload, FaCalendarAlt, FaMoneyBillWave, FaFilter, FaEye } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Mock funding and profit data - In real app, this would come from API
const MOCK_PROFIT_RECORDS = [
    {
        id: "PR001",
        date: "2024-01-23",
        clientName: "John Doe",
        service: "NIN Verification",
        clientPaid: 15.00,
        baseCost: 9.00,
        profit: 6.00,
        profitMargin: 40.0,
        status: "Confirmed"
    },
    {
        id: "PR002",
        date: "2024-01-23",
        clientName: "Jane Smith",
        service: "BVN Modification",
        clientPaid: 25.00,
        baseCost: 18.00,
        profit: 7.00,
        profitMargin: 28.0,
        status: "Confirmed"
    },
    {
        id: "PR003",
        date: "2024-01-22",
        clientName: "Michael Johnson",
        service: "License Onboarding",
        clientPaid: 65.00,
        baseCost: 50.00,
        profit: 15.00,
        profitMargin: 23.1,
        status: "Confirmed"
    },
    {
        id: "PR004",
        date: "2024-01-22",
        clientName: "Sarah Williams",
        service: "NIN Personalisation",
        clientPaid: 18.00,
        baseCost: 12.00,
        profit: 6.00,
        profitMargin: 33.3,
        status: "Pending"
    },
    {
        id: "PR005",
        date: "2024-01-21",
        clientName: "David Brown",
        service: "BVN Verification",
        clientPaid: 17.00,
        baseCost: 12.00,
        profit: 5.00,
        profitMargin: 29.4,
        status: "Confirmed"
    }
];

const MOCK_FUNDING_RECORDS = [
    {
        id: "FR001",
        date: "2024-01-20",
        type: "Profit Withdrawal",
        amount: -150.00,
        balance: 350.00,
        description: "Withdrawal to bank account",
        status: "Completed"
    },
    {
        id: "FR002",
        date: "2024-01-19",
        type: "Profit Earned",
        amount: 45.00,
        balance: 500.00,
        description: "Commission from client transactions",
        status: "Completed"
    },
    {
        id: "FR003",
        date: "2024-01-18",
        type: "Profit Earned",
        amount: 32.00,
        balance: 455.00,
        description: "Commission from client transactions",
        status: "Completed"
    },
    {
        id: "FR004",
        date: "2024-01-17",
        type: "Profit Withdrawal",
        amount: -100.00,
        balance: 423.00,
        description: "Withdrawal to bank account",
        status: "Completed"
    },
    {
        id: "FR005",
        date: "2024-01-16",
        type: "Profit Earned",
        amount: 28.00,
        balance: 523.00,
        description: "Commission from client transactions",
        status: "Completed"
    }
];

export default function AggregatorFundingsProfitsPage() {
    const [activeTab, setActiveTab] = useState("profits");
    const [profitRecords, setProfitRecords] = useState(MOCK_PROFIT_RECORDS);
    const [fundingRecords, setFundingRecords] = useState(MOCK_FUNDING_RECORDS);
    const [dateFilter, setDateFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [currentBalance] = useState(350.00); // Mock current balance
    const router = useRouter();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return `₦${Math.abs(amount).toLocaleString()}`;
    };

    const getFilteredProfitRecords = () => {
        let filtered = [...profitRecords];

        if (statusFilter !== "all") {
            filtered = filtered.filter(record =>
                record.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (dateFilter !== "all") {
            const now = new Date();
            const filterDate = new Date();

            switch (dateFilter) {
                case "week":
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case "month":
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case "quarter":
                    filterDate.setMonth(now.getMonth() - 3);
                    break;
                default:
                    break;
            }

            if (dateFilter !== "all") {
                filtered = filtered.filter(record =>
                    new Date(record.date) >= filterDate
                );
            }
        }

        return filtered;
    };

    const getFilteredFundingRecords = () => {
        let filtered = [...fundingRecords];

        if (dateFilter !== "all") {
            const now = new Date();
            const filterDate = new Date();

            switch (dateFilter) {
                case "week":
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case "month":
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case "quarter":
                    filterDate.setMonth(now.getMonth() - 3);
                    break;
                default:
                    break;
            }

            if (dateFilter !== "all") {
                filtered = filtered.filter(record =>
                    new Date(record.date) >= filterDate
                );
            }
        }

        return filtered;
    };

    const getProfitStats = () => {
        const filtered = getFilteredProfitRecords();
        const confirmedProfits = filtered.filter(r => r.status === "Confirmed");

        const totalProfit = confirmedProfits.reduce((sum, r) => sum + r.profit, 0);
        const totalRevenue = confirmedProfits.reduce((sum, r) => sum + r.clientPaid, 0);
        const averageMargin = confirmedProfits.length > 0
            ? confirmedProfits.reduce((sum, r) => sum + r.profitMargin, 0) / confirmedProfits.length
            : 0;
        const transactionCount = confirmedProfits.length;

        return { totalProfit, totalRevenue, averageMargin, transactionCount };
    };

    const getFundingStats = () => {
        const filtered = getFilteredFundingRecords();
        const totalWithdrawals = filtered
            .filter(r => r.type === "Profit Withdrawal")
            .reduce((sum, r) => sum + Math.abs(r.amount), 0);
        const totalEarnings = filtered
            .filter(r => r.type === "Profit Earned")
            .reduce((sum, r) => sum + r.amount, 0);

        return { totalWithdrawals, totalEarnings, currentBalance };
    };

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (amount <= 0 || amount > currentBalance) {
            alert("Invalid withdrawal amount");
            return;
        }

        // Mock withdrawal process
        const newRecord = {
            id: `FR${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: "Profit Withdrawal",
            amount: -amount,
            balance: currentBalance - amount,
            description: "Withdrawal to bank account",
            status: "Processing"
        };

        setFundingRecords(prev => [newRecord, ...prev]);
        setWithdrawAmount("");
        setShowWithdrawModal(false);

        alert("Withdrawal request submitted successfully!");
    };

    const exportProfitsToPDF = () => {
        const doc = new jsPDF();
        const filtered = getFilteredProfitRecords();
        const stats = getProfitStats();

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(0, 123, 255);
        doc.text('Profits Report', 20, 30);

        // Add date and stats
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
        doc.text(`Total Profit: ${formatCurrency(stats.totalProfit)}`, 20, 60);
        doc.text(`Total Revenue: ${formatCurrency(stats.totalRevenue)}`, 20, 70);
        doc.text(`Average Margin: ${stats.averageMargin.toFixed(1)}%`, 20, 80);

        // Add table
        const tableColumns = ['Date', 'Client', 'Service', 'Revenue', 'Profit', 'Margin %', 'Status'];
        const tableRows = filtered.map(r => [
            formatDate(r.date),
            r.clientName,
            r.service,
            formatCurrency(r.clientPaid),
            formatCurrency(r.profit),
            `${r.profitMargin.toFixed(1)}%`,
            r.status
        ]);

        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 95,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [0, 123, 255] }
        });

        doc.save('profits-report.pdf');
    };

    const exportFundingToPDF = () => {
        const doc = new jsPDF();
        const filtered = getFilteredFundingRecords();
        const stats = getFundingStats();

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(0, 123, 255);
        doc.text('Funding & Withdrawals Report', 20, 30);

        // Add date and stats
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
        doc.text(`Current Balance: ${formatCurrency(stats.currentBalance)}`, 20, 60);
        doc.text(`Total Earnings: ${formatCurrency(stats.totalEarnings)}`, 20, 70);
        doc.text(`Total Withdrawals: ${formatCurrency(stats.totalWithdrawals)}`, 20, 80);

        // Add table
        const tableColumns = ['Date', 'Type', 'Amount', 'Balance', 'Description', 'Status'];
        const tableRows = filtered.map(r => [
            formatDate(r.date),
            r.type,
            formatCurrency(r.amount),
            formatCurrency(r.balance),
            r.description,
            r.status
        ]);

        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 95,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [0, 123, 255] }
        });

        doc.save('funding-report.pdf');
    };

    const renderProfitsTab = () => {
        const filtered = getFilteredProfitRecords();
        const stats = getProfitStats();

        return (
            <div className="profits-section">
                {/* Profit Stats */}
                <div className="profits-stats">
                    <div className="stat-card">
                        <div className="stat-icon profit">
                            <FaMoneyBillWave />
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(stats.totalProfit)}</h3>
                            <p>Total Profit</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon revenue">
                            <FaChartLine />
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(stats.totalRevenue)}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon margin">
                            <FaArrowTrendUp />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.averageMargin.toFixed(1)}%</h3>
                            <p>Avg. Margin</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon transactions">
                            <FaWallet />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.transactionCount}</h3>
                            <p>Transactions</p>
                        </div>
                    </div>
                </div>

                {/* Profits Table */}
                <div className="profits-table-container">
                    <div className="table-header">
                        <h3>Profit Records</h3>
                        <button
                            className="export-btn"
                            onClick={exportProfitsToPDF}
                        >
                            <FaDownload /> Export PDF
                        </button>
                    </div>

                    <table className="profits-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Revenue</th>
                                <th>Base Cost</th>
                                <th>Profit</th>
                                <th>Margin</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((record) => (
                                    <tr key={record.id} className="profit-row">
                                        <td className="date-cell">{formatDate(record.date)}</td>
                                        <td className="client-cell">{record.clientName}</td>
                                        <td className="service-cell">{record.service}</td>
                                        <td className="revenue-cell">{formatCurrency(record.clientPaid)}</td>
                                        <td className="cost-cell">{formatCurrency(record.baseCost)}</td>
                                        <td className="profit-cell">
                                            <span className="profit-amount">{formatCurrency(record.profit)}</span>
                                        </td>
                                        <td className="margin-cell">
                                            <span className="margin-percentage">{record.profitMargin.toFixed(1)}%</span>
                                        </td>
                                        <td className="status-cell">
                                            <span className={`status-badge ${record.status.toLowerCase()}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-records">
                                        <div className="no-records-content">
                                            <FaChartLine className="no-records-icon" />
                                            <h3>No profit records found</h3>
                                            <p>No profit records match your current filter criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderFundingTab = () => {
        const filtered = getFilteredFundingRecords();
        const stats = getFundingStats();

        return (
            <div className="funding-section">
                {/* Balance and Controls */}
                <div className="balance-section">
                    <div className="balance-card">
                        <div className="balance-icon">
                            <FaWallet />
                        </div>
                        <div className="balance-content">
                            <h2>{formatCurrency(currentBalance)}</h2>
                            <p>Current Balance</p>
                        </div>
                        <button
                            className="withdraw-btn"
                            onClick={() => setShowWithdrawModal(true)}
                            disabled={currentBalance <= 0}
                        >
                            Withdraw Funds
                        </button>
                    </div>
                </div>

                {/* Funding Stats */}
                <div className="funding-stats">
                    <div className="stat-card">
                        <div className="stat-icon earnings">
                            <FaArrowTrendUp />
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(stats.totalEarnings)}</h3>
                            <p>Total Earnings</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon withdrawals">
                            <FaMoneyBillWave />
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(stats.totalWithdrawals)}</h3>
                            <p>Total Withdrawals</p>
                        </div>
                    </div>
                </div>

                {/* Funding Table */}
                <div className="funding-table-container">
                    <div className="table-header">
                        <h3>Funding Records</h3>
                        <button
                            className="export-btn"
                            onClick={exportFundingToPDF}
                        >
                            <FaDownload /> Export PDF
                        </button>
                    </div>

                    <table className="funding-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((record) => (
                                    <tr key={record.id} className="funding-row">
                                        <td className="date-cell">{formatDate(record.date)}</td>
                                        <td className="type-cell">
                                            <span className={`type-badge ${record.type.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {record.type}
                                            </span>
                                        </td>
                                        <td className={`amount-cell ${record.amount < 0 ? 'negative' : 'positive'}`}>
                                            {record.amount < 0 ? '-' : '+'}{formatCurrency(record.amount)}
                                        </td>
                                        <td className="balance-cell">{formatCurrency(record.balance)}</td>
                                        <td className="description-cell">{record.description}</td>
                                        <td className="status-cell">
                                            <span className={`status-badge ${record.status.toLowerCase()}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-records">
                                        <div className="no-records-content">
                                            <FaWallet className="no-records-icon" />
                                            <h3>No funding records found</h3>
                                            <p>No funding records match your current filter criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="funding-profits-container">
            <div className="funding-profits-header">
                <h1 className="funding-profits-title">
                    <FaWallet className="title-icon" />
                    Fundings and Profits Record
                </h1>
                <p className="funding-profits-subtitle">Track your earnings, withdrawals, and profit margins</p>
            </div>

            {/* Tabs */}
            <div className="funding-profits-tabs">
                <button
                    className={`tab ${activeTab === "profits" ? "active" : ""}`}
                    onClick={() => setActiveTab("profits")}
                >
                    <FaChartLine className="tab-icon" />
                    Profit Records
                </button>
                <button
                    className={`tab ${activeTab === "funding" ? "active" : ""}`}
                    onClick={() => setActiveTab("funding")}
                >
                    <FaWallet className="tab-icon" />
                    Funding & Withdrawals
                </button>
            </div>

            {/* Filters */}
            <div className="funding-profits-filters">
                <div className="filter-group">
                    <FaCalendarAlt className="filter-icon" />
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Time</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last Month</option>
                        <option value="quarter">Last Quarter</option>
                    </select>
                </div>

                {activeTab === "profits" && (
                    <div className="filter-group">
                        <FaFilter className="filter-icon" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="funding-profits-content">
                {activeTab === "profits" && renderProfitsTab()}
                {activeTab === "funding" && renderFundingTab()}
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
                    <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Withdraw Funds</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowWithdrawModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="withdraw-form">
                                <div className="balance-info">
                                    <p>Available Balance: <strong>{formatCurrency(currentBalance)}</strong></p>
                                </div>
                                <div className="form-group">
                                    <label>Withdrawal Amount</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={currentBalance}
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="Enter amount to withdraw"
                                        className="withdraw-input"
                                    />
                                </div>
                                <div className="withdraw-actions">
                                    <button
                                        className="withdraw-submit-btn"
                                        onClick={handleWithdraw}
                                        disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > currentBalance}
                                    >
                                        Submit Withdrawal
                                    </button>
                                    <button
                                        className="withdraw-cancel-btn"
                                        onClick={() => setShowWithdrawModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}