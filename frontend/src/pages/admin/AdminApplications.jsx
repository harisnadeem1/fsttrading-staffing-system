import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Briefcase, MapPin, Calendar } from 'lucide-react';
import { jobsData as initialJobs } from '@/data/jobs';

const AdminApplications = () => {
  const [storedJobs] = useState(() => JSON.parse(localStorage.getItem('jobs') || '[]'));
  const [applications] = useState(() => JSON.parse(localStorage.getItem('applications') || '[]'));

  const allJobs = useMemo(() => {
    const combined = [...initialJobs.en, ...storedJobs];
    const uniqueJobs = Array.from(new Map(combined.map(job => [job.id, job])).values());
    return uniqueJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }, [storedJobs]);

  const getApplicationCount = (jobId) => {
    return applications.filter(app => app.jobId.toString() === jobId.toString()).length;
  };

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
          {allJobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-xs mt-2 text-muted-foreground">
                    <span className="flex items-center"><Briefcase className="h-3 w-3 mr-1"/>{job.type}</span>
                    <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/>{job.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted: {new Date(job.postedDate).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                 <Badge variant="secondary">{getApplicationCount(job.id)} Applications</Badge>
                 <Button asChild>
                    <Link to={`/admin/applications/${job.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> View Applications
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {allJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs have been posted yet.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AdminApplications;