import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Briefcase, GraduationCap, TrendingUp, ShieldCheck,
  Zap, Users, Star, ChevronDown, ChevronUp, Bell, FileCheck,
  BarChart3, BookOpen, Award, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedSection } from '../components/AnimatedComponents';
import TiltCard from '../components/TiltCard';

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numericEnd = parseInt(end.replace(/\D/g, ''));
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericEnd);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  const prefix = end.match(/^[^\d]*/)?.[0] || '';
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── Testimonials data ─────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'SDE at Google',
    branch: 'CSE, 2024',
    avatar: 'PS',
    color: 'blue',
    quote: 'The placement portal made the entire process transparent. I could track my application status in real-time and never missed a deadline. Got placed at Google with 42 LPA!',
  },
  {
    name: 'Rahul Verma',
    role: 'Product Manager at Microsoft',
    branch: 'IT, 2024',
    avatar: 'RV',
    color: 'purple',
    quote: 'Amazing platform! The streamlined profile system saved so much time. TPOs could instantly see my verified credentials without extra paperwork. Highly recommend.',
  },
  {
    name: 'Ananya Singh',
    role: 'Data Engineer at Amazon',
    branch: 'ECE, 2023',
    avatar: 'AS',
    color: 'emerald',
    quote: 'I loved how all job notifications came in one place. The eligibility filters meant I only saw relevant roles. Zero confusion, pure focus on preparation!',
  },
];

// ─── FAQ data ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Who can register on the platform?',
    a: 'Any student from our institution can register using their college email address. After OTP verification, your account will be reviewed and activated by the TPO within 24 hours.',
  },
  {
    q: 'How does the eligibility check work?',
    a: 'When you apply for a job, the system automatically checks your CGPA, branch, and other criteria against the company\'s requirements. You can only apply if you meet all conditions.',
  },
  {
    q: 'Can I update my resume after applying?',
    a: 'Yes! You can update your profile and resume at any time. The updated resume will be visible to recruiters for applications that haven\'t been processed yet.',
  },
  {
    q: 'How are placement results communicated?',
    a: 'TPOs post official announcements on the Notice Board and update your application status in real-time. You\'ll see your status change from Applied → Shortlisted → Selected / Rejected.',
  },
];

// ─── Company names for marquee ─────────────────────────────────────────────────
const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix',
  'Wipro', 'Infosys', 'TCS', 'Accenture', 'Deloitte', 'Goldman Sachs',
  'JP Morgan', 'Oracle', 'Salesforce', 'Adobe', 'IBM', 'Samsung',
];

