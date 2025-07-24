import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, CheckSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { jobsData } from '@/data/jobs';

const JobDetails = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { jobSlug } = useParams();
  const navigate = useNavigate();

  const job = jobsData[language].find(j => j.slug === jobSlug);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')}>Back to Job Listings</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>{job.title} - {t.companyName}</title>
        <meta name="description" content={job.summary} />
      </Helmet>

      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-8">
              <Button variant="ghost" onClick={() => navigate('/jobs')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all jobs
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">{job.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-base">
                  <span className="flex items-center"><Briefcase className="h-5 w-5 mr-2 text-blue-600" /> {job.type}</span>
                  <span className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-blue-600" /> {job.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.jobDetails}</h2>
                  <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.responsibilities}</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckSquare className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.qualifications}</h3>
                  <ul className="space-y-2">
                    {job.qualifications.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckSquare className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-6 space-y-4 md:flex md:items-center md:justify-between">
                   <div className="text-sm text-gray-500 space-y-2">
                      <p><span className="font-semibold">{t.postedOn}:</span> {formatDate(job.postedDate)}</p>
                      <p><span className="font-semibold">{t.applicationDeadline}:</span> {formatDate(job.deadline)}</p>
                   </div>
                   <Link to={`/apply/${job.id}`} state={{ jobId: job.id }}>
                    <Button size="lg" className="w-full md:w-auto">{t.applyNow}</Button>
                   </Link>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;