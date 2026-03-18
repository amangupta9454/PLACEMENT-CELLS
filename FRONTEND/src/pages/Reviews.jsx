import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Star, MessageSquare, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState('');
  const [filterRating, setFilterRating] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await apiClient.get('/feedback/admin');
      setReviews(data.feedbacks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    if (rating === 3) return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
    return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
  };

  const uniqueJobs = Array.from(new Set(reviews.map(r => r.jobId?._id))).map(id => reviews.find(r => r.jobId?._id === id)?.jobId).filter(Boolean);
  
  const filteredReviews = reviews.filter(r => 
    (!filterJob || r.jobId?._id === filterJob) &&
    (!filterRating || r.rating === parseInt(filterRating))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Student Feedback</h1>
          <p className="text-[var(--text-secondary)]">Review interview experiences and placement feedback.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={filterJob} 
            onChange={(e) => setFilterJob(e.target.value)}
            className="px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
          >
            <option value="">All Companies</option>
            {uniqueJobs.map(job => (
              <option key={job._id} value={job._id}>{job.companyName} — {job.role}</option>
            ))}
          </select>

          <select 
            value={filterRating} 
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none shadow-sm flex-shrink-0"
          >
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
      </AnimatedSection>

      {loading ? (
        <div className="flex items-center justify-center p-20 text-[var(--text-secondary)]">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <AnimatedSection delay={0.1} className="glass-panel p-16 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm text-center">
          <MessageSquare className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Feedback Yet</h2>
          <p className="text-[var(--text-secondary)]">Students haven't submitted any interview feedback yet.</p>
        </AnimatedSection>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                layout
                className="bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-lg line-clamp-1">{review.jobId?.companyName}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{review.jobId?.role}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold border ${getRatingColor(review.rating)}`}>
                    {review.rating} <Star size={14} className="fill-current" />
                  </div>
                </div>

                <div className="flex-1 mb-4">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                    "{review.comments || 'No written comments provided.'}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--panel-border)] flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{review.studentId?.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{review.studentId?.branch}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <Calendar size={12} />
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Reviews;
