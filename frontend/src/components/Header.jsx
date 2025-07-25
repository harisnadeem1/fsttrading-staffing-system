import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, Mail, Phone, Linkedin, Youtube, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handleSocialClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
      isActive ? 'text-white bg-blue-700' : 'text-gray-300 hover:text-white hover:bg-blue-700'
    }`;

  const servicesLinks = [
    { name: t.tempStaffing, href: '/services/temporary-staffing' },
    { name: t.personnelLending, href: '/services/personnel-lending' },
    { name: t.employmentMediation, href: '/services/employment-mediation' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 py-4">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-blue-700 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                <span className="text-blue-600">FST</span> TRADING
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href={`mailto:${t.email}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {t.email}
              </a>
              <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {t.phone}
              </a>
            </div>
            
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
              >
                {language === 'en' ? 'NL' : 'EN'}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex justify-between items-center h-16 py-3">
            <div className="flex items-center space-x-2">
              <NavLink to="/" className={navLinkClass}>
                {t.home}
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                {t.aboutPageTitle || 'About Us'}
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-300 hover:text-white hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors focus:outline-none">
                  {t.services}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg border border-gray-200 rounded-lg mt-2">
                  {servicesLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link to={link.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">{link.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <NavLink to="/jobs" className={navLinkClass}>
                {t.jobPortal}
              </NavLink>
              <NavLink to="/request-staff" className={navLinkClass}>
                {t.requestStaff}
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                {t.contact}
              </NavLink>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'en' ? 'NL' : 'EN'}
              </button>
              <Link to="/contact">
                <Button variant="secondary" size="sm" className="bg-white text-blue-800 hover:bg-gray-100">
                  {t.contactUs} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  <NavLink 
                    to="/" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.home}
                  </NavLink>
                  
                  <NavLink 
                    to="/about" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.aboutPageTitle || 'About Us'}
                  </NavLink>
                  
                  <div className="space-y-1">
                    <div className="px-4 py-3 text-base font-medium text-gray-700">{t.services}</div>
                    <div className="pl-4 space-y-1">
                      {servicesLinks.map((link) => (
                        <NavLink 
                          key={link.name} 
                          to={link.href} 
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  
                  <NavLink 
                    to="/jobs" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.jobPortal}
                  </NavLink>
                  
                  <NavLink 
                    to="/request-staff" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.requestStaff}
                  </NavLink>
                  
                  <NavLink 
                    to="/contact" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.contact}
                  </NavLink>
                </div>
                
                {/* Contact Info (Mobile) */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <a href={`mailto:${t.email}`} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail className="h-4 w-4 mr-3" />
                    {t.email}
                  </a>
                  <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Phone className="h-4 w-4 mr-3" />
                    {t.phone}
                  </a>
                  {/* <div className="flex items-center px-4 py-2 space-x-4">
                    <Linkedin onClick={handleSocialClick} className="h-5 w-5 text-gray-500 hover:text-blue-700 cursor-pointer transition-colors" />
                    <Youtube onClick={handleSocialClick} className="h-5 w-5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors" />
                  </div> */}
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {t.contactUs} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;