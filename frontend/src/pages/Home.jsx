import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Send, Search, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { toast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      title: t.tempStaffing,
      description: t.tempStaffingDesc,
      benefits: [t.tempStaffingBenefit1, t.tempStaffingBenefit2, t.tempStaffingBenefit3],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
      link: '/services/temporary-staffing',
    },
    {
      title: t.personnelLending,
      description: t.personnelLendingDesc,
      benefits: [t.personnelLendingBenefit1, t.personnelLendingBenefit2, t.personnelLendingBenefit3],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop',
      link: '/services/personnel-lending',
    },
    {
      title: t.employmentMediation,
      description: t.employmentMediationDesc,
      benefits: [t.mediationBenefit1, t.mediationBenefit2, t.mediationBenefit3],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      link: '/services/employment-mediation',
    },
  ];

  const steps = [
    { icon: Send, title: t.step1Title, description: t.step1Desc },
    { icon: Search, title: t.step2Title, description: t.step2Desc },
    { icon: UserCheck, title: t.step3Title, description: t.step3Desc },
  ];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A },
    { q: t.faq8Q, a: t.faq8A },
    { q: t.faq9Q, a: t.faq9A },
    { q: t.faq10Q, a: t.faq10A },
  ];

  const handleLearnMore = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.heroHeadline}</title>
        <meta name="description" content={t.heroSubheadline} />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center text-white" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl md:text-5xl font-bold mb-4">
              {t.heroHeadline}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl mb-8 max-w-3xl">
              {t.heroSubheadline}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t.seeOpenJobs}
                </Button>
              </Link>
              <Link to="/request-staff">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
                  {t.requestStaff}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About & Vision Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.aboutUsTitle}</h2>
              <p className="text-gray-600 mb-4">{t.aboutUsText}</p>
              {/* <div className="text-sm text-gray-500">
                <p><strong>Address:</strong> {t.address}</p>
                <p><strong>{t.kvk}</strong></p>
              </div> */}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="bg-blue-800 text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">{t.ourVisionTitle}</h2>
              <p className="text-blue-200">{t.ourVisionText}</p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourServicesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t.ourServicesSubtitle}
              </p>
            </motion.div>

            <div className="space-y-16 lg:space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-4 lg:px-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={service.link} className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto">
                          {t.learnMore}
                        </Button>
                      </Link>
                      <Link to="/request-staff" className="w-full sm:w-auto">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          {t.getStaffNow}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.howItWorksTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.howItWorksSubtitle}</p>
            </motion.div>
            <div className="relative">
              <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="bg-blue-600 text-white rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-6 z-10 relative border-4 border-white shadow-lg">
                      <step.icon className="h-8 w-8 lg:h-10 lg:w-10" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed px-2">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.faqTitle}</h2>
              <p className="text-lg text-gray-600">Find answers to commonly asked questions</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 py-2 bg-gray-50">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;