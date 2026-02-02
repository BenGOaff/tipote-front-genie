import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DashboardStats {
  totalContents: number;
  publishedContents: number;
  scheduledContents: number;
  draftContents: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  hasStrategy: boolean;
  hasPyramid: boolean;
  onboardingCompleted: boolean;
  firstName: string | null;
  // Contextual data for smart suggestions
  hasOffers: boolean;
  contentsByType: Record<string, number>;
  hasPosts: boolean;
  hasEmails: boolean;
  hasArticles: boolean;
  hasVideos: boolean;
  hasFunnels: boolean;
}

export interface UpcomingContent {
  id: string;
  title: string;
  type: string;
  platform: string | null;
  scheduled_at: string | null;
  status: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  category: string | null;
  due_date: string | null;
  status: string;
  priority: number | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [upcomingContents, setUpcomingContents] = useState<UpcomingContent[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDashboardData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, onboarding_completed, pyramid_selected_at, selected_pyramid, has_offers, offers')
        .eq('user_id', user.id)
        .single();

      // Fetch contents stats
      const { data: contents } = await supabase
        .from('contents')
        .select('id, title, type, platform, scheduled_at, status')
        .eq('user_id', user.id);

      // Fetch tasks
      const { data: tasks } = await supabase
        .from('tasks')
        .select('id, title, category, due_date, status, priority')
        .eq('user_id', user.id);

      const contentsList = contents || [];
      const tasksList = tasks || [];

      // Calculate stats
      const publishedContents = contentsList.filter(c => c.status === 'published').length;
      const scheduledContents = contentsList.filter(c => c.status === 'scheduled').length;
      const draftContents = contentsList.filter(c => c.status === 'draft').length;
      const completedTasks = tasksList.filter(t => t.status === 'completed' || t.status === 'done').length;
      const pendingTasks = tasksList.filter(t => t.status !== 'completed' && t.status !== 'done').length;

      // Content by type analysis
      const contentsByType: Record<string, number> = {};
      contentsList.forEach(c => {
        contentsByType[c.type] = (contentsByType[c.type] || 0) + 1;
      });

      setStats({
        totalContents: contentsList.length,
        publishedContents,
        scheduledContents,
        draftContents,
        totalTasks: tasksList.length,
        completedTasks,
        pendingTasks,
        hasStrategy: !!profile?.selected_pyramid,
        hasPyramid: !!profile?.pyramid_selected_at,
        onboardingCompleted: !!profile?.onboarding_completed,
        firstName: profile?.first_name || null,
        // Contextual data
        hasOffers: !!profile?.has_offers,
        contentsByType,
        hasPosts: (contentsByType['post'] || 0) > 0,
        hasEmails: (contentsByType['email'] || 0) > 0,
        hasArticles: (contentsByType['article'] || 0) > 0,
        hasVideos: (contentsByType['video'] || 0) > 0,
        hasFunnels: (contentsByType['funnel'] || 0) > 0,
      });

      // Get upcoming contents (scheduled for today or future, sorted by date)
      const now = new Date();
      const upcoming = contentsList
        .filter(c => c.scheduled_at && new Date(c.scheduled_at) >= now && c.status !== 'published')
        .sort((a, b) => new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime())
        .slice(0, 5);
      
      setUpcomingContents(upcoming);

      // Get upcoming tasks (not completed, sorted by priority and due date)
      const upcomingTasksList = tasksList
        .filter(t => t.status !== 'completed' && t.status !== 'done')
        .sort((a, b) => {
          // Priority first (lower number = higher priority)
          if (a.priority !== b.priority) {
            return (a.priority || 999) - (b.priority || 999);
          }
          // Then by due date
          if (a.due_date && b.due_date) {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          }
          return 0;
        })
        .slice(0, 5);
      
      setUpcomingTasks(upcomingTasksList);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  return {
    stats,
    upcomingContents,
    upcomingTasks,
    loading,
    refetch: fetchDashboardData,
  };
}
