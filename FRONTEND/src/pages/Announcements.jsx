import { useState, useEffect, useContext } from 'react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Megaphone, Trash2, Plus, Clock } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const isTpo = user?.role === 'tpo';

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Create state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await apiClient.get('/announcements');
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setCreating(true);
    try {
      const { data } = await apiClient.post('/announcements', { title, content });
      setAnnouncements([data, ...announcements]);
      setTitle('');
      setContent('');
    } catch (error) {
      alert('Failed to post announcement');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    
    try {
      await apiClient.delete(`/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Notice Board</h1>
          <p className="text-[var(--text-secondary)]">Important updates and announcements from the Placement Cell.</p>
        </div>
      </AnimatedSection>

      {/* Admin Create Form */}
      {isTpo && (
        <AnimatedSection delay={0.1} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />
          
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Plus className="text-purple-500" /> Post New Announcement
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Write your message here..."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none shadow-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50"
              >
                {creating ? 'Posting...' : 'Publish'}
              </button>
            </div>
          </form>
        </AnimatedSection>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-[var(--text-secondary)]">Loading notices...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-secondary)] glass-panel rounded-2xl border border-[var(--panel-border)] border-dashed bg-[var(--panel-bg)]">
            <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p>No recent announcements.</p>
          </div>
        ) : (
          announcements.map((item, idx) => (
            <AnimatedSection key={item._id} delay={0.2 + idx * 0.1}>
              <TiltCard className="relative overflow-hidden group bg-[var(--panel-bg)] shadow-sm">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-[var(--panel-border)] flex items-center justify-center">
                      <Megaphone className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1">
                        <Clock size={12} />
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
                        <span>•</span>
                        <span className="text-purple-600 dark:text-purple-400">{item.createdBy?.name || 'Admin'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isTpo && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Announcement"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                
                <p className="text-[var(--text-secondary)] mt-2 whitespace-pre-wrap leading-relaxed text-sm">
                  {item.content}
                </p>
              </TiltCard>
            </AnimatedSection>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
