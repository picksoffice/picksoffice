'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import PageLayout from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { 
  UserIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface UserStats {
  totalBets: number;
  winRate: number;
  totalProfit: number;
  avgOdds: number;
  lastBetDate: string | null;
  memberSince: string;
}

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Simulate loading user stats - replace with actual API call
    if (user) {
      setTimeout(() => {
        setStats({
          totalBets: 0,
          winRate: 0,
          totalProfit: 0,
          avgOdds: 0,
          lastBetDate: null,
          memberSince: user.createdAt || new Date().toISOString(),
        });
        setLoadingStats(false);
      }, 1000);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user.username}!</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{user.username}</h2>
                  <p className="text-gray-400">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="success" size="sm">
                      {user.confirmed ? 'Verified' : 'Unverified'}
                    </Badge>
                    {stats && (
                      <span className="text-sm text-gray-500">
                        Member since {new Date(stats.memberSince).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                color="red"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        {loadingStats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Bets</span>
                  <ChartBarIcon className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalBets}</p>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Win Rate</span>
                  <TrophyIcon className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats.winRate > 0 ? `${stats.winRate.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Profit</span>
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold text-white">
                  ${stats.totalProfit.toFixed(2)}
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Last Activity</span>
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-lg font-semibold text-white">
                  {stats.lastBetDate 
                    ? new Date(stats.lastBetDate).toLocaleDateString()
                    : 'No activity yet'
                  }
                </p>
              </div>
            </Card>
          </div>
        ) : null}

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button href="/picks" fullWidth>
              View Latest Picks
            </Button>
            <Button href="/statistics" variant="secondary" fullWidth>
              <ChartBarIcon className="h-5 w-5 mr-2" />
              View Statistics
            </Button>
            <Button href="/calculator" variant="secondary" fullWidth>
              Open Calculators
            </Button>
          </div>
        </div>

        {/* Settings Section */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <CogIcon className="h-6 w-6 mr-2" />
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive updates about new picks</p>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div>
                  <p className="text-white font-medium">Change Password</p>
                  <p className="text-sm text-gray-400">Update your account password</p>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account</p>
                </div>
                <Button variant="ghost" color="red" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}