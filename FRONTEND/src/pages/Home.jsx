// import { useState, useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight, Briefcase, GraduationCap, TrendingUp, ShieldCheck,
//   Zap, Users, Star, ChevronDown, ChevronUp, Bell, FileCheck,
//   BarChart3, BookOpen, Award, CheckCircle2
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { AnimatedSection } from '../components/AnimatedComponents';
// import TiltCard from '../components/TiltCard';

// // ─── Animated Counter ─────────────────────────────────────────────────────────
// const Counter = ({ end, suffix = '', duration = 2000 }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const [started, setStarted] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
//       { threshold: 0.5 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [started]);

//   useEffect(() => {
//     if (!started) return;
//     const numericEnd = parseInt(end.replace(/\D/g, ''));
//     let startTime = null;
//     const step = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       setCount(Math.floor(progress * numericEnd));
//       if (progress < 1) requestAnimationFrame(step);
//       else setCount(numericEnd);
//     };
//     requestAnimationFrame(step);
//   }, [started, end, duration]);

//   const prefix = end.match(/^[^\d]*/)?.[0] || '';
//   return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
// };

// // ─── Testimonials data ─────────────────────────────────────────────────────────
// const testimonials = [
//   {
//     name: 'Priya Sharma',
//     role: 'SDE at Google',
//     branch: 'CSE, 2024',
//     avatar: 'PS',
//     color: 'blue',
//     quote: 'The placement portal made the entire process transparent. I could track my application status in real-time and never missed a deadline. Got placed at Google with 42 LPA!',
//   },
//   {
//     name: 'Rahul Verma',
//     role: 'Product Manager at Microsoft',
//     branch: 'IT, 2024',
//     avatar: 'RV',
//     color: 'purple',
//     quote: 'Amazing platform! The streamlined profile system saved so much time. TPOs could instantly see my verified credentials without extra paperwork. Highly recommend.',
//   },
//   {
//     name: 'Ananya Singh',
//     role: 'Data Engineer at Amazon',
//     branch: 'ECE, 2023',
//     avatar: 'AS',
//     color: 'emerald',
//     quote: 'I loved how all job notifications came in one place. The eligibility filters meant I only saw relevant roles. Zero confusion, pure focus on preparation!',
//   },
// ];

// // ─── FAQ data ──────────────────────────────────────────────────────────────────
// const faqs = [
//   {
//     q: 'Who can register on the platform?',
//     a: 'Any student from our institution can register using their college email address. After OTP verification, your account will be reviewed and activated by the TPO within 24 hours.',
//   },
//   {
//     q: 'How does the eligibility check work?',
//     a: 'When you apply for a job, the system automatically checks your CGPA, branch, and other criteria against the company\'s requirements. You can only apply if you meet all conditions.',
//   },
//   {
//     q: 'Can I update my resume after applying?',
//     a: 'Yes! You can update your profile and resume at any time. The updated resume will be visible to recruiters for applications that haven\'t been processed yet.',
//   },
//   {
//     q: 'How are placement results communicated?',
//     a: 'TPOs post official announcements on the Notice Board and update your application status in real-time. You\'ll see your status change from Applied → Shortlisted → Selected / Rejected.',
//   },
// ];

// // ─── Company names for marquee ─────────────────────────────────────────────────
// const companies = [
//   'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix',
//   'Wipro', 'Infosys', 'TCS', 'Accenture', 'Deloitte', 'Goldman Sachs',
//   'JP Morgan', 'Oracle', 'Salesforce', 'Adobe', 'IBM', 'Samsung',
// ];

// const colorMap = {
//   blue: { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', ring: 'ring-blue-200 dark:ring-blue-500/20' },
//   purple: { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-200 dark:ring-purple-500/20' },
//   emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-500/20' },
// };

// const FAQItem = ({ q, a }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border border-[var(--panel-border)] rounded-2xl overflow-hidden glass-panel card-lift">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center p-6 text-left gap-4"
//       >
//         <span className="font-semibold text-[var(--text-primary)]">{q}</span>
//         <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400">
//           {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//         </span>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             <p className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed">{a}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const Home = () => {
//   const { scrollYProgress } = useScroll();
//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
//   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   return (
//     <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
//       {/* Scroll Progress Bar */}
//       <motion.div
//         style={{ scaleX, transformOrigin: '0%' }}
//         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 z-[100]"
//       />

//       <Navbar />

