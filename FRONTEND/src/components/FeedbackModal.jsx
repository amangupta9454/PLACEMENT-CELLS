import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare, Loader2 } from 'lucide-react';
import apiClient from '../api/apiClient';

const FeedbackModal = ({ isOpen, onClose, job }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert('Please select a rating');
    setSubmitting(true);
    try {
      await apiClient.post('/feedback', {
        jobId: job._id,
        rating,
        comments
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setRating(0);
        setComments('');
        onClose();
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--panel-bg)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[var(--panel-border)]"
        >
          {success ? (
            <div className="p-10 text-center space-y-4">
              <div className="text-5xl">🎉</div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Feedback Submitted!</h3>
              <p className="text-[var(--text-secondary)]">Thank you for sharing your experience with {job?.companyName}.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-5 border-b border-[var(--panel-border)] bg-gray-50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">Interview Feedback</h2>
                    <p className="text-xs text-[var(--text-secondary)]">{job?.companyName} - {job?.role}</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 text-center">
                    How was your experience?
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={36}
                          className={`${
                            star <= (hoveredRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300 dark:text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share details about the interview process, questions asked, etc."
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || rating === 0}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