const colorMap = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', ring: 'ring-blue-200 dark:ring-blue-500/20' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-200 dark:ring-purple-500/20' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-500/20' },
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--panel-border)] rounded-2xl overflow-hidden glass-panel card-lift">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left gap-4"
      >
        <span className="font-semibold text-[var(--text-primary)]">{q}</span>
        <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 z-[100]"
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative overflow-hidden pt-24 pb-0">
        {/* Parallax Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ y: y1 }}
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px]"
          />
          <motion.div
            style={{ y: y2 }}
            animate={{ scale: [1, 1.5, 1], x: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-400/15 dark:bg-cyan-600/15 rounded-full blur-[80px]"
          />
        </div>

        {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
        <div className="z-10 text-center max-w-5xl mx-auto px-4 pt-10 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-ring" />
              ✨ The New Standard for Campus Recruiting
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--text-primary)]">
              Accelerate Your <br className="hidden md:block" />
              <span className="text-gradient">Career Journey</span>
            </h1>
          </motion.div>

          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              The all-in-one placement platform connecting elite students with top-tier companies.
              Manage applications, track progress, and land your dream job — all in one place.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/student-register"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 glow-primary w-full sm:w-auto justify-center shadow-lg shadow-blue-500/25"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
            <Link
              to="/student-login"
              className="px-8 py-4 rounded-full glass-panel border border-[var(--panel-border)] hover:bg-blue-50 dark:hover:bg-white/10 text-[var(--text-primary)] font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center flex shadow-sm"
            >
              Student Login
            </Link>
          </AnimatedSection>

          {/* Hero mini trust badges */}
          <AnimatedSection delay={0.6} className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {[
              { icon: CheckCircle2, text: 'OTP Verified Accounts' },
              { icon: ShieldCheck, text: 'TPO Moderated' },
              { icon: Zap, text: 'Real-time Tracking' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-full px-4 py-2 shadow-sm">
                <Icon size={14} className="text-blue-500" />
                {text}
              </div>
            ))}
          </AnimatedSection>
        </div>

        {/* ─── ANIMATED STATS ──────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.3} className="w-full border-y border-[var(--panel-border)] bg-[var(--bg-secondary)] py-14 z-10">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Partner Companies', color: 'text-blue-600 dark:text-blue-400' },
              { value: '95', suffix: '%', label: 'Placement Rate', color: 'text-purple-600 dark:text-purple-400' },
              { value: '50', suffix: ' LPA', label: 'Highest Package', color: 'text-emerald-600 dark:text-emerald-400' },
              { value: '10000', suffix: '+', label: 'Careers Launched', color: 'text-orange-600 dark:text-orange-400' },
            ].map(({ value, suffix, label, color }) => (
              <div key={label}>
                <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${color}`}>
                  <Counter end={value} suffix={suffix || ''} />
                </div>
                <p className="text-[var(--text-secondary)] text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ─── COMPANY MARQUEE ─────────────────────────────────────────────────── */}
        <div className="w-full py-10 overflow-hidden z-10 border-b border-[var(--panel-border)]">
          <p className="text-center text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-6 font-semibold">
            Trusted by graduates hired at
          </p>
          <div className="relative">
            <div className="animate-marquee">
              {[...companies, ...companies].map((c, i) => (
                <div
                  key={i}
                  className="mx-6 px-6 py-3 glass-panel rounded-xl border border-[var(--panel-border)] text-[var(--text-primary)] font-bold text-sm shrink-0 shadow-sm whitespace-nowrap hover:border-blue-400 transition-colors"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── FEATURES GRID ───────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.2} className="w-full max-w-7xl mx-auto py-24 px-4 z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">Platform Features</div>
            <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              A modern infrastructure designed specifically to scale campus recruitment — seamlessly and transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase, color: 'blue',
                title: 'Premium Opportunities',
                desc: 'Access exclusive job postings from top tech giants, hedge funds, and fast-growing startups — curated specifically for your campus.',
              },
              {
                icon: TrendingUp, color: 'purple',
                title: 'Real-time Status Tracking',
                desc: 'Monitor your application status from Applied → Shortlisted → Selected in real-time. No more waiting for email replies.',
              },
              {
                icon: GraduationCap, color: 'emerald',
                title: 'Verified Profile System',
                desc: 'Maintain a single profile with TPO-verified credentials, CGPA, branch, and resume. One profile, all applications.',
              },
              {
                icon: Bell, color: 'orange',
                title: 'Smart Notifications',
                desc: 'Receive instant announcements from the Placement Cell. Never miss a drive, deadline, or shortlist notification.',
              },
              {
                icon: FileCheck, color: 'teal',
                title: 'Eligibility Auto-Check',
                desc: 'Our system automatically verifies your eligibility before letting you apply — ensuring you only see roles you qualify for.',
              },
              {
                icon: BarChart3, color: 'indigo',
                title: 'TPO Analytics Dashboard',
                desc: 'Placement officers get powerful analytics on placement rates, packages, branch-wise stats, and company performance at a glance.',
              },
            ].map(({ icon: Icon, color, title, desc }) => {
              const c = {
                blue: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                purple: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
                emerald: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                orange: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
                teal: 'bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400',
                indigo: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
              }[color];
              return (
                <TiltCard key={title} className="flex flex-col items-start text-left p-8 h-full card-lift">
                  <div className={`w-14 h-14 rounded-2xl ${c} flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{desc}</p>
                </TiltCard>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
        <AnimatedSection className="w-full bg-[var(--bg-secondary)] py-24 z-10 border-y border-[var(--panel-border)]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">Simple Process</div>
              <h2 className="section-title mb-4">How It Works</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Four simple steps from sign-up to dream job.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 dark:from-blue-500/40 dark:via-purple-500/40 dark:to-orange-500/40 z-0" />

              {[
                { n: 1, color: 'blue', label: 'Register', desc: 'Create an account with your college email and verify via OTP.' },
                { n: 2, color: 'purple', label: 'Build Profile', desc: 'Update CGPA, branch, skills, and upload your resume.' },
                { n: 3, color: 'emerald', label: 'Apply Smart', desc: 'Browse eligible roles and apply with one click — no duplicate forms.' },
                { n: 4, color: 'orange', label: 'Get Hired', desc: 'Track progress and receive placement confirmation directly.' },
              ].map(({ n, color, label, desc }) => {
                const cn = {
                  blue: 'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400',
                  purple: 'bg-purple-100 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400',
                  emerald: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
                  orange: 'bg-orange-100 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400',
                }[color];
                return (
                  <div key={n} className="relative text-center z-10">
                    <div className={`w-20 h-20 mx-auto ${cn} border-2 rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                      <span className="text-2xl font-extrabold">{n}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{label}</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.2} className="w-full max-w-7xl mx-auto py-24 px-4 z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">Success Stories</div>
            <h2 className="section-title mb-4">Students Who Made It</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Real placements, real experiences — straight from our alumni.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ name, role, branch, avatar, color, quote }) => {
              const c = colorMap[color];
              return (
                <TiltCard key={name} className="flex flex-col gap-5 p-8 card-lift">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm italic">"{quote}"</p>
                  <div className="flex items-center gap-4 pt-2 border-t border-[var(--panel-border)]">
                    <div className={`w-11 h-11 rounded-full ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm ring-2 ${c.ring}`}>
                      {avatar}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-sm">{name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{role}</p>
                      <p className={`text-xs font-medium ${c.text}`}>{branch}</p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
        <AnimatedSection className="w-full bg-[var(--bg-secondary)] py-24 z-10 border-t border-[var(--panel-border)]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">FAQ</div>
              <h2 className="section-title mb-4">Frequently Asked Questions</h2>
              <p className="text-[var(--text-secondary)]">Quick answers to common queries.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => <FAQItem key={item.q} {...item} />)}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── CTA BANNER ──────────────────────────────────────────────────────── */}
        <AnimatedSection className="w-full z-10 py-0">
          <div className="my-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
            />
            <motion.div
              animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-4 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                <Award size={14} />
                Join 10,000+ students already on the platform
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Your Dream Job Is <br className="hidden md:block" />One Click Away
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                Register today, build your verified profile, and start applying to top companies before the next placement season begins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/student-register"
                  className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  Create Free Account <ArrowRight size={18} />
                </Link>
                <Link
                  to="/tpo-login"
                  className="px-8 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  TPO / Admin Login
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
