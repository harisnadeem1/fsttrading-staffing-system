import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const AdminJobForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(jobId);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    postedDate: new Date().toISOString().split('T')[0],
    deadline: '',
  });

  // Helper function to format date for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format
  };

  useEffect(() => {
    if (isEditing) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || '',
            location: data.location || '',
            type: data.job_type || '',
            description: data.description || '',
            responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities.join('\n') : '',
            qualifications: Array.isArray(data.qualifications) ? data.qualifications.join('\n') : '',
            postedDate: formatDateForInput(data.posting_date),
            deadline: formatDateForInput(data.application_deadline),
          });
        })
        .catch((err) => {
          toast({
            title: 'Failed to load job',
            description: err.message || 'Something went wrong.',
            variant: 'destructive',
          });
        });
    }
  }, [jobId, isEditing, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      location: formData.location,
      job_type: formData.type,
      description: formData.description,
      responsibilities: formData.responsibilities.split('\n').filter((line) => line.trim() !== ''),
      qualifications: formData.qualifications.split('\n').filter((line) => line.trim() !== ''),
      posting_date: formData.postedDate,
      application_deadline: formData.deadline,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/jobs${isEditing ? `/${jobId}` : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Server error');

      toast({
        title: `Job ${isEditing ? 'Updated' : 'Created'} Successfully`,
        description: `The job "${formData.title}" has been saved.`,
      });

      navigate('/admin/jobs');
    } catch (err) {
      toast({
        title: `Failed to ${isEditing ? 'update' : 'create'} job`,
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Job' : 'Create Job'} - Admin</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Button variant="ghost" asChild>
            <Link to="/admin/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs List
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}</CardTitle>
            <CardDescription>Fill in the details for the job opening.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsibilities">Key Responsibilities (one per line)</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={5}
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="qualifications">Requirements / Qualifications (one per line)</Label>
                <Textarea
                  id="qualifications"
                  name="qualifications"
                  rows={5}
                  value={formData.qualifications}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="postedDate">Posting Date</Label>
                  <Input
                    id="postedDate"
                    name="postedDate"
                    type="date"
                    value={formData.postedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">{isEditing ? 'Save Changes' : 'Create Job'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminJobForm;