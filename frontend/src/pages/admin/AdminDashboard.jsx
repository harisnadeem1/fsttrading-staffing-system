import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FileText, Users, Calendar } from 'lucide-react';
import { jobsData as initialJobs } from '@/data/jobs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalRequests: 0,
    lastJobDate: null,
  });

  const [adminInfo, setAdminInfo] = useState(null);
const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

useEffect(() => {
  const storedAdmin = JSON.parse(localStorage.getItem('adminInfo'));
  setAdminInfo(storedAdmin);
}, []);

  

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const allJobs = [...initialJobs.en, ...storedJobs];
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const requests = JSON.parse(localStorage.getItem('staffRequests') || '[]');

    const lastJob = allJobs.length > 0 ? allJobs.reduce((latest, job) => {
      const latestDate = new Date(latest.postedDate);
      const jobDate = new Date(job.postedDate);
      return jobDate > latestDate ? job : latest;
    }) : null;

    setStats({
      totalJobs: allJobs.length,
      totalApplications: applications.length,
      totalRequests: requests.length,
      lastJobDate: lastJob ? new Date(lastJob.postedDate).toLocaleDateString() : 'N/A',
    });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statCards = [
    { title: 'Total Active Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-blue-500' },
    { title: 'Job Applications', value: stats.totalApplications, icon: FileText, color: 'text-green-500' },
    { title: 'Employer Requests', value: stats.totalRequests, icon: Users, color: 'text-purple-500' },
    { title: 'Last Job Posted', value: stats.lastJobDate, icon: Calendar, color: 'text-orange-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin - Dashboard</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {statCards.map((card, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}


          {adminInfo?.role === 'super_admin' && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('adminToken'),
            },
            body: JSON.stringify(newAdmin),
          });

          const data = await response.json();

          if (!response.ok) throw new Error(data.message);

          toast({ title: 'Admin Created', description: data.message });
          setNewAdmin({ name: '', email: '', password: '' });
        } catch (err) {
          toast({ title: 'Error', description: err.message, variant: 'destructive' });
        }
      }}
      className="space-y-4 max-w-md"
    >
      <Input
        placeholder="Name"
        value={newAdmin.name}
        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={newAdmin.email}
        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={newAdmin.password}
        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        required
      />
      <Button type="submit">Create Admin</Button>
    </form>
  </div>
)}

        </motion.div>
        <div className="text-center mt-8">
          <p className="text-muted-foreground">Welcome to the F4ast Trading Admin Panel.</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;