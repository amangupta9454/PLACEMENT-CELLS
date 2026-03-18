import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedSection>
            <h1 className="section-title mb-4">Privacy Policy</h1>
            <p className="text-[var(--text-secondary)] text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="glass-panel p-8 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Data Collection</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We collect personal information that you provide to us such as name, address, contact information, academic records, and passwords. This information is specifically used to match students with appropriate corporate recruitment drives.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. How We Use Your Information</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Your resume and academic scores are strictly shared only with registered recruiting companies whom you apply to. We do not sell or rent personal information to third parties. We use your email to send critical placement alerts and application updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. Data Security</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We have implemented appropriate organizational and technical security measures designed to protect the security of any personal information we process, including encrypted passwords and securely hosted Cloudinary resume buckets.
              </p>
            </section>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
