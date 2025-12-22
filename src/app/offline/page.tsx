'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';

export default function OfflinePage() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Check if we're online
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      // Try to go back or reload
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    } else {
      // Force a reload to check connection
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FiWifiOff className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isOnline ? 'Connection Restored!' : 'You\'re Offline'}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          {isOnline
            ? 'Your internet connection has been restored. Click the button below to continue.'
            : 'It looks like you\'re not connected to the internet. Please check your connection and try again.'}
        </p>

        {/* Status Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse`}
          />
          <span className="text-sm font-medium text-gray-700">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FiRefreshCw className="w-5 h-5" />
          {isOnline ? 'Continue' : 'Retry Connection'}
        </button>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Some content may be available offline. Try navigating to pages
            you've visited before.
          </p>
        </div>
      </div>
    </div>
  );
}
