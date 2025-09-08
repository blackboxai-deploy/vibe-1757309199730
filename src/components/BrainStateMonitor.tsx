'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BrainSignal, WearableStatus } from '@/types';
import { useState, useEffect } from 'react';

interface BrainStateMonitorProps {
  brainState: BrainSignal | null;
  wearableStatus: WearableStatus | null;
}

export default function BrainStateMonitor({ brainState, wearableStatus }: BrainStateMonitorProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-400';
    if (level > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength > 70) return 'text-green-400';
    if (strength > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Connection Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            🔗 Device Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Status</span>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                wearableStatus?.connected ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className={wearableStatus?.connected ? 'text-green-400' : 'text-red-400'}>
                {wearableStatus?.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Battery</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 border border-gray-400 rounded-sm relative">
                <div 
                  className={`h-full rounded-sm ${
                    (wearableStatus?.batteryLevel || 0) > 50 ? 'bg-green-400' : 
                    (wearableStatus?.batteryLevel || 0) > 20 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${wearableStatus?.batteryLevel || 0}%` }}
                ></div>
              </div>
              <span className={getBatteryColor(wearableStatus?.batteryLevel || 0)}>
                {wearableStatus?.batteryLevel || 0}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Signal Strength</span>
            <span className={getSignalStrengthColor(wearableStatus?.signalStrength || 0)}>
              {wearableStatus?.signalStrength || 0}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Device Model</span>
            <span className="text-white">
              {wearableStatus?.deviceModel || 'NeuroVox Band v2'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Last Sync</span>
            <span className="text-white text-sm">
              {wearableStatus?.lastSync ? new Date(wearableStatus.lastSync).toLocaleTimeString() : 'Never'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Brain State Monitor */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            🧠 Brain State Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Focus Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Focus</span>
              <span className="text-blue-400 font-semibold">
                {brainState?.focus || 0}%
              </span>
            </div>
            <Progress 
              value={brainState?.focus || 0} 
              className="h-3"
            />
          </div>

          {/* Relaxation Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Relaxation</span>
              <span className="text-green-400 font-semibold">
                {brainState?.relaxation || 0}%
              </span>
            </div>
            <Progress 
              value={brainState?.relaxation || 0} 
              className="h-3"
            />
          </div>

          {/* Stress Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Stress</span>
              <span className="text-red-400 font-semibold">
                {brainState?.stress || 0}%
              </span>
            </div>
            <Progress 
              value={brainState?.stress || 0} 
              className="h-3"
            />
          </div>

          {/* Graph Placeholder */}
          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-600 rounded">
              <div className="text-center">
                <div className="text-gray-400 mb-2">📈 Brain Activity Graph</div>
                <div className="text-gray-500 text-sm">Real-time visualization coming soon</div>
              </div>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-center text-gray-400 text-sm">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}