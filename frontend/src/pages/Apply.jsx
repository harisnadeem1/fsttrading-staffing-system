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
import { jobsData } from '@/data/jobs';
import { toast } from '@/components/ui/use-toast';
import { useParams, Link, useLocation } from 'react-router-dom';

const Apply = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { jobId } = useParams();
  const location = useLocation();
  const allJobs = jobsData[language];
  
  const preselectedJobId = location.state?.jobId || jobId;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState(preselectedJobId || '');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
  });

  useEffect(() => {
    setSelectedJob(preselectedJobId || '');
  }, [preselectedJobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, cv: file }));
    } else {
      toast({
        title: "Please upload a PDF file only",
        variant: "destructive",
        duration: 3000,
      });
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !selectedJob || !formData.cv) {
      toast({
        title: "Please fill in all required fields and upload your CV.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApplication = {
      id: Date.now(),
      jobId: selectedJob,
      jobTitle: allJobs.find(j => j.id.toString() === selectedJob)?.title,
      ...formData,
      cvName: formData.cv?.name || null,
      submittedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));

    setIsSubmitted(true);
    toast({
      title: t.applicationSuccess,
      duration: 5000,
    });
  };

  const currentJobTitle = allJobs.find(j => j.id.toString() === selectedJob)?.title;

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
            {currentJobTitle && <p className="text-lg text-gray-600">{t.applyFor}: <span className="font-semibold text-blue-700">{currentJobTitle}</span></p>}
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
                    <Select value={selectedJob} onValueChange={setSelectedJob} required>
                      <SelectTrigger id="jobId" className="w-full mt-1">
                        <SelectValue placeholder={t.selectJob} />
                      </SelectTrigger>
                      <SelectContent>
                        {allJobs.length > 0 ? (
                          allJobs.map(job => (
                            <SelectItem key={job.id} value={job.id.toString()}>{job.title} - {job.location}</SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-jobs" disabled>{t.noJobsAvailable}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">{t.fullName} *</Label>
                      <Input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.email} *</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="mt-1" />
                    </div>
                  </div>

                  <div>
                      <Label htmlFor="phone">{t.phoneNumber}</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="cv">{t.uploadCVLabel} *</Label>
                    <div className="mt-1">
                      <Input id="cv" name="cv" type="file" accept=".pdf" required onChange={handleFileChange} />
                      {formData.cv && (<p className="text-sm text-blue-600 mt-2">Selected: {formData.cv.name}</p>)}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">{t.coverLetter}</Label>
                    <Textarea id="coverLetter" name="coverLetter" rows={5} value={formData.coverLetter} onChange={handleInputChange} className="mt-1" placeholder="Tell us about your experience, availability, or why you're a great fit..." />
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