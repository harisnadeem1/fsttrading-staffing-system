import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Phone, FileText, Trash2, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { jobsData as initialJobs } from '@/data/jobs';

const AdminApplicationDetails = () => {
  const { jobId, applicationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('applications') || '[]'));

  const application = useMemo(() => {
    return applications.find(app => app.id.toString() === applicationId);
  }, [applications, applicationId]);

  const job = useMemo(() => {
    const allJobs = [...initialJobs.en, ...JSON.parse(localStorage.getItem('jobs') || '[]')];
    return allJobs.find(j => j.id.toString() === jobId);
  }, [jobId]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application? This cannot be undone.')) {
      const updatedApplications = applications.filter(app => app.id.toString() !== applicationId);
      setApplications(updatedApplications);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      toast({
        title: "Application Deleted",
        description: "The application has been successfully removed.",
      });
      navigate(`/admin/applications/${jobId}`);
    }
  };

  const handleDownloadCV = () => {
    toast({
      title: "🚧 Feature Not Implemented",
      description: "CV download functionality is not yet available.",
    });
  };

  if (!application || !job) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Application or Job not found</h1>
        <Button onClick={() => navigate('/admin/applications')} className="mt-4">Back to Applications</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Application from {application.fullName}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Button variant="ghost" asChild>
            <Link to={`/admin/applications/${jobId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applicants List
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Application Details</CardTitle>
            <CardDescription>For job: <span className="font-semibold">{job.title}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg"><User className="mr-2 h-5 w-5"/>Candidate Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="flex items-center"><User className="mr-3 h-4 w-4 text-muted-foreground"/><strong>Name:</strong><span className="ml-2">{application.fullName}</span></p>
                  <p className="flex items-center"><Mail className="mr-3 h-4 w-4 text-muted-foreground"/><strong>Email:</strong><span className="ml-2">{application.email}</span></p>
                  <p className="flex items-center"><Phone className="mr-3 h-4 w-4 text-muted-foreground"/><strong>Phone:</strong><span className="ml-2">{application.phone || 'N/A'}</span></p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><FileText className="mr-2 h-5 w-5"/>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{application.coverLetter || "No cover letter provided."}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-end space-x-4 border-t pt-6">
               <Button variant="outline" onClick={handleDownloadCV}>
                 <Download className="mr-2 h-4 w-4" />
                 Download CV
               </Button>
               <Button variant="destructive" onClick={handleDelete}>
                 <Trash2 className="mr-2 h-4 w-4" />
                 Delete Application
               </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminApplicationDetails;