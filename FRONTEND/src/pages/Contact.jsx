import { useState } from 'react';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden pt-24 pb-16 px-4 max-w-7xl mx-auto gap-12 w-full">
        
        {/* Contact Info */}
        <AnimatedSection className="space-y-8 z-10 w-full flex flex-col justify-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-md">
              Have questions about the platform or placement drives? Reach out to the placement cell administration.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-[var(--text-primary)] font-bold mb-1">Office Location</h4>
                <p className="text-[var(--text-secondary)] text-sm">Placement & Training Cell<br/>Main Admin Block, Ground Floor<br/>University Campus, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-[var(--text-primary)] font-bold mb-1">Email Address</h4>
                <p className="text-[var(--text-secondary)] text-sm">placements@college.edu<br/>support@college.edu</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-[var(--text-primary)] font-bold mb-1">Phone Number</h4>
                <p className="text-[var(--text-secondary)] text-sm">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection delay={0.2} className="z-10 w-full flex items-center">
          <div className="glass-panel p-8 rounded-3xl border border-[var(--panel-border)] w-full relative shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[50px] pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Send a Message</h3>
            
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
                Thank you! Your message has been sent successfully. We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--text-secondary)]">Subject</label>
                <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" placeholder="How can we help?" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--text-secondary)]">Message</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm" placeholder="Your details here..." />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-primary"
              >
                {loading ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </AnimatedSection>
        
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
