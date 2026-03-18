import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { GraduationCap, Award, BookOpen, AlertTriangle } from 'lucide-react';

const Eligibility = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedSection>
            <h1 className="section-title mb-4">Eligibility Criteria</h1>
            <p className="text-[var(--text-secondary)] text-lg">General academic requirements for campus placements.</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <TiltCard className="h-full p-6 glass-panel border border-blue-500/20 bg-[var(--panel-bg)] shadow-sm">
                <GraduationCap className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">CGPA Requirement</h3>
                <p className="text-[var(--text-secondary)]">Most core tier-1 companies require a minimum aggregate CGPA of 7.0 or above across all semesters up to the placement drive. IT service companies generally expect 6.0 and above.</p>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <TiltCard className="h-full p-6 glass-panel border border-purple-500/20 bg-[var(--panel-bg)] shadow-sm">
                <AlertTriangle className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Active Backlogs</h3>
                <p className="text-[var(--text-secondary)]">Students must have ZERO active backlogs (arrears) at the time of sitting for placements. Any prior backlogs must be officially cleared before applying.</p>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <TiltCard className="h-full p-6 glass-panel border border-emerald-500/20 bg-[var(--panel-bg)] shadow-sm">
                <BookOpen className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">10th & 12th Grades</h3>
                <p className="text-[var(--text-secondary)]">A consistent academic record is highly favored. Eligibility commonly starts at 60% aggregate marks in 10th and 12th standard (or diploma equivalent) board examinations.</p>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <TiltCard className="h-full p-6 glass-panel border border-amber-500/20 bg-[var(--panel-bg)] shadow-sm">
                <Award className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Skill Requirements</h3>
                <p className="text-[var(--text-secondary)]">Beyond academics, specific job profiles may demand strong competency in data structures, algorithms, specified frameworks, or communication skills (assessed via aptitude tests).</p>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Eligibility;
