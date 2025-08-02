"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMoneyCheckAlt, FaSearch, FaDownload, FaSort, FaFilter, FaCalendarAlt, FaUser, FaEye } from "react-icons/fa";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Mock transactions data - In real app, this would come from API
const MOCK_TRANSACTIONS = [
    {
        id: "TXN001",
        clientName: "John Doe",
        clientEmail: "john.doe@email.com",
        service: "NIN Verification",
        serviceCategory: "NIN Services",
        amount: 15.00, // Client paid amount
        baseCost: 9.00, // Our base cost
        profit: 6.00, // Aggregator's profit
        date: "2024-01-23T10:30:00Z",
        status: "Completed",
        transactionType: "Service Purchase"
    },
    {
        id: "TXN002",
        clientName: "Jane Smith",
        clientEmail: "jane.smith@email.com",
        service: "BVN Modification",
        serviceCategory: "BVN Services",
        amount: 25.00,
        baseCost: 18.00,
        profit: 7.00,
        date: "2024-01-23T14:45:00Z",
        status: "Completed",
        transactionType: "Service Purchase"
    },
    {
        id: "TXN003",
        clientName: "Michael Johnson",
        clientEmail: "michael.j@email.com",
        service: "License Onboarding",
        serviceCategory: "BVN Services",
        amount: 65.00,
        baseCost: 50.00,
        profit: 15.00,
        date: "2024-01-22T16:20:00Z",
        status: "Completed",
        transactionType: "Service Purchase"
    },
    {
        id: "TXN004",
        clientName: "Sarah Williams",
        clientEmail: "sarah.w@email.com",
        service: "NIN Personalisation",
        serviceCategory: "NIN Services",
        amount: 18.00,
        baseCost: 12.00,
        profit: 6.00,
        date: "2024-01-22T09:15:00Z",
        status: "Pending",
        transactionType: "Service Purchase"
    },
    {
        id: "TXN005",
        clientName: "David Brown",
        clientEmail: "david.brown@email.com",
        service: "BVN Verification",
        serviceCategory: "BVN Services",
        amount: 17.00,
        baseCost: 12.00,
        profit: 5.00,
        date: "2024-01-21T11:30:00Z",
        status: "Failed",
        transactionType: "Service Purchase"
    },
    {
        id: "TXN006",
        clientName: "Lisa Anderson",
        clientEmail: "lisa.a@email.com",
        service: "IPE Clearance",
        serviceCategory: "NIN Services",
        amount: 16.00,
        baseCost: 10.00,
        profit: 6.00,
        date: "2024-01-21T13:45:00Z",
        status: "Completed",
        transactionType: "Service Purchase"
    }
];

