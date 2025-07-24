import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminJobs = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        toast({
          title: 'Error loading jobs',
          description: err.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    };

    fetchJobs();
  }, []);

  const getStatus = (deadline) => {
    return new Date(deadline) >= new Date() ? 'Active' : 'Closed';
  };


  const handleDelete = async (id) => {
  const confirm = window.confirm('Are you sure you want to delete this job?');
  if (!confirm) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast({
      title: 'Job Deleted',
      description: data.message,
    });

    // Refresh job list
    setJobs(prev => prev.filter(job => job.job_id !== id));
  } catch (err) {
    toast({
      title: 'Delete Failed',
      description: err.message || 'Something went wrong',
      variant: 'destructive',
    });
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
            <CardDescription>A list of all job postings in the system.</CardDescription>
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
                  {jobs.map((job) => (
                    <TableRow key={job.job_id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.job_type}</TableCell>
                      <TableCell>{new Date(job.posting_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatus(job.application_deadline) === 'Active' ? 'default' : 'secondary'}>
                          {getStatus(job.application_deadline)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/applications?job=${job.job_id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/jobs/edit/${job.job_id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
  variant="ghost"
  size="icon"
  onClick={() => handleDelete(job.job_id)}
>
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
