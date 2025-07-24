import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, Briefcase, Clock, FileText, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState(() => JSON.parse(localStorage.getItem('staffRequests') || '[]'));

  const request = useMemo(() => {
    return requests.find(req => req.id.toString() === requestId);
  }, [requests, requestId]);
  
  const updateRequestStatus = (status) => {
    const updatedRequests = requests.map(req => 
      req.id.toString() === requestId ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('staffRequests', JSON.stringify(updatedRequests));
  };
  
  const handleFulfill = () => {
    updateRequestStatus('Fulfilled');
    toast({ title: "Request Marked as Fulfilled" });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this request? This cannot be undone.')) {
      updateRequestStatus('Deleted');
      toast({ title: "Request Marked as Deleted", variant: "destructive" });
      navigate('/admin/requests');
    }
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

  if (!request) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Request not found</h1>
        <Button onClick={() => navigate('/admin/requests')} className="mt-4">Back to Requests</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Request from {request.companyName}</title>
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
                <CardTitle className="text-2xl">Request from {request.companyName}</CardTitle>
                <CardDescription>Submitted on {new Date(request.submittedAt).toLocaleDateString()}</CardDescription>
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
                  <p><strong>Company:</strong><span className="ml-2">{request.companyName}</span></p>
                  <p><strong>Contact:</strong><span className="ml-2">{request.contactName}</span></p>
                  <p className="flex items-center"><Mail className="mr-3 h-4 w-4 text-muted-foreground"/>{request.email}</p>
                  <p className="flex items-center"><Phone className="mr-3 h-4 w-4 text-muted-foreground"/>{request.phone || 'N/A'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><Briefcase className="mr-2 h-5 w-5"/>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Service Needed:</strong><span className="ml-2">{request.serviceNeeded}</span></p>
                  <p><strong>Role Requested:</strong><span className="ml-2">{request.typeOfWorkers}</span></p>
                  <p className="flex items-center"><Clock className="mr-3 h-4 w-4 text-muted-foreground"/><strong>Duration:</strong><span className="ml-2">{request.duration || 'Not specified'}</span></p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><FileText className="mr-2 h-5 w-5"/>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{request.notes || "No additional notes provided."}</p>
                </CardContent>
            </Card>

            <div className="flex items-center justify-end space-x-4 border-t pt-6">
               <Button variant="default" onClick={handleFulfill} disabled={request.status !== 'Active'}>
                 <CheckCircle className="mr-2 h-4 w-4" />
                 Mark as Fulfilled
               </Button>
               <Button variant="destructive" onClick={handleDelete} disabled={request.status === 'Deleted'}>
                 <Trash2 className="mr-2 h-4 w-4" />
                 Delete Request
               </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminRequestDetails;