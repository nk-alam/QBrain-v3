import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  Users, 
  Trophy, 
  Mail, 
  UserPlus, 
  Calendar,
  MessageSquare,
  LogOut,
  BarChart3,
  Menu,
  X,
  TrendingUp,
  Eye,
  FileText,
  Volume2,
  Search,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import TeamMemberManager from './components/TeamMemberManager';
import HackathonManager from './components/HackathonManager';
import ApplicationManager from './components/ApplicationManager';
import ContactManager from './components/ContactManager';
import BlogManager from './components/BlogManager';
import UICustomizer from './components/UICustomizer';
import AchievementManager from './components/AchievementManager';
import WelcomeSettingsManager from './components/WelcomeSettingsManager';
import SEOManager from './components/SEOManager';
import JoinTeamSettingsManager from './components/JoinTeamSettingsManager';
import { getApplications, getContactMessages, getTeamMembers, getHackathons, getBlogs } from '../services/firebaseService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    teamMembers: 0,
    hackathons: 0,
    applications: 0,
    messages: 0,
    blogs: 0,
    publishedBlogs: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [membersResult, hackathonsResult, applicationsResult, messagesResult, blogsResult] = await Promise.all([
        getTeamMembers(),
        getHackathons(),
        getApplications(),
        getContactMessages(),
        getBlogs()
      ]);

      const blogs = blogsResult.success ? blogsResult.data : [];
      const publishedBlogs = blogs.filter((blog: any) => blog.status === 'published');

      setStats({
        teamMembers: membersResult.success ? membersResult.data.length : 0,
        hackathons: hackathonsResult.success ? hackathonsResult.data.length : 0,
        applications: applicationsResult.success ? applicationsResult.data.length : 0,
        messages: messagesResult.success ? messagesResult.data.length : 0,
        blogs: blogs.length,
        publishedBlogs: publishedBlogs.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'blogs', label: 'Blogs', icon: MessageSquare },
    { id: 'applications', label: 'Applications', icon: UserPlus },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'jointeam', label: 'Join Team Settings', icon: Settings },
    { id: 'welcome', label: 'Welcome & Audio', icon: Volume2 },
    { id: 'seo', label: 'SEO & Analytics', icon: Search },
    { id: 'ui', label: 'UI Customizer', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h2>
              <div className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.teamMembers}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Team Members</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.hackathons}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Hackathons</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.applications}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Applications</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-yellow-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.messages}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Messages</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-blue-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.blogs}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Total Blogs</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-indigo-400/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.publishedBlogs}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Published Blogs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('team')}
                    className="p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-lg text-cyan-400 hover:bg-cyan-400/20 transition-colors text-sm"
                  >
                    Manage Team
                  </button>
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="p-3 bg-purple-400/10 border border-purple-400/20 rounded-lg text-purple-400 hover:bg-purple-400/20 transition-colors text-sm"
                  >
                    Write Blog
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="p-3 bg-green-400/10 border border-green-400/20 rounded-lg text-green-400 hover:bg-green-400/20 transition-colors text-sm"
                  >
                    Review Apps
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg text-yellow-400 hover:bg-yellow-400/20 transition-colors text-sm"
                  >
                    Check Messages
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <span className="text-gray-300">New application received</span>
                    <span className="text-gray-500">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <span className="text-gray-300">Blog post published</span>
                    <span className="text-gray-500">1d ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <span className="text-gray-300">Team member added</span>
                    <span className="text-gray-500">3d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return <TeamMemberManager onUpdate={fetchStats} />;
      case 'hackathons':
        return <HackathonManager onUpdate={fetchStats} />;
      case 'achievements':
        return <AchievementManager onUpdate={fetchStats} />;
      case 'blogs':
        return <BlogManager onUpdate={fetchStats} />;
      case 'applications':
        return <ApplicationManager />;
      case 'messages':
        return <ContactManager />;
      case 'jointeam':
        return <JoinTeamSettingsManager />;
      case 'welcome':
        return <WelcomeSettingsManager />;
      case 'seo':
        return <SEOManager />;
      case 'ui':
        return <UICustomizer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800/50 border-r border-slate-700/50 min-h-screen transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Qbrain Admin
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <nav className="px-4 space-y-2 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-400/20 to-green-400/20 border border-cyan-400/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300 text-sm"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden bg-slate-800/50 border-b border-slate-700/50 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Qbrain Admin
              </h1>
              <div className="w-6" /> {/* Spacer */}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;