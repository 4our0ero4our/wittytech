"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    FaIdBadge,
    FaUserShield,
    FaMoneyCheckAlt,
    FaBuilding,
    FaCheck,
    FaArrowRight,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaUsers,
    FaShieldAlt,
    FaBolt,
    FaStar,
    FaQuoteLeft,
    FaChevronRight
} from "react-icons/fa";

const features = [
    {
        icon: <FaIdBadge />,
        title: "NIN Services",
        description: "Complete NIN verification, personalization, modifications, and validation services",
        services: ["NIN Verification", "NIN Personalisation", "IPE Clearance", "NIN Modification", "NIN Validation"]
    },
    {
        icon: <FaUserShield />,
        title: "BVN Services",
        description: "Secure BVN verification, modification, retrieval, and license onboarding services",
        services: ["BVN Verification", "BVN Modification", "BVN Retrieval", "License Onboarding"]
    },
    {
        icon: <FaMoneyCheckAlt />,
        title: "Bulk Recharge",
        description: "Start your own recharge card printing business and earn extra cash",
        services: ["MTN", "GLO", "Airtel", "9Mobile"]
    },
    {
        icon: <FaBuilding />,
        title: "CAC Registration",
        description: "Business registration and corporate affairs commission support services",
        services: ["Business Registration", "Document Processing", "Compliance Support"]
    }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Business Owner",
        content: "Witty's Tech made my BVN verification process incredibly smooth. Fast, reliable, and professional service!",
        rating: 5
    },
    {
        name: "Michael Adebayo",
        role: "Entrepreneur",
        content: "The bulk recharge service helped me start my own business. Great platform with excellent support!",
        rating: 5
    },
    {
        name: "Grace Okonkwo",
        role: "Individual User",
        content: "Quick NIN services with transparent pricing. Highly recommended for anyone needing identity services.",
        rating: 5
    }
];

const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "99.9%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "100+", label: "Services Offered" }
];

