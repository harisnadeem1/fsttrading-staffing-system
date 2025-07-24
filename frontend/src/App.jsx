import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ServicePage from '@/pages/Services';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import Apply from '@/pages/Apply';
import RequestStaff from '@/pages/RequestStaff';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import AdminLogin from '@/pages/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminJobs from '@/pages/admin/AdminJobs';
import AdminJobForm from '@/pages/admin/AdminJobForm';
import AdminApplications from '@/pages/admin/AdminApplications';
import AdminJobApplicants from '@/pages/admin/AdminJobApplicants';
import AdminApplicationDetails from '@/pages/admin/AdminApplicationDetails';
import AdminRequests from '@/pages/admin/AdminRequests';
import AdminRequestDetails from '@/pages/admin/AdminRequestDetails';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminContactDetails from '@/pages/admin/AdminContactDetails';


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

const AppContent = () => {
  const location = useLocation();
  const isPublicRoute = !location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isPublicRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/:jobId" element={<Apply />} />
          <Route path="/request-staff" element={<RequestStaff />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="jobs/new" element={<AdminJobForm />} />
            <Route path="jobs/edit/:jobId" element={<AdminJobForm />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="applications/:jobId" element={<AdminJobApplicants />} />
            <Route path="applications/:jobId/:applicationId" element={<AdminApplicationDetails />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="requests/:requestId" element={<AdminRequestDetails />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="contacts/:contactId" element={<AdminContactDetails />} />
          </Route>
        </Routes>
      </main>
      {isPublicRoute && <Footer />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;