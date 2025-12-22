'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaRedo, FaExclamationTriangle } from 'react-icons/fa';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);
    
    // In production, you would send this to an error tracking service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <FaExclamationTriangle className="text-white text-5xl" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're sorry, but something unexpected happened. Don't worry, our team has been notified.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Error Details (Development Mode)
            </h3>
            <div className="bg-red-50 border border-red-200 rounded p-4 overflow-auto">
              <p className="text-sm font-mono text-red-800 break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        )}

        {/* What You Can Do */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What you can do:
          </h3>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Try refreshing the page or clicking the retry button below</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Go back to the home page and try again</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Clear your browser cache and cookies</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Contact us if the problem persists</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-orange-600 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaHome className="mr-2" />
            Go to Home
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-gray-600">
          <p className="text-sm">
            Need help? <Link href="/contact" className="text-orange-600 hover:text-orange-700 underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
