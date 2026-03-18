import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Eye, Loader2, X, ExternalLink, Github, Linkedin, Globe, Code, CheckCircle, XCircle, Star, FileText } from 'lucide-react';

const STATUS_CONFIG = {
  Applied:     { bg: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',    btn: 'bg-blue-600' },
  Shortlisted: { bg: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20', btn: 'bg-amber-500' },
  Selected:    { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20', btn: 'bg-emerald-600' },
  Rejected:    { bg: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20', btn: 'bg-red-600' },
  Withdrawn:   { bg: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30', btn: 'bg-gray-500' },
};

const Badge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_CONFIG[status]?.bg}`}>{status}</span>
);

const InfoRow = ({ label, value }) => value ? (
  <div className="flex flex-col">
    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wide font-medium">{label}</span>
    <span className="text-sm text-[var(--text-primary)] font-medium mt-0.5">{value}</span>
  </div>
) : null;

const LinkItem = ({ href, icon: Icon, label }) => href ? (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
    <Icon size={14} />{label}
  </a>
) : null;

const Applicants = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => { fetchApps(); }, []);

  const fetchApps = async () => {
    try { const { data } = await apiClient.get('/tpo/applications'); setApps(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      await apiClient.put(`/tpo/applications/${id}`, { status: newStatus });
      setApps(apps.map(a => a._id === id ? { ...a, status: newStatus } : a));
      if (selectedApp?._id === id) setSelectedApp(prev => ({ ...prev, status: newStatus }));
    } catch { alert('Failed to update status'); }
    finally { setUpdating(null); }
  };

  const uniqueJobs = Array.from(new Set(apps.map(a => a.job?._id))).map(id => apps.find(a => a.job?._id === id)?.job).filter(Boolean);
  const filteredApps = apps.filter(a =>
    (!filterJob || a.job?._id === filterJob) &&
    (!filterStatus || a.status === filterStatus)
  );

  const PROFICIENCY_COLOR = { Beginner: 'bg-gray-100 text-gray-700', Intermediate: 'bg-blue-100 text-blue-700', Advanced: 'bg-purple-100 text-purple-700', Expert: 'bg-emerald-100 text-emerald-700' };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Applicants Tracking</h1>
          <p className="text-[var(--text-secondary)]">Review student applications and update selection statuses.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)}
            className="px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none shadow-sm">
            <option value="">All Jobs</option>
            {uniqueJobs.map(job => <option key={job._id} value={job._id}>{job.companyName} — {job.role}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none shadow-sm">
            <option value="">All Statuses</option>
            {['Applied','Shortlisted','Selected','Rejected','Withdrawn'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="glass-panel rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[50vh]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-[var(--panel-border)] text-[var(--text-secondary)] text-sm">
                <th className="p-4 font-medium">Student</th>
                <th className="p-4 font-medium">Branch / CGPA</th>
                <th className="p-4 font-medium">Job Applied</th>
                <th className="p-4 font-medium">Applied On</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="6" className="text-center p-8 text-[var(--text-secondary)]">Loading applications...</td></tr>
              ) : filteredApps.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-8 text-[var(--text-secondary)]">No applications found.</td></tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app._id} className="border-b border-[var(--panel-border)] hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-[var(--text-primary)]">{app.applicantName || app.student?.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{app.applicantEmail || app.student?.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-[var(--text-secondary)]">{app.branch || app.student?.branch || '—'}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">CGPA: {app.student?.cgpa || '—'}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-[var(--text-primary)]">{app.job?.companyName}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{app.job?.role}</p>
                    </td>
                    <td className="p-4 text-xs text-[var(--text-secondary)]">
                      {new Date(app.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                    </td>
                    <td className="p-4 text-center"><Badge status={app.status} /></td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/20 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* View Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-[var(--bg-primary)] w-full max-w-3xl rounded-2xl border border-[var(--panel-border)] flex flex-col max-h-[95vh] shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-[var(--panel-border)] flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{selectedApp.applicantName || selectedApp.student?.name}</h2>
                <p className="text-sm text-purple-600 dark:text-purple-400">{selectedApp.job?.companyName} — {selectedApp.job?.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={selectedApp.status} />
                <button onClick={() => setSelectedApp(null)}><X size={20} className="text-[var(--text-secondary)]" /></button>
              </div>
            </div>

            <div className="overflow-y-auto p-5 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><span>👤</span> Personal Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[var(--bg-secondary)] rounded-xl">
                  <InfoRow label="Email" value={selectedApp.applicantEmail || selectedApp.student?.email} />
                  <InfoRow label="Mobile" value={selectedApp.mobile} />
                  <InfoRow label="Course" value={selectedApp.course} />
                  <InfoRow label="Branch" value={selectedApp.branch || selectedApp.student?.branch} />
                  <InfoRow label="Year" value={selectedApp.year} />
                  <InfoRow label="CGPA" value={selectedApp.student?.cgpa} />
                </div>
              </div>

              {/* Links */}
              {(selectedApp.linkedinLink || selectedApp.githubLink || selectedApp.portfolioLink || selectedApp.otherLink || selectedApp.resumeUrl || selectedApp.student?.resumeUrl) && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><span>🔗</span> Links & Resume</h3>
                  <div className="flex flex-wrap gap-4 p-4 bg-[var(--bg-secondary)] rounded-xl">
                    <LinkItem href={selectedApp.linkedinLink} icon={Linkedin} label="LinkedIn" />
                    <LinkItem href={selectedApp.githubLink} icon={Github} label="GitHub" />
                    <LinkItem href={selectedApp.portfolioLink} icon={Globe} label="Portfolio" />
                    <LinkItem href={selectedApp.otherLink} icon={ExternalLink} label="Other Link" />
                    {(selectedApp.resumeUrl || selectedApp.student?.resumeUrl) && (
                      <a href={selectedApp.resumeUrl || selectedApp.student?.resumeUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
                        <FileText size={14} /> View Resume PDF
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {selectedApp.skills?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><span>⚡</span> Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.skills.map((s, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${PROFICIENCY_COLOR[s.proficiency] || 'bg-gray-100 text-gray-700'}`}>
                        {s.skill} <span className="opacity-60">· {s.proficiency}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {selectedApp.projects?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><span>🚀</span> Projects</h3>
                  <div className="space-y-3">
                    {selectedApp.projects.map((p, i) => (
                      <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--panel-border)]">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <h4 className="font-bold text-[var(--text-primary)]">{p.name}</h4>
                          <div className="flex gap-2">
                            {p.hostedLink && <a href={p.hostedLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"><Globe size={12}/>Live</a>}
                            {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><Github size={12}/>Repo</a>}
                          </div>
                        </div>
                        {p.techStack && <p className="text-xs text-purple-600 dark:text-purple-400 mb-1 font-medium"><Code size={10} className="inline mr-1"/>{p.techStack}</p>}
                        {p.description && <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-1">{p.description}</p>}
                        {p.contributors && <p className="text-xs text-[var(--text-secondary)]">Contributors: {p.contributors}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApp.coverLetter && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">📄 Cover Letter</h3>
                  <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-xl p-4 leading-relaxed whitespace-pre-line">{selectedApp.coverLetter}</p>
                </div>
              )}

              {/* Status Actions */}
              <div className="border-t border-[var(--panel-border)] pt-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">Update Application Status</h3>
                <div className="flex flex-wrap gap-3">
                  {['Shortlisted', 'Selected', 'Rejected'].map(status => (
                    <button
                      key={status}
                      disabled={updating === selectedApp._id || selectedApp.status === status}
                      onClick={() => updateStatus(selectedApp._id, status)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                        ${status === 'Shortlisted' ? 'bg-amber-500 hover:bg-amber-400' : status === 'Selected' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
                    >
                      {updating === selectedApp._id ? <Loader2 size={14} className="animate-spin" /> : (
                        status === 'Selected' ? <CheckCircle size={14} /> : status === 'Rejected' ? <XCircle size={14} /> : <Star size={14} />
                      )}
                      {status}
                    </button>
                  ))}
                  {selectedApp.status !== 'Applied' && (
                    <button
                      disabled={updating === selectedApp._id}
                      onClick={() => updateStatus(selectedApp._id, 'Applied')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--panel-border)] text-[var(--text-secondary)] text-sm transition-colors hover:bg-[var(--bg-secondary)] disabled:opacity-50"
                    >
                      Reset to Applied
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