//       <main className="flex-1 flex flex-col relative overflow-hidden pt-24 pb-0">
//         {/* Parallax Background Blobs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//           <motion.div
//             style={{ y: y1 }}
//             animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
//             transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px]"
//           />
//           <motion.div
//             style={{ y: y2 }}
//             animate={{ scale: [1, 1.5, 1], x: [0, -40, 0] }}
//             transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//             className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px]"
//           />
//           <motion.div
//             animate={{ scale: [1, 1.3, 1] }}
//             transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
//             className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-400/15 dark:bg-cyan-600/15 rounded-full blur-[80px]"
//           />
//         </div>

//         {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
//         <div className="z-10 text-center max-w-5xl mx-auto px-4 pt-10 pb-20">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//           >
//             <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm">
//               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-ring" />
//               ✨ The New Standard for Campus Recruiting
//             </div>

//             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--text-primary)]">
//               Accelerate Your <br className="hidden md:block" />
//               <span className="text-gradient">Career Journey</span>
//             </h1>
//           </motion.div>

//           <AnimatedSection delay={0.2}>
//             <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
//               The all-in-one placement platform connecting elite students with top-tier companies.
//               Manage applications, track progress, and land your dream job — all in one place.
//             </p>
//           </AnimatedSection>

//           <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/student-register"
//               className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 glow-primary w-full sm:w-auto justify-center shadow-lg shadow-blue-500/25"
//             >
//               Get Started Free <ArrowRight size={20} />
//             </Link>
//             <Link
//               to="/student-login"
//               className="px-8 py-4 rounded-full glass-panel border border-[var(--panel-border)] hover:bg-blue-50 dark:hover:bg-white/10 text-[var(--text-primary)] font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center flex shadow-sm"
//             >
//               Student Login
//             </Link>
//           </AnimatedSection>

//           {/* Hero mini trust badges */}
//           <AnimatedSection delay={0.6} className="flex flex-wrap items-center justify-center gap-4 mt-10">
//             {[
//               { icon: CheckCircle2, text: 'OTP Verified Accounts' },
//               { icon: ShieldCheck, text: 'TPO Moderated' },
//               { icon: Zap, text: 'Real-time Tracking' },
//             ].map(({ icon: Icon, text }) => (
//               <div key={text} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-full px-4 py-2 shadow-sm">
//                 <Icon size={14} className="text-blue-500" />
//                 {text}
//               </div>
//             ))}
//           </AnimatedSection>
//         </div>

//         {/* ─── ANIMATED STATS ──────────────────────────────────────────────────── */}
//         <AnimatedSection delay={0.3} className="w-full border-y border-[var(--panel-border)] bg-[var(--bg-secondary)] py-14 z-10">
//           <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {[
//               { value: '500+', label: 'Partner Companies', color: 'text-blue-600 dark:text-blue-400' },
//               { value: '95', suffix: '%', label: 'Placement Rate', color: 'text-purple-600 dark:text-purple-400' },
//               { value: '50', suffix: ' LPA', label: 'Highest Package', color: 'text-emerald-600 dark:text-emerald-400' },
//               { value: '10000', suffix: '+', label: 'Careers Launched', color: 'text-orange-600 dark:text-orange-400' },
//             ].map(({ value, suffix, label, color }) => (
//               <div key={label}>
//                 <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${color}`}>
//                   <Counter end={value} suffix={suffix || ''} />
//                 </div>
//                 <p className="text-[var(--text-secondary)] text-sm font-medium">{label}</p>
//               </div>
//             ))}
//           </div>
//         </AnimatedSection>

