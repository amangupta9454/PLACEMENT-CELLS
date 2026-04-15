import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Loader2, ExternalLink, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import TiltCard from '../components/TiltCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <AnimatedSection className="relative bg-[var(--bg-secondary)] py-12 px-8 rounded-3xl border border-[var(--panel-border)] overflow-hidden flex flex-col items-center justify-center text-center shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
                <GraduationCap size={14} />
                Community Driven
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
                Internship Opportunities
              </h1>
              <p className="text-[var(--text-secondary)] font-medium max-w-2xl text-lg mx-auto">
                Discover and apply to premium off-campus internships. These opportunities are cultivated by our student community and placement officers.
              </p>
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
                     <p className="text-[var(--text-secondary)]">The board is currently empty. Check back later for new opportunities!</p>
                   </motion.div>
                ) : (
                  internships.map((internship, index) => (
                    <motion.div key={internship._id} initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }} layout>
                      <TiltCard className="group flex flex-col justify-between bg-[var(--bg-primary)] border border-[var(--panel-border)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 h-full relative overflow-hidden">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicInternships;