export default function LandingPage() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="landing-page-wrapper">
            <div className="landing-page">
                {/* Navigation */}
                <nav className={`landing-nav ${isScrolled ? 'landing-nav-scrolled' : ''}`}>
                    <div className="landing-nav-container">
                        <div className="landing-nav-brand">
                            <img src="/Images/WittyTechLogo.jpg" alt="Witty's Tech" className="landing-nav-logo" />
                            <span className="landing-nav-title">Witty's Tech</span>
                        </div>
                        <div className="landing-nav-links">
                            <button onClick={() => scrollToSection('services')} className="landing-nav-link">Services</button>
                            <button onClick={() => scrollToSection('about')} className="landing-nav-link">About</button>
                            <button onClick={() => scrollToSection('testimonials')} className="landing-nav-link">Reviews</button>
                            <button onClick={() => scrollToSection('contact')} className="landing-nav-link">Contact</button>
                            <button onClick={() => router.push('/signin')} className="landing-nav-cta">Sign In</button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="landing-hero">
                    <div className="landing-hero-container">
                        <div className="landing-hero-content">
                            <h1 className="landing-hero-title">
                                Your Trusted <span className="landing-hero-highlight">Digital Service Hub</span>
                            </h1>
                            <p className="landing-hero-subtitle">
                                At Witty's Tech, we make identity and business services simple, fast, and reliable.
                                Whatever you need, <strong>We've got it.</strong>
                            </p>
                            <div className="landing-hero-features">
                                <div className="landing-hero-feature">
                                    <FaCheck className="landing-hero-feature-icon" />
                                    <span>Instant Processing</span>
                                </div>
                                <div className="landing-hero-feature">
                                    <FaCheck className="landing-hero-feature-icon" />
                                    <span>Secure & Reliable</span>
                                </div>
                                <div className="landing-hero-feature">
                                    <FaCheck className="landing-hero-feature-icon" />
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                            <div className="landing-hero-actions">
                                <button onClick={() => router.push('/dashboard')} className="landing-btn-primary">
                                    Get Started <FaArrowRight />
                                </button>
                                <button onClick={() => scrollToSection('services')} className="landing-btn-secondary">
                                    Explore Services
                                </button>
                            </div>
                        </div>
                        <div className="landing-hero-image">
                            <div className="landing-hero-card">
                                <div className="landing-hero-card-header">
                                    <div className="landing-hero-card-dots">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <span className="landing-hero-card-title">Witty's Tech Platform</span>
                                </div>
                                <div className="landing-hero-card-content">
                                    <div className="landing-hero-stat">
                                        <div className="landing-hero-stat-number">₦2,500</div>
                                        <div className="landing-hero-stat-label">Current Balance</div>
                                    </div>
                                    <div className="landing-hero-services">
                                        <div className="landing-hero-service-item">
                                            <FaIdBadge />
                                            <span>NIN Verification</span>
                                            <FaCheck className="landing-hero-service-check" />
                                        </div>
                                        <div className="landing-hero-service-item">
                                            <FaUserShield />
                                            <span>BVN Services</span>
                                            <FaCheck className="landing-hero-service-check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="landing-stats">
                    <div className="landing-stats-container">
                        {stats.map((stat, index) => (
                            <div key={index} className="landing-stat-item">
                                <div className="landing-stat-number">{stat.number}</div>
                                <div className="landing-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="landing-services">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2 className="landing-section-title">Our Services</h2>
                            <p className="landing-section-subtitle">
                                Comprehensive digital services designed to meet all your identity and business needs
                            </p>
                        </div>
                        <div className="landing-services-grid">
                            {features.map((feature, index) => (
                                <div key={index} className="landing-service-card">
                                    <div className="landing-service-icon">
                                        {feature.icon}
                                    </div>
                                    <h3 className="landing-service-title">{feature.title}</h3>
                                    <p className="landing-service-description">{feature.description}</p>
                                    <ul className="landing-service-list">
                                        {feature.services.map((service, idx) => (
                                            <li key={idx} className="landing-service-list-item">
                                                <FaCheck className="landing-service-list-icon" />
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="landing-service-cta">
                                        Learn More <FaChevronRight />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section id="about" className="landing-why-choose">
                    <div className="landing-container">
                        <div className="landing-why-choose-content">
                            <div className="landing-why-choose-text">
                                <h2 className="landing-section-title">Why Choose Witty's Tech?</h2>
                                <p className="landing-section-subtitle">
                                    We're committed to providing the best digital service experience with cutting-edge technology and exceptional customer support.
                                </p>
                                <div className="landing-why-features">
                                    <div className="landing-why-feature">
                                        <div className="landing-why-feature-icon">
                                            <FaBolt />
                                        </div>
                                        <div className="landing-why-feature-content">
                                            <h4>Lightning Fast</h4>
                                            <p>Get your services processed in minutes, not hours</p>
                                        </div>
                                    </div>
                                    <div className="landing-why-feature">
                                        <div className="landing-why-feature-icon">
                                            <FaShieldAlt />
                                        </div>
                                        <div className="landing-why-feature-content">
                                            <h4>Bank-Level Security</h4>
                                            <p>Your data is protected with enterprise-grade encryption</p>
                                        </div>
                                    </div>
                                    <div className="landing-why-feature">
                                        <div className="landing-why-feature-icon">
                                            <FaUsers />
                                        </div>
                                        <div className="landing-why-feature-content">
                                            <h4>Expert Support</h4>
                                            <p>24/7 customer support from our experienced team</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="landing-why-choose-image">
                                <div className="landing-why-choose-card">
                                    <div className="landing-dashboard-preview">
                                        <div className="landing-dashboard-header">
                                            <div className="landing-dashboard-user">
                                                <div className="landing-dashboard-avatar"></div>
                                                <div>
                                                    <div className="landing-dashboard-name">John Doe</div>
                                                    <div className="landing-dashboard-role">Verified User</div>
                                                </div>
                                            </div>
                                            <div className="landing-dashboard-balance">
                                                <div className="landing-dashboard-balance-label">Wallet Balance</div>
                                                <div className="landing-dashboard-balance-amount">₦15,750</div>
                                            </div>
                                        </div>
                                        <div className="landing-dashboard-services">
                                            <div className="landing-dashboard-service">
                                                <FaIdBadge />
                                                <span>NIN Services</span>
                                            </div>
                                            <div className="landing-dashboard-service">
                                                <FaUserShield />
                                                <span>BVN Services</span>
                                            </div>
                                            <div className="landing-dashboard-service">
                                                <FaMoneyCheckAlt />
                                                <span>Bulk Recharge</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="landing-testimonials">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2 className="landing-section-title">What Our Customers Say</h2>
                            <p className="landing-section-subtitle">
                                Don't just take our word for it - hear from our satisfied customers
                            </p>
                        </div>
                        <div className="landing-testimonials-grid">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="landing-testimonial-card">
                                    <div className="landing-testimonial-quote">
                                        <FaQuoteLeft />
                                    </div>
                                    <div className="landing-testimonial-stars">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <p className="landing-testimonial-content">{testimonial.content}</p>
                                    <div className="landing-testimonial-author">
                                        <div className="landing-testimonial-avatar">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="landing-testimonial-name">{testimonial.name}</div>
                                            <div className="landing-testimonial-role">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="landing-cta">
                    <div className="landing-container">
                        <div className="landing-cta-content">
                            <h2 className="landing-cta-title">Ready to Get Started?</h2>
                            <p className="landing-cta-subtitle">
                                Join thousands of satisfied customers and experience the future of digital services
                            </p>
                            <div className="landing-cta-actions">
                                <button onClick={() => router.push('/dashboard')} className="landing-btn-primary landing-btn-large">
                                    Start Now - It's Free
                                </button>
                                <button onClick={() => scrollToSection('contact')} className="landing-btn-secondary landing-btn-large">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="landing-contact">
                    <div className="landing-container">
                        <div className="landing-contact-content">
                            <div className="landing-contact-info">
                                <h3 className="landing-contact-title">Get in Touch</h3>
                                <p className="landing-contact-subtitle">
                                    Have questions? We're here to help you 24/7
                                </p>
                                <div className="landing-contact-methods">
                                    <div className="landing-contact-method">
                                        <div className="landing-contact-method-icon">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <div className="landing-contact-method-label">Phone</div>
                                            <div className="landing-contact-method-value">+234 (0) 123 456 7890</div>
                                        </div>
                                    </div>
                                    <div className="landing-contact-method">
                                        <div className="landing-contact-method-icon">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <div className="landing-contact-method-label">Email</div>
                                            <div className="landing-contact-method-value">support@wittytech.com</div>
                                        </div>
                                    </div>
                                    <div className="landing-contact-method">
                                        <div className="landing-contact-method-icon">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <div className="landing-contact-method-label">Address</div>
                                            <div className="landing-contact-method-value">Lagos, Nigeria</div>
                                        </div>
                                    </div>
                                    <div className="landing-contact-method">
                                        <div className="landing-contact-method-icon">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <div className="landing-contact-method-label">Support Hours</div>
                                            <div className="landing-contact-method-value">24/7 Available</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="landing-contact-form">
                                <h4 className="landing-contact-form-title">Send us a Message</h4>
                                <form className="landing-form">
                                    <div className="landing-form-row">
                                        <input type="text" placeholder="Your Name" className="landing-form-input" />
                                        <input type="email" placeholder="Your Email" className="landing-form-input" />
                                    </div>
                                    <input type="text" placeholder="Subject" className="landing-form-input" />
                                    <textarea placeholder="Your Message" rows="4" className="landing-form-textarea"></textarea>
                                    <button type="submit" className="landing-btn-primary">
                                        Send Message <FaArrowRight />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="landing-footer">
                    <div className="landing-container">
                        <div className="landing-footer-content">
                            <div className="landing-footer-brand">
                                <div className="landing-footer-logo">
                                    <img src="/Images/WittyTechLogo.jpg" alt="Witty's Tech" />
                                    <span>Witty's Tech</span>
                                </div>
                                <p className="landing-footer-description">
                                    Your trusted partner for all digital identity and business services.
                                    Making complex processes simple, fast, and reliable.
                                </p>
                            </div>
                            <div className="landing-footer-links">
                                <div className="landing-footer-column">
                                    <h5>Services</h5>
                                    <ul>
                                        <li><button onClick={() => router.push('/ninservices/verifynin')}>NIN Verification</button></li>
                                        <li><button onClick={() => router.push('/bvnservices/verification')}>BVN Services</button></li>
                                        <li><button onClick={() => router.push('/bulkrecharge')}>Bulk Recharge</button></li>
                                        <li><button onClick={() => router.push('/termsandconditions')}>Terms & Conditions</button></li>
                                    </ul>
                                </div>
                                <div className="landing-footer-column">
                                    <h5>Account</h5>
                                    <ul>
                                        <li><button onClick={() => router.push('/signin')}>Sign In</button></li>
                                        <li><button onClick={() => router.push('/dashboard')}>Dashboard</button></li>
                                        <li><button onClick={() => router.push('/transactionshistory')}>Transactions</button></li>
                                        <li><button onClick={() => router.push('/settransactionpin')}>Settings</button></li>
                                    </ul>
                                </div>
                                <div className="landing-footer-column">
                                    <h5>Support</h5>
                                    <ul>
                                        <li><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
                                        <li><a href="tel:+2341234567890">Call Support</a></li>
                                        <li><a href="mailto:support@wittytech.com">Email Support</a></li>
                                        <li><a href="#">Help Center</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="landing-footer-bottom">
                            <p>&copy; 2025 Witty's Tech. All rights reserved.</p>
                            <div className="landing-footer-bottom-links">
                                <button>Privacy Policy</button>
                                <button onClick={() => router.push('/termsandconditions')}>Terms of Service</button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}