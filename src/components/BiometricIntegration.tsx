
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Watch, Activity, TrendingUp, AlertCircle, CheckCircle2, Smartphone } from 'lucide-react';

interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  lastSync: Date;
  deviceConnected: boolean;
}

interface BiometricDevice {
  id: string;
  name: string;
  type: 'apple-watch' | 'garmin' | 'polar' | 'fitbit' | 'oura';
  icon: React.ComponentType<{ className?: string }>;
  compatible: boolean;
  connected: boolean;
}

const SUPPORTED_DEVICES: BiometricDevice[] = [
  {
    id: 'apple-watch',
    name: 'Apple Watch',
    type: 'apple-watch',
    icon: Watch,
    compatible: true,
    connected: false
  },
  {
    id: 'garmin',
    name: 'Garmin Devices',
    type: 'garmin',
    icon: Activity,
    compatible: true,
    connected: false
  },
  {
    id: 'polar',
    name: 'Polar H10/H9',
    type: 'polar',
    icon: Heart,
    compatible: true,
    connected: false
  },
  {
    id: 'oura',
    name: 'Oura Ring',
    type: 'oura',
    icon: TrendingUp,
    compatible: true,
    connected: false
  }
];

const BiometricIntegration: React.FC = () => {
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [biometricData, setBiometricData] = useState<BiometricData>({
    heartRate: 72,
    hrv: 45,
    stressLevel: 3,
    lastSync: new Date(),
    deviceConnected: false
  });

  const handleDeviceConnection = (deviceId: string) => {
    // Simulate device connection
    if (connectedDevices.includes(deviceId)) {
      setConnectedDevices(prev => prev.filter(id => id !== deviceId));
    } else {
      setConnectedDevices(prev => [...prev, deviceId]);
      setBiometricData(prev => ({ ...prev, deviceConnected: true }));
    }
  };

  const getHRVZone = (hrv: number) => {
    if (hrv >= 50) return { zone: 'Excellent', color: 'text-green-400', description: 'Optimal nervous system resilience' };
    if (hrv >= 35) return { zone: 'Good', color: 'text-yellow-400', description: 'Healthy stress response' };
    if (hrv >= 20) return { zone: 'Fair', color: 'text-orange-400', description: 'Room for improvement' };
    return { zone: 'Poor', color: 'text-red-400', description: 'Focus on recovery practices' };
  };

  const getStressLevel = (level: number) => {
    const levels = {
      1: { label: 'Very Low', color: 'text-blue-400', description: 'Deeply relaxed state' },
      2: { label: 'Low', color: 'text-green-400', description: 'Calm and centered' },
      3: { label: 'Moderate', color: 'text-yellow-400', description: 'Manageable stress' },
      4: { label: 'High', color: 'text-orange-400', description: 'Elevated stress response' },
      5: { label: 'Very High', color: 'text-red-400', description: 'Significant stress activation' }
    };
    return levels[level as keyof typeof levels];
  };

  const hrvZone = getHRVZone(biometricData.hrv);
  const stressInfo = getStressLevel(biometricData.stressLevel);

  return (
    <div className="space-y-6">
      {/* Device Connection Status */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-yellow-400" />
            Biometric Device Integration
          </CardTitle>
          <CardDescription className="text-gray-400">
            Connect your wearable devices for enhanced nervous system tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUPPORTED_DEVICES.map((device) => {
              const IconComponent = device.icon;
              const isConnected = connectedDevices.includes(device.id);
              
              return (
                <div
                  key={device.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isConnected 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${
                        isConnected ? 'text-green-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <h4 className="text-white font-semibold">{device.name}</h4>
                        <p className="text-sm text-gray-400">
                          {device.compatible ? 'Compatible' : 'Coming Soon'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isConnected && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      <Button
                        variant={isConnected ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleDeviceConnection(device.id)}
                        disabled={!device.compatible}
                      >
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Dashboard */}
      {connectedDevices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Heart Rate Variability */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                HRV Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{biometricData.hrv}</div>
                  <div className={`text-sm font-semibold ${hrvZone.color}`}>
                    {hrvZone.zone}
                  </div>
                </div>
                <Progress value={(biometricData.hrv / 100) * 100} className="h-2" />
                <p className="text-xs text-gray-400">{hrvZone.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{biometricData.heartRate}</div>
                  <div className="text-sm text-gray-400">BPM</div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Rest: 60-72</span>
                  <span>Active: 72-85</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stress Level */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Stress Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${stressInfo.color}`}>
                    {biometricData.stressLevel}/5
                  </div>
                  <div className={`text-sm font-semibold ${stressInfo.color}`}>
                    {stressInfo.label}
                  </div>
                </div>
                <Progress value={(biometricData.stressLevel / 5) * 100} className="h-2" />
                <p className="text-xs text-gray-400">{stressInfo.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Real-time Insights */}
      {connectedDevices.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-800/20 border-blue-600/50">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-blue-300 font-semibold">Nervous System Status</h4>
                <p className="text-gray-300 text-sm">
                  Your HRV indicates good nervous system resilience. Consider deeper breathing 
                  practices to optimize further.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-blue-300 font-semibold">Stress Response Pattern</h4>
                <p className="text-gray-300 text-sm">
                  Moderate stress detected. This is optimal for growth - use this activation 
                  for focused leadership challenges.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-800/20 p-3 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-1">Personalized Recommendation</h4>
              <p className="text-blue-100 text-sm">
                Based on your current biometrics, try the 4-7-8 breathing protocol 
                to optimize your nervous system for the next leadership challenge.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started Guide */}
      {connectedDevices.length === 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Getting Started with Biometric Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center mt-0.5">1</div>
                <div>
                  <h4 className="text-white font-semibold">Connect Your Device</h4>
                  <p className="text-gray-400 text-sm">Choose from our supported devices and follow the connection process.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center mt-0.5">2</div>
                <div>
                  <h4 className="text-white font-semibold">Baseline Establishment</h4>
                  <p className="text-gray-400 text-sm">We'll track your data for 7 days to establish your personal baseline.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center mt-0.5">3</div>
                <div>
                  <h4 className="text-white font-semibold">AI-Powered Insights</h4>
                  <p className="text-gray-400 text-sm">Receive personalized recommendations based on your nervous system patterns.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BiometricIntegration;
