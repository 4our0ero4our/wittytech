"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCog, FaCopy, FaUpload, FaEye, FaCheck, FaWhatsapp, FaPaintBrush, FaBell, FaImage, FaPalette, FaTable } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";

// Mock services data - In real app, this would come from API
const SERVICES_DATA = [
    { id: 1, name: "NIN Verification", category: "NIN Services", baseCost: 9 },
    { id: 2, name: "NIN Personalisation", category: "NIN Services", baseCost: 12 },
    { id: 3, name: "IPE Clearance", category: "NIN Services", baseCost: 10 },
    { id: 4, name: "NIN Modification", category: "NIN Services", baseCost: 15 },
    { id: 5, name: "NIN Validation", category: "NIN Services", baseCost: 9 },
    { id: 6, name: "VPN User Creation", category: "NIN Services", baseCost: 20 },
    { id: 7, name: "BVN Verification", category: "BVN Services", baseCost: 12 },
    { id: 8, name: "BVN Modification", category: "BVN Services", baseCost: 18 },
    { id: 9, name: "BVN Retrieval", category: "BVN Services", baseCost: 14 },
    { id: 10, name: "License Onboarding", category: "BVN Services", baseCost: 50 },
    { id: 11, name: "Bulk Recharge", category: "Other Services", baseCost: 0 }, // Variable pricing
];