//         {/* ─── COMPANY MARQUEE ─────────────────────────────────────────────────── */}
//         <div className="w-full py-10 overflow-hidden z-10 border-b border-[var(--panel-border)]">
//           <p className="text-center text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-6 font-semibold">
//             Trusted by graduates hired at
//           </p>
//           <div className="relative">
//             <div className="animate-marquee">
//               {[...companies, ...companies].map((c, i) => (
//                 <div
//                   key={i}
//                   className="mx-6 px-6 py-3 glass-panel rounded-xl border border-[var(--panel-border)] text-[var(--text-primary)] font-bold text-sm shrink-0 shadow-sm whitespace-nowrap hover:border-blue-400 transition-colors"
//                 >
//                   {c}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ─── FEATURES GRID ───────────────────────────────────────────────────── */}
//         <AnimatedSection delay={0.2} className="w-full max-w-7xl mx-auto py-24 px-4 z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">Platform Features</div>
//             <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
//             <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
//               A modern infrastructure designed specifically to scale campus recruitment — seamlessly and transparently.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: Briefcase, color: 'blue',
//                 title: 'Premium Opportunities',
//                 desc: 'Access exclusive job postings from top tech giants, hedge funds, and fast-growing startups — curated specifically for your campus.',
//               },
//               {
//                 icon: TrendingUp, color: 'purple',
//                 title: 'Real-time Status Tracking',
//                 desc: 'Monitor your application status from Applied → Shortlisted → Selected in real-time. No more waiting for email replies.',
//               },
//               {
//                 icon: GraduationCap, color: 'emerald',
//                 title: 'Verified Profile System',
//                 desc: 'Maintain a single profile with TPO-verified credentials, CGPA, branch, and resume. One profile, all applications.',
//               },
//               {
//                 icon: Bell, color: 'orange',
//                 title: 'Smart Notifications',
//                 desc: 'Receive instant announcements from the Placement Cell. Never miss a drive, deadline, or shortlist notification.',
//               },
//               {
//                 icon: FileCheck, color: 'teal',
//                 title: 'Eligibility Auto-Check',
//                 desc: 'Our system automatically verifies your eligibility before letting you apply — ensuring you only see roles you qualify for.',
//               },
//               {
//                 icon: BarChart3, color: 'indigo',
//                 title: 'TPO Analytics Dashboard',
//                 desc: 'Placement officers get powerful analytics on placement rates, packages, branch-wise stats, and company performance at a glance.',
//               },
//             ].map(({ icon: Icon, color, title, desc }) => {
//               const c = {
//                 blue: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
//                 purple: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
//                 emerald: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
//                 orange: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
//                 teal: 'bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400',
//                 indigo: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
//               }[color];
//               return (
//                 <TiltCard key={title} className="flex flex-col items-start text-left p-8 h-full card-lift">
//                   <div className={`w-14 h-14 rounded-2xl ${c} flex items-center justify-center mb-5 shadow-sm`}>
//                     <Icon size={28} />
//                   </div>
//                   <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
//                   <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{desc}</p>
//                 </TiltCard>
//               );
//             })}
//           </div>
//         </AnimatedSection>

//         {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
//         <AnimatedSection className="w-full bg-[var(--bg-secondary)] py-24 z-10 border-y border-[var(--panel-border)]">
//           <div className="max-w-6xl mx-auto px-4">
//             <div className="text-center mb-16">
//               <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">Simple Process</div>
//               <h2 className="section-title mb-4">How It Works</h2>
//               <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Four simple steps from sign-up to dream job.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
//               {/* Connector line (desktop) */}
//               <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 dark:from-blue-500/40 dark:via-purple-500/40 dark:to-orange-500/40 z-0" />

//               {[
//                 { n: 1, color: 'blue', label: 'Register', desc: 'Create an account with your college email and verify via OTP.' },
//                 { n: 2, color: 'purple', label: 'Build Profile', desc: 'Update CGPA, branch, skills, and upload your resume.' },
//                 { n: 3, color: 'emerald', label: 'Apply Smart', desc: 'Browse eligible roles and apply with one click — no duplicate forms.' },
//                 { n: 4, color: 'orange', label: 'Get Hired', desc: 'Track progress and receive placement confirmation directly.' },
//               ].map(({ n, color, label, desc }) => {
//                 const cn = {
//                   blue: 'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400',
//                   purple: 'bg-purple-100 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400',
//                   emerald: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
//                   orange: 'bg-orange-100 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400',
//                 }[color];
//                 return (
//                   <div key={n} className="relative text-center z-10">
//                     <div className={`w-20 h-20 mx-auto ${cn} border-2 rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
//                       <span className="text-2xl font-extrabold">{n}</span>
//                     </div>
//                     <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{label}</h4>
//                     <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
//         <AnimatedSection delay={0.2} className="w-full max-w-7xl mx-auto py-24 px-4 z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">Success Stories</div>
//             <h2 className="section-title mb-4">Students Who Made It</h2>
//             <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Real placements, real experiences — straight from our alumni.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map(({ name, role, branch, avatar, color, quote }) => {
//               const c = colorMap[color];
//               return (
//                 <TiltCard key={name} className="flex flex-col gap-5 p-8 card-lift">
//                   <div className="flex gap-1 text-yellow-400">
//                     {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
//                   </div>
//                   <p className="text-[var(--text-secondary)] leading-relaxed text-sm italic">"{quote}"</p>
//                   <div className="flex items-center gap-4 pt-2 border-t border-[var(--panel-border)]">
//                     <div className={`w-11 h-11 rounded-full ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm ring-2 ${c.ring}`}>
//                       {avatar}
//                     </div>
//                     <div>
//                       <p className="font-bold text-[var(--text-primary)] text-sm">{name}</p>
//                       <p className="text-xs text-[var(--text-secondary)]">{role}</p>
//                       <p className={`text-xs font-medium ${c.text}`}>{branch}</p>
//                     </div>
//                   </div>
//                 </TiltCard>
//               );
//             })}
//           </div>
//         </AnimatedSection>

