import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import TiltCard from '../components/TiltCard';
import { Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    applied: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
  });
  const [recentApps, setRecentApps] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(null);
  const [analytics, setAnalytics] = useState({ monthlyTrend: [], statusDistribution: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, analyticsRes, notifRes] = await Promise.all([
          apiClient.get('/applications/my-applications'),
          apiClient.get('/analytics/student'),
          apiClient.get('/notifications')
        ]);
        
        const appData = Array.isArray(appRes.data) ? appRes.data : [];
        const analyticsData = analyticsRes.data || { monthlyTrend: [], statusDistribution: [] };
        const notifData = notifRes.data?.notifications || [];

        setAnalytics(analyticsData);
        setAnnouncements(notifData);
        
        let applied = 0, shortlisted = 0, selected = 0, rejected = 0;
        
        appData.forEach(app => {
          if (app.status === 'Applied') applied++;
          if (app.status === 'Shortlisted') shortlisted++;
          if (app.status === 'Selected') selected++;
          if (app.status === 'Rejected') rejected++;
        });

        setStats({ applied, shortlisted, selected, rejected });
        setRecentApps(appData.slice(0, 5)); // Show top 5 recent
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    setWithdrawing(id);
    try {
      await apiClient.patch(`/applications/withdraw/${id}`);
      setRecentApps(recentApps.map(app => app._id === id ? { ...app, status: 'Withdrawn' } : app));
      setStats(prev => ({ ...prev, applied: prev.applied - 1 })); // Optional UI optimism
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to withdraw application');
    } finally {
      setWithdrawing(null);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-400">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Student Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Track your application progress and placement statistics.</p>
        </div>
      </AnimatedSection>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedSection delay={0.1}>
          <TiltCard className="flex items-center gap-4 border-l-4 border-blue-500 bg-[var(--panel-bg)] shadow-sm">
            <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-500">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Applied</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stats.applied}</h3>
            </div>
          </TiltCard>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <TiltCard className="flex items-center gap-4 border-l-4 border-purple-500 bg-[var(--panel-bg)] shadow-sm">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-500">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Shortlisted</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stats.shortlisted}</h3>
            </div>
          </TiltCard>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <TiltCard className="flex items-center gap-4 border-l-4 border-emerald-500 flex-1 bg-[var(--panel-bg)] shadow-sm">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-500">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Selected</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stats.selected}</h3>
            </div>
          </TiltCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <TiltCard className="flex items-center gap-4 border-l-4 border-red-500 bg-[var(--panel-bg)] shadow-sm">
            <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-500">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Rejected</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stats.rejected}</h3>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedSection delay={0.5} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Application Activity (Last 6 Months)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyTrend}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
                <XAxis dataKey="name" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '0.75rem', color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Application Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '0.75rem', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>
      </div>

      {/* Announcements and Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatedSection delay={0.7} className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Recent Applications</h2>
          
          {recentApps.length === 0 ? (
            <p className="text-[var(--text-secondary)] text-center py-8">No applications yet. Start applying for jobs!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--panel-border)] text-[var(--text-secondary)] text-sm">
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentApps.map((app) => (
                    <tr key={app._id} className="border-b border-[var(--panel-border)] hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors">
                      <td className="py-4 font-medium text-[var(--text-primary)]">{app.job.companyName}</td>
                      <td className="py-4 text-[var(--text-secondary)]">{app.job.role}</td>
                      <td className="py-4 text-[var(--text-secondary)]">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border
                          ${app.status === 'Applied' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : 
                            app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' :
                            app.status === 'Selected' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                            'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                          }
                        `}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 text-right border-l-0">
                        {app.status === 'Applied' && (
                          <button
                            onClick={() => handleWithdraw(app._id)}
                            disabled={withdrawing === app._id}
                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 transition-colors"
                          >
                            {withdrawing === app._id ? 'Please wait...' : 'Withdraw'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AnimatedSection>
        
        <AnimatedSection delay={0.8} className="glass-panel rounded-2xl p-6 border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Announcements</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
            {announcements.length === 0 ? (
              <p className="text-[var(--text-secondary)] text-center py-8">No new announcements.</p>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement._id} className={`p-4 rounded-xl border ${announcement.type === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-500/5 dark:border-red-500/20' : 'bg-[var(--bg-secondary)] border-[var(--panel-border)]'}`}>
                  <h4 className={`font-semibold text-sm mb-1 ${announcement.type === 'high' ? 'text-red-700 dark:text-red-400' : 'text-[var(--text-primary)]'}`}>
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2 line-clamp-2">{announcement.message}</p>
                  <p className="text-xs text-[var(--text-muted)]">{new Date(announcement.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default StudentDashboard;
