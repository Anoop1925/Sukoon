'use client';

import Link from 'next/link';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Helpful Suggestions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Here are some helpful suggestions:
          </h3>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Check the URL for typos or errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Use the navigation menu to find what you're looking for</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Visit our home page to explore our therapy services</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Contact us if you need assistance finding specific content</span>
            </li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaHome className="mr-2" />
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/therapies/audio"
              className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Audio Therapy
            </Link>
            <Link
              href="/therapies/yoga"
              className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Yoga Therapy
            </Link>
            <Link
              href="/therapies/reading"
              className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Reading Therapy
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
