import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { jobsData as initialJobs } from '@/data/jobs';

const AdminJobs = () => {
  const { toast } = useToast();
  const [storedJobs, setStoredJobs] = useState(() => JSON.parse(localStorage.getItem('jobs') || '[]'));

  const allJobs = useMemo(() => {
    const combined = [...initialJobs.en, ...storedJobs];
    // Simple deduplication based on ID
    const uniqueJobs = Array.from(new Map(combined.map(job => [job.id, job])).values());
    return uniqueJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }, [storedJobs]);

  const getStatus = (deadline) => {
    return new Date(deadline) >= new Date() ? 'Active' : 'Closed';
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      const updatedJobs = storedJobs.filter(job => job.id !== jobId);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      setStoredJobs(updatedJobs);
      toast({
        title: "Job Deleted",
        description: "The job posting has been successfully deleted.",
      });
    }
  };

  const handleEdit = (jobId) => {
    // Check if the job is from initial data
    if (initialJobs.en.some(j => j.id === jobId)) {
      toast({
        title: "Cannot Edit Initial Data",
        description: "This job is part of the initial dataset and cannot be edited here.",
        variant: "destructive",
      });
    } else {
      // This would navigate to the edit page, which is already implemented
      // The Link component handles navigation
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - Manage Jobs</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Job Postings</h1>
            <p className="text-muted-foreground">Create, edit, and manage all job listings.</p>
          </div>
          <Button asChild>
            <Link to="/admin/jobs/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Job
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Jobs</CardTitle>
            <CardDescription>
              A list of all job postings in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatus(job.deadline) === 'Active' ? 'default' : 'secondary'}>
                          {getStatus(job.deadline)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/applications?job=${job.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild onClick={() => handleEdit(job.id)}>
                          <Link to={`/admin/jobs/edit/${job.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)} disabled={initialJobs.en.some(j => j.id === job.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminJobs;