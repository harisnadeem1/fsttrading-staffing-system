import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  PlusCircle,
  Shield,
  MessageSquare,
  UserCheck,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_jobs: 0,
    total_applications: 0,
    total_requests: 0,
    total_messages: 0,
    total_admins: 0,
    total_super_admins: 0,
    last_job_posted: null,
    growth: {
      jobs: 0,
      applications: 0,
      requests: 0,
      messages: 0
    },
    recent_activity: [],
    job_types_distribution: [],
    top_applications_by_job: []
  });

  const [adminInfo, setAdminInfo] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
          headers: {
            Authorization: localStorage.getItem('adminToken'),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    // Get admin info from localStorage
    const storedAdminInfo = localStorage.getItem('adminInfo');
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo));
    }

    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Calculate overall platform growth
  const calculateOverallGrowth = () => {
    const { jobs, applications, requests, messages } = stats.growth;
    return Math.round((jobs + applications + requests + messages) / 4);
  };

  const formatGrowthText = (growth) => {
    if (growth > 0) return `+${growth}%`;
    if (growth < 0) return `${growth}%`;
    return '0%';
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-white-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const statCards = [
    {
      title: 'Active Jobs',
      value: stats.total_jobs,
      icon: Briefcase,
      color: 'bg-blue-500',
      bgGradient: 'from-blue-500 to-blue-600',
      change: formatGrowthText(stats.growth.jobs),
      changeType: stats.growth.jobs >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Applications',
      value: stats.total_applications,
      icon: FileText,
      color: 'bg-green-500',
      bgGradient: 'from-green-500 to-green-600',
      change: formatGrowthText(stats.growth.applications),
      changeType: stats.growth.applications >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Staff Requests',
      value: stats.total_requests,
      icon: Users,
      color: 'bg-purple-500',
      bgGradient: 'from-purple-500 to-purple-600',
      change: formatGrowthText(stats.growth.requests),
      changeType: stats.growth.requests >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Contact Messages',
      value: stats.total_messages,
      icon: MessageSquare,
      color: 'bg-amber-500',
      bgGradient: 'from-amber-500 to-amber-600',
      change: formatGrowthText(stats.growth.messages),
      changeType: stats.growth.messages >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Last Job Posted',
      value: stats.last_job_posted ? new Date(stats.last_job_posted).toLocaleDateString() : 'N/A',
      icon: Calendar,
      color: 'bg-orange-500',
      bgGradient: 'from-orange-500 to-orange-600',
      change: 'Today',
      changeType: 'neutral'
    },
    {
      title: 'Admin Users',
      value: stats.total_admins + stats.total_super_admins,
      icon: UserCheck,
      color: 'bg-red-500',
      bgGradient: 'from-red-500 to-red-600',
      change: `${stats.total_super_admins} Super`,
      changeType: 'neutral'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return <FileText className="h-4 w-4 text-green-600" />;
      case 'request': return <Users className="h-4 w-4 text-purple-600" />;
      case 'job': return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-amber-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'application': return 'bg-green-100 border-green-200';
      case 'request': return 'bg-purple-100 border-purple-200';
      case 'job': return 'bg-blue-100 border-blue-200';
      case 'message': return 'bg-amber-100 border-amber-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const handleCreateAdmin = async (e) => {
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

      toast({
        title: 'Success!',
        description: 'New admin account created successfully',
        duration: 3000
      });
      setNewAdmin({ name: '', email: '', password: '' });

      // Refresh stats to update admin count
      window.location.reload();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
        duration: 3000
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>FST Trading - Admin Dashboard</title>
      </Helmet>

      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-blue-100 text-lg">
                {adminInfo?.name ? `Hello, ${adminInfo.name}` : 'Admin Dashboard'}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Manage your staffing platform efficiently
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Platform Growth</p>
                <p className={`text-2xl font-bold ${getGrowthColor(calculateOverallGrowth())}`}>
                  {formatGrowthText(calculateOverallGrowth())}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
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
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-5`}></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${card.bgGradient}`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                  <div className="flex items-center text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.changeType === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : card.changeType === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                      {card.change}
                    </span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {/* Job Types Distribution */}
          {stats.job_types_distribution.length > 0 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Job Types Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.job_types_distribution.map((jobType, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{jobType.job_type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(jobType.count / Math.max(...stats.job_types_distribution.map(j => j.count))) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{jobType.count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Top Jobs by Applications */}
          {stats.top_applications_by_job.length > 0 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Top Jobs by Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.top_applications_by_job.slice(0, 5).map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-sm">{job.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        {job.application_count} apps
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Quick Actions and Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {/* Recent Activity */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.recent_activity.length > 0 ? (
                  stats.recent_activity.map((activity, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                      <div className="flex items-center space-x-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <span className="text-sm font-medium">{activity.description}</span>
                          {activity.name && (
                            <p className="text-xs text-gray-600">{activity.name}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-8 w-8 mx-auto mb-2" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
  <CardHeader className="pb-4">
    <CardTitle className="flex items-center text-lg">
      <PlusCircle className="h-5 w-5 mr-2 text-purple-600" />
      Quick Actions
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Link to="/admin/jobs" className="block">
        <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="lg">
          <Briefcase className="h-4 w-4 mr-2" />
          Create New Job
        </Button>
      </Link>

      <Link to="/admin/applications" className="block">
        <Button variant="outline" className="w-full justify-start border-green-200 hover:bg-green-50" size="lg">
          <FileText className="h-4 w-4 mr-2 text-green-600" />
          Review Applications
        </Button>
      </Link>

      <Link to="/admin/requests" className="block">
        <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50" size="lg">
          <Users className="h-4 w-4 mr-2 text-purple-600" />
          Manage Requests
        </Button>
      </Link>

      <Link to="/admin/contacts" className="block">
        <Button variant="outline" className="w-full justify-start border-amber-200 hover:bg-amber-50" size="lg">
          <MessageSquare className="h-4 w-4 mr-2 text-amber-600" />
          View Messages
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>

        </motion.div>

        {/* Create Admin Section - Only for Super Admins */}
        {adminInfo?.role === 'super_admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Admin Management
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                    Super Admin Only
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                      <Input
                        placeholder="Enter full name"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                        className="text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        className="text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                      <Input
                        placeholder="Enter secure password"
                        type="password"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        className="text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 px-6"
                      size="lg"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Admin Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center py-6"
        >
          <p className="text-gray-500 text-sm">
            FST Trading Admin Panel • Built with ❤️ for efficient management
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;