import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const Terms = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.terms}</title>
        <meta name="description" content={`Terms and Conditions for ${t.companyName} services - Read our terms of service and user agreement.`} />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.terms}
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: July 23, 2024
            </p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using {t.companyName}'s services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Services Description</h2>
              <p>
                {t.companyName} provides temporary staffing, personnel lending, and employment mediation services in the Netherlands.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
              <p>
                Users agree to provide accurate information, maintain account confidentiality, and use our services in compliance with applicable laws.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
              <p>
                {t.companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Governing Law</h2>
              <p>
                These terms shall be interpreted and governed in accordance with the laws of the Netherlands. Any disputes shall be resolved in the competent courts of Amsterdam.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
              <p>
                For questions regarding these terms, please contact us at {t.email}.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Terms;