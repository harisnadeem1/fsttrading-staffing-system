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
        <title>{t.companyName} - {t.termsConditionsTitle}</title>
        <meta name="description" content={t.termsConditionsDesc} />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.termsConditionsTitle}
            </h1>
            <p className="text-gray-600 mb-8">
              {t.lastUpdated}: {t.lastUpdatedDate}
            </p>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-600">
                <p className="font-medium text-amber-900 mb-2">{t.termsIntroTitle}</p>
                <p className="text-amber-800">{t.termsIntroText}</p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. {t.acceptanceTitle}</h2>
                <p className="mb-4">{t.acceptanceText1}</p>
                <p>{t.acceptanceText2}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. {t.servicesDescTitle}</h2>
                <p className="mb-4">{t.servicesDescIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.tempStaffingService}</h3>
                <p className="mb-4">{t.tempStaffingServiceDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.personnelLendingService}</h3>
                <p className="mb-4">{t.personnelLendingServiceDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.employmentMediationService}</h3>
                <p className="mb-4">{t.employmentMediationServiceDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. {t.userResponsibilitiesTitle}</h2>
                <p className="mb-4">{t.userResponsibilitiesIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.jobSeekersTitle}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>{t.jobSeekerResp1}</li>
                  <li>{t.jobSeekerResp2}</li>
                  <li>{t.jobSeekerResp3}</li>
                  <li>{t.jobSeekerResp4}</li>
                  <li>{t.jobSeekerResp5}</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.employersTitle}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.employerResp1}</li>
                  <li>{t.employerResp2}</li>
                  <li>{t.employerResp3}</li>
                  <li>{t.employerResp4}</li>
                  <li>{t.employerResp5}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. {t.paymentTermsTitle}</h2>
                <p className="mb-4">{t.paymentTermsIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.payment1}</li>
                  <li>{t.payment2}</li>
                  <li>{t.payment3}</li>
                  <li>{t.payment4}</li>
                  <li>{t.payment5}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. {t.cancellationTitle}</h2>
                <p className="mb-4">{t.cancellationIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.tempStaffingCancellation}</h3>
                <p className="mb-4">{t.tempStaffingCancellationDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.personnelLendingCancellation}</h3>
                <p className="mb-4">{t.personnelLendingCancellationDesc}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.mediationCancellation}</h3>
                <p>{t.mediationCancellationDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. {t.intellectualPropertyTitle}</h2>
                <p className="mb-4">{t.intellectualPropertyIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.ip1}</li>
                  <li>{t.ip2}</li>
                  <li>{t.ip3}</li>
                  <li>{t.ip4}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. {t.confidentialityTitle}</h2>
                <p className="mb-4">{t.confidentialityIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.confidentiality1}</li>
                  <li>{t.confidentiality2}</li>
                  <li>{t.confidentiality3}</li>
                  <li>{t.confidentiality4}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. {t.liabilityTitle}</h2>
                <p className="mb-4">{t.liabilityIntro}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.limitationsTitle}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>{t.limitation1}</li>
                  <li>{t.limitation2}</li>
                  <li>{t.limitation3}</li>
                  <li>{t.limitation4}</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.indemnificationTitle}</h3>
                <p>{t.indemnificationDesc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. {t.forceMatjeureTitle}</h2>
                <p className="mb-4">{t.forceMatjeureIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.forceMatjeure1}</li>
                  <li>{t.forceMatjeure2}</li>
                  <li>{t.forceMatjeure3}</li>
                  <li>{t.forceMatjeure4}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. {t.terminationTitle}</h2>
                <p className="mb-4">{t.terminationIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t.termination1}</li>
                  <li>{t.termination2}</li>
                  <li>{t.termination3}</li>
                  <li>{t.termination4}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. {t.disputeResolutionTitle}</h2>
                <p className="mb-4">{t.disputeResolutionIntro}</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>{t.dispute1}</li>
                  <li>{t.dispute2}</li>
                  <li>{t.dispute3}</li>
                  <li>{t.dispute4}</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. {t.governingLawTitle}</h2>
                <p className="mb-4">{t.governingLawText}</p>
                <p>{t.jurisdictionText}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. {t.changesToTermsTitle}</h2>
                <p className="mb-4">{t.changesToTermsText1}</p>
                <p>{t.changesToTermsText2}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. {t.severabilityTitle}</h2>
                <p>{t.severabilityText}</p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. {t.contactInfoTitle}</h2>
                <p className="mb-4">{t.contactInfoIntro}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>{t.legalDepartment}</strong></p>
                    <p>{t.email}</p>
                    <p>{t.phone}</p>
                  </div>
                  <div>
                    <p><strong>{t.businessAddress}</strong></p>
                    <p>{t.address}</p>
                    <p>{t.kvk}</p>
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

export default Terms;