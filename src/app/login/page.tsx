'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginForm } from '@/types';
import { setAuthUser } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data and token
      setAuthUser(data.user, data.token);
      
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Demo login with mock user
    const mockUser = {
      id: 'demo-user',
      email: 'demo@neurovox.com',
      name: 'Demo User',
      role: 'patient' as const,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    setAuthUser(mockUser, 'demo-token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">NeuroVox</h1>
          <p className="text-gray-400">Transforming Silence into Hope</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">
              🔐 Secure Login
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Only authorized users may access patient data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Access */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">
                  Demo Access Available
                </p>
                <Button
                  onClick={handleDemoLogin}
                  variant="outline"
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  🚀 Try Demo Version
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-slate-700 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 text-lg">🛡️</span>
                <div>
                  <p className="text-white font-medium text-sm">Security Notice</p>
                  <p className="text-gray-300 text-xs mt-1">
                    This system contains sensitive patient data. All access is logged and monitored for compliance with healthcare privacy regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Login Credentials for Demo */}
            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-600/50">
              <p className="text-blue-300 text-xs font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-blue-200">
                <p>Patient: patient@neurovox.com / password123</p>
                <p>Doctor: doctor@neurovox.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 Team Vianra - NeuroVox Platform
          </p>
        </div>
      </div>
    </div>
  );
}