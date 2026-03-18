import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronRight, Briefcase, X, Plus, Trash2, UploadCloud, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'Other'];
const COURSES = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA', 'B.Sc', 'M.Sc'];

const Input = ({ label, required, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-medium text-[var(--text-secondary)]">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <input className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors" required={required} {...props} />
  </div>
);

const Select = ({ label, required, children, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-medium text-[var(--text-secondary)]">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <select className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors" required={required} {...props}>{children}</select>
  </div>
);

const EMPTY_PROJ = { name: '', techStack: '', description: '', hostedLink: '', githubLink: '', contributors: '' };
const EMPTY_SKILL = { skill: '', proficiency: 'Intermediate' };

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); // job to apply for
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const resumeRef = useRef();
  const { user } = useAuth();

  const [form, setForm] = useState({
    applicantName: '', applicantEmail: '', mobile: '', course: '', branch: '', year: '',
    linkedinLink: '', githubLink: '', portfolioLink: '', otherLink: '',
    skills: [{ ...EMPTY_SKILL }],
    projects: [{ ...EMPTY_PROJ }],
    coverLetter: '',
    resumeFile: null,
  });

  useEffect(() => { fetchJobs(); }, [branchFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = branchFilter ? `?branch=${branchFilter}` : '';
      const { data } = await apiClient.get(`/jobs${params}`);
      setJobs(data.filter(j => j.visibility !== 'Draft'));
    } catch { console.error('Error fetching jobs'); }
    finally { setLoading(false); }
  };

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setSuccessMsg(''); setErrorMsg('');
    setForm({ applicantName: '', applicantEmail: '', mobile: '', course: '', branch: '', year: '',
      linkedinLink: '', githubLink: '', portfolioLink: '', otherLink: '',
      skills: [{ ...EMPTY_SKILL }], projects: [{ ...EMPTY_PROJ }],
      coverLetter: '', resumeFile: null });
  };

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const setSkill = (i, k, v) => { const s = [...form.skills]; s[i] = { ...s[i], [k]: v }; setField('skills', s); };
  const addSkill = () => setField('skills', [...form.skills, { ...EMPTY_SKILL }]);
  const removeSkill = (i) => setField('skills', form.skills.filter((_, idx) => idx !== i));
  const setProj = (i, k, v) => { const p = [...form.projects]; p[i] = { ...p[i], [k]: v }; setField('projects', p); };
  const addProject = () => { if (form.projects.length < 3) setField('projects', [...form.projects, { ...EMPTY_PROJ }]); };
  const removeProject = (i) => setField('projects', form.projects.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true); setErrorMsg(''); setSuccessMsg('');
    try {
      const fd = new FormData();
      fd.append('jobId', selectedJob._id);
      fd.append('applicantName', form.applicantName);
      fd.append('applicantEmail', form.applicantEmail);
      fd.append('mobile', form.mobile);
      fd.append('course', form.course);
      fd.append('branch', form.branch);
      fd.append('year', form.year);
      fd.append('linkedinLink', form.linkedinLink);
      fd.append('githubLink', form.githubLink);
      fd.append('portfolioLink', form.portfolioLink);
      fd.append('otherLink', form.otherLink);
      fd.append('coverLetter', form.coverLetter);
      fd.append('skills', JSON.stringify(form.skills.filter(s => s.skill.trim())));
      fd.append('projects', JSON.stringify(form.projects.filter(p => p.name.trim())));
      if (form.resumeFile) fd.append('resume', form.resumeFile);

      await apiClient.post('/applications/apply', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccessMsg('Application submitted! Check your email for a confirmation.');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Application failed. Please try again.');
    } finally { setSubmitting(false); }
  };

  const filteredJobs = jobs.filter(job =>
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Job Opportunities</h1>
          <p className="text-[var(--text-secondary)]">Find and apply for premium roles matching your profile.</p>
        </div>
      </AnimatedSection>

      {user?.isBlacklisted && (
        <AnimatedSection>
          <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm text-red-700 dark:text-red-400 text-sm flex items-start gap-3">
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold">Your account has been restricted.</p>
              <p className="mt-1">You are currently blocked from applying to new jobs. {user.blacklistReason ? `Reason: ${user.blacklistReason}` : 'Please contact the placement cell for more information.'}</p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Filters Bar */}
      <AnimatedSection delay={0.1} className="glass-panel p-4 rounded-2xl border border-[var(--panel-border)] shadow-sm bg-[var(--panel-bg)] flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search by company or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
        </div>
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm">
          <option value="">All Branches</option>
          {BRANCHES.map(b => <option key={b}>{b}</option>)}
        </select>
      </AnimatedSection>

      {/* Job Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading open roles...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredJobs.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20 text-gray-500">
                No jobs found matching your criteria.
              </motion.div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div key={job._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, delay: index * 0.04 }} layout>
                  <div className="h-full flex flex-col justify-between bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center border border-[var(--panel-border)] shrink-0">
                          <Briefcase className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">{job.companyName}</h3>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{job.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap mb-3">
                        {job.jobType && <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 font-medium">{job.jobType}</span>}
                        {job.workMode && <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium">{job.workMode}</span>}
                      </div>

                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">{job.description}</p>

                      <div className="grid grid-cols-2 gap-y-2 text-sm text-[var(--text-secondary)] mb-4">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-500 shrink-0" /><span className="truncate">{job.location}</span></div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <span>₹</span><span>{job.ctc || job.stipend || job.package}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <Calendar size={14} className="text-purple-500 shrink-0" />
                          <span className={new Date() > new Date(job.deadline) ? 'text-red-500 font-semibold' : ''}>
                            Deadline: {new Date(job.deadline).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-white/5 border border-[var(--panel-border)] text-[var(--text-secondary)]">{job.eligibility?.cgpa}+ CGPA</span>
                        {(job.eligibility?.branch || []).slice(0, 3).map(b => (
                          <span key={b} className="px-2 py-0.5 text-xs rounded-md bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300">{b}</span>
                        ))}
                        {(job.requiredSkills || []).slice(0, 2).map(s => (
                          <span key={s} className="px-2 py-0.5 text-xs rounded-md bg-purple-100/50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300">{s}</span>
                        ))}
                      </div>
                    </div>

                    {job.applicationMode === 'External Link' && job.applicationLink ? (
                      <a href={job.applicationLink} target="_blank" rel="noreferrer"
                        className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm ${user?.isBlacklisted ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                        Apply via External Link <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button onClick={() => openApplyModal(job)}
                        disabled={new Date() > new Date(job.deadline) || user?.isBlacklisted}
                        className="w-full py-3 bg-[var(--bg-secondary)] hover:bg-gray-200 dark:hover:bg-white/10 border border-[var(--panel-border)] text-[var(--text-primary)] rounded-xl font-medium transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                        {user?.isBlacklisted ? 'Applying Disabled' : new Date() > new Date(job.deadline) ? 'Deadline Passed' : 'Apply Now'}
                        {new Date() <= new Date(job.deadline) && !user?.isBlacklisted && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Application Form Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg-primary)] w-full max-w-3xl rounded-2xl border border-[var(--panel-border)] flex flex-col max-h-[95vh] shadow-2xl">
              {/* Header */}
              <div className="p-5 border-b border-[var(--panel-border)] shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Apply: {selectedJob.companyName}</h2>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{selectedJob.role} · {selectedJob.location}</p>
                  </div>
                  <button onClick={() => setSelectedJob(null)}><X size={20} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" /></button>
                </div>
              </div>

              {successMsg ? (
                <div className="p-10 text-center space-y-4">
                  <div className="text-5xl">✅</div>
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{successMsg}</h3>
                  <button onClick={() => setSelectedJob(null)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-500 transition-colors">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-6">
                  {errorMsg && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm">{errorMsg}</div>}

                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--panel-border)]">👤 Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Full Name" required value={form.applicantName} onChange={e => setField('applicantName', e.target.value)} />
                      <Input label="Email ID" type="email" required value={form.applicantEmail} onChange={e => setField('applicantEmail', e.target.value)} />
                      <Input label="Mobile Number" type="tel" required value={form.mobile} onChange={e => setField('mobile', e.target.value)} placeholder="+91..." />
                      <Select label="Course" required value={form.course} onChange={e => setField('course', e.target.value)}>
                        <option value="">Select Course</option>
                        {COURSES.map(c => <option key={c}>{c}</option>)}
                      </Select>
                      <Select label="Branch" required value={form.branch} onChange={e => setField('branch', e.target.value)}>
                        <option value="">Select Branch</option>
                        {BRANCHES.map(b => <option key={b}>{b}</option>)}
                      </Select>
                      <Select label="Year" required value={form.year} onChange={e => setField('year', e.target.value)}>
                        <option value="">Select Year</option>
                        {['1st Year','2nd Year','3rd Year','4th Year','Passout'].map(y => <option key={y}>{y}</option>)}
                      </Select>
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--panel-border)]">🔗 Professional Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="GitHub Link" type="url" value={form.githubLink} onChange={e => setField('githubLink', e.target.value)} placeholder="https://github.com/..." />
                      <Input label="LinkedIn Link" type="url" value={form.linkedinLink} onChange={e => setField('linkedinLink', e.target.value)} placeholder="https://linkedin.com/in/..." />
                      <Input label="Portfolio Link" type="url" value={form.portfolioLink} onChange={e => setField('portfolioLink', e.target.value)} placeholder="https://..." />
                      <Input label="LeetCode / Other Link" type="url" value={form.otherLink} onChange={e => setField('otherLink', e.target.value)} placeholder="https://leetcode.com/..." />
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--panel-border)]">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">⚡ Skills</h3>
                      <button type="button" onClick={addSkill} className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        <Plus size={12} /> Add Skill
                      </button>
                    </div>
                    <div className="space-y-2">
                      {form.skills.map((s, i) => (
                        <div key={i} className="flex gap-3 items-center">
                          <input value={s.skill} onChange={e => setSkill(i, 'skill', e.target.value)} placeholder="Skill name" className="flex-1 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500" />
                          <select value={s.proficiency} onChange={e => setSkill(i, 'proficiency', e.target.value)} className="bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500">
                            {PROFICIENCY_LEVELS.map(l => <option key={l}>{l}</option>)}
                          </select>
                          {form.skills.length > 1 && <button type="button" onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 size={15} /></button>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--panel-border)]">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">🚀 Projects <span className="text-xs font-normal text-[var(--text-secondary)]">(max 3)</span></h3>
                      {form.projects.length < 3 && (
                        <button type="button" onClick={addProject} className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          <Plus size={12} /> Add Project
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {form.projects.map((p, i) => (
                        <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)] space-y-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">Project {i+1}</span>
                            {form.projects.length > 1 && <button type="button" onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input label="Project Name" value={p.name} onChange={e => setProj(i, 'name', e.target.value)} />
                            <Input label="Tech Stack" value={p.techStack} onChange={e => setProj(i, 'techStack', e.target.value)} placeholder="React, Node, MongoDB..." />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-[var(--text-secondary)]">Description</label>
                            <textarea rows={2} value={p.description} onChange={e => setProj(i, 'description', e.target.value)}
                              className="w-full bg-[var(--bg-primary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 resize-none" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input label="Hosted Link" type="url" value={p.hostedLink} onChange={e => setProj(i, 'hostedLink', e.target.value)} placeholder="https://..." />
                            <Input label="GitHub Link" type="url" value={p.githubLink} onChange={e => setProj(i, 'githubLink', e.target.value)} placeholder="https://github.com/..." />
                          </div>
                          <Input label="Contributors (if any)" value={p.contributors} onChange={e => setProj(i, 'contributors', e.target.value)} placeholder="Name, Name..." />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--panel-border)]">📎 Upload Resume (PDF only)</h3>
                    <div
                      onClick={() => resumeRef.current?.click()}
                      className="border-2 border-dashed border-[var(--panel-border)] hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-colors"
                    >
                      <input ref={resumeRef} type="file" accept=".pdf" className="hidden" onChange={e => setField('resumeFile', e.target.files[0])} />
                      <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-[var(--text-primary)]">{form.resumeFile ? form.resumeFile.name : 'Click to select PDF resume'}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Max 5MB · PDF format only · Optional if you have uploaded to your profile</p>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--panel-border)]">✉️ Cover Letter (Optional)</h3>
                    <textarea rows={3} value={form.coverLetter} onChange={e => setField('coverLetter', e.target.value)}
                      placeholder="Tell us why you're a great fit for this role..."
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl p-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 resize-none" />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setSelectedJob(null)} className="px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors">Cancel</button>
                    <button type="submit" disabled={submitting}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? <><Loader2 size={15} className="animate-spin" /> Submitting...</> : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobListings;
