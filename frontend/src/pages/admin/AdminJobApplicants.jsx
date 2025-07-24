import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, Trash2, ArrowLeft, AlertTriangle, User, Mail, Phone, Calendar, MoreVertical, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
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

  // Mobile Applicant Card Component
  const ApplicantCard = ({ app }) => (
    <Card className="md:hidden mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{app.full_name}</span>
            </CardTitle>
            <div className="space-y-1 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{app.email}</span>
              </div>
              {app.phone && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span>{app.phone}</span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {deleteLoading === app.application_id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleDownloadCV(app.cv_url)}
                disabled={!app.cv_url}
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => openDeleteConfirm(app)}
                disabled={deleteLoading === app.application_id}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 mr-2" />
          <span>Applied: {new Date(app.submitted_at).toLocaleDateString()}</span>
        </div>
        {app.cv_url && (
          <div className="flex items-center text-sm text-blue-600 mt-2">
            <FileText className="h-3 w-3 mr-2" />
            <span>CV Available</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
        <h1 className="text-xl sm:text-2xl font-bold">Job not found</h1>
        <Button onClick={() => navigate('/admin/applications')} className="mt-4">
          Back to Applications
        </Button>
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
          <Button variant="ghost" onClick={() => navigate('/admin/applications')} className="text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Jobs
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold line-clamp-2">
              Applicants for "<span className="text-blue-600">{job.title}</span>"
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Manage applications for this job posting.
            </p>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden">
          {applications.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                {applications.length} application{applications.length !== 1 ? 's' : ''} found
              </div>
              {applications.map((app) => (
                <ApplicantCard key={app.application_id} app={app} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Applications Yet</h3>
                <p className="text-sm text-muted-foreground text-center">
                  No applications have been submitted for this job yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden md:block">
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
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Applications Yet</h3>
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
              p: 1,
              mx: 2, // Add margin on mobile
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
          
          <DialogActions sx={{ px: 3, pb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
            <MuiButton 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
              disabled={deleteLoading === applicationToDelete?.application_id}
              fullWidth={{ xs: true, sm: false }}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={confirmDelete}
              variant="contained"
              color="error"
              disabled={deleteLoading === applicationToDelete?.application_id}
              fullWidth={{ xs: true, sm: false }}
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