
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Contact: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate form submission
        setTimeout(() => {
            setStatus('sent');
        }, 1500);
    };

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-slate-800">Get In Touch</h1>
                    <p className="mt-2 text-lg text-slate-500">We'd love to hear from you. Send us a message!</p>
                </motion.div>
                
                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {status === 'sent' ? (
                            <div className="text-center p-8 bg-green-50 rounded-lg">
                                <h3 className="text-2xl font-bold text-green-700">Thank You!</h3>
                                <p className="text-green-600 mt-2">Your message has been sent successfully. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                    <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                    <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                                    <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                                <div>
                                    <Button type="submit" className="w-full" disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
