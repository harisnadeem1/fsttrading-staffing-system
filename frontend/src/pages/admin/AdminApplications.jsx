import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Briefcase, MapPin, Calendar, Loader2 } from 'lucide-react';

const AdminApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/with-applications`);

        console.log(res);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error('Expected array but got:', typeof data, data);
          setJobs([]);
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to fetch jobs');
        setJobs([]); // Ensure jobs is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Admin - Job Applications</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading applications...</span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Admin - Job Applications</title>
        </Helmet>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-red-600 mb-4">
            <h2 className="text-xl font-semibold mb-2">Error Loading Applications</h2>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Job Applications</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">Select a job to view submitted applications.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.job_id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-xs mt-2 text-muted-foreground">
                    <span className="flex items-center"><Briefcase className="h-3 w-3 mr-1"/>{job.job_type}</span>
                    <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/>{job.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted: {new Date(job.posting_date).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                 <Badge variant="secondary">{job.application_count} Applications</Badge>
                 <Button asChild>
                    <Link to={`/admin/applications/${job.job_id}`}>
                      <Eye className="mr-2 h-4 w-4" /> View Applications
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {(!Array.isArray(jobs) || jobs.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs have been posted yet.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AdminApplications;