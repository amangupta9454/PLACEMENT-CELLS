import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const PlacementData = () => {
  const branchData = [
    { name: 'Computer Science', value: 340, fill: '#3b82f6' },
    { name: 'Information Tech', value: 210, fill: '#8b5cf6' },
    { name: 'Electronics', value: 180, fill: '#10b981' },
    { name: 'Mechanical', value: 90, fill: '#f59e0b' },
  ];

  const packageData = [
    { year: '2021', avg: 5.5, highest: 24 },
    { year: '2022', avg: 6.8, highest: 32 },
    { year: '2023', avg: 7.4, highest: 44 },
    { year: '2024', avg: 8.2, highest: 52 },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="section-title mb-4">Placement Statistics</h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                Discover our consistent growth in placement records, highlighting our students' success and strong industry partnerships.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <AnimatedSection delay={0.1}>
              <TiltCard className="p-6 text-center glass-panel bg-[var(--panel-bg)] border-[var(--panel-border)] shadow-sm">
                <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">94%</h3>
                <p className="text-[var(--text-secondary)] font-medium">Overall Placement Rate (2024)</p>
              </TiltCard>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <TiltCard className="p-6 text-center glass-panel bg-[var(--panel-bg)] border-[var(--panel-border)] shadow-sm">
                <h3 className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">250+</h3>
                <p className="text-[var(--text-secondary)] font-medium">Recruiting Partners</p>
              </TiltCard>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <TiltCard className="p-6 text-center glass-panel bg-[var(--panel-bg)] border-[var(--panel-border)] shadow-sm">
                <h3 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">52 LPA</h3>
                <p className="text-[var(--text-secondary)] font-medium">Highest IT Package (2024)</p>
              </TiltCard>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection delay={0.4} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Placements by Branch</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={branchData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                      {branchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '0.75rem' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Package Trends (LPA)</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={packageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
                    <XAxis dataKey="year" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '0.75rem' }} />
                    <Legend />
                    <Bar dataKey="avg" name="Average Package" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="highest" name="Highest Package" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlacementData;
