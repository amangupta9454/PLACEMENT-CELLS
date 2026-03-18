import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { FileText, CheckCircle, Clock, XCircle, Building2, MessageSquare, GitCommit } from 'lucide-react';
import { motion } from 'framer-motion';
import FeedbackModal from '../components/FeedbackModal';
import TimelineModal from '../components/TimelineModal';
import { useAuth } from '../context/AuthContext';

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackJob, setFeedbackJob] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await apiClient.get('/applications/my-applications');
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Applied':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Clock };
      case 'Shortlisted':
        return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: FileText };
      case 'Selected':
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle };
      case 'Rejected':
        return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Clock };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Application Tracker</h1>
          <p className="text-[var(--text-secondary)]">Track and manage all your ongoing job applications here.</p>
        </div>
        <button 
          onClick={() => setShowTimeline(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20 rounded-xl font-medium transition-colors text-sm shrink-0"
        >
          <GitCommit size={16} /> View Full Timeline
        </button>
      </AnimatedSection>

      {loading ? (
        <div className="text-center py-20 text-[var(--text-secondary)]">Loading your applications...</div>
      ) : applications.length === 0 ? (
        <AnimatedSection className="glass-panel p-12 rounded-2xl text-center border border-[var(--panel-border)] shadow-sm bg-[var(--panel-bg)]">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Applications Yet</h2>
          <p className="text-[var(--text-secondary)]">You haven't applied to any jobs yet. Check out the job board.</p>
        </AnimatedSection>
      ) : (
        <div className="space-y-4">
          {applications.map((app, index) => {
            const StatusIcon = getStatusConfig(app.status).icon;
            
            return (
              <AnimatedSection key={app._id} delay={index * 0.1}>
                <div className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] shadow-sm bg-[var(--panel-bg)] flex flex-col sm:flex-row items-center justify-between gap-6 transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center border border-[var(--panel-border)] shrink-0">
                      <Building2 className="text-gray-400 dark:text-gray-300" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{app.job.companyName}</h3>
                      <p className="text-[var(--text-secondary)] font-medium">{app.job.role}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-secondary)]">
                        <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                        <span>Package: {app.job.package || app.job.ctc || app.job.stipend}</span>
                      </div>
                      
                      {['Selected', 'Rejected', 'Shortlisted'].includes(app.status) && (
                        <button
                          onClick={() => setFeedbackJob(app.job)}
                          className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          <MessageSquare size={14} /> Review Process
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className={`flex flex-col items-center justify-center px-6 py-3 rounded-xl border w-full sm:w-auto ${getStatusConfig(app.status).bg} ${getStatusConfig(app.status).border}`}>
                    <StatusIcon className={`mb-1 ${getStatusConfig(app.status).color}`} size={24} />
                    <span className={`text-sm font-bold tracking-wide uppercase ${getStatusConfig(app.status).color}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={!!feedbackJob} 
        onClose={() => setFeedbackJob(null)} 
        job={feedbackJob} 
      />

      {/* Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        userId={user?._id}
        contextTitle="Your Application Journey"
      />
    </div>
  );
};

export default ApplicationTracker;
