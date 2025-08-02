'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaCaretUp, FaCaretDown, FaBars, FaUserCog, FaUsers, FaMoneyCheckAlt, FaWallet, FaCog, FaSignOutAlt, FaIdCard, FaIdBadge, FaUserShield, FaUserEdit, FaUserCheck, FaUserTimes, FaSearch, FaUserPlus, FaMobileAlt, FaFileAlt, FaChevronCircleLeft, FaChevronCircleRight, FaLock, FaHistory } from 'react-icons/fa';
import WittyTechLogo from '../../public/Images/WittyTechLogo.jpg'
import { useGlobalState } from '../app/GlobalStateProvider';

const navItems = [
    { label: 'DASHBOARD', icon: <FaFileAlt />, href: '/dashboard' },
    {
        label: 'AGGREGATORSHIP', icon: <FaUserCog />, dropdown: [
            { label: 'Settings', icon: <FaCog />, href: '/aggregatorship/settings' },
            { label: 'Clients Management', icon: <FaUsers />, href: '/aggregatorship/clients' },
            { label: 'Clients Transactions', icon: <FaMoneyCheckAlt />, href: '/aggregatorship/transactions' },
            { label: 'Clients Fundings and Profits Record', icon: <FaWallet />, href: '/aggregatorship/fundingsandprofits' },
        ]
    },
    {
        label: 'NIN SERVICES', icon: <FaIdCard />, dropdown: [
            { label: 'NIN verification', icon: <FaIdBadge />, href: '/ninservices/verifynin' },
            { label: 'NIN personalisation', icon: <FaUserEdit />, href: '/ninservices/personalisation' },
            { label: 'IPE clearance', icon: <FaUserShield />, href: '/ninservices/ipeclearance' },
            { label: 'NIN modification', icon: <FaUserEdit />, href: '/ninservices/modifications' },
            { label: 'NIN validation', icon: <FaUserCheck />, href: '/ninservices/validation' },
            // { label: 'NIN suspension', icon: <FaUserTimes />, href: '/ninservices/suspension' },
            // { label: 'Demography Search', icon: <FaSearch />, href: '/ninservices/demography-search' },
            { label: 'vpn personal user creation', icon: <FaUserPlus />, href: '/ninservices/vpnuser' },
        ]
    },
    {
        label: 'BVN SERVICES', icon: <FaIdCard />, dropdown: [
            { label: 'BVN verification', icon: <FaIdBadge />, href: '/bvnservices/verification' },
            { label: 'BVN modification', icon: <FaUserEdit />, href: '/bvnservices/modification' },
            { label: 'BVN retrieval with phone number', icon: <FaMobileAlt />, href: '/bvnservices/bvnretrievalwp' },
            { label: 'BVN License Onboarding Creation', icon: <FaUserPlus />, href: '/bvnservices/liscencecreation' },
            // { label: 'Android BVN licence', icon: <FaMobileAlt />, href: '/bvnservices/abdroidbvnliscense' },
        ]
    },
    { label: 'BULK RECHARGE CARD PRINTING', icon: <FaMoneyCheckAlt />, href: '/bulkrecharge' },
    // { label: 'FUND WALLET', icon: <FaWallet />, href: '/fund-wallet' },
    {
        label: 'Set Transaction PIN', icon: <FaLock />, href: '/settransactionpin'
    },
    { label: 'TERMS AND CONDITIONS', icon: <FaFileAlt />, href: '/termsandconditions' },
    { label: "TRANSACTION HISTORY", icon: <FaHistory />, href: '/transactionshistory' },
    // { label: 'SETTINGS', icon: <FaCog />, href: '/settings' },
    { label: 'LOG OUT', icon: <FaSignOutAlt />, href: '/signin' },

];

const Sidebar = () => {
    const { lockedOpen, setLockedOpen } = useGlobalState('');
    const [collapsed, setCollapsed] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const pathname = usePathname();

    const handleChevronClick = () => {
        if (lockedOpen) {
            setLockedOpen(false);
            setCollapsed(true);
        } else {
            setLockedOpen(true);
            setCollapsed(false);
        }
    };
    const handleMouseEnter = () => {
        if (!lockedOpen) setCollapsed(false);
    };
    const handleMouseLeave = () => {
        if (!lockedOpen) setCollapsed(true);
    };
    const handleDropdown = (idx) => setOpenDropdown(openDropdown === idx ? null : idx);

    // Helper to check if a nav item or its dropdown is active
    const isActive = (href, dropdown) => {
        if (href && pathname === href) return true;
        if (dropdown) {
            return dropdown.some((sub) => pathname === sub.href);
        }
        return false;
    };

    return (
        <>
            {/* Hamburger for mobile */}
            <button className="sidebar-hamburger" onClick={() => setMobileOpen((prev) => !prev)}>
                <FaBars />
            </button>
            {/* Overlay for mobile */}
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>}
            <nav
                className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src={WittyTechLogo.src} alt="Company Logo" />
                    </div>
                    {!collapsed && (
                        <button className="sidebar-collapse-btn" onClick={handleChevronClick}>
                            {lockedOpen ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
                        </button>
                    )}
                </div>
                <ul className="sidebar-nav">
                    {navItems.map((item, idx) => {
                        const active = isActive(item.href, item.dropdown);
                        return (
                            <li key={item.label} className={`sidebar-nav-item${item.dropdown ? ' has-dropdown' : ''}${openDropdown === idx ? ' open' : ''}${active ? ' active' : ''}`}>
                                {item.dropdown ? (
                                    <button
                                        className={`sidebar-nav-link${active ? ' active' : ''}`}
                                        onClick={() => handleDropdown(idx)}
                                        tabIndex={0}
                                    >
                                        <span className="sidebar-icon">{item.icon}</span>
                                        {!collapsed && <span className="sidebar-label">{item.label}</span>}
                                        {!collapsed && (
                                            <span className="sidebar-dropdown-arrow">{openDropdown === idx ? <FaCaretDown /> : <FaCaretUp />}</span>
                                        )}
                                    </button>
                                ) : (
                                    <a className={`sidebar-nav-link${active ? ' active' : ''}`} href={item.href}>
                                        <span className="sidebar-icon">{item.icon}</span>
                                        {!collapsed && <span className="sidebar-label">{item.label}</span>}
                                    </a>
                                )}
                                {item.dropdown && openDropdown === idx && !collapsed && (
                                    <ul className="sidebar-dropdown">
                                        {item.dropdown.map((sub) => {
                                            const subActive = pathname === sub.href;
                                            return (
                                                <li key={sub.label} className={`sidebar-dropdown-item${subActive ? ' active' : ''}`}>
                                                    <a className={`sidebar-nav-link${subActive ? ' active' : ''}`} href={sub.href}>
                                                        <span className="sidebar-icon">{sub.icon}</span>
                                                        <span className="sidebar-label">{sub.label}</span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar; 