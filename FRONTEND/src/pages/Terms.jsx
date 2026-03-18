import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedSection>
            <h1 className="section-title mb-4">Terms & Conditions</h1>
            <p className="text-[var(--text-secondary)] text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="glass-panel p-8 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Acceptance of Terms</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                By accessing and using this Placement Cell portal, you accept and agree to be bound by the terms and provision of this agreement. Registration and participation in the placement process imply full acceptance of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. Student Accounts</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Any falsification of data (grades, resumes, personal details) will result in immediate debarment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. Application Restrictions</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Students must only apply to companies where they genuinely intend to participate in the entire recruitment process. Absences from interviews or tests after shortlisting may lead to disciplinary action or blacklisting by the TPO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. Offer Limitations</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Once a student receives a final job offer, they may be restricted from applying to further jobs, depending on the tier of the company and the institution's 'One Student One Job' policy.
              </p>
            </section>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
