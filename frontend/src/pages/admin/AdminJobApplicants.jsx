import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
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

const AdminJobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      try {
        const [jobRes, appsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/applications/job/${jobId}`)
        ]);

        if (!jobRes.ok || !appsRes.ok) throw new Error("Failed to load job or applications");

        const jobData = await jobRes.json();
        const appData = await appsRes.json();

        setJob(jobData);
        setApplications(appData);
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Something went wrong",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [jobId]);

  const handleDownloadCV = (filename) => {
    if (!filename) {
      toast({
        title: "CV not available",
        variant: "destructive",
      });
      return;
    }

    const cvLink = `${import.meta.env.VITE_API_BASE_UP_URL}/uploads/${filename}`;
    window.open(cvLink, '_blank');
  };

  const handleDelete = async (applicationId) => {
    setDeleteLoading(applicationId);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/applications/${applicationId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete application');

      // Remove from state
      setApplications((prev) => prev.filter((app) => app.application_id !== applicationId));

      toast({
        title: "Application Deleted",
        description: "The application and its CV have been successfully removed.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong while deleting the application.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
      setDeleteConfirmOpen(false);
      setApplicationToDelete(null);
    }
  };

  const openDeleteConfirm = (application) => {
    setApplicationToDelete(application);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (applicationToDelete) {
      handleDelete(applicationToDelete.application_id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
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
              {applications.length} application(s) found for this job.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
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
                    {applications.map((app) => (
                      <TableRow key={app.application_id}>
                        <TableCell>{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.phone || 'N/A'}</TableCell>
                        <TableCell>{new Date(app.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {/* <Button asChild variant="outline" size="sm">
                            <Link to={`/admin/applications/${jobId}/${app.application_id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button> */}
                          <Button variant="outline" size="sm" onClick={() => handleDownloadCV(app.cv_url)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            disabled={deleteLoading === app.application_id}
                            onClick={() => openDeleteConfirm(app)}
                          >
                            {deleteLoading === app.application_id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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

        {/* Delete Confirmation Dialog - MUI */}
        <Dialog 
          open={deleteConfirmOpen} 
          onClose={() => setDeleteConfirmOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: 1
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
              <WarningIcon color="error" />
              <Typography variant="h6" component="span">
                Delete Application
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            {applicationToDelete && (
              <>
                <DialogContentText sx={{ mb: 2 }}>
                  Are you sure you want to delete the application from{' '}
                  <Typography component="span" fontWeight="bold">
                    {applicationToDelete.full_name}
                  </Typography>
                  ?
                </DialogContentText>
                
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    This action will permanently remove:
                  </Typography>
                  <List dense sx={{ mt: 1 }}>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• The application data" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• The uploaded CV file" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• All associated records" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Alert>

                <Typography variant="body2" color="error" fontWeight="bold">
                  This action cannot be undone.
                </Typography>
              </>
            )}
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <MuiButton 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
              disabled={deleteLoading === applicationToDelete?.application_id}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={confirmDelete}
              variant="contained"
              color="error"
              disabled={deleteLoading === applicationToDelete?.application_id}
              startIcon={
                deleteLoading === applicationToDelete?.application_id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {deleteLoading === applicationToDelete?.application_id ? 'Deleting...' : 'Delete Application'}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default AdminJobApplicants;