import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, Briefcase, Clock, FileText, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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

const AdminRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Fetch request from backend
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}`);
        if (!res.ok) throw new Error(`Failed to fetch request`);
        const data = await res.json();
        setRequest(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load request.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [requestId]);

  const updateStatus = async (status) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setRequest({ ...request, status });
      toast({ title: `Request marked as ${status}` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Error updating status', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast({ title: "Request Deleted", variant: "destructive" });
      navigate('/admin/requests');
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setSubmitting(false);
      setDeleteConfirmOpen(false);
    }
  };

  const openDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'default';
      case 'Deleted':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-3">Loading request...</span>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">{error || "Request not found"}</h1>
        <Button onClick={() => navigate('/admin/requests')} className="mt-4">Back to Requests</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Request from {request.company_name}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Button variant="ghost" asChild>
            <Link to="/admin/requests">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Requests List
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Request from {request.company_name}</CardTitle>
                <CardDescription>Submitted on {new Date(request.submitted_at).toLocaleDateString()}</CardDescription>
              </div>
              <Badge variant={getStatusVariant(request.status)} className="text-base px-4 py-1">{request.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg"><User className="mr-2 h-5 w-5"/>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Company:</strong><span className="ml-2">{request.company_name}</span></p>
                  <p><strong>Contact:</strong><span className="ml-2">{request.contact_name}</span></p>
                  <p className="flex items-center"><Mail className="mr-3 h-4 w-4 text-muted-foreground"/>{request.email}</p>
                  <p className="flex items-center"><Phone className="mr-3 h-4 w-4 text-muted-foreground"/>{request.phone || 'N/A'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><Briefcase className="mr-2 h-5 w-5"/>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Service Needed:</strong><span className="ml-2">{request.service_needed}</span></p>
                  <p><strong>Role Requested:</strong><span className="ml-2">{request.worker_type}</span></p>
                  <p className="flex items-center"><Clock className="mr-3 h-4 w-4 text-muted-foreground"/><strong>Duration:</strong><span className="ml-2">{request.duration || 'Not specified'}</span></p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center text-lg"><FileText className="mr-2 h-5 w-5"/>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{request.additional_notes || "No additional notes provided."}</p>
              </CardContent>
            </Card>

            <div className="flex items-center justify-end space-x-4 border-t pt-6">
              {/* <Button variant="default" onClick={() => updateStatus('Fulfilled')} disabled={request.status !== 'Active' || submitting}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Fulfilled
              </Button> */}
              <Button 
                variant="destructive" 
                onClick={openDeleteConfirm} 
                disabled={request.status === 'Deleted' || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Request
                  </>
                )}
              </Button>
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
              p: 1
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
              <WarningIcon color="error" />
              <Typography variant="h6" component="span">
                Delete Service Request
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Are you sure you want to delete the service request from{' '}
              <Typography component="span" fontWeight="bold">
                {request.company_name}
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
                    primary="• The entire service request record" 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText 
                    primary="• Contact information and details" 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText 
                    primary="• Any notes and requirements" 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Alert>

            <Typography variant="body2" color="error" fontWeight="bold">
              This action cannot be undone.
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <MuiButton 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
              disabled={submitting}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={submitting}
              startIcon={
                submitting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {submitting ? 'Deleting...' : 'Delete Request'}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default AdminRequestDetails;