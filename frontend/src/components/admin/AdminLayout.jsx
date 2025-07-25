import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Users, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/admin/jobs', icon: Briefcase, text: 'Manage Jobs' },
    { to: '/admin/applications', icon: FileText, text: 'Job Applications' },
    { to: '/admin/requests', icon: Users, text: 'Employer Requests' },
    { to: '/admin/contacts', icon: MessageSquare, text: 'Contact Messages' },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">FST Trading</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.text}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <NavContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-40">
          <h1 className="text-xl font-bold">FST Trading</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;