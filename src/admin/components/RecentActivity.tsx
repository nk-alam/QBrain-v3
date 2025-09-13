import React, { useState, useEffect } from 'react';
import { Calendar, User, FileText, MessageSquare, Trophy } from 'lucide-react';
import { getApplications, getContactMessages, getBlogs, getTeamMembers, getAchievements } from '../../services/firebaseService';
import { format } from 'date-fns';

const RecentActivity = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const [applications, messages, blogs, members, achievements] = await Promise.all([
        getApplications(),
        getContactMessages(),
        getBlogs(),
        getTeamMembers(),
        getAchievements()
      ]);

      const allActivities: any[] = [];

      // Add applications
      if (applications.success) {
        applications.data.slice(0, 3).forEach((app: any) => {
          allActivities.push({
            type: 'application',
            title: 'New application received',
            description: `From ${app.personalInfo?.fullName}`,
            date: app.createdAt?.toDate(),
            icon: User,
            color: 'text-blue-400'
          });
        });
      }

      // Add contact messages
      if (messages.success) {
        messages.data.slice(0, 2).forEach((msg: any) => {
          allActivities.push({
            type: 'message',
            title: 'New contact message',
            description: `From ${msg.name}`,
            date: msg.createdAt?.toDate(),
            icon: MessageSquare,
            color: 'text-green-400'
          });
        });
      }

      // Add blogs
      if (blogs.success) {
        blogs.data.slice(0, 2).forEach((blog: any) => {
          allActivities.push({
            type: 'blog',
            title: 'Blog post created',
            description: blog.title,
            date: blog.createdAt?.toDate(),
            icon: FileText,
            color: 'text-purple-400'
          });
        });
      }

      // Add team members
      if (members.success) {
        members.data.slice(0, 1).forEach((member: any) => {
          allActivities.push({
            type: 'member',
            title: 'Team member added',
            description: member.name,
            date: member.createdAt?.toDate(),
            icon: User,
            color: 'text-cyan-400'
          });
        });
      }

      // Add achievements
      if (achievements.success) {
        achievements.data.slice(0, 1).forEach((achievement: any) => {
          allActivities.push({
            type: 'achievement',
            title: 'Achievement added',
            description: achievement.title,
            date: achievement.createdAt?.toDate(),
            icon: Trophy,
            color: 'text-yellow-400'
          });
        });
      }

      // Sort by date and take latest 5
      const sortedActivities = allActivities
        .filter(activity => activity.date)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

      setActivities(sortedActivities);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return format(date, 'MMM dd');
  };

  if (loading) {
    return (
      <div className="space-y-3 text-sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-slate-700/30 rounded animate-pulse">
            <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            <div className="h-3 bg-slate-600 rounded w-12"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {activities.length > 0 ? (
        activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded hover:bg-slate-700/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 ${activity.color}`} />
                <div>
                  <span className="text-gray-300">{activity.title}</span>
                  {activity.description && (
                    <div className="text-xs text-gray-500 truncate max-w-48">
                      {activity.description}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-gray-500 text-xs">
                {getTimeAgo(activity.date)}
              </span>
            </div>
          );
        })
      ) : (
        <div className="text-center py-4 text-gray-500">
          No recent activity
        </div>
      )}
    </div>
  );
};

export default RecentActivity;