import { useState, useEffect, useRef } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Plus, Edit2, Trash2, X, Upload, FileSpreadsheet, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm text-[var(--text-secondary)]">{label}</label>}
    <input className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-[var(--text-primary)] outline-none focus:border-purple-500 shadow-sm text-sm" {...props} />
  </div>
);

const TextArea = ({ label, rows = 3, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm text-[var(--text-secondary)]">{label}</label>}
    <textarea rows={rows} className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-[var(--text-primary)] resize-none outline-none focus:border-purple-500 shadow-sm text-sm" {...props} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm text-[var(--text-secondary)]">{label}</label>}
    <select className="w-full bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-[var(--text-primary)] outline-none focus:border-purple-500 shadow-sm text-sm" {...props}>
      {children}
    </select>
  </div>
);

const SectionHeader = ({ title, open, onToggle }) => (
  <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg text-[var(--text-primary)] font-semibold text-sm hover:bg-purple-500/10 transition-colors">
    {title}
    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </button>
);

const EMPTY_FORM = {
  companyName: '', companyWebsite: '', aboutCompany: '', industryType: '', companyLocation: '',
  role: '', jobType: 'Full-Time', workMode: 'On-site', openings: 1, location: '',
  stipend: '', ctc: '', perks: '',
  requiredSkills: '', preferredSkills: '', programmingLanguages: '', tools: '',
  eligibility: { cgpa: '', branch: '', passingYear: '' },
  description: '', roleOverview: '', responsibilities: '', qualifications: '', additionalInfo: '',
  selectionRounds: [],
  applicationStartDate: '', deadline: '', testDates: '', interviewDates: '',
  applicationMode: 'Internal Portal', applicationLink: '',
  visibility: 'Published', tags: '',
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [openSections, setOpenSections] = useState({ company: true, job: true, compensation: false, skills: false, description: false, process: false, dates: false, application: false });
  const [excelImporting, setExcelImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const excelRef = useRef();

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try { const { data } = await apiClient.get('/tpo/jobs'); setJobs(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const toggleSection = (k) => setOpenSections(p => ({ ...p, [k]: !p[k] }));
  const set = (field, val) => setFormData(p => ({ ...p, [field]: val }));
  const setEl = (field, val) => setFormData(p => ({ ...p, eligibility: { ...p.eligibility, [field]: val } }));

  const openModal = (job = null) => {
    if (job) {
      setCurrentJob(job._id);
      setFormData({
        companyName: job.companyName || '', companyWebsite: job.companyWebsite || '',
        aboutCompany: job.aboutCompany || '', industryType: job.industryType || '',
        companyLocation: job.companyLocation || '', role: job.role || '',
        jobType: job.jobType || 'Full-Time', workMode: job.workMode || 'On-site',
        openings: job.openings || 1, location: job.location || '',
        stipend: job.stipend || '', ctc: job.ctc || '', perks: job.perks || '',
        requiredSkills: (job.requiredSkills || []).join(', '),
        preferredSkills: (job.preferredSkills || []).join(', '),
        programmingLanguages: (job.programmingLanguages || []).join(', '),
        tools: (job.tools || []).join(', '),
        eligibility: {
          cgpa: job.eligibility?.cgpa || '',
          branch: (job.eligibility?.branch || []).join(', '),
          passingYear: (job.eligibility?.passingYear || []).join(', '),
        },
        description: job.description || '', roleOverview: job.roleOverview || '',
        responsibilities: (job.responsibilities || []).join('\n'),
        qualifications: (job.qualifications || []).join('\n'),
        additionalInfo: job.additionalInfo || '',
        selectionRounds: job.selectionRounds || [],
        applicationStartDate: job.applicationStartDate ? job.applicationStartDate.split('T')[0] : '',
        deadline: job.deadline ? job.deadline.split('T')[0] : '',
        testDates: job.testDates || '', interviewDates: job.interviewDates || '',
        applicationMode: job.applicationMode || 'Internal Portal',
        applicationLink: job.applicationLink || '',
        visibility: job.visibility || 'Published',
        tags: (job.tags || []).join(', '),
      });
    } else {
      setCurrentJob(null);
      setFormData(EMPTY_FORM);
    }
    setOpenSections({ company: true, job: true, compensation: false, skills: false, description: false, process: false, dates: false, application: false });
    setIsModalOpen(true);
  };

  const csvToArr = (str) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];
  const linesArr = (str) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requiredSkills: csvToArr(formData.requiredSkills),
        preferredSkills: csvToArr(formData.preferredSkills),
        programmingLanguages: csvToArr(formData.programmingLanguages),
        tools: csvToArr(formData.tools),
        tags: csvToArr(formData.tags),
        responsibilities: linesArr(formData.responsibilities),
        qualifications: linesArr(formData.qualifications),
        eligibility: {
          cgpa: parseFloat(formData.eligibility.cgpa) || 0,
          branch: csvToArr(formData.eligibility.branch),
          passingYear: csvToArr(formData.eligibility.passingYear),
        },
        package: formData.ctc || formData.stipend || '',
      };
      if (currentJob) await apiClient.put(`/tpo/jobs/${currentJob}`, payload);
      else await apiClient.post('/tpo/jobs', payload);
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) { alert(err.response?.data?.message || 'Error saving job'); }
  };

  const addRound = () => set('selectionRounds', [...formData.selectionRounds, { roundName: '', mode: 'Online' }]);
  const removeRound = (i) => set('selectionRounds', formData.selectionRounds.filter((_, idx) => idx !== i));
  const setRound = (i, field, val) => {
    const rounds = [...formData.selectionRounds];
    rounds[i] = { ...rounds[i], [field]: val };
    set('selectionRounds', rounds);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this job posting? All applications will also be deleted.')) {
      try { await apiClient.delete(`/tpo/jobs/${id}`); fetchJobs(); }
      catch { alert('Failed to delete'); }
    }
  };

  const handleExcelImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setExcelImporting(true);
    setImportResult(null);
    try {
      const fd = new FormData();
      fd.append('excel', file);
      const { data } = await apiClient.post('/tpo/jobs/import-excel', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImportResult(data);
      fetchJobs();
    } catch (err) {
      setImportResult({ message: err.response?.data?.message || 'Import failed', errors: [] });
    } finally {
      setExcelImporting(false);
      e.target.value = '';
    }
  };

  const downloadTemplate = () => {
    const headers = ['Company Name','Company Website','About Company','Industry Type','Company Location','Job Title','Job Type','Work Mode','Openings','Job Location','Stipend','CTC','Perks','Required Skills','Preferred Skills','Programming Languages','Tools','Min CGPA','Eligible Branches','Passing Year','Description','Role Overview','Responsibilities','Qualifications','Additional Info','Application Deadline','Application Start Date','Test Date','Interview Date','Application Mode','Application Link','Visibility','Tags'];
    const csv = headers.join(',') + '\n' + 'Google,"https://google.com","Top tech company",IT,"Bangalore, India",SDE Intern,Internship,Hybrid,5,Bangalore,25000,,"PPO offered","DSA, React","Node.js",JavaScript,"VS Code, Git",7.0,"CSE, IT",2025,Role overview here,Internship overview,,,"Extra info",2025-06-30,2025-04-01,,,Internal Portal,,Published,"React, Internship"';
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'job_import_template.csv'; a.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Job Postings</h1>
          <p className="text-[var(--text-secondary)]">Manage campus drive job listings.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadTemplate} className="flex items-center gap-2 border border-[var(--panel-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 rounded-lg text-sm transition-colors">
            <FileSpreadsheet size={16} /> Sample Template
          </button>
          <label className={`flex items-center gap-2 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${excelImporting ? 'opacity-50' : ''}`}>
            <Upload size={16} /> {excelImporting ? 'Importing...' : 'Import Excel'}
            <input ref={excelRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleExcelImport} disabled={excelImporting} />
          </label>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            <Plus size={16} /> New Job
          </button>
        </div>
      </AnimatedSection>

      {importResult && (
        <div className={`p-4 rounded-lg border text-sm ${importResult.created > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'}`}>
          <p className="font-semibold">{importResult.message}</p>
          {importResult.errors?.length > 0 && <ul className="mt-2 list-disc ml-4">{importResult.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-[var(--text-secondary)] col-span-3 text-center py-10">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-[var(--text-secondary)] col-span-3 text-center py-10 border border-dashed border-[var(--panel-border)] rounded-2xl bg-[var(--bg-secondary)]">No job postings yet. Click 'New Job' to create one.</div>
        ) : (
          jobs.map((job, idx) => (
            <AnimatedSection key={job._id} delay={idx * 0.05}>
              <div className="h-full flex flex-col justify-between bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">{job.companyName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.visibility === 'Published' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'}`}>
                          {job.visibility === 'Published' ? <span className="flex items-center gap-1"><Eye size={10}/> Published</span> : <span className="flex items-center gap-1"><EyeOff size={10}/> Draft</span>}
                        </span>
                      </div>
                      <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">{job.role}</p>
                    </div>
                    <div className="flex gap-2 ml-2 shrink-0">
                      <button onClick={() => openModal(job)} className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 rounded-md transition-colors"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(job._id)} className="p-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 rounded-md transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)] mb-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--panel-border)]">{job.jobType}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--panel-border)]">{job.workMode}</span>
                    </div>
                    <p><span className="opacity-70">Package:</span> {job.ctc || job.stipend || job.package}</p>
                    <p><span className="opacity-70">Location:</span> {job.location}</p>
                    <p className={new Date() > new Date(job.deadline) ? 'text-red-500 font-semibold' : ''}>
                      <span className="opacity-70 font-normal">Deadline:</span> {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  {job.tags?.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {job.tags.slice(0, 3).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[var(--bg-primary)] w-full max-w-3xl rounded-2xl border border-[var(--panel-border)] flex flex-col max-h-[95vh] shadow-2xl">
            <div className="p-5 border-b border-[var(--panel-border)] flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{currentJob ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-[var(--text-secondary)]" /></button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">

              {/* Company Info */}
              <SectionHeader title="🏢 Company Information" open={openSections.company} onToggle={() => toggleSection('company')} />
              {openSections.company && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                  <Input label="Company Name *" required value={formData.companyName} onChange={e => set('companyName', e.target.value)} />
                  <Input label="Company Website" value={formData.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} placeholder="https://..." />
                  <Input label="Industry Type" value={formData.industryType} onChange={e => set('industryType', e.target.value)} placeholder="IT, Fintech, EdTech..." />
                  <Input label="Company Location" value={formData.companyLocation} onChange={e => set('companyLocation', e.target.value)} />
                  <TextArea label="About Company" className="sm:col-span-2" rows={2} value={formData.aboutCompany} onChange={e => set('aboutCompany', e.target.value)} />
                </div>
              )}

              {/* Job Details */}
              <SectionHeader title="💼 Job Details" open={openSections.job} onToggle={() => toggleSection('job')} />
              {openSections.job && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                  <Input label="Job Title / Role *" required value={formData.role} onChange={e => set('role', e.target.value)} />
                  <Select label="Job Type *" required value={formData.jobType} onChange={e => set('jobType', e.target.value)}>
                    <option>Internship</option><option>Full-Time</option><option>Internship + PPO</option>
                  </Select>
                  <Select label="Work Mode" value={formData.workMode} onChange={e => set('workMode', e.target.value)}>
                    <option>Remote</option><option>On-site</option><option>Hybrid</option>
                  </Select>
                  <Input label="Job Location *" required value={formData.location} onChange={e => set('location', e.target.value)} />
                  <Input label="Number of Openings" type="number" min="1" value={formData.openings} onChange={e => set('openings', e.target.value)} />
                  <Select label="Visibility" value={formData.visibility} onChange={e => set('visibility', e.target.value)}>
                    <option>Published</option><option>Draft</option>
                  </Select>
                  <Input label="Tags (comma-separated)" className="sm:col-span-2" value={formData.tags} onChange={e => set('tags', e.target.value)} placeholder="React, SDE, Internship..." />
                </div>
              )}

              {/* Compensation */}
              <SectionHeader title="💰 Compensation" open={openSections.compensation} onToggle={() => toggleSection('compensation')} />
              {openSections.compensation && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-1">
                  <Input label="Stipend (₹/month)" value={formData.stipend} onChange={e => set('stipend', e.target.value)} placeholder="25000" />
                  <Input label="CTC (₹ LPA)" value={formData.ctc} onChange={e => set('ctc', e.target.value)} placeholder="12 LPA" />
                  <Input label="Perks & Benefits" value={formData.perks} onChange={e => set('perks', e.target.value)} placeholder="PPO, Certificate..." />
                </div>
              )}

              {/* Skills & Eligibility */}
              <SectionHeader title="🧠 Skills & Eligibility" open={openSections.skills} onToggle={() => toggleSection('skills')} />
              {openSections.skills && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                  <Input label="Required Skills (CSV)" value={formData.requiredSkills} onChange={e => set('requiredSkills', e.target.value)} placeholder="React, DSA, Node.js..." />
                  <Input label="Preferred Skills (CSV)" value={formData.preferredSkills} onChange={e => set('preferredSkills', e.target.value)} />
                  <Input label="Programming Languages (CSV)" value={formData.programmingLanguages} onChange={e => set('programmingLanguages', e.target.value)} />
                  <Input label="Tools/Technologies (CSV)" value={formData.tools} onChange={e => set('tools', e.target.value)} />
                  <Input label="Min. CGPA *" required type="number" step="0.1" min="0" max="10" value={formData.eligibility.cgpa} onChange={e => setEl('cgpa', e.target.value)} />
                  <Input label="Eligible Branches (CSV)" placeholder="CSE, IT, ECE" required value={formData.eligibility.branch} onChange={e => setEl('branch', e.target.value)} />
                  <Input label="Eligible Passing Year (CSV)" placeholder="2025, 2026" value={formData.eligibility.passingYear} onChange={e => setEl('passingYear', e.target.value)} />
                </div>
              )}

              {/* Job Description */}
              <SectionHeader title="📝 Job Description" open={openSections.description} onToggle={() => toggleSection('description')} />
              {openSections.description && (
                <div className="space-y-4 px-1">
                  <TextArea label="Role Overview / Description *" rows={3} required value={formData.description} onChange={e => set('description', e.target.value)} />
                  <TextArea label="Key Responsibilities (one per line)" rows={3} value={formData.responsibilities} onChange={e => set('responsibilities', e.target.value)} placeholder="Develop features&#10;Write tests&#10;Code review..." />
                  <TextArea label="Required Qualifications (one per line)" rows={2} value={formData.qualifications} onChange={e => set('qualifications', e.target.value)} />
                  <TextArea label="Additional Info (Optional)" rows={2} value={formData.additionalInfo} onChange={e => set('additionalInfo', e.target.value)} />
                </div>
              )}

              {/* Selection Process */}
              <SectionHeader title="🧪 Selection Process" open={openSections.process} onToggle={() => toggleSection('process')} />
              {openSections.process && (
                <div className="space-y-3 px-1">
                  {formData.selectionRounds.map((round, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <span className="text-xs text-[var(--text-secondary)] w-16 shrink-0">Round {i+1}</span>
                      <input value={round.roundName} onChange={e => setRound(i, 'roundName', e.target.value)} placeholder="e.g. Aptitude, Coding, HR Interview" className="flex-1 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-purple-500" />
                      <select value={round.mode} onChange={e => setRound(i, 'mode', e.target.value)} className="bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-purple-500">
                        <option>Online</option><option>Offline</option>
                      </select>
                      <button type="button" onClick={() => removeRound(i)} className="text-red-400 hover:text-red-600"><X size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addRound} className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"><Plus size={14}/> Add Round</button>
                </div>
              )}

              {/* Dates */}
              <SectionHeader title="📅 Important Dates" open={openSections.dates} onToggle={() => toggleSection('dates')} />
              {openSections.dates && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                  <Input label="Application Start Date" type="date" value={formData.applicationStartDate} onChange={e => set('applicationStartDate', e.target.value)} />
                  <Input label="Application Deadline *" type="date" required value={formData.deadline} onChange={e => set('deadline', e.target.value)} />
                  <Input label="Test Date(s)" value={formData.testDates} onChange={e => set('testDates', e.target.value)} placeholder="12 April 2025" />
                  <Input label="Interview Date(s)" value={formData.interviewDates} onChange={e => set('interviewDates', e.target.value)} placeholder="20 April 2025" />
                </div>
              )}

              {/* Application Details */}
              <SectionHeader title="📩 Application Details" open={openSections.application} onToggle={() => toggleSection('application')} />
              {openSections.application && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                  <Select label="Application Mode" value={formData.applicationMode} onChange={e => set('applicationMode', e.target.value)}>
                    <option>Internal Portal</option><option>External Link</option>
                  </Select>
                  {formData.applicationMode === 'External Link' && (
                    <Input label="Application Link" value={formData.applicationLink} onChange={e => set('applicationLink', e.target.value)} placeholder="https://..." />
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-[var(--panel-border)] mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg font-medium transition-colors">
                  {currentJob ? 'Save Changes' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
