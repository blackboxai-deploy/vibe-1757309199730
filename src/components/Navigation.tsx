'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getAuthUser, clearAuthUser } from '@/lib/auth';

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const handleLogout = () => {
    clearAuthUser();
    setUser(null);
    window.location.href = '/login';
  };

  const navItems = [
    { href: '/', label: '🧠 Dashboard', roles: ['patient', 'doctor', 'admin'] },
    { href: '/doctor', label: '🩺 Doctor Portal', roles: ['doctor', 'admin'] },
    { href: '/report', label: '📊 Daily Report', roles: ['patient', 'doctor', 'admin'] },
    { href: '/mind-log', label: '🧠 Mind Log', roles: ['patient', 'doctor', 'admin'] },
    { href: '/testimonials', label: '💬 Testimonials', roles: ['patient', 'doctor', 'admin'] },
    { href: '/about', label: '🌟 About Us', roles: ['patient', 'doctor', 'admin'] },
  ];

  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role))
    : navItems.filter(item => ['/', '/testimonials', '/about'].includes(item.href));

  if (pathname === '/login') {
    return null; // Hide navigation on login page
  }

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">NeuroVox</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-slate-700 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Welcome, {user.name}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}