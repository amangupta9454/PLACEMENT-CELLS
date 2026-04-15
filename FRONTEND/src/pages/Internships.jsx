import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, Plus, Trash2, Edit2, Loader2, ExternalLink, GraduationCap, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import TiltCard from '../components/TiltCard';
import { useAuth } from '../context/AuthContext';

const Input = ({ label, required, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <input className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" required={required} {...props} />
  </div>
);

const Select = ({ label, required, children, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <select className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" required={required} {...props}>{children}</select>
  </div>
);

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  const [form, setForm] = useState({
    companyName: '',
    applyLink: '',
    role: '',
    description: '',
    experience: 'Fresher',
    stipend: 'Free',
    other: '',
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/internships');
      setInternships(data);
    } catch (err) {
      console.error('Error fetching internships', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setForm({
      companyName: '', applyLink: '', role: '', description: '', experience: 'Fresher', stipend: 'Free', other: '',
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (internship) => {
    setForm({
      companyName: internship.companyName, applyLink: internship.applyLink, role: internship.role,
      description: internship.description, experience: internship.experience, stipend: internship.stipend, other: internship.other || '',
    });
    setEditingId(internship._id);
    setIsModalOpen(true);
  };

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/internships/${editingId}`, form);
      } else {
        await apiClient.post('/internships', form);
      }
      setIsModalOpen(false);
      fetchInternships();
    } catch (err) {
      console.error('Submit failed', err);
      alert(err.response?.data?.message || 'Failed to submit internship');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) return;
    try {
      await apiClient.delete(`/internships/${id}`);
      fetchInternships();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete internship');
    }
  };

  const canEditOrDelete = (internship) => {
    if (!user) return false;
    return user.role === 'tpo' || (internship.postedBy && internship.postedBy._id === user._id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6">
      <AnimatedSection className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--panel-border)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        {/* Ambient glow in header */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-3">
            <GraduationCap size={14} />
            Community Driven
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight">Internship Opportunities</h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-lg">Discover and share premium off-campus internships. Cultivated by students and placement officers.</p>
        </div>
        
        <div className="relative z-10 shrink-0">
           <button
            onClick={openAddModal}
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> 
            Post Internship
          </button>
        </div>
      </AnimatedSection>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
            <Loader2 className="animate-spin mb-3 text-emerald-500" size={32} />
            <p className="font-medium animate-pulse">Fetching global opportunities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {internships.length === 0 ? (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-full text-center py-24 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-3xl border-dashed">
                 <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Internships Found</h3>
                 <p className="text-[var(--text-secondary)]">The board is currently empty. Be the first to post an opportunity!</p>
               </motion.div>
            ) : (
              internships.map((internship, index) => (
                <motion.div key={internship._id} initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }} layout>
                  <TiltCard className="group flex flex-col justify-between bg-[var(--bg-primary)] border border-[var(--panel-border)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Top gradient strip */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="text-emerald-600 dark:text-emerald-400" size={22} />
                          </div>
                          <div className="min-w-0 pr-2">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] truncate text-ellipsis">{internship.companyName}</h3>
                            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold truncate text-ellipsis">{internship.role}</p>
                          </div>
                        </div>
                        {canEditOrDelete(internship) && (
                          <div className="flex gap-1.5 shrink-0 bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--panel-border)]">
                             <button onClick={() => openEditModal(internship)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors">
                               <Edit2 size={14} />
                             </button>
                             <button onClick={() => handleDelete(internship._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                               <Trash2 size={14} />
                             </button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 text-xs rounded-lg font-bold uppercase tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {internship.experience}
                        </span>
                        <span className={`px-3 py-1 text-xs rounded-lg font-bold uppercase tracking-wide border ${internship.stipend === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'}`}>
                          {internship.stipend === 'Paid' ? '💰 Paid' : 'Free / Unpaid'}
                        </span>
                      </div>

                      <div className="relative">
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 whitespace-pre-line leading-relaxed font-medium">
                            {internship.description}
                        </p>
                      </div>
                      
                      {internship.other && (
                        <div className="px-3 py-2 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-4">
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                <span className="font-bold flex items-center gap-1 mb-1"><CheckCircle2 size={12} /> Note:</span> 
                                {internship.other}
                            </p>
                        </div>
                      )}
                      
                    </div>

                    <div className="mt-4 pt-4 border-t border-[var(--panel-border)] space-y-4">
                        <div className="flex items-center gap-2">
                           <div className="flex-1">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-0.5">Posted By</p>
                                <p className="text-xs font-semibold text-[var(--text-primary)]">
                                    {internship.postedBy?.name || 'Unknown User'} 
                                    <span className="ml-1 opacity-50 font-normal">({internship.postedByModel})</span>
                                </p>
                           </div>
                        </div>

                        <a href={internship.applyLink} target="_blank" rel="noreferrer"
                        className="w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm bg-[var(--bg-secondary)] hover:bg-emerald-500 text-[var(--text-primary)] hover:text-white border border-[var(--panel-border)] hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95">
                            Apply Now <ExternalLink size={16} />
                        </a>
                    </div>
                  </TiltCard>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", bounce: 0.3 }}
              className="bg-[var(--bg-primary)] w-full max-w-2xl rounded-3xl border border-[var(--panel-border)] flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
              
              <div className="p-6 border-b border-[var(--panel-border)] flex justify-between items-center bg-[var(--bg-secondary)]/50 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-xl">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
                        {editingId ? 'Edit Internship' : 'Post Internship'}
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">Share an opportunity with the community.</p>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"><X size={16} /></button>
              </div>

              <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Company Name" required value={form.companyName} onChange={e => setField('companyName', e.target.value)} placeholder="e.g. Google, Microsoft" />
                  <Input label="Role" required value={form.role} onChange={e => setField('role', e.target.value)} placeholder="e.g. Software Engineering Intern" />
                  <div className="col-span-1 sm:col-span-2">
                     <Input label="Apply Link (URL)" type="url" required value={form.applyLink} onChange={e => setField('applyLink', e.target.value)} placeholder="https://careers.google.com/..." />
                  </div>
                  <Select label="Candidate Experience" required value={form.experience} onChange={e => setField('experience', e.target.value)}>
                    <option value="Fresher">Fresher (0 Years)</option>
                    <option value="Experienced">Experienced (1+ Years)</option>
                  </Select>
                  <Select label="Stipend Type" required value={form.stipend} onChange={e => setField('stipend', e.target.value)}>
                    <option value="Paid">Paid Stipend</option>
                    <option value="Free">Unpaid / Volunteering</option>
                  </Select>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">Description <span className="text-red-500">*</span></label>
                    <textarea rows={4} required value={form.description} onChange={e => setField('description', e.target.value)}
                      placeholder="List the job requirements, responsibilities, and any other pertinent details."
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none" />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">Additional Note (Optional)</label>
                    <textarea rows={2} value={form.other} onChange={e => setField('other', e.target.value)}
                      placeholder="E.g., Only for 2024 passouts, requires referral, etc."
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-[var(--panel-border)]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--panel-border)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" disabled={submitting}
                    className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20">
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    {editingId ? 'Save Changes' : 'Post Internship'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Internships;
