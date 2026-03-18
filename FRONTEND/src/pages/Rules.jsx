import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Rules = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedSection>
            <h1 className="section-title mb-4">Rules & Regulations</h1>
            <p className="text-[var(--text-secondary)] text-lg">Code of Conduct for Placement Activities</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="glass-panel p-8 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm space-y-6">
            <ul className="space-y-4 list-disc list-inside text-[var(--text-secondary)]">
              <li className="leading-relaxed"><strong className="text-[var(--text-primary)]">Punctuality:</strong> Students must arrive at least 15 minutes before the scheduled time for any placement activity (PPT, Written Test, Interview). Latecomers will not be permitted.</li>
              <li className="leading-relaxed"><strong className="text-[var(--text-primary)]">Dress Code:</strong> Formal attire is strictly mandatory for all placement activities. Anyone found inappropriately dressed may be barred from the process.</li>
              <li className="leading-relaxed"><strong className="text-[var(--text-primary)]">Identity Verification:</strong> Students must carry their original College ID cards and at least two physical copies of their latest verified resume.</li>
              <li className="leading-relaxed"><strong className="text-[var(--text-primary)]">Pre-Placement Talks (PPT):</strong> Attendance for the PPT is compulsory for students who have applied to that specific company. Failure to attend will result in disqualification from the remainder of that company's process.</li>
              <li className="leading-relaxed"><strong className="text-[var(--text-primary)]">Communication:</strong> Direct communication with HR delegates or company officials outside of the designated interview rooms is strictly prohibited unless authorized by the TPO.</li>
            </ul>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
