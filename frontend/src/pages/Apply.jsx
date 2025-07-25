import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { toast } from '@/components/ui/use-toast';
import { useParams, Link, useLocation } from 'react-router-dom';

const Apply = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { jobId } = useParams();
  const location = useLocation();
  
  const preselectedJobId = location.state?.jobId || jobId;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState(preselectedJobId || '');
  const [allJobs, setAllJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`);
        const data = await res.json();
        setAllJobs(data);
      } catch (err) {
        console.error('Error loading jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  // Set selected job and find current job details
  useEffect(() => {
    if (preselectedJobId && allJobs.length > 0) {
      setSelectedJob(preselectedJobId);
      const job = allJobs.find(j => j.job_id.toString() === preselectedJobId.toString());
      setCurrentJob(job);
    }
  }, [preselectedJobId, allJobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Please upload a PDF file only",
        variant: "destructive",
        duration: 3000,
      });
      e.target.value = null;
      return;
    }
    
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large. Maximum size is 2MB.",
        variant: "destructive",
        duration: 3000,
      });
      e.target.value = null;
      return;
    }
    
    setFormData(prev => ({ ...prev, cv: file }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.fullName || !formData.email || !selectedJob || !formData.cv) {
    toast({
      title: "Please fill in all required fields and upload your CV.",
      variant: "destructive",
      duration: 3000,
    });
    return;
  }

  try {
    // Step 1: Check for duplicate before uploading file
    const checkRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/applications/check-duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_id: selectedJob,
        email: formData.email
      })
    });

    const checkData = await checkRes.json();

    if (checkData.alreadyApplied) {
      toast({
        title: "Already Applied",
        description: "You've already submitted an application for this job.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    // Step 2: Proceed with full submission (including CV)
    const submitData = new FormData();
    submitData.append('job_id', selectedJob);
    submitData.append('full_name', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('cover_letter', formData.coverLetter);
    submitData.append('cv', formData.cv);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/applications`, {
      method: 'POST',
      body: submitData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit application');
    }

    setIsSubmitted(true);
    toast({
      title: "Application submitted successfully!",
      description: "We'll review your application and get back to you soon.",
      duration: 5000,
    });

  } catch (error) {
    console.error('Application submission error:', error);
    toast({
      title: "Failed to submit application",
      description: error.message || "Please try again later.",
      variant: "destructive",
      duration: 5000,
    });
  }
};


  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t.companyName} - Application Submitted</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                <p className="text-gray-600 mb-6">{t.applicationSuccess}</p>
                <Link to="/jobs">
                  <Button className="w-full">
                    Back to Job Listings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.applyNow}</title>
        <meta name="description" content={`Apply for job opportunities at ${t.companyName}. Submit your application and CV.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.applyNow}
            </h1>
            {/* {currentJob && (
              <p className="text-lg text-gray-600">
                {t.applyFor}: <span className="font-semibold text-blue-700">{currentJob.title}</span>
              </p>
            )} */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Please fill out the form below to submit your application. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="jobId">{t.selectJob} *</Label>
                    {preselectedJobId && currentJob ? (
                      // If coming from a specific job, show it as disabled/read-only
                      <div className="mt-1">
                        <Input 
                          value={`${currentJob.title} - ${currentJob.location}`}
                          disabled
                          className="bg-gray-50 text-gray-700 text-base"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Job preselected. <Link to="/apply" className="text-blue-600 hover:underline">Change job?</Link>
                        </p>
                      </div>
                    ) : (
                      // If coming from general apply page, show dropdown
                      <Select value={selectedJob} onValueChange={setSelectedJob} required>
                        <SelectTrigger id="jobId" className="w-full mt-1 text-base">
                          <SelectValue placeholder={t.selectJob} />
                        </SelectTrigger>
                        <SelectContent>
                          {allJobs.length > 0 ? (
                            allJobs.map(job => (
                              <SelectItem key={job.job_id} value={job.job_id.toString()}>
                                {job.title} - {job.location}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-jobs" disabled>{t.noJobsAvailable}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">{t.fullName} *</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        type="text" 
                        required 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">{t.phoneNumber}</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="mt-1 text-base" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="cv">{t.uploadCVLabel} *</Label>
                    <div className="mt-1">
                      <Input 
                        id="cv" 
                        name="cv" 
                        type="file" 
                        accept=".pdf" 
                        required 
                        onChange={handleFileChange} 
                        className="text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        PDF files only, maximum 2MB
                      </p>
                      {formData.cv && (
                        <p className="text-sm text-blue-600 mt-2">Selected: {formData.cv.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">{t.coverLetter}</Label>
                    <Textarea 
                      id="coverLetter" 
                      name="coverLetter" 
                      rows={5} 
                      value={formData.coverLetter} 
                      onChange={handleInputChange} 
                      className="mt-1 text-base" 
                      placeholder="Tell us about your experience, availability, or why you're a great fit..." 
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Apply;