import { useState, useEffect, useRef } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { UploadCloud, CheckCircle, Plus, Trash2, Save, Loader2, FileText } from 'lucide-react';

const PROFICIENCY = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const PROFICIENCY_COLOR = {
  Beginner: 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-300',
  Intermediate: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300',
  Advanced: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300',
  Expert: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
};

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>}
    <input className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors shadow-sm" {...props} />
  </div>
);

const TextArea = ({ label, rows = 2, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>}
    <textarea rows={rows} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] resize-none outline-none focus:border-blue-500 transition-colors shadow-sm" {...props} />
  </div>
);

const SectionPanel = ({ title, children }) => (
  <div className="glass-panel p-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm">
    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5 border-b border-[var(--panel-border)] pb-3">{title}</h2>
    {children}
  </div>
);

const AddBtn = ({ onClick, label }) => (
  <button type="button" onClick={onClick} className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-3">
    <Plus size={13} /> {label}
  </button>
);

const RemoveBtn = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-red-400 hover:text-red-600 shrink-0 mt-1 transition-colors"><Trash2 size={15} /></button>
);

const EMPTY_SKILL = { skill: '', proficiency: 'Intermediate' };
const EMPTY_PROJ = { name: '', techStack: '', description: '', hostedLink: '', githubLink: '', contributors: '' };
const EMPTY_QUAL = { degree: '', institution: '', year: '', percentage: '' };
const EMPTY_EXP = { company: '', role: '', duration: '', description: '' };
const EMPTY_ACH = { title: '', description: '', year: '' };

const ProfileSection = () => {
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const resumeRef = useRef();

  // Profile fields
  const [basic, setBasic] = useState({ name: '', branch: '', cgpa: '', mobile: '', course: '', year: '', linkedinLink: '', githubLink: '', portfolioLink: '', otherLink: '' });
  const [resumeUrl, setResumeUrl] = useState('');
  const [skills, setSkills] = useState([{ ...EMPTY_SKILL }]);
  const [projects, setProjects] = useState([{ ...EMPTY_PROJ }]);
  const [qualifications, setQualifications] = useState([{ ...EMPTY_QUAL }]);
  const [experiences, setExperiences] = useState([{ ...EMPTY_EXP }]);
  const [achievements, setAchievements] = useState([{ ...EMPTY_ACH }]);
  const [responsibilities, setResponsibilities] = useState(['']);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/students/profile');
        setBasic({
          name: data.name || '', branch: data.branch || '', cgpa: data.cgpa || '',
          mobile: data.mobile || '', course: data.course || '', year: data.year || '',
          linkedinLink: data.linkedinLink || '', githubLink: data.githubLink || '',
          portfolioLink: data.portfolioLink || '', otherLink: data.otherLink || '',
        });
        setResumeUrl(data.resumeUrl || '');
        setSkills(data.skills?.length > 0 ? data.skills : [{ ...EMPTY_SKILL }]);
        setProjects(data.projects?.length > 0 ? data.projects : [{ ...EMPTY_PROJ }]);
        setQualifications(data.qualifications?.length > 0 ? data.qualifications : [{ ...EMPTY_QUAL }]);
        setExperiences(data.experiences?.length > 0 ? data.experiences : [{ ...EMPTY_EXP }]);
        setAchievements(data.achievements?.length > 0 ? data.achievements : [{ ...EMPTY_ACH }]);
        setResponsibilities(data.responsibilities?.length > 0 ? data.responsibilities : ['']);
      } catch (e) { console.error(e); }
    };
    fetchProfile();
  }, []);

  const showMsg = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 4000); };

  // ── Skills helpers ──────────────────────────────────────────────────────────
  const setSkill = (i, k, v) => { const s = [...skills]; s[i] = { ...s[i], [k]: v }; setSkills(s); };
  const addSkill = () => setSkills([...skills, { ...EMPTY_SKILL }]);
  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));

  // ── Projects helpers ────────────────────────────────────────────────────────
  const setProj = (i, k, v) => { const p = [...projects]; p[i] = { ...p[i], [k]: v }; setProjects(p); };
  const addProj = () => setProjects([...projects, { ...EMPTY_PROJ }]);
  const removeProj = (i) => setProjects(projects.filter((_, idx) => idx !== i));

  // ── Qualifications helpers ──────────────────────────────────────────────────
  const setQual = (i, k, v) => { const q = [...qualifications]; q[i] = { ...q[i], [k]: v }; setQualifications(q); };
  const addQual = () => setQualifications([...qualifications, { ...EMPTY_QUAL }]);
  const removeQual = (i) => setQualifications(qualifications.filter((_, idx) => idx !== i));

  // ── Experiences helpers ─────────────────────────────────────────────────────
  const setExp = (i, k, v) => { const e = [...experiences]; e[i] = { ...e[i], [k]: v }; setExperiences(e); };
  const addExp = () => setExperiences([...experiences, { ...EMPTY_EXP }]);
  const removeExp = (i) => setExperiences(experiences.filter((_, idx) => idx !== i));

  // ── Achievements helpers ────────────────────────────────────────────────────
  const setAch = (i, k, v) => { const a = [...achievements]; a[i] = { ...a[i], [k]: v }; setAchievements(a); };
  const addAch = () => setAchievements([...achievements, { ...EMPTY_ACH }]);
  const removeAch = (i) => setAchievements(achievements.filter((_, idx) => idx !== i));

  // ── Responsibilities ────────────────────────────────────────────────────────
  const setResp = (i, v) => { const r = [...responsibilities]; r[i] = v; setResponsibilities(r); };
  const addResp = () => setResponsibilities([...responsibilities, '']);
  const removeResp = (i) => setResponsibilities(responsibilities.filter((_, idx) => idx !== i));

  // ── Save all profile ────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.put('/students/update', {
        ...basic,
        cgpa: basic.cgpa ? parseFloat(basic.cgpa) : undefined,
        skills: skills.filter(s => s.skill.trim()),
        projects: projects.filter(p => p.name.trim()),
        qualifications: qualifications.filter(q => q.degree.trim() || q.institution.trim()),
        experiences: experiences.filter(ex => ex.company.trim() || ex.role.trim()),
        achievements: achievements.filter(a => a.title.trim()),
        responsibilities: responsibilities.filter(r => r.trim()),
      });
      showMsg('success', '✅ Profile saved successfully!');
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to save profile');
    } finally { setLoading(false); }
  };

  // ── Resume upload ───────────────────────────────────────────────────────────
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    const fd = new FormData();
    fd.append('resume', resumeFile);
    setResumeLoading(true);
    try {
      const { data } = await apiClient.post('/students/upload-resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResumeUrl(data.resumeUrl);
      setResumeFile(null);
      showMsg('success', '✅ Resume uploaded! It will now open as PDF in your browser.');
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Resume upload failed');
    } finally { setResumeLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">My Profile</h1>
        <p className="text-[var(--text-secondary)]">Build your resume-style profile visible to TPOs and admins.</p>
      </AnimatedSection>

      {message.text && (
        <AnimatedSection>
          <div className={`p-4 rounded-xl border text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'}`}>
            {message.text}
          </div>
        </AnimatedSection>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Basic Info ─────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.05}>
          <SectionPanel title="👤 Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input label="Full Name" required value={basic.name} onChange={e => setBasic({ ...basic, name: e.target.value })} />
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Branch</label>
                <select value={basic.branch} onChange={e => setBasic({ ...basic, branch: e.target.value })} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 shadow-sm">
                  <option value="">Select Branch</option>
                  {['CSE','IT','ECE','EEE','MECH','CIVIL','Other'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <Input label="CGPA (out of 10)" type="number" step="0.01" min="0" max="10" value={basic.cgpa} onChange={e => setBasic({ ...basic, cgpa: e.target.value })} />
              <Input label="Mobile Number" value={basic.mobile} onChange={e => setBasic({ ...basic, mobile: e.target.value })} placeholder="+91..." />
              <Input label="Course" value={basic.course} onChange={e => setBasic({ ...basic, course: e.target.value })} placeholder="B.Tech, MCA..." />
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Year</label>
                <select value={basic.year} onChange={e => setBasic({ ...basic, year: e.target.value })} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 shadow-sm">
                  <option value="">Select Year</option>
                  {['1st Year','2nd Year','3rd Year','4th Year','Passout'].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Input label="LinkedIn URL" type="url" value={basic.linkedinLink} onChange={e => setBasic({ ...basic, linkedinLink: e.target.value })} placeholder="https://linkedin.com/in/..." />
              <Input label="GitHub URL" type="url" value={basic.githubLink} onChange={e => setBasic({ ...basic, githubLink: e.target.value })} placeholder="https://github.com/..." />
              <Input label="Portfolio URL" type="url" value={basic.portfolioLink} onChange={e => setBasic({ ...basic, portfolioLink: e.target.value })} placeholder="https://..." />
              <Input label="LeetCode / Other URL" type="url" value={basic.otherLink} onChange={e => setBasic({ ...basic, otherLink: e.target.value })} placeholder="https://leetcode.com/..." />
            </div>
          </SectionPanel>
        </AnimatedSection>

        {/* ── Skills ─────────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.1}>
          <SectionPanel title="⚡ Skills & Proficiency">
            <div className="space-y-2.5">
              {skills.map((s, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input value={s.skill} onChange={e => setSkill(i, 'skill', e.target.value)} placeholder="Skill name (e.g. React, Python)" className="flex-1 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 shadow-sm" />
                  <select value={s.proficiency} onChange={e => setSkill(i, 'proficiency', e.target.value)} className="bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 shadow-sm">
                    {PROFICIENCY.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <span className={`hidden sm:inline-block px-2 py-1 rounded-full text-xs font-semibold ${PROFICIENCY_COLOR[s.proficiency]}`}>{s.proficiency}</span>
                  {skills.length > 1 && <RemoveBtn onClick={() => removeSkill(i)} />}
                </div>
              ))}
            </div>
            <AddBtn onClick={addSkill} label="Add Skill" />
          </SectionPanel>
        </AnimatedSection>

        {/* ── Projects ───────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.13}>
          <SectionPanel title="🚀 Projects">
            <div className="space-y-4">
              {projects.map((p, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Project {i + 1}</span>
                    {projects.length > 1 && <RemoveBtn onClick={() => removeProj(i)} />}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Project Name" value={p.name} onChange={e => setProj(i, 'name', e.target.value)} />
                    <Input label="Tech Stack" value={p.techStack} onChange={e => setProj(i, 'techStack', e.target.value)} placeholder="React, Node.js, MongoDB..." />
                  </div>
                  <TextArea label="Description" rows={2} value={p.description} onChange={e => setProj(i, 'description', e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Hosted / Live Link" type="url" value={p.hostedLink} onChange={e => setProj(i, 'hostedLink', e.target.value)} placeholder="https://..." />
                    <Input label="GitHub Link" type="url" value={p.githubLink} onChange={e => setProj(i, 'githubLink', e.target.value)} placeholder="https://github.com/..." />
                  </div>
                  <Input label="Contributors (optional)" value={p.contributors} onChange={e => setProj(i, 'contributors', e.target.value)} placeholder="Alice, Bob..." />
                </div>
              ))}
            </div>
            <AddBtn onClick={addProj} label="Add Project" />
          </SectionPanel>
        </AnimatedSection>

        {/* ── Qualifications ─────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.15}>
          <SectionPanel title="🎓 Qualifications / Education">
            <div className="space-y-4">
              {qualifications.map((q, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Entry {i + 1}</span>
                    {qualifications.length > 1 && <RemoveBtn onClick={() => removeQual(i)} />}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Degree / Course" value={q.degree} onChange={e => setQual(i, 'degree', e.target.value)} placeholder="B.Tech CSE, 10th..." />
                    <Input label="School / College / University" value={q.institution} onChange={e => setQual(i, 'institution', e.target.value)} />
                    <Input label="Year of Passing" value={q.year} onChange={e => setQual(i, 'year', e.target.value)} placeholder="2025" />
                    <Input label="Percentage / CGPA" value={q.percentage} onChange={e => setQual(i, 'percentage', e.target.value)} placeholder="85% / 8.5 CGPA" />
                  </div>
                </div>
              ))}
            </div>
            <AddBtn onClick={addQual} label="Add Education Entry" />
          </SectionPanel>
        </AnimatedSection>

        {/* ── Experiences ────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.18}>
          <SectionPanel title="💼 Work Experience / Internships">
            <div className="space-y-4">
              {experiences.map((ex, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Experience {i + 1}</span>
                    {experiences.length > 1 && <RemoveBtn onClick={() => removeExp(i)} />}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Company Name" value={ex.company} onChange={e => setExp(i, 'company', e.target.value)} />
                    <Input label="Role / Designation" value={ex.role} onChange={e => setExp(i, 'role', e.target.value)} />
                    <Input label="Duration" value={ex.duration} onChange={e => setExp(i, 'duration', e.target.value)} placeholder="Jun 2024 – Aug 2024" />
                  </div>
                  <TextArea label="Description" rows={2} value={ex.description} onChange={e => setExp(i, 'description', e.target.value)} placeholder="What you worked on..." />
                </div>
              ))}
            </div>
            <AddBtn onClick={addExp} label="Add Experience" />
          </SectionPanel>
        </AnimatedSection>

        {/* ── Achievements ────────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.20}>
          <SectionPanel title="🏆 Achievements & Awards">
            <div className="space-y-4">
              {achievements.map((a, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Achievement {i + 1}</span>
                    {achievements.length > 1 && <RemoveBtn onClick={() => removeAch(i)} />}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Title / Award" value={a.title} onChange={e => setAch(i, 'title', e.target.value)} placeholder="Hackathon Winner, Best Intern..." />
                    <Input label="Year" value={a.year} onChange={e => setAch(i, 'year', e.target.value)} placeholder="2024" />
                  </div>
                  <TextArea label="Description" rows={1} value={a.description} onChange={e => setAch(i, 'description', e.target.value)} />
                </div>
              ))}
            </div>
            <AddBtn onClick={addAch} label="Add Achievement" />
          </SectionPanel>
        </AnimatedSection>

        {/* ── Responsibilities ────────────────────────────────────────────────── */}
        <AnimatedSection delay={0.22}>
          <SectionPanel title="📋 Responsibilities & Extracurriculars">
            <div className="space-y-2.5">
              {responsibilities.map((r, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input value={r} onChange={e => setResp(i, e.target.value)} placeholder="e.g. Class Representative, NSS Volunteer, Coding Club Lead..." className="flex-1 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 shadow-sm" />
                  {responsibilities.length > 1 && <RemoveBtn onClick={() => removeResp(i)} />}
                </div>
              ))}
            </div>
            <AddBtn onClick={addResp} label="Add Responsibility" />
          </SectionPanel>
        </AnimatedSection>

        {/* Save Button */}
        <AnimatedSection delay={0.24} className="flex justify-end">
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[var(--bg-primary)] disabled:opacity-60 disabled:cursor-not-allowed shadow-md">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save All Changes</>}
          </button>
        </AnimatedSection>
      </form>

      {/* ── Resume Section (separate from main form) ───────────────────────── */}
      <AnimatedSection delay={0.26}>
        <SectionPanel title="📄 Resume">
          <div className="space-y-5">
            {resumeUrl ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl">
                <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Resume Uploaded ✓</p>
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 mt-0.5">
                    <FileText size={11} /> View PDF Resume
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl">
                <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">⚠️ No resume uploaded. You won't be able to apply for jobs without it.</p>
              </div>
            )}

            <form onSubmit={handleResumeUpload} className="space-y-4">
              <div
                onClick={() => resumeRef.current?.click()}
                className="border-2 border-dashed border-[var(--panel-border)] hover:border-blue-400 rounded-xl p-8 text-center cursor-pointer transition-colors group"
              >
                <input ref={resumeRef} type="file" accept=".pdf" className="hidden" onChange={e => setResumeFile(e.target.files[0])} />
                <UploadCloud className="h-10 w-10 text-gray-400 group-hover:text-blue-400 transition-colors mx-auto mb-2" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{resumeFile ? resumeFile.name : 'Click to Select PDF Resume'}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">PDF format only · Max size 5MB · Will open correctly as PDF in browser</p>
              </div>

              {resumeFile && (
                <button type="submit" disabled={resumeLoading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {resumeLoading ? <><Loader2 size={15} className="animate-spin" /> Uploading...</> : <><UploadCloud size={15} /> Upload Resume</>}
                </button>
              )}
            </form>
          </div>
        </SectionPanel>
      </AnimatedSection>
    </div>
  );
};

export default ProfileSection;
