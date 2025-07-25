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
        <title>{t.companyName} - {t.privacyPolicyTitle}</title>
        <meta name="description" content={t.privacyPolicyDesc} />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.privacyPolicyTitle}
            </h1>
            <p className="text-gray-600 mb-8">
              {t.lastUpdated}: {t.lastUpdatedDate}
            </p>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="font-medium text-blue-900 mb-2">{t.privacyIntroTitle}</p>
                <p className="text-blue-800">{t.privacyIntroText}</p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. {t.infoWeCollectTitle}</h2>
                <p className="mb-4">{t.infoWeCollectIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.personalInfoTitle}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>{t.personalInfo1}</li>
                  <li>{t.personalInfo2}</li>
                  <li>{t.personalInfo3}</li>
                  <li>{t.personalInfo4}</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.professionalInfoTitle}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>{t.professionalInfo1}</li>
                  <li>{t.professionalInfo2}</li>
                  <li>{t.professionalInfo3}</li>
                  <li>{t.professionalInfo4}</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.technicalInfoTitle}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>{t.technicalInfo1}</li>
                  <li>{t.technicalInfo2}</li>
                  <li>{t.technicalInfo3}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. {t.howWeUseTitle}</h2>
                <p className="mb-4">{t.howWeUseIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.useInfo1}</li>
                  <li>{t.useInfo2}</li>
                  <li>{t.useInfo3}</li>
                  <li>{t.useInfo4}</li>
                  <li>{t.useInfo5}</li>
                  <li>{t.useInfo6}</li>
                  <li>{t.useInfo7}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. {t.legalBasisTitle}</h2>
                <p className="mb-4">{t.legalBasisIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t.consent}:</strong> {t.consentDesc}</li>
                  <li><strong>{t.contract}:</strong> {t.contractDesc}</li>
                  <li><strong>{t.legalObligation}:</strong> {t.legalObligationDesc}</li>
                  <li><strong>{t.legitimateInterest}:</strong> {t.legitimateInterestDesc}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. {t.infoSharingTitle}</h2>
                <p className="mb-4">{t.infoSharingIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.shareWithEmployersTitle}</h3>
                <p className="mb-4">{t.shareWithEmployersDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.serviceProvidersTitle}</h3>
                <p className="mb-4">{t.serviceProvidersDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.legalRequirementsTitle}</h3>
                <p className="mb-4">{t.legalRequirementsDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. {t.dataSecurityTitle}</h2>
                <p className="mb-4">{t.dataSecurityIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.security1}</li>
                  <li>{t.security2}</li>
                  <li>{t.security3}</li>
                  <li>{t.security4}</li>
                  <li>{t.security5}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. {t.dataRetentionTitle}</h2>
                <p className="mb-4">{t.dataRetentionIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.retention1}</li>
                  <li>{t.retention2}</li>
                  <li>{t.retention3}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. {t.yourRightsTitle}</h2>
                <p className="mb-4">{t.yourRightsIntro}</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>{t.rightAccess}:</strong> {t.rightAccessDesc}</li>
                  <li><strong>{t.rightRectification}:</strong> {t.rightRectificationDesc}</li>
                  <li><strong>{t.rightErasure}:</strong> {t.rightErasureDesc}</li>
                  <li><strong>{t.rightRestriction}:</strong> {t.rightRestrictionDesc}</li>
                  <li><strong>{t.rightPortability}:</strong> {t.rightPortabilityDesc}</li>
                  <li><strong>{t.rightObject}:</strong> {t.rightObjectDesc}</li>
                  <li><strong>{t.rightComplain}:</strong> {t.rightComplainDesc}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. {t.cookiesTitle}</h2>
                <p className="mb-4">{t.cookiesIntro}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.cookieTypesTitle}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t.essentialCookies}:</strong> {t.essentialCookiesDesc}</li>
                  <li><strong>{t.analyticalCookies}:</strong> {t.analyticalCookiesDesc}</li>
                  <li><strong>{t.functionalCookies}:</strong> {t.functionalCookiesDesc}</li>
                </ul>
                <p className="mt-4">{t.cookieManagement}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. {t.internationalTransferTitle}</h2>
                <p>{t.internationalTransferDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. {t.changesTitle}</h2>
                <p>{t.changesDesc}</p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. {t.contactTitle}</h2>
                <p className="mb-4">{t.contactIntro}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>{t.dataProtectionOfficer}</strong></p>
                    <p>{t.email}</p>
                    <p>{t.phone}</p>
                  </div>
                  <div>
                    <p><strong>{t.postalAddress}</strong></p>
                    <p>{t.address}</p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;