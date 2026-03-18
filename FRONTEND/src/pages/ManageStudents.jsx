import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { AnimatedSection } from '../components/AnimatedComponents';
import { Search, Loader2 } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await apiClient.get('/tpo/students');
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVerification = async (id, currentStatus) => {
    setSaving(id);
    try {
      await apiClient.put(`/tpo/students/${id}`, { isVerified: !currentStatus });
      setStudents(students.map(s => s._id === id ? { ...s, isVerified: !currentStatus } : s));
    } catch (error) {
      alert('Failed to update student status');
    } finally {
      setSaving(null);
    }
  };

  const toggleBlacklist = async (student) => {
    setSaving('bl-' + student._id);
    try {
      if (student.isBlacklisted) {
        await apiClient.patch(`/tpo/students/${student._id}/unblacklist`);
        setStudents(students.map(s => s._id === student._id ? { ...s, isBlacklisted: false } : s));
      } else {
        const reason = window.prompt("Enter reason for blacklisting:") || 'Policy Violation';
        await apiClient.patch(`/tpo/students/${student._id}/blacklist`, { reason });
        setStudents(students.map(s => s._id === student._id ? { ...s, isBlacklisted: true, blacklistReason: reason } : s));
      }
    } catch (error) {
      alert('Failed to update blacklist status');
    } finally {
      setSaving(null);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Manage Students</h1>
          <p className="text-[var(--text-secondary)]">View and manually verify student registration status.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl text-[var(--text-primary)] focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="glass-panel rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-[var(--panel-border)] text-[var(--text-secondary)]">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Branch</th>
                <th className="p-4 font-medium">CGPA</th>
                <th className="p-4 font-medium text-center">Verification</th>
                <th className="p-4 font-medium text-center">Disciplinary</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-[var(--text-secondary)]">Loading students...</td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8 text-[var(--text-secondary)]">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-[var(--panel-border)] hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors">
                    <td className="p-4 font-medium text-[var(--text-primary)]">{student.name}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{student.email}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{student.branch || '-'}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{student.cgpa || '-'}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                        ${student.isVerified
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                          : 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'}`}>
                        {student.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {student.isBlacklisted ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                          Blacklisted
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleVerification(student._id, student.isVerified)}
                          disabled={saving === student._id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center
                            ${student.isVerified 
                              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/20 dark:text-yellow-400' 
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400'
                            }`}
                        >
                          {saving === student._id && <Loader2 size={12} className="animate-spin mr-1" />}
                          {student.isVerified ? 'Revoke Access' : 'Verify'}
                        </button>
                        <button
                          onClick={() => toggleBlacklist(student)}
                          disabled={saving === 'bl-' + student._id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center
                            ${student.isBlacklisted 
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400' 
                              : 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400'
                            }`}
                        >
                          {saving === 'bl-' + student._id && <Loader2 size={12} className="animate-spin mr-1" />}
                          {student.isBlacklisted ? 'Unblock' : 'Block'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ManageStudents;
