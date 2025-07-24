import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye, Loader2, MapPin, Calendar, Briefcase, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const AdminJobs = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

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
    setDeleteLoading(id);
    
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
    } finally {
      setDeleteLoading(null);
      setDeleteConfirmOpen(false);
      setJobToDelete(null);
    }
  };

  const openDeleteConfirm = (job) => {
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      handleDelete(jobToDelete.job_id);
    }
  };

  // Mobile Card Component
  const JobCard = ({ job }) => (
    <Card className="md:hidden mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate pr-2">
              {job.title}
            </CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {deleteLoading === job.job_id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/admin/applications/${job.job_id}`} className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Applications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/admin/jobs/edit/${job.job_id}`} className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Job
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => openDeleteConfirm(job)}
                disabled={deleteLoading === job.job_id}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="h-3 w-3 mr-1" />
              <span>{job.job_type}</span>
            </div>
            <Badge variant={getStatus(job.application_deadline) === 'Active' ? 'default' : 'secondary'}>
              {getStatus(job.application_deadline)}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Posted: {new Date(job.posting_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Job Postings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Create, edit, and manage all job listings.</p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/admin/jobs/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Job
            </Link>
          </Button>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Jobs Found</h3>
                <p className="text-sm text-muted-foreground text-center">No job postings have been created yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden md:block">
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
                          <Link to={`/admin/applications/${job.job_id}`}>
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
                          onClick={() => openDeleteConfirm(job)}
                          disabled={deleteLoading === job.job_id}
                        >
                          {deleteLoading === job.job_id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog - MUI */}
        <Dialog 
          open={deleteConfirmOpen} 
          onClose={() => setDeleteConfirmOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: 1,
              mx: 2, // Add margin on mobile
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
              <WarningIcon color="error" />
              <Typography variant="h6" component="span">
                Delete Job Posting
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            {jobToDelete && (
              <>
                <DialogContentText sx={{ mb: 2 }}>
                  Are you sure you want to delete the job posting for{' '}
                  <Typography component="span" fontWeight="bold">
                    "{jobToDelete.title}"
                  </Typography>
                  {' '}in {jobToDelete.location}?
                </DialogContentText>
                
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    This action will permanently remove:
                  </Typography>
                  <List dense sx={{ mt: 1 }}>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• The entire job posting" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• All associated job applications" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• Uploaded CV files from applicants" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• Job requirements and descriptions" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Alert>

                <Typography variant="body2" color="error" fontWeight="bold">
                  This action cannot be undone and will affect all applicants for this position.
                </Typography>
              </>
            )}
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
            <MuiButton 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
              disabled={deleteLoading === jobToDelete?.job_id}
              fullWidth={{ xs: true, sm: false }}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={confirmDelete}
              variant="contained"
              color="error"
              disabled={deleteLoading === jobToDelete?.job_id}
              fullWidth={{ xs: true, sm: false }}
              startIcon={
                deleteLoading === jobToDelete?.job_id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {deleteLoading === jobToDelete?.job_id ? 'Deleting...' : 'Delete Job Posting'}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default AdminJobs;