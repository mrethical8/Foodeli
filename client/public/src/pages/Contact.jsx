import React, { useState, useEffect } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [activeField, setActiveField] = useState(null);

    // Track cursor position for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFocus = (fieldName) => {
        setActiveField(fieldName);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Confetti effect
            if (typeof window !== 'undefined') {
                const confetti = await import('canvas-confetti');
                confetti.default({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate parallax effects based on cursor position
    const calculateParallax = (intensity) => {
        const x = (cursorPosition.x - window.innerWidth / 2) * intensity;
        const y = (cursorPosition.y - window.innerHeight / 2) * intensity;
        return { transform: `translate(${x}px, ${y}px)` };
    };

    return (
        <div style={styles.container}>
            {/* Sign In Button */}
            <div style={styles.signInContainer}>
            </div>

            {/* Animated background elements */}
            <div style={styles.backgroundElements}>
                <div style={{ ...styles.circle1, ...calculateParallax(0.02) }}></div>
                <div style={{ ...styles.circle2, ...calculateParallax(0.03) }}></div>
                <div style={{ ...styles.circle3, ...calculateParallax(0.01) }}></div>
            </div>

            <div style={styles.content}>
                <div style={styles.header}>
                    <h1 style={styles.title}>
                        <span style={styles.titleHighlight}>Contact</span> Us
                    </h1>
                    <p style={styles.subtitle}>
                        Have questions or feedback? We'd love to hear from you.
                        <span style={styles.subtitleUnderline}></span>
                    </p>
                </div>

                <div style={styles.grid}>
                    {/* Contact Form */}
                    <div style={styles.formContainer}>
                        <div style={styles.formGlow}></div>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label htmlFor="name" style={styles.label}>
                                    <span style={styles.labelNumber}>01.</span> Full Name
                                </label>
                                <div style={activeField === 'name' ? styles.inputWrapperActive : styles.inputWrapper}>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('name')}
                                        onBlur={handleBlur}
                                        style={styles.input}
                                        placeholder="John Doe"
                                    />
                                    <div style={styles.inputBorder}></div>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label htmlFor="email" style={styles.label}>
                                    <span style={styles.labelNumber}>02.</span> Email Address
                                </label>
                                <div style={activeField === 'email' ? styles.inputWrapperActive : styles.inputWrapper}>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={handleBlur}
                                        style={styles.input}
                                        placeholder="you@example.com"
                                    />
                                    <div style={styles.inputBorder}></div>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label htmlFor="message" style={styles.label}>
                                    <span style={styles.labelNumber}>03.</span> Your Message
                                </label>
                                <div style={activeField === 'message' ? styles.textareaWrapperActive : styles.textareaWrapper}>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('message')}
                                        onBlur={handleBlur}
                                        style={styles.textarea}
                                        placeholder="How can we help you?"
                                    />
                                    <div style={styles.textareaBorder}></div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 20px rgba(255, 59, 48, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 5px 15px rgba(255, 59, 48, 0.2)';
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span style={styles.buttonLoader}></span>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div style={styles.infoContainer}>
                        <h2 style={styles.infoTitle}>
                            <span style={styles.infoTitleAccent}>Get</span> in Touch
                        </h2>

                        <div style={styles.infoItems}>
                            {/* Phone */}
                            <div style={styles.infoItem}>
                                <div style={styles.infoIconContainer}>
                                    <div style={styles.infoIconBackground}></div>
                                    <div style={styles.infoIcon}>📞</div>
                                </div>
                                <div>
                                    <h3 style={styles.infoLabel}>Phone</h3>
                                    <p style={styles.infoText}>+91-9XXXXXXXXX</p>
                                    <p style={styles.infoSubtext}>Mon-Fri from 9am to 5pm</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div style={styles.infoItem}>
                                <div style={styles.infoIconContainer}>
                                    <div style={styles.infoIconBackground}></div>
                                    <div style={styles.infoIcon}>✉️</div>
                                </div>
                                <div>
                                    <h3 style={styles.infoLabel}>Email</h3>
                                    <p style={styles.infoText}>support@foodelivery.com</p>
                                    <p style={styles.infoSubtext}>Response within 24 hours</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div style={styles.infoItem}>
                                <div style={styles.infoIconContainer}>
                                    <div style={styles.infoIconBackground}></div>
                                    <div style={styles.infoIcon}>📍</div>
                                </div>
                                <div>
                                    <h3 style={styles.infoLabel}>Address</h3>
                                    <p style={styles.infoText}>123, Main Street, Your City, India</p>
                                    <p style={styles.infoSubtext}>Visit us by appointment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success message */}
            {submitStatus === 'success' && (
                <div style={styles.successModal}>
                    <div style={styles.successContent}>
                        <div style={styles.successCheckmark}>
                            <div style={styles.checkmarkCircle}></div>
                            <div style={styles.checkmarkStem}></div>
                            <div style={styles.checkmarkKick}></div>
                        </div>
                        <h3 style={styles.successTitle}>Message Sent!</h3>
                        <p style={styles.successText}>We'll get back to you within 24 hours.</p>
                        <button
                            onClick={() => setSubmitStatus(null)}
                            style={styles.successButton}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Premium CSS styles with animations and effects
const styles = {
    container: {
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    backgroundElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
    },
    circle1: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 59, 48, 0.15) 0%, rgba(255, 59, 48, 0) 70%)',
        top: '-200px',
        left: '-200px',
        transition: 'transform 0.1s linear'
    },
    circle2: {
        position: 'absolute',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 59, 48, 0.1) 0%, rgba(255, 59, 48, 0) 70%)',
        bottom: '-300px',
        right: '-300px',
        transition: 'transform 0.1s linear'
    },
    circle3: {
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 149, 0, 0.1) 0%, rgba(255, 149, 0, 0) 70%)',
        top: '50%',
        left: '70%',
        transition: 'transform 0.1s linear'
    },
    content: {
        position: 'relative',
        zIndex: 1
    },
    header: {
        textAlign: 'center',
        marginBottom: '4rem'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        color: '#000',
        marginBottom: '1.5rem',
        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    titleHighlight: {
        color: '#ff3b30',
        display: 'inline-block'
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#666',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        display: 'inline-block'
    },
    subtitleUnderline: {
        position: 'absolute',
        bottom: '-5px',
        left: '0',
        width: '100%',
        height: '2px',
        background: '#ff3b30',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        animation: 'underlineExpand 2s infinite alternate'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr'
        }
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 59, 48, 0.2)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
    },
    formGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 59, 48, 0.15), transparent 70%)',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    label: {
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    labelNumber: {
        color: '#ff3b30',
        fontSize: '0.8rem'
    },
    inputWrapper: {
        position: 'relative',
        transition: 'all 0.3s ease'
    },
    inputWrapperActive: {
        position: 'relative',
        transform: 'translateY(-3px)'
    },
    input: {
        width: '100%',
        padding: '1rem 1.25rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid #ddd',
        borderRadius: '12px',
        fontSize: '1rem',
        color: '#333',
        outline: 'none',
        transition: 'all 0.3s ease',
        ':focus': {
            backgroundColor: '#fff',
            borderColor: '#ff3b30'
        }
    },
    inputBorder: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '0%',
        height: '2px',
        background: '#ff3b30',
        transition: 'width 0.4s ease'
    },
    textareaWrapper: {
        position: 'relative',
        transition: 'all 0.3s ease'
    },
    textareaWrapperActive: {
        position: 'relative',
        transform: 'translateY(-3px)'
    },
    textarea: {
        width: '100%',
        padding: '1rem 1.25rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid #ddd',
        borderRadius: '12px',
        fontSize: '1rem',
        color: '#333',
        outline: 'none',
        minHeight: '150px',
        resize: 'vertical',
        transition: 'all 0.3s ease',
        ':focus': {
            backgroundColor: '#fff',
            borderColor: '#ff3b30'
        }
    },
    textareaBorder: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '0%',
        height: '2px',
        background: '#ff3b30',
        transition: 'width 0.4s ease'
    },
    submitButton: {
        backgroundColor: '#ff3b30',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(255, 59, 48, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(255, 59, 48, 0.3)'
        },
        ':active': {
            transform: 'translateY(0)'
        }
    },
    submitButtonDisabled: {
        backgroundColor: '#999',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        opacity: '0.7'
    },
    buttonLoader: {
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #fff',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
        animation: 'spin 1s linear infinite'
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '2.5rem',
        border: '1px solid rgba(255, 59, 48, 0.2)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
    },
    infoTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#000',
        marginBottom: '2rem',
        position: 'relative'
    },
    infoTitleAccent: {
        color: '#ff3b30'
    },
    infoItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    infoItem: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start'
    },
    infoIconContainer: {
        position: 'relative',
        flexShrink: '0'
    },
    infoIconBackground: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '48px',
        height: '48px',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        borderRadius: '12px',
        transform: 'rotate(45deg)',
        transition: 'all 0.3s ease'
    },
    infoIcon: {
        position: 'relative',
        zIndex: '1',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        color: '#ff3b30'
    },
    infoLabel: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#666',
        marginBottom: '0.25rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    infoText: {
        fontSize: '1.1rem',
        color: '#000',
        marginBottom: '0.25rem',
        fontWeight: '500'
    },
    infoSubtext: {
        fontSize: '0.85rem',
        color: '#666'
    },
    successModal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        opacity: '0',
        animation: 'fadeIn 0.3s forwards'
    },
    successContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        border: '1px solid rgba(255, 59, 48, 0.2)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(20px)',
        animation: 'slideUp 0.4s forwards'
    },
    successCheckmark: {
        width: '80px',
        height: '80px',
        margin: '0 auto 2rem',
        position: 'relative'
    },
    checkmarkCircle: {
        position: 'absolute',
        width: '80px',
        height: '80px',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        borderRadius: '50%',
        animation: 'scaleIn 0.3s ease-out'
    },
    checkmarkStem: {
        position: 'absolute',
        width: '8px',
        height: '40px',
        backgroundColor: '#ff3b30',
        left: '38px',
        top: '10px',
        transform: 'rotate(45deg)',
        transformOrigin: 'bottom',
        animation: 'drawStem 0.5s forwards'
    },
    checkmarkKick: {
        position: 'absolute',
        width: '20px',
        height: '8px',
        backgroundColor: '#ff3b30',
        left: '20px',
        top: '45px',
        transform: 'rotate(45deg)',
        transformOrigin: 'left',
        animation: 'drawKick 0.5s forwards 0.3s',
        opacity: '0'
    },
    successTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#000',
        marginBottom: '1rem'
    },
    successText: {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.6'
    },
    successButton: {
        backgroundColor: 'transparent',
        color: '#ff3b30',
        padding: '0.8rem 2rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '2px solid #ff3b30',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 59, 48, 0.1)'
        }
    },
    // Animation keyframes
    '@keyframes underlineExpand': {
        '0%': { transform: 'scaleX(0)' },
        '100%': { transform: 'scaleX(1)' }
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    },
    '@keyframes fadeIn': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
    },
    '@keyframes slideUp': {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
    },
    '@keyframes scaleIn': {
        '0%': { transform: 'scale(0)' },
        '100%': { transform: 'scale(1)' }
    },
    '@keyframes drawStem': {
        '0%': { height: '0' },
        '100%': { height: '40px' }
    },
    '@keyframes drawKick': {
        '0%': { width: '0', opacity: '0' },
        '100%': { width: '20px', opacity: '1' }
    }
};

export default Contact;