'use client';

import { useState, useEffect } from 'react';
import BrainStateMonitor from '@/components/BrainStateMonitor';
import SOSAlert from '@/components/SOSAlert';
import AssistiveTools from '@/components/AssistiveTools';
import { BrainSignal, WearableStatus, EmergencyAlert } from '@/types';

export default function Dashboard() {
  const [brainState, setBrainState] = useState<BrainSignal | null>(null);
  const [wearableStatus, setWearableStatus] = useState<WearableStatus | null>(null);

  // Simulate real-time brain state data
  useEffect(() => {
    // Initialize with mock data
    setWearableStatus({
      connected: true,
      batteryLevel: 76,
      signalStrength: 89,
      lastSync: new Date(),
      deviceModel: 'NeuroVox Band v2.1'
    });

    setBrainState({
      id: '1',
      userId: 'user1',
      timestamp: new Date(),
      focus: 67,
      relaxation: 45,
      stress: 23
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBrainState(prev => prev ? {
        ...prev,
        timestamp: new Date(),
        focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 10)),
        relaxation: Math.max(0, Math.min(100, prev.relaxation + (Math.random() - 0.5) * 8)),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 6))
      } : null);

      setWearableStatus(prev => prev ? {
        ...prev,
        batteryLevel: Math.max(0, prev.batteryLevel - 0.01), // Slowly drain battery
        signalStrength: Math.max(50, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 5)),
        lastSync: new Date()
      } : null);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyAlert = async (type: 'medical' | 'communication' | 'assistance', message?: string) => {
    console.log('Emergency Alert:', { type, message });
    
    // In a real application, this would send the alert to emergency services
    const alert: EmergencyAlert = {
      id: Date.now().toString(),
      userId: 'user1',
      timestamp: new Date(),
      type,
      message,
      resolved: false
    };

    try {
      // Simulate API call
      const response = await fetch('/api/emergency-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send emergency alert');
      }
      
      console.log('Emergency alert sent successfully');
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      // In a real app, show user feedback about the error
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🧠 NeuroVox Dashboard
          </h1>
          <p className="text-gray-300">
            Real-time brain signal monitoring and assistive communication tools
          </p>
        </div>

        {/* Brain State and Connection Status */}
        <div className="mb-8">
          <BrainStateMonitor 
            brainState={brainState}
            wearableStatus={wearableStatus}
          />
        </div>

        {/* Emergency SOS System */}
        <div className="mb-8">
          <SOSAlert onEmergencyAlert={handleEmergencyAlert} />
        </div>

        {/* Assistive Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            🛠️ Assistive Communication Tools
          </h2>
          <AssistiveTools />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {brainState?.focus || 0}%
              </div>
              <div className="text-gray-300 text-sm">Current Focus</div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {brainState?.relaxation || 0}%
              </div>
              <div className="text-gray-300 text-sm">Relaxation Level</div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {brainState?.stress || 0}%
              </div>
              <div className="text-gray-300 text-sm">Stress Level</div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {wearableStatus?.batteryLevel.toFixed(0) || 0}%
              </div>
              <div className="text-gray-300 text-sm">Device Battery</div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">📊 Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white font-medium">Device Connected</div>
                <div className="text-gray-400 text-sm">NeuroVox Band v2.1 synchronized successfully</div>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white font-medium">Brain State Updated</div>
                <div className="text-gray-400 text-sm">Focus level improved to {brainState?.focus || 0}%</div>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date(Date.now() - 30000).toLocaleTimeString()}
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white font-medium">Assistive Tool Used</div>
                <div className="text-gray-400 text-sm">On-screen keyboard activated for communication</div>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date(Date.now() - 120000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}