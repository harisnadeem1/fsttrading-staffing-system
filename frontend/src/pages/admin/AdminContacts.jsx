import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, Mail, Calendar, User, Loader2, MoreVertical, MessageSquare } from 'lucide-react';
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

const AdminContacts = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`);
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        toast({
          title: 'Error loading contact messages',
          description: err.message || 'Something went wrong',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    setDeleteLoading(id);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete message');

      toast({
        title: 'Contact Message Deleted',
        description: 'The message has been successfully removed.',
      });

      // Remove from state
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      toast({
        title: 'Delete Failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(null);
      setDeleteConfirmOpen(false);
      setContactToDelete(null);
    }
  };

  const openDeleteConfirm = (contact) => {
    setContactToDelete(contact);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      handleDelete(contactToDelete.id);
    }
  };

  // Mobile Contact Card Component
  const ContactCard = ({ contact }) => (
    <Card className="md:hidden mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{contact.name}</span>
            </CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
              <span className="truncate">{contact.email}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {deleteLoading === contact.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/admin/contacts/${contact.id}`} className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Message
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => openDeleteConfirm(contact)}
                disabled={deleteLoading === contact.id}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MessageSquare className="h-3 w-3 mr-2" />
            <span className="truncate font-medium">{contact.subject}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-2" />
            <span>Received: {new Date(contact.submitted_at || contact.created_at).toLocaleDateString()}</span>
          </div>
          {contact.message && (
            <div className="text-sm text-muted-foreground mt-2">
              <p className="line-clamp-2 leading-relaxed">
                {contact.message.length > 100 
                  ? `${contact.message.substring(0, 100)}...` 
                  : contact.message
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Admin - Contact Messages</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading contact messages...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Contact Messages</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            View and manage messages submitted through the contact form.
          </p>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden">
          {contacts.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                {contacts.length} message{contacts.length !== 1 ? 's' : ''} received
              </div>
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Contact Messages</h3>
                <p className="text-sm text-muted-foreground text-center">
                  No messages have been submitted through the contact form yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>All Contact Messages</CardTitle>
            <CardDescription>
              {contacts.length} message{contacts.length !== 1 ? 's' : ''} received from website visitors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {contacts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date Received</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={contact.subject}>
                            {contact.subject}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(contact.submitted_at || contact.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/contacts/${contact.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteConfirm(contact)}
                            disabled={deleteLoading === contact.id}
                          >
                            {deleteLoading === contact.id ? (
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
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Contact Messages</h3>
                <p className="text-sm text-muted-foreground">No messages have been submitted through the contact form yet.</p>
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
                Delete Contact Message
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            {contactToDelete && (
              <>
                <DialogContentText sx={{ mb: 2 }}>
                  Are you sure you want to delete the message from{' '}
                  <Typography component="span" fontWeight="bold">
                    {contactToDelete.name}
                  </Typography>
                  {' '}with subject "{contactToDelete.subject}"?
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
                        primary="• Contact information and details" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary="• Message content and subject" 
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
              disabled={deleteLoading === contactToDelete?.id}
              fullWidth={{ xs: true, sm: false }}
            >
              Cancel
            </MuiButton>
            <MuiButton
              onClick={confirmDelete}
              variant="contained"
              color="error"
              disabled={deleteLoading === contactToDelete?.id}
              fullWidth={{ xs: true, sm: false }}
              startIcon={
                deleteLoading === contactToDelete?.id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {deleteLoading === contactToDelete?.id ? 'Deleting...' : 'Delete Message'}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default AdminContacts;