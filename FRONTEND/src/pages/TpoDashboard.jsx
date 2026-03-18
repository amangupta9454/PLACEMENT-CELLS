import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Users, Briefcase, FileText, TrendingUp, CheckCircle, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard = ({ children, borderColor, bgColor }) => (
  <div className={`rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm p-6 flex items-center justify-between border-t-4 ${borderColor}`}>
    {children}
  </div>
);

const TpoDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    verifiedStudents: 0,
    totalJobs: 0,
    totalApplications: 0,
    studentsPlaced: 0,
    placementRate: '0%',
    highestPackage: '0 LPA',
    applicationStats: {},
    branchStats: [],
    topCompanies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await apiClient.get('/analytics');
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-400">Loading Analytics...</div>;

  const cards = [
    {
      label: 'Total Verified Students',
      value: analytics.verifiedStudents,
      sub: `Out of ${analytics.totalStudents} registered`,
      icon: <Users size={32} />,
      border: 'border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500',
    },
    {
      label: 'Total Companies / Jobs',
      value: analytics.totalJobs,
      icon: <Briefcase size={32} />,
      border: 'border-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500',
    },
    {
      label: 'Students Placed',
      value: analytics.studentsPlaced,
      icon: <CheckCircle size={32} />,
      border: 'border-emerald-500',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
    },
    {
      label: 'Total Applications',
      value: analytics.totalApplications,
      icon: <FileText size={32} />,
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
    },
    {
      label: 'Placement Rate',
      value: analytics.placementRate,
      icon: <Percent size={32} />,
      border: 'border-teal-500',
      iconBg: 'bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-500',
    },
    {
      label: 'Highest Package',
      value: analytics.highestPackage,
      icon: <TrendingUp size={32} />,
      border: 'border-orange-500',
      iconBg: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">TPO Analytics Dashboard</h1>
          <p className="text-[var(--text-secondary)]">High-level overview of placement statistics and current activity.</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <AnimatedSection key={card.label} delay={i * 0.1}>
            <StatCard borderColor={card.border}>
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">{card.label}</p>
                <h3 className="text-3xl font-bold text-[var(--text-primary)]">{card.value}</h3>
                {card.sub && <p className="text-xs text-[var(--text-secondary)] mt-2">{card.sub}</p>}
              </div>
              <div className={`p-4 rounded-xl ${card.iconBg}`}>
                {card.icon}
              </div>
            </StatCard>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Application Status Distribution */}
        <AnimatedSection delay={0.6} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Application Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(analytics.applicationStats).map(([k, v]) => ({ name: k, value: v }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.entries(analytics.applicationStats).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

        {/* Top Companies by Applications */}
        <AnimatedSection delay={0.7} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Top Companies</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.topCompanies}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
                <XAxis dataKey="name" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '0.75rem', color: 'var(--text-primary)' }}
                  cursor={{fill: 'var(--bg-secondary)'}}
                />
                <Bar dataKey="applications" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TpoDashboard;
