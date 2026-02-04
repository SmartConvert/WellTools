import React, { useState } from 'react';

const ContactPage = ({ setCurrentPage, t }) => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch('https://formspree.io/f/mykpwodd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email, subject, message })
            });
            if (response.ok) {
                setSubmitStatus('success');
                setEmail(''); setSubject(''); setMessage('');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">{t.contact_title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{t.contact_subtitle}</p>
                    {submitStatus === 'success' && (
                        <div className="mb-8 p-6 bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl text-emerald-900 dark:text-emerald-200 animate-fade-in" role="alert">
                            <p className="font-bold text-xl mb-1">{t.msg_sent_success}</p>
                            <p>{t.msg_sent_desc}</p>
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="mb-8 p-6 bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-400 dark:border-rose-600 rounded-2xl text-rose-900 dark:text-rose-200 animate-fade-in" role="alert">
                            <p className="font-bold text-xl mb-1">{t.msg_error}</p>
                            <p>{t.msg_error_desc}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="contact_email" className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.your_email}</label>
                            <input id="contact_email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
                        </div>
                        <div>
                            <label htmlFor="contact_subject" className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.subject}</label>
                            <input id="contact_subject" type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t.subject} className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
                        </div>
                        <div>
                            <label htmlFor="contact_message" className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.message}</label>
                            <textarea id="contact_message" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.message} rows="5" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg resize-none"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:-translate-y-1'}`}>
                            {isSubmitting ? t.sending : t.send_message}
                        </button>
                    </form>
                </div>
                <button onClick={() => setCurrentPage('home')} className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                    {t.back_to_home}
                </button>
            </div>
        </div>
    );
};

export default ContactPage;
