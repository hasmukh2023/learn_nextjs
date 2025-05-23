'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import refreshAccessToken from '@/utils/auth/refreshToken';
import AuthLayout from '@/app/components/Layout/AuthLayout';

interface DashboardStats {
  totalBooks: number;
  booksRead: number;
  currentlyReading: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    booksRead: 0,
    currentlyReading: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        let accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 401 && refreshToken) {
          // Try to refresh the token
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            // Retry the request with new token
            accessToken = newAccessToken;
            const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats/`, {
              headers: {
                'Authorization': `Bearer ${newAccessToken}`,
                'Content-Type': 'application/json',
              }
            });
            
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setStats(data);
              return;
            }
          }
          
          // If refresh failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Books</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.totalBooks}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Books Read</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.booksRead}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Currently Reading</h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.currentlyReading}
            </p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Add your recent activity content here */}
            <div className="p-4 text-gray-600 dark:text-gray-400">
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}