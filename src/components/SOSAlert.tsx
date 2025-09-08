'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EmergencyAlert } from '@/types';

interface SOSAlertProps {
  onEmergencyAlert: (type: 'medical' | 'communication' | 'assistance', message?: string) => void;
}

export default function SOSAlert({ onEmergencyAlert }: SOSAlertProps) {
  const [alertSent, setAlertSent] = useState(false);
  const [alertType, setAlertType] = useState<string>('');

  const handleEmergencyAlert = async (type: 'medical' | 'communication' | 'assistance', message?: string) => {
    try {
      onEmergencyAlert(type, message);
      setAlertSent(true);
      setAlertType(type);
      
      // Reset alert status after 5 seconds
      setTimeout(() => {
        setAlertSent(false);
        setAlertType('');
      }, 5000);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          ⚠️ Emergency SOS System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alertSent && (
          <div className="p-4 bg-green-900/50 border border-green-600 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">
                {alertType.toUpperCase()} ALERT SENT
              </span>
            </div>
            <p className="text-green-300 text-sm mt-1">
              Emergency responders have been notified. Help is on the way.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {/* Medical Emergency */}
          <Button
            onClick={() => handleEmergencyAlert('medical', 'Medical emergency - immediate assistance required')}
            disabled={alertSent}
            className="bg-red-600 hover:bg-red-700 text-white py-4 h-auto flex items-center justify-center gap-3 border-2 border-red-500 disabled:opacity-50"
          >
            <span className="text-2xl">🚨</span>
            <div className="text-left">
              <div className="font-bold">MEDICAL EMERGENCY</div>
              <div className="text-xs text-red-100">Immediate medical assistance needed</div>
            </div>
          </Button>

          {/* Communication Help */}
          <Button
            onClick={() => handleEmergencyAlert('communication', 'Communication assistance required - need help expressing thoughts')}
            disabled={alertSent}
            className="bg-orange-600 hover:bg-orange-700 text-white py-4 h-auto flex items-center justify-center gap-3 border-2 border-orange-500 disabled:opacity-50"
          >
            <span className="text-2xl">💬</span>
            <div className="text-left">
              <div className="font-bold">COMMUNICATION HELP</div>
              <div className="text-xs text-orange-100">Need assistance with communication</div>
            </div>
          </Button>

          {/* General Assistance */}
          <Button
            onClick={() => handleEmergencyAlert('assistance', 'General assistance required - non-emergency help needed')}
            disabled={alertSent}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-4 h-auto flex items-center justify-center gap-3 border-2 border-yellow-500 disabled:opacity-50"
          >
            <span className="text-2xl">🆘</span>
            <div className="text-left">
              <div className="font-bold">GENERAL ASSISTANCE</div>
              <div className="text-xs text-yellow-100">Non-emergency assistance needed</div>
            </div>
          </Button>
        </div>

        {/* Quick Access Note */}
        <div className="mt-6 p-3 bg-slate-700 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 text-lg">💡</span>
            <div>
              <p className="text-white font-medium text-sm">Quick Access</p>
              <p className="text-gray-300 text-xs mt-1">
                These emergency buttons are accessible via brain signals. Simply think "SOS" + the type of help needed.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-300 font-medium text-sm">Emergency Contacts:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-slate-700 rounded">
              <p className="text-white font-medium">Primary Caregiver</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="p-2 bg-slate-700 rounded">
              <p className="text-white font-medium">Doctor</p>
              <p className="text-gray-400">+1 (555) 987-6543</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}