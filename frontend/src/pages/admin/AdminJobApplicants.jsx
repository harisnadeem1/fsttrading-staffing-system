import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { jobsData as initialJobs } from '@/data/jobs';

const AdminJobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('applications') || '[]'));

  const job = useMemo(() => {
    const allJobs = [...initialJobs.en, ...JSON.parse(localStorage.getItem('jobs') || '[]')];
    return allJobs.find(j => j.id.toString() === jobId);
  }, [jobId]);

  const applicantsForJob = useMemo(() => {
    return applications.filter(app => app.jobId.toString() === jobId);
  }, [applications, jobId]);

  const handleDelete = (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application? This cannot be undone.')) {
      const updatedApplications = applications.filter(app => app.id !== applicationId);
      setApplications(updatedApplications);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      toast({
        title: "Application Deleted",
        description: "The application has been successfully removed.",
      });
    }
  };

  const handleDownloadCV = () => {
    toast({
      title: "🚧 Feature Not Implemented",
      description: "CV download functionality is not yet available.",
    });
  };
  
  if (!job) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Button onClick={() => navigate('/admin/applications')} className="mt-4">Back to Applications</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Applicants for {job.title}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Button variant="ghost" onClick={() => navigate('/admin/applications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Jobs
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Applicants for "{job.title}"</h1>
            <p className="text-muted-foreground">Manage applications for this job posting.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications List</CardTitle>
            <CardDescription>
              {applicantsForJob.length} application(s) found for this job.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applicantsForJob.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicantsForJob.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.fullName}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.phone || 'N/A'}</TableCell>
                        <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button asChild variant="outline" size="sm">
                             <Link to={`/admin/applications/${jobId}/${app.id}`}>
                               <Eye className="h-4 w-4" />
                             </Link>
                           </Button>
                           <Button variant="outline" size="sm" onClick={handleDownloadCV}>
                             <Download className="h-4 w-4" />
                           </Button>
                           <Button variant="destructive" size="sm" onClick={() => handleDelete(app.id)}>
                             <Trash2 className="h-4 w-4" />
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No applications have been submitted for this job yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminJobApplicants;