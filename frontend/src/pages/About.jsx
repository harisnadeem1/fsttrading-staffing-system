import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp, CheckCircle, Clock, Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Link } from 'react-router-dom';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const values = [
    {
      icon: Award,
      title: t.excellenceTitle,
      description: t.excellenceDesc,
    },
    {
      icon: Users,
      title: t.partnershipTitle,
      description: t.partnershipDesc,
    },
    {
      icon: Shield,
      title: t.integrityTitle,
      description: t.integrityDesc,
    },
    {
      icon: Heart,
      title: t.careTitle,
      description: t.careDesc,
    }
  ];

  const services = [
    {
      title: t.tempStaffing,
      description: t.aboutTempStaffingDesc,
      features: [t.fastDeployment, t.flexibleContracts, t.qualityAssured]
    },
    {
      title: t.personnelLending,
      description: t.aboutPersonnelLendingDesc,
      features: [t.legalEmployer, t.hrManagement, t.costEffective]
    },
    {
      title: t.employmentMediation,
      description: t.aboutEmploymentMediationDesc,
      features: [t.expertMatching, t.freeForCandidates, t.longTermSuccess]
    }
  ];

  const whyChooseUs = [
    { title: t.whyChoose1Title, desc: t.whyChoose1Desc },
    { title: t.whyChoose2Title, desc: t.whyChoose2Desc },
    { title: t.whyChoose3Title, desc: t.whyChoose3Desc },
    { title: t.whyChoose4Title, desc: t.whyChoose4Desc }
  ];

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.aboutPageTitle}</title>
        <meta name="description" content={t.aboutPageDesc} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t.aboutPageTitle}
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 leading-relaxed">
                {t.aboutHeroText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                    alt={t.aboutImageAlt} 
                    className="rounded-xl shadow-2xl w-full h-96 object-cover" 
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-xl"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.ourStoryTitle}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.ourStoryText1}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t.ourStoryText2}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="w-full sm:w-auto">
                      {t.getInTouch}
                    </Button>
                  </Link>
                  <Link to="/services/temporary-staffing">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      {t.exploreServices}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-10 rounded-xl shadow-lg"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.ourMissionTitle}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t.ourMissionText}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-blue-600 p-8 lg:p-10 rounded-xl shadow-lg text-white"
              >
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.ourVisionTitle}</h3>
                <p className="text-blue-100 text-lg leading-relaxed">{t.ourVisionText}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourValuesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t.ourValuesSubtitle}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-blue-200">
                    <CardHeader className="pb-4">
                      <div className="bg-blue-100 group-hover:bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                        <value.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services Overview */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourServicesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.ourServicesSubtitle}</p>
            </motion.div>
            
            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center lg:text-right">
                      <Link to={`/services/${service.title.toLowerCase().replace(' ', '-')}`}>
                        <Button size="lg" variant="outline" className="w-full lg:w-auto">
                          {t.learnMore}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.whyChooseUsTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.whyChooseUsSubtitle}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-24 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ourImpactTitle}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {t.ourImpactSubtitle}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: t.stat1Number, label: t.stat1Label },
                { number: t.stat2Number, label: t.stat2Label },
                { number: t.stat3Number, label: t.stat3Label },
                { number: t.stat4Number, label: t.stat4Label },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100 text-sm lg:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.readyToGetStartedTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                {t.readyToGetStartedText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/request-staff">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t.requestStaff}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {t.contactUs}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;