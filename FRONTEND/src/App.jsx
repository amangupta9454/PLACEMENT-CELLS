import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import TpoLogin from './pages/TpoLogin';
import Terms from './pages/Terms';
import Rules from './pages/Rules';
import Eligibility from './pages/Eligibility';
import PlacementData from './pages/PlacementData';
import PublicInternships from './pages/PublicInternships';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import ProfileSection from './pages/ProfileSection';
import JobListings from './pages/JobListings';
import ApplicationTracker from './pages/ApplicationTracker';
import ResumeBuilder from './pages/ResumeBuilder';
import Internships from './pages/Internships';

// TPO Pages
import TpoDashboard from './pages/TpoDashboard';
import ManageStudents from './pages/ManageStudents';
import ManageJobs from './pages/ManageJobs';
import Applicants from './pages/Applicants';
import Announcements from './pages/Announcements';
import Reviews from './pages/Reviews';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-register" element={<StudentRegister />} />
            <Route path="/tpo-login" element={<TpoLogin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/placement-data" element={<PlacementData />} />
            <Route path="/internships" element={<PublicInternships />} />
           
            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute role="student" />}>
              <Route path="/student" element={<DashboardLayout role="student" />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<ProfileSection />} />
                <Route path="jobs" element={<JobListings />} />
                <Route path="applications" element={<ApplicationTracker />} />
                <Route path="resume" element={<ResumeBuilder />} />
                <Route path="internships" element={<Internships />} />
                <Route path="announcements" element={<Announcements />} />
              </Route>
            </Route>

            {/* TPO Protected Routes */}
            <Route element={<ProtectedRoute role="tpo" />}>
              <Route path="/tpo" element={<DashboardLayout role="tpo" />}>
                <Route path="dashboard" element={<TpoDashboard />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="internships" element={<Internships />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>

            {/* Catch All non-matched routes */}
            <Route path="*" element={<div className="h-screen flex items-center justify-center text-gray-800 bg-slate-50">404 - Page Not Found</div>} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
