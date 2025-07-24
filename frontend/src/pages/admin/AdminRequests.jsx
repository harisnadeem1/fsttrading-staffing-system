import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load employer requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleDownloadCSV = () => {
    if (requests.length === 0) {
      toast({ title: "No data to export.", variant: "destructive" });
      return;
    }

    const headers = ["ID", "Company Name", "Contact Name", "Email", "Phone", "Service Needed", "Workers Needed", "Duration", "Notes", "Submitted At"];
    const csvContent = [
      headers.join(','),
      ...requests.map(req => [
        `"${req.request_id}"`,
        `"${req.company_name}"`,
        `"${req.contact_name}"`,
        `"${req.email}"`,
        `"${req.phone}"`,
        `"${req.service_needed}"`,
        `"${req.worker_type}"`,
        `"${req.duration}"`,
        `"${req.additional_notes?.replace(/"/g, '""') || ''}"`,
        `"${new Date(req.submitted_at).toISOString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "employer_requests.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "CSV download started." });
  };

  const getStatusVariant = () => 'secondary'; // Placeholder, can add real logic later

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-3">Loading requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

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
                      <TableRow key={req.request_id}>
                        <TableCell className="font-medium">{req.company_name}</TableCell>
                        <TableCell>{req.service_needed}</TableCell>
                        <TableCell>{new Date(req.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant('Active')}>Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/admin/requests/${req.request_id}`}>
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
