import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const Privacy = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.privacy}</title>
        <meta name="description" content={`Privacy Policy for ${t.companyName} - Learn how we collect, use, and protect your personal information.`} />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.privacy}
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: July 23, 2024
            </p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                This privacy policy explains how {t.companyName} collects, uses, and protects your personal information.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you apply for jobs, request staff, or contact us. This may include personal identification information (name, email, phone), professional information (CV, work experience), and company information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information to provide our staffing services, match job seekers with opportunities, connect employers with candidates, communicate with you, and comply with legal obligations.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
              <p>
                We may share your information with potential employers (with your consent), service providers who assist our business, or when required by law.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate measures to protect your personal information against unauthorized access, alteration, or destruction.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
              <p>
                Under GDPR and Dutch privacy laws, you have the right to access, correct, or delete your personal data. You can also object to processing and request data portability.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4">
                <p>Email: {t.email}</p>
                <p>Phone: {t.phone}</p>
                <p>Address: {t.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;