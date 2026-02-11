import React, { useState } from 'react';

const CollaborationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const WEBHOOK_URL = "http://localhost:5678/webhook/collaboration-email";

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }),
            });

            if (!response.ok) {
                // Try to read possible JSON error
                let errText = await response.text().catch(() => response.statusText);
                console.error("Webhook returned non-OK:", response.status, errText);
                throw new Error("Webhook returned non-OK: " + response.status);
            }

            setSubmitStatus('success');
            // Clear form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
                setSubmitStatus(null);
            }, 2000);

        } catch (error) {
            console.error("Error sending collaboration request:", error);
            // UI: show error banner "Something went wrong. Please try again later."
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#0f1623] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl shadow-cyan-900/20 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <span className="material-icons">close</span>
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Partner & Collaborate</h2>
                        <p className="text-slate-400">Join us in shaping the future of AI-powered recruitment.</p>
                    </div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                            <span className="material-icons text-green-400">check_circle</span>
                            <p className="text-green-400 font-medium">Your collaboration request has been sent successfully.</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-3">
                            <span className="material-icons text-red-400">error</span>
                            <p className="text-red-400 font-medium">Something went wrong. Please try again later.</p>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-[#0a0f1a] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-[#0a0f1a] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us about your role, organization, and how you'd like to collaborate with ResuMate AI. We'd love to understand your use case, feedback, or partnership ideas."
                                rows="4"
                                required
                                disabled={isSubmitting}
                                className="w-full bg-[#0a0f1a] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-4 rounded-lg transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="material-icons animate-spin">refresh</span>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <span>Send Collaboration Request</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CollaborationModal;