//         {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
//         <AnimatedSection className="w-full bg-[var(--bg-secondary)] py-24 z-10 border-t border-[var(--panel-border)]">
//           <div className="max-w-3xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">FAQ</div>
//               <h2 className="section-title mb-4">Frequently Asked Questions</h2>
//               <p className="text-[var(--text-secondary)]">Quick answers to common queries.</p>
//             </div>
//             <div className="space-y-4">
//               {faqs.map((item) => <FAQItem key={item.q} {...item} />)}
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* ─── CTA BANNER ──────────────────────────────────────────────────────── */}
//         <AnimatedSection className="w-full z-10 py-0">
//           <div className="my-0 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
//             <div className="absolute inset-0 opacity-30"
//               style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
//             />
//             <motion.div
//               animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 8, repeat: Infinity }}
//               className="absolute top-4 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
//             />

//             <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
//               <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
//                 <Award size={14} />
//                 Join 10,000+ students already on the platform
//               </div>
//               <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
//                 Your Dream Job Is <br className="hidden md:block" />One Click Away
//               </h2>
//               <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
//                 Register today, build your verified profile, and start applying to top companies before the next placement season begins.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/student-register"
//                   className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
//                 >
//                   Create Free Account <ArrowRight size={18} />
//                 </Link>
//                 <Link
//                   to="/tpo-login"
//                   className="px-8 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
//                 >
//                   TPO / Admin Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </AnimatedSection>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Briefcase, GraduationCap, TrendingUp, ShieldCheck,
  Zap, Users, Star, ChevronDown, ChevronUp, Bell, FileCheck,
  BarChart3, Award, CheckCircle2, MapPin, Building2, Rocket,
  Target, Globe, Lock, Sparkles, Play, Quote
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedSection } from '../components/AnimatedComponents';
import TiltCard from '../components/TiltCard';

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ end, suffix = '', duration = 2500 }) => {
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericEnd);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  const prefix = end.match(/^[^\d]*/)?.[0] || '';
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'Google',
    branch: 'CSE, 2024',
    avatar: 'PS',
    color: 'blue',
    package: '42 LPA',
    quote: 'The placement portal made the entire process transparent. I could track my application status in real-time and never missed a deadline. Truly a game changer!',
  },
  {
    name: 'Rahul Verma',
    role: 'Product Manager',
    company: 'Microsoft',
    branch: 'IT, 2024',
    avatar: 'RV',
    color: 'cyan',
    package: '38 LPA',
    quote: 'Amazing platform! The streamlined profile system saved so much time. TPOs could instantly see my verified credentials. Landed my dream role with zero confusion.',
  },
  {
    name: 'Ananya Singh',
    role: 'Data Engineer',
    company: 'Amazon',
    branch: 'ECE, 2023',
    avatar: 'AS',
    color: 'emerald',
    package: '35 LPA',
    quote: 'All job notifications in one place with smart eligibility filters — I only saw roles I actually qualified for. Zero noise, pure focus on preparation!',
  },
];

const faqs = [
  {
    q: 'Who can register on the platform?',
    a: 'Any student from our institution can register using their college email address. After OTP verification, your account will be reviewed and activated by the TPO within 24 hours.',
  },
  {
    q: 'How does the eligibility check work?',
    a: "When you apply for a job, the system automatically checks your CGPA, branch, and other criteria against the company's requirements. You can only apply if you meet all conditions — no surprises.",
  },
  {
    q: 'Can I update my resume after applying?',
    a: "Yes! You can update your profile and resume at any time. The updated resume will be visible to recruiters for applications that haven't been processed yet.",
  },
  {
    q: 'How are placement results communicated?',
    a: "TPOs post official announcements on the Notice Board and update your application status in real-time. You'll see your status change from Applied → Shortlisted → Selected / Rejected.",
  },
  {
    q: 'Is the platform free for students?',
    a: 'Completely free for all enrolled students. Just register with your college email, verify your identity, and you\'re ready to explore opportunities from top companies.',
  },
];

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix',
  'Wipro', 'Infosys', 'TCS', 'Accenture', 'Deloitte', 'Goldman Sachs',
  'JP Morgan', 'Oracle', 'Salesforce', 'Adobe', 'IBM', 'Samsung',
  'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'HDFC', 'Cognizant',
];

