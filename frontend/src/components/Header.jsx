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
    `flex items-center text-sm font-medium transition-colors ${
      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
    }`;

  const servicesLinks = [
    { name: t.tempStaffing, href: '/services/temporary-staffing' },
    { name: t.personnelLending, href: '/services/personnel-lending' },
    { name: t.employmentMediation, href: '/services/employment-mediation' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">F4ast Trading</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <a href={`mailto:${t.email}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                <Mail className="h-4 w-4 mr-2" />
                {t.email}
              </a>
              <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                <Phone className="h-4 w-4 mr-2" />
                {t.phone}
              </a>
              <div className="flex space-x-4">
                <Linkedin onClick={handleSocialClick} className="h-5 w-5 text-gray-500 hover:text-blue-700 cursor-pointer" />
                <Youtube onClick={handleSocialClick} className="h-5 w-5 text-gray-500 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
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
          <div className="hidden md:flex justify-between items-center h-14">
            <div className="flex items-center space-x-8">
              <NavLink to="/" className={navLinkClass}>
                {t.home}
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none">
                  {t.services}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {servicesLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link to={link.href}>{link.name}</Link>
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
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                {language === 'en' ? 'NL' : 'EN'}
              </button>
              <Link to="/contact">
                <Button variant="secondary" size="sm">
                  {t.contactUs} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>{t.home}</NavLink>
            <div className="px-3 py-2 text-base font-medium text-gray-700">{t.services}</div>
            <div className="pl-6">
              {servicesLinks.map((link) => (
                <NavLink key={link.name} to={link.href} className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>{link.name}</NavLink>
              ))}
            </div>
            <NavLink to="/jobs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>{t.jobPortal}</NavLink>
            <NavLink to="/request-staff" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>{t.requestStaff}</NavLink>
            <NavLink to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>{t.contact}</NavLink>
            <div className="border-t my-2"></div>
            <div className="px-3 py-2">
              <button
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="w-full text-left text-base font-medium text-gray-700 hover:bg-gray-50 py-2"
              >
                Switch to {language === 'en' ? 'Dutch' : 'English'}
              </button>
            </div>
            <div className="px-3 py-2">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">
                  {t.contactUs} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;