import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, GitCommit, Calendar } from 'lucide-react';
import apiClient from '../api/apiClient';

const TimelineModal = ({ isOpen, onClose, userId, contextTitle }) => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      fetchTimeline();
    }
  }, [isOpen, userId]);

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(`/activity/${userId}`);
      setTimeline(data.timeline || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--panel-bg)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[var(--panel-border)] flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-5 border-b border-[var(--panel-border)] bg-gray-50 dark:bg-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg">
                <GitCommit size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Activity Timeline</h2>
                <p className="text-xs text-[var(--text-secondary)]">{contextTitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 size={24} className="animate-spin text-purple-500" />
              </div>
            ) : timeline.length === 0 ? (
              <div className="text-center py-10 text-[var(--text-secondary)]">
                No activity recorded yet.
              </div>
            ) : (
              <div className="relative border-l-2 border-purple-200 dark:border-purple-500/20 ml-3 space-y-6 pb-4">
                {timeline.map((event, index) => (
                  <div key={event._id} className="relative pl-6">
                    {/* Timeline Node */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-500 dark:bg-[var(--panel-bg)] z-10" />
                    
                    <div className="bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-bold text-sm text-[var(--text-primary)]">{event.action}</h4>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--panel-bg)] px-2 py-1 rounded-md shrink-0 border border-[var(--panel-border)]">
                          <Calendar size={10} />
                          {new Date(event.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {event.details}
                      </p>
                      
                      {event.module && (
                        <div className="mt-3">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            {event.module}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TimelineModal;