const features = [
  {
    icon: Briefcase,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    title: 'Premium Opportunities',
    desc: 'Access exclusive job postings from top tech giants, hedge funds, and fast-growing startups — curated specifically for your campus.',
  },
  {
    icon: TrendingUp,
    color: 'cyan',
    gradient: 'from-cyan-500 to-teal-600',
    title: 'Real-time Status Tracking',
    desc: 'Monitor your application from Applied → Shortlisted → Selected in real-time. No more waiting for email replies.',
  },
  {
    icon: GraduationCap,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    title: 'Verified Profile System',
    desc: 'Maintain a single profile with TPO-verified credentials, CGPA, branch, and resume. One profile, unlimited applications.',
  },
  {
    icon: Bell,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    title: 'Smart Notifications',
    desc: 'Receive instant announcements from the Placement Cell. Never miss a drive, deadline, or shortlist notification again.',
  },
  {
    icon: FileCheck,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    title: 'Eligibility Auto-Check',
    desc: 'The system automatically verifies eligibility before you apply — ensuring you only see roles you truly qualify for.',
  },
  {
    icon: BarChart3,
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    title: 'TPO Analytics Dashboard',
    desc: 'Placement officers get powerful analytics on placement rates, packages, branch-wise stats and company performance.',
  },
];

const steps = [
  {
    n: '01', color: 'blue', icon: Users,
    label: 'Register',
    desc: 'Create an account with your college email and verify your identity via OTP in under 2 minutes.',
  },
  {
    n: '02', color: 'cyan', icon: Target,
    label: 'Build Profile',
    desc: 'Fill in your CGPA, branch, skills and upload a polished resume. Your profile gets TPO-verified.',
  },
  {
    n: '03', color: 'emerald', icon: Globe,
    label: 'Apply Smart',
    desc: 'Browse only eligible roles and apply with a single click — no duplicate forms, no wasted effort.',
  },
  {
    n: '04', color: 'orange', icon: Rocket,
    label: 'Get Hired',
    desc: 'Track every stage of your journey and receive official placement confirmation directly.',
  },
];

const colorTokens = {
  blue: {
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    icon: 'bg-blue-500/10 text-blue-500',
    step: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
    ring: 'ring-blue-500/20',
    dot: 'bg-blue-500',
    bar: 'bg-gradient-to-r from-blue-500 to-blue-400',
  },
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    icon: 'bg-cyan-500/10 text-cyan-500',
    step: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500',
    ring: 'ring-cyan-500/20',
    dot: 'bg-cyan-500',
    bar: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500/10 text-emerald-500',
    step: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    ring: 'ring-emerald-500/20',
    dot: 'bg-emerald-500',
    bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  },
  orange: {
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    icon: 'bg-orange-500/10 text-orange-500',
    step: 'bg-orange-500/10 border-orange-500/30 text-orange-500',
    ring: 'ring-orange-500/20',
    dot: 'bg-orange-500',
    bar: 'bg-gradient-to-r from-orange-500 to-orange-400',
  },
  teal: {
    badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    icon: 'bg-teal-500/10 text-teal-500',
    step: 'bg-teal-500/10 border-teal-500/30 text-teal-500',
    ring: 'ring-teal-500/20',
    dot: 'bg-teal-500',
    bar: 'bg-gradient-to-r from-teal-500 to-teal-400',
  },
  rose: {
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    icon: 'bg-rose-500/10 text-rose-500',
    step: 'bg-rose-500/10 border-rose-500/30 text-rose-500',
    ring: 'ring-rose-500/20',
    dot: 'bg-rose-500',
    bar: 'bg-gradient-to-r from-rose-500 to-rose-400',
  },
};

// ─── FAQ Item ──────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group border border-[var(--panel-border)] rounded-2xl overflow-hidden bg-[var(--bg-primary)] hover:border-blue-500/30 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left gap-4 cursor-pointer"
      >
        <span className="font-semibold text-[var(--text-primary)] text-base pr-2">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${open ? 'bg-blue-500 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] group-hover:bg-blue-500/10 group-hover:text-blue-500'}`}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-[var(--panel-border)] mb-4" />
              <p className="text-[var(--text-secondary)] leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Floating Badge ────────────────────────────────────────────────────────────
const FloatingBadge = ({ className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={`absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--panel-border)] shadow-xl shadow-black/5 dark:shadow-black/20 text-sm font-medium text-[var(--text-primary)] backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.div>
);

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, color, icon: Icon, delay }) => {
  const c = colorTokens[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[var(--bg-primary)] border border-[var(--panel-border)] hover:border-blue-500/20 transition-all duration-300 group overflow-hidden"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${c.bar} opacity-60`} />
      <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} />
      </div>
      <div className="text-4xl font-extrabold text-[var(--text-primary)] mb-1 tracking-tight">
        <Counter end={value} suffix={suffix || ''} />
      </div>
      <p className="text-sm text-[var(--text-secondary)] font-medium text-center">{label}</p>
    </motion.div>
  );
};

