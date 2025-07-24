import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Calendar, FileText, Trash2, Loader2 } from 'lucide-react';
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

const AdminContactDetails = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        console.log(contactId);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/${contactId}`);
        if (!res.ok) throw new Error('Failed to fetch contact message');
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError('Unable to load contact message.');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactId]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/${contactId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete message');

      toast({
        title: 'Contact Message Deleted',
        description: 'The message has been successfully removed.',
        variant: 'destructive',
      });

      navigate('/admin/contacts');
    } catch (err) {
      console.error('Delete error:', err);
      toast({
        title: 'Delete Failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const openDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-3">Loading contact message...</span>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">{error || "Contact message not found"}</h1>
        <Button onClick={() => navigate('/admin/contacts')} className="mt-4">
          Back to Contact Messages
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Message from {contact.name}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Button variant="ghost" asChild>
            <Link to="/admin/contacts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contact Messages
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Message from {contact.name}</CardTitle>
                <CardDescription>
                  Received on {new Date(contact.submitted_at || contact.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="mr-2 h-5 w-5"/>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-sm font-medium">{contact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date Submitted</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">
                        {new Date(contact.submitted_at || contact.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5"/>
                    Message Subject
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium bg-gray-50 p-3 rounded-lg">
                    {contact.subject}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5"/>
                  Message Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Reply via Email
                  </a>
                </Button>
              </div>
              
              <Button 
                variant="destructive" 
                onClick={openDeleteConfirm}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Message
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
                Delete Contact Message
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Are you sure you want to delete the message from{' '}
              <Typography component="span" fontWeight="bold">
                {contact.name}
              </Typography>
              {' '}with subject "{contact.subject}"?
            </DialogContentText>
            
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                This action will permanently remove:
              </Typography>
              <List dense sx={{ mt: 1 }}>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText 
                    primary="• The entire contact message" 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText 
                    primary="• Contact information and email" 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText 
                    primary="• Message content and subject line" 
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
              disabled={deleteLoading}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={deleteLoading}
              startIcon={
                deleteLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {deleteLoading ? 'Deleting...' : 'Delete Message'}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default AdminContactDetails;