export default function AggregatorTransactionsPage() {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [filteredTransactions, setFilteredTransactions] = useState(MOCK_TRANSACTIONS);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const router = useRouter();

    // Search and filter logic
    useEffect(() => {
        let filtered = [...transactions];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(transaction =>
                transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(transaction =>
                transaction.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        // Category filter
        if (categoryFilter !== "all") {
            filtered = filtered.filter(transaction =>
                transaction.serviceCategory.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        // Date filter
        if (dateFilter !== "all") {
            const now = new Date();
            const filterDate = new Date();

            switch (dateFilter) {
                case "today":
                    filterDate.setDate(now.getDate());
                    break;
                case "week":
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case "month":
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                default:
                    break;
            }

            if (dateFilter !== "all") {
                filtered = filtered.filter(transaction =>
                    new Date(transaction.date) >= filterDate
                );
            }
        }

        // Sort
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === "date") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredTransactions(filtered);
    }, [transactions, searchTerm, sortBy, sortDirection, statusFilter, categoryFilter, dateFilter]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `₦${amount.toLocaleString()}`;
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("desc");
        }
    };

    const handleViewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setShowTransactionModal(true);
    };

    const getStatusBadge = (status) => {
        const baseClass = "transaction-status-badge";
        let statusClass = "";

        switch (status.toLowerCase()) {
            case "completed":
                statusClass = "status-completed";
                break;
            case "pending":
                statusClass = "status-pending";
                break;
            case "failed":
                statusClass = "status-failed";
                break;
            default:
                statusClass = "status-unknown";
        }

        return `${baseClass} ${statusClass}`;
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return <FaSort className="sort-icon" />;
        return <FaSort className={`sort-icon ${sortDirection === "desc" ? "desc" : "asc"}`} />;
    };

    const getTransactionStats = () => {
        const totalTransactions = filteredTransactions.length;
        const completedTransactions = filteredTransactions.filter(t => t.status === "Completed").length;
        const totalRevenue = filteredTransactions
            .filter(t => t.status === "Completed")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalProfit = filteredTransactions
            .filter(t => t.status === "Completed")
            .reduce((sum, t) => sum + t.profit, 0);

        return { totalTransactions, completedTransactions, totalRevenue, totalProfit };
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(0, 123, 255);
        doc.text('Aggregator Transactions Report', 20, 30);

        // Add date
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);

        // Add summary
        const stats = getTransactionStats();
        doc.text(`Total Transactions: ${stats.totalTransactions}`, 20, 60);
        doc.text(`Completed: ${stats.completedTransactions}`, 20, 70);
        doc.text(`Total Revenue: ${formatCurrency(stats.totalRevenue)}`, 20, 80);
        doc.text(`Total Profit: ${formatCurrency(stats.totalProfit)}`, 20, 90);

        // Add table
        const tableColumns = [
            'Transaction ID',
            'Client',
            'Service',
            'Date',
            'Amount',
            'Profit',
            'Status'
        ];

        const tableRows = filteredTransactions.map(t => [
            t.id,
            t.clientName,
            t.service,
            formatDate(t.date),
            formatCurrency(t.amount),
            formatCurrency(t.profit),
            t.status
        ]);

        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 110,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [0, 123, 255] }
        });

        doc.save('aggregator-transactions.pdf');
    };

    const stats = getTransactionStats();

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h1 className="transactions-title">
                    <FaMoneyCheckAlt className="title-icon" />
                    Client Transactions
                </h1>
                <p className="transactions-subtitle">Track and manage your client transactions and profits</p>
            </div>

            {/* Stats Cards */}
            <div className="transactions-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaMoneyCheckAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalTransactions}</h3>
                        <p>Total Transactions</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon completed">
                        <FaMoneyCheckAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.completedTransactions}</h3>
                        <p>Completed</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <FaMoneyCheckAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{formatCurrency(stats.totalRevenue)}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon profit">
                        <FaMoneyCheckAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{formatCurrency(stats.totalProfit)}</h3>
                        <p>Your Profit</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="transactions-controls">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by client, service, or transaction ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-container">
                    <div className="filter-group">
                        <FaFilter className="filter-icon" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Categories</option>
                            <option value="nin services">NIN Services</option>
                            <option value="bvn services">BVN Services</option>
                            <option value="other services">Other Services</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <FaCalendarAlt className="filter-icon" />
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last Month</option>
                        </select>
                    </div>
                </div>

                <button
                    className="export-btn"
                    onClick={exportToPDF}
                    title="Export to PDF"
                >
                    <FaDownload className="export-icon" />
                    Export PDF
                </button>
            </div>

            {/* Transactions Table */}
            <div className="transactions-table-container">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")} className="sortable">
                                Transaction ID {getSortIcon("id")}
                            </th>
                            <th onClick={() => handleSort("clientName")} className="sortable">
                                Client {getSortIcon("clientName")}
                            </th>
                            <th onClick={() => handleSort("service")} className="sortable">
                                Service {getSortIcon("service")}
                            </th>
                            <th onClick={() => handleSort("date")} className="sortable">
                                Date {getSortIcon("date")}
                            </th>
                            <th onClick={() => handleSort("amount")} className="sortable">
                                Amount {getSortIcon("amount")}
                            </th>
                            <th onClick={() => handleSort("profit")} className="sortable">
                                Profit {getSortIcon("profit")}
                            </th>
                            <th onClick={() => handleSort("status")} className="sortable">
                                Status {getSortIcon("status")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="transaction-row">
                                    <td className="transaction-id-cell">
                                        <span className="transaction-id">{transaction.id}</span>
                                    </td>
                                    <td className="transaction-client-cell">
                                        <div className="client-info">
                                            <strong>{transaction.clientName}</strong>
                                            <small>{transaction.clientEmail}</small>
                                        </div>
                                    </td>
                                    <td className="transaction-service-cell">
                                        <div className="service-info">
                                            <strong>{transaction.service}</strong>
                                            <small>{transaction.serviceCategory}</small>
                                        </div>
                                    </td>
                                    <td className="transaction-date-cell">
                                        {formatDate(transaction.date)}
                                    </td>
                                    <td className="transaction-amount-cell">
                                        {formatCurrency(transaction.amount)}
                                    </td>
                                    <td className="transaction-profit-cell">
                                        <span className="profit-amount">
                                            {formatCurrency(transaction.profit)}
                                        </span>
                                    </td>
                                    <td className="transaction-status-cell">
                                        <span className={getStatusBadge(transaction.status)}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="transaction-actions-cell">
                                        <button
                                            onClick={() => handleViewTransaction(transaction)}
                                            className="action-btn view-btn"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-transactions">
                                    <div className="no-transactions-content">
                                        <FaMoneyCheckAlt className="no-transactions-icon" />
                                        <h3>No transactions found</h3>
                                        <p>No transactions match your current search and filter criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Transaction Details Modal */}
            {showTransactionModal && selectedTransaction && (
                <div className="modal-overlay" onClick={() => setShowTransactionModal(false)}>
                    <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Transaction Details</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowTransactionModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="transaction-details-grid">
                                <div className="detail-group">
                                    <label>Transaction ID</label>
                                    <p className="transaction-id-text">{selectedTransaction.id}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Date & Time</label>
                                    <p>{formatDate(selectedTransaction.date)}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Client Name</label>
                                    <p>{selectedTransaction.clientName}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Client Email</label>
                                    <p>{selectedTransaction.clientEmail}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Service</label>
                                    <p>{selectedTransaction.service}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Service Category</label>
                                    <p>{selectedTransaction.serviceCategory}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Status</label>
                                    <span className={getStatusBadge(selectedTransaction.status)}>
                                        {selectedTransaction.status}
                                    </span>
                                </div>
                                <div className="detail-group">
                                    <label>Transaction Type</label>
                                    <p>{selectedTransaction.transactionType}</p>
                                </div>
                            </div>

                            <div className="financial-breakdown">
                                <h3>Financial Breakdown</h3>
                                <div className="breakdown-grid">
                                    <div className="breakdown-item">
                                        <label>Client Paid Amount</label>
                                        <p className="amount client-amount">{formatCurrency(selectedTransaction.amount)}</p>
                                    </div>
                                    <div className="breakdown-item">
                                        <label>Base Service Cost</label>
                                        <p className="amount base-cost">{formatCurrency(selectedTransaction.baseCost)}</p>
                                    </div>
                                    <div className="breakdown-item">
                                        <label>Your Profit</label>
                                        <p className="amount profit">{formatCurrency(selectedTransaction.profit)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}