export default function AggregatorSettingsPage() {
    const [activeTab, setActiveTab] = useState("info");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    // My Information State
    const [userInfo, setUserInfo] = useState({
        businessName: "",
        username: "",
        refId: "",
        customDomain: "",
        whatsappGroup: "",
        whatsappNumber: ""
    });

    // Banking Details State
    const [bankingDetails, setBankingDetails] = useState({
        bankName: "",
        accountName: "",
        accountNumber: ""
    });

    // Site Customization State
    const [siteCustomization, setSiteCustomization] = useState({
        scrollingNotification: "",
        popupNotification: "",
        siteLogo: null,
        logoPreview: null,
        siteColor: "#007bff"
    });

    // Services Pricing State
    const [servicesPricing, setServicesPricing] = useState({});

    // Initialize services pricing
    useEffect(() => {
        const initialPricing = {};
        SERVICES_DATA.forEach(service => {
            initialPricing[service.id] = {
                baseCost: service.baseCost,
                profit: 0,
                myPrice: service.baseCost
            };
        });
        setServicesPricing(initialPricing);
    }, []);

    // Mock user data - In real app, this would come from API
    useEffect(() => {
        // Simulate loading user data
        setUserInfo({
            businessName: "Tech Solutions Ltd",
            username: "techsolutions",
            refId: "techsolutions",
            customDomain: "techsolutions.wittytech.com",
            whatsappGroup: "",
            whatsappNumber: ""
        });
    }, []);

    const handleUserInfoChange = (field, value) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: value,
            // Auto-generate refId from business name
            refId: field === "businessName" ? value.toLowerCase().replace(/[^a-z0-9]/g, "") : prev.refId,
            // Auto-generate domain from username
            customDomain: field === "username" ? `${value.toLowerCase()}.wittytech.com` : prev.customDomain
        }));
    };

    const handleBankingChange = (field, value) => {
        setBankingDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleSiteCustomizationChange = (field, value) => {
        setSiteCustomization(prev => ({ ...prev, [field]: value }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size must be less than 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSiteCustomization(prev => ({
                    ...prev,
                    siteLogo: file,
                    logoPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleServiceProfitChange = (serviceId, profit) => {
        const profitValue = Math.max(0, parseFloat(profit) || 0);
        setServicesPricing(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                profit: profitValue,
                myPrice: prev[serviceId].baseCost + profitValue
            }
        }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        });
    };

    const handleSave = async () => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSaved(true);
        setLoading(false);
        setTimeout(() => setSaved(false), 3000);
    };

    const validateForm = () => {
        if (activeTab === "info") {
            return userInfo.businessName && userInfo.username;
        }
        if (activeTab === "banking") {
            return bankingDetails.bankName && bankingDetails.accountName && bankingDetails.accountNumber;
        }
        return true;
    };

    const renderMyInformation = () => (
        <div className="aggregator-section">
            <h2 className="aggregator-section-title">
                <FaCog className="section-icon" />
                My Information
            </h2>

            <div className="aggregator-form-grid">
                <div className="aggregator-form-group">
                    <label>Business Name</label>
                    <input
                        type="text"
                        value={userInfo.businessName}
                        onChange={(e) => handleUserInfoChange("businessName", e.target.value)}
                        placeholder="Enter your business name"
                        className="aggregator-input"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => handleUserInfoChange("username", e.target.value.toLowerCase())}
                        placeholder="Enter username for subdomain"
                        className="aggregator-input"
                    />
                    <small className="aggregator-help-text">This will be used for your subdomain</small>
                </div>

                <div className="aggregator-form-group aggregator-domain-display">
                    <label>My Custom Domain Link</label>
                    <div className="aggregator-copy-field">
                        <input
                            type="text"
                            value={userInfo.customDomain}
                            readOnly
                            className="aggregator-input readonly"
                        />
                        <button
                            type="button"
                            onClick={() => copyToClipboard(userInfo.customDomain)}
                            className="aggregator-copy-btn"
                            title="Copy domain link"
                        >
                            <FaCopy />
                        </button>
                    </div>
                </div>

                <div className="aggregator-form-group">
                    <label>My Ref ID</label>
                    <input
                        type="text"
                        value={userInfo.refId}
                        readOnly
                        className="aggregator-input readonly"
                    />
                    <small className="aggregator-help-text">Auto-generated from business name</small>
                </div>

                <div className="aggregator-form-group">
                    <label>
                        <FaWhatsapp className="inline-icon" />
                        WhatsApp Group Link
                    </label>
                    <input
                        type="url"
                        value={userInfo.whatsappGroup}
                        onChange={(e) => handleUserInfoChange("whatsappGroup", e.target.value)}
                        placeholder="https://chat.whatsapp.com/..."
                        className="aggregator-input"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>
                        <FaWhatsapp className="inline-icon" />
                        WhatsApp Number
                    </label>
                    <input
                        type="tel"
                        value={userInfo.whatsappNumber}
                        onChange={(e) => handleUserInfoChange("whatsappNumber", e.target.value)}
                        placeholder="+234XXXXXXXXXX"
                        className="aggregator-input"
                    />
                </div>
            </div>
        </div>
    );

    const renderBankingDetails = () => (
        <div className="aggregator-section">
            <h2 className="aggregator-section-title">
                <BsBank2 className="section-icon" />
                My Banking Details
            </h2>

            <div className="aggregator-form-grid">
                <div className="aggregator-form-group">
                    <label>Bank Name</label>
                    <input
                        type="text"
                        value={bankingDetails.bankName}
                        onChange={(e) => handleBankingChange("bankName", e.target.value)}
                        placeholder="Enter bank name"
                        className="aggregator-input"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>Account Name</label>
                    <input
                        type="text"
                        value={bankingDetails.accountName}
                        onChange={(e) => handleBankingChange("accountName", e.target.value)}
                        placeholder="Enter account name"
                        className="aggregator-input"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>Account Number</label>
                    <input
                        type="text"
                        value={bankingDetails.accountNumber}
                        onChange={(e) => handleBankingChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter account number"
                        className="aggregator-input"
                        maxLength="10"
                    />
                </div>
            </div>
        </div>
    );

    const renderSiteCustomization = () => (
        <div className="aggregator-section">
            <h2 className="aggregator-section-title">
                <FaPaintBrush className="section-icon" />
                Site Customization Settings
            </h2>

            <div className="aggregator-customization-grid">
                <div className="aggregator-form-group">
                    <label>
                        <FaBell className="inline-icon" />
                        Scrolling Notification
                    </label>
                    <textarea
                        value={siteCustomization.scrollingNotification}
                        onChange={(e) => handleSiteCustomizationChange("scrollingNotification", e.target.value)}
                        placeholder="Enter scrolling notification message..."
                        className="aggregator-textarea"
                        rows="3"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>
                        <FaBell className="inline-icon" />
                        Pop-up Notification
                    </label>
                    <textarea
                        value={siteCustomization.popupNotification}
                        onChange={(e) => handleSiteCustomizationChange("popupNotification", e.target.value)}
                        placeholder="Enter pop-up notification message..."
                        className="aggregator-textarea"
                        rows="3"
                    />
                </div>

                <div className="aggregator-form-group">
                    <label>
                        <FaImage className="inline-icon" />
                        Site Logo
                    </label>
                    <div className="aggregator-logo-upload">
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/svg+xml"
                            onChange={handleLogoUpload}
                            className="aggregator-file-input"
                            id="logo-upload"
                        />
                        <label htmlFor="logo-upload" className="aggregator-upload-btn">
                            <FaUpload className="inline-icon" />
                            Choose Logo
                        </label>
                        <small className="aggregator-help-text">PNG, JPG, SVG (Max 2MB)</small>

                        {siteCustomization.logoPreview && (
                            <div className="aggregator-logo-preview">
                                <img
                                    src={siteCustomization.logoPreview}
                                    alt="Logo Preview"
                                    className="aggregator-logo-img"
                                />
                                <p className="aggregator-preview-text">Logo Preview</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="aggregator-form-group">
                    <label>
                        <FaPalette className="inline-icon" />
                        Site Primary Color
                    </label>
                    <div className="aggregator-color-picker">
                        <input
                            type="color"
                            value={siteCustomization.siteColor}
                            onChange={(e) => handleSiteCustomizationChange("siteColor", e.target.value)}
                            className="aggregator-color-input"
                        />
                        <input
                            type="text"
                            value={siteCustomization.siteColor}
                            onChange={(e) => handleSiteCustomizationChange("siteColor", e.target.value)}
                            placeholder="#007bff"
                            className="aggregator-color-text"
                        />
                    </div>
                    <div
                        className="aggregator-color-preview"
                        style={{ backgroundColor: siteCustomization.siteColor }}
                    >
                        Color Preview
                    </div>
                </div>
            </div>
        </div>
    );

    const renderServicesPricing = () => (
        <div className="aggregator-section">
            <h2 className="aggregator-section-title">
                <FaTable className="section-icon" />
                Services and Prices
            </h2>

            <div className="aggregator-services-table-container">
                <table className="aggregator-services-table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Our Cost (₦)</th>
                            <th>Your Profit (₦)</th>
                            <th>Your Price (₦)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SERVICES_DATA.map((service) => (
                            <tr key={service.id}>
                                <td className="service-name-cell">{service.name}</td>
                                <td className="service-category-cell">{service.category}</td>
                                <td className="service-cost-cell">₦{service.baseCost.toLocaleString()}</td>
                                <td className="service-profit-cell">
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={servicesPricing[service.id]?.profit || 0}
                                        onChange={(e) => handleServiceProfitChange(service.id, e.target.value)}
                                        className="aggregator-profit-input"
                                        placeholder="0"
                                    />
                                </td>
                                <td className="service-price-cell">
                                    ₦{(servicesPricing[service.id]?.myPrice || service.baseCost).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="aggregator-container">
            <div className="aggregator-header">
                <h1 className="aggregator-title">Aggregator Settings</h1>
                <p className="aggregator-subtitle">Configure your aggregator account and subdomain website</p>
            </div>

            <div className="aggregator-tabs">
                <button
                    className={`aggregator-tab ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    <FaCog className="tab-icon" />
                    My Information
                </button>
                <button
                    className={`aggregator-tab ${activeTab === "banking" ? "active" : ""}`}
                    onClick={() => setActiveTab("banking")}
                >
                    <BsBank2 className="tab-icon" />
                    Banking Details
                </button>
                <button
                    className={`aggregator-tab ${activeTab === "customization" ? "active" : ""}`}
                    onClick={() => setActiveTab("customization")}
                >
                    <FaPaintBrush className="tab-icon" />
                    Site Customization
                </button>
                <button
                    className={`aggregator-tab ${activeTab === "pricing" ? "active" : ""}`}
                    onClick={() => setActiveTab("pricing")}
                >
                    <FaTable className="tab-icon" />
                    Services & Pricing
                </button>
            </div>

            <div className="aggregator-content">
                {activeTab === "info" && renderMyInformation()}
                {activeTab === "banking" && renderBankingDetails()}
                {activeTab === "customization" && renderSiteCustomization()}
                {activeTab === "pricing" && renderServicesPricing()}
            </div>

            <div className="aggregator-actions">
                <button
                    className="aggregator-save-btn"
                    onClick={handleSave}
                    disabled={loading || !validateForm()}
                >
                    {loading ? "Saving..." : saved ? <><FaCheck /> Saved!</> : "Save Changes"}
                </button>
            </div>

            {saved && (
                <div className="aggregator-success-toast">
                    <FaCheck className="toast-icon" />
                    Settings saved successfully!
                </div>
            )}
        </div>
    );
}