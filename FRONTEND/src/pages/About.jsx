import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Users, Target, Shield, Zap, TrendingUp, BookOpen, Award, Cpu } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import Footer from '../components/Footer';

const milestones = [
  { year: '2018', event: 'Placement Cell founded with 12 partner companies.' },
  { year: '2020', event: 'Launched digital platform, replacing all paper-based processes.' },
  { year: '2022', event: 'Crossed 100+ placement partners; highest package hit 32 LPA.' },
  { year: '2024', event: '95% placement rate achieved; 500+ companies onboarded.' },
];

const team = [
  { name: 'Dr. R. K. Sharma', role: 'Chief Placement Officer', initials: 'RS', color: 'blue' },
  { name: 'Prof. Neha Gupta', role: 'Industry Relations Lead', initials: 'NG', color: 'purple' },
  { name: 'Mr. Aditya Bose', role: 'Student Coordination Head', initials: 'AB', color: 'emerald' },
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden pt-24 pb-16 px-4">
        {/* Background Effects */}
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[30rem] bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto w-full z-10 space-y-24">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <AnimatedSection>
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                Our Story
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)]">
                About <span className="text-gradient">Placement Cell</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                We are bridging the gap between exceptional talent and industry-leading organizations
                through a secure, transparent, and seamless recruitment platform built for the modern era.
              </p>
            </AnimatedSection>
          </div>

          {/* By the Numbers */}
          <AnimatedSection delay={0.2} className="w-full border border-[var(--panel-border)] bg-[var(--bg-secondary)] rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: '500+', label: 'Partner Companies', color: 'text-blue-600 dark:text-blue-400' },
                { n: '95%', label: 'Placement Rate', color: 'text-purple-600 dark:text-purple-400' },
                { n: '50 LPA', label: 'Highest Package', color: 'text-emerald-600 dark:text-emerald-400' },
                { n: '6+', label: 'Years of Excellence', color: 'text-orange-600 dark:text-orange-400' },
              ].map(({ n, label, color }) => (
                <div key={label}>
                  <div className={`text-3xl md:text-4xl font-extrabold mb-1 ${color}`}>{n}</div>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.3}>
              <TiltCard className="h-full p-8 border-t-4 border-blue-500">
                <Target className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  To democratize access to premium career opportunities by providing a unified platform
                  where students can showcase their verified skills and companies can seamlessly discover
                  top-tier talent — eliminating all friction from the process.
                </p>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <TiltCard className="h-full p-8 border-t-4 border-purple-500">
                <Zap className="w-12 h-12 text-purple-500 mb-6" />
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Vision</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  To become the global standard for campus placements — completely eliminating manual
                  processes and leveraging technology to create perfect matches between student
                  aspirations and industry needs, at scale.
                </p>
              </TiltCard>
            </AnimatedSection>
          </div>

          {/* Core Values */}
          <AnimatedSection delay={0.3} className="space-y-12">
            <div className="text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-3">What We Stand For</div>
              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">Core Values</h2>
              <p className="text-[var(--text-secondary)]">The principles driving every decision we make.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, color: 'emerald', title: 'Trust & Security', desc: 'Verified credentials and secure data for everyone.' },
                { icon: Users, color: 'orange', title: 'Accessibility', desc: 'Equal opportunity for all students, based purely on merit.' },
                { icon: Zap, color: 'blue', title: 'Efficiency', desc: 'Streamlining every step of the hiring pipeline.' },
                { icon: Cpu, color: 'purple', title: 'Innovation', desc: 'Continuously evolving our platform to meet industry needs.' },
              ].map(({ icon: Icon, color, title, desc }) => {
                const c = {
                  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-500' },
                  orange: { bg: 'bg-orange-100 dark:bg-orange-500/10', text: 'text-orange-600 dark:text-orange-500' },
                  blue: { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-500' },
                  purple: { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-500' },
                }[color];
                return (
                  <div key={title} className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] shadow-sm text-center card-lift">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{desc}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <AnimatedSection delay={0.2} className="space-y-10">
            <div className="text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-3">Our Journey</div>
              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">Milestones</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />
              <div className="space-y-8">
                {milestones.map(({ year, event }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start pl-0"
                  >
                    <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/10 border-2 border-blue-200 dark:border-blue-500/20 flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{year}</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-[var(--text-primary)] font-medium">{event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Team */}
          <AnimatedSection delay={0.2} className="space-y-10">
            <div className="text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-3">The People</div>
              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">Meet Our Team</h2>
              <p className="text-[var(--text-secondary)]">Dedicated professionals driving campus placement success.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map(({ name, role, initials, color }) => {
                const c = {
                  blue: 'from-blue-500 to-blue-700',
                  purple: 'from-purple-500 to-purple-700',
                  emerald: 'from-emerald-500 to-teal-600',
                }[color];
                return (
                  <TiltCard key={name} className="text-center p-8">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${c} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                      {initials}
                    </div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">{name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{role}</p>
                  </TiltCard>
                );
              })}
            </div>
          </AnimatedSection>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