// ─── Home Component ────────────────────────────────────────────────────────────
const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 z-[100]"
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative overflow-hidden">

        {/* ─── BG Ambient Blobs ──────────────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
          <motion.div
            style={{ y: y1 }}
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[140px]"
          />
          <motion.div
            style={{ y: y2 }}
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-emerald-400/8 dark:bg-emerald-600/8 rounded-full blur-[100px]"
          />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative z-10 pt-32 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">

              {/* Announcement pill */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-600 dark:text-blue-400 text-sm font-semibold backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                Now Open — Placement Season 2024–25
                <ArrowRight size={13} />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08] mb-6 max-w-4xl"
              >
                Your Campus.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    Your Career.
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full origin-left"
                  />
                </span>
                <br />
                Simplified.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10"
              >
                The all-in-one Training & Placement platform connecting ambitious students with top-tier companies.
                Manage applications, track progress, and land your dream job — all in one place.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
              >
                <Link
                  to="/student-register"
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:shadow-xl w-full sm:w-auto justify-center text-base"
                >
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  Get Started Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/student-login"
                  className="group px-8 py-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] hover:border-blue-500/30 text-[var(--text-primary)] font-semibold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2.5 text-base"
                >
                  <Lock size={16} className="text-[var(--text-secondary)]" />
                  Student Login
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {[
                  { icon: CheckCircle2, text: 'OTP Verified Accounts', color: 'text-emerald-500' },
                  { icon: ShieldCheck, text: 'TPO Moderated', color: 'text-blue-500' },
                  { icon: Zap, text: 'Real-time Tracking', color: 'text-orange-500' },
                  { icon: Users, text: '10,000+ Students', color: 'text-cyan-500' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-full px-4 py-2">
                    <Icon size={13} className={color} />
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-20 mx-auto max-w-4xl"
            >
              {/* Floating Cards */}
              <FloatingBadge className="-top-6 -left-4 xl:-left-16" delay={1.1}>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Offer Received!</p>
                  <p className="text-xs text-emerald-500 font-semibold">Google — 42 LPA</p>
                </div>
              </FloatingBadge>

              <FloatingBadge className="-top-6 -right-4 xl:-right-16" delay={1.3}>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Bell size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">New Drive Posted</p>
                  <p className="text-xs text-blue-500 font-semibold">Microsoft — Apply Now</p>
                </div>
              </FloatingBadge>

              <FloatingBadge className="-bottom-6 left-8 xl:-left-8" delay={1.5}>
                <div className="flex -space-x-2">
                  {['PS', 'RV', 'AK'].map((a) => (
                    <div key={a} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-[var(--bg-primary)]">{a}</div>
                  ))}
                </div>
                <p className="text-xs font-medium"><span className="font-bold text-blue-500">128 students</span> applied today</p>
              </FloatingBadge>

              {/* Dashboard mockup */}
              <div className="relative rounded-3xl border border-[var(--panel-border)] bg-[var(--bg-secondary)] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--panel-border)] bg-[var(--bg-primary)]">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-4">
                    <div className="h-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--panel-border)] flex items-center justify-center">
                      <p className="text-xs text-[var(--text-secondary)] font-medium">placement.college.edu/dashboard</p>
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 grid grid-cols-12 gap-4 min-h-[260px]">
                  {/* Sidebar */}
                  <div className="col-span-2 hidden sm:flex flex-col gap-3">
                    {[
                      { icon: BarChart3, label: 'Overview', active: true },
                      { icon: Briefcase, label: 'Jobs' },
                      { icon: FileCheck, label: 'Applied' },
                      { icon: Bell, label: 'Alerts' },
                    ].map(({ icon: Icon, label, active }) => (
                      <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${active ? 'bg-blue-500 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'}`}>
                        <Icon size={14} />
                        <span className="hidden md:block">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="col-span-12 sm:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Applications', value: '12', delta: '+3', color: 'blue' },
                      { label: 'Shortlisted', value: '5', delta: '+1', color: 'emerald' },
                      { label: 'Interviews', value: '3', delta: 'This week', color: 'cyan' },
                      { label: 'Offers', value: '1', delta: 'Congratulations!', color: 'orange' },
                    ].map(({ label, value, delta, color }) => {
                      const c = colorTokens[color];
                      return (
                        <div key={label} className="bg-[var(--bg-primary)] rounded-2xl p-4 border border-[var(--panel-border)] flex flex-col gap-1">
                          <p className="text-xs text-[var(--text-secondary)] font-medium">{label}</p>
                          <p className="text-2xl font-extrabold text-[var(--text-primary)]">{value}</p>
                          <p className={`text-xs font-semibold ${c.badge.split(' ')[1]}`}>{delta}</p>
                        </div>
                      );
                    })}

                    {/* Recent activity bar */}
                    <div className="col-span-2 md:col-span-4 bg-[var(--bg-primary)] rounded-2xl p-4 border border-[var(--panel-border)]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold text-[var(--text-primary)]">Application Pipeline</p>
                        <p className="text-xs text-[var(--text-secondary)]">Last 30 days</p>
                      </div>
                      <div className="flex gap-1 h-6">
                        {[35, 60, 45, 80, 55, 90, 70, 85, 65, 95, 75, 88].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.5 + i * 0.05, duration: 0.4 }}
                            className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-cyan-400 origin-bottom"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow underneath */}
              <div className="absolute -bottom-8 left-1/4 right-1/4 h-16 bg-blue-500/20 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────────────────────── */}
        <section className="relative z-10 py-20 px-4 border-y border-[var(--panel-border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-10 font-semibold"
            >
              Platform Impact at a Glance
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <StatCard value="500+" label="Partner Companies" color="blue" icon={Building2} delay={0} />
              <StatCard value="95" suffix="%" label="Placement Rate" color="emerald" icon={TrendingUp} delay={0.1} />
              <StatCard value="50" suffix=" LPA" label="Highest Package" color="orange" icon={Award} delay={0.2} />
              <StatCard value="10000" suffix="+" label="Careers Launched" color="cyan" icon={Rocket} delay={0.3} />
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ──────────────────────────────────────────────────────── */}
        <section className="relative z-10 py-12 overflow-hidden border-b border-[var(--panel-border)] bg-[var(--bg-primary)]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-7 font-semibold"
          >
            Graduates hired at world-class companies
          </motion.p>

          {/* Row 1 — forward */}
          <div className="relative mb-3">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...companies, ...companies].map((c, i) => (
                <div
                  key={i}
                  className="mx-3 px-5 py-2.5 rounded-xl border border-[var(--panel-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold text-sm shrink-0 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-200 cursor-default"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — reverse */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              {[...companies.slice(6), ...companies, ...companies.slice(0, 6)].map((c, i) => (
                <div
                  key={i}
                  className="mx-3 px-5 py-2.5 rounded-xl border border-[var(--panel-border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium text-sm shrink-0 hover:border-cyan-400/50 hover:text-[var(--text-primary)] transition-all duration-200 cursor-default"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
        <section className="relative z-10 py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
                <Sparkles size={13} />
                Platform Features
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-5 leading-tight">
                Everything You Need
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">to Succeed</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
                A modern infrastructure designed to scale campus recruitment — seamlessly, transparently, and efficiently.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ icon: Icon, color, gradient, title, desc }, idx) => {
                const c = colorTokens[color];
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <TiltCard className="group relative flex flex-col items-start text-left p-8 h-full border border-[var(--panel-border)] rounded-3xl bg-[var(--bg-primary)] hover:border-blue-500/20 transition-all duration-300 overflow-hidden">
                      {/* Top gradient accent */}
                      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={26} />
                      </div>

                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm flex-1">{desc}</p>

                      <div className={`mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${c.badge.split(' ').slice(1).join(' ')}`}>
                        Learn more <ArrowRight size={14} />
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="relative z-10 py-28 px-4 bg-[var(--bg-secondary)] border-y border-[var(--panel-border)]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-5">
                <Play size={12} className="fill-current" />
                Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-5">
                From Sign-Up to
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent"> Dream Job</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">Four simple steps is all it takes to launch your career.</p>
            </AnimatedSection>

            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="hidden md:block absolute top-10 left-[calc(12.5%+10px)] right-[calc(12.5%+10px)] h-px z-0">
                <div className="h-full bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-orange-500/30" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="absolute inset-0 h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-400 origin-left"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map(({ n, color, icon: Icon, label, desc }, idx) => {
                  const c = colorTokens[color];
                  return (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.6 }}
                      className="relative text-center z-10 group"
                    >
                      <div className={`w-20 h-20 mx-auto rounded-2xl border-2 ${c.step} flex flex-col items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-[var(--bg-primary)]`}>
                        <span className="text-xl font-black leading-none">{n}</span>
                        <Icon size={14} className="mt-1 opacity-60" />
                      </div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">{label}</h4>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── DUAL ROLE CTA ────────────────────────────────────────────────── */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
                Built for Every Stakeholder
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">A tailored experience whether you're a student or a placement officer.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'For Students',
                  icon: GraduationCap,
                  gradient: 'from-blue-600 to-cyan-500',
                  glow: 'shadow-blue-500/20',
                  points: [
                    'Browse & apply to exclusive campus drives',
                    'Real-time status tracking (Applied → Hired)',
                    'Smart eligibility-based job filtering',
                    'Centralized profile with verified credentials',
                    'Instant notifications for every update',
                  ],
                  cta: 'Register as Student',
                  link: '/student-register',
                },
                {
                  role: 'For TPO / Admin',
                  icon: BarChart3,
                  gradient: 'from-emerald-500 to-teal-500',
                  glow: 'shadow-emerald-500/20',
                  points: [
                    'Post & manage job drives with ease',
                    'Review and shortlist student applications',
                    'Publish notices and announcements',
                    'Analytics on placement trends & packages',
                    'Verify student profiles & credentials',
                  ],
                  cta: 'Login as TPO',
                  link: '/tpo-login',
                },
              ].map(({ role, icon: Icon, gradient, glow, points, cta, link }) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative p-8 rounded-3xl border border-[var(--panel-border)] bg-[var(--bg-primary)] hover:border-transparent hover:shadow-2xl ${glow} transition-all duration-500 group overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl`} />

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{role}</h3>

                  <ul className="space-y-3 mb-8">
                    {points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${gradient} text-white font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md`}
                  >
                    {cta} <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="relative z-10 py-28 px-4 bg-[var(--bg-secondary)] border-t border-[var(--panel-border)]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-5">
                <Star size={13} className="fill-current" />
                Success Stories
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-5">
                Students Who
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"> Made It</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">Real placements, real experiences — straight from our alumni.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {testimonials.map(({ name, role, company, branch, avatar, color, package: pkg, quote }, idx) => {
                const c = colorTokens[color];
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                  >
                    <TiltCard className="flex flex-col gap-6 p-8 border border-[var(--panel-border)] rounded-3xl bg-[var(--bg-primary)] hover:border-blue-500/20 transition-all duration-300 h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                        <Quote size={28} className="text-[var(--panel-border)] opacity-60" />
                      </div>

                      {/* Quote */}
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm flex-1 italic">
                        "{quote}"
                      </p>

                      {/* Package badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${c.badge} self-start`}>
                        <Award size={12} />
                        {pkg} Package
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[var(--panel-border)]">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color === 'blue' ? 'from-blue-500 to-blue-600' : color === 'cyan' ? 'from-cyan-500 to-teal-600' : 'from-emerald-500 to-green-600'} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                          {avatar}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--text-primary)] text-sm">{name}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{role} at <span className="font-semibold">{company}</span></p>
                          <p className={`text-xs font-medium ${c.badge.split(' ')[1]}`}>{branch}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="relative z-10 py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5">
                <MapPin size={12} />
                FAQ
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-5">
                Frequently Asked
                <br />
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">Quick answers to common queries from students and TPOs.</p>
            </AnimatedSection>

            <div className="space-y-3">
              {faqs.map((item, idx) => <FAQItem key={item.q} {...item} index={idx} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ───────────────────────────────────────────────────── */}
        <AnimatedSection className="relative z-10 px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }}
              />
              {/* Animated orbs */}
              <motion.div
                animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-8 right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -30, 0], y: [0, 25, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 14, repeat: Infinity, delay: 2 }}
                className="absolute bottom-4 left-16 w-64 h-32 bg-cyan-300/20 rounded-full blur-3xl"
              />

              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              <div className="relative z-10 px-8 py-20 md:px-20 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 mb-7 px-5 py-2.5 rounded-full bg-white/15 text-white text-sm font-semibold backdrop-blur-sm border border-white/20">
                    <Award size={15} />
                    Join 10,000+ students already on the platform
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-[1.08] tracking-tight">
                    Your Dream Job Is
                    <br />
                    <span className="text-cyan-200">One Click Away</span>
                  </h2>

                  <p className="text-white/75 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                    Register today, build your verified profile, and start applying to top companies before the next placement season begins.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/student-register"
                      className="group px-9 py-4 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2.5 text-base"
                    >
                      <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      Create Free Account
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                      to="/tpo-login"
                      className="px-9 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 text-base"
                    >
                      <Lock size={16} />
                      TPO / Admin Login
                    </Link>
                  </div>

                  {/* Bottom micro stats */}
                  <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/15">
                    {[
                      { value: 'Free', label: 'For all students' },
                      { value: '< 2min', label: 'Registration time' },
                      { value: '500+', label: 'Active companies' },
                      { value: '24/7', label: 'Platform uptime' },
                    ].map(({ value, label }) => (
                      <div key={label} className="text-center">
                        <p className="text-2xl font-extrabold text-white">{value}</p>
                        <p className="text-sm text-white/60 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
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
