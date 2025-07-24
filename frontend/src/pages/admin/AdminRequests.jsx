import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminRequests = () => {
  const { toast } = useToast();
  const [requests] = useState(() => {
    const storedRequests = JSON.parse(localStorage.getItem('staffRequests') || '[]');
    return storedRequests.map(req => ({ ...req, status: req.status || 'Active' }));
  });

  const handleDownloadCSV = () => {
    if (requests.length === 0) {
      toast({ title: "No data to export.", variant: "destructive" });
      return;
    }

    const headers = ["ID", "Company Name", "Contact Name", "Email", "Phone", "Service Needed", "Workers Needed", "Duration", "Status", "Notes", "Submitted At"];
    const csvContent = [
      headers.join(','),
      ...requests.map(req => [
        `"${req.id}"`,
        `"${req.companyName}"`,
        `"${req.contactName}"`,
        `"${req.email}"`,
        `"${req.phone}"`,
        `"${req.serviceNeeded}"`,
        `"${req.typeOfWorkers}"`,
        `"${req.duration}"`,
        `"${req.status}"`,
        `"${req.notes.replace(/"/g, '""')}"`,
        `"${new Date(req.submittedAt).toISOString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employer_requests.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    toast({ title: "CSV download started." });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'default'; // Greenish in default theme
      case 'Deleted':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - Employer Requests</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Employer Requests</h1>
            <p className="text-muted-foreground">Review all staff requests submitted by employers.</p>
          </div>
          <Button onClick={handleDownloadCSV}>
            <Download className="h-4 w-4 mr-2" />
            Download as CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
            <CardDescription>
              {requests.length} request(s) found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.companyName}</TableCell>
                        <TableCell>{req.serviceNeeded}</TableCell>
                        <TableCell>{new Date(req.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(req.status)}>{req.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Button asChild variant="outline" size="sm">
                             <Link to={`/admin/requests/${req.id}`}>
                               <Eye className="mr-2 h-4 w-4" />
                               View
                             </Link>
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No employer requests have been submitted yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminRequests;