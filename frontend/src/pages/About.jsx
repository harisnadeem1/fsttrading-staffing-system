
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const values = [
    {
      icon: Award,
      title: t.value1,
      description: t.value1Desc,
    },
    {
      icon: Users,
      title: t.value2,
      description: t.value2Desc,
    },
    {
      icon: TrendingUp,
      title: t.value3,
      description: t.value3Desc,
    },
  ];

  return (
    <>
      <Helmet>
        <title>FST Trading - {t.aboutPageTitle}</title>
        <meta name="description" content={t.aboutText} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.aboutPageTitle}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
                {t.aboutText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img  alt="FST Trading office building" className="rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1631498539536-54cd61318e4d" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.missionTitle}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t.missionText}
                </p>
                <p className="text-gray-600">
                  Founded with the vision of creating meaningful connections between talent and opportunity, FST Trading has grown to become one of the Netherlands' most trusted staffing partners. We understand that behind every successful business are the right people, and behind every career milestone is the right opportunity.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.valuesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our core values guide everything we do and shape the way we serve our clients and candidates.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600">
                Numbers that reflect our commitment to excellence
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Successful Placements' },
                { number: '150+', label: 'Partner Companies' },
                { number: '5+', label: 'Years of Experience' },
                { number: '98%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals who make FST Trading a success
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Emma van der Berg', role: 'Managing Director', image: 'Professional woman in business attire smiling confidently' },
                { name: 'Thomas Janssen', role: 'Head of Operations', image: 'Professional man in suit with friendly demeanor' },
                { name: 'Lisa de Vries', role: 'Senior Recruiter', image: 'Professional woman with warm smile in office setting' },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <img  alt={`${member.name} - ${member.role}`} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
