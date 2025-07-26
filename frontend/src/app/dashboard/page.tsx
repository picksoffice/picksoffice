// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import Link from 'next/link';

import {
  UserIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  ClockIcon,
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
                    <Badge variant={user.confirmed ? 'default' : 'destructive'}>
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
        {/* …dieser Teil bleibt wie zuvor … */}

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/picks">
              <Button fullWidth>View Latest Picks</Button>
            </Link>
            <Link href="/statistics">
              <Button variant="secondary" fullWidth>
                <ChartBarIcon className="h-5 w-5 mr-2" />
                View Statistics
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="secondary" fullWidth>Open Calculators</Button>
            </Link>
          </div>
        </div>

        {/* Settings Section */}
        {/* …dieser Teil bleibt unverändert … */}
      </div>
    </PageLayout>
  );
}
