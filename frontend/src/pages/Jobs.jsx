import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Search, FileText, UserCheck, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Link } from 'react-router-dom';

const JOBS_PER_PAGE = 12;

const Jobs = () => {
  const { language } = useLanguage();
  const [allJobs, setAllJobs] = useState([]);
  const t = translations[language];

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

  const [filters, setFilters] = useState({
    keyword: '',
    location: 'all',
    types: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setFilters(prev => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      return { ...prev, types: newTypes };
    });
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const keywordMatch = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(filters.keyword.toLowerCase()));
      const locationMatch = filters.location === 'all' || job.location === filters.location;
      const typeMatch = filters.types.length === 0 || filters.types.includes(job.job_type);
      return keywordMatch && locationMatch && typeMatch;
    });
  }, [filters, allJobs]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  const locations = useMemo(() => [...new Set(allJobs.map(job => job.location))], [allJobs]);
  const jobTypes = useMemo(() => [
    { id: 'Full-time', label: t.fullTime },
    { id: 'Part-time', label: t.partTime },
    { id: 'Contract', label: t.contract },
    { id: 'Internship', label: t.internship },
  ], [t]);

  const howItWorksItems = [
    { icon: Search, title: t.jobsHowItWorksStep1Title, desc: t.jobsHowItWorksStep1Desc },
    { icon: FileText, title: t.jobsHowItWorksStep2Title, desc: t.jobsHowItWorksStep2Desc },
    { icon: UserCheck, title: t.jobsHowItWorksStep3Title, desc: t.jobsHowItWorksStep3Desc },
  ];

  const faqItems = [
    { q: t.jobsFaq1Q, a: t.jobsFaq1A },
    { q: t.jobsFaq2Q, a: t.jobsFaq2A },
    { q: t.jobsFaq3Q, a: t.jobsFaq3A },
    { q: t.jobsFaq4Q, a: t.jobsFaq4A },
    { q: t.jobsFaq5Q, a: t.jobsFaq5A },
  ];

  // Helper function to create job slug
  const createJobSlug = (title, jobId) => {
    return `${title.toLowerCase().replace(/\s+/g, '-')}-${jobId}`;
  };

  // Helper function to get job summary from description
  const getJobSummary = (description) => {
    if (!description) return '';
    const sentences = description.split('. ');
    return sentences[0] + (sentences.length > 1 ? '.' : '');
  };

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.jobListingsTitle}</title>
        <meta name="description" content={t.jobListingsSubtitle} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Header Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              {t.jobListingsTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {t.jobListingsSubtitle}
            </motion.p>
          </div>
        </section>

        {/* Modern Filter Section */}
        <section className="py-6 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Location */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="pl-12 h-12 text-base bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger className="h-12 text-base bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500">
                  <SelectValue placeholder={t.location} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allLocations}</SelectItem>
                  {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Job Types Filter */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">{t.jobType}:</span>
                {jobTypes.map(type => (
                  <div key={type.id} className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow">
                    <Checkbox
                      id={type.id}
                      checked={filters.types.includes(type.id)}
                      onCheckedChange={() => handleTypeChange(type.id)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={type.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.job_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
                        <CardHeader>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="pt-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{job.job_type}</span>
                          </CardDescription>
                          <div className="flex items-center text-sm text-gray-500 pt-2">
                            <MapPin className="h-4 w-4 mr-1" /> {job.location}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-gray-600 line-clamp-3">{getJobSummary(job.description)}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Link to={`/jobs/${job.job_id}`}>
                            <Button variant="outline">{t.viewDetails}</Button>
                          </Link>
                          <Link to={`/apply/${job.job_id}`} state={{ jobId: job.job_id }}>
                            <Button>{t.applyNow}</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2">{t.jobListingsNotFound}</h2>
                <p className="text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.jobsHowItWorksTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                  <Card className="text-center h-full border-0 shadow-none">
                    <CardHeader>
                      <div className="mx-auto bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center">
                        <item.icon className="h-8 w-8" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.jobsFaqTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-blue-800">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.jobsCtaTitle}</h2>
            <p className="mt-4 text-lg text-blue-200">{t.jobsCtaText}</p>
            <Link to="/apply" className="mt-8 inline-block">
              <Button size="lg" variant="secondary">{t.applyNow}</Button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default Jobs;