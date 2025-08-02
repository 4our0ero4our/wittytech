"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaSearch, FaEye, FaCalendarAlt, FaMoneyBillWave, FaSort, FaFilter, FaUserCheck, FaUserTimes } from "react-icons/fa";

// Mock clients data - In real app, this would come from API
const MOCK_CLIENTS = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+234812345678",
        signupDate: "2024-01-15T10:30:00Z",
        totalSpent: 2500,
        transactionsCount: 12,
        lastActivity: "2024-01-20T14:22:00Z",
        status: "Active",
        services: ["NIN Verification", "BVN Modification", "License Onboarding"]
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+234813456789",
        signupDate: "2024-01-18T09:15:00Z",
        totalSpent: 1200,
        transactionsCount: 8,
        lastActivity: "2024-01-22T16:45:00Z",
        status: "Active",
        services: ["NIN Personalisation", "BVN Verification"]
    },
    {
        id: 3,
        name: "Michael Johnson",
        email: "michael.j@email.com",
        phone: "+234814567890",
        signupDate: "2024-01-10T11:20:00Z",
        totalSpent: 800,
        transactionsCount: 5,
        lastActivity: "2024-01-19T12:30:00Z",
        status: "Inactive",
        services: ["NIN Verification", "IPE Clearance"]
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarah.w@email.com",
        phone: "+234815678901",
        signupDate: "2024-01-22T13:45:00Z",
        totalSpent: 3200,
        transactionsCount: 15,
        lastActivity: "2024-01-23T10:15:00Z",
        status: "Active",
        services: ["BVN Services", "NIN Services", "Bulk Recharge"]
    },
    {
        id: 5,
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+234816789012",
        signupDate: "2024-01-12T08:30:00Z",
        totalSpent: 1600,
        transactionsCount: 9,
        lastActivity: "2024-01-21T15:20:00Z",
        status: "Active",
        services: ["NIN Modification", "BVN Retrieval"]
    }
];

export default function AggregatorClientsPage() {
    const [clients, setClients] = useState(MOCK_CLIENTS);
    const [filteredClients, setFilteredClients] = useState(MOCK_CLIENTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("signupDate");
    const [sortDirection, setSortDirection] = useState("desc");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedClient, setSelectedClient] = useState(null);
    const [showClientModal, setShowClientModal] = useState(false);
    const router = useRouter();

    // Search and filter logic
    useEffect(() => {
        let filtered = [...clients];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(client =>
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.phone.includes(searchTerm)
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(client =>
                client.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        // Sort
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === "signupDate" || sortBy === "lastActivity") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredClients(filtered);
    }, [clients, searchTerm, sortBy, sortDirection, statusFilter]);

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

    const handleViewClient = (client) => {
        setSelectedClient(client);
        setShowClientModal(true);
    };

    const getStatusBadge = (status) => {
        const baseClass = "client-status-badge";
        const statusClass = status.toLowerCase() === "active" ? "status-active" : "status-inactive";
        return `${baseClass} ${statusClass}`;
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return <FaSort className="sort-icon" />;
        return <FaSort className={`sort-icon ${sortDirection === "desc" ? "desc" : "asc"}`} />;
    };

    const getTotalStats = () => {
        const totalClients = filteredClients.length;
        const activeClients = filteredClients.filter(c => c.status === "Active").length;
        const totalRevenue = filteredClients.reduce((sum, c) => sum + c.totalSpent, 0);
        const totalTransactions = filteredClients.reduce((sum, c) => sum + c.transactionsCount, 0);

        return { totalClients, activeClients, totalRevenue, totalTransactions };
    };

    const stats = getTotalStats();

    return (
        <div className="clients-container">
            <div className="clients-header">
                <h1 className="clients-title">
                    <FaUsers className="title-icon" />
                    Clients Management
                </h1>
                <p className="clients-subtitle">Manage and track your subdomain clients</p>
            </div>

            {/* Stats Cards */}
            <div className="clients-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalClients}</h3>
                        <p>Total Clients</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon active">
                        <FaUserCheck />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.activeClients}</h3>
                        <p>Active Clients</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <FaMoneyBillWave />
                    </div>
                    <div className="stat-content">
                        <h3>{formatCurrency(stats.totalRevenue)}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon transactions">
                        <FaCalendarAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalTransactions}</h3>
                        <p>Total Transactions</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="clients-controls">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search clients by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-container">
                    <FaFilter className="filter-icon" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Clients Table */}
            <div className="clients-table-container">
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")} className="sortable">
                                Client Name {getSortIcon("name")}
                            </th>
                            <th onClick={() => handleSort("email")} className="sortable">
                                Email {getSortIcon("email")}
                            </th>
                            <th onClick={() => handleSort("signupDate")} className="sortable">
                                Signup Date {getSortIcon("signupDate")}
                            </th>
                            <th onClick={() => handleSort("totalSpent")} className="sortable">
                                Total Spent {getSortIcon("totalSpent")}
                            </th>
                            <th onClick={() => handleSort("transactionsCount")} className="sortable">
                                Transactions {getSortIcon("transactionsCount")}
                            </th>
                            <th onClick={() => handleSort("status")} className="sortable">
                                Status {getSortIcon("status")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <tr key={client.id} className="client-row">
                                    <td className="client-name-cell">
                                        <div className="client-name-info">
                                            <strong>{client.name}</strong>
                                            <small>{client.phone}</small>
                                        </div>
                                    </td>
                                    <td className="client-email-cell">{client.email}</td>
                                    <td className="client-date-cell">{formatDate(client.signupDate)}</td>
                                    <td className="client-spent-cell">{formatCurrency(client.totalSpent)}</td>
                                    <td className="client-transactions-cell">
                                        <span className="transaction-count">{client.transactionsCount}</span>
                                    </td>
                                    <td className="client-status-cell">
                                        <span className={getStatusBadge(client.status)}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="client-actions-cell">
                                        <button
                                            onClick={() => handleViewClient(client)}
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
                                <td colSpan="7" className="no-clients">
                                    <div className="no-clients-content">
                                        <FaUsers className="no-clients-icon" />
                                        <h3>No clients found</h3>
                                        <p>No clients match your current search and filter criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Client Details Modal */}
            {showClientModal && selectedClient && (
                <div className="modal-overlay" onClick={() => setShowClientModal(false)}>
                    <div className="client-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Client Details</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowClientModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="client-details-grid">
                                <div className="detail-group">
                                    <label>Full Name</label>
                                    <p>{selectedClient.name}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Email</label>
                                    <p>{selectedClient.email}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Phone</label>
                                    <p>{selectedClient.phone}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Status</label>
                                    <span className={getStatusBadge(selectedClient.status)}>
                                        {selectedClient.status}
                                    </span>
                                </div>
                                <div className="detail-group">
                                    <label>Signup Date</label>
                                    <p>{formatDate(selectedClient.signupDate)}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Last Activity</label>
                                    <p>{formatDate(selectedClient.lastActivity)}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Total Spent</label>
                                    <p className="amount">{formatCurrency(selectedClient.totalSpent)}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Total Transactions</label>
                                    <p className="count">{selectedClient.transactionsCount}</p>
                                </div>
                            </div>
                            <div className="services-section">
                                <label>Services Used</label>
                                <div className="services-list">
                                    {selectedClient.services.map((service, index) => (
                                        <span key={index} className="service-tag">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}