'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

export default function AssistiveTools() {
  const [isListening, setIsListening] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [smartHomeStatus, setSmartHomeStatus] = useState({
    lights: false,
    temperature: 22,
    security: true,
    music: false
  });
  const [keyboardText, setKeyboardText] = useState('');

  // Simulate live transcription
  useEffect(() => {
    if (isListening) {
      const phrases = [
        "I need help with...",
        "Please turn on the lights",
        "Call my doctor",
        "I'm feeling better today",
        "Thank you for your assistance"
      ];
      
      let currentPhrase = 0;
      const interval = setInterval(() => {
        setLiveText(phrases[currentPhrase]);
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setLiveText('');
    }
  }, [isListening]);

  const toggleSmartHome = (device: string) => {
    setSmartHomeStatus(prev => ({
      ...prev,
      [device]: !prev[device as keyof typeof prev]
    }));
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const commonPhrases = [
    "Hello, how are you?",
    "I need assistance, please.",
    "Thank you very much.",
    "Yes, I understand.",
    "No, that's not right.",
    "I'm feeling good today.",
    "Can you help me?",
    "Please wait a moment."
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* On-Screen Keyboard */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            🧑‍💻 On-Screen Keyboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={keyboardText}
            onChange={(e) => setKeyboardText(e.target.value)}
            placeholder="Type your message here..."
            className="bg-slate-700 border-slate-600 text-white resize-none"
            rows={4}
          />
          
          <div className="flex flex-wrap gap-2">
            {commonPhrases.slice(0, 4).map((phrase, index) => (
              <Button
                key={index}
                onClick={() => {
                  setKeyboardText(prev => prev + (prev ? ' ' : '') + phrase);
                  speakText(phrase);
                }}
                variant="outline"
                size="sm"
                className="text-xs border-slate-600 text-gray-300 hover:bg-slate-700"
              >
                {phrase}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => speakText(keyboardText)}
              disabled={!keyboardText.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              🔊 Speak
            </Button>
            <Button
              onClick={() => setKeyboardText('')}
              variant="outline"
              className="border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Home Control */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            🏠 Smart Home Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span className="text-white">Lights</span>
              </div>
              <Button
                onClick={() => toggleSmartHome('lights')}
                size="sm"
                className={`${
                  smartHomeStatus.lights 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {smartHomeStatus.lights ? 'ON' : 'OFF'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌡️</span>
                <span className="text-white">Temperature</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setSmartHomeStatus(prev => ({...prev, temperature: Math.max(16, prev.temperature - 1)}))}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300"
                >
                  -
                </Button>
                <span className="text-white min-w-12 text-center">{smartHomeStatus.temperature}°C</span>
                <Button
                  onClick={() => setSmartHomeStatus(prev => ({...prev, temperature: Math.min(30, prev.temperature + 1)}))}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎵</span>
                <span className="text-white">Music</span>
              </div>
              <Button
                onClick={() => toggleSmartHome('music')}
                size="sm"
                className={`${
                  smartHomeStatus.music 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {smartHomeStatus.music ? 'PLAYING' : 'PAUSED'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔒</span>
                <span className="text-white">Security</span>
              </div>
              <div className={`px-2 py-1 rounded text-sm ${
                smartHomeStatus.security ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {smartHomeStatus.security ? 'ARMED' : 'DISARMED'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Text for Deaf/Hearing Impaired */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            💬 Live Text Transcription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsListening(!isListening)}
              className={`${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isListening ? '⏹️ Stop' : '🎤 Start'} Listening
            </Button>
            <div className={`w-3 h-3 rounded-full ${
              isListening ? 'bg-red-400 animate-pulse' : 'bg-gray-600'
            }`}></div>
          </div>

          <div className="min-h-32 p-4 bg-slate-700 rounded-lg border-2 border-dashed border-slate-600">
            {isListening ? (
              <div className="space-y-2">
                <div className="text-green-400 text-sm font-medium">🎯 Live Transcription:</div>
                <p className="text-white text-lg">
                  {liveText || 'Listening for speech...'}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-green-400 text-xs">Processing audio...</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎤</div>
                  <p className="text-sm">Click "Start Listening" to begin real-time transcription</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400">
            💡 This feature converts spoken words to text in real-time, helping users with hearing impairments follow conversations.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}