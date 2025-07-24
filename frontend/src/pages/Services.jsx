import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ArrowRight, User, Users, Briefcase, FileText, Search, UserCheck, MessageSquare, HeartHandshake as Handshake, Zap, FileSignature, ShieldCheck, TrendingUp, UserPlus, FileHeart, MessageCircle, CheckSquare, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Link, useParams } from 'react-router-dom';

const ServicePage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { serviceId } = useParams();

  const servicesData = {
    'temporary-staffing': {
      pageTitle: t.tempStaffingPageTitle,
      pageSubtitle: t.tempStaffingPageSubtitle,
      image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop',
      whatIsTitle: t.whatIsTempStaffing,
      whatIsDesc: t.whatIsTempStaffingDesc,
      benefitsTitle: t.keyBenefits,
      benefits: [t.tempStaffingBenefit1, t.tempStaffingBenefit2, t.tempStaffingBenefit3, t.tempStaffingBenefit4, t.tempStaffingBenefit5, t.tempStaffingBenefit6],
      howItWorksTitle: t.howItWorks,
      howItWorksSteps: [
        { icon: FileText, title: t.tempStaffingStep1Title, desc: t.tempStaffingStep1Desc },
        { icon: Search, title: t.tempStaffingStep2Title, desc: t.tempStaffingStep2Desc },
        { icon: UserCheck, title: t.tempStaffingStep3Title, desc: t.tempStaffingStep3Desc },
        { icon: Briefcase, title: t.tempStaffingStep4Title, desc: t.tempStaffingStep4Desc },
        { icon: ShieldCheck, title: t.tempStaffingStep5Title, desc: t.tempStaffingStep5Desc },
      ],
      ctaText: t.tempStaffingCTA,
      ctaButtonText: t.requestStaffNow,
      ctaLink: '/request-staff',
      faqs: [
        { q: t.tempStaffingFAQ1Q, a: t.tempStaffingFAQ1A },
        { q: t.tempStaffingFAQ2Q, a: t.tempStaffingFAQ2A },
        { q: t.tempStaffingFAQ3Q, a: t.tempStaffingFAQ3A },
      ]
    },
    'personnel-lending': {
      pageTitle: t.personnelLendingPageTitle,
      pageSubtitle: t.personnelLendingPageSubtitle,
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop',
      whatIsTitle: t.whatIsPersonnelLending,
      whatIsDesc: t.whatIsPersonnelLendingDesc,
      benefitsTitle: t.whatsIncluded,
      benefits: [t.personnelLendingBenefit1, t.personnelLendingBenefit2, t.personnelLendingBenefit3, t.personnelLendingBenefit4, t.personnelLendingBenefit5, t.personnelLendingBenefit6],
      howItWorksTitle: t.howItWorks,
      howItWorksSteps: [
        { icon: FileSignature, title: t.personnelLendingStep1Title, desc: t.personnelLendingStep1Desc },
        { icon: UserPlus, title: t.personnelLendingStep2Title, desc: t.personnelLendingStep2Desc },
        { icon: Briefcase, title: t.personnelLendingStep3Title, desc: t.personnelLendingStep3Desc },
        { icon: ShieldCheck, title: t.personnelLendingStep4Title, desc: t.personnelLendingStep4Desc },
        { icon: TrendingUp, title: t.personnelLendingStep5Title, desc: t.personnelLendingStep5Desc },
      ],
      ctaText: t.personnelLendingCTA,
      ctaButtonText: t.requestLendingNow,
      ctaLink: '/request-staff',
      faqs: [
        { q: t.personnelLendingFAQ1Q, a: t.personnelLendingFAQ1A },
        { q: t.personnelLendingFAQ2Q, a: t.personnelLendingFAQ2A },
        { q: t.personnelLendingFAQ3Q, a: t.personnelLendingFAQ3A },
      ],
    },
    'employment-mediation': {
      pageTitle: t.employmentMediationPageTitle,
      pageSubtitle: t.employmentMediationPageSubtitle,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
      whatIsTitle: t.whatIsEmploymentMediation,
      whatIsDesc: t.whatIsEmploymentMediationDesc,
      benefitsTitle: t.mediationBenefitsTitle,
      benefits: [t.mediationBenefit1, t.mediationBenefit2, t.mediationBenefit3, t.mediationBenefit4, t.mediationBenefit5, t.mediationBenefit6],
      howItWorksTitle: t.processOverview,
      howItWorksSteps: [
        { icon: FileHeart, title: t.mediationStep1Title, desc: t.mediationStep1Desc },
        { icon: BarChart2, title: t.mediationStep2Title, desc: t.mediationStep2Desc },
        { icon: MessageCircle, title: t.mediationStep3Title, desc: t.mediationStep3Desc },
        { icon: CheckSquare, title: t.mediationStep4Title, desc: t.mediationStep4Desc },
        { icon: Handshake, title: t.mediationStep5Title, desc: t.mediationStep5Desc },
      ],
      ctaText: t.mediationCTA,
      faqs: [
        { q: t.mediationFAQ1Q, a: t.mediationFAQ1A },
        { q: t.mediationFAQ2Q, a: t.mediationFAQ2A },
        { q: t.mediationFAQ3Q, a: t.mediationFAQ3A },
      ],
    },
  };

  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl text-center font-bold">Service not found. Please select a valid service.</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {service.pageTitle}</title>
        <meta name="description" content={service.pageSubtitle} />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-blue-800 text-white py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.pageTitle}</h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">{service.pageSubtitle}</p>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
                <img src={service.image} alt={service.pageTitle} className="rounded-lg shadow-xl object-cover w-full h-80 md:h-96" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.whatIsTitle}</h2>
                <p className="text-gray-600 leading-relaxed">{service.whatIsDesc}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{service.benefitsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-start">
                  <div className="flex-shrink-0"><Check className="h-6 w-6 text-blue-600 mr-4 mt-1" /></div>
                  <p className="text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{service.howItWorksTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {service.howItWorksSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center">
                        <step.icon className="h-8 w-8" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-800">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{service.ctaText}</h2>
            {serviceId === 'employment-mediation' ? (
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link to="/request-staff"><Button size="lg" variant="secondary">{t.hireNow}</Button></Link>
                <Link to="/jobs"><Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-800">{t.applyNow}</Button></Link>
              </div>
            ) : (
              <Link to={service.ctaLink} className="mt-8 inline-block"><Button size="lg" variant="secondary">{service.ctaButtonText} <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.faqTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePage;