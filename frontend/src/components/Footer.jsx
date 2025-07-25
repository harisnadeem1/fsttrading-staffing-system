import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{t.companyName}</h3>
            <p className="text-gray-300 text-sm mb-4">{t.aboutHeroText || 'Your trusted partner in connecting exceptional talent with outstanding opportunities.'}</p>
            <div className="space-y-1">
              <p className="text-gray-300 text-sm">{t.address}</p>
              <p className="text-gray-300 text-sm">{t.email}</p>
              <p className="text-gray-300 text-sm">{t.phone}</p>
              <p className="text-gray-300 text-sm">{t.kvk}</p>
            </div>
          </div>

          {/* Quick Links & Services (2 columns on mobile) */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">{t.home}</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">{t.aboutPageTitle || 'About Us'}</Link></li>
                <li><Link to="/services/temporary-staffing" className="text-gray-300 hover:text-white transition-colors text-sm">{t.services}</Link></li>
                <li><Link to="/jobs" className="text-gray-300 hover:text-white transition-colors text-sm">{t.jobPortal}</Link></li>
                <li><Link to="/request-staff" className="text-gray-300 hover:text-white transition-colors text-sm">{t.requestStaff}</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">{t.contact}</Link></li>
              </ul>
            </div>

            {/* Services, Legal & Language */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/services/temporary-staffing" className="text-gray-300 hover:text-white text-sm transition-colors">{t.tempStaffing}</Link></li>
                <li><Link to="/services/personnel-lending" className="text-gray-300 hover:text-white text-sm transition-colors">{t.personnelLending}</Link></li>
                <li><Link to="/services/employment-mediation" className="text-gray-300 hover:text-white text-sm transition-colors">{t.employmentMediation}</Link></li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">{t.privacy}</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">{t.terms}</Link></li>
              </ul>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-400">Language</h4>
                <button
                  onClick={toggleLanguage}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {language === 'en' ? 'Switch to Dutch (NL)' : 'Switch to English (EN)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {t.companyName}. {t.allRightsReserved || